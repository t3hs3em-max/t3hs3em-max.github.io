import { cn } from "@/lib/utils";

/**
 * Tehseem's round profile photo, used as the site mark in the header and footer.
 * Decorative (empty alt): the surrounding link already carries the accessible name.
 */
export function ProfileAvatar({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span
      className={cn(
        "relative block size-10 shrink-0 overflow-hidden rounded-full bg-surface ring-1 ring-border",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/profile/tehseem-avatar-80.webp"
        srcSet="/profile/tehseem-avatar-80.webp 80w, /profile/tehseem-avatar.webp 160w"
        sizes="40px"
        width={80}
        height={80}
        alt=""
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        className="size-full object-cover"
      />
    </span>
  );
}
