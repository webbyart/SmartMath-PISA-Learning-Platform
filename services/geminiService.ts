
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { ScaffoldingLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface AnalysisResult {
  level: ScaffoldingLevel;
  message: string;
  isCorrect: boolean;
}

export const analyzeResponse = async (
  problemContext: string,
  question: string,
  selectedChoice: string | null,
  reasoning: string,
  attempts: number
): Promise<AnalysisResult> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Context: ${problemContext}
    Question: ${question}
    Student selected choice: ${selectedChoice || 'ไม่ได้เลือก (เป็นข้อเขียน)'}
    Student reasoning/answer: ${reasoning}
    Current attempt number: ${attempts}

    Please evaluate the student's mathematical literacy and reasoning.
    Based on the Scaffolding rules, provide a feedback response.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          level: { 
            type: Type.STRING, 
            enum: [
                ScaffoldingLevel.CONFIRMATIVE, 
                ScaffoldingLevel.GUIDED, 
                ScaffoldingLevel.STEP_BY_STEP, 
                ScaffoldingLevel.COGNITIVE
            ] 
          },
          message: { type: Type.STRING },
          isCorrect: { type: Type.BOOLEAN }
        },
        required: ["level", "message", "isCorrect"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text || '{}');
    return result as AnalysisResult;
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return {
      level: ScaffoldingLevel.GUIDED,
      message: "ขออภัย ระบบขัดข้องชั่วคราว ลองทบทวนวิธีคิดและอธิบายเพิ่มอีกนิดนะ",
      isCorrect: false
    };
  }
};
