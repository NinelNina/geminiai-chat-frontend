import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type {Chat} from '../../types';

interface ChatItemProps {
    chat: Chat;
    isActive: boolean;
    onClick: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
                                                      chat,
                                                      isActive,
                                                      onClick,
                                                      onEdit,
                                                      onDelete,
                                                  }) => {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div
            onClick={onClick}
    className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
        isActive
            ? 'bg-blue-100 dark:bg-blue-900/30'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
    }`}
>
    <div className="flex items-start justify-between gap-2">
    <div className="flex-1 min-w-0">
    <h3 className="font-medium text-sm truncate dark:text-white">
        {chat.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
        {chat.lastMessage}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        {formatDate(chat.lastMessageTime)}
    </p>
    </div>

    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
    <button
        onClick={(e) => {
        e.stopPropagation();
        onEdit?.();
    }}
    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
    >
    <Edit2 size={14} className="text-gray-500" />
        </button>
        <button
    onClick={(e) => {
        e.stopPropagation();
        onDelete?.();
    }}
    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
    >
    <Trash2 size={14} className="text-red-500" />
        </button>
        </div>
        </div>
        </div>
);
};