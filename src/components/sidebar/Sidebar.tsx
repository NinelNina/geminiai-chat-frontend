import React from 'react';
import { Plus, Bot, X } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { ChatList } from './ChatList';
import type { Chat } from '../../types';
import { Button } from '../ui/Button';

interface SidebarProps {
    chats: Chat[];
    activeChatId: string | null;
    searchQuery: string;
    onNewChat: () => void;
    onSearchChange: (query: string) => void;
    onSelectChat: (id: string) => void;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
                                                    chats,
                                                    activeChatId,
                                                    searchQuery,
                                                    onNewChat,
                                                    onSearchChange,
                                                    onSelectChat,
                                                    isOpen = true,
                                                    onClose,
                                                }) => {
    return (
        <>
            {/* Mobile overlay - адаптивный */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar - адаптивная ширина */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50 
                    w-[280px] xs:w-80 
                    bg-[var(--color-sidebar-bg)]
                    border-r border-[var(--color-border)]
                    flex flex-col 
                    transform transition-transform duration-300 ease-in-out
                    shadow-xl lg:shadow-none
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-[var(--color-border)] bg-[var(--color-sidebar-bg)]/50 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <Bot size={20} className="sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                                GigaChat
                            </h1>
                        </div>

                        {/* Кнопка закрытия для мобильных */}
                        <button
                            onClick={onClose}
                            className="lg:hidden p-1.5 sm:p-2 hover:bg-[var(--color-hover)] rounded-lg text-[var(--color-text-secondary)] flex-shrink-0"
                            aria-label="Close sidebar"
                        >
                            <X size={18} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    {/* Кнопка нового чата */}
                    <div className="mt-4 sm:mt-5">
                        <Button
                            onClick={onNewChat}
                            className="w-full shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base py-2 sm:py-2.5"
                        >
                            <Plus size={16} className="sm:w-5 sm:h-5 mr-2" />
                            <span>Новый чат</span>
                        </Button>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 sm:p-5 border-b border-[var(--color-border)]">
                    <SearchInput
                        value={searchQuery}
                        onChange={onSearchChange}
                        placeholder="Поиск чатов..."
                    />
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto p-2 sm:p-3">
                    <ChatList
                        chats={chats}
                        activeChatId={activeChatId}
                        onSelectChat={onSelectChat}
                    />
                </div>
            </aside>
        </>
    );
};