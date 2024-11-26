"use client"
import { humidOptions } from "@/app/lib/data";
import { HumidData } from "@/app/lib/definitions";
import { filterData } from "@/app/lib/filterData";
import { ChartConfig } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { TimeRangeSelect } from "./TimeRangeSelect";
import DefaultLineChart from "@/app/lib/lineChart";

export default function HomeHumidLineChartFiltered(){
    const {data, isLoading} = useQuery(humidOptions)
    const chartDataRef = useRef<HumidData[]>([]);
    const [chartData, setChartData] = useState<HumidData[]>([]);
    const [timeRange, setTimeRange] = useState("1min")

    useEffect(()=>{
        if(data) {
          const newData: HumidData = {
            data: data.humid,
            timestamp: new Date().toLocaleString(),
          };
      
          chartDataRef.current.push(newData);
          const latestData = chartDataRef.current
          setChartData(latestData);
        }
      },[data]);

    const filteredData = filterData(chartData,timeRange)
        if(isLoading) return <h1>loading...</h1>
        console.log('Humid Chart Data:', filteredData);
        console.log('Humid Data:', filteredData);

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
    );
}