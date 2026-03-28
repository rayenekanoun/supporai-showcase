import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Inbox, MessageSquare, BarChart3, Zap, Settings, Send, Sparkles, AlertTriangle, ShoppingBag, Tag, History, Crown } from "lucide-react";
import { ConversationItem } from "./ConversationItem";
import { ChatBubble } from "./ChatBubble";
import { SpotlightOverlay } from "./SpotlightOverlay";

interface AgentDemoProps {
  onBack: () => void;
}

const sidebarItems = [
  { icon: Inbox, label: "Inbox", count: 12 },
  { icon: MessageSquare, label: "Conversations" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Zap, label: "Automations" },
  { icon: Settings, label: "Settings" },
];

const conversations = [
  { name: "Nadia Khelifi", avatar: "N", preview: "I received the wrong item in my order", channel: "instagram" as const, status: "escalated" as const },
  { name: "Youssef Mansour", avatar: "Y", preview: "When will my order arrive?", channel: "whatsapp" as const, status: "ai-handled" as const },
  { name: "Sara Bouazizi", avatar: "S", preview: "Can I change my order size?", channel: "web" as const, status: "ai-handled" as const },
  { name: "Karim Dridi", avatar: "K", preview: "Do you have this in black?", channel: "instagram" as const, status: "unread" as const },
  { name: "Leila Chaabane", avatar: "L", preview: "I need a refund please", channel: "whatsapp" as const, status: "escalated" as const },
];

const tourSteps = [
  { targetId: "ag-inbox", title: "Agent Inbox", description: "The inbox shows all conversations across channels with their status — AI-handled, escalated, or unread." },
  { targetId: "ag-conversation-0", title: "Escalated Conversation", description: "This conversation was escalated because the AI detected a frustrated customer who received the wrong item." },
  { targetId: "ag-summary", title: "AI Summary", description: "The AI provides a quick summary of the issue, detected sentiment, and a suggested action for the agent." },
  { targetId: "ag-context", title: "Customer Context", description: "Agents see full context — order info, tags, past conversations, and VIP status — without switching screens." },
  { targetId: "ag-composer", title: "AI Reply Suggestion", description: "The AI drafts a response based on the conversation context. Agents can edit or send directly." },
  { targetId: "ag-send", title: "Resolution", description: "One click to send the response and resolve the issue. The AI logs the resolution for future learning." },
];

export function AgentExperienceDemo({ onBack }: AgentDemoProps) {
  const [selectedConvo, setSelectedConvo] = useState(0);
  const [replyText, setReplyText] = useState("I'm sorry about that. We'll send a replacement within 24 hours. You don't need to return the wrong item.");
  const [tourActive, setTourActive] = useState(true);
  const [tourStep, setTourStep] = useState(0);

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
        <span className="text-sm font-semibold text-foreground">Agent Dashboard</span>
        <div className="ml-auto">
          <button
            onClick={() => { setTourActive(true); setTourStep(0); }}
            className="text-xs text-primary font-medium hover:underline"
          >
            Restart Tour
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar */}
        <div className="w-[200px] bg-card border-r border-border p-3 flex flex-col gap-1">
          {sidebarItems.map((item, i) => (
            <button
              key={item.label}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                i === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.count && (
                <span className="ml-auto text-[10px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div id="ag-inbox" className="w-[280px] border-r border-border bg-card overflow-y-auto">
          <div className="p-3 border-b border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conversations</h3>
          </div>
          <div className="p-2 space-y-0.5">
            {conversations.map((c, i) => (
              <div key={i} id={i === 0 ? "ag-conversation-0" : undefined}>
                <ConversationItem
                  {...c}
                  active={selectedConvo === i}
                  onClick={() => setSelectedConvo(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Active conversation */}
        <div className="flex-1 flex flex-col">
          <div className="px-5 py-3 border-b border-border bg-card flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-accent-foreground">
              {conversations[selectedConvo].avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{conversations[selectedConvo].name}</span>
                {conversations[selectedConvo].status === "escalated" && (
                  <span className="text-[10px] font-medium bg-warning/10 text-warning px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" /> Escalated
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">via {conversations[selectedConvo].channel}</p>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <ChatBubble
              message="Hi, I just received my order but you sent the wrong item. I ordered the beige hoodie and received a grey one."
              senderName={conversations[selectedConvo].name}
              senderAvatar={conversations[selectedConvo].avatar}
              timestamp="10:12 AM"
            />
            <ChatBubble
              message="I'm really disappointed. This is the second time this has happened."
              senderName={conversations[selectedConvo].name}
              senderAvatar={conversations[selectedConvo].avatar}
              timestamp="10:12 AM"
            />
            <ChatBubble
              message="I understand your frustration, and I sincerely apologize for the inconvenience. Let me look into this for you right away."
              isAi
              senderName="SupporAi"
              senderAvatar="S"
              timestamp="10:13 AM"
            />
            <div className="flex items-center gap-2 px-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] text-warning font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Escalated to agent
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>

          {/* Reply composer */}
          <div id="ag-composer" className="border-t border-border bg-card p-4">
            <div className="flex items-center gap-1.5 text-[10px] text-primary font-medium mb-2">
              <Sparkles className="w-3 h-3" /> AI-suggested reply
            </div>
            <div className="flex gap-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 text-sm bg-secondary text-secondary-foreground rounded-lg px-3 py-2.5 resize-none border border-border focus:outline-none focus:ring-1 focus:ring-ring"
                rows={2}
              />
              <button
                id="ag-send"
                className="self-end flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" /> Send
              </button>
            </div>
          </div>
        </div>

        {/* Right panel - AI summary + customer context */}
        <div className="w-[300px] border-l border-border bg-card overflow-y-auto p-4 space-y-4">
          {/* AI Summary */}
          <motion.div
            id="ag-summary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl shadow-card p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">AI Summary</h3>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Issue</span>
                <span className="text-xs font-medium text-foreground">Wrong item received</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Sentiment</span>
                <span className="text-xs font-medium text-warning">Frustrated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Order</span>
                <span className="text-xs font-medium text-foreground">#LN-20847</span>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-[10px] text-muted-foreground mb-1.5">Suggested Action</p>
              <p className="text-xs font-medium text-primary bg-primary/5 rounded-lg px-3 py-2">
                Send replacement within 24h
              </p>
            </div>
          </motion.div>

          {/* Customer Context */}
          <motion.div
            id="ag-context"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-card border border-border rounded-xl shadow-card p-4 space-y-3"
          >
            <h3 className="text-sm font-semibold text-foreground">Customer Context</h3>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Order</span>
                <span className="text-xs font-medium text-foreground ml-auto">#LN-20847 • Beige Hoodie (M)</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Tags</span>
                <div className="ml-auto flex gap-1">
                  <span className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">Returns</span>
                  <span className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">Priority</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Past conversations</span>
                <span className="text-xs font-medium text-foreground ml-auto">3 previous</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-warning" />
                <span className="text-xs font-medium text-warning">VIP • Repeat Buyer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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
