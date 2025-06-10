// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ambil API key dari environment
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

// Inisialisasi Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Tambahkan prompt sistem di awal
    const systemPrompt = {
      role: "user",
      parts: [
        {
          text:
            "Kamu adalah asisten dari ecommerce bernama Footwear yang berfokus pada penjualan sepatu. " +
            "Tugasmu adalah membantu pembeli dalam hal-hal yang berkaitan dengan sepatu. " +
            "Jika ada pertanyaan di luar topik sepatu, tolak secara sopan dengan mengatakan bahwa kamu hanya dapat membantu seputar data sepatu.",
        },
      ],
    };

    // Gabungkan system prompt dan history dari user
    const history = [
      systemPrompt,
      ...messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    ];

    const result = await model.generateContent({
      contents: history,
    });

    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ message: text });
  } catch (error: any) {
    if (error.status === 429) {
      return res.status(429).json({
        error:
          "Kamu telah melewati batas permintaan untuk saat ini. Silakan coba lagi nanti.",
      });
    }
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
}
