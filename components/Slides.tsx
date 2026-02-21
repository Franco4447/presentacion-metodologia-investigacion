import React, { useState, useEffect, useRef } from 'react';
import { SlideLayout } from './SlideLayout';
import { 
  Eye, 
  Target, 
  Brain, 
  Database, 
  MousePointer2, 
  Monitor, 
  MessagesSquare, 
  Clock, 
  ShieldCheck, 
  UserCheck,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface SlideContentProps {
  currentSlide: number;
  totalSlides: number;
}

// --- SUB-COMPONENTS ---

// Dynamic MOT Simulation Component for Slide 6
const MOTSimulation = () => {
  // Configuration
  const BALL_COUNT = 8; // 1 Target + 7 Distractors
  const BALL_SIZE_PERCENT = 10; // Relative size for collision math
  
  // State
  const [balls, setBalls] = useState(() => {
    // Initialize balls with random positions and CONSTANT FAST velocity
    const SPEED = 0.8; // Constant speed magnitude
    return Array.from({ length: BALL_COUNT }).map((_, i) => {
      const angle = Math.random() * 2 * Math.PI; // Random direction
      return {
        id: i,
        isTarget: i === 0,
        x: Math.random() * (100 - BALL_SIZE_PERCENT),
        y: Math.random() * (100 - BALL_SIZE_PERCENT),
        vx: Math.cos(angle) * SPEED, 
        vy: Math.sin(angle) * SPEED, 
      };
    });
  });

  const [isTargetVisible, setIsTargetVisible] = useState(true);

  // Animation Loop (Movement & Physics)
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setBalls(prevBalls => prevBalls.map(ball => {
        let { x, y, vx, vy } = ball;

        // Move
        x += vx;
        y += vy;

        // Bounce off walls (0 to 100%)
        if (x <= 0) { x = 0; vx *= -1; }
        if (x >= 100 - BALL_SIZE_PERCENT) { x = 100 - BALL_SIZE_PERCENT; vx *= -1; }
        
        if (y <= 0) { y = 0; vy *= -1; }
        if (y >= 100 - BALL_SIZE_PERCENT) { y = 100 - BALL_SIZE_PERCENT; vy *= -1; }

        return { ...ball, x, y, vx, vy };
      }));
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Color Cycle Logic (3s Green -> 5s Grey -> Repeat)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const runPhaseCycle = () => {
      setIsTargetVisible(true); // Phase 1: Identification (Green)
      
      timer = setTimeout(() => {
        setIsTargetVisible(false); // Phase 2: Tracking (Grey)
        
        timer = setTimeout(() => {
          runPhaseCycle(); // Restart cycle
        }, 5000); // Stay hidden for 5 seconds
        
      }, 3000); // Stay visible for 3 seconds
    };

    runPhaseCycle();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {/* HUD Info */}
      <div className="absolute top-2 left-4 lg:top-8 lg:left-10 text-xs lg:text-xl 2xl:text-2xl text-slate-500 font-mono tracking-widest pointer-events-none z-10">
        MOT SIMULATION v2.4 <span className={isTargetVisible ? 'text-green-500' : 'text-slate-500'}>[{isTargetVisible ? 'IDENTIFICACIÓN' : 'RASTREO'}]</span>
      </div>

      {/* Balls */}
      {balls.map((ball) => (
        <div
          key={ball.id}
          className={`absolute rounded-full border-2 transition-colors duration-500
            ${ball.isTarget && isTargetVisible 
              ? 'bg-green-500 border-white/50 shadow-[0_0_30px_rgba(34,197,94,0.6)] z-20' 
              : 'bg-slate-600 border-white/10 opacity-90 z-10'
            }
          `}
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            width: `${BALL_SIZE_PERCENT}%`,
            aspectRatio: '1/1',
          }}
        >
          {/* Label for Target during identification phase */}
          {ball.isTarget && isTargetVisible && (
             <span className="absolute -top-6 lg:-top-10 left-1/2 -translate-x-1/2 text-white text-[10px] lg:text-lg font-bold bg-black/50 px-2 py-0.5 lg:px-3 lg:py-1 rounded-full whitespace-nowrap pointer-events-none animate-bounce">
               OBJETIVO
             </span>
          )}
        </div>
      ))}

      {/* Footer Status */}
      <div className="absolute bottom-2 lg:bottom-8 w-full text-center font-mono text-sm lg:text-xl 2xl:text-2xl pointer-events-none transition-colors duration-300">
         {isTargetVisible 
           ? <span className="text-green-400 font-bold">Fase 1: Identifique el objetivo</span>
           : <span className="text-slate-500">Fase 2: Rastree el movimiento...</span>
         }
      </div>
    </div>
  );
};

// --- SLIDE DEFINITIONS ---

