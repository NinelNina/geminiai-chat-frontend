import React from 'react';
import { ChatItem } from './ChatItem';
import type { Chat } from '../../types';

interface ChatListProps {
    chats: Chat[];
    activeChatId: string | null;
    onSelectChat: (id: string) => void;
    onEditChat?: (id: string) => void;
    onDeleteChat?: (id: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
                                                      chats,
                                                      activeChatId,
                                                      onSelectChat,
                                                      onEditChat,
                                                      onDeleteChat,
                                                  }) => {
    if (chats.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-32 text-center px-3 sm:px-4">
                <p className="text-sm sm:text-base text-[var(--color-text-muted)]">
                    Нет активных чатов
                </p>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
                    Создайте новый чат, чтобы начать общение
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-1 overflow-y-auto">
            {chats.map((chat) => (
                <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === activeChatId}
                    onClick={() => onSelectChat(chat.id)}
                    onEdit={() => onEditChat?.(chat.id)}
                    onDelete={() => onDeleteChat?.(chat.id)}
                />
            ))}
        </div>
    );
};