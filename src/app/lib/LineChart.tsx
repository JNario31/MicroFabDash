import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { formatXAxisTickInterval } from "./formatXAxisTickInterval";
import { formatXAxisTick } from "./formatXAxisTick";
import { useScreenSize } from "./screensizes";

interface DefaultLineChartProps {
    chartConfig: ChartConfig;
    filteredData: any[] | undefined;
    timeRange: string;
    lineDataKey: string;
}

export default function DefaultLineChart({
    chartConfig,
    filteredData,
    timeRange,
    lineDataKey,
}: DefaultLineChartProps){

    const {isMobile, isTablet, isLaptop, isDesktop} = useScreenSize();

    return(
    <ChartContainer config={chartConfig} className="max-h-[411px] w-full">
       <LineChart
         accessibilityLayer
         data={filteredData}
         margin={{
           top:60,
           right:50,
           bottom:50,
           left:0,
         }}
       >
          {/*Format X axis based on what time range is selected, see formatXAxisTick.ts*/}
         <XAxis
           dataKey="timestamp"
           tickLine={true}
           axisLine={true}
           tickMargin={8}
           tickFormatter={(value)=>formatXAxisTick(value, timeRange)}
         />
         <YAxis/>
         <Tooltip/>
         <ReferenceLine y={21} stroke="pink" strokeDasharray={"3 3"}/>
         <Line
           dataKey={lineDataKey}
           type="natural"
           stroke="var(--color-bergeron)"
           strokeWidth={2}
           dot={false}
           isAnimationActive={false}
         />
       </LineChart>
      </ChartContainer>
    );
}