// Slide 1: Portada - Impacto Visual Máximo Responsivo
export const Slide1: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout slideNumber={currentSlide} totalSlides={totalSlides}>
    <div className="h-full flex flex-col items-center text-center relative p-4">
      
      <div className="flex-1 flex flex-col justify-center items-center mb-4 lg:mb-8 w-full">
        <div className="mb-4 lg:mb-6 p-4 lg:p-6 bg-slate-100 rounded-full shadow-inner">
          <Brain className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-blue-900" />
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-8xl font-black text-blue-900 mb-2 lg:mb-4 leading-none tracking-tight">
          Relación entre Videojuegos FPS<br/>y Atención Selectiva
        </h1>
        <div className="w-32 lg:w-64 h-2 lg:h-3 bg-blue-500 mb-4 lg:mb-6 rounded-full"></div>
        <h2 className="text-xl md:text-3xl lg:text-5xl 2xl:text-6xl text-slate-600 font-light mb-4 lg:mb-8 leading-tight whitespace-nowrap">
          Un estudio experimental sobre experiencia y entrenamiento
        </h2>
        <div className="text-sm md:text-xl lg:text-3xl 2xl:text-4xl font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 lg:mt-4 whitespace-nowrap">
          Licenciatura en Psicología — Universidad Favaloro
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 px-4 lg:px-12 pb-16 lg:pb-32 mt-auto">
        <div className="text-left bg-white/60 p-4 lg:p-8 rounded-2xl backdrop-blur-md border border-slate-200 shadow-sm hidden md:block">
          <h4 className="text-blue-900 font-bold uppercase tracking-wider mb-2 lg:mb-4 border-b-2 lg:border-b-4 border-blue-200 pb-1 lg:pb-2 inline-block text-sm lg:text-3xl">
            Profesores
          </h4>
          <ul className="text-base lg:text-3xl text-slate-700 space-y-1 lg:space-y-3 font-medium">
            <li>Nombre del Profesor 1</li>
            <li>Nombre del Profesor 2</li>
          </ul>
        </div>

        <div className="text-right bg-white/60 p-4 lg:p-8 rounded-2xl backdrop-blur-md border border-slate-200 shadow-sm hidden md:block">
          <h4 className="text-blue-900 font-bold uppercase tracking-wider mb-2 lg:mb-4 border-b-2 lg:border-b-4 border-blue-200 pb-1 lg:pb-2 inline-block text-sm lg:text-3xl">
            Alumnos
          </h4>
          <ul className="text-base lg:text-3xl text-slate-700 space-y-1 lg:space-y-3 font-medium">
            <li>Francisco Iglesias</li>
            <li>Franco Mendez Casariego</li>
            <li>Ivanna Ayelén Martínez</li>
            <li>Shim Un Young</li>
          </ul>
        </div>
      </div>

    </div>
  </SlideLayout>
);

// Slide 2: Introduccion - Stack en móvil, Grid en Desktop
export const Slide2: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout 
    slideNumber={currentSlide} 
    totalSlides={totalSlides}
    title="Introducción: Problema y Controversia"
  >
    <div className="h-full flex flex-col py-2 lg:py-6">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-16 w-full h-full">
        
        {/* Columna Izquierda */}
        <div className="flex flex-col gap-4 lg:gap-10 justify-center">
           <div className="bg-white p-6 lg:p-12 shadow-xl border-l-[8px] lg:border-l-[16px] border-blue-600 rounded-r-2xl lg:rounded-r-3xl flex flex-col justify-center transform transition-transform hover:scale-[1.01]">
              <h4 className="text-xl lg:text-4xl 2xl:text-5xl font-bold text-blue-900 mb-2 lg:mb-6 flex items-center gap-3 lg:gap-5">
                <Brain className="w-8 h-8 lg:w-16 lg:h-16" /> Naturaleza Cognitiva
              </h4>
              <p className="text-slate-600 text-lg lg:text-3xl 2xl:text-4xl leading-relaxed font-medium">
                Escenarios saturados. Decisión constante en <span className="text-blue-700 font-bold">milisegundos</span>.
              </p>
           </div>
           
           <div className="bg-slate-100 p-6 lg:p-12 shadow-lg border-l-[8px] lg:border-l-[16px] border-amber-500 rounded-r-2xl lg:rounded-r-3xl flex flex-col justify-center transform transition-transform hover:scale-[1.01]">
              <h4 className="text-xl lg:text-4xl 2xl:text-5xl font-bold text-amber-700 mb-2 lg:mb-6 flex items-center gap-3 lg:gap-5">
                <AlertTriangle className="w-8 h-8 lg:w-16 lg:h-16" /> La Controversia
              </h4>
              <p className="text-slate-600 text-lg lg:text-3xl 2xl:text-4xl leading-relaxed font-medium">
                ¿Ventaja real o fallas metodológicas?
              </p>
           </div>
        </div>

        {/* Columna Derecha */}
        <div className="bg-slate-900 p-6 lg:p-14 rounded-2xl lg:rounded-[3rem] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden border-2 lg:border-4 border-slate-800 flex-1 lg:flex-none">
           <Target className="absolute top-4 right-4 lg:top-12 lg:right-12 text-blue-600 opacity-20 w-32 h-32 lg:w-64 lg:h-64" />
           
           <div className="relative z-10 space-y-6 lg:space-y-12">
              <div className="border-b border-slate-700 pb-4 lg:pb-8">
                <span className="text-blue-400 font-black uppercase tracking-[0.2em] text-sm lg:text-xl mb-1 lg:mb-2 block">Nuestra Estrategia</span>
                <p className="text-2xl lg:text-4xl font-bold text-white leading-tight">Maximizar la <span className="text-blue-400">Validez de Constructo</span>.</p>
              </div>

              <div>
                 <span className="text-blue-400 font-black uppercase tracking-[0.2em] text-sm lg:text-xl mb-2 lg:mb-4 block">Foco de Estudio</span>
                 <p className="text-3xl lg:text-6xl font-black mt-1 lg:mt-2 text-white tracking-tight">Atención Selectiva Visual</p>
                 <p className="text-base lg:text-2xl text-slate-300 mt-2 lg:mt-6 leading-relaxed font-light">
                   Priorizar estímulos relevantes e inhibir irrelevantes bajo carga.
                 </p>
              </div>
           </div>
        </div>

      </div>
    </div>
  </SlideLayout>
);

