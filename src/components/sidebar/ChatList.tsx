import React from 'react';
import { ChatItem } from './ChatItem';
import type {Chat} from '../../types';

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
    return (
        <div className="space-y-1 overflow-y-auto flex-1">
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