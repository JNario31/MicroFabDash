"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeHumidLineChartFiltered from "./ui/app-humidity-filtered-chart";


const queryClient = new QueryClient();

export function HomeHumidFilteredCard(){
    return(
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Humidity</CardTitle>
                    <CardDescription>Building: Bergeron, PetrieA, PetrieB</CardDescription>
                </CardHeader>
                <CardContent>
                    <QueryClientProvider client={queryClient}>
                        <HomeHumidLineChartFiltered/>
                    </QueryClientProvider>
                </CardContent>
            </Card>
        </div>
    );
}