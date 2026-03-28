import { Instagram, MessageCircle, Globe } from "lucide-react";

const channelConfig = {
  instagram: { icon: Instagram, label: "Instagram", className: "bg-channel-instagram/10 text-channel-instagram" },
  whatsapp: { icon: MessageCircle, label: "WhatsApp", className: "bg-channel-whatsapp/10 text-channel-whatsapp" },
  web: { icon: Globe, label: "Web", className: "bg-channel-web/10 text-channel-web" },
} as const;

interface ChannelBadgeProps {
  channel: keyof typeof channelConfig;
  size?: "sm" | "md";
}

export function ChannelBadge({ channel, size = "sm" }: ChannelBadgeProps) {
  const config = channelConfig[channel];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${config.className} ${size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"}`}>
      <Icon className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} />
      {config.label}
    </span>
  );
}