// Slide 3: Marco Teórico
export const Slide3: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout 
    slideNumber={currentSlide} 
    totalSlides={totalSlides}
    title="Marco Teórico: Hipótesis"
  >
    <div className="h-full flex flex-col py-4 lg:py-8">
      {/* Definition Header */}
      <div className="mb-6 lg:mb-12 px-0 lg:px-4">
        <div className="flex items-center gap-4 lg:gap-6 text-slate-500 mb-2 lg:mb-4">
            <span className="font-serif italic text-lg lg:text-3xl text-slate-600 font-semibold">Vásquez Echeverría (2006)</span>
            <div className="h-1 lg:h-1.5 bg-slate-200 flex-1 rounded-full"></div>
        </div>
        <p className="text-xl lg:text-4xl 2xl:text-5xl text-slate-800 leading-snug font-light">
          Filtro de sobrecarga mediante mecanismos <strong className="text-blue-700 font-bold">Top-Down</strong> (metas) y <strong className="text-blue-700 font-bold">Bottom-Up</strong> (saliencia).
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-16 flex-1 px-0 lg:px-2">
        {/* Box 1 */}
        <div className="flex-1 bg-white rounded-2xl lg:rounded-[3rem] border-2 lg:border-4 border-slate-100 flex flex-col items-center text-center justify-center shadow-xl p-6 lg:p-12 relative overflow-hidden group">
          <div className="bg-slate-50 p-4 lg:p-10 rounded-full mb-4 lg:mb-8 shadow-inner">
            <UserCheck className="w-12 h-12 lg:w-24 lg:h-24 text-blue-900" />
          </div>
          <h3 className="text-2xl lg:text-5xl 2xl:text-6xl font-extrabold text-blue-900 mb-2 lg:mb-6 leading-tight">Demanda Común</h3>
          <p className="text-slate-600 text-lg lg:text-3xl 2xl:text-4xl px-2 lg:px-6 leading-relaxed font-medium">
            Mejora por similitud directa (selección rápida).
          </p>
        </div>

        {/* VS */}
        <div className="flex flex-col justify-center z-10 items-center">
          <div className="text-2xl lg:text-5xl font-black text-slate-300 bg-white p-4 lg:p-8 rounded-full border-4 lg:border-8 border-slate-100 shadow-2xl">
            VS
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex-1 bg-blue-900 rounded-2xl lg:rounded-[3rem] border-2 lg:border-4 border-blue-800 flex flex-col items-center text-center justify-center shadow-2xl p-6 lg:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 lg:w-80 lg:h-80 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="bg-blue-800 p-4 lg:p-10 rounded-full mb-4 lg:mb-8 shadow-inner relative z-10">
            <Brain className="w-12 h-12 lg:w-24 lg:h-24 text-white" />
          </div>
          <h3 className="text-2xl lg:text-5xl 2xl:text-6xl font-extrabold text-white mb-2 lg:mb-6 relative z-10 leading-tight">Aprender a Aprender</h3>
          <span className="text-blue-300 text-sm lg:text-xl 2xl:text-2xl font-bold uppercase tracking-widest mb-2 lg:mb-6 block relative z-10">Feng & Spence</span>
          <p className="text-blue-50 text-lg lg:text-3xl 2xl:text-4xl px-2 lg:px-6 leading-relaxed font-medium relative z-10">
            Control flexible adaptable a <em>nuevas tareas</em>.
          </p>
        </div>
      </div>
    </div>
  </SlideLayout>
);

