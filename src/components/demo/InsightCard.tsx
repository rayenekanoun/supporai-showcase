import { motion } from "framer-motion";
import { Brain, Target, Package, HelpCircle, TrendingUp } from "lucide-react";

interface InsightCardProps {
  id?: string;
}

export function InsightCard({ id }: InsightCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="bg-card border border-border rounded-xl shadow-elevated p-5 space-y-4"
    >
      <div className="flex items-center gap-2 mb-1">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Target className="w-3.5 h-3.5" /> Intent
          </div>
          <span className="text-xs font-medium text-foreground">Purchase Inquiry</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5" /> Confidence
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1.5 bg-accent rounded-full overflow-hidden">
              <div className="w-[94%] h-full bg-primary rounded-full" />
            </div>
            <span className="text-xs font-semibold text-primary">94%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="w-3.5 h-3.5" /> Product
          </div>
          <span className="text-xs font-medium text-foreground">Beige Oversized Hoodie</span>
        </div>
      </div>

      <div className="border-t border-border pt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <HelpCircle className="w-3.5 h-3.5" /> Questions Detected
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Availability", "Sizing", "Shipping"].map((q) => (
            <span key={q} className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
              {q}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Lead Score</span>
        <span className="text-xs font-semibold bg-success/10 text-success px-2 py-0.5 rounded-full">High</span>
      </div>
    </motion.div>
  );
}
