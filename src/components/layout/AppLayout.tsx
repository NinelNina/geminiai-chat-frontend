import React from 'react';
import { Sidebar } from '../sidebar/Sidebar';
import { ChatWindow } from '../chat/ChatWindow';
//import { SettingsPanel } from '../settings/SettingsPanel';
import type {Chat, Message, Settings} from '../../types';

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
                                                        //isSettingsOpen,
                                                        isSidebarOpen,
                                                        onNewChat,
                                                        onSearchChange,
                                                        onSelectChat,
                                                        onSendMessage,
                                                        onStopGeneration,
                                                        onOpenSettings,
                                                        onToggleSidebar,
                                                    }) => {
    const activeChat = chats.find(chat => chat.id === activeChatId);

    // Apply theme
    React.useEffect(() => {
        if (settings.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [settings.theme]);

    return (
        <div className="flex h-screen bg-white dark:bg-gray-900">
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
        </div>
    );
};