// Slide 4: Methodology - Grid Responsivo
export const Slide4: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout 
    slideNumber={currentSlide} 
    totalSlides={totalSlides}
    title="Metodología: Diseño"
  >
    <div className="h-full flex flex-col lg:flex-row gap-8 lg:gap-20 py-4 lg:py-8 items-center lg:items-stretch overflow-y-auto">
      
      {/* Contexto Lateral */}
      <div className="w-full lg:w-1/3 flex flex-col justify-center space-y-4 lg:space-y-12">
        <div>
            <h3 className="text-3xl lg:text-5xl font-black text-blue-900 mb-2 lg:mb-4 leading-tight">Factorial 2x2</h3>
            <p className="text-xl lg:text-3xl text-slate-600 font-light">Inter-Sujeto Aleatorio</p>
        </div>
        
        <div className="bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl border-l-4 lg:border-l-[12px] border-amber-500 shadow-lg">
            <h4 className="font-bold text-slate-800 mb-2 lg:mb-4 flex items-center gap-2 lg:gap-4 text-lg lg:text-2xl">
                <AlertTriangle className="w-6 h-6 lg:w-8 lg:h-8 text-amber-500"/> Nota Clave
            </h4>
            <div className="text-slate-600 text-base lg:text-xl space-y-1 lg:space-y-4">
                <p><strong>Var. Sujeto:</strong> No aleatoria.</p>
                <p><strong>Var. Entrenamiento:</strong> Aleatoria.</p>
            </div>
        </div>

        <div className="bg-blue-50 p-4 lg:p-8 rounded-2xl lg:rounded-3xl border-2 border-blue-100">
             <h4 className="font-bold text-blue-900 mb-2 lg:mb-4 flex items-center gap-2 lg:gap-4 text-lg lg:text-2xl">
                <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8" /> Medidas Repetidas
            </h4>
            <p className="text-blue-800 text-lg lg:text-2xl font-medium leading-relaxed">
                Pre-Test <ArrowRight className="inline w-4 h-4 lg:w-6 lg:h-6 mx-2"/> Post-Test.<br/>
                Clave: <span className="bg-blue-200 px-2 rounded">DELTA</span>.
            </p>
        </div>
      </div>

      {/* Matriz 2x2 Adaptable */}
      <div className="flex-1 w-full h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] md:grid-rows-[auto_1fr_1fr] gap-4 lg:gap-6 flex-1">
          
          {/* Corner - Hidden on mobile */}
          <div className="hidden md:block"></div>

          {/* Col Headers */}
          <div className="flex items-center justify-center bg-blue-100/50 rounded-xl lg:rounded-2xl pb-1 lg:pb-2 p-2">
            <span className="text-sm lg:text-2xl 2xl:text-3xl font-black text-blue-900 uppercase tracking-widest text-center">ATENCIÓN</span>
          </div>
          <div className="flex items-center justify-center bg-slate-100/50 rounded-xl lg:rounded-2xl pb-1 lg:pb-2 p-2">
             <span className="text-sm lg:text-2xl 2xl:text-3xl font-black text-slate-500 uppercase tracking-widest text-center">LENGUAJE</span>
          </div>

          {/* Row Header 1 */}
          <div className="flex md:flex-col items-center md:items-end justify-start md:justify-center pr-0 md:pr-8 bg-slate-50 md:bg-transparent p-2 rounded-lg">
             <div className="text-left md:text-right w-full md:w-auto">
                <span className="inline md:block text-xl lg:text-4xl 2xl:text-5xl font-black text-blue-900 leading-none mr-2 md:mr-0">Jugador</span>
                <span className="inline md:block text-sm lg:text-xl 2xl:text-2xl text-blue-700 font-bold uppercase tracking-wide mt-0 lg:mt-1">(Experto)</span>
             </div>
          </div>

          {/* Cell 1x1 */}
          <div className="bg-blue-100 border-4 lg:border-[6px] border-blue-400 rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center text-center p-4 lg:p-6 shadow-xl">
             <span className="text-2xl lg:text-5xl 2xl:text-6xl font-black text-blue-900 mb-1 lg:mb-3">Grupo 1</span>
             <span className="text-base lg:text-3xl 2xl:text-4xl text-blue-800 font-medium">Expertos + UFOV</span>
          </div>

          {/* Cell 1x2 */}
          <div className="bg-white border-4 lg:border-[6px] border-slate-200 rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center text-center p-4 lg:p-6 text-slate-400">
             <span className="text-2xl lg:text-5xl 2xl:text-6xl font-bold text-slate-600 mb-1 lg:mb-3">Grupo 2</span>
             <span className="text-base lg:text-3xl 2xl:text-4xl text-slate-500">Expertos + Fluidez</span>
          </div>

          {/* Row Header 2 */}
          <div className="flex md:flex-col items-center md:items-end justify-start md:justify-center pr-0 md:pr-8 bg-slate-50 md:bg-transparent p-2 rounded-lg">
             <div className="text-left md:text-right w-full md:w-auto">
                <span className="inline md:block text-xl lg:text-4xl 2xl:text-5xl font-black text-slate-500 leading-none mr-2 md:mr-0">No Jugador</span>
                <span className="inline md:block text-sm lg:text-xl 2xl:text-2xl text-slate-400 font-bold uppercase tracking-wide mt-0 lg:mt-1">(Novato)</span>
             </div>
          </div>

          {/* Cell 2x1 */}
          <div className="bg-blue-50 border-4 lg:border-[6px] border-blue-200 rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center text-center p-4 lg:p-6 shadow-md">
             <span className="text-2xl lg:text-5xl 2xl:text-6xl font-bold text-blue-900 mb-1 lg:mb-3">Grupo 3</span>
             <span className="text-base lg:text-3xl 2xl:text-4xl text-blue-800 font-medium">Novatos + UFOV</span>
          </div>

          {/* Cell 2x2 */}
          <div className="bg-slate-50 border-4 lg:border-[6px] border-slate-200 rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center text-center p-4 lg:p-6 text-slate-400">
             <span className="text-2xl lg:text-5xl 2xl:text-6xl font-bold text-slate-600 mb-1 lg:mb-3">Grupo 4</span>
             <span className="text-base lg:text-3xl 2xl:text-4xl text-slate-500">Novatos + Fluidez</span>
          </div>

        </div>
      </div>
    </div>
  </SlideLayout>
);

