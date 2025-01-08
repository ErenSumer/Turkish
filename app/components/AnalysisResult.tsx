import type { AnalysisResult } from "@/app/types";

interface AnalysisResultProps {
  result: AnalysisResult;
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-8 border border-white/10 bg-black/40 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
      <div className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Çözümleme Sonuçları
        </h2>
      </div>
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90">Düzeltilmiş Cümle</h3>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
          <p className="text-white whitespace-pre-line">{result.fixedSentence}</p>
        </div>
      </section>
      {/* Foreign Words Section */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90">Yabancı Kelimeler</h3>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
          {result.foreignWords.length > 0 ? (
            <ul className="list-disc pl-4">
              {result.foreignWords.map((word, index) => (
                <li key={index} className="text-white">
                  {word}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Yabancı kelime bulunamadı.</p>
          )}
        </div>
      </section>

      {/* Turkish Alternatives Section */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90">
          Türkçe Seçenekler
        </h3>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
          {result.alternatives.map((item, index) => (
            <div key={index} className="mb-2">
              <span className="font-medium">{item.word}:</span>{" "}
              <span className="text-green-600">
                {item.suggestions.join(", ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Meaning Section */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90">Anlam</h3>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
          <p className="text-white whitespace-pre-line">{result.meaning}</p>
        </div>
      </section>

      {/* Detailed Analysis Section */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-white/90">Detaylı Çözümleme</h3>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
          <p className="text-white whitespace-pre-line">{result.analysis}</p>
        </div>
      </section>
    </div>
  );
}
