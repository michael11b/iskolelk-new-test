// types/data.ts

export interface KeyLabel {
    key: string;
    label: string;
  }
  
  export interface ALStream extends KeyLabel {}
  
  export interface ALSubject extends KeyLabel {}
  
  export interface OLSubject extends KeyLabel {}
  
  export interface Language extends KeyLabel {}
  
  export interface ResourceCategory extends KeyLabel {}
  
  export interface ALSubjectsByStream {
    science: ALSubject[];
    commerce: ALSubject[];
    art: ALSubject[];
    technology: ALSubject[];
    [key: string]: ALSubject[]; // fallback for possible new streams
  }
  
  export interface ExamYear {
    year: number;
    sinhala: boolean;
    tamil: boolean;
    english: boolean;
  }
  
  export interface DataJson {
    AL_STREAMS: ALStream[];
    AL_SUBJECTS_BY_STREAM: ALSubjectsByStream;
    OL_SUBJECTS: OLSubject[];
    AL_LANGUAGES: Language[];
    OL_LANGUAGES: Language[];
    SCHOLARSHIP_LANGUAGES: Language[];
    EXAM_YEARS: ExamYear[];
    SCHOLARSHIP_YEARS: number[];
    GRADES: string[];
    RESOURCE_CATEGORIES: ResourceCategory[];
  }
  