// Slide 5: Participants
export const Slide5: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout 
    slideNumber={currentSlide} 
    totalSlides={totalSlides}
    title="Participantes: Muestreo"
  >
    <div className="h-full flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-16 py-4 lg:py-8">
      
      {/* Columna 1: Demographics */}
      <div className="w-full lg:w-5/12 flex flex-col gap-6 lg:gap-10">
        <div className="bg-white p-6 lg:p-12 rounded-2xl lg:rounded-[3rem] shadow-xl border-l-[10px] lg:border-l-[20px] border-slate-800 flex-1 flex flex-col justify-center">
          <h4 className="text-2xl lg:text-5xl font-bold text-slate-800 mb-6 lg:mb-12 border-b-2 lg:border-b-4 border-slate-100 pb-2 lg:pb-6">Demografía</h4>
          
          <div className="space-y-6 lg:space-y-12">
            <div>
                <p className="text-sm lg:text-xl text-slate-400 font-bold uppercase tracking-widest mb-1 lg:mb-2">Edad</p>
                <p className="text-4xl lg:text-7xl font-light text-blue-900">18 - 21</p>
                <p className="text-slate-500 text-sm lg:text-2xl italic mt-1 lg:mt-2">Ref: Newzoo (2024)</p>
            </div>
            
            <div>
                <p className="text-sm lg:text-xl text-slate-400 font-bold uppercase tracking-widest mb-1 lg:mb-2">Muestra Total</p>
                <div className="flex items-baseline gap-2 lg:gap-4">
                  <p className="text-4xl lg:text-7xl font-bold text-slate-800">N = 60</p>
                  <p className="text-slate-600 text-lg lg:text-3xl font-medium">(30 / grupo)</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Columna 2: Criterios */}
      <div className="flex-1 bg-slate-100 rounded-2xl lg:rounded-[3rem] p-6 lg:p-12 flex flex-col relative overflow-hidden border-2 lg:border-4 border-white shadow-inner">
         <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
            <Database className="w-32 h-32 lg:w-64 lg:h-64" />
         </div>

         <h4 className="text-xl lg:text-4xl font-black text-blue-900 mb-6 lg:mb-10 relative z-10 border-b-2 lg:border-b-4 border-slate-200 pb-2 lg:pb-4 inline-block">Verificación</h4>

         <div className="flex-1 flex flex-col justify-center gap-4 lg:gap-10 relative z-10">
            {/* Jugadores */}
            <div className="bg-white p-6 lg:p-10 rounded-2xl lg:rounded-3xl shadow-xl border-l-[8px] lg:border-l-[16px] border-green-500">
                <div className="flex justify-between items-center mb-2 lg:mb-6">
                    <span className="text-xl lg:text-4xl font-bold text-green-800">Jugadores</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 lg:px-6 lg:py-2 rounded-full text-xs lg:text-xl font-bold tracking-wide">API DATA</span>
                </div>
                <ul className="space-y-2 lg:space-y-4 text-base lg:text-3xl text-slate-700 font-medium">
                    <li className="flex items-center gap-2 lg:gap-5">
                        <CheckCircle2 className="w-5 h-5 lg:w-9 lg:h-9 text-green-600 flex-shrink-0"/> &gt; 1 hora diaria
                    </li>
                    <li className="flex items-center gap-2 lg:gap-5">
                        <CheckCircle2 className="w-5 h-5 lg:w-9 lg:h-9 text-green-600 flex-shrink-0"/> Últimos <strong className="text-black">5 años</strong>
                    </li>
                    <li className="flex items-center gap-2 lg:gap-5">
                        <Database className="w-5 h-5 lg:w-9 lg:h-9 text-slate-400 flex-shrink-0"/> Validación: <strong>SteamDB</strong>
                    </li>
                </ul>
            </div>

            {/* No Jugadores */}
            <div className="bg-slate-200 p-4 lg:p-8 rounded-2xl lg:rounded-3xl border-l-[8px] lg:border-l-[16px] border-red-400 opacity-70">
                <div className="flex justify-between items-center mb-1 lg:mb-2">
                    <span className="text-lg lg:text-3xl font-bold text-slate-700">No Jugadores</span>
                </div>
                <p className="text-base lg:text-2xl text-slate-600 mt-1 lg:mt-2 font-medium">
                    Exclusión estricta. Verificación cruzada con hobbies.
                </p>
            </div>
         </div>
      </div>
    </div>
  </SlideLayout>
);

// Slide 6: MOT - Visualización (UPDATED WITH DYNAMIC SIMULATION)
export const Slide6: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout 
    slideNumber={currentSlide} 
    totalSlides={totalSlides}
    title="Instrumento: MOT"
  >
    <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 py-4 lg:py-8">
      <div className="w-full lg:w-1/2 flex flex-col justify-center h-auto lg:h-full order-2 lg:order-1">
        <div className="mb-4 lg:mb-12 border-l-4 lg:border-l-8 border-blue-500 pl-4 lg:pl-8">
            <span className="text-slate-400 text-sm lg:text-xl 2xl:text-2xl uppercase tracking-[0.2em] font-bold block mb-1 lg:mb-2">Variable Dependiente</span>
            <h3 className="text-4xl lg:text-7xl 2xl:text-8xl font-black text-blue-900 mb-2 lg:mb-4">Test MOT</h3>
            <p className="text-xl lg:text-3xl 2xl:text-4xl text-slate-500 font-serif italic">Ref: Lukavsky (2016)</p>
        </div>
        
        <div className="space-y-4 lg:space-y-10">
            <div className="flex gap-4 lg:gap-8 items-start bg-white p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-black text-xl lg:text-4xl flex-shrink-0 shadow-inner">1</div>
                <div>
                    <h4 className="text-xl lg:text-3xl font-bold text-slate-800 mb-1 lg:mb-2">Identificación</h4>
                    <p className="text-base lg:text-2xl text-slate-600 leading-snug">3s. <strong>1 Objetivo Verde</strong> vs 7 Distractores.</p>
                </div>
            </div>

            <div className="flex gap-4 lg:gap-8 items-start bg-blue-50 p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-md border-l-4 lg:border-l-8 border-blue-500">
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl lg:text-4xl flex-shrink-0 shadow-lg">2</div>
                <div>
                    <h4 className="text-xl lg:text-3xl font-bold text-blue-900 mb-1 lg:mb-2">Movimiento</h4>
                    <p className="text-base lg:text-2xl text-slate-700 leading-snug"><strong className="text-blue-700 text-lg lg:text-3xl">5 segundos.</strong> Caos aleatorio y ocultamiento.</p>
                </div>
            </div>

            <div className="flex gap-4 lg:gap-8 items-start bg-white p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-black text-xl lg:text-4xl flex-shrink-0 shadow-inner">3</div>
                <div>
                    <h4 className="text-xl lg:text-3xl font-bold text-slate-800 mb-1 lg:mb-2">Respuesta</h4>
                    <p className="text-base lg:text-2xl text-slate-600 leading-snug">Señalar objetivo. Dificultad adaptativa.</p>
                </div>
            </div>
        </div>
      </div>

      {/* Visual Simulation of MOT (Dynamic) */}
      <div className="w-full lg:w-auto h-[400px] lg:h-full aspect-video lg:aspect-square rounded-2xl lg:rounded-[3rem] relative shadow-2xl overflow-hidden border-4 lg:border-[16px] border-slate-800 flex-shrink-0 order-1 lg:order-2">
        <MOTSimulation />
      </div>
    </div>
  </SlideLayout>
);

