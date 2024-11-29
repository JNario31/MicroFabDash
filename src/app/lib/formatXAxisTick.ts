export function formatXAxisTick(value: string, timeRange: string): string {
    const date = new Date(value);
    if(timeRange === "1h"){
      return date.toLocaleTimeString([],{ hour:"2-digit", minute: "2-digit"})
    }
    else if (timeRange === "24h") {
      return date.toLocaleTimeString([],{ hour:"2-digit", minute: "2-digit"}); // Display only time for 2min and 24h ranges
    } 
    else {
      return date.toLocaleDateString(); // Display only date for other ranges
    }
  }

