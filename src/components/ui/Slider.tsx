import React from 'react';

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    label: string;
    showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
                                                  value,
                                                  onChange,
                                                  min,
                                                  max,
                                                  step = 0.1,
                                                  label,
                                                  showValue = true,
                                              }) => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium">{label}</label>
                {showValue && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
                )}
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};