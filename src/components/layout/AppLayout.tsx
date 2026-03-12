import React, { useEffect } from 'react';
import { Sidebar } from '../sidebar/Sidebar';
import { ChatWindow } from '../chat/ChatWindow';
import { SettingsPanel } from '../settings/SettingsPanel';
import type { Chat, Message, Settings } from '../../types';

interface AppLayoutProps {
    chats: Chat[];
    messages: Message[];
    activeChatId: string | null;
    searchQuery: string;
    settings: Settings;
    isTyping: boolean;
    isGenerating: boolean;
    isSettingsOpen: boolean;
    isSidebarOpen: boolean;
    onNewChat: () => void;
    onSearchChange: (query: string) => void;
    onSelectChat: (id: string) => void;
    onSendMessage: (message: string) => void;
    onStopGeneration: () => void;
    onOpenSettings: () => void;
    onCloseSettings: () => void;
    onSaveSettings: (settings: Settings) => void;
    onResetSettings: () => void;
    onToggleSidebar: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
                                                        chats,
                                                        messages,
                                                        activeChatId,
                                                        searchQuery,
                                                        settings,
                                                        isTyping,
                                                        isGenerating,
                                                        isSettingsOpen,
                                                        isSidebarOpen,
                                                        onNewChat,
                                                        onSearchChange,
                                                        onSelectChat,
                                                        onSendMessage,
                                                        onStopGeneration,
                                                        onOpenSettings,
                                                        onCloseSettings,
                                                        onSaveSettings,
                                                        onResetSettings,
                                                        onToggleSidebar,
                                                    }) => {
    const activeChat = chats.find(chat => chat.id === activeChatId);

    // Apply theme using CSS variables
    useEffect(() => {
        if (settings.theme === 'dark') {
            document.documentElement.classList.add('dark');
            // Также устанавливаем data-атрибут для дополнительной совместимости
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [settings.theme]);

    return (
        <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
            {/* Sidebar */}
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                searchQuery={searchQuery}
                onNewChat={onNewChat}
                onSearchChange={onSearchChange}
                onSelectChat={onSelectChat}
                isOpen={isSidebarOpen}
                onClose={onToggleSidebar}
            />

            {/* Main Chat Area */}
            <ChatWindow
                chatTitle={activeChat?.title || 'Новый чат'}
                messages={messages}
                isTyping={isTyping}
                isGenerating={isGenerating}
                onSendMessage={onSendMessage}
                onStopGeneration={onStopGeneration}
                onOpenSettings={onOpenSettings}
                onToggleSidebar={onToggleSidebar}
            />

            {/* Settings Panel */}
            <SettingsPanel
                isOpen={isSettingsOpen}
                onClose={onCloseSettings}
                settings={settings}
                onSave={onSaveSettings}
                onReset={onResetSettings}
            />
        </div>
    );
};