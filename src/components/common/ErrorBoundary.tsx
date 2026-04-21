import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-6">
                    <div className="max-w-md w-full bg-[var(--color-sidebar-bg)] border border-[var(--color-border)] rounded-2xl p-8 shadow-2xl text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={32} className="text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold mb-4">Что-то пошло не так</h1>
                        <p className="text-[var(--color-text-muted)] mb-8">
                            Произошла непредвиденная ошибка в интерфейсе приложения. Пожалуйста, попробуйте обновить страницу.
                        </p>
                        {this.state.error && (
                            <div className="text-left bg-black/5 p-4 rounded-lg mb-8 overflow-auto max-h-40">
                                <code className="text-xs text-red-400 break-all">
                                    {this.state.error.toString()}
                                </code>
                            </div>
                        )}
                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={18} />
                            <span>Обновить страницу</span>
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
