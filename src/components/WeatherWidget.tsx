import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface WeatherWidgetProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  color: "temperature" | "humidity" | "pressure" | "rain" | "soil";
  className?: string;
}

const colorVariants = {
  temperature: "border-l-temperature text-temperature",
  humidity: "border-l-humidity text-humidity", 
  pressure: "border-l-pressure text-pressure",
  rain: "border-l-rain text-rain",
  soil: "border-l-soil text-soil"
};

export function WeatherWidget({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  color,
  className 
}: WeatherWidgetProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden border-l-4 hover:shadow-lg transition-shadow duration-300",
      colorVariants[color],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-3xl font-bold">
            {value}
          </div>
          <div className="text-sm text-muted-foreground">
            {unit}
          </div>
        </div>
        {trend && (
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <span className={cn(
              "mr-1",
              trend === "up" && "text-green-600",
              trend === "down" && "text-red-600",
              trend === "stable" && "text-gray-600"
            )}>
              {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
            </span>
            Tendência {trend === "up" ? "crescente" : trend === "down" ? "decrescente" : "estável"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}