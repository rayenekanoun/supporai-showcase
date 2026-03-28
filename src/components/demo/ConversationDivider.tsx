import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface ConversationDividerProps {
  icon: LucideIcon;
  label: string;
  description: string;
  roundNumber: number;
}

export function ConversationDivider({ icon: Icon, label, description, roundNumber }: ConversationDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 py-3"
    >
      <div className="flex-1 h-px bg-border" />
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
          {roundNumber}
        </span>
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-foreground leading-tight">{label}</span>
          <span className="text-[10px] text-muted-foreground leading-tight">{description}</span>
        </div>
      </div>
      <div className="flex-1 h-px bg-border" />
    </motion.div>
  );
}
