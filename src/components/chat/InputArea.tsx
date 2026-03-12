import React, { useState, useRef, useEffect } from 'react';
import { Send, Square, Paperclip } from 'lucide-react';
import { Button } from '../ui/Button';

interface InputAreaProps {
    onSendMessage: (message: string) => void;
    onStopGeneration?: () => void;
    isGenerating?: boolean;
    disabled?: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
                                                        onSendMessage,
                                                        onStopGeneration,
                                                        isGenerating = false,
                                                        disabled = false,
                                                    }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    }, [input]);

    const handleSubmit = () => {
        if (input.trim() && !disabled) {
            onSendMessage(input.trim());
            setInput('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <div className="relative flex items-end gap-2 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
                    {/* Attach Button */}
                    <button
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Прикрепить файл"
                    >
                        <Paperclip size={20} />
                    </button>

                    {/* Textarea */}
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Введите сообщение..."
                        disabled={disabled}
                        rows={1}
                        className="flex-1 bg-transparent border-0 resize-none focus:ring-0 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 py-2 px-2 max-h-[150px]"
                        style={{ minHeight: '40px' }}
                    />

                    {/* Send/Stop Button */}
                    {isGenerating ? (
                        <Button
                            onClick={onStopGeneration}
                            variant="danger"
                            size="sm"
                            className="flex-shrink-0"
                        >
                            <Square size={16} />
                            Стоп
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={!input.trim() || disabled}
                            size="sm"
                            className="flex-shrink-0"
                        >
                            <Send size={16} />
                            Отправить
                        </Button>
                    )}
                </div>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                    Нажмите Enter для отправки, Shift+Enter для новой строки
                </p>
            </div>
        </div>
    );
};