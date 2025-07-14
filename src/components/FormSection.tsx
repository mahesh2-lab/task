import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="bg-blue-500 text-white px-4 py-3 rounded-t-lg font-medium">
        {title}
      </div>
      <div className="bg-white p-6 rounded-b-lg border border-gray-200 shadow-sm">
        {children}
      </div>
    </div>
  );
};