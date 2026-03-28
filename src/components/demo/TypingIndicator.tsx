export function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground">
        S
      </div>
      <div className="bg-secondary rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse-dot" />
        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}
