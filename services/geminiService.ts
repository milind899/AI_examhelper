import { GoogleGenAI } from "@google/genai";
import { COURSE_CONTENT } from "../constants";

let aiClient: GoogleGenAI | null = null;

// Initialize the client safely
try {
  if (process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize Gemini client", error);
}

export const generateStudyHelp = async (query: string): Promise<string> => {
  if (!aiClient) {
    return "API Key is missing. Please check your configuration.";
  }

  try {
    const courseContext = JSON.stringify(COURSE_CONTENT);
    const systemInstruction = `You are a helpful and encouraging tutor for the course ${COURSE_CONTENT.courseName} (${COURSE_CONTENT.courseCode}). 
    You have the following syllabus context: ${courseContext}.
    
    Answer the student's question concisely and accurately. 
    If they ask about a specific topic from the syllabus, explain it simply with an example.
    If they ask about a PYQ (Previous Year Question), guide them on how to structure their answer.
    Keep answers formatted with Markdown for readability.
    `;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while contacting the AI tutor.";
  }
};