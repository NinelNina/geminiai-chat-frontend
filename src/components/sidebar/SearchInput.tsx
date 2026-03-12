import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
                                                            value,
                                                            onChange,
                                                            placeholder = 'Поиск чатов...',
                                                        }) => {
    return (
        <div className="relative">
            <Search
                className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]"
                size={16}
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors"
            />
        </div>
    );
};