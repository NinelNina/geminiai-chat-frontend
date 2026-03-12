import React from 'react';
import { Bot } from 'lucide-react';

interface TypingIndicatorProps {
    isVisible?: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible = true }) => {
    if (!isVisible) return null;

    return (
        <div className="flex gap-4 px-6 py-4">
            {/* Avatar */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                <Bot size={18} className="text-white" />
            </div>

            {/* Контент */}
            <div className="flex-1 max-w-3xl">
                <span className="text-sm font-medium text-[var(--color-text-secondary)] mb-1.5 block">
                    GigaChat
                </span>

                {/* Анимированные точки */}
                <div className="inline-block bg-[var(--color-message-assistant)] border border-[var(--color-border)] rounded-2xl rounded-tl-sm px-5 py-4">
                    <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-bounce"
                              style={{ animationDelay: '0ms', animationDuration: '1s' }} />
                        <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-bounce"
                              style={{ animationDelay: '150ms', animationDuration: '1s' }} />
                        <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-bounce"
                              style={{ animationDelay: '300ms', animationDuration: '1s' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};