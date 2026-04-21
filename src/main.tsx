import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChatProvider } from './app/providers/ChatProvider';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <ChatProvider>
                    <App />
                </ChatProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </StrictMode>,
);
