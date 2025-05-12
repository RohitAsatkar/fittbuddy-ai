
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, BarChart, Clock, Dumbbell, Footprints } from "lucide-react";

interface ProgressFiltersProps {
  timeframe: "weekly" | "monthly" | "all";
  onTimeframeChange: (value: string) => void;
  metricType: "workouts" | "calories" | "duration" | "muscles" | "steps";
  onMetricChange: (value: string) => void;
}

export function ProgressFilters({
  timeframe,
  onTimeframeChange,
  metricType,
  onMetricChange
}: ProgressFiltersProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-card rounded-lg p-4 shadow-sm border">
        <h3 className="text-lg font-medium mb-3">Timeframe</h3>
        <ToggleGroup 
          type="single" 
          value={timeframe}
          onValueChange={(value) => {
            if (value) onTimeframeChange(value);
          }}
          className="justify-start"
        >
          <ToggleGroupItem value="weekly" aria-label="Weekly view">
            Weekly
          </ToggleGroupItem>
          <ToggleGroupItem value="monthly" aria-label="Monthly view">
            Monthly
          </ToggleGroupItem>
          <ToggleGroupItem value="all" aria-label="All time view">
            All Time
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="bg-card rounded-lg p-4 shadow-sm border">
        <h3 className="text-lg font-medium mb-3">Metrics</h3>
        <ToggleGroup 
          type="single" 
          value={metricType}
          onValueChange={(value) => {
            if (value) onMetricChange(value);
          }}
          className="justify-start flex flex-wrap"
        >
          <ToggleGroupItem value="workouts" aria-label="Workout count">
            <Dumbbell className="mr-1 h-4 w-4" />
            Workouts
          </ToggleGroupItem>
          <ToggleGroupItem value="calories" aria-label="Calories burned">
            <BarChart className="mr-1 h-4 w-4" />
            Calories
          </ToggleGroupItem>
          <ToggleGroupItem value="duration" aria-label="Workout duration">
            <Clock className="mr-1 h-4 w-4" />
            Duration
          </ToggleGroupItem>
          <ToggleGroupItem value="muscles" aria-label="Muscle groups">
            <Calendar className="mr-1 h-4 w-4" />
            Muscles
          </ToggleGroupItem>
          <ToggleGroupItem value="steps" aria-label="Step count">
            <Footprints className="mr-1 h-4 w-4" />
            Steps
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
