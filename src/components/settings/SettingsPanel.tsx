import React from 'react';
import { X, Sliders, Monitor, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Slider } from '../ui/Slider';
import { Toggle } from '../ui/Toggle';
import { Settings } from '../../types';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    settings: Settings;
    onSave: (settings: Settings) => void;
    onReset: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
                                                                isOpen,
                                                                onClose,
                                                                settings,
                                                                onSave,
                                                                onReset,
                                                            }) => {
    const [localSettings, setLocalSettings] = React.useState<Settings>(settings);

    React.useEffect(() => {
        setLocalSettings(settings);
    }, [settings, isOpen]);

    if (!isOpen) return null;

    const handleChange = <K extends keyof Settings>(
        key: K,
        value: Settings[K]
    ) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onSave(localSettings);
        onClose();
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            <div
                className={`
          fixed right-0 top-0 h-full z-50 
          bg-[var(--color-sidebar-bg)] border-l border-[var(--color-border)] shadow-2xl
          w-full sm:w-96 flex flex-col
        `}
            >
                <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                        <Sliders size={20} className="text-blue-500" />
                        <h2 className="text-xl font-bold">Настройки</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[var(--color-hover)] rounded-lg transition-colors text-[var(--color-text-muted)]"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500">
                            <Zap size={14} />
                            <span>Параметры модели</span>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                                Модель
                            </label>
                            <select
                                value={localSettings.model}
                                onChange={(e) => handleChange('model', e.target.value)}
                                className="w-full p-2.5 text-sm border border-[var(--color-border)] rounded-xl bg-[var(--color-input-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <option value="gemini-3-flash-preview">Default (Gemini 3 Flash Preview)</option>
                                <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro Preview</option>
                                <option value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash Lite Preview</option>
                                <option value="gemini-flash-latest">Gemini Flash Latest</option>
                            </select>
                        </div>

                        <Slider
                            label="Temperature"
                            value={localSettings.temperature}
                            onChange={(value) => handleChange('temperature', value)}
                            min={0}
                            max={2}
                            step={0.1}
                        />

                        <Slider
                            label="Top-P"
                            value={localSettings.topP}
                            onChange={(value) => handleChange('topP', value)}
                            min={0}
                            max={1}
                            step={0.05}
                        />
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500">
                            <Monitor size={14} />
                            <span>Внешний вид</span>
                        </div>

                        <Toggle
                            label="Тёмная тема"
                            checked={localSettings.theme === 'dark'}
                            onChange={(checked) => handleChange('theme', checked ? 'dark' : 'light')}
                        />
                    </section>

                    <section className="space-y-2">
                        <label className="text-sm font-medium text-[var(--color-text-secondary)]">
                            Системный промпт
                        </label>
                        <textarea
                            value={localSettings.systemPrompt}
                            onChange={(e) => handleChange('systemPrompt', e.target.value)}
                            rows={4}
                            className="w-full p-3 text-sm border border-[var(--color-border)] rounded-xl bg-[var(--color-input-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                            placeholder="Инструкции для модели..."
                        />
                    </section>
                </div>

                <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-sidebar-bg)]/80 flex gap-3">
                    <Button
                        onClick={onReset}
                        variant="secondary"
                        className="flex-1"
                    >
                        Сбросить
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="primary"
                        className="flex-1"
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </>
    );
};
