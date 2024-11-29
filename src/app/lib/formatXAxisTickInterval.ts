export function formatXAxisTickInterval( timeRange:  string, screenSizes: {isLaptop: boolean, isDesktop: boolean }): number{
    
    if(screenSizes.isLaptop){
        if(timeRange==="1min"){
            return 5
        }
        else if (timeRange === "1h"){
            return 2
        }else if (timeRange === "24h"){
            return 1
        }else {
            return 3
        }
    }else if(screenSizes.isDesktop){
        if(timeRange==="1min"){
            return 5
        }
        else if (timeRange === "1h"){
            return 1
        }else if (timeRange === "24h"){
            return 1
        }else {
            return 3
        }
    }

    return 25;

    

}