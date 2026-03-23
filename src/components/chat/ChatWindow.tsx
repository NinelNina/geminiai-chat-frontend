import React, { useState } from 'react';
import { Settings, Menu } from 'lucide-react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import type { Message as MessageType } from '../../types';

interface ChatWindowProps {
    chatTitle: string;
    initialMessages?: MessageType[];
    onSendMessage: (message: string) => void;
    //onStopGeneration?: () => void;
    onOpenSettings: () => void;
    onToggleSidebar?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
                                                          chatTitle,
                                                          initialMessages = [],
                                                          onSendMessage,
                                                          //onStopGeneration,
                                                          onOpenSettings,
                                                          onToggleSidebar,
                                                      }) => {

    const [isDark] = React.useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    React.useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const [messages, setMessages] = useState<MessageType[]>(initialMessages);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = (content: string) => {
        const userMessage: MessageType = {
            id: Date.now().toString(),
            content,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        onSendMessage(content);

        setTimeout(() => {
            const aiMessage: MessageType = {
                id: (Date.now() + 1).toString(),
                content: 'Это моковый ответ от GigaChat.',
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 2000);
    };

    const handleStopGeneration = () => {
        setIsLoading(false);
    };

    return (
        <main className="flex-1 flex flex-col h-screen bg-[var(--color-chat-bg)] min-w-[320px]">
            {/* Header */}
            <header className="flex items-center justify-between px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-3 sm:py-4 border-b border-[var(--color-border)] bg-[var(--color-sidebar-bg)]/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 min-w-0 max-w-[70%]">
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-1.5 xs:p-2 hover:bg-[var(--color-hover)] rounded-lg transition-colors flex-shrink-0"
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 text-[var(--color-text-secondary)]" />
                    </button>

                    <div className="min-w-0">
                        <h2 className="text-sm xs:text-base sm:text-lg font-semibold text-[var(--color-text)] truncate">
                            {chatTitle}
                        </h2>
                        <p className="text-xs text-[var(--color-text-muted)] truncate">
                            {messages.length} {messages.length === 1 ? 'сообщение' :
                            messages.length >= 2 && messages.length <= 4 ? 'сообщения' : 'сообщений'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 flex-shrink-0">
                    <button
                        onClick={onOpenSettings}
                        className="p-1.5 xs:p-2 hover:bg-[var(--color-hover)] rounded-lg transition-colors"
                        title="Настройки"
                    >
                        <Settings size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[var(--color-text-secondary)]" />
                    </button>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
                <div className="w-full px-2 xs:px-3 sm:px-4 py-3 xs:py-4 sm:py-6 md:py-8">
                    <div className="max-w-3xl mx-auto">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full min-h-[250px] xs:min-h-[300px] sm:min-h-[400px] text-center px-2 xs:px-4">
                                <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-3 xs:mb-4 sm:mb-6">
                                    <span className="text-xl xs:text-2xl sm:text-3xl text-white">💬</span>
                                </div>
                                <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-[var(--color-text)] mb-1 xs:mb-2">
                                    Начните разговор
                                </h3>
                                <p className="text-xs xs:text-sm sm:text-base text-[var(--color-text-muted)] max-w-md px-2">
                                    Задайте вопрос или напишите сообщение
                                </p>
                            </div>
                        ) : (
                            <MessageList messages={messages} isLoading={isLoading} />
                        )}
                    </div>
                </div>
            </div>

            {/* Input Area - исправленные отступы */}
            <div className="border-t border-[var(--color-border)] bg-[var(--color-sidebar-bg)]/50 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto">
                    <InputArea
                        onSendMessage={handleSendMessage}
                        onStopGeneration={handleStopGeneration}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </main>
    );
};