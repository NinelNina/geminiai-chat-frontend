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
      files?: FilePart[];
      onChunk?: (chunk: string) => void;
      abortSignal?: AbortSignal;
    } = {}
) => {
  const { model = "gemini-3-flash-preview", temperature, topP, maxTokens, files, onChunk, abortSignal } = options;
  const ai = new GoogleGenAI({ apiKey });

  const validMessages = [];
  for (let i = 0; i < messages.length; i++) {
    const isLast = i === messages.length - 1;
    const currentMsg = messages[i];
    const nextMsg = messages[i + 1];

    if (currentMsg.role === 'user' && !isLast && nextMsg && nextMsg.role === 'user') {
      continue;
    }
    validMessages.push(currentMsg);
  }

  const allContents: any[] = validMessages.map((msg, validIndex) => {
    const parts: any[] = [{ text: msg.content }];

    if (msg.attachments && msg.attachments.length > 0) {
      msg.attachments.forEach(file => {
        parts.push({
          inlineData: {
            mimeType: file.mimeType,
            data: file.data
          }
        });
      });
    }

    if (validIndex === validMessages.length - 1 && files && files.length > 0) {
      files.forEach(file => {
        parts.push({
          inlineData: {
            mimeType: file.mimeType,
            data: file.data
          }
        });
      });
    }

    return {
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts
    };
  });

  const mergedContents = [];
  for (const content of allContents) {
    const last = mergedContents[mergedContents.length - 1];
    if (last && last.role === content.role) {
      last.parts.push({ text: '\n\n' });
      last.parts.push(...content.parts);
    } else {
      mergedContents.push(content);
    }
  }

  const config: any = {
    model,
    contents: mergedContents,
    config: {
      temperature,
      topP,
      maxOutputTokens: maxTokens,
    }
  };

  if (abortSignal) {
    config.config = config.config || {};
    config.config.abortSignal = abortSignal;
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

export const generateChatTitle = async (apiKey: string, userModel: string, firstMessage: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Создай краткое и емкое название для чата (не более 3-4 слов) на основе этого первого сообщения пользователя: "${firstMessage}". Ответь ТОЛЬКО названием, без кавычек и точек.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });
    const title = response.text.trim();
    return title.replace(/^["']|["']$/g, '');
  } catch (error: any) {
    const errorMsg = error?.message || '';
    if (errorMsg.includes('429') || errorMsg.includes('Quota')) {
      console.warn('Rate limit hit while generating chat title. Using fallback.');
    } else if (errorMsg.includes('503') || errorMsg.includes('UNAVAILABLE')) {
      console.warn('Gemini service unavailable (503) while generating title. Using fallback.');
    } else {
      console.error('Failed to generate title:', error);
    }
    return firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage;
  }
};
