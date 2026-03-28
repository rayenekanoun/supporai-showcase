import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Monitor, Headphones, ArrowRight, Sparkles } from "lucide-react";

interface DemoPickerProps {
  onSelectDemo: (demo: "customer" | "agent") => void;
}

const demos = [
  {
    id: "customer" as const,
    title: "Customer View",
    icon: Monitor,
    description: "See how SupporAi handles customer conversations across Instagram, WhatsApp, and web chat. Watch AI detect intent, answer intelligently, and capture leads — all in real-time.",
    category: "CUSTOMER SERVICE DEMOS",
  },
  {
    id: "agent" as const,
    title: "Agent Experience",
    icon: Headphones,
    description: "Explore the internal agent dashboard. See how escalated conversations are managed, AI summaries help agents respond faster, and customer context is always at hand.",
    category: "CUSTOMER SERVICE DEMOS",
  },
];

export function DemoPicker({ onSelectDemo }: DemoPickerProps) {
  const [selected, setSelected] = useState<"customer" | "agent">("customer");
  const activeDemo = demos.find((d) => d.id === selected)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 bg-card rounded-2xl shadow-modal border border-border overflow-hidden flex w-[720px] max-w-[90vw] min-h-[400px]"
      >
        {/* Sidebar */}
        <div className="w-[220px] border-r border-border bg-surface-sunken p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-foreground tracking-tight">SupporAi</span>
          </div>

          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Customer Service Demos
          </p>

          <div className="space-y-1">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setSelected(demo.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                  selected === demo.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <demo.icon className="w-4 h-4 flex-shrink-0" />
                <span>{demo.title}</span>
                {selected === demo.id && <Check className="w-3.5 h-3.5 ml-auto" />}
              </button>
            ))}
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 p-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <activeDemo.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{activeDemo.title}</h2>
                  <p className="text-xs text-muted-foreground">Interactive guided demo</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {activeDemo.description}
              </p>

              <button
                onClick={() => onSelectDemo(selected)}
                className="mt-6 self-start flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Demo <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
