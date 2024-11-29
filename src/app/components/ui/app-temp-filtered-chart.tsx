import {
  ChartConfig,
} from "@/components/ui/chart"

import { useQuery } from "@tanstack/react-query"
import { BergeronOptions } from "@/app/lib/data"
import { TempData } from "@/app/lib/definitions"
import { useEffect, useRef, useState } from "react"
import { TimeRangeSelect } from "./TimeRangeSelect"
import DefaultLineChart from "@/app/lib/LineChart"
import { filter } from "@/app/lib/filter"

export default function HomeTempLineChartFiltered(){

    const {data, isLoading} = useQuery(BergeronOptions)
    const chartDataRef = useRef<TempData[]>([]);
    const [chartData, setChartData] = useState<TempData[]>([]);
    const [timeRange, setTimeRange] = useState("7d")
   
    /**
     * Use effect adds new data to chartDataRef to be filtered
     */
   useEffect(()=>{
     if(data) {
       const newData: TempData[] = data.map((item:any)=>({
         temperature: item.temperature,
         timestamp: item.timestamp,
       }));
   
       chartDataRef.current = newData;
       setChartData(newData);
     }
   },[data]);

   /**
    * Filter data according to specified time ranges from TimeRangeSelect, see filterData.ts
    */
   const filteredData=filter(chartData,timeRange)
  
   if(isLoading) return <h1>loading...</h1>

   console.log('Filtered Finished Data:', filteredData);

  const chartConfig = {
    bergeron: {
      label: "Bergeron",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
   
     return (   
      <>
      <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange}/>
      <DefaultLineChart chartConfig={chartConfig} filteredData={filteredData} timeRange={timeRange} lineDataKey="temperature"/>
      </>
     )
   }