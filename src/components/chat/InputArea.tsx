import React, { useState, useRef } from 'react';
import { Send, Square, Paperclip } from 'lucide-react';
import { Button } from '../ui/Button';

interface InputAreaProps {
    onSendMessage: (message: string) => void;
    onStopGeneration?: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
                                                        onSendMessage,
                                                        onStopGeneration,
                                                        isLoading = false,
                                                        disabled = false,
                                                    }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showScrollbar, setShowScrollbar] = useState(false);

    React.useEffect(() => {
        if (textareaRef.current) {
            // Сбрасываем высоту перед вычислением
            textareaRef.current.style.height = 'auto';

            // Вычисляем новую высоту
            const scrollHeight = textareaRef.current.scrollHeight;
            const newHeight = Math.min(scrollHeight, 100);

            // Устанавливаем высоту
            textareaRef.current.style.height = `${newHeight}px`;

            // Показываем скроллбар только если контент превышает maxHeight
            setShowScrollbar(scrollHeight > 100);
        }
    }, [input]);

    // Дополнительный эффект для сброса скроллбара при очистке
    React.useEffect(() => {
        if (!input && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            setShowScrollbar(false);
        }
    }, [input]);

    const handleSubmit = () => {
        if (input.trim() && !disabled && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
            // Сброс скроллбара после отправки
            setShowScrollbar(false);
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
        <div className="px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-4">
            {/* Убрали items-end, добавили items-center */}
            <div className="flex items-center gap-1 xs:gap-2">
                {/* Кнопка прикрепления */}
                <button
                    className="hidden xs:block p-2 xs:p-2.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] rounded-lg xs:rounded-xl transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Прикрепить файл"
                    disabled={disabled || isLoading}
                >
                    <Paperclip size={16} className="xs:w-[18px] xs:h-[18px]" />
                </button>

                {/* Textarea */}
                <div className="flex-1 min-w-0 relative">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Сообщение..."
                    disabled={disabled || isLoading}
                    rows={1}
                    className={`
                        w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] 
                        rounded-lg xs:rounded-xl py-2 xs:py-2.5 px-3 xs:px-4 
                        text-xs xs:text-sm text-[var(--color-text)] 
                        placeholder-[var(--color-text-muted)] 
                        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 
                        resize-none disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200
                        ${showScrollbar ? 'overflow-y-auto' : 'overflow-y-hidden'}
                    `}
                    style={{
                        minHeight: '40px',  // Немного увеличили для лучшего выравнивания
                        maxHeight: '120px',  // Можно увеличить если нужно
                        scrollbarWidth: showScrollbar ? 'thin' : 'none',
                        msOverflowStyle: showScrollbar ? 'auto' : 'none'
                    }}
                />
                </div>

                {/* Send/Stop Button */}
                {isLoading ? (
                    <Button
                        onClick={onStopGeneration}
                        variant="danger"
                        size="sm"
                        className="flex-shrink-0 px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 text-xs xs:text-sm bg-red-500 hover:bg-red-600 text-white border-0 rounded-lg xs:rounded-xl"
                    >
                        <Square size={14} className="xs:w-4 xs:h-4 sm:mr-1" />
                        <span className="hidden xs:inline">Стоп</span>
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        disabled={!input.trim() || disabled}
                        variant="primary"
                        size="sm"
                        className="flex-shrink-0 px-2 xs:px-3 sm:px-4 py-2 xs:py-2.5 text-xs xs:text-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white border-0 rounded-lg xs:rounded-xl"
                    >
                        <Send size={14} className="xs:w-4 xs:h-4 sm:mr-1" />
                    </Button>
                )}
            </div>

            {/* Подсказка */}
            <div className="hidden xs:flex items-center justify-center gap-1 sm:gap-2 text-xs text-[var(--color-text-muted)] mt-2">
                <span>Enter</span>
                <kbd className="px-1.5 py-0.5 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded text-[10px] sm:text-xs">
                    ↵
                </kbd>
                <span className="hidden sm:inline">- отправить,</span>
                <span className="sm:hidden">- отпр,</span>
                <kbd className="px-1.5 py-0.5 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded text-[10px] sm:text-xs">
                    ⇧+↵
                </kbd>
                <span>- новая строка</span>
            </div>
        </div>
    );
};