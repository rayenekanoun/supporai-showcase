import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: string;
  isAi?: boolean;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  delay?: number;
}

export function ChatBubble({ message, isAi, senderName, senderAvatar, timestamp, delay = 0 }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex gap-2.5 ${isAi ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground overflow-hidden">
        {senderAvatar ? (
          <span>{senderAvatar}</span>
        ) : (
          senderName.charAt(0).toUpperCase()
        )}
      </div>
      <div className={`max-w-[75%] ${isAi ? "" : ""}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-foreground">{senderName}</span>
          {isAi && (
            <span className="text-[10px] font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">AI</span>
          )}
        </div>
        <div
          className={`text-sm leading-relaxed px-3.5 py-2.5 rounded-xl ${
            isAi
              ? "bg-secondary text-secondary-foreground rounded-tl-sm"
              : "bg-primary text-primary-foreground rounded-tr-sm"
          }`}
        >
          {message}
        </div>
        <span className="text-[10px] text-muted-foreground mt-1 block">{timestamp}</span>
      </div>
    </motion.div>
  );
}
