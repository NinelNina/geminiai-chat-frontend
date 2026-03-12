import React from 'react';
import { Settings, Menu } from 'lucide-react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import type {Message as MessageType} from '../../types';

interface ChatWindowProps {
    chatTitle: string;
    messages: MessageType[];
    isTyping?: boolean;
    isGenerating?: boolean;
    onSendMessage: (message: string) => void;
    onStopGeneration?: () => void;
    onOpenSettings: () => void;
    onToggleSidebar?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
                                                          chatTitle,
                                                          messages,
                                                          isTyping = false,
                                                          isGenerating = false,
                                                          onSendMessage,
                                                          onStopGeneration,
                                                          onOpenSettings,
                                                          onToggleSidebar,
                                                      }) => {
    return (
        <main className="flex-1 flex flex-col h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                        <Menu size={20} />
                    </button>
                    <h2 className="text-lg font-semibold dark:text-white truncate">
                        {chatTitle}
                    </h2>
                </div>

                <button
                    onClick={onOpenSettings}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Настройки"
                >
                    <Settings size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
            </header>

            {/* Messages */}
            <MessageList
                messages={messages}
                isTyping={isTyping}
            />

            {/* Input Area */}
            <InputArea
                onSendMessage={onSendMessage}
                onStopGeneration={onStopGeneration}
                isGenerating={isGenerating}
            />
        </main>
    );
};