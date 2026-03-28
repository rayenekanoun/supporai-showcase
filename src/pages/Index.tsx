import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DemoPicker } from "@/components/demo/DemoPicker";
import { CustomerViewDemo } from "@/components/demo/CustomerViewDemo";
import { AgentExperienceDemo } from "@/components/demo/AgentExperienceDemo";

type View = "picker" | "customer" | "agent";

const Index = () => {
  const [view, setView] = useState<View>("picker");

  return (
    <div className="min-h-screen bg-surface-sunken">
      <AnimatePresence mode="wait">
        {view === "picker" && (
          <DemoPicker
            key="picker"
            onSelectDemo={(demo) => setView(demo)}
          />
        )}
        {view === "customer" && (
          <CustomerViewDemo
            key="customer"
            onBack={() => setView("picker")}
          />
        )}
        {view === "agent" && (
          <AgentExperienceDemo
            key="agent"
            onBack={() => setView("picker")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
