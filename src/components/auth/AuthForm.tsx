import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { AuthCredentials } from '../../types';

interface AuthFormProps {
    onLogin: (credentials: AuthCredentials) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
    const [credentials, setCredentials] = useState('');
    const [scope, setScope] = useState<AuthCredentials['scope']>('GIGACHAT_API_PERS');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');


        if (!credentials.trim()) {
            setError('Пожалуйста, введите credentials');
            return;
        }


        try {
            atob(credentials.trim());
        } catch {
            setError('Неверный формат Base64');
            return;
        }

        setIsLoading(true);


        setTimeout(() => {
            onLogin({ credentials: credentials.trim(), scope });
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-4">
            <div className="w-full max-w-md bg-[var(--color-sidebar-bg)] rounded-2xl shadow-xl border border-[var(--color-border)] p-8">
                {/* Logo/Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Lock size={32} className="text-white" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-center mb-2 text-[var(--color-text)]">
                    Авторизация
                </h1>
                <p className="text-center text-[var(--color-text-muted)] mb-8">
                    Введите credentials для доступа к GigaChat API
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Credentials Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                            Credentials (Base64)
                        </label>
                        <input
                            type="password"
                            value={credentials}
                            onChange={(e) => setCredentials(e.target.value)}
                            placeholder="Введите Base64 строку..."
                            className="w-full p-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-input-bg)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-colors"
                        />
                    </div>

                    {/* Scope Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                            Scope
                        </label>
                        <div className="space-y-2">
                            {[
                                { value: 'GIGACHAT_API_PERS', label: 'Персональный (GIGACHAT_API_PERS)' },
                                { value: 'GIGACHAT_API_B2B', label: 'B2B (GIGACHAT_API_B2B)' },
                                { value: 'GIGACHAT_API_CORP', label: 'Корпоративный (GIGACHAT_API_CORP)' },
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className={`
                                        flex items-center gap-3 p-3 border border-[var(--color-border)] rounded-xl 
                                        cursor-pointer transition-colors
                                        ${scope === option.value
                                        ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]'
                                        : 'hover:bg-[var(--color-hover)]'
                                    }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        name="scope"
                                        value={option.value}
                                        checked={scope === option.value}
                                        onChange={(e) => setScope(e.target.value as AuthCredentials['scope'])}
                                        className="w-4 h-4 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                                    />
                                    <span className="text-sm text-[var(--color-text)]">
                                        {option.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && <ErrorMessage message={error} />}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white border-0 py-3"
                        size="lg"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Вход...
                            </span>
                        ) : 'Войти'}
                    </Button>
                </form>

                {/* Footer */}
                <p className="text-xs text-center text-[var(--color-text-muted)] mt-6">
                    Получите credentials в личном кабинете SberDevices
                </p>
            </div>
        </div>
    );
};