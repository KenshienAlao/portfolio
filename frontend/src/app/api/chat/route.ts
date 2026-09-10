import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getAllProjects } from "@/lib/db/projects";
import { getAllSkills } from "@/lib/db/skills";
import { getAllEducation } from "@/lib/db/education";
import { getAllSetupCategories } from "@/lib/db/setup";
import { buildSystemInstruction } from "@/lib/chat-prompt";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const limiter = rateLimit({ limit: 10, window: 60 });

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const blocked = limiter(req);
  if (blocked) return blocked;

  try {
    const rawKeys = process.env.GEMINI_API_KEY;
    if (!rawKeys) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 },
      );
    }

    const apiKeys = rawKeys
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    if (apiKeys.length === 0) {
      return NextResponse.json(
        { error: "No valid GEMINI_API_KEY found in configuration." },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { messages }: { messages?: ChatMessage[] } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 },
      );
    }

    const [projects, skills, education, setup] = await Promise.all([
      getAllProjects(),
      getAllSkills(),
      getAllEducation(),
      getAllSetupCategories(),
    ]);

    const systemInstruction = buildSystemInstruction({
      projects,
      skills,
      education,
      setup,
    });

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    let lastError: unknown = null;
    let responseStream: any = null;

    for (let i = 0; i < apiKeys.length; i++) {
      const key = apiKeys[i];
      try {
        const ai = new GoogleGenAI({
          apiKey: key,
          httpOptions: { timeout: 15_000 },
        });
        responseStream = await ai.models.generateContentStream({
          model: "gemini-3.6-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        break;
      } catch (err) {
        lastError = err;
        const keyLabel = `Key ${i + 1}/${apiKeys.length}`;
        const isTimeout =
          err instanceof Error &&
          (err.message.includes("Timeout") ||
            err.message.includes("fetch failed"));
        const is429 =
          err instanceof Error &&
          (err.message.includes("429") ||
            err.message.includes("RESOURCE_EXHAUSTED"));
        console.warn(
          `[Chat] ${keyLabel} failed (${isTimeout ? "timeout" : is429 ? "rate-limited" : "error"}), ${i < apiKeys.length - 1 ? "trying next key..." : "no more keys."}`,
        );
      }
    }

    if (!responseStream) {
      throw lastError || new Error("All GEMINI_API_KEY fallbacks failed.");
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: unknown) {
    const rawMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Gemini Chat API Error:", error);

    let cleanMessage =
      "I'm temporarily unavailable. Please try again in a moment.";

    const formatDuration = (totalSeconds: number): string => {
      const s = Math.ceil(totalSeconds);
      if (s <= 0) return "a moment";
      const days = Math.floor(s / 86400);
      const hours = Math.floor((s % 86400) / 3600);
      const minutes = Math.floor((s % 3600) / 60);
      const seconds = s % 60;
      const parts: string[] = [];
      if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
      if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
      if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
      if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
      return parts.join(", ");
    };

    try {
      const parsed = JSON.parse(rawMessage);
      const outerErr = parsed?.error || parsed;

      let innerErr = outerErr;
      if (typeof outerErr?.message === "string") {
        try {
          const innerParsed = JSON.parse(outerErr.message);
          innerErr = innerParsed?.error || innerParsed;
        } catch {}
      }

      let retryDelayStr = "";
      const details = innerErr?.details || outerErr?.details;
      if (Array.isArray(details)) {
        const retryDetail = details.find(
          (d: any) => d?.["@type"]?.includes("RetryInfo") && d?.retryDelay,
        );
        if (retryDetail?.retryDelay) {
          const raw = String(retryDetail.retryDelay).replace(/s$/i, "");
          const secs = parseFloat(raw);
          retryDelayStr = !isNaN(secs)
            ? formatDuration(secs)
            : retryDetail.retryDelay;
        }
      }
      if (!retryDelayStr) {
        const msgText = innerErr?.message || outerErr?.message || "";
        const match = msgText.match(/retry in ([0-9]+(?:\.[0-9]+)?)s/i);
        if (match?.[1]) {
          retryDelayStr = formatDuration(parseFloat(match[1]));
        }
      }

      const isRateLimit =
        outerErr?.code === 429 ||
        innerErr?.code === 429 ||
        outerErr?.status === "RESOURCE_EXHAUSTED" ||
        innerErr?.status === "RESOURCE_EXHAUSTED" ||
        rawMessage.includes("429") ||
        rawMessage.includes("Quota exceeded");

      if (isRateLimit) {
        cleanMessage = retryDelayStr
          ? `I've reached my current question limit for now. Please try again in ${retryDelayStr}.`
          : "I've reached my current question limit for now. Please try again in about a minute.";
      } else if (outerErr?.message && typeof outerErr.message === "string") {
        cleanMessage = outerErr.message;
      }
    } catch {
      if (
        rawMessage.includes("429") ||
        rawMessage.includes("Quota") ||
        rawMessage.includes("RESOURCE_EXHAUSTED")
      ) {
        cleanMessage =
          "I've reached my current question limit for now. Please try again in about a minute.";
      }
    }

    return NextResponse.json({ error: cleanMessage }, { status: 429 });
  }
}
