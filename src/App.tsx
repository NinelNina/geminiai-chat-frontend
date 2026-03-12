import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
//import { AuthForm } from './components/auth/AuthForm';
import { mockChats, mockMessages, defaultSettings } from './mocks/data';
import type {Chat, Message, Settings} from './types';

function App() {
    const [chats, setChats] = useState<Chat[]>(mockChats);
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [activeChatId, setActiveChatId] = useState<string | null>('1');
    const [searchQuery, setSearchQuery] = useState('');

    const [isTyping, setIsTyping] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [settings, setSettings] = useState<Settings>(defaultSettings);

    const filteredChats = chats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        setMessages([]);
    };

    const handleSelectChat = (id: string) => {
        setActiveChatId(id);
        setIsSidebarOpen(false);
    };

    const handleSendMessage = (content: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            content,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsGenerating(true);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);

            setTimeout(() => {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    content: 'Это моковый ответ от GigaChat. В реальной версии здесь будет ответ от API.',
                    role: 'assistant',
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, aiMessage]);
                setIsGenerating(false);
            }, 1000);
        }, 1500);
    };

    const handleStopGeneration = () => {
        setIsGenerating(false);
        setIsTyping(false);
    };

    // Settings handlers
    const handleSaveSettings = (newSettings: Settings) => {
        setSettings(newSettings);
    };

    const handleResetSettings = () => {
        setSettings(defaultSettings);
    };

    return (
        <AppLayout
            chats={filteredChats}
            messages={messages}
            activeChatId={activeChatId}
            searchQuery={searchQuery}
            settings={settings}
            isTyping={isTyping}
            isGenerating={isGenerating}
            isSettingsOpen={isSettingsOpen}
            isSidebarOpen={isSidebarOpen}
            onNewChat={handleNewChat}
            onSearchChange={setSearchQuery}
            onSelectChat={handleSelectChat}
            onSendMessage={handleSendMessage}
            onStopGeneration={handleStopGeneration}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onCloseSettings={() => setIsSettingsOpen(false)}
            onSaveSettings={handleSaveSettings}
            onResetSettings={handleResetSettings}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
    );
}

export default App;