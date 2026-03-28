const statusConfig = {
  "ai-handled": { label: "AI Handled", className: "bg-primary/10 text-primary" },
  escalated: { label: "Escalated", className: "bg-warning/10 text-warning" },
  unread: { label: "Unread", className: "bg-success/10 text-success" },
} as const;

interface StatusBadgeProps {
  status: keyof typeof statusConfig;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center text-[10px] font-medium rounded-full px-2 py-0.5 ${config.className}`}>
      {config.label}
    </span>
  );
}
