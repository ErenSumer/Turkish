import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalysisResult } from "@/app/types";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function analyzeText(text: string): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Lütfen aşağıdaki Türkçe metni analiz et:
    "${text}"

    Analizi şu başlıklar altında yap ve her başlığı ### ile işaretle:

    ###Yabancı Kelimeler
    (Metindeki yabancı kökenli kelimeleri listele)

    ###Türkçe Alternatifler
    (Her yabancı kelime için Türkçe karşılıklar öner)

    ###Anlam
    (Metnin anlamını detaylı açıkla)


    ###Detaylı Analiz
    (Dilbilgisi, anlatım ve üslup özelliklerini analiz et)


    Lütfen yanıtı Türkçe olarak ver.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const analysisText = response.text();

  // Parse the response into sections
  const sections = analysisText.split("###").filter(Boolean);

  const findSection = (title: string) => {
    const section = sections.find((s) =>
      s.toLowerCase().startsWith(title.toLowerCase())
    );
    return section ? section.replace(title, "").trim() : "";
  };

  const foreignWordsText = findSection("Yabancı Kelimeler");
  const alternativesText = findSection("Türkçe Alternatifler");
  const meaningText = findSection("Anlam");
  const analysisDetailText = findSection("Detaylı Analiz");

  // Process foreign words and alternatives
  const foreignWords = foreignWordsText
    .split("\n")
    .filter(Boolean)
    .map((w) => w.trim());
  const alternatives = alternativesText
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [word, ...suggestions] = line.split(":");
      return {
        word: word.trim(),
        suggestions: suggestions
          .join(":")
          .split(",")
          .map((s) => s.trim()),
      };
    });

  // Process synonyms
  

  return {
    foreignWords,
    alternatives,
    meaning: meaningText,

    analysis: analysisDetailText,
  };
}
