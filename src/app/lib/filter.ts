import { HumidData, TempData } from "./definitions";
import { isAfter, parseISO, subDays, subHours, subMinutes } from "date-fns";

export function filter(chartData: TempData[] | HumidData[], timeRange: string) {
    let startDate: Date;

    // Set the start date based on the time range
    if (timeRange === "7d") {
        startDate = subDays(new Date(), 7); // Last 7 days
    } else if (timeRange === "24h") {
        startDate = subHours(new Date(), 24); // Last 24 hours
    } else if (timeRange === "1h") {
        startDate = subHours(new Date(), 1); // Last 1 hour
    } else {
        return chartData; // No filtering if no valid time range
    }

    // Filter the chart data
    const filteredData = chartData.filter((item) => {
        const itemDate = parseISO(item.timestamp); // Parse the item's timestamp
        console.log("Item Date",itemDate)
        console.log("Start Date",startDate)
        return isAfter(itemDate, startDate);
    });

    // Takes the last 10 data points of the filtered data
    const Every10thPoints= filteredData
        .map((_, index) => index)
        .filter(index => index % 30 === 0)
        .map(index => filteredData[index]);

    // Takes every 30th point from the last 24 hours
    const Every30thPoint =  filteredData
        .map((_, index) => index)
        .filter(index => index % 30 === 0)
        .map(index => filteredData[index]);

    // Takes every 50th point from the last 7 days
    const Every50thPoint =  filteredData
        .map((_, index) => index)
        .filter(index => index % 50 === 0)
        .map(index => filteredData[index]);

    if(timeRange === "7d") return Every50thPoint; else if(timeRange === "24h") return Every30thPoint; else return Every10thPoints;
}
