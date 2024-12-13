import { AnalysisHistory } from "@/app/types";

interface HistoryPanelProps {
  history: AnalysisHistory[];
  onSelect: (analysis: AnalysisHistory) => void;
  onClear: () => void;
}

export default function HistoryPanel({
  history,
  onSelect,
  onClear,
}: HistoryPanelProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-6 top-6 w-80 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Geçmiş Analizler
        </h3>
        <button
          onClick={onClear}
          className="text-red-500 hover:text-red-400 transition-colors"
        >
          Temizle
        </button>
      </div>

      <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all transform hover:scale-102"
          >
            <p className="text-sm font-medium truncate">{item.text}</p>
            <p className="text-xs text-gray-500">
              {new Date(item.timestamp).toLocaleDateString("tr-TR")}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
