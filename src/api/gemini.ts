import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

export interface FilePart {
  mimeType: string;
  data: string; // base64
}

export const sendMessageToGemini = async (
    apiKey: string,
    messages: Message[],
    options: {
      model?: string;
      temperature?: number;
      topP?: number;
      maxTokens?: number;
      systemInstruction?: string;
      files?: FilePart[];
      onChunk?: (chunk: string) => void;
    } = {}
) => {
  const {
    model = "gemini-1.5-flash",
    temperature = 0.7,
    topP = 0.9,
    maxTokens = 2000,
    systemInstruction,
    files,
    onChunk
  } = options;
  const ai = new GoogleGenAI({ apiKey });

  const history = messages.slice(0, -1).map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const lastMessage = messages[messages.length - 1];

  const currentParts: any[] = [{ text: lastMessage.content }];
  if (files && files.length > 0) {
    files.forEach(file => {
      currentParts.push({
        inlineData: {
          mimeType: file.mimeType,
          data: file.data
        }
      });
    });
  }

  const config: any = {
    model,
    contents: [
      ...history,
      { role: 'user', parts: currentParts }
    ],
    generationConfig: {
      temperature,
      topP,
      maxOutputTokens: maxTokens,
    }
  };

  if (systemInstruction) {
    config.systemInstruction = {
      role: 'system',
      parts: [{ text: systemInstruction }]
    };
  }

  if (onChunk) {
    const response = await ai.models.generateContentStream(config);

    let fullText = "";
    for await (const chunk of response) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(chunkText);
      }
    }
    return fullText;
  } else {
    const response = await ai.models.generateContent(config);
    return response.text;
  }
};

export const generateChatTitle = async (apiKey: string, firstMessage: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Создай краткое и емкое название для чата (не более 3-4 слов) на основе этого первого сообщения пользователя: "${firstMessage}". Ответь ТОЛЬКО названием, без кавычек и точек.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    const title = response.text.trim();
    return title.replace(/^["']|["']$/g, '');
  } catch (error) {
    console.error('Failed to generate title:', error);
    return firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage;
  }
};
