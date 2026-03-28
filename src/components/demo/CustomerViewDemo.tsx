import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, MessageCircle, Globe, ArrowLeft, ShoppingBag, Truck, RefreshCw } from "lucide-react";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { InsightCard, type InsightData } from "./InsightCard";
import { LeadCapturePanel } from "./LeadCapturePanel";
import { SpotlightOverlay } from "./SpotlightOverlay";
import { ConversationDivider } from "./ConversationDivider";

interface CustomerViewDemoProps {
  onBack: () => void;
}

const channels = [
  { id: "instagram", icon: Instagram, label: "Instagram" },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
  { id: "web", icon: Globe, label: "Web Chat" },
] as const;

/* ── 3 Conversation Rounds ── */

const round1Insight: InsightData = {
  intent: "Purchase Inquiry",
  confidence: 94,
  product: "Beige Oversized Hoodie",
  questions: ["Availability", "Sizing"],
  leadScore: "High",
  sentiment: "Interested",
};

const round2Insight: InsightData = {
  intent: "Shipping & Logistics",
  confidence: 88,
  product: "Beige Oversized Hoodie",
  questions: ["Shipping", "Delivery Time", "Cost"],
  leadScore: "High",
  sentiment: "Engaged",
};

const round3Insight: InsightData = {
  intent: "Post-Purchase / Return",
  confidence: 91,
  product: "Beige Oversized Hoodie",
  questions: ["Return Policy", "Exchange"],
  leadScore: "Medium",
  sentiment: "Cautious",
};

const tourSteps = [
  { targetId: "cv-channels", title: "Multi-channel Support", description: "SupporAi connects to Instagram, WhatsApp, and web chat — all in one unified inbox." },
  { targetId: "cv-round-1", title: "Round 1 — Product Questions", description: "The customer asks about product availability and sizing. Watch how the AI handles multiple questions at once." },
  { targetId: "cv-insights", title: "AI Detects Intent", description: "SupporAi instantly analyzes the conversation, detecting purchase intent with 94% confidence." },
  { targetId: "cv-round-2", title: "Round 2 — Shipping Details", description: "The conversation continues with shipping questions. The AI insight panel updates in real time." },
  { targetId: "cv-round-3", title: "Round 3 — Return Policy", description: "The customer asks about returns before committing. SupporAi handles objections gracefully." },
  { targetId: "cv-lead", title: "Lead Captured", description: "After 3 rounds of conversation, the customer is captured as a qualified lead with full context." },
  { targetId: "cv-channel-switch", title: "Switch Channels", description: "Seamlessly switch between channels to see the same unified experience across platforms." },
];

/*
  Timeline (ms):
  0     → Round 1 divider
  600   → Customer msg 1
  1200  → Customer msg 2
  2000  → Typing
  3200  → AI reply 1 + insight 1
  4200  → Round 2 divider
  4800  → Customer msg 3
  5400  → Customer msg 4
  6200  → Typing
  7400  → AI reply 2 + insight 2
  8400  → Round 3 divider
  9000  → Customer msg 5
  9800  → Typing
  11000 → AI reply 3 + insight 3
  12000 → Lead panel
*/

