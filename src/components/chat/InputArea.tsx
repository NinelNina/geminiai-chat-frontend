import React, { useState, useRef, useEffect } from 'react';
import { Send, Square, Paperclip, X, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface InputAreaProps {
  onSendMessage: (message: string, files?: { mimeType: string; data: string; name: string }[]) => void;
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
  const [attachedFiles, setAttachedFiles] = useState<{ mimeType: string; data: string; name: string }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`;

      if (scrollHeight > 200) {
        textareaRef.current.style.overflowY = 'auto';
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((input.trim() || attachedFiles.length > 0) && !disabled && !isLoading) {
      onSendMessage(input.trim(), attachedFiles);
      setInput('');
      setAttachedFiles([]);
    }
  };

  const processFile = (file: File): Promise<{ mimeType: string; data: string; name: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const base64Data = result.split(',')[1];
        resolve({
          mimeType: file.type,
          data: base64Data,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filePromises: Promise<{ mimeType: string; data: string; name: string }>[] = [];
    for (let i = 0; i < files.length; i++) {
      filePromises.push(processFile(files[i]));
    }

    const newFiles = await Promise.all(filePromises);
    setAttachedFiles(prev => [...prev, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const filePromises: Promise<{ mimeType: string; data: string; name: string }>[] = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile();
        if (file) {
          filePromises.push(processFile(file));
        }
      }
    }

    if (filePromises.length > 0) {
      const newFiles = await Promise.all(filePromises);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
      <div className="px-4 py-4 border-t border-[var(--color-border)] bg-[var(--color-sidebar-bg)]/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {attachedFiles.map((file, i) => {
                  const isImage = file.mimeType.startsWith('image/');
                  return (
                      <div
                          key={i}
                          className="group relative flex items-center gap-3 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl p-2 pr-10 shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          {isImage ? (
                              <img
                                  src={`data:${file.mimeType};base64,${file.data}`}
                                  alt={file.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                              />
                          ) : (
                              <FileText size={20} className="text-blue-500" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-[var(--color-text)] truncate max-w-[120px]">
                      {file.name}
                    </span>
                          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-tighter">
                      {file.mimeType.split('/')[1] || 'FILE'}
                    </span>
                        </div>
                        <button
                            onClick={() => removeFile(i)}
                            className="absolute top-1 right-1 p-1 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Удалить файл"
                        >
                          <X size={14} />
                        </button>
                      </div>
                  );
                })}
              </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 text-[var(--color-text-muted)] hover:text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all flex-shrink-0 disabled:opacity-50"
                disabled={disabled || isLoading}
                aria-label="Прикрепить файл"
            >
              <Paperclip size={20} />
            </button>

            <div className="flex-1 min-w-0 relative">
            <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder="Спросите Gemini..."
                disabled={disabled || isLoading}
                rows={1}
                className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl py-3 px-4 pr-12 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none disabled:opacity-50 transition-all max-h-[200px]"
            />

              <div className="absolute right-3 bottom-2.5">
                {isLoading ? (
                    <button
                        type="button"
                        onClick={onStopGeneration}
                        className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg shadow-red-500/20"
                        aria-label="Остановить генерацию"
                    >
                      <Square size={14} fill="currentColor" />
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={(!input.trim() && attachedFiles.length === 0) || disabled}
                        className="p-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20 disabled:shadow-none"
                        aria-label="Отправить"
                    >
                      <Send size={14} />
                    </button>
                )}
              </div>
            </div>
          </form>

          <div className="text-[10px] text-center text-[var(--color-text-muted)] mt-2 opacity-50 uppercase tracking-widest font-bold">
            Shift + Enter для новой строки • Gemini может ошибаться
          </div>
        </div>
      </div>
  );
};
