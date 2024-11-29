"use client"
import { BergeronOptions } from "@/app/lib/data";
import { HumidData } from "@/app/lib/definitions";
import { ChartConfig } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { TimeRangeSelect } from "./TimeRangeSelect";
import DefaultLineChart from "@/app/lib/LineChart";
import { filter } from "@/app/lib/filter"

export default function HomeHumidLineChartFiltered(){
    const {data, isLoading} = useQuery(BergeronOptions)
    const chartDataRef = useRef<HumidData[]>([]);
    const [chartData, setChartData] = useState<HumidData[]>([]);
    const [timeRange, setTimeRange] = useState("7d")

    useEffect(()=>{
      if(data) {
        const newData: HumidData[] = data.map((item:any)=>({
          humidity: item.humidity,
          timestamp: item.timestamp,
        }));
    
        chartDataRef.current = newData;
        setChartData(newData);
      }
    },[data]);

    const filteredData = filter(chartData,timeRange)
        if(isLoading) return <h1>loading...</h1>
        console.log('Humid Chart Data:', filteredData);
        //console.log('Humid Data:', filteredData);

    const chartConfig = {
        bergeron: {
            label: "Bergeron",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig

    return (
        <>
        <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange}/>
        <DefaultLineChart chartConfig={chartConfig} filteredData={filteredData} timeRange={timeRange} lineDataKey="humidity"/>
        </>
    );
}