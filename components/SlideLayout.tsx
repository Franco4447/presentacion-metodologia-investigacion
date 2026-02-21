import React from 'react';

interface SlideLayoutProps {
  children: React.ReactNode;
  slideNumber: number;
  totalSlides: number;
  title?: string;
  subtitle?: string;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  children, 
  slideNumber, 
  totalSlides,
  title,
  subtitle
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-50 text-slate-800 relative overflow-hidden select-none">
      
      {/* Content Area - Optimized padding for larger content */}
      <div className="flex-1 px-12 py-10 flex flex-col w-full h-full max-w-[1920px] mx-auto">
        {(title || subtitle) && (
          <header className="mb-8 border-b-2 border-slate-200 pb-4 flex-shrink-0">
            {title && <h2 className="text-5xl font-bold text-blue-900 tracking-tight">{title}</h2>}
            {subtitle && <h3 className="text-2xl text-slate-500 mt-2 font-light">{subtitle}</h3>}
          </header>
        )}
        <div className="flex-1 relative h-full flex flex-col">
          {children}
        </div>
      </div>

      {/* Progress Bar & Minimal Number */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-200 z-10">
        <div 
          className="h-full bg-blue-900 transition-all duration-500 ease-out"
          style={{ width: `${(slideNumber / totalSlides) * 100}%` }}
        />
      </div>
      
      {/* Floating subtle page number */}
      <div className="absolute bottom-6 right-6 text-sm font-mono text-slate-400 font-bold pointer-events-none z-10">
        {slideNumber} / {totalSlides}
      </div>
    </div>
  );
};