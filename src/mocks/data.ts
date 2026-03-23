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

export const mockMessagesByChatId: Record<string, Message[]> = {
    // Чат 1: React hooks
    '1': [
        {
            id: '1-1',
            content: 'Привет! Расскажи про useEffect в React',
            role: 'user',
            timestamp: new Date('2024-01-15T10:25:00'),
        },
        {
            id: '1-2',
            content: '**useEffect** — это хук React для работы с *побочными эффектами*.\n\nОсновные случаи использования:\n- Запросы к API\n- Подписки\n- Изменение DOM\n\nПример:\n```javascript\nuseEffect(() => {\n  console.log("Компонент смонтирован");\n}, []);\n```',
            role: 'assistant',
            timestamp: new Date('2024-01-15T10:26:00'),
        },
        {
            id: '1-3',
            content: 'А что насчет зависимостей?',
            role: 'user',
            timestamp: new Date('2024-01-15T10:27:00'),
        },
        {
            id: '1-4',
            content: 'Массив зависимостей — второй аргумент useEffect:\n\n- `[]` — выполнится только при монтировании\n- `[prop, state]` — выполнится при изменении prop или state\n- без массива — после каждого рендера',
            role: 'assistant',
            timestamp: new Date('2024-01-15T10:28:00'),
        },
        {
            id: '1-5',
            content: 'Понятно, спасибо!',
            role: 'user',
            timestamp: new Date('2024-01-15T10:29:00'),
        },
        {
            id: '1-6',
            content: 'Пожалуйста! Если есть ещё вопросы — спрашивайте.',
            role: 'assistant',
            timestamp: new Date('2024-01-15T10:30:00'),
        },
    ],

    // Чат 2: TypeScript дженерики
    '2': [
        {
            id: '2-1',
            content: 'Что такое дженерики в TypeScript?',
            role: 'user',
            timestamp: new Date('2024-01-14T15:40:00'),
        },
        {
            id: '2-2',
            content: '**Дженерики** — это способ создавать переиспользуемые компоненты, которые работают с разными типами.\n\nПример функции:\n```typescript\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\nidentity<string>("Hello")\nidentity<number>(42)\n```',
            role: 'assistant',
            timestamp: new Date('2024-01-14T15:41:00'),
        },
        {
            id: '2-3',
            content: 'А как использовать с интерфейсами?',
            role: 'user',
            timestamp: new Date('2024-01-14T15:42:00'),
        },
        {
            id: '2-4',
            content: 'Так:\n```typescript\ninterface Box<T> {\n  value: T;\n}\n\nconst stringBox: Box<string> = { value: "test" };\nconst numberBox: Box<number> = { value: 42 };\n```',
            role: 'assistant',
            timestamp: new Date('2024-01-14T15:45:00'),
        },
    ],

    // Чат 3: CSS Grid
    '3': [
        {
            id: '3-1',
            content: 'Как работает CSS Grid?',
            role: 'user',
            timestamp: new Date('2024-01-13T09:15:00'),
        },
        {
            id: '3-2',
            content: '**CSS Grid** — это двухмерная система布局.\n\nОсновные свойства:\n- `display: grid`\n- `grid-template-columns`\n- `grid-template-rows`\n- `gap`\n\nПример:\n```css\n.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 20px;\n}\n```',
            role: 'assistant',
            timestamp: new Date('2024-01-13T09:17:00'),
        },
        {
            id: '3-3',
            content: 'А что такое fr?',
            role: 'user',
            timestamp: new Date('2024-01-13T09:18:00'),
        },
        {
            id: '3-4',
            content: '`fr` — это fractional unit (доля свободного пространства).\n\n`1fr 1fr 1fr` = три равные колонки\n`2fr 1fr 1fr` = первая колонка в 2 раза шире',
            role: 'assistant',
            timestamp: new Date('2024-01-13T09:20:00'),
        },
    ],

    // Чат 4: Оптимизация производительности
    '4': [
        {
            id: '4-1',
            content: 'Как оптимизировать React приложение?',
            role: 'user',
            timestamp: new Date('2024-01-12T14:05:00'),
        },
        {
            id: '4-2',
            content: 'Основные способы:\n\n1. **React.memo** — для мемоизации компонентов\n2. **useMemo** — для мемоизации значений\n3. **useCallback** — для мемоизации функций\n4. **Code splitting** — React.lazy + Suspense\n5. **Виртуализация списков** — react-window',
            role: 'assistant',
            timestamp: new Date('2024-01-12T14:07:00'),
        },
        {
            id: '4-3',
            content: 'Когда использовать React.memo?',
            role: 'user',
            timestamp: new Date('2024-01-12T14:08:00'),
        },
        {
            id: '4-4',
            content: '**React.memo** полезен когда:\n\n- Компонент рендерится часто\n- Пропсы меняются редко\n- Рендер дорогой\n\n```typescript\nconst ExpensiveComponent = React.memo(({ data }) => {\n  return <div>{data}</div>;\n});\n```',
            role: 'assistant',
            timestamp: new Date('2024-01-12T14:10:00'),
        },
    ],

    // Чат 5: REST API best practices
    '5': [
        {
            id: '5-1',
            content: 'Какие best practices для REST API?',
            role: 'user',
            timestamp: new Date('2024-01-11T10:55:00'),
        },
        {
            id: '5-2',
            content: 'Основные принципы:\n\n1. **Используйте правильные HTTP методы** (GET, POST, PUT, DELETE)\n2. **Плюрализируйте ресурсы** (`/users`, не `/user`)\n3. **Возвращайте правильные статус коды** (200, 201, 400, 404, 500)\n4. **Версионируйте API** (`/api/v1/users`)\n5. **Используйте фильтрацию и пагинацию**',
            role: 'assistant',
            timestamp: new Date('2024-01-11T10:57:00'),
        },
        {
            id: '5-3',
            content: 'А как обрабатывать ошибки?',
            role: 'user',
            timestamp: new Date('2024-01-11T10:58:00'),
        },
        {
            id: '5-4',
            content: 'Возвращайте консистентный формат:\n```json\n{\n  "error": {\n    "code": "VALIDATION_ERROR",\n    "message": "Invalid email format",\n    "details": [...]\n  }\n}\n```\n\nИспользуйте 4xx для клиентских ошибок, 5xx для серверных.',
            role: 'assistant',
            timestamp: new Date('2024-01-11T11:00:00'),
        },
    ],
};

export const getMockMessages = (chatId: string): Message[] => {
    return mockMessagesByChatId[chatId] || [];
};

export const mockMessages: Message[] = mockMessagesByChatId['1'];


export const defaultSettings: Settings = {
    model: 'GigaChat',
    temperature: 0.7,
    topP: 0.9,
    maxTokens: 1000,
    systemPrompt: 'Вы — полезный ассистент.',
    theme: 'light',
};