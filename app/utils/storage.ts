import { AnalysisHistory } from '@/app/types';

const HISTORY_KEY = 'analysis_history';

export const historyStorage = {
  save: (analysis: AnalysisHistory) => {
    const history = historyStorage.getAll();
    const updatedHistory = [analysis, ...history].slice(0, 10); // Keep last 10 analyses
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  },

  getAll: (): AnalysisHistory[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  clear: () => {
    localStorage.removeItem(HISTORY_KEY);
  }
};
