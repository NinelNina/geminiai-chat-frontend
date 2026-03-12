import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Bot, User } from 'lucide-react';
import type { Message as MessageType } from '../../types';

interface MessageProps {
    message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
    const [copied, setCopied] = useState(false);

    const isUser = message.role === 'user';

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`flex gap-4 px-6 py-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                isUser
                    ? 'bg-[var(--color-accent)]'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
            }`}>
                {isUser ? (
                    <User size={18} className="text-white" />
                ) : (
                    <Bot size={18} className="text-white" />
                )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
                {/* Имя отправителя */}
                <span className="text-sm font-medium text-[var(--color-text-secondary)] mb-1.5 block">
                    {isUser ? 'Вы' : 'GigaChat'}
                </span>

                {/* Сообщение с кнопкой копирования */}
                <div className="relative group inline-block max-w-full">
                    <div className={`inline-block text-left px-5 py-3.5 rounded-2xl shadow-sm ${
                        isUser
                            ? 'bg-[var(--color-message-user)] text-[var(--color-message-user-text)] rounded-tr-sm'
                            : 'bg-[var(--color-message-assistant)] text-[var(--color-message-assistant-text)] rounded-tl-sm border border-[var(--color-border)]'
                    }`}>
                        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Кнопка копирования */}
                    <button
                        onClick={handleCopy}
                        className={`absolute top-0 ${isUser ? 'left-0 -translate-x-full -ml-2' : 'right-0 translate-x-full mr-2'} 
                            opacity-0 group-hover:opacity-100 transition-all p-2 
                            bg-[var(--color-input-bg)] hover:bg-[var(--color-hover)] 
                            border border-[var(--color-border)] rounded-lg shadow-sm
                            text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]`}
                        title="Копировать"
                    >
                        {copied ? (
                            <Check size={14} className="text-green-500" />
                        ) : (
                            <Copy size={14} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};