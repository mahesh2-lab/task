import React from 'react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
  value: string | number;
  onChange: (value: string | number) => void;
  options?: { value: string; label: string }[];
  required?: boolean;
  readonly?: boolean;
  min?: number;
  max?: number;
  rows?: number;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  options = [],
  required = false,
  readonly = false,
  min,
  max,
  rows = 3,
  className = ''
}) => {
  const baseInputClasses = `w-full px-4 py-3 border border-gray-300 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    readonly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'
  }`;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            disabled={readonly}
            className={baseInputClasses}
          >
            <option value="">चुनें</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            readOnly={readonly}
            rows={rows}
            className={baseInputClasses}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            readOnly={readonly}
            min={min}
            max={max}
            className={baseInputClasses}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            readOnly={readonly}
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="block mb-2 font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
    </div>
  );
};