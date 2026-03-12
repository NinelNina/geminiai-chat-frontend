import React, { useEffect, useRef } from 'react';
import type { Message as MessageType } from '../../types';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';
import {Bot} from "lucide-react";

interface MessageListProps {
    messages: MessageType[];
    isTyping?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
                                                            messages,
                                                            isTyping = false
                                                        }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto py-6">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-6">
                            <Bot size={32} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                            Добро пожаловать в GigaChat!
                        </h3>
                        <p className="text-[var(--color-text-muted)] max-w-md">
                            Задайте любой вопрос или начните разговор. Я помогу вам с чем угодно!
                        </p>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <Message key={message.id || index} message={message} />
                        ))}

                        {isTyping && <TypingIndicator isVisible={true} />}
                    </>
                )}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};