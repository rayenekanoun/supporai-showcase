import { motion } from "framer-motion";
import { User, Instagram, ShoppingBag, Target, ExternalLink } from "lucide-react";

interface LeadCapturePanelProps {
  id?: string;
}

export function LeadCapturePanel({ id }: LeadCapturePanelProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-card border border-border rounded-xl shadow-elevated p-5 space-y-4"
    >
      <h3 className="text-sm font-semibold text-foreground">Lead Captured</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
            <User className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">@amira_style</p>
            <p className="text-xs text-muted-foreground">Amira Ben Youssef</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-1">
              <Instagram className="w-3 h-3" /> Channel
            </div>
            <span className="text-xs font-medium text-secondary-foreground">Instagram</span>
          </div>
          <div className="bg-secondary rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-1">
              <ShoppingBag className="w-3 h-3" /> Interest
            </div>
            <span className="text-xs font-medium text-secondary-foreground">Hoodie</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-secondary rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Target className="w-3.5 h-3.5" /> Intent
          </div>
          <span className="text-xs font-semibold bg-success/10 text-success px-2 py-0.5 rounded-full">High</span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg py-2.5 hover:opacity-90 transition-opacity">
        <ExternalLink className="w-3.5 h-3.5" /> Send Checkout Link
      </button>
    </motion.div>
  );
}
