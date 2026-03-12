import React from 'react';
import { Bot } from 'lucide-react';

interface TypingIndicatorProps {
    isVisible?: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible = true }) => {
    if (!isVisible) return null;

    return (
        <div className="flex gap-4 mb-6">
            {/* Avatar */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot size={16} className="text-white" />
            </div>

            {/* Typing Dots */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
};