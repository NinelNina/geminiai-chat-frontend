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
            className={`group relative p-4 mb-2 rounded-xl cursor-pointer transition-all duration-200 ${
                isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'hover:bg-[var(--color-hover)] dark:hover:bg-[var(--color-hover)]'
            }`}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm truncate ${
                        isActive ? 'text-white' : 'text-[var(--color-text)] dark:text-gray-200'
                    }`}>
                        {chat.title}
                    </h3>
                    <p className={`text-xs truncate mt-1 ${
                        isActive
                            ? 'text-blue-100'
                            : 'text-[var(--color-text-muted)] dark:text-gray-400'
                    }`}>
                        {chat.lastMessage}
                    </p>
                    <p className={`text-xs mt-2 ${
                        isActive
                            ? 'text-blue-100'
                            : 'text-[var(--color-text-muted)] dark:text-gray-500'
                    }`}>
                        {formatDate(chat.lastMessageTime)}
                    </p>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.();
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                            isActive
                                ? 'hover:bg-blue-700'
                                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        <Edit2 size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.();
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                            isActive
                                ? 'hover:bg-blue-700'
                                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        <Trash2 size={14} className={isActive ? 'text-white' : 'text-red-500'} />
                    </button>
                </div>
            </div>
        </div>
    );
};