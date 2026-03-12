import React, { useEffect, useRef } from 'react';
import type {Message as MessageType} from '../../types';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
    messages: MessageType[];
    isTyping?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
                                                            messages,
                                                            isTyping = false
                                                        }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}

            {isTyping && <TypingIndicator isVisible={true} />}

            <div ref={messagesEndRef} />
        </div>
    );
};