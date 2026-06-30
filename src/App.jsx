import React, { useState, useEffect } from 'react';
import { PLATFORM_FEATURES } from './constants/features';
import FeatureCard from './components/FeatureCard';
import Button from './components/Button';
import Modal from './components/Modal';
import EmotionWheel from './components/EmotionWheel';

const REFLECTION_THEMES = {
  estudios: {
    title: 'Estrés por estudios',
    message: 'Hola! Veo que has seleccionado "Estrés por Estudios". El cansancio acumulado puede distorsionar tus prioridades. ¿Qué aspecto de tu carga académica te genera mayor tensión hoy?',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    )
  },
  impostor: {
    title: 'Síndrome del Impostor',
    message: 'Hola! Reconocer el "Síndrome del Impostor" es el primer paso. A veces minimizamos nuestros propios logros universitarios. ¿Qué éxito reciente te cuesta internalizar como tuyo?',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  incertidumbre: {
    title: 'Incertidumbre Futura',
    message: 'Hola! La "Incertidumbre Futura" es completamente normal en esta etapa. El mañana se construye un paso a la vez. ¿Qué decisión o panorama post-universitario te preocupa más en este momento?',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  }
};

const MOOD_OPTIONS = [
  { label: 'Excelente', emoji: '😁', value: 'Exc' },
  { label: 'Bien', emoji: '😊', value: 'Bin' },
  { label: 'Regular', emoji: '😐', value: 'Reg' },
  { label: 'Mal', emoji: '😔', value: 'Mal' },
  { label: 'Crítico', emoji: '😫', value: 'Cri' },
];

