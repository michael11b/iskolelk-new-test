// types/alData.ts

export interface YearsByMedium {
    sinhala?: number[];
    tamil?: number[];
    english?: number[];
    [key: string]: number[] | undefined; // fallback for any other mediums
  }
  
  export interface ALStream {
    stream: string;
    subject: string;
    years: number[];
    mediums: string[];
    yearsByMedium: YearsByMedium;
  }
  
  export interface ALData {
    _id: string;       // "al"
    examType: string;  // "al"
    streams: ALStream[];
  }
  