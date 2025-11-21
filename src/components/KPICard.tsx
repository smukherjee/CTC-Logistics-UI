import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
}

export function KPICard({ title, value, change, isPositive, icon: Icon, color, onClick }: KPICardProps) {
  return (
    <Card 
      className={`p-4 hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer hover:border-blue-400' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-[#0F172A] text-2xl font-bold mb-1">{value}</p>
          {change && (
            <p className={`text-sm ${isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {isPositive ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
}
