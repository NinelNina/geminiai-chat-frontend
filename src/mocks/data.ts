import type {Chat, Message, Settings} from '../types';

export const mockChats: Chat[] = [
    {
        id: '1',
        title: 'Как использовать React hooks?',
        lastMessage: 'useEffect используется для побочных эффектов...',
        lastMessageTime: new Date('2024-01-15T10:30:00'),
        isActive: true,
    },
    {
        id: '2',
        title: 'Объясни TypeScript дженерики',
        lastMessage: 'Дженерики позволяют создавать...',
        lastMessageTime: new Date('2024-01-14T15:45:00'),
    },
    {
        id: '3',
        title: 'Помощь с CSS Grid',
        lastMessage: 'grid-template-columns задает...',
        lastMessageTime: new Date('2024-01-13T09:20:00'),
    },
    {
        id: '4',
        title: 'Оптимизация производительности',
        lastMessage: 'Используйте React.memo для...',
        lastMessageTime: new Date('2024-01-12T14:10:00'),
    },
    {
        id: '5',
        title: 'REST API best practices',
        lastMessage: 'Всегда используйте правильные...',
        lastMessageTime: new Date('2024-01-11T11:00:00'),
    },
];

export const mockMessages: Message[] = [
    {
        id: '1',
        content: 'Привет! Расскажи про useEffect в React',
        role: 'user',
        timestamp: new Date('2024-01-15T10:25:00'),
    },
    {
        id: '2',
        content: '**useEffect** — это хук React для работы с *побочными эффектами*.\n\nОсновные случаи использования:\n- Запросы к API\n- Подписки\n- Изменение DOM\n\nПример:\n```javascript\nuseEffect(() => {\n  console.log("Компонент смонтирован");\n}, []);\n```',
        role: 'assistant',
        timestamp: new Date('2024-01-15T10:26:00'),
    },
    {
        id: '3',
        content: 'А что насчет зависимостей?',
        role: 'user',
        timestamp: new Date('2024-01-15T10:27:00'),
    },
    {
        id: '4',
        content: 'Массив зависимостей — второй аргумент useEffect:\n\n- `[]` — выполнится только при монтировании\n- `[prop, state]` — выполнится при изменении prop или state\n- без массива — после каждого рендера',
        role: 'assistant',
        timestamp: new Date('2024-01-15T10:28:00'),
    },
    {
        id: '5',
        content: 'Понятно, спасибо!',
        role: 'user',
        timestamp: new Date('2024-01-15T10:29:00'),
    },
    {
        id: '6',
        content: 'Пожалуйста! Если есть ещё вопросы — спрашивайте.',
        role: 'assistant',
        timestamp: new Date('2024-01-15T10:30:00'),
    },
];

export const defaultSettings: Settings = {
    model: 'GigaChat',
    temperature: 0.7,
    topP: 0.9,
    maxTokens: 1000,
    systemPrompt: 'Вы — полезный ассистент.',
    theme: 'light',
};