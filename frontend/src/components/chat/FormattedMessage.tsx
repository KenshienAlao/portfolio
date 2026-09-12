import React from "react";
import { cn } from "@/lib/utils";
import { FormattedText } from "./FormattedText";
import { ProjectPreviewCard } from "./ProjectPreviewCard";

const PROJECT_EMBED_REGEX = /^::project\[([^\]]+)\]\(([^)]+)\)$/;

export function FormattedMessage({
  content,
  isUser,
}: {
  content: string;
  isUser: boolean;
}) {
  if (isUser) {
    return (
      <p className="whitespace-pre-wrap leading-relaxed text-white font-medium">
        {content}
      </p>
    );
  }

  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let currentList: { text: string; indent: number }[] = [];

  const flushList = (key: string) => {
    if (currentList.length === 0) return;
    blocks.push(
      <ul key={key} className="my-1.5 space-y-1.5 pl-1">
        {currentList.map((item, i) => (
          <li
            key={i}
            className={cn(
              "relative flex items-start gap-2",
              item.indent > 0
                ? "pl-4 text-[12px] opacity-90"
                : "text-xs sm:text-[13px]",
            )}
          >
            <span
              className={cn(
                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                item.indent > 0
                  ? "border border-accent bg-transparent"
                  : "bg-accent",
              )}
            />
            <div className="flex-1">
              <FormattedText text={item.text} isUser={isUser} />
            </div>
          </li>
        ))}
      </ul>,
    );
    currentList = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(`list-${index}`);
      blocks.push(<div key={`blank-${index}`} className="h-1.5" />);
      return;
    }

    const embedMatch = trimmed.match(PROJECT_EMBED_REGEX);
    if (embedMatch) {
      flushList(`list-${index}`);
      blocks.push(
        <ProjectPreviewCard
          key={`embed-${index}`}
          title={embedMatch[1]}
          imageUrl={embedMatch[2]}
        />,
      );
      return;
    }

    const bulletMatch = line.match(/^(\s*)(?:[*+-]|\d+\.)\s+(.+)$/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length;
      currentList.push({ text: bulletMatch[2], indent });
    } else {
      flushList(`list-${index}`);
      blocks.push(
        <p key={`p-${index}`} className="leading-relaxed">
          <FormattedText text={line} isUser={isUser} />
        </p>,
      );
    }
  });

  flushList("list-final");

  return <div className="space-y-1">{blocks}</div>;
}
