export interface ScholarshipData {
    _id: string; // "scholarship"
    examType: string; // e.g. "scholarship"
    streams: Stream[];
  }
  
  export interface Stream {
    stream: string;   // stream name, here empty string
    subject: string;  // subject name, here empty string
    years: number[];  // list of available years
    mediums: string[]; // e.g. ["tamil", "sinhala"]
    yearsByMedium: Record<string, number[]>; 
    // dynamically keyed object:
    // { tamil: [years], sinhala: [years] }
  }
  