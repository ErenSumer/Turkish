export interface AnalysisResult {
  foreignWords: string[];
  alternatives: {
    word: string;
    suggestions: string[];
  }[];
  fixedSentence: string;
  meaning: string;
  analysis: string;
}

export interface ApiResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}
export interface AnalysisHistory {
  id: string;
  text: string;
  result: AnalysisResult;
  timestamp: number;
}
