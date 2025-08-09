import { model } from "../utils/geminiClient";

export const summarize = async (text: string): Promise<string> => {
  const prompt = `Summarize the following text in a concise, high-quality way.
Focus only on the most important points.
Keep it under 5 sentences or 80 words.
Use bullet points only if it makes the summary clearer.
Avoid minor details, repetition, and filler phrases.
Maintain a professional, objective tone.
:\n\n${text}`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: unknown) {
    console.error("Gemini summarization failed:", error);
    throw new Error("Failed to summarize text.");
  }
};
