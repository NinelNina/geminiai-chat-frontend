import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Settings, Menu } from 'lucide-react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { useChat } from '../../app/providers/ChatProvider';
import { sendMessageToGemini, generateChatTitle } from '../../api/gemini';
import { Message, Settings as ChatSettings } from '../../types';

interface ChatWindowProps {
  onOpenSettings: () => void;
  onToggleSidebar: () => void;
  apiKey: string;
  settings: ChatSettings;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
                                                        onOpenSettings,
                                                        onToggleSidebar,
                                                        apiKey,
                                                        settings,
                                                      }) => {
  const { state, dispatch } = useChat();
  const [currentChat, setCurrentChat] = useState(() =>
      state.chats.find(c => c.id === state.activeChatId) || null
  );
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setCurrentChat(state.chats.find(c => c.id === state.activeChatId) || null);
  }, [state.activeChatId, state.chats]);

  const handleStopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const handleSendMessage = async (content: string, files?: { mimeType: string; data: string; name: string }[]) => {
    if (!state.activeChatId || !apiKey) return;

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content || (files && files.length > 0 ? "Отправлены файлы" : ""),
      role: 'user',
      timestamp: new Date().toISOString(),
      attachments: files,
    };

    dispatch({ type: 'ADD_MESSAGE', payload: { chatId: state.activeChatId, message: userMessage } });

    const isFirstMessage = currentChat && currentChat.messages.length === 0;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const chat = state.chats.find(c => c.id === state.activeChatId);
      const history = chat ? [...chat.messages, userMessage] : [userMessage];

      let fullContent = '';
      let assistantMessageId = '';

      // First message smart title generation (background)
      if (isFirstMessage && content) {
        generateChatTitle(apiKey, content).then(title => {
          dispatch({
            type: 'UPDATE_CHAT',
            payload: { id: state.activeChatId!, title }
          });
        });
      }

      await sendMessageToGemini(apiKey, history, {
        model: settings.model,
        temperature: settings.temperature,
        topP: settings.topP,
        maxTokens: settings.maxTokens,
        files: files?.map(f => ({ mimeType: f.mimeType, data: f.data })),
        onChunk: (chunk) => {
          // Check if we should abort
          if (signal.aborted) {
            throw new Error('Generation stopped by user');
          }

          fullContent += chunk;

          if (!assistantMessageId) {
            assistantMessageId = (Date.now() + 2).toString();
            const initialMessage: Message = {
              id: assistantMessageId,
              content: fullContent,
              role: 'assistant',
              timestamp: new Date().toISOString(),
            };
            dispatch({
              type: 'ADD_MESSAGE',
              payload: { chatId: state.activeChatId!, message: initialMessage }
            });
          } else {
            dispatch({
              type: 'UPDATE_LAST_MESSAGE',
              payload: {
                chatId: state.activeChatId!,
                message: { id: assistantMessageId, content: fullContent, role: 'assistant', timestamp: new Date().toISOString() }
              }
            });
          }
        }
      });
    } catch (err: any) {
      if (err.message !== 'Generation stopped by user') {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      abortControllerRef.current = null;
    }
  };

  return (
      <main className="flex-1 flex flex-col h-screen bg-[var(--color-chat-bg)] overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-sidebar-bg)]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 min-w-0">
            <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 hover:bg-[var(--color-hover)] rounded-lg transition-colors border border-[var(--color-border)]"
                aria-label="Меню"
            >
              <Menu size={20} className="text-[var(--color-text-secondary)]" />
            </button>

            {currentChat && (
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-[var(--color-text)] truncate">
                    {currentChat.title}
                  </h2>
                  <p className="text-xs text-[var(--color-text-muted)] opacity-60 uppercase tracking-widest font-bold">
                    {currentChat.messages.length} {currentChat.messages.length === 1 ? 'сообщение' : 'сообщений'}
                  </p>
                </div>
            )}
          </div>

          <button
              onClick={onOpenSettings}
              className="p-2 hover:bg-[var(--color-hover)] rounded-lg transition-colors border border-[var(--color-border)] text-[var(--color-text-secondary)]"
              title="Настройки"
              aria-label="Настройки"
          >
            <Settings size={20} />
          </button>
        </header>

        {!currentChat ? (
            <div className="flex-1 flex items-center justify-center bg-[var(--color-chat-bg)]">
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-2">Выберите чат</h2>
                <p className="text-[var(--color-text-muted)]">Начните новый разговор или выберите существующий из списка.</p>
              </div>
            </div>
        ) : (
            <>
              <MessageList
                  messages={currentChat.messages}
                  isLoading={state.isLoading}
              />

              <InputArea
                  onSendMessage={handleSendMessage}
                  onStopGeneration={handleStopGeneration}
                  isLoading={state.isLoading}
              />
            </>
        )}
      </main>
  );
};
