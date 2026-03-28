import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, MessageCircle, Globe, ArrowLeft } from "lucide-react";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { InsightCard } from "./InsightCard";
import { LeadCapturePanel } from "./LeadCapturePanel";
import { SpotlightOverlay } from "./SpotlightOverlay";

interface CustomerViewDemoProps {
  onBack: () => void;
}

const channels = [
  { id: "instagram", icon: Instagram, label: "Instagram" },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
  { id: "web", icon: Globe, label: "Web Chat" },
] as const;

const tourSteps = [
  { targetId: "cv-channels", title: "Multi-channel Support", description: "SupporAi connects to Instagram, WhatsApp, and web chat — all in one unified inbox." },
  { targetId: "cv-chat", title: "Incoming Message", description: "A customer reaches out asking about product availability, sizing, and shipping." },
  { targetId: "cv-insights", title: "AI Detects Intent", description: "SupporAi instantly analyzes the conversation, detecting purchase intent with 94% confidence." },
  { targetId: "cv-ai-reply", title: "AI Response", description: "The AI drafts a helpful, accurate reply addressing all three questions at once." },
  { targetId: "cv-lead", title: "Lead Captured", description: "The customer is automatically captured as a high-intent lead with all context preserved." },
  { targetId: "cv-channel-switch", title: "Switch Channels", description: "Seamlessly switch between channels to see the same unified experience across platforms." },
];

export function CustomerViewDemo({ onBack }: CustomerViewDemoProps) {
  const [activeChannel, setActiveChannel] = useState<string>("instagram");
  const [chatStep, setChatStep] = useState(0);
  const [showInsights, setShowInsights] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [tourActive, setTourActive] = useState(true);
  const [tourStep, setTourStep] = useState(0);

  // Simulate chat progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setChatStep(1), 600));
    timers.push(setTimeout(() => setChatStep(2), 1400));
    timers.push(setTimeout(() => setChatStep(3), 2200));
    timers.push(setTimeout(() => { setShowTyping(true); }, 3000));
    timers.push(setTimeout(() => { setShowTyping(false); setChatStep(4); setShowInsights(true); }, 4500));
    timers.push(setTimeout(() => setShowLead(true), 5500));
    return () => timers.forEach(clearTimeout);
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
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {chatStep >= 1 && (
              <ChatBubble
                message="Hi, do you still have the beige oversized hoodie in medium?"
                senderName="Amira"
                senderAvatar="A"
                timestamp="2:34 PM"
                delay={0}
              />
            )}
            {chatStep >= 2 && (
              <ChatBubble
                message="Also, do you ship to Tunis?"
                senderName="Amira"
                senderAvatar="A"
                timestamp="2:34 PM"
                delay={0}
              />
            )}
            {chatStep >= 3 && (
              <ChatBubble
                message="What size should I pick for a loose fit?"
                senderName="Amira"
                senderAvatar="A"
                timestamp="2:35 PM"
                delay={0}
              />
            )}
            {showTyping && <TypingIndicator />}
            {chatStep >= 4 && (
              <div id="cv-ai-reply">
                <ChatBubble
                  message="Yes — it's available in medium. For a loose fit, medium works well, but large will be more oversized. We ship to Tunis in 2–4 days."
                  isAi
                  senderName="SupporAi"
                  senderAvatar="S"
                  timestamp="2:35 PM"
                  delay={0}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right panels */}
        <div className="w-[320px] border-l border-border bg-card overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {showInsights && (
              <div id="cv-insights">
                <InsightCard />
              </div>
            )}
          </AnimatePresence>
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
