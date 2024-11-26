import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeRangeSelectProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

export function TimeRangeSelect({ timeRange, setTimeRange }: TimeRangeSelectProps) {
  return (
    <Select value={timeRange} onValueChange={setTimeRange}>
    <SelectTrigger
      className="h-[30px] w-[70px] lg:h-[35px] lg:w-[80px] xl:w-[140px] xl:h-[40px] rounded-lg sm:ml-auto"
      aria-label="Select a value"
    >
      <SelectValue placeholder="Last 7 days" />
    </SelectTrigger>
    <SelectContent className="rounded-xl">
      <SelectItem value="7d" className="rounded-md">
        Last 7 days
      </SelectItem>
      <SelectItem value="24h" className="rounded-md">
        Last 24 Hours
      </SelectItem>
      <SelectItem value="1h" className="rounded-md">
        Last Hour
      </SelectItem>
      <SelectItem value="1min" className="rounded-md">
        Real-Time
      </SelectItem>
    </SelectContent>
  </Select>
  );
}

