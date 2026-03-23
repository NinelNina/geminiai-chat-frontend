import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { mockChats, defaultSettings } from './mocks/data';
import type {AuthCredentials, Chat, Settings} from './types';
import {AuthForm} from "./components/auth/AuthForm.tsx";

function App() {
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Chat state
    const [chats, setChats] = useState<Chat[]>(mockChats);
    const [activeChatId, setActiveChatId] = useState<string | null>('1');
    const [searchQuery, setSearchQuery] = useState('');

    // UI state
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Settings state
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    // Initialize theme on app start
    React.useEffect(() => {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setSettings(prev => ({ ...prev, theme: 'dark' }));
        } else if (savedTheme === 'light') {
            setSettings(prev => ({ ...prev, theme: 'light' }));
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setSettings(prev => ({ ...prev, theme: prefersDark ? 'dark' : 'light' }));
        }
    }, []);

    // Filter chats by search
    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Auth handlers
    const handleLogin = (credentials: AuthCredentials) => {
        console.log('Login with:', credentials);
        setIsAuthenticated(true);
    };

    // Chat handlers
    const handleNewChat = () => {
        const newChat: Chat = {
            id: Date.now().toString(),
            title: 'Новый чат',
            lastMessage: '',
            lastMessageTime: new Date(),
            isActive: true,
        };
        setChats([newChat, ...chats]);
        setActiveChatId(newChat.id);
    };

    const handleSelectChat = (id: string) => {
        setActiveChatId(id);
        setIsSidebarOpen(false);
    };

    const handleSendMessage = (content: string) => {
        console.log('Message sent:', content);

        // Обновляем lastMessage в чате (опционально, для сайдбара)
        if (activeChatId) {
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === activeChatId
                        ? { ...chat, lastMessage: content, lastMessageTime: new Date() }
                        : chat
                )
            );
        }
    };

    // const handleStopGeneration = () => {
    //     setIsLoading(false);
    // };

    // Settings handlers
    const handleSaveSettings = (newSettings: Settings) => {
        setSettings(newSettings);
        // Сохраняем тему в localStorage
        localStorage.setItem('theme', newSettings.theme);
    };

    const handleResetSettings = () => {
        setSettings(defaultSettings);
        localStorage.setItem('theme', defaultSettings.theme);
    };

    // Show auth form if not authenticated
    if (!isAuthenticated) {
        return <AuthForm onLogin={handleLogin} />;
    }

    // Show main app
    return (
        <AppLayout
            chats={filteredChats}
            activeChatId={activeChatId}
            searchQuery={searchQuery}
            settings={settings}
            isSettingsOpen={isSettingsOpen}
            isSidebarOpen={isSidebarOpen}
            onNewChat={handleNewChat}
            onSearchChange={setSearchQuery}
            onSelectChat={handleSelectChat}
            onSendMessage={handleSendMessage}
            //onStopGeneration={handleStopGeneration}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onCloseSettings={() => setIsSettingsOpen(false)}
            onSaveSettings={handleSaveSettings}
            onResetSettings={handleResetSettings}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
    );
}

export default App;