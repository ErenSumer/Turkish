"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TextInput from "@/app/components/TextInput";
import AnalysisResult from "@/app/components/AnalysisResult";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import type { AnalysisResult as AnalysisResultType } from "@/app/types";
import HistoryPanel from "@/app/components/HistoryPanel";
import { historyStorage } from "@/app/utils/storage";
import type { AnalysisHistory } from "@/app/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  useEffect(() => {
    setHistory(historyStorage.getAll());
  }, []);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Çözümleme sırasında bir hata oluştu");
      }

      const analysisHistory: AnalysisHistory = {
        id: uuidv4(),
        text,
        result: data.data,
        timestamp: Date.now(),
      };

      historyStorage.save(analysisHistory);
      setHistory(historyStorage.getAll());
      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClear = () => {
    historyStorage.clear();
    setHistory([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Hacı Şöhret Demiröz Fen Lisesi<br/>
Türkçe Düşün Türkçe Yaz<br/>
          Tübitak 2204 Projesi
        </h1>

        <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} />

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isLoading && <LoadingSpinner />}

        {!isLoading && result && <AnalysisResult result={result} />}
      </div>

      <HistoryPanel
        history={history}
        onSelect={(analysis) => {
          setResult(analysis.result);
        }}
        onClear={handleHistoryClear}
      />
    </main>
  );
}