// Slide 7: Intervention - Comparativa Responsive
export const Slide7: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout 
    slideNumber={currentSlide} 
    totalSlides={totalSlides}
    title="Entrenamiento"
  >
    <div className="h-full flex flex-col lg:flex-row gap-6 lg:gap-16 py-4 lg:py-8 overflow-y-auto">
       {/* Experimental Column */}
       <div className="flex-1 bg-gradient-to-b from-blue-50 to-white rounded-2xl lg:rounded-[3rem] p-6 lg:p-12 border-2 border-blue-200 flex flex-col shadow-2xl relative overflow-hidden group min-h-[400px]">
          <div className="absolute top-0 right-0 w-32 h-32 lg:w-64 lg:h-64 bg-blue-100 rounded-bl-full opacity-50"></div>
          
          <div className="flex items-center gap-4 lg:gap-8 mb-6 lg:mb-12 relative z-10">
            <div className="p-4 lg:p-6 bg-blue-600 rounded-2xl lg:rounded-3xl text-white shadow-xl">
                <Monitor className="w-8 h-8 lg:w-16 lg:h-16" />
            </div>
            <div>
                <h3 className="text-2xl lg:text-4xl 2xl:text-5xl font-black text-blue-900 leading-none">Grupo Experimental</h3>
                <span className="text-lg lg:text-2xl 2xl:text-3xl text-blue-600 font-bold mt-1 lg:mt-2 block">Tarea UFOV</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-6 lg:space-y-10 relative z-10">
            <p className="text-xl lg:text-3xl 2xl:text-4xl text-slate-700 leading-relaxed font-medium">
                Atención bajo <strong className="text-blue-600 bg-blue-100 px-2 rounded">PRESIÓN DUAL</strong>.
            </p>
            <div className="space-y-4 lg:space-y-6">
                <div className="bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl shadow-md border border-blue-100 flex gap-4 lg:gap-6 items-center">
                    <span className="text-3xl lg:text-5xl font-black text-blue-200">1</span>
                    <div>
                         <strong className="text-blue-900 block mb-1 text-lg lg:text-2xl">Objetivo Central</strong>
                         <span className="text-base lg:text-xl text-slate-600">Identificar cara (rasgo sutil).</span>
                    </div>
                </div>
                <div className="bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl shadow-md border border-blue-100 flex gap-4 lg:gap-6 items-center">
                    <span className="text-3xl lg:text-5xl font-black text-blue-200">2</span>
                    <div>
                        <strong className="text-blue-900 block mb-1 text-lg lg:text-2xl">Objetivo Periférico</strong>
                        <span className="text-base lg:text-xl text-slate-600">Localizar estímulo.</span>
                    </div>
                </div>
            </div>
          </div>
       </div>

       {/* Control Column */}
       <div className="flex-1 bg-slate-50 rounded-2xl lg:rounded-[3rem] p-6 lg:p-12 border-2 border-slate-200 flex flex-col shadow-xl relative overflow-hidden min-h-[400px]">
          
          <div className="flex items-center gap-4 lg:gap-8 mb-6 lg:mb-12 relative z-10">
            <div className="p-4 lg:p-6 bg-slate-600 rounded-2xl lg:rounded-3xl text-white shadow-xl">
                <MessagesSquare className="w-8 h-8 lg:w-16 lg:h-16" />
            </div>
            <div>
                <h3 className="text-2xl lg:text-4xl 2xl:text-5xl font-black text-slate-800 leading-none">Grupo Control</h3>
                <span className="text-lg lg:text-2xl 2xl:text-3xl text-slate-500 font-bold mt-1 lg:mt-2 block">Fluidez Verbal</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-6 lg:space-y-10 relative z-10">
             <div className="flex items-center gap-2 lg:gap-4 mb-2 lg:mb-4">
                 <span className="bg-amber-100 text-amber-800 px-3 py-1 lg:px-6 lg:py-2 rounded-full text-sm lg:text-lg font-black uppercase tracking-widest border border-amber-200">Control Activo</span>
             </div>
             <p className="text-xl lg:text-3xl 2xl:text-4xl text-slate-700 leading-relaxed font-medium">
                Esfuerzo alto, <u className="decoration-4 decoration-red-300 decoration-wavy">NO entrena</u> visión.
            </p>
            <div className="space-y-4 lg:space-y-6">
                 <div className="bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl shadow-sm border border-slate-200">
                    <strong className="text-slate-800 block mb-1 lg:mb-2 text-lg lg:text-2xl">Fluidez Categorial</strong>
                    <span className="text-base lg:text-xl text-slate-600">Nombrar animales/comidas.</span>
                </div>
                <div className="bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl shadow-sm border border-slate-200">
                    <strong className="text-slate-800 block mb-1 lg:mb-2 text-lg lg:text-2xl">Fluidez Fonémica</strong>
                    <span className="text-base lg:text-xl text-slate-600">Palabras con 'M' o 'S' (60s).</span>
                </div>
            </div>
          </div>
       </div>
    </div>
  </SlideLayout>
);

// Slide 8: Procedure - Timeline Responsive
export const Slide8: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout 
    slideNumber={currentSlide} 
    totalSlides={totalSlides}
    title="Procedimiento (14 Días)"
  >
     <div className="h-full flex items-center justify-center py-4 lg:py-12 overflow-y-auto">
        <div className="w-full relative px-2 lg:px-10">
            {/* Timeline Line - Hidden on small screens */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-6 bg-slate-200 -translate-y-1/2 z-0 rounded-full"></div>

            <div className="flex flex-col lg:flex-row justify-between relative z-10 w-full gap-8">
                {/* Step 1 */}
                <div className="flex flex-row lg:flex-col items-center group flex-1 gap-4 lg:gap-0">
                    <div className="w-16 h-16 lg:w-32 lg:h-32 2xl:w-40 2xl:h-40 bg-white border-4 lg:border-[10px] border-slate-600 rounded-full flex items-center justify-center mb-0 lg:mb-10 shadow-2xl z-20 flex-shrink-0">
                        <span className="font-black text-slate-700 text-xl lg:text-4xl 2xl:text-5xl">Día 1</span>
                    </div>
                    <div className="bg-white p-4 lg:p-10 rounded-2xl lg:rounded-[2rem] shadow-xl text-left lg:text-center border-l-4 lg:border-l-0 lg:border-t-[12px] border-slate-600 w-full lg:h-80 2xl:h-96 flex flex-col justify-start">
                        <h4 className="font-black text-xl lg:text-3xl 2xl:text-4xl mb-2 lg:mb-4 text-slate-800 uppercase tracking-wide">Evaluación</h4>
                        <span className="inline-block bg-slate-100 px-2 py-1 lg:px-4 lg:py-2 rounded-lg text-slate-500 font-bold uppercase text-xs lg:text-sm 2xl:text-base mb-2 lg:mb-6 self-start lg:self-center tracking-widest">Presencial</span>
                        <p className="text-base lg:text-2xl 2xl:text-3xl text-slate-600 leading-snug font-medium">
                            <strong className="text-slate-900">Pre-Test MOT</strong>. Línea Base.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-row lg:flex-col items-center group flex-[1.2] gap-4 lg:gap-0">
                    <div className="w-20 h-20 lg:w-40 lg:h-40 2xl:w-48 2xl:h-48 bg-blue-600 border-4 lg:border-[10px] border-white rounded-full flex items-center justify-center mb-0 lg:mb-10 shadow-2xl ring-4 lg:ring-8 ring-blue-100 z-20 flex-shrink-0">
                         <Clock className="text-white w-8 h-8 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24" />
                    </div>
                    <div className="bg-white p-4 lg:p-10 rounded-2xl lg:rounded-[2rem] shadow-2xl text-left lg:text-center border-l-4 lg:border-l-0 lg:border-t-[12px] border-blue-600 w-full lg:transform lg:-translate-y-8 lg:h-96 2xl:h-[28rem] flex flex-col justify-center relative z-30 lg:scale-105">
                        <h4 className="font-black text-xl lg:text-4xl 2xl:text-5xl text-blue-900 mb-2 uppercase tracking-wide">Entrenamiento</h4>
                        <span className="inline-block bg-blue-100 px-2 py-1 lg:px-6 lg:py-2 rounded-lg text-blue-800 font-bold uppercase text-xs lg:text-sm 2xl:text-base mb-2 lg:mb-6 self-start lg:self-center tracking-widest">Remoto</span>
                        <h5 className="text-lg lg:text-4xl 2xl:text-5xl font-black text-slate-800 mb-2 lg:mb-4">Días 2 al 13</h5>
                        <div className="text-base lg:text-3xl 2xl:text-4xl text-slate-700 font-bold bg-slate-100 p-2 lg:p-4 rounded-xl border border-slate-200 inline-block mb-2 lg:mb-4 self-start lg:self-center">
                           10 min / día
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-row lg:flex-col items-center group flex-1 gap-4 lg:gap-0">
                    <div className="w-16 h-16 lg:w-32 lg:h-32 2xl:w-40 2xl:h-40 bg-white border-4 lg:border-[10px] border-slate-600 rounded-full flex items-center justify-center mb-0 lg:mb-10 shadow-2xl z-20 flex-shrink-0 text-center">
                        <span className="font-black text-slate-700 text-xl lg:text-4xl 2xl:text-5xl leading-none block w-full">Día 14</span>
                    </div>
                    <div className="bg-white p-4 lg:p-10 rounded-2xl lg:rounded-[2rem] shadow-xl text-left lg:text-center border-l-4 lg:border-l-0 lg:border-t-[12px] border-slate-600 w-full lg:h-80 2xl:h-96 flex flex-col justify-start">
                        <h4 className="font-black text-xl lg:text-3xl 2xl:text-4xl mb-2 lg:mb-4 text-slate-800 uppercase tracking-wide">Re-Test</h4>
                        <span className="inline-block bg-slate-100 px-2 py-1 lg:px-4 lg:py-2 rounded-lg text-slate-500 font-bold uppercase text-xs lg:text-sm 2xl:text-base mb-2 lg:mb-6 self-start lg:self-center tracking-widest">Presencial</span>
                        <p className="text-base lg:text-2xl 2xl:text-3xl text-slate-600 leading-snug font-medium">
                            <strong className="text-slate-900">Post-Test MOT</strong>. Análisis Delta.
                        </p>
                    </div>
                </div>
            </div>
        </div>
     </div>
  </SlideLayout>
);

// Slide 9: Feasibility
export const Slide9: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout 
    slideNumber={currentSlide} 
    totalSlides={totalSlides}
    title="Factibilidad y Ética"
  >
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-stretch py-4 lg:py-10">
        <div className="flex flex-col gap-4 lg:gap-10 justify-center">
            <div className="flex items-start gap-4 lg:gap-8 bg-white p-4 lg:p-10 rounded-2xl lg:rounded-[2.5rem] shadow-lg border border-slate-100 transform lg:hover:scale-105 transition-transform">
                <div className="p-3 lg:p-6 bg-green-100 rounded-2xl lg:rounded-3xl text-green-700 mt-1 lg:mt-2">
                    <MousePointer2 className="w-6 h-6 lg:w-12 lg:h-12" />
                </div>
                <div>
                    <h4 className="text-xl lg:text-3xl 2xl:text-4xl font-bold text-slate-800 mb-2 lg:mb-4">Recursos Técnicos</h4>
                    <p className="text-base lg:text-2xl 2xl:text-3xl text-slate-600 leading-relaxed mb-2 lg:mb-4">
                        Desarrollo propio ($0). <strong className="text-green-700">Sin costo.</strong>
                    </p>
                    <div className="bg-slate-50 p-2 lg:p-4 rounded-xl border border-slate-200">
                        <span className="text-xs lg:text-sm 2xl:text-base font-bold text-slate-400 uppercase tracking-widest">Metodología</span>
                        <p className="font-bold text-slate-700 text-sm lg:text-xl 2xl:text-2xl">LABPSI (Mar del Plata)</p>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-4 lg:gap-8 bg-white p-4 lg:p-10 rounded-2xl lg:rounded-[2.5rem] shadow-lg border border-slate-100 transform lg:hover:scale-105 transition-transform">
                <div className="p-3 lg:p-6 bg-blue-100 rounded-2xl lg:rounded-3xl text-blue-700 mt-1 lg:mt-2">
                    <Database className="w-6 h-6 lg:w-12 lg:h-12" />
                </div>
                <div>
                    <h4 className="text-xl lg:text-3xl 2xl:text-4xl font-bold text-slate-800 mb-2 lg:mb-4">Herramientas</h4>
                    <ul className="text-base lg:text-2xl 2xl:text-3xl text-slate-600 space-y-1 lg:space-y-3 font-medium">
                        <li>• Google Forms</li>
                        <li>• SteamDB (API)</li>
                        <li>• PsychoPy</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="bg-slate-100 p-6 lg:p-12 rounded-2xl lg:rounded-[3rem] border-l-[10px] lg:border-l-[20px] border-slate-400 flex flex-col justify-center h-full">
            <h3 className="text-3xl lg:text-5xl 2xl:text-6xl font-black text-slate-700 mb-6 lg:mb-12 flex items-center gap-4 lg:gap-6">
                <ShieldCheck className="w-12 h-12 lg:w-20 lg:h-20 text-slate-600" /> Marco Ético
            </h3>
            <ul className="space-y-4 lg:space-y-8">
                <li className="flex items-center gap-4 lg:gap-6 text-slate-700 bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl shadow-sm text-lg lg:text-2xl 2xl:text-3xl font-bold">
                    <div className="w-2 h-2 lg:w-4 lg:h-4 bg-slate-400 rounded-full flex-shrink-0"></div>
                    Ley 25.326.
                </li>
                <li className="flex items-center gap-4 lg:gap-6 text-slate-700 bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl shadow-sm text-lg lg:text-2xl 2xl:text-3xl font-bold">
                    <div className="w-2 h-2 lg:w-4 lg:h-4 bg-slate-400 rounded-full flex-shrink-0"></div>
                    Anonimato Total.
                </li>
                <li className="flex items-center gap-4 lg:gap-6 text-slate-700 bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl shadow-sm text-lg lg:text-2xl 2xl:text-3xl font-bold">
                    <div className="w-2 h-2 lg:w-4 lg:h-4 bg-slate-400 rounded-full flex-shrink-0"></div>
                    Consentimiento Digital.
                </li>
            </ul>
        </div>
    </div>
  </SlideLayout>
);

// Slide 10: Closing - Despedida Responsive
export const Slide10: React.FC<SlideContentProps> = ({ currentSlide, totalSlides }) => (
  <SlideLayout slideNumber={currentSlide} totalSlides={totalSlides}>
    <div className="h-full flex flex-col justify-center items-center text-center p-4">
      
      <div className="animate-in fade-in slide-in-from-bottom duration-1000 mb-10 lg:mb-20 max-w-7xl">
         <h2 className="text-2xl lg:text-5xl 2xl:text-6xl text-slate-500 font-light mb-4 lg:mb-10">
            Hacia una evidencia clara sobre la
         </h2>
         <h1 className="text-5xl lg:text-9xl 2xl:text-[10rem] font-black text-blue-900 tracking-tight leading-none mb-2 lg:mb-4">
            Plasticidad Cognitiva
         </h1>
         <span className="text-2xl lg:text-6xl 2xl:text-7xl text-blue-400 font-bold block mt-2 lg:mt-0">derivada de los videojuegos</span>
      </div>

      <div className="w-24 lg:w-48 h-2 lg:h-3 bg-slate-200 mb-10 lg:mb-20 rounded-full"></div>
      
      <div className="animate-in zoom-in duration-500 delay-300">
        <h1 className="text-6xl lg:text-9xl 2xl:text-[11rem] font-black text-slate-800 mb-4 lg:mb-8 tracking-tighter">Muchas Gracias</h1>
        <p className="text-2xl lg:text-5xl 2xl:text-6xl text-slate-400 font-light">¿Preguntas?</p>
      </div>

    </div>
  </SlideLayout>
);