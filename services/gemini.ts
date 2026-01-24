
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize AI client using named parameter and environment variable directly
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const sendMessageToAI = async (message: string, history: { role: 'user' | 'model', text: string }[]) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
    // Fix: Properly include history for maintaining conversation context
    history: history.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }))
  });

  // Use chat.sendMessage and access the .text property
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const getQuickRecommendation = async (preference: string) => {
  const ai = getAIClient();
  // Use models.generateContent for single-turn recommendations
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Recommend one item from Harino's menu for someone who likes: ${preference}. Just give the item name and a very short one-sentence reason.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });
  return response.text;
};
