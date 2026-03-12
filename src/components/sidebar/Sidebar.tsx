import React from 'react';
import { Plus, Menu } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { ChatList } from './ChatList';
import type {Chat} from '../../types';
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
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold dark:text-white">GigaChat</h1>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                        >
                            <Menu size={20} />
                        </button>
                    </div>

                    <Button
                        onClick={onNewChat}
                        variant="primary"
                        className="w-full"
                    >
                        <Plus size={20} />
                        Новый чат
                    </Button>
                </div>

                {/* Search */}
                <div className="p-4">
                    <SearchInput
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </div>

                {/* Chat List */}
                <ChatList
                    chats={chats}
                    activeChatId={activeChatId}
                    onSelectChat={onSelectChat}
                />
            </aside>
        </>
    );
};