export function CustomerViewDemo({ onBack }: CustomerViewDemoProps) {
  const [activeChannel, setActiveChannel] = useState<string>("instagram");
  const [step, setStep] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [activeInsight, setActiveInsight] = useState<InsightData | null>(null);
  const [showLead, setShowLead] = useState(false);
  const [tourActive, setTourActive] = useState(true);
  const [tourStep, setTourStep] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [step, showTyping]);

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];

    // Round 1
    t.push(setTimeout(() => setStep(1), 400));        // divider
    t.push(setTimeout(() => setStep(2), 1000));       // msg 1
    t.push(setTimeout(() => setStep(3), 1800));       // msg 2
    t.push(setTimeout(() => setShowTyping(true), 2600));
    t.push(setTimeout(() => { setShowTyping(false); setStep(4); setActiveInsight(round1Insight); }, 3800));

    // Round 2
    t.push(setTimeout(() => setStep(5), 5000));       // divider
    t.push(setTimeout(() => setStep(6), 5800));       // msg 3
    t.push(setTimeout(() => setStep(7), 6600));       // msg 4
    t.push(setTimeout(() => setShowTyping(true), 7400));
    t.push(setTimeout(() => { setShowTyping(false); setStep(8); setActiveInsight(round2Insight); }, 8600));

    // Round 3
    t.push(setTimeout(() => setStep(9), 9800));       // divider
    t.push(setTimeout(() => setStep(10), 10600));     // msg 5
    t.push(setTimeout(() => setShowTyping(true), 11400));
    t.push(setTimeout(() => { setShowTyping(false); setStep(11); setActiveInsight(round3Insight); }, 12600));
    t.push(setTimeout(() => setShowLead(true), 13800));

    return () => t.forEach(clearTimeout);
  }, []);

  const handleTourNext = useCallback(() => setTourStep((s) => Math.min(s + 1, tourSteps.length - 1)), []);
  const handleTourBack = useCallback(() => setTourStep((s) => Math.max(s - 1, 0)), []);

  return (
    <div className="fixed inset-0 bg-surface-sunken flex flex-col">
      {/* Top bar */}
      <div className="h-14 bg-card border-b border-border flex items-center px-4 gap-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="h-5 w-px bg-border" />
        <span className="text-sm font-semibold text-foreground">Customer View</span>
        <span className="text-xs text-muted-foreground">— Lunara Apparel</span>
        <div className="ml-auto">
          <button
            onClick={() => { setTourActive(true); setTourStep(0); }}
            className="text-xs text-primary font-medium hover:underline"
          >
            Restart Tour
          </button>
        </div>
      </div>

      {/* Channel selector */}
      <div id="cv-channels" className="bg-card border-b border-border px-4 py-2 flex gap-1">
        {channels.map((ch) => (
          <button
            key={ch.id}
            id={ch.id === "whatsapp" ? "cv-channel-switch" : undefined}
            onClick={() => setActiveChannel(ch.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeChannel === ch.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            <ch.icon className="w-3.5 h-3.5" />
            {ch.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat area */}
        <div id="cv-chat" className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="px-5 py-3 border-b border-border bg-card flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-accent-foreground">A</div>
            <div>
              <p className="text-sm font-medium text-foreground">@amira_style</p>
              <p className="text-xs text-muted-foreground">Active now</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                {step >= 9 ? "3 rounds" : step >= 5 ? "2 rounds" : step >= 1 ? "1 round" : "Starting..."}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-3">
            {/* ── ROUND 1: Product Questions ── */}
            {step >= 1 && (
              <div id="cv-round-1">
                <ConversationDivider
                  icon={ShoppingBag}
                  label="Product Questions"
                  description="Availability & sizing"
                  roundNumber={1}
                />
              </div>
            )}
            {step >= 2 && (
              <ChatBubble
                message="Hi! Do you still have the beige oversized hoodie in medium? 😊"
                senderName="Amira"
                senderAvatar="A"
                timestamp="2:34 PM"
              />
            )}
            {step >= 3 && (
              <ChatBubble
                message="What size should I pick if I want a loose, relaxed fit?"
                senderName="Amira"
                senderAvatar="A"
                timestamp="2:34 PM"
              />
            )}
            {step >= 4 && (
              <div id="cv-ai-reply-1">
                <ChatBubble
                  message="Hey Amira! 👋 Yes, the beige oversized hoodie is available in medium. For a loose fit, medium should be perfect — but if you prefer extra oversized, large works too. Would you like me to reserve one for you?"
                  isAi
                  senderName="SupporAi"
                  senderAvatar="S"
                  timestamp="2:35 PM"
                />
              </div>
            )}

            {/* ── ROUND 2: Shipping & Logistics ── */}
            {step >= 5 && (
              <div id="cv-round-2">
                <ConversationDivider
                  icon={Truck}
                  label="Shipping Details"
                  description="Delivery & cost"
                  roundNumber={2}
                />
              </div>
            )}
            {step >= 6 && (
              <ChatBubble
                message="That sounds great! Do you ship to Tunis, Tunisia?"
                senderName="Amira"
                senderAvatar="A"
                timestamp="2:36 PM"
              />
            )}
            {step >= 7 && (
              <ChatBubble
                message="How long does delivery take? And is there a free shipping option?"
                senderName="Amira"
                senderAvatar="A"
                timestamp="2:36 PM"
              />
            )}
            {step >= 8 && (
              <div id="cv-ai-reply-2">
                <ChatBubble
                  message="Yes, we ship to Tunis! Standard delivery takes 3–5 business days. Orders over 150 TND qualify for free shipping — your hoodie at 120 TND is close, so adding a small accessory would get you there! 🚚"
                  isAi
                  senderName="SupporAi"
                  senderAvatar="S"
                  timestamp="2:37 PM"
                />
              </div>
            )}

            {/* ── ROUND 3: Return Policy ── */}
            {step >= 9 && (
              <div id="cv-round-3">
                <ConversationDivider
                  icon={RefreshCw}
                  label="Return Policy"
                  description="Exchange & refund"
                  roundNumber={3}
                />
              </div>
            )}
            {step >= 10 && (
              <ChatBubble
                message="One last thing — what's your return policy if the size doesn't fit? Can I exchange it?"
                senderName="Amira"
                senderAvatar="A"
                timestamp="2:38 PM"
              />
            )}
            {step >= 11 && (
              <div id="cv-ai-reply-3">
                <ChatBubble
                  message="Of course! You have 14 days to return or exchange any item in its original condition. Exchanges are free — we'll even cover the return shipping. No worries at all! Ready to order? I can send you a direct checkout link 🛒"
                  isAi
                  senderName="SupporAi"
                  senderAvatar="S"
                  timestamp="2:39 PM"
                />
              </div>
            )}

            {/* Typing indicator */}
            {showTyping && <TypingIndicator />}
          </div>
        </div>

        {/* Right panels */}
        <div className="w-[340px] border-l border-border bg-card overflow-y-auto p-4 space-y-4">
          {/* Active round indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Live Analysis
          </div>

          <AnimatePresence mode="wait">
            {activeInsight && (
              <InsightCard key={activeInsight.intent} id="cv-insights" data={activeInsight} />
            )}
          </AnimatePresence>

          {/* Round progress */}
          <div className="border border-border rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-semibold text-foreground">Conversation Progress</h4>
            {[
              { round: 1, label: "Product Questions", minStep: 4 },
              { round: 2, label: "Shipping Details", minStep: 8 },
              { round: 3, label: "Return Policy", minStep: 11 },
            ].map((r) => (
              <div key={r.round} className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${
                  step >= r.minStep
                    ? "bg-success text-white"
                    : step >= r.minStep - 3
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {step >= r.minStep ? "✓" : r.round}
                </div>
                <span className={`text-xs transition-colors ${
                  step >= r.minStep ? "text-foreground font-medium" : "text-muted-foreground"
                }`}>
                  {r.label}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showLead && (
              <div id="cv-lead">
                <LeadCapturePanel />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Spotlight overlay */}
      <SpotlightOverlay
        steps={tourSteps}
        currentStep={tourStep}
        onNext={handleTourNext}
        onBack={handleTourBack}
        onClose={() => setTourActive(false)}
        active={tourActive}
      />
    </div>
  );
}
