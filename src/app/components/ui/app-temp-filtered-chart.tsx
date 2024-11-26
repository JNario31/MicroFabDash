import { CartesianGrid, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

import { useQuery } from "@tanstack/react-query"
import { tempOptions } from "@/app/lib/data"
import { TempData } from "@/app/lib/definitions"
import { useEffect, useRef, useState } from "react"
import { filterData } from "@/app/lib/filterData"
import { formatXAxisTick } from "@/app/lib/formatXAxisTick"
import { TimeRangeSelect } from "./TimeRangeSelect"
import { formatXAxisTickInterval } from "@/app/lib/formatXAxisTickInterval"
import DefaultLineChart from "@/app/lib/lineChart"

export default function HomeTempLineChartFiltered(){

    const {data, isLoading} = useQuery(tempOptions)
    const chartDataRef = useRef<TempData[]>([]);
    const [chartData, setChartData] = useState<TempData[]>([]);
    const [timeRange, setTimeRange] = useState("1min")
   
    /**
     * Use effect adds new data to chartDataRef to be filtered
     */
   useEffect(()=>{
     if(data) {
       const newData: TempData = {
         data: data.temp,
         timestamp: new Date().toLocaleString(),
       };
   
       chartDataRef.current.push(newData);
       const latestData = chartDataRef.current
       setChartData(latestData);
     }
   },[data]);

   /**
    * Filter data according to specified time ranges from TimeRangeSelect, see filterData.ts
    */
   const filteredData=filterData(chartData,timeRange)
  
   
   if(isLoading) return <h1>loading...</h1>
   console.log('Chart Data:', chartData);
   
   console.log('Filtered Data:', filteredData);

  const chartConfig = {
    bergeron: {
      label: "Bergeron",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
   
     return (   
      <>
      <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange}/>
      <DefaultLineChart chartConfig={chartConfig} filteredData={filteredData} timeRange={timeRange}/>
      </>
     )
   }