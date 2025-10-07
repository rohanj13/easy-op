import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "green" | "yellow" | "red" | null | undefined;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (!status) {
    return <Badge variant="outline">Not Assessed</Badge>;
  }

  const statusConfig = {
    green: { label: "Low Risk", className: "bg-[hsl(var(--status-green))] text-white hover:bg-[hsl(var(--status-green))]/90" },
    yellow: { label: "Medium Risk", className: "bg-[hsl(var(--status-yellow))] text-black hover:bg-[hsl(var(--status-yellow))]/90" },
    red: { label: "High Risk", className: "bg-[hsl(var(--status-red))] text-white hover:bg-[hsl(var(--status-red))]/90" },
  };

  const config = statusConfig[status];

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};
