import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface SpotlightStep {
  targetId: string;
  title: string;
  description: string;
}

interface SpotlightOverlayProps {
  steps: SpotlightStep[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  active: boolean;
}

export function SpotlightOverlay({ steps, currentStep, onNext, onBack, onClose, active }: SpotlightOverlayProps) {
  if (!active || !steps[currentStep]) return null;

  const step = steps[currentStep];
  const el = document.getElementById(step.targetId);
  const rect = el?.getBoundingClientRect();

  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  // Position tooltip near target
  const tooltipStyle: React.CSSProperties = rect
    ? {
        position: "fixed",
        top: rect.bottom + 12,
        left: Math.max(16, Math.min(rect.left, window.innerWidth - 380)),
        zIndex: 10001,
      }
    : { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10001 };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0"
        style={{ zIndex: 10000 }}
      >
        {/* Dark overlay with cutout */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 10000 }}>
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {rect && (
                <rect
                  x={rect.left - 6}
                  y={rect.top - 6}
                  width={rect.width + 12}
                  height={rect.height + 12}
                  rx="10"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="hsl(220, 20%, 8%)"
            fillOpacity="0.6"
            mask="url(#spotlight-mask)"
          />
        </svg>

        {/* Highlight border */}
        {rect && (
          <div
            className="absolute rounded-lg shadow-spotlight pointer-events-none"
            style={{
              left: rect.left - 6,
              top: rect.top - 6,
              width: rect.width + 12,
              height: rect.height + 12,
              zIndex: 10000,
              border: "2px solid hsl(220, 65%, 50%)",
            }}
          />
        )}

        {/* Tooltip */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          style={tooltipStyle}
          className="w-[340px] bg-card rounded-xl shadow-modal border border-border p-5"
        >
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors -mt-1 -mr-1 p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <div className="flex gap-2">
              {!isFirst && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
                >
                  <ChevronLeft className="w-3 h-3" /> Back
                </button>
              )}
              <button
                onClick={isLast ? onClose : onNext}
                className="flex items-center gap-1 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
              >
                {isLast ? "Finish" : "Next"} {!isLast && <ChevronRight className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