// Estructura de Datos para las preguntas frecuentes de image_8072b1.jpg
const FAQ_ITEMS = [
  {
    id: 'anonimo',
    question: '¿Mis respuestas son anónimas?',
    answer: 'Sí, absolutamente. Toda la información y autoevaluaciones que realizas se procesan de forma local en tu navegador. MindCampus no almacena ni comparte tus respuestas con terceros o entidades universitarias.'
  },
  {
    id: 'psicologo',
    question: '¿Esto reemplaza a un psicólogo?',
    answer: 'No. Esta plataforma es una herramienta de apoyo, primer contacto y gestión de autoconocimiento emocional. No sustituye de ninguna manera un tratamiento, terapia clínica o el diagnóstico de un profesional de la salud mental.'
  },
  {
    id: 'costo',
    question: '¿Tiene algún costo?',
    answer: 'No, la plataforma es 100% gratuita y de acceso libre para la comunidad estudiantil como parte de las iniciativas de bienestar universitario.'
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('welcome'); 
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('estudios');
  const [currentView, setCurrentView] = useState('inicio');
  const [unlockedFeatures, setUnlockedFeatures] = useState(false);
  const [todayMood, setTodayMood] = useState(null);

  // Estado para controlar qué acordeón de FAQ está expandido
  const [openFaq, setOpenFaq] = useState(null);

  // Estados para el formulario de sugerencias
  const [feedbackForm, setFeedbackForm] = useState({ name: '', career: '', message: '' });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'inicio';
      if ((hash === 'actividades' || hash === 'registro') && !unlockedFeatures) {
        window.location.hash = 'inicio';
        setCurrentView('inicio');
      } else {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [unlockedFeatures]);

  const openModal = () => {
    setModalStep('welcome');
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmotion(null);
    setSelectedTheme('estudios');
  };

  const handleSelectEmotion = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleConfirmEmotion = () => {
    setModalStep('reflection');
  };

  const handleFinishReflection = () => {
    setUnlockedFeatures(true);
    closeModal();
    setTimeout(() => {
      window.location.hash = 'actividades';
    }, 50);
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback enviado:', feedbackForm);
    alert('¡Gracias por tus comentarios! Nos ayudan a mejorar MindCampus.');
    setFeedbackForm({ name: '', career: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-neutral-800 font-sans p-4 md:p-8 flex flex-col justify-between antialiased">
      
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto bg-white border-2 border-black px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 font-bold tracking-wider text-lg uppercase select-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" className="w-7 h-8 text-black" fill="none">
            <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 20 90 L 40 90" />
              <path d="M 40 85 L 40 50 L 55 35" />
              <path d="M 45 20 L 45 40 L 67 25 L 67 60 M 62 65 L 75 65 L 90 85" />
              <path d="M 52 58 L 52 90" />
            </g>
          </svg>
          MINDCAMPUS
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-wider text-neutral-500">
          <a href="#inicio" className={`pb-0.5 transition-all ${currentView === 'inicio' ? 'text-black border-b-2 border-black' : 'hover:text-black'}`}>INICIO</a>
          
          {unlockedFeatures && (
            <>
              <a href="#actividades" className={`pb-0.5 transition-all ${currentView === 'actividades' ? 'text-black border-b-2 border-black' : 'hover:text-black'}`}>ACTIVIDADES</a>
              <a href="#registro" className={`pb-0.5 transition-all ${currentView === 'registro' ? 'text-black border-b-2 border-black' : 'hover:text-black'}`}>REGISTRO</a>
            </>
          )}
          
          <a href="#ayuda" className={`pb-0.5 transition-all ${currentView === 'ayuda' ? 'text-black border-b-2 border-black' : 'hover:text-black'}`}>AYUDA</a>
        </nav>
      </header>

      {/* Main Content Areas */}
      <main className="w-full max-w-7xl mx-auto flex-1 relative mb-8">
        
        {/* VISTA: INICIO */}
        {currentView === 'inicio' && (
          <div className="border-2 border-neutral-300 p-6 md:p-12 lg:p-16 flex items-center bg-[#fdfdfd]/40 rounded-sm relative w-full h-full">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              <div className="lg:col-span-7 space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.1]">
                  Tu espacio seguro <br /> de gestión <br /> emocional
                </h1>
                <p className="text-neutral-500 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                  Una plataforma web diseñada exclusivamente para universitarios. Totalmente gratuita, instantánea, confidencial y sin necesidad de descargas.
                </p>
                <div className="pt-2">
                  <Button variant="primary" onClick={openModal}>
                    EVALUAR CÓMO ME SIENTO HOY <span className="text-base font-normal -mt-0.5">→</span>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PLATFORM_FEATURES.map((feature) => (
                  <FeatureCard key={feature.id} {...feature} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VISTA: ACTIVIDADES */}
        {currentView === 'actividades' && unlockedFeatures && (
          <div className="space-y-8 py-4 animate-in fade-in duration-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
              Actividades sugeridas para ti
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-neutral-300 p-6 flex flex-col justify-between min-h-[300px] rounded-sm relative group hover:border-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="space-y-4">
                  <h3 className="font-black text-sm uppercase tracking-wider text-black">RESPIRACION 4-7-8</h3>
                  <p className="text-neutral-500 text-xs font-medium leading-relaxed">Técnica de control de respiración que calma el sistema nervioso en menos de dos minutos.</p>
                </div>
                <button className="w-full mt-8 bg-black text-white text-xs font-bold uppercase py-3 rounded-full flex items-center justify-center gap-2 hover:bg-neutral-900 transition-colors">
                  <span>➤</span> Iniciar Guía
                </button>
              </div>

              <div className="bg-white border-2 border-neutral-300 p-6 flex flex-col justify-between min-h-[300px] rounded-sm relative group hover:border-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="space-y-4">
                  <h3 className="font-black text-sm uppercase tracking-wider text-black">PAUSA CORPORAL</h3>
                  <p className="text-neutral-500 text-xs font-medium leading-relaxed">Estiramientos rápidos de cuello, hombros y espalda baja para liberar la tensión muscular.</p>
                </div>
                <button className="w-full mt-8 bg-black text-white text-xs font-bold uppercase py-3 rounded-full flex items-center justify-center gap-2 hover:bg-neutral-900 transition-colors">
                  <span>➤</span> Ver Estiramientos
                </button>
              </div>

              <div className="bg-white border-2 border-neutral-300 p-6 flex flex-col justify-between min-h-[300px] rounded-sm relative group hover:border-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="space-y-4">
                  <h3 className="font-black text-sm uppercase tracking-wider text-black">DIARIO DE LOGROS</h3>
                  <p className="text-neutral-500 text-xs font-medium leading-relaxed">Escribe tres pequeñas cosas que hayas completado o agradecido hoy para redirigir la mente.</p>
                </div>
                <button className="w-full mt-8 bg-black text-white text-xs font-bold uppercase py-3 rounded-full flex items-center justify-center gap-2 hover:bg-neutral-900 transition-colors">
                  <span>➤</span> Escribir Ahora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VISTA: REGISTRO */}
        {currentView === 'registro' && unlockedFeatures && (
          <div className="space-y-8 py-4 animate-in fade-in duration-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
              Mi registro personal
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              <div className="lg:col-span-6 bg-white border-2 border-neutral-300 p-6 md:p-8 rounded-sm relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)]">
                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-extrabold text-neutral-900">¿Como valoras tu día?</h3>
                  <p className="text-neutral-400 text-xs font-medium">Añade tu estado de hoy para ver tu evolución en tiempo real.</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {MOOD_OPTIONS.map((mood) => {
                    const isSelected = todayMood === mood.value;
                    return (
                      <button
                        key={mood.value}
                        onClick={() => setTodayMood(mood.value)}
                        className={`flex flex-col items-center justify-center p-4 border-2 border-black rounded-2xl transition-all duration-150 ${
                          isSelected ? 'bg-black text-white scale-[0.98]' : 'bg-white text-neutral-800 hover:bg-neutral-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                        }`}
                      >
                        <span className="text-3xl mb-2 select-none">{mood.emoji}</span>
                        <span className="text-[11px] font-bold uppercase tracking-wide">{mood.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-6 bg-white border-2 border-neutral-300 p-6 md:p-8 rounded-[2rem] space-y-6">
                <div className="flex items-center gap-2 font-extrabold text-neutral-900 text-base">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Historial semanal estimado
                </div>
                <div className="w-full overflow-x-auto pt-2">
                  <svg viewBox="0 0 500 220" className="w-full min-w-[400px] h-auto overflow-visible">
                    {[40, 75, 110, 145, 180].map((y, index) => (
                      <line key={index} x1="45" y1={y} x2="475" y2={y} stroke="#e5e5e5" strokeWidth="1" />
                    ))}
                    <text x="15" y="44" className="text-[11px] font-bold fill-neutral-400">Exc</text>
                    <text x="15" y="79" className="text-[11px] font-bold fill-neutral-400">Bin</text>
                    <text x="15" y="114" className="text-[11px] font-bold fill-neutral-400">Reg</text>
                    <text x="15" y="149" className="text-[11px] font-bold fill-neutral-400">Mal</text>
                    <text x="15" y="184" className="text-[11px] font-bold fill-neutral-400">Cri</text>

                    <polyline
                      fill="none"
                      stroke="#707070"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={`55,110 125,75 195,145 265,75 335,110 405,75 465,${todayMood === 'Exc' ? 40 : todayMood === 'Bin' ? 75 : todayMood === 'Mal' ? 145 : todayMood === 'Cri' ? 180 : 110}`}
                    />
                    <circle cx="55" cy="110" r="4" fill="#505050" />
                    <circle cx="125" cy="75" r="4" fill="#505050" />
                    <circle cx="195" cy="145" r="4" fill="#505050" />
                    <circle cx="265" cy="75" r="4" fill="#505050" />
                    <circle cx="335" cy="110" r="4" fill="#505050" />
                    <circle cx="405" cy="75" r="4" fill="#505050" />
                    <circle cx="465" cy={todayMood === 'Exc' ? 40 : todayMood === 'Bin' ? 75 : todayMood === 'Mal' ? 145 : todayMood === 'Cri' ? 180 : 110} r="5" fill="#000000" />

                    <text x="55" y="205" textAnchor="middle" className="text-[10px] font-bold fill-neutral-400 uppercase">Lunes</text>
                    <text x="125" y="205" textAnchor="middle" className="text-[10px] font-bold fill-neutral-400 uppercase">Martes</text>
                    <text x="195" y="205" textAnchor="middle" className="text-[10px] font-bold fill-neutral-400 uppercase">Miercoles</text>
                    <text x="265" y="205" textAnchor="middle" className="text-[10px] font-bold fill-neutral-400 uppercase">Jueves</text>
                    <text x="335" y="205" textAnchor="middle" className="text-[10px] font-bold fill-neutral-400 uppercase">Viernes</text>
                    <text x="405" y="205" textAnchor="middle" className="text-[10px] font-bold fill-neutral-400 uppercase">Sabado</text>
                    <text x="465" y="205" textAnchor="middle" className="text-[10px] font-black fill-black uppercase">Hoy</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISTA: AYUDA (Fiel a la estructura e interactividad de image_8072b1.jpg) */}
        {currentView === 'ayuda' && (
          <div className="space-y-8 py-4 animate-in fade-in duration-200">
            {/* Título Principal */}
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
              Soporte y preguntas frecuentes
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
              
              {/* Bloque Izquierdo: Acordeón de FAQs Neo-brutalistas */}
              <div className="lg:col-span-6 border-2 border-neutral-300 bg-white p-6 md:p-8 rounded-sm relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.01)] min-h-[340px]">
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black"></div>
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black"></div>
                
                <div className="flex flex-col gap-4">
                  {FAQ_ITEMS.map((item) => {
                    const isOpen = openFaq === item.id;
                    return (
                      <div key={item.id} className="w-full transition-all duration-200">
                        <button
                          onClick={() => toggleFaq(item.id)}
                          className="w-full bg-black text-white px-6 py-4 rounded-full flex items-center justify-between text-left font-bold transition-transform active:scale-[0.99]"
                        >
                          <span className="text-xs md:text-sm uppercase tracking-wide">{item.question}</span>
                          <svg
                            className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Contenido colapsable */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="px-6 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs font-medium text-neutral-600 leading-relaxed shadow-sm">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bloque Derecho: Formulario Premium de Sugerencia */}
              <div className="lg:col-span-6 bg-[#e9e9e9]/70 border-2 border-neutral-300 p-6 md:p-8 rounded-[2rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.02)]">
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="flex items-center gap-2.5 text-neutral-900 font-extrabold text-sm uppercase tracking-wide mb-2">
                    <svg className="w-4 h-4 text-black transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Envianos un mensaje de sugerencia
                  </div>

                  {/* Fila de Inputs: Nombre y Carrera */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                      className="w-full bg-[#f4f4f4] border border-neutral-400 rounded-full px-5 py-2.5 text-xs font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Tu carrera"
                      required
                      value={feedbackForm.career}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, career: e.target.value })}
                      className="w-full bg-[#f4f4f4] border border-neutral-400 rounded-full px-5 py-2.5 text-xs font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Cuadro de Mensaje */}
                  <div>
                    <textarea
                      rows="4"
                      placeholder="¿Como crees que podemos mejorar MindCampus?"
                      required
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                      className="w-full bg-[#f4f4f4] border border-neutral-400 rounded-3xl px-5 py-4 text-xs font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-black resize-none transition-colors"
                    ></textarea>
                  </div>

                  {/* Botón de Envío */}
                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-neutral-900 text-white text-xs font-bold uppercase py-3.5 rounded-full tracking-wider transition-colors shadow-sm active:scale-[0.995]"
                  >
                    Enviar Comentarios
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto flex items-center justify-between text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
        <div>@MINDCAMPUS</div>
        <div>PAGE 1</div>
      </footer>

      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalStep === 'welcome' && (
          <div className="space-y-4 max-w-md mx-auto py-4">
            <h2 className="text-xl font-extrabold text-neutral-900 uppercase tracking-tight">¿Cómo te sientes hoy?</h2>
            <p className="text-xs text-neutral-500 leading-relaxed font-medium">Selecciona una opción para iniciar tu autoevaluación guiada.</p>
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="primary" onClick={() => setModalStep('wheel')}>Iniciar Rueda Interactiva</Button>
              <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
            </div>
          </div>
        )}

        {modalStep === 'wheel' && (
          <div className="relative border-2 border-neutral-200 p-6 md:p-10 flex items-center justify-center bg-white rounded-xl">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-black"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-black"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
              <div className="lg:col-span-6 flex justify-center items-center relative py-4">
                <EmotionWheel onSelectEmotion={handleSelectEmotion} selectedEmotion={selectedEmotion} />
              </div>
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">¿Cómo me <br className="hidden lg:block" /> siento hoy?</h2>
                  <p className="text-neutral-500 text-xs md:text-sm font-medium leading-relaxed max-w-md mx-auto lg:mx-0">Haz click en la rueda emocional para descubrir cómo procesar ese sentimiento.</p>
                </div>
                {selectedEmotion && (
                  <div className="p-4 border-2 border-black bg-neutral-50 rounded-2xl animate-in slide-in-from-bottom-2 duration-200">
                    <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Has seleccionado</p>
                    <p className="text-lg font-black text-black uppercase tracking-tight">{selectedEmotion}</p>
                    <div className="mt-3 flex gap-2 justify-center lg:justify-start">
                      <Button variant="primary" className="py-2 px-4 text-[10px]" onClick={handleConfirmEmotion}>
                        Confirmar y Continuar
                      </Button>
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <button onClick={() => setModalStep('welcome')} className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-colors">← Volver atrás</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalStep === 'reflection' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">Conversemos un momento</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
              <div className="md:col-span-6 space-y-4">
                <p className="text-[11px] font-black tracking-widest text-neutral-400 uppercase">Temas de reflexión</p>
                <div className="relative border border-neutral-300 p-4 rounded-sm bg-neutral-50/40">
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-black"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black"></div>
                  <div className="flex flex-col gap-3">
                    {Object.keys(REFLECTION_THEMES).map((key) => {
                      const theme = REFLECTION_THEMES[key];
                      const isCurrent = selectedTheme === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedTheme(key)}
                          className={`w-full flex items-center gap-4 px-5 py-4 rounded-full border-2 border-black text-left font-bold transition-all duration-150 ${
                            isCurrent ? 'bg-black text-white shadow-none translate-x-0.5 translate-y-0.5' : 'bg-white text-black hover:bg-neutral-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                          }`}
                        >
                          <div className={`p-2 rounded-full border ${isCurrent ? 'bg-neutral-900 border-neutral-700' : 'bg-black border-black'}`}>{theme.icon}</div>
                          <span className="text-xs md:text-sm uppercase tracking-wide">{theme.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="pt-2">
                  <button onClick={() => setModalStep('wheel')} className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-colors">← Cambiar Emoción</button>
                </div>
              </div>

              <div className="md:col-span-6">
                <div className="w-full min-h-[260px] bg-neutral-200/70 border-2 border-black rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                  <div className="bg-white border border-neutral-400 rounded-2xl p-4 text-xs md:text-sm font-medium text-neutral-700 leading-relaxed relative shadow-sm">
                    {REFLECTION_THEMES[selectedTheme].message}
                    <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b border-r border-neutral-400 transform rotate-45"></div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <Button variant="primary" className="text-xs py-2 px-6" onClick={handleFinishReflection}>
                      Terminar Reflexión
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}