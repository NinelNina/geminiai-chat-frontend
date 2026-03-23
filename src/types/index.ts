export type { Message } from './message';

export interface Chat {
    id: string;
    title: string;
    lastMessage: string;
    lastMessageTime: Date;
    isActive?: boolean;
}

export interface Settings {
    model: string;
    temperature: number;
    topP: number;
    maxTokens: number;
    systemPrompt: string;
    theme: 'light' | 'dark';
}

export interface AuthCredentials {
    credentials: string;
    scope: 'GIGACHAT_API_PERS' | 'GIGACHAT_API_B2B' | 'GIGACHAT_API_CORP';
}