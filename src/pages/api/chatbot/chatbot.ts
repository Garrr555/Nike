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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Format pesan sesuai Gemini
    const history = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const result = await model.generateContent({
      contents: history,
    });

    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ message: text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
}
