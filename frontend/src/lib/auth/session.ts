import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "portfolio_session";
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  "super-secret-portfolio-session-key-fallback-32b!";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface SessionData {
  code: string;
  expiresAt: number;
}

function signPayload(payload: string): string {
  const hmac = crypto.createHmac("sha256", SESSION_SECRET);
  hmac.update(payload);
  return hmac.digest("hex");
}

function serializeSession(data: SessionData): string {
  const jsonStr = JSON.stringify(data);
  const base64 = Buffer.from(jsonStr).toString("base64url");
  const signature = signPayload(base64);
  return `${base64}.${signature}`;
}

function deserializeSession(cookieValue: string): SessionData | null {
  const parts = cookieValue.split(".");
  if (parts.length !== 2) return null;
  const [base64, signature] = parts;

  const expectedSignature = signPayload(base64);
  try {
    const a = Buffer.from(signature, "hex");
    const b = Buffer.from(expectedSignature, "hex");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const jsonStr = Buffer.from(base64, "base64url").toString("utf-8");
    const data = JSON.parse(jsonStr) as SessionData;
    if (Date.now() > data.expiresAt) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return null;
  return deserializeSession(sessionCookie.value);
}

export async function setSession(code: string): Promise<void> {
  const cookieStore = await cookies();
  const data: SessionData = {
    code,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const value = serializeSession(data);
  cookieStore.set(SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
