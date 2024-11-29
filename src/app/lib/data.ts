import { queryOptions, QueryOptions } from "@tanstack/react-query";

export const BergeronOptions = queryOptions({
    queryKey:['bergeron'],
    queryFn: async()=>{
        const response = await fetch('http://127.0.0.1:5000/buildings/1/sensors')
        const data = await response.json();
        console.log('Fetched data:', data);  // Log the data here
        return  data.map((sensor: { temperature: any; humidity: any; timestamp: any; }) => ({
            humidity: sensor.humidity,
            temperature: sensor.temperature,
            timestamp: sensor.timestamp,
        }));
    },
    refetchInterval: 1000,
})