import React from 'react';

export default function EmotionWheel({ onSelectEmotion, selectedEmotion }) {
  // Datos estables de las 8 emociones base, sus colores y textos
  const emotions = [
    { name: 'Miedo', bg: '#ffedd5', border: '#fdba74', text: '#9a3412', angle: 0 },
    { name: 'Enojo', bg: '#fee2e2', border: '#fca5a5', text: '#991b1b', angle: 45 },
    { name: 'Tristeza', bg: '#dbeafe', border: '#93c5fd', text: '#1e40af', angle: 90 },
    { name: 'Felicidad', bg: '#f3e8ff', border: '#d8b4fe', text: '#6b21a8', angle: 135 },
    { name: 'Sorpresa', bg: '#fef9c3', border: '#fde047', text: '#854d0e', angle: 180 },
    { name: 'Repugnancia', bg: '#dcfce7', border: '#86efac', text: '#166534', angle: 225 },
    { name: 'Amor', bg: '#fce7f3', border: '#f9a8d4', text: '#9d174d', angle: 270 },
    { name: 'Confianza', bg: '#ccfbf1', border: '#5eead4', text: '#115e59', angle: 315 },
  ];

  // Configuración geométrica para gajos exactos de 45 grados en un SVG de 400x400
  // Centro: (200, 200), Radio: 180.
  // Formula de los paths: M 200 200 L X1 Y1 A 180 180 0 0 1 X2 Y2 Z
  const getCoordinatesForPercent = (percent) => {
    const x = 200 + 180 * Math.cos(2 * Math.PI * percent);
    const y = 200 + 180 * Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="relative w-full max-w-[340px] md:max-w-[380px] aspect-square flex items-center justify-center select-none drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      
      {/* Contenedor circular externo con borde negro marcado estilo Neo-brutalista */}
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full rounded-full border-4 border-black bg-white overflow-hidden"
      >
        <g>
          {emotions.map((emotion, index) => {
            // Cada gajo cubre exactamente el 12.5% del círculo (45 grados)
            const startPercent = index / 8;
            const endPercent = (index + 1) / 8;
            
            const [startX, startY] = getCoordinatesForPercent(startPercent);
            const [endX, endY] = getCoordinatesForPercent(endPercent);
            
            // Ángulo medio del gajo para posicionar y rotar el texto correctamente
            const textAngle = emotion.angle + 22.5;
            const textRad = (textAngle * Math.PI) / 180;
            // Desplazamiento del texto del centro hacia afuera (Radio intermedio ~115)
            const textX = 200 + 115 * Math.cos(textRad);
            const textY = 200 + 115 * Math.sin(textRad);

            const isSelected = selectedEmotion === emotion.name;

            return (
              <g 
                key={emotion.name} 
                className="cursor-pointer group"
                onClick={() => onSelectEmotion(emotion.name)}
              >
                {/* Gajo / Sector Circular */}
                <path
                  d={`M 200 200 L ${startX} ${startY} A 180 180 0 0 1 ${endX} ${endY} Z`}
                  fill={isSelected ? emotion.border : emotion.bg}
                  stroke="black"
                  strokeWidth="2.5"
                  className="transition-all duration-200 group-hover:brightness-95"
                />
                
                {/* Texto Rotado alineado dinámicamente con el centro */}
                <text
                  x={textX}
                  y={textY}
                  transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={emotion.text}
                  className={`text-[11px] md:text-[12px] font-black uppercase tracking-wider transition-transform duration-200 ${
                    isSelected ? 'scale-105 font-black' : 'group-hover:scale-102'
                  }`}
                >
                  {emotion.name}
                </text>
              </g>
            );
          })}
        </g>

        {/* Eje/Círculo Central Negro Perfecto ("MIND") */}
        <circle 
          cx="200" 
          cy="200" 
          r="42" 
          fill="black" 
          stroke="black"
          strokeWidth="2"
        />
        <text
          x="200"
          y="202"
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          className="text-[11px] font-black uppercase tracking-widest pointer-events-none"
        >
          MIND
        </text>
      </svg>
    </div>
  );
}