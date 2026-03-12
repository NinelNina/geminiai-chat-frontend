import React from 'react';

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
    return (
        <label className="flex items-center gap-3 cursor-pointer">
            {label && <span className="text-sm">{label}</span>}
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
            </div>
        </label>
    );
};