import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import { formatXAxisTickInterval } from "./formatXAxisTickInterval";
import { formatXAxisTick } from "./formatXAxisTick";
import { useScreenSize } from "./screensizes";

interface DefaultLineChartProps {
    chartConfig: ChartConfig;
    filteredData: any[] | undefined;
    timeRange: string;
}

export default function DefaultLineChart({
    chartConfig,
    filteredData,
    timeRange
}: DefaultLineChartProps){

    const {isMobile, isTablet, isLaptop, isDesktop} = useScreenSize();

    const interval = formatXAxisTickInterval(timeRange, {
      isLaptop, isDesktop,
    })

    return(
    <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
       <LineChart
         accessibilityLayer
         data={filteredData}
         margin={{
           left: 0,
           right: 50,
         }}
       >
          {/*Format X axis based on what time range is selected, see formatXAxisTick.ts*/}
         <XAxis
           dataKey="timestamp"
           tickLine={true}
           axisLine={true}
           tickMargin={8}
           tickFormatter={(value)=>formatXAxisTick(value, timeRange)}
           interval={interval}
         />
         <YAxis/>
         <Tooltip/>
         <ReferenceLine y={21} stroke="pink" strokeDasharray={"3 3"}/>
         <Line
           dataKey="data"
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