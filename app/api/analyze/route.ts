import { NextResponse } from "next/server";
import { analyzeText } from "@/app/utils/gemini";
import type { ApiResponse } from "@/app/types";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Metin boş olamaz",
        },
        { status: 400 }
      );
    }

    if (text.length > 1000) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Metin 1000 karakterden uzun olamaz",
        },
        { status: 400 }
      );
    }

    const analysis = await analyzeText(text);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Analiz sırasında bir hata oluştu",
      },
      { status: 500 }
    );
  }
}
