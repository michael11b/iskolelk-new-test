// types/olData.ts

export interface YearsByMedium {
    sinhala?: number[];
    tamil?: number[];
    english?: number[];
    [key: string]: number[] | undefined; // fallback for other mediums if added later
  }
  
  export interface OLStream {
    stream: string;       // can be "" (empty string) for O/L
    subject: string;      // subject key like "saivanery", "communication-and-media"
    years: number[];      // list of years
    mediums: string[];    // e.g., ["sinhala", "english", "tamil"]
    yearsByMedium: YearsByMedium;
  }
  
  export interface OLData {
    _id: string;       // "ol"
    examType: string;  // "ol"
    streams: OLStream[];
  }
  