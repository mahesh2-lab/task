import React from 'react';
import { Building2 } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, description }) => {
  return (
    <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <Building2 className="w-8 h-8 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      </div>
      {subtitle && (
        <h3 className="text-lg md:text-xl font-medium mb-2 text-slate-200">
          {subtitle}
        </h3>
      )}
      {description && (
        <h5 className="text-base font-normal text-slate-300">
          {description}
        </h5>
      )}
    </div>
  );
};