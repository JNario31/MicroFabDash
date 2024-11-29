import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeRangeSelectProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

export function TimeRangeSelect({ timeRange, setTimeRange }: TimeRangeSelectProps) {
  return (
    <Select value={timeRange} onValueChange={setTimeRange}>
    <SelectTrigger
      className="h-[30px] w-[70px] lg:h-[35px] lg:w-[80px] xl:w-[140px] xl:h-[35px] rounded-lg sm:ml-auto"
      aria-label="Select a value"
    >
      <SelectValue placeholder="Last 7 days" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="7d">
        Last 7 days
      </SelectItem>
      <SelectItem value="24h">
        Last 24 Hours
      </SelectItem>
      <SelectItem value="1h">
        Last Hour
      </SelectItem>
    </SelectContent>
  </Select>
  );
}

