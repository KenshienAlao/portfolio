import { useState } from "react";
import Image from "next/image";

export function ProjectPreviewCard({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="my-2 overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      {!imgError && (
        <div className="relative w-full aspect-video overflow-hidden bg-background">
          <Image
            src={imageUrl}
            alt={`${title} preview`}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover object-top transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      )}
      <div className="px-3 py-2 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent shrink-0" />
        <span className="text-xs font-semibold text-text-primary truncate">
          {title}
        </span>
      </div>
    </div>
  );
}
