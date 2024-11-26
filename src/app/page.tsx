import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeTempFilteredCard } from "./components/app-temp-filtered-card";
import { HomeHumidFilteredCard } from "./components/app-humid-filtered-card";

export const runtime = 'edge'


export default function Home() {

  return (
    <>
    <div className="grid-cols-1">
      <div className="p-2">
        {<HomeTempFilteredCard/>}
      </div>
      <div className="p-2">
        {<HomeHumidFilteredCard/>}
      </div>
      <div className="p-2">
        {<Card >
          <CardHeader>
            <CardTitle>Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            Add Chart
          </CardContent>
        </Card>}
      </div>
  
    </div>
    </>
   
  );
}
