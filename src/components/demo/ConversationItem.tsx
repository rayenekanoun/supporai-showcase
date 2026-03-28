import { ChannelBadge } from "./ChannelBadge";
import { StatusBadge } from "./StatusBadge";

interface ConversationItemProps {
  name: string;
  avatar: string;
  preview: string;
  channel: "instagram" | "whatsapp" | "web";
  status: "ai-handled" | "escalated" | "unread";
  active?: boolean;
  onClick?: () => void;
}

export function ConversationItem({ name, avatar, preview, channel, status, active, onClick }: ConversationItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
        active ? "bg-accent" : "hover:bg-secondary"
      }`}
    >
      <div className="w-9 h-9 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-sm font-semibold text-accent-foreground">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-sm font-medium text-foreground truncate">{name}</span>
          <ChannelBadge channel={channel} />
        </div>
        <p className="text-xs text-muted-foreground truncate">{preview}</p>
        <div className="mt-1.5">
          <StatusBadge status={status} />
        </div>
      </div>
    </button>
  );
}
