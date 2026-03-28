import { motion } from "framer-motion";
import { Brain, Target, Package, HelpCircle, TrendingUp, AlertTriangle, Heart } from "lucide-react";

export interface InsightData {
  intent: string;
  confidence: number;
  product: string;
  questions: string[];
  leadScore: "High" | "Medium" | "Low";
  sentiment?: string;
}

interface InsightCardProps {
  id?: string;
  data?: InsightData;
}

const defaultData: InsightData = {
  intent: "Purchase Inquiry",
  confidence: 94,
  product: "Beige Oversized Hoodie",
  questions: ["Availability", "Sizing", "Shipping"],
  leadScore: "High",
};

const scoreColors: Record<string, string> = {
  High: "bg-success/10 text-success",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-muted text-muted-foreground",
};

export function InsightCard({ id, data = defaultData }: InsightCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
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
          <span className="text-xs font-medium text-foreground">{data.intent}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5" /> Confidence
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1.5 bg-accent rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.confidence}%` }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
            <span className="text-xs font-semibold text-primary">{data.confidence}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="w-3.5 h-3.5" /> Product
          </div>
          <span className="text-xs font-medium text-foreground">{data.product}</span>
        </div>
        {data.sentiment && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Heart className="w-3.5 h-3.5" /> Sentiment
            </div>
            <span className="text-xs font-medium text-foreground">{data.sentiment}</span>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <HelpCircle className="w-3.5 h-3.5" /> Questions Detected
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data.questions.map((q) => (
            <span key={q} className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
              {q}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Lead Score</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${scoreColors[data.leadScore]}`}>
          {data.leadScore}
        </span>
      </div>
    </motion.div>
  );
}
