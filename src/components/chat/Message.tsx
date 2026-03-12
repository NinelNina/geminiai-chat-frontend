import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Bot } from 'lucide-react';
import type {Message as MessageType} from '../../types';

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

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className={`flex gap-4 mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                isUser
                    ? 'bg-blue-600'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
            }`}>
                {isUser ? (
                    <span className="text-white text-sm font-medium">Вы</span>
                ) : (
                    <Bot size={16} className="text-white" />
                )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium dark:text-white">
            {isUser ? 'Вы' : 'GigaChat'}
          </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(message.timestamp)}
          </span>
                </div>

                <div className="relative group">
                    <div className={`inline-block text-left p-4 rounded-2xl ${
                        isUser
                            ? 'bg-blue-600 text-white rounded-tr-sm'
                            : 'bg-gray-100 dark:bg-gray-800 dark:text-white rounded-tl-sm'
                    }`}>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className={`absolute -top-2 ${isUser ? '-left-10' : '-right-10'} 
              opacity-0 group-hover:opacity-100 transition-opacity p-2 
              hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}
                        title="Копировать"
                    >
                        {copied ? (
                            <Check size={16} className="text-green-600" />
                        ) : (
                            <Copy size={16} className="text-gray-500" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};