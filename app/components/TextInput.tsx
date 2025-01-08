import { useState, KeyboardEvent } from "react";

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function TextInput({ onAnalyze, isLoading }: TextInputProps) {
  const [text, setText] = useState("");
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim() && !isLoading) {
        onAnalyze(text);
      }
    }
  };
  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Çözümlemek istediğiniz metni buraya yazın..."
        className="w-full h-48 p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl
               text-white placeholder-zinc-500 focus:outline-none focus:ring-2
               focus:ring-blue-500/50 transition-all text-lg"
      />
      <button
        onClick={() => onAnalyze(text)}
        disabled={isLoading || !text.trim()}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium
               rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
               transition-all transform hover:scale-105 active:scale-95"
      >
        {isLoading ? "Çözümleniyor..." : "Çözümle"}
      </button>
    </div>
  );
}
