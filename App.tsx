import React, { useState, useEffect, useCallback } from 'react';
import { 
  Slide1, Slide2, Slide3, Slide4, Slide5, 
  Slide6, Slide7, Slide8, Slide9, Slide10 
} from './components/Slides';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const SLIDE_COUNT = 10;

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, SLIDE_COUNT));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderSlide = () => {
    const props = { currentSlide, totalSlides: SLIDE_COUNT };
    switch (currentSlide) {
      case 1: return <Slide1 {...props} />;
      case 2: return <Slide2 {...props} />;
      case 3: return <Slide3 {...props} />;
      case 4: return <Slide4 {...props} />;
      case 5: return <Slide5 {...props} />;
      case 6: return <Slide6 {...props} />;
      case 7: return <Slide7 {...props} />;
      case 8: return <Slide8 {...props} />;
      case 9: return <Slide9 {...props} />;
      case 10: return <Slide10 {...props} />;
      default: return <Slide1 {...props} />;
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-50 overflow-hidden relative">
      {renderSlide()}
      
      {/* Floating Navigation Controls (Bottom Strip Hover) */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 z-50 bg-gradient-to-t from-black/20 to-transparent">
          <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-xl flex items-center gap-6 transform translate-y-0 transition-transform border border-white/50">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 1}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-800 disabled:opacity-30 transition-colors"
              title="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            
            <span className="text-slate-600 font-mono text-sm font-semibold select-none">
              {currentSlide} / {SLIDE_COUNT}
            </span>

            <button 
              onClick={nextSlide}
              disabled={currentSlide === SLIDE_COUNT}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-800 disabled:opacity-30 transition-colors"
              title="Siguiente"
            >
              <ChevronRight size={24} />
            </button>

            <div className="w-px h-6 bg-slate-300 mx-2"></div>

             <button 
              onClick={toggleFullScreen}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-800 transition-colors"
              title="Pantalla Completa"
            >
              <Maximize2 size={20} />
            </button>
          </div>
      </div>
    </div>
  );
};

export default App;