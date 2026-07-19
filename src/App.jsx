import React, { useState, useEffect } from 'react';
import { PLATFORM_FEATURES } from './constants/features';
import FeatureCard from './components/FeatureCard';
import Button from './components/Button';
import Modal from './components/Modal';
import EmotionWheel from './components/EmotionWheel';

const REFLECTION_THEMES_BY_EMOTION = {
  agobio: {
    title: 'Agobio',
    color: '#B1D4E5',
    description: 'Es la sensación de estar desbordado cuando la cantidad de exigencias académicas (tareas, plazos, responsabilidades) supera lo que sientes que puedes manejar en el momento, generando una sensación de "no darte a abasto".',
    themes: {
      entregas_cruzadas: {
        title: 'Entregas cruzadas',
        message: 'Hola! Veo que has seleccionado que en estos momentos sientes agobio por tener varias entregas al mismo tiempo. Que todo se junte no significa que no puedas con ello, solo necesitas ordenar por dónde empezar y avanzar de a un paso. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
        activities: [
          {
            title: 'Matriz de prioridades 4x4',
            time: '5 min',
            tool: 'Hoja / Plantilla de la app',
            objective: 'Organización y reducción del caos',
            steps: [
              'Abre una hoja o usa la plantilla dentro de la app y dibuja un cuadro dividido en 4 secciones: muy importante, importante, poco importante, nada importante.',
              'Escribe cada pendiente en un post-it o línea dentro del cuadrante que le corresponda.',
              'Empieza por el cuadrante muy importante: elige solo una tarea de ahí para comenzar de inmediato.',
              'Revisa el cuadrante nada importante: si algo puede eliminarse o posponerse sin consecuencia, táchalo.'
            ]
          },
          {
            title: 'Regla de los 2 minutos',
            time: '2 min',
            tool: 'Temporizador',
            objective: 'Liberar carga mental inmediata',
            steps: [
              'Mira tu lista de pendientes y busca tareas que sepas que toman menos de 2 minutos (responder un correo corto, subir un archivo, enviar un mensaje).',
              'Pon un temporizador de 2 minutos.',
              'Hazla de inmediato, sin pasarla a la lista de "pendientes importantes".',
              'Repite con la siguiente tarea corta que encuentres, hasta un máximo de 3 tareas seguidas para no perder el foco en lo grande.'
            ]
          },
          {
            title: 'Respiración 4-7-8',
            time: '3 min',
            tool: 'Ninguna',
            objective: 'Bajar la activación fisiológica',
            steps: [
              'Siéntate con la espalda recta y los pies apoyados en el piso.',
              'Inhala por la nariz contando mentalmente hasta 4.',
              'Sostén el aire contando hasta 7.',
              'Exhala lentamente por la boca contando hasta 8.',
              'Repite el ciclo 4 veces antes de comenzar a organizar tus entregas.'
            ]
          }
        ]
      },
      estudios_responsabilidades: {
        title: 'Estudios y otras responsabilidades',
        message: 'Hola! Veo que has seleccionado que sientes agobio por combinar tus estudios con otras responsabilidades. No es que te falte capacidad, es que tu tiempo también tiene límites, y está bien reconocerlo para organizarte mejor. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        activities: [
          {
            title: 'Time blocking simple',
            time: '10 min',
            tool: 'Calendario (papel o digital)',
            objective: 'Planificación visual equilibrada',
            steps: [
              'Toma tu calendario del día (papel o digital).',
              'Anota tus responsabilidades fijas primero (clases, trabajo, comidas).',
              'Asigna bloques de 45-60 minutos a cada actividad pendiente, dejando al menos un bloque de descanso entre tareas distintas.',
              'Escribe solo UNA tarea por bloque; si algo no cabe hoy, muévelo directamente a mañana en vez de amontonarlo.'
            ]
          },
          {
            title: 'Pomodoro adaptado 25/5',
            time: '30 min',
            tool: 'Temporizador',
            objective: 'Evitar la sensación de desborde',
            steps: [
              'Elige una sola tarea para este ciclo.',
              'Pon un temporizador de 25 minutos y trabaja solo en esa tarea, sin revisar el celular.',
              'Cuando suene la alarma, detente aunque no hayas terminado.',
              'Descansa 5 minutos completos: levántate, estira o toma agua (evita el celular en este descanso).',
              'Repite el ciclo si necesitas continuar.'
            ]
          },
          {
            title: 'Journaling de descarga',
            time: '5-7 min',
            tool: 'Hoja o libreta de notas',
            objective: 'Ganar perspectiva mental',
            steps: [
              'Consigue una hoja o abre una nota en blanco.',
              'Escribe todo lo que ronda tu cabeza sin filtrar ni ordenar: pendientes, preocupaciones, ideas sueltas.',
              'No te detengas a corregir ni organizar, solo saca todo durante el tiempo que dure el ejercicio.',
              'Al terminar, subraya 1 o 2 cosas que realmente requieran acción hoy; el resto puede quedar solo como descarga mental.'
            ]
          }
        ]
      },
      retomar_imprevisto: {
        title: 'Retomar tras un imprevisto',
        message: 'Hola! Veo que has seleccionado que sientes agobio por retomar tus actividades después de un imprevisto. No necesitas recuperar todo de golpe, solo enfocarte en el siguiente paso, sin exigirte volver al ritmo anterior de inmediato. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg
            className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        ),
        activities: [
          {
            title: 'Próximo paso mínimo',
            time: '2 min',
            tool: 'Ninguna',
            objective: 'Retomar el ritmo sin abrumarse',
            steps: [
              "Detente un momento y pregúntate: '¿cuál es la acción más pequeña que puedo hacer ahora mismo?'",
              'Escríbela en una sola línea, evitando pensar en todo lo que falta.',
              'Hazla de inmediato, sin planificar el resto del día todavía.',
              'Una vez hecha, decide si sigues con otro paso pequeño o haces una pausa.'
            ]
          },
          {
            title: 'Recalendarización del día',
            time: '8 min',
            tool: 'Calendario (Vista diaria)',
            objective: 'Evitar sobrecarga de planificación',
            steps: [
              'Abre solo la vista de HOY en tu calendario (no la semana completa).',
              'Marca qué actividades planificadas ya no son posibles por el imprevisto.',
              'Reordena únicamente las tareas de hoy, moviendo lo que no alcance a mañana.',
              'Deja como máximo 3 prioridades para el resto del día.'
            ]
          },
          {
            title: 'Frase de autocompasión',
            time: '1 min',
            tool: 'Ninguna',
            objective: 'Reducir la tensión y reencuadrar',
            steps: [
              'Haz una pausa y respira profundo una vez.',
              "Repite en voz alta o mentalmente: 'los imprevistos son parte del proceso, puedo ajustarme'.",
              'Nota si tu cuerpo baja un poco la tensión al decirlo.',
              'Continúa con tu próximo paso mínimo.'
            ]
          }
        ]
      }
    }
  },
  ansiedad: {
    title: 'Ansiedad',
    color: '#FCB995',
    description: 'Es la preocupación que sientes por no saber si podrás cumplir con tus propias expectativas. Aparece sobre todo antes de exámenes y está ligada a la duda sobre su propia capacidad.',
    themes: {
      semana_examenes: {
        title: 'Semana de exámenes',
        message: 'Hola! Veo que has seleccionado que sientes ansiedad por la semana de exámenes. Tu mente puede estar anticipando más de lo que realmente vas a enfrentar, y eso también se puede regular. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        activities: [
          {
            title: 'Respiración diafragmática 4-4-6',
            time: '4 min',
            tool: 'Ninguna',
            objective: 'Enfocar el aire en el abdomen para reducir síntomas físicos de ansiedad.',
            steps: [
              'Siéntate o recuéstate y coloca una mano sobre el abdomen.',
              'Inhala por la nariz en 4 segundos, sintiendo cómo se expande el abdomen (no el pecho).',
              'Sostén el aire 4 segundos.',
              'Exhala lentamente por la boca en 6 segundos, sintiendo cómo baja el abdomen.',
              'Repite el ciclo entre 6 y 8 veces.'
            ]
          },
          {
            title: 'Grounding 5-4-3-2-1',
            time: '5 min',
            tool: 'Ninguna',
            objective: 'Identificar estímulos del entorno para anclarse al presente.',
            steps: [
              'Observa a tu alrededor y nombra (en voz alta o mental) 5 cosas que puedes ver.',
              'Nombra 4 cosas que puedes escuchar en este momento.',
              'Nombra 3 cosas que puedes tocar y siente su textura.',
              'Nombra 2 cosas que puedes oler.',
              'Nombra 1 cosa que puedas saborear o el sabor que tienes en la boca ahora.'
            ]
          },
          {
            title: 'Visualización breve de logro',
            time: '3 min',
            tool: 'Ninguna',
            objective: 'Imaginar con detalle un logro pasado para recordar tu capacidad.',
            steps: [
              'Cierra los ojos y respira normal por unos segundos.',
              'Recuerda un examen o evaluación anterior en la que te fue bien.',
              'Revive el momento con detalle: dónde estabas, cómo te sentías, qué hiciste bien.',
              "Antes de abrir los ojos, dite a ti mismo: 'ya lo he logrado antes, tengo esa capacidad'."
            ]
          }
        ]
      },
      sustentacion_proyecto: {
        title: 'Sustentación de proyecto final',
        message: 'Hola! Veo que has seleccionado que sientes ansiedad por tu sustentación de algún proyecto final. La incertidumbre suele ser más grande que la situación en sí misma, sobre todo cuando ya te has preparado para ella. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        ),
        activities: [
          {
            title: 'Ensayo en voz alta cronometrado',
            time: '10 min',
            tool: 'Temporizador',
            objective: 'Practicar la sustentación en voz alta para ganar fluidez y reducir la incertidumbre.',
            steps: [
              'Ponte de pie como si estuvieras frente al jurado.',
              'Activa un cronómetro con el tiempo que tendrás real para tu sustentación.',
              'Practica en voz alta, sin leer, apoyándose solo en tus diapositivas o notas clave.',
              'Al terminar, anota qué parte se sintió más insegura para repasarla una vez más.'
            ]
          },
          {
            title: 'Postura de confianza (power posing)',
            time: '2 min',
            tool: 'Ninguna',
            objective: 'Adoptar una postura corporal abierta y erguida antes de sustentar para regular la activación fisiológica.',
            steps: [
              'Ponte de pie con los pies separados al ancho de los hombros.',
              'Coloca las manos en la cintura o levanta los brazos en V, con el pecho abierto.',
              'Mantén la postura durante 2 minutos, respirando con calma.',
              'Justo antes de entrar a sustentar, recuerda esa sensación de apertura corporal.'
            ]
          },
          {
            title: 'Reestructuración de pensamientos',
            time: '5 min',
            tool: 'Ninguna',
            objective: 'Identificar un pensamiento catastrófico y reemplazarlo por uno más realista.',
            steps: [
              "Identifica el pensamiento catastrófico que ronda tu mente (ej. 'voy a fallar').",
              'Escríbelo tal cual aparece, sin suavizarlo.',
              "Pregúntate: '¿qué evidencia real tengo de esto?' y '¿qué le diría a un compañero que piensa igual?'",
              "Escribe una versión más realista y equilibrada (ej. 'me preparé, puedo hacerlo bien aunque no salga perfecto').",
              'Repite la nueva frase 2 o 3 veces antes de continuar.'
            ]
          }
        ]
      },
      evaluaciones_sorpresa: {
        title: 'Evaluaciones sorpresa',
        message: 'Hola! Veo que has seleccionado que sientes ansiedad por una evaluación inesperada. No saber cuándo llegará el examen no significa que no estés preparado, tu estudio constante también cuenta. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        ),
        activities: [
          {
            title: 'Escaneo corporal rápido',
            time: '3 min',
            tool: 'Ninguna',
            objective: 'Recorrer mentalmente el cuerpo de pies a cabeza notando tensión y soltándola conscientemente.',
            steps: [
              'Cierra los ojos si es posible o baja la mirada.',
              'Empieza por los pies y sube mentalmente por todo el cuerpo, notando dónde hay tensión.',
              'Al llegar a cada zona tensa (mandíbula, hombros, manos), suéltala conscientemente.',
              'Termina en la cabeza, con una respiración profunda final.'
            ]
          },
          {
            title: 'Autoinstrucción positiva',
            time: '1 min',
            tool: 'Ninguna',
            objective: 'Repetir una frase corta y concreta para reducir el bloqueo inicial.',
            steps: [
              'Antes de empezar la evaluación, respira una vez profundo.',
              "Repite mentalmente una frase corta y concreta: 'puedo resolver esto paso a paso'.",
              'Léela una vez más al abrir la evaluación, antes de mirar la primera pregunta.',
              'Empieza por la pregunta que te resulte más fácil, no necesariamente la primera.'
            ]
          },
          {
            title: 'Semáforo emocional',
            time: '2 min',
            tool: 'Ninguna',
            objective: 'Identificar en qué color emocional estás y aplicar una pausa antes de comenzar la evaluación.',
            steps: [
              'Pregúntate en qué color emocional estás: rojo (muy alterado), amarillo (tenso) o verde (tranquilo).',
              'Si estás en rojo, haz una pausa de 30 segundos de respiración antes de continuar.',
              'Si estás en amarillo, baja el ritmo: respira 3 veces lento antes de seguir.',
              'Si estás en verde, simplemente continúa con la evaluación.'
            ]
          }
        ]
      }
    }
  },
  frustracion: {
    title: 'Frustración',
    color: '#C0F0BD',
    description: 'Es lo que sientes cuando algo te impide avanzar (mucha carga de tareas, poco tiempo) y percibes que ya no tienes control sobre la situación.',
    themes: {
      sobrecarga_tareas: {
        title: 'Sobrecarga de tareas',
        message: 'Hola! Veo que has seleccionado que sientes frustración por la carga de trabajos. Cuando todo se acumula, es normal sentir que pierdes el control del tiempo, pero eso puede reorganizarse paso a paso. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        ),
        activities: [
          {
            title: 'Lista de lo esencial hoy',
            time: '5 min',
            tool: 'Cuaderno u hojas',
            objective: 'Seleccionar solo 3 tareas prioritarias del día para reducir la sensación de estar sobrepasado.',
            steps: [
              'Escribe todos tus pendientes del día sin filtrar.',
              'Marca solo 3 como prioritarias, las que realmente no pueden esperar.',
              'Tacha o pasa a mañana todo lo demás sin culpa.',
              'Enfócate únicamente en esas 3 durante el resto del día.'
            ]
          },
          {
            title: 'Pausa activa con estiramiento',
            time: '3 min',
            tool: 'Ninguna',
            objective: 'Realizar una breve rutina de estiramientos para liberar tensión física acumulada.',
            steps: [
              'Ponte de pie y estira los brazos hacia arriba, sosteniendo 10 segundos.',
              'Rota suavemente el cuello hacia ambos lados.',
              'Estira la espalda inclinándote levemente hacia adelante.',
              'Sacude las manos y hombros un momento antes de volver a sentarte.'
            ]
          },
          {
            title: 'Guion para negociar plazos',
            time: '5 min',
            tool: 'Dispositivo digital o papel',
            objective: 'Redactar un mensaje breve y asertivo para solicitar una extensión o reorganizar una entrega.',
            steps: [
              'Identifica a quién necesitas escribirle (docente, compañero, coordinador).',
              'Redacta el mensaje siguiendo esta estructura: situación breve + lo que necesitas + fecha propuesta.',
              "Ejemplo: 'Debido a la sobrecarga de esta semana, ¿sería posible entregar el avance el [fecha] en vez del [fecha original]?'",
              'Revisa el tono (claro y respetuoso, sin exceso de justificación) y envíalo.'
            ]
          }
        ]
      },
      coordinacion_grupal: {
        title: 'Problemas de coordinación grupal',
        message: 'Hola! Veo que has seleccionado que sientes frustración por tu trabajo en equipo. Depender del ritmo de otros puede generar una sensación de impotencia, aunque no refleja lo que tú sí puedes aportar. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        activities: [
          {
            title: 'Mapa de roles y responsabilidades',
            time: '10 min',
            tool: 'Tabla / Documento compartido',
            objective: 'Elaborar un cuadro simple que asigne tareas claras a cada integrante del grupo.',
            steps: [
              'Haz una tabla con los nombres de todos los integrantes del grupo.',
              'Frente a cada nombre, anota la tarea específica que le corresponde.',
              'Agrega una fecha límite individual para cada tarea.',
              'Comparte la tabla con el grupo para que todos tengan claridad.'
            ]
          },
          {
            title: 'Técnica DEEC',
            time: '5 min',
            tool: 'Ninguna',
            objective: 'Comunicar el desacuerdo describiendo el hecho, expresando el sentir, especificando la necesidad y la consecuencia positiva.',
            steps: [
              "Describe el hecho concreto que te molestó, sin juicios (ej. 'no enviaste tu parte del trabajo').",
              "Expresa cómo te hizo sentir (ej. 'me generó estrés porque no pude avanzar').",
              "Especifica lo que necesitas (ej. 'necesito que lo envíes antes del domingo').",
              "Menciona la consecuencia positiva de hacerlo (ej. 'así podemos entregar con tiempo y sin apuro')."
            ]
          },
          {
            title: 'Regla de las 24 horas',
            time: 'Variable',
            tool: 'Ninguna',
            objective: 'Esperar antes de responder un mensaje grupal que generó molestia, para evitar una reacción impulsiva.',
            steps: [
              'Cuando un mensaje grupal te genere molestia, no respondas de inmediato.',
              'Cierra el chat y continúa con otra actividad.',
              'Vuelve a leer el mensaje al día siguiente (o después de varias horas).',
              'Responde solo cuando puedas hacerlo con calma.'
            ]
          }
        ]
      },
      bajo_rendimiento: {
        title: 'Bajo rendimiento pese al esfuerzo',
        message: 'Hola! Veo que has seleccionado que sientes frustración por tus resultados. El esfuerzo no siempre se refleja de inmediato en la nota, y eso no invalida el trabajo que ya hiciste. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        ),
        activities: [
          {
            title: 'Diario de logros pequeños',
            time: '3 min',
            tool: 'Nota digital o cuaderno',
            objective: 'Registrar diariamente un logro, por mínimo que sea, para contrarrestar el foco en lo negativo.',
            steps: [
              'Al final del día, abre una nota o cuaderno dedicado a esto.',
              "Escribe un logro del día, por pequeño que parezca (ej. 'entendí un tema que antes no lograba').",
              'Evita comparar ese logro con el de otras personas.',
              'Repite este ejercicio a diario para construir un registro que puedas revisar en días difíciles.'
            ]
          },
          {
            title: 'Revisión del método de estudio',
            time: '10 min',
            tool: 'Hojas de apuntes',
            objective: 'Analizar si el esfuerzo está bien dirigido (técnica de estudio) y no solo evaluar la cantidad de horas invertidas.',
            steps: [
              'Anota cómo estudiaste el último tema que no te salió como esperabas.',
              'Identifica si el método fue activo (resúmenes, práctica, autoevaluación) o solo pasivo (releer, subrayar).',
              'Elige una técnica activa nueva para probar la próxima vez (ej. explicar el tema en voz alta, hacer preguntas de práctica).',
              'Anota el resultado la próxima vez que la uses, para comparar.'
            ]
          },
          {
            title: 'Diálogo interno compasivo',
            time: '3 min',
            tool: 'Ninguna',
            objective: "Reformular la autocrítica ('soy malo para esto') en un comentario más justo ('estoy aprendiendo, esto toma tiempo').",
            steps: [
              "Identifica el pensamiento autocrítico que aparece (ej. 'soy malo para esto').",
              "Pregúntate: '¿le diría esto a un amigo en la misma situación?'",
              "Reformúlalo de forma más justa (ej. 'estoy aprendiendo, esto toma tiempo').",
              'Repite la frase reformulada en voz alta o mental un par de veces.'
            ]
          }
        ]
      }
    }
  },
  miedo_fracaso: {
    title: 'Miedo al fracaso',
    color: '#DA9FEE',
    description: 'Es la preocupación constante que sientes por fallar, ya sea decepcionando a otras personas o a ti mismo. Brindas demasiada importancia al resultado final.',
    themes: {
      curso_dificil: {
        title: 'Curso difícil',
        message: 'Hola! Veo que has seleccionado que sientes miedo al fracaso por un curso difícil. La fama de un curso no define lo que tú eres capaz de lograr en él, cada avance cuenta a tu favor. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        activities: [
          {
            title: 'Microobjetivos semanales',
            time: '8 min',
            tool: 'Lápiz y papel / Agenda',
            objective: 'Enfoque en metas alcanzables',
            steps: [
              'Escribe el objetivo general del curso o del tema difícil.',
              'Divídelo en 3 o 4 metas pequeñas que puedas lograr esta semana.',
              'Asigna un día tentativo para cada una.',
              'Al final de la semana, marca cuáles lograste, sin enfocarte en lo que falta.'
            ]
          },
          {
            title: 'Registro de pensamientos automáticos',
            time: '5 min',
            tool: 'Cuaderno de notas',
            objective: 'Reestructuración cognitiva',
            steps: [
              "Anota la situación que activó el pensamiento negativo (ej. 'no entendí la clase de hoy').",
              "Escribe el pensamiento automático tal cual apareció (ej. 'nunca voy a poder con este curso').",
              'Evalúa qué tan cierto es en una escala del 0 al 100.',
              "Escribe una respuesta alternativa más equilibrada (ej. 'hoy no entendí, pero puedo repasar y preguntar')."
            ]
          },
          {
            title: 'Grupo de apoyo entre pares',
            time: '30 min',
            tool: 'Presencial o Virtual',
            objective: 'Estudio colaborativo y contención',
            steps: [
              'Identifica a 1 o 2 compañeros del curso difícil.',
              'Propón una sesión breve de estudio conjunto, presencial o virtual.',
              'Durante la sesión, cada uno comparte una duda y entre todos intentan resolverla.',
              'Cierren con un acuerdo de próxima fecha, para que se vuelva un hábito.'
            ]
          }
        ]
      },
      presion_beca: {
        title: 'Presión familiar o por beca',
        message: 'Hola! Veo que has seleccionado que sientes miedo al fracaso por la presión de cumplir expectativas. Cargar con las expectativas de otros puede pesar más que el reto académico en sí, y mereces espacio para tus propios tiempos. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        activities: [
          {
            title: 'Carta de expectativas realistas',
            time: '10 min',
            tool: 'Papel y bolígrafo',
            objective: 'Diferenciar control interno vs externo',
            steps: [
              'Escribe una carta breve dirigida a ti mismo.',
              'Menciona qué esperas realmente de ti este semestre, siendo honesto y realista.',
              'Diferencia lo que depende de tu esfuerzo de lo que no está en tus manos.',
              'Guarda la carta y vuelve a leerla cuando sientas mucha presión.'
            ]
          },
          {
            title: 'Ejercicio de columnas',
            time: '8 min',
            tool: 'Lápiz y papel',
            objective: 'Identificar origen de la presión',
            steps: [
              "Dibuja dos columnas en una hoja: 'mis expectativas' y 'expectativas de otros'.",
              "Anota en cada una lo que corresponda (ej. 'quiero aprender bien' vs 'mi familia espera que sea el mejor de la clase').",
              'Marca con un color las que sientes que realmente son tuyas.',
              'Reflexiona: ¿cuánta presión viene de expectativas ajenas que quizás puedes soltar un poco?'
            ]
          },
          {
            title: 'Relajación muscular progresiva breve',
            time: '5 min',
            tool: 'Espacio tranquilo',
            objective: 'Liberación de tensión física',
            steps: [
              'Aprieta con fuerza los puños durante 5 segundos y suelta.',
              'Sube a los hombros: llévalos hacia las orejas 5 segundos y suelta.',
              'Tensa el rostro (frunce todo) 5 segundos y relaja.',
              'Termina con una respiración profunda notando la diferencia entre tensión y relajación.'
            ]
          }
        ]
      },
      presentacion_jurados: {
        title: 'Presentación ante jurados',
        message: 'Hola! Veo que has seleccionado que sientes miedo al fracaso por tu presentación final. Un jurado evalúa un momento puntual, no todo el esfuerzo y el aprendizaje que hay detrás de tu trabajo. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-.553.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        ),
        activities: [
          {
            title: 'Ensayo grabado con autofeedback',
            time: '10 min',
            tool: 'Cámara de celular',
            objective: 'Mejora de desempeño y autopercepción',
            steps: [
              'Graba con tu celular una práctica corta de tu presentación (2-3 minutos).',
              'Vuelve a verla una sola vez, sin juzgarte de más.',
              'Anota un aspecto positivo que notaste.',
              'Anota un aspecto a mejorar y practica solo esa parte una vez más.'
            ]
          },
          {
            title: 'Anclaje somático',
            time: '3 min',
            tool: 'Ninguna',
            objective: 'Inducción corporal de calma',
            steps: [
              'Piensa en un recuerdo donde te sentiste tranquilo y seguro.',
              'Mientras revives ese recuerdo, junta el pulgar y el índice de una mano con firmeza.',
              'Mantén el gesto 15-20 segundos mientras sientes esa calma.',
              'Repite el gesto justo antes de tu presentación para reactivar esa sensación.'
            ]
          },
          {
            title: "Pregunta 'peor escenario'",
            time: '5 min',
            tool: 'Lápiz y papel',
            objective: 'Reducción de incertidumbre y catastrofismo',
            steps: [
              "Escribe: '¿qué es lo peor que podría pasar en esta presentación?'",
              'Responde con honestidad, sin minimizar ni exagerar.',
              "Escribe después: '¿qué haría si eso pasara?'",
              'Nota cómo, al tener un plan, el miedo suele bajar de intensidad.'
            ]
          }
        ]
      }
    }
  },
  desesperanza: {
    title: 'Desesperanza',
    color: '#FF9389',
    description: 'Es sentir que ya no hay nada que hacer porque la situación académica supera lo que puedes manejar. Te genera una sensación de impotencia o de rendirte.',
    themes: {
      repetir_curso: {
        title: 'Repetir un curso',
        message: 'Hola! Veo que has seleccionado que sientes desesperanza por repetir un curso. Volver a intentarlo no es un retroceso, es otra oportunidad con más experiencia de la que tenías antes. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg
            className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        ),
        activities: [
          {
            title: 'Reencuadre narrativo del fracaso',
            time: '8 min',
            tool: 'Lápiz y papel',
            objective: 'Cambio de perspectiva',
            steps: [
              'Escribe brevemente qué pasó con el curso, sin adornar ni minimizar.',
              'Anota qué aprendiste de esa experiencia (sobre estudio, tiempo, o sobre ti mismo).',
              "Escribe una frase que resuma el aprendizaje (ej. 'aprendí que necesito empezar antes').",
              'Guarda esa frase como recordatorio para el nuevo intento.'
            ]
          },
          {
            title: 'Línea de tiempo de logros',
            time: '10 min',
            tool: 'Lápiz y papel',
            objective: 'Evidencia de capacidad',
            steps: [
              'Dibuja una línea horizontal en una hoja.',
              'Marca en ella 4 o 5 logros académicos pasados, sin importar cuán pequeños sean.',
              'Anota brevemente qué hiciste para lograr cada uno.',
              'Observa la línea completa como evidencia de tu capacidad, no solo del curso actual.'
            ]
          },
          {
            title: 'Meta pequeña de la semana',
            time: '3 min',
            tool: 'Lápiz y papel / Nota digital',
            objective: 'Activación conductual',
            steps: [
              'Piensa en el curso que vas a repetir.',
              "Define un único objetivo alcanzable para esta semana (ej. 'asistir a todas las clases').",
              'Escríbelo en un lugar visible.',
              'Al final de la semana, revisa si lo cumpliste antes de definir la meta siguiente.'
            ]
          }
        ]
      },
      atraso_malla: {
        title: 'Atraso en la malla curricular',
        message: 'Hola! Veo que has seleccionado que sientes desesperanza por sentirte atrasado. Tu ritmo no tiene que compararse con el de los demás para tener valor, cada avance sigue siendo un avance. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        activities: [
          {
            title: 'Guía de preguntas para tutoría',
            time: '10 min',
            tool: 'Lápiz y papel',
            objective: 'Planificación proactiva',
            steps: [
              'Anota tu situación actual en la malla (qué cursos llevas de atraso).',
              "Escribe 3 preguntas concretas para tu tutor académico (ej. '¿qué opciones tengo para nivelarme este año?').",
              'Agenda la cita o envía el mensaje para solicitarla.',
              'Lleva las preguntas escritas a la reunión para no olvidarlas por los nervios.'
            ]
          },
          {
            title: 'Técnica de des-comparación',
            time: '5 min',
            tool: 'Ninguna',
            objective: 'Foco en progreso personal',
            steps: [
              'Nota el momento en que te comparas con el ritmo de otros compañeros.',
              "Detente y pregúntate: '¿esto me está ayudando o solo generando más presión?'",
              "Reemplaza la comparación con una pregunta sobre ti mismo: '¿avancé algo esta semana respecto a mí mismo?'",
              'Anota una diferencia positiva de ti mismo, aunque sea mínima.'
            ]
          },
          {
            title: 'Ejercicio de valores personales',
            time: '10 min',
            tool: 'Lápiz y papel',
            objective: 'Reconexión motivacional',
            steps: [
              "Escribe: '¿para qué estudio esta carrera?' sin pensarlo demasiado, solo escribe lo primero que surja.",
              'Revisa lo escrito y subraya las palabras que representen lo que realmente te importa (ayudar, crear, aprender, etc).',
              'Escribe una frase corta que conecte tu día a día actual con ese motivo de fondo.',
              'Guárdala para leerla en momentos de desmotivación.'
            ]
          }
        ]
      },
      esfuerzo_sin_resultados: {
        title: 'Esfuerzo sin resultados visibles',
        message: 'Hola! Veo que has seleccionado que sientes desesperanza por sentir que nada cambia. A veces los resultados tardan más en notarse de lo que esperamos, pero eso no significa que no estén ocurriendo. Ahora veamos algunas actividades que te ayuden a cambiar este sentimiento y poder autorregularte de una mejor manera',
        icon: (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ),
        activities: [
          {
            title: 'Registro de proceso',
            time: '3 min',
            tool: 'Lápiz y papel / Nota digital',
            objective: 'Visibilización del esfuerzo',
            steps: [
              'Al final del día, anota qué acciones concretas hiciste (no el resultado, sino el esfuerzo).',
              "Ejemplo: 'estudié 1 hora', 'hice 10 ejercicios de práctica'.",
              'Revisa el registro cada semana para ver el esfuerzo acumulado.',
              'Recuerda que los resultados suelen aparecer después del proceso, no en paralelo.'
            ]
          },
          {
            title: 'Solicitud de feedback externo',
            time: '5 min',
            tool: 'Dispositivo digital o papel',
            objective: 'Retroalimentación específica',
            steps: [
              'Piensa en un docente o compañero que pueda darte una opinión honesta.',
              "Redacta un mensaje breve pidiendo retroalimentación específica (ej. '¿qué podría mejorar en mis exámenes?', no solo '¿cómo lo hice?').",
              'Envíalo y agenda mentalmente revisar la respuesta con apertura, no a la defensiva.',
              'Anota 1 acción concreta que puedas aplicar con ese feedback.'
            ]
          },
          {
            title: 'Gratitud y logros diarios',
            time: '3 min',
            tool: 'Cuaderno de notas',
            objective: 'Equilibrio de perspectiva',
            steps: [
              'Antes de dormir, escribe 3 cosas del día.',
              'Al menos una debe ser un logro, por mínimo que sea.',
              'Las otras dos pueden ser cosas por las que te sientes agradecido, académicas o no.',
              'Repite el ejercicio a diario para construir una perspectiva más equilibrada con el tiempo.'
            ]
          }
        ]
      }
    }
  }
};

const MOOD_OPTIONS = [
  { label: 'Excelente', emoji: '😁', value: 'Exc' },
  { label: 'Bien', emoji: '😊', value: 'Bin' },
  { label: 'Regular', emoji: '😐', value: 'Reg' },
  { label: 'Mal', emoji: '😔', value: 'Mal' },
  { label: 'Crítico', emoji: '😫', value: 'Cri' },
];

const ACTIVITIES_BY_EMOTION = {
  agobio: {
    tiempo: '5 - 30 min',
    herramienta: 'Lápiz y papel / Cronómetro',
    objetivo: 'Organización y Enfoque',
    activities: [
      {
        title: 'Vaciado mental y priorización',
        description: 'Descarga todo lo pendiente fuera de tu mente, clasifica por urgencia y enfócate solo en lo que necesitas resolver hoy.',
        steps: [
          'Toma una hoja o abre una nota y escribe, sin orden, TODO lo que tienes pendiente (académico y no académico).',
          'Una vez que ya no se te ocurra nada más, revisa la lista completa.',
          'Marca con un color lo urgente (próximas 48 horas), con otro lo importante pero no urgente, y con otro lo que puede esperar.',
          'Elige únicamente las 2-3 tareas urgentes para hoy; el resto queda "guardado" en la lista, fuera de tu mente.',
          'Guarda la lista en un lugar visible para no tener que recordarla mentalmente.'
        ]
      },
      {
        title: 'Técnica de "una cosa a la vez"',
        description: 'Elimina las distracciones y trabaja en bloques enfocados de 25-30 minutos en una sola tarea.',
        steps: [
          'De tu lista priorizada, elige solo la primera tarea.',
          'Oculta o cierra todo lo demás (otras pestañas, apuntes de otros cursos, notificaciones del celular).',
          'Trabaja en esa única tarea durante 25-30 minutos (temporizador).',
          'Al sonar la alarma, tómate un descanso corto de 5 minutos antes de decidir si continúas con la misma tarea o pasas a la siguiente.',
          'Evita revisar la lista completa mientras trabajas; solo enfócate en el paso actual.'
        ]
      },
      {
        title: 'Pausa de "reseteo" sensorial',
        description: 'Un microdescanso de 3 a 5 minutos para estirar, respirar y reajustar tu atención antes de continuar.',
        steps: [
          'Detente por completo durante 3-5 minutos, aunque sientas que "no tienes tiempo".',
          'Cierra los ojos y respira profundamente 5 veces.',
          'Estira el cuerpo (cuello, hombros, espalda) lentamente.',
          'Bebe un vaso de agua con calma, prestando atención a la sensación.',
          'Antes de retomar, recuerda cuál es la única tarea siguiente (no todas las pendientes).'
        ]
      }
    ]
  },
  ansiedad: {
    tiempo: '2 - 5 min',
    herramienta: 'Ninguna / Cuaderno',
    objetivo: 'Calma física y mental',
    activities: [
      {
        title: 'Grounding 5-4-3-2-1',
        description: 'Ejercicio de atención plena para anclarte en el presente conectando con tus 5 sentidos.',
        steps: [
          'Observa a tu alrededor y nombra (en voz alta o mentalmente) 5 cosas que puedes ver.',
          'Identifica 4 cosas que puedes tocar y detente en la textura de cada una.',
          'Escucha con atención y reconoce 3 sonidos distintos en tu entorno.',
          'Reconoce 2 olores (si no hay ninguno presente, piensa en dos que te gusten).',
          'Identifica 1 sabor que puedas percibir en tu boca en ese momento (o recuerda uno agradable).',
          'Al terminar, respira profundo una vez más y continúa con tu actividad.'
        ]
      },
      {
        title: 'Descarga cognitiva escrita',
        description: 'Saca todas tus preocupaciones al papel y sepáralas entre las que puedes accionar y las que debes soltar.',
        steps: [
          'Toma una hoja o abre una nota en el celular.',
          'Escribe, sin filtrar, todas las preocupaciones que tengas en ese momento (una por línea).',
          'Al lado de cada preocupación, escribe una acción concreta que puedas hacer al respecto (aunque sea pequeña).',
          'Si alguna preocupación no tiene acción posible ahora, escribe "no depende de mí en este momento" y déjala ahí.',
          'Guarda o rompe la hoja como símbolo de haber "soltado" esas ideas de tu mente.'
        ]
      },
      {
        title: 'Respiración 4-7-8',
        description: 'Técnica de control de respiración que calma el sistema nervioso en menos de dos minutos.',
        steps: [
          'Siéntate cómodamente con la espalda recta.',
          'Coloca la punta de la lengua detrás de los dientes superiores (opcional, técnica original).',
          'Exhala completamente el aire por la boca.',
          'Inhala por la nariz contando hasta 4.',
          'Sostén el aire contando hasta 7.',
          'Exhala por la boca, haciendo un sonido suave, contando hasta 8.',
          'Repite el ciclo 4 veces.'
        ]
      }
    ]
  },
  frustracion: {
    tiempo: '5 - 10 min',
    herramienta: 'Ninguna / Espacio físico',
    objetivo: 'Resetear el humor y romper el bloqueo',
    activities: [
      {
        title: 'Pausa activa de 5-10 minutos',
        description: 'Aléjate temporalmente de la pantalla o apuntes para reducir la tensión física y mental sin usar el celular.',
        steps: [
          'En cuanto notes la frustración (tensión, ganas de abandonar la tarea), detente por completo.',
          'Aléjate físicamente del lugar de estudio si es posible.',
          'Haz algo distinto por unos minutos: caminar, tomar agua, mirar por la ventana.',
          'Evita revisar el celular o redes sociales durante la pausa, ya que no ayuda a bajar la activación.',
          'Antes de volver, respira profundo 3 veces y pregúntate: "¿con qué parte más pequeña puedo empezar de nuevo?"'
        ]
      },
      {
        title: 'Reformulación escrita del problema',
        description: 'Identifica con precisión qué te frustra y aíslate únicamente en la pequeña parte que sí puedes controlar.',
        steps: [
          'Escribe en una hoja: "¿Qué es exactamente lo que me está frustrando?"',
          'Debajo, escribe: "¿Qué de esto puedo controlar ahora mismo?" y "¿Qué no depende de mí?"',
          'Marca con un color lo que sí puedes controlar.',
          'Elige solo una acción de esa lista para hacer a continuación (no todas a la vez).',
          'Empieza únicamente por esa acción.'
        ]
      },
      {
        title: 'Relajación muscular progresiva (versión breve)',
        description: 'Libera la tensión acumulada en el cuerpo tensando y soltando diferentes grupos musculares de golpe.',
        steps: [
          'Siéntate o acuéstate en un lugar tranquilo.',
          'Tensa los músculos de las manos (haz puños) durante 5 segundos y suelta de golpe.',
          'Repite con los brazos, luego los hombros (súbelos hacia las orejas), luego el rostro (frunce todo).',
          'Continúa con el abdomen y las piernas, tensando y soltando cada grupo.',
          'Al terminar, queda unos segundos notando la diferencia entre tensión y relajación.'
        ]
      }
    ]
  },
  miedo_fracaso: {
    tiempo: '5 min',
    herramienta: 'Notas digitales o papel',
    objetivo: 'Autoconfianza y Realismo',
    activities: [
      {
        title: 'Registro de logros',
        description: 'Un recordatorio objetivo de tus capacidades mediante el registro de 3 cosas que hiciste bien en el día.',
        steps: [
          'Al final del día o la semana, toma una libreta o nota digital.',
          'Escribe 3 cosas concretas que hiciste bien, por pequeñas que parezcan (ej. "entregué el avance a tiempo").',
          'Evita minimizarlas con frases como "pero pude hacerlo mejor".',
          'Relee la lista antes de una evaluación importante, como recordatorio de tu capacidad.'
        ]
      },
      {
        title: 'Diálogo interno correctivo',
        description: 'Desafía los pensamientos negativos catastrofistas y cámbialos por interpretaciones realistas y objetivas.',
        steps: [
          'Identifica el pensamiento negativo exacto (ej. "si fallo, voy a decepcionar a todos").',
          'Pregúntate: "¿esto es un hecho o una interpretación?"',
          'Busca una evidencia en contra (ej. "ya he aprobado otros retos similares antes").',
          'Reformula el pensamiento de forma más realista (ej. "voy a hacer mi mejor esfuerzo; el resultado no define todo mi valor").',
          'Repite la nueva frase un par de veces antes de la tarea.'
        ]
      },
      {
        title: 'Definir el "éxito mínimo aceptable"',
        description: 'Reduce la presión del perfeccionismo definiendo un resultado suficiente como meta real para hoy.',
        steps: [
          'Antes de la tarea, escribe cuál sería el resultado ideal.',
          'Luego escribe cuál sería un resultado "suficiente" o aceptable, aunque no sea perfecto.',
          'Enfócate en ese segundo objetivo como meta real para hoy.',
          'Al terminar, evalúa tu desempeño según esa meta mínima, no según la ideal.'
        ]
      }
    ]
  },
  desesperanza: {
    tiempo: '5 - 10 min',
    herramienta: 'Teléfono / Notas',
    objetivo: 'Activación conductual y Red de apoyo',
    activities: [
      {
        title: 'Dividir la tarea en pasos pequeños',
        description: 'Convierte un objetivo gigante y abrumador en 4 o 5 microtareas fáciles de digerir.',
        steps: [
          'Escribe la tarea completa que sientes abrumadora.',
          'Divídela en 4 o 5 pasos pequeños y concretos.',
          'Tapa o ignora mentalmente todos los pasos excepto el primero.',
          'Enfócate solo en completar ese primer paso, sin pensar en los demás todavía.',
          'Al terminarlo, recién mira el siguiente paso.'
        ]
      },
      {
        title: 'Buscar apoyo social o académico',
        description: 'Guía rápida para comunicarte con personas de confianza o servicios universitarios en menos de 24 horas.',
        steps: [
          'Identifica a una persona de confianza (compañero, tutor, familiar o docente) o un servicio de la universidad (bienestar estudiantil).',
          'Escribe brevemente qué te gustaría contarle o preguntarle.',
          'Contacta a esa persona o servicio en las próximas 24 horas (no lo postergues más).',
          'Durante la conversación, enfócate en describir la situación concreta, no solo en cómo te sientes.'
        ]
      },
      {
        title: 'Ejercicio de logros pasados',
        description: 'Recuerda tus herramientas y estrategias de éxito previas para aplicarlas a la dificultad actual.',
        steps: [
          'Recuerda una situación académica difícil que hayas superado antes (un curso complicado, un examen que temías).',
          'Escribe cómo la enfrentaste y qué recursos usaste (organización, ayuda de otros, constancia).',
          'Identifica qué de eso puedes aplicar a la situación actual.',
          'Cierra el ejercicio con la frase: "si lo logré antes, tengo recursos para intentarlo de nuevo".'
        ]
      }
    ]
  }
};

// Estructura de Datos para las preguntas frecuentes de image_8072b1.jpg
const FAQ_ITEMS = [
  {
    id: 'anonimo',
    color: '#7AA6C3',
    question: '¿Mis respuestas son anónimas?',
    answer: 'Sí, absolutamente. Toda la información y autoevaluaciones que realizas se procesan de forma local en tu navegador. MindCampus no almacena ni comparte tus respuestas con terceros o entidades universitarias.'
  },
  {
    id: 'psicologo',
    color: '#66D596',
    question: '¿Esto reemplaza a un psicólogo?',
    answer: 'No. Esta plataforma es una herramienta de apoyo, primer contacto y gestión de autoconocimiento emocional. No sustituye de ninguna manera un tratamiento, terapia clínica o el diagnóstico de un profesional de la salud mental.'
  },
  {
    id: 'costo',
    color: '#D38EF0',
    question: '¿Tiene algún costo?',
    answer: 'No, la plataforma es 100% gratuita y de acceso libre para la comunidad estudiantil como parte de las iniciativas de bienestar universitario.'
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('welcome');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('entregas_cruzadas');
  const [currentView, setCurrentView] = useState('inicio');
  const [unlockedFeatures, setUnlockedFeatures] = useState(false);

  const [todayMood, setTodayMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const [activeActivity, setActiveActivity] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Estado para controlar qué acordeón de FAQ está expandido
  const [openFaq, setOpenFaq] = useState(null);

  // Estados para el formulario de sugerencias
  const [feedbackForm, setFeedbackForm] = useState({ name: '', career: '', message: '' });

  // local
  const STORAGE_KEY = "mindcampus-data";
  const loadData = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const saveData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };


  const getThemeKey = (emotionName) => {
    if (!emotionName) return 'agobio';
    if (emotionName === 'Miedo al fracaso') return 'miedo_fracaso';
    return emotionName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

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

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [unlockedFeatures]);

  useEffect(() => {
    const data = loadData();

    if (!data) return;

    setTodayMood(data.todayMood || null);
    setMoodHistory(data.moodHistory || []);
    setUnlockedFeatures(data.unlockedFeatures || false);
    setSelectedEmotion(data.selectedEmotion || null);
    setSelectedTheme(data.selectedTheme || "entregas_cruzadas");
  }, []);

  useEffect(() => {
    saveData({
      todayMood,
      moodHistory,
      unlockedFeatures,
      selectedEmotion,
      selectedTheme
    });
  }, [
    todayMood,
    moodHistory,
    unlockedFeatures,
    selectedEmotion,
    selectedTheme
  ]);


  const openModal = () => {
    setModalStep('welcome');
    setIsModalOpen(true);
  };

  const closeModal = (keepSelection = false) => {
    setIsModalOpen(false);
    if (!keepSelection) {
      setSelectedEmotion(null);
      setSelectedTheme('entregas_cruzadas');
    }
  };

  const handleSelectEmotion = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleConfirmEmotion = () => {
    if (selectedEmotion) {
      const emotionKey = getThemeKey(selectedEmotion);
      const emotionData = REFLECTION_THEMES_BY_EMOTION[emotionKey];
      if (emotionData && emotionData.themes) {
        const firstThemeKey = Object.keys(emotionData.themes)[0];
        setSelectedTheme(firstThemeKey);
      }
    }
    setModalStep('reflection');
  };

  const handleFinishReflection = () => {
    setUnlockedFeatures(true);
    closeModal(true);
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
    setFeedbackForm({ name: '', career: '', message: '' });
  };

  // 1. Tus selectores de datos adaptados a la nueva estructura anidada
  const currentEmotionKey = getThemeKey(selectedEmotion);
  const currentEmotionData = REFLECTION_THEMES_BY_EMOTION[currentEmotionKey] || REFLECTION_THEMES_BY_EMOTION['agobio'];

  const themesToDisplay = currentEmotionData.themes;
  // Aquí obtenemos toda la data del subtema (que ahora incluye sus propias actividades)
  const activeThemeData = themesToDisplay[selectedTheme] || Object.values(themesToDisplay)[0];

  // Extraemos el arreglo de actividades de este subtema específico (fallback a un arreglo vacío si no hay)
  const activitiesList = activeThemeData.activities || [];

  // Si deseas mostrar en la "Ficha de Enfoque" un resumen global de las actividades del tema activo:
  const totalTiempo = activitiesList.map(a => a.time).join(' + ') || 'N/A';
  const herramientasUtilizadas = [...new Set(activitiesList.map(a => a.tool))].join(', ') || 'Ninguna';
  const objetivoPrincipal = activitiesList[0]?.objective || 'Autorregulación';
  const moodToY = {
    Exc: 40,
    Bin: 75,
    Reg: 110,
    Mal: 145,
    Cri: 180,
  };

  const dayFormatter = new Intl.DateTimeFormat("es-PE", {
    weekday: "short",
  });

  const visibleHistory = [...moodHistory]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7);

  const points = visibleHistory
    .map((item, index) => `${55 + index * 60},${moodToY[item.mood]}`)
    .join(" ");






    // Estado local para disparar el mensaje de éxito neobrutalista
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // 1. Ejecutas tu lógica existente (si guarda en base de datos o estado global)
      if (typeof handleFeedbackSubmit === 'function') {
        handleFeedbackSubmit(e);
      }

      // 2. Activamos el cartel de respuesta
      setShowSuccessMessage(true);

      // 3. Temporizador de 2.5 segundos para leer el mensaje y redirigir a INICIO
      setTimeout(() => {
        // Redirección directa al ID o ruta de inicio
        window.location.href = '#inicio'; 
      }, 2500);
    };

  return (
    <div className="min-h-screen bg-[#FFF5E2] text-neutral-800 font-sans p-4 md:p-8 flex flex-col justify-between antialiased">

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto bg-white border-2 border-black px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 font-bold tracking-wider text-lg uppercase select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            className="w-9 h-10 text-black"
            fill="none"
          >
            {/* LADO IZQUIERDO: CEREBRO */}
            <g stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 230,90 C 180,90 140,120 140,170 C 100,180 90,230 100,270 C 90,320 120,370 160,390 C 160,420 200,450 240,430" />
              <path d="M 230,140 C 190,140 180,180 200,200" />
              <path d="M 150,220 C 150,180 190,180 210,210" />
              <path d="M 180,250 C 140,260 160,310 200,300" />
              <path d="M 230,260 C 200,260 190,290 220,320" />
              <path d="M 155,330 C 135,360 185,410 210,370" />
              <path d="M 215,350 C 195,380 230,410 235,370" />

              {/* Eje central */}
              <path d="M 245,110 L 245,150" strokeWidth="10" />
              <path d="M 245,210 L 245,240" strokeWidth="10" />
              <path d="M 245,300 L 245,340" strokeWidth="10" />
            </g>

            {/* LADO DERECHO: ENJAMBRE DE MARIPOSAS */}
            <g fill="currentColor">
              {/* 1. Mariposas Grandes */}
              <g transform="translate(260, 350) rotate(-10) scale(1.4)">
                <path d="M18,22 Q15,10 10,5 M19,22 Q22,10 27,5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <ellipse cx="18.5" cy="25" rx="2" ry="7" />
                <path d="M17,23 C10,15 -5,10 2,30 C6,42 14,35 17,27" />
                <path d="M17,27 C10,32 2,38 8,46 C14,52 18,40 17,31" />
                <path d="M20,23 C27,15 42,10 35,30 C31,42 23,35 20,27" />
                <path d="M20,27 C27,32 35,38 29,46 C23,52 19,40 20,31" />
              </g>

              <g transform="translate(320, 240) rotate(15) scale(1.1)">
                <path d="M18,22 Q14,11 8,7 M19,22 Q23,11 29,7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <ellipse cx="18.5" cy="25" rx="1.8" ry="6" />
                <path d="M17,23 C11,16 -3,11 3,29 C7,40 14,34 17,26 M17,26 C11,31 4,37 9,44 C14,50 18,39 17,30" />
                <path d="M20,23 C26,16 40,11 34,29 C30,40 23,34 20,26 M20,26 C26,31 33,37 28,44 C23,50 19,39 20,30" />
              </g>

              <g transform="translate(370, 260) rotate(-5) scale(1.05)">
                <ellipse cx="18.5" cy="25" rx="1.7" ry="5.5" />
                <path d="M17,23 C11,16 -3,11 3,29 C7,40 14,34 17,26 M17,26 C11,31 4,37 9,44 C14,50 18,39 17,30" />
                <path d="M20,23 C26,16 40,11 34,29 C30,40 23,34 20,26 M20,26 C26,31 33,37 28,44 C23,50 19,39 20,30" />
              </g>

              <g transform="translate(340, 130) rotate(-25) scale(0.95)">
                <path d="M18,22 Q14,11 8,7 M19,22 Q23,11 29,7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <ellipse cx="18.5" cy="25" rx="1.5" ry="5" />
                <path d="M17,23 C11,15 -4,9 2,28 C6,39 14,33 17,25 M17,25 C11,30 3,36 8,43 C13,49 17,38 17,29" />
                <path d="M20,23 C26,15 41,9 35,28 C31,39 23,33 20,25 M20,25 C26,30 34,36 29,43 C24,49 20,38 20,29" />
              </g>

              {/* 2. Mariposas Medianas */}
              <g transform="translate(410, 195) rotate(35) scale(0.8)">
                <ellipse cx="18.5" cy="25" rx="1.5" ry="5" />
                <path d="M17,23 C11,15 -4,9 2,28 C6,39 14,33 17,25 M17,25 C11,30 3,36 8,43 C13,49 17,38 17,29" />
                <path d="M20,23 C26,15 41,9 35,28 C31,39 23,33 20,25 M20,25 C26,30 34,36 29,43 C24,49 20,38 20,29" />
              </g>

              <g transform="translate(295, 120) rotate(-15) scale(0.75)">
                <ellipse cx="18.5" cy="25" rx="1.3" ry="4.5" />
                <path d="M17,23 C11,15 -4,9 2,28 C6,39 14,33 17,25 M17,25 C11,30 3,36 8,43" />
                <path d="M20,23 C26,15 41,9 35,28 C31,39 23,33 20,25 M20,25 C26,30 34,36 29,43" />
              </g>

              <g transform="translate(275, 260) rotate(-45) scale(0.75)">
                <path d="M17,23 C11,15 -4,9 2,28 C6,39 14,33 17,25 M20,23 C26,15 41,9 35,28 C31,39 23,33 20,25" />
              </g>

              {/* 3. Siluetas de Transición */}
              <g transform="translate(285, 190) rotate(-40) scale(0.68)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(345, 195) rotate(10) scale(0.65)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(320, 70) rotate(-15) scale(0.55)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(435, 145) rotate(20) scale(0.52)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(430, 245) rotate(45) scale(0.55)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(390, 320) rotate(10) scale(0.6)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(290, 325) rotate(-20) scale(0.5)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>
              <g transform="translate(370, 45) rotate(-50) scale(0.42)">
                <path d="M17,23 C10,14 -5,8 2,28 C6,38 14,32 17,24 C20,32 28,38 32,28 C39,8 24,14 17,23 Z" />
              </g>

              {/* 4. Estela de Micro-partículas */}
              <path d="M395,35 L401,31 L403,37 L399,39 Z" />
              <path d="M420,55 L424,50 L428,54 L423,58 Z" />
              <path d="M455,95 L462,92 L461,99 L454,98 Z" />
              <path d="M465,120 L469,115 L472,121 L467,123 Z" />
              <path d="M360,95 L364,91 L367,96 L362,98 Z" />
              <path d="M395,115 L399,110 L402,116 L397,118 Z" />
              <path d="M340,180 L345,176 L347,182 L341,184 Z" />
              <path d="M380,165 L384,160 L387,166 L382,168 Z" />
              <path d="M460,180 L465,176 L468,181 L462,183 Z" />
              <path d="M450,225 L456,221 L458,227 L451,229 Z" />
              <path d="M425,295 L429,290 L432,296 L427,298 Z" />
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
                  <div key={feature.id} className="p-6 border rounded-2xl flex flex-col gap-4">
                    {/* Contenedor del ícono con el fondo de color redondo */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${feature.bgColor}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                      <p className="text-sm text-neutral-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VISTA: ACTIVIDADES */}
        {currentView === 'actividades' && unlockedFeatures && (
          <div className="space-y-8 py-4 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
                Actividades sugeridas para ti
              </h1>
              <p className="text-xs text-neutral-500 font-medium">
                Recomendaciones personalizadas para afrontar el reto de: <strong>{activeThemeData.title}</strong>
              </p>
            </div>

            {/* Ficha de Enfoque Dinámica */}
            <div className="bg-white border-2 border-black p-5 md:p-6 rounded-[2rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Estado de Ánimo</span>
                <span className="text-sm font-black text-black uppercase">{currentEmotionData.title}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Tiempo Estimado</span>
                <span className="text-sm font-bold text-neutral-700">{totalTiempo}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Herramientas</span>
                <span className="text-sm font-bold text-neutral-700 truncate" title={herramientasUtilizadas}>
                  {herramientasUtilizadas}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Objetivo Principal</span>
                <span className="text-sm font-bold text-neutral-700">{objetivoPrincipal}</span>
              </div>
            </div>

            {/* Grid de Actividades del Tema */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activitiesList.map((act, index) => {
                // Usamos las variables que ya existen arriba en tu componente App
                const emotionColor = currentEmotionData?.color || '#000000';

                return (
                  <div
                    key={index}
                    className="bg-white border-2 border-black p-6 flex flex-col justify-between min-h-[350px] rounded-sm relative group transition-all duration-200 hover:-translate-y-1"
                    style={{
                      boxShadow: `8px 8px 0px 0px ${emotionColor}`
                    }}
                  >
                    <div className="space-y-4">
                      {/* Header de la tarjeta: Badge e Información de herramientas */}
                      <div className="flex items-center justify-between">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-black text-xs font-black"
                          style={{ backgroundColor: emotionColor }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex gap-1.5">
                          <span className="bg-neutral-100 border border-neutral-300 text-neutral-800 text-[10px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm">
                            ⏱️ {act.time}
                          </span>
                        </div>
                      </div>

                      {/* Título de la actividad */}
                      <h3 className="font-black text-base uppercase tracking-tight text-black line-clamp-2 pt-1">
                        {act.title}
                      </h3>

                      {/* Herramienta requerida */}
                      <div className="flex items-center gap-1.5 text-neutral-600">
                        <span className="text-xs">🛠️</span>
                        <span className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 truncate max-w-full">
                          {act.tool}
                        </span>
                      </div>

                      <hr className="border-dashed border-neutral-300" />

                      {/* Objetivo específico */}
                      <div className="text-neutral-600 text-xs font-medium leading-relaxed">
                        <span className="font-black text-black text-[11px] block uppercase tracking-wider mb-1">
                          Enfoque:
                        </span>
                        <p className="line-clamp-3">{act.objective}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-6">
                      {/* Indicador de pasos */}
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block text-center">
                        Contiene {act.steps?.length || 0} pasos interactivos
                      </span>

                      {/* Botón dinámico */}
                      <button
                        onClick={() => setActiveActivity(act)}
                        className="w-full bg-black text-white text-xs font-black uppercase py-3 border-2 border-black rounded-sm flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
                        style={{
                          boxShadow: '2px 2px 0px 0px #000000',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = emotionColor;
                          e.currentTarget.style.color = '#000000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#000000';
                          e.currentTarget.style.color = '#FFFFFF';
                        }}
                      >
                        <span>INICIAR GUÍA</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
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
                        onClick={() => {

                          const today = new Date().toISOString().split("T")[0];

                          let history = [...moodHistory];

                          const index = history.findIndex(item => item.date === today);

                          if (index >= 0) {

                            history[index].mood = mood.value;

                          } else {

                            history.push({
                              date: today,
                              mood: mood.value
                            });

                          }

                          setMoodHistory(history);
                          setTodayMood(mood.value);

                        }}
                        className={`flex flex-col items-center justify-center p-4 border-2 border-black rounded-2xl transition-all duration-150 ${isSelected ? 'bg-black text-white scale-[0.98]' : 'bg-white text-neutral-800 hover:bg-neutral-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
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

                <div>
                  <h3 className="text-lg font-extrabold text-neutral-900">
                    Mi historial emocional
                  </h3>

                  <p className="text-xs text-neutral-400 font-medium">
                    Tu progreso se construye con cada registro diario.
                  </p>
                </div>

                {visibleHistory.length === 0 ? (

                  <div className="flex flex-col items-center justify-center py-20 text-center">

                    <div className="text-6xl mb-4">
                      😊
                    </div>

                    <h4 className="font-bold text-neutral-800">
                      Aún no tienes registros
                    </h4>

                    <p className="text-xs text-neutral-500 mt-2">
                      Registra cómo te sientes hoy para comenzar tu historial.
                    </p>

                  </div>

                ) : (

                  <div className="w-full overflow-x-auto">

                    <svg
                      viewBox="0 0 500 220"
                      className="w-full min-w-[400px] h-auto"
                    >

                      {[40, 75, 110, 145, 180].map((y, index) => (
                        <line
                          key={index}
                          x1="45"
                          y1={y}
                          x2="475"
                          y2={y}
                          stroke="#e5e5e5"
                          strokeWidth="1"
                        />
                      ))}

                      <text x="15" y="44" className="text-[11px] font-bold fill-neutral-400">Exc</text>
                      <text x="15" y="79" className="text-[11px] font-bold fill-neutral-400">Bin</text>
                      <text x="15" y="114" className="text-[11px] font-bold fill-neutral-400">Reg</text>
                      <text x="15" y="149" className="text-[11px] font-bold fill-neutral-400">Mal</text>
                      <text x="15" y="184" className="text-[11px] font-bold fill-neutral-400">Cri</text>

                      {visibleHistory.length > 1 && (
                        <polyline
                          fill="none"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points}
                        />
                      )}

                      {visibleHistory.map((item, index) => {

                        const x = 55 + (index * 60);
                        const y = moodToY[item.mood];

                        return (
                          <g key={item.date}>

                            <circle
                              cx={x}
                              cy={y}
                              r="5"
                              fill="#000"
                            />

                            <text
                              x={x}
                              y="205"
                              textAnchor="middle"
                              className="text-[10px] font-bold fill-neutral-400 uppercase"
                            >
                              {dayFormatter.format(new Date(item.date))}
                            </text>

                          </g>
                        )

                      })}

                    </svg>

                  </div>

                )}

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
                    // Capturamos el color específico asignado a este item en el arreglo
                    const faqColor = item.color || '#000000';

                    return (
                      <div
                        key={item.id}
                        className="w-full transition-all duration-200"
                      >
                        {/* Botón de la Pregunta */}
                        <button
                          onClick={() => toggleFaq(item.id)}
                          className="w-full text-black px-6 py-4 rounded-sm border-2 border-black flex items-center justify-between text-left font-black transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                          style={{
                            // El fondo cambia a su color asignado si está abierto; si está cerrado, es blanco.
                            backgroundColor: isOpen ? faqColor : '#FFFFFF',
                            // Sombra dura neobrutalista permanente con el color del item
                            boxShadow: isOpen ? '2px 2px 0px 0px #000000' : `4px 4px 0px 0px ${faqColor}`
                          }}
                        >
                          <span className="text-xs md:text-sm uppercase tracking-wider">
                            {item.question}
                          </span>
                          <svg
                            className={`w-4 h-4 flex-shrink-0 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Contenido colapsable de la Respuesta */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
                            }`}
                        >
                          <div
                            className="px-6 py-4 bg-white border-2 border-black rounded-sm text-xs font-bold text-neutral-800 leading-relaxed"
                            style={{
                              // Sombra dura que acompaña a la respuesta abierta
                              boxShadow: `4px 4px 0px 0px ${faqColor}`
                            }}
                          >
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bloque Derecho: Formulario de Reflexión Premium */}
             <div className="lg:col-span-6 bg-white border-2 border-black p-6 md:p-8 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        
        {/* CAPA DE RESPUESTA NEOBRUTALISTA */}
        {showSuccessMessage && (
          <div className="absolute inset-0 bg-[#FFF5E2] border-2 border-black z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
              ✓
            </div>
            <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-2">
              ¡REFLEXIÓN GUARDADA!
            </h3>
            <p className="text-black font-bold max-w-sm text-sm md:text-base leading-snug uppercase tracking-tight">
              Tu mente está lista. Regresando al inicio...
            </p>
            <div className="mt-6 w-16 h-2 bg-black border border-black animate-pulse"></div>
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Header con Icono de Avión de Papel */}
          <div className="flex items-center gap-2.5 text-black font-black text-lg md:text-xl uppercase tracking-wider mb-2">
            <svg
              className="w-5 h-5 text-black transform rotate-12 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <h2>Reflexionemos antes de irte</h2>
          </div>

          {/* Grupo de Preguntas e Inputs */}
          <div className="space-y-4">
            {/* Pregunta 1 */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 px-2">
                <span className="text-black font-black text-base">•</span>
                <label className="text-neutral-700 text-sm font-bold tracking-tight">
                  ¿Menoró tu emoción elegida?
                </label>
              </div>
              <input
                type="text"
                placeholder="Escribe tu respuesta aquí..."
                required
                value={feedbackForm.emotionReflection || ''}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, emotionReflection: e.target.value })}
                className="w-full bg-white border-2 border-black rounded-full px-5 py-3 text-sm font-medium text-black placeholder-neutral-400 focus:outline-none bg-white/90 transition-all shadow-[0px_4px_12px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* Pregunta 2 */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 px-2">
                <span className="text-black font-black text-base">•</span>
                <label className="text-neutral-700 text-sm font-bold tracking-tight">
                  ¿Cómo te sientes ahora?
                </label>
              </div>
              <input
                type="text"
                placeholder="Describe tu estado actual..."
                required
                value={feedbackForm.currentFeeling || ''}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, currentFeeling: e.target.value })}
                className="w-full bg-white border-2 border-black rounded-full px-5 py-3 text-sm font-medium text-black placeholder-neutral-400 focus:outline-none bg-white/90 transition-all shadow-[0px_4px_12px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* Pregunta 3 */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 px-2">
                <span className="text-black font-black text-base">•</span>
                <label className="text-neutral-700 text-sm font-bold tracking-tight">
                  ¿Estás listo/a para volver a tus actividades?
                </label>
              </div>
              <input
                type="text"
                placeholder="Sí / No, ¿por qué?..."
                required
                value={feedbackForm.readyToReturn || ''}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, readyToReturn: e.target.value })}
                className="w-full bg-white border-2 border-black rounded-full px-5 py-3 text-sm font-medium text-black placeholder-neutral-400 focus:outline-none bg-white/90 transition-all shadow-[0px_4px_12px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          {/* Botón de Envío */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-black hover:bg-neutral-900 text-white text-sm font-black uppercase py-4 rounded-full tracking-wide transition-all border-2 border-black shadow-[0px_6px_20px_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-md"
            >
              Tu bienestar impulsa tu éxito.
            </button>
          </div>

        </form>
      </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto flex items-center justify-between text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
        <div>@MINDCAMPUS</div>
        <div>PAGE</div>
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
                    <p className="text-lg font-black text-black uppercase tracking-tight mb-2">{selectedEmotion}</p>
                    <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-4">
                      {REFLECTION_THEMES_BY_EMOTION[getThemeKey(selectedEmotion)]?.description}
                    </p>
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
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 mb-1">Conversemos un momento</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Emoción seleccionada:</span>
                <span
                  style={{ backgroundColor: REFLECTION_THEMES_BY_EMOTION[getThemeKey(selectedEmotion)]?.color }}
                  className="px-3 py-1 text-black text-[10px] font-black uppercase rounded-full tracking-wider border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                >
                  {currentEmotionData.title}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
              {/* COLUMNA IZQUIERDA: BOTONES DINÁMICOS */}
              <div className="md:col-span-6 space-y-4">
                <p className="text-[11px] font-black tracking-widest text-neutral-400 uppercase">Temas de reflexión</p>
                <div className="relative border border-neutral-300 p-4 rounded-sm bg-neutral-50/40">
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-black"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black"></div>
                  <div className="flex flex-col gap-3">
                    {Object.keys(themesToDisplay).map((key) => {
                      const theme = themesToDisplay[key];
                      const isCurrent = selectedTheme === key;

                      // Extraemos el color de la emoción activa
                      const emotionColor = REFLECTION_THEMES_BY_EMOTION[getThemeKey(selectedEmotion)]?.color || '#ffffff';

                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedTheme(key)}
                          style={{
                            backgroundColor: isCurrent ? '#000000' : emotionColor
                          }}
                          className={`w-full flex items-center gap-4 px-5 py-4 rounded-full border-2 border-black text-left font-bold transition-all duration-150 group ${isCurrent
                            ? 'text-white shadow-none translate-x-0.5 translate-y-0.5'
                            : 'text-black hover:brightness-95 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                            }`}
                        >
                          <div className={`p-2 rounded-full border transition-colors duration-150 ${isCurrent ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-black'
                            }`}>
                            {theme.icon}
                          </div>
                          <span className="text-xs md:text-sm uppercase tracking-wide">{theme.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="pt-2">
                  <button onClick={() => setModalStep('wheel')} className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-colors focus:outline-none">← Cambiar Emoción</button>
                </div>
              </div>

              {/* COLUMNA DERECHA: BURBUJA DE CONVERSACIÓN */}
              <div className="md:col-span-6">
                <div className="w-full min-h-[260px] bg-neutral-200/70 border-2 border-black rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                  <div className="bg-white border border-neutral-400 rounded-2xl p-4 text-xs md:text-sm font-medium text-neutral-700 leading-relaxed relative shadow-sm">
                    {activeThemeData.message}
                    {/* Flecha corregida a fondo blanco para igualar su contenedor */}
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

      {/* MODAL: Guía Paso a Paso */}
      {activeActivity && (() => {
        const totalSteps = activeActivity.steps.length;
        const isLast = activeStep >= totalSteps;
        const progress = isLast ? 100 : Math.round(((activeStep) / totalSteps) * 100);

        // Captura del color dinámico seguro de la emoción actual
        const emotionColor = currentEmotionData?.color || '#000000';

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
              onClick={() => { setActiveActivity(null); setActiveStep(0); }}
            />

            {/* Contenedor Modal Neobrutalista */}
            <div
              className="bg-white border-2 border-black rounded-sm max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-200"
              style={{
                boxShadow: `8px 8px 0px 0px ${emotionColor}`
              }}
            >
              {/* Header */}
              <div className="p-6 border-b-2 border-black">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-0.5">
                      Guía paso a paso
                    </p>
                    <h2 className="text-base font-black text-black uppercase tracking-tight leading-tight">
                      {activeActivity.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => { setActiveActivity(null); setActiveStep(0); }}
                    className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-neutral-100 transition-all text-sm font-black"
                  >
                    ✕
                  </button>
                </div>

                {/* Barra de progreso dinámica */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1.5">
                    <span>{isLast ? 'Completado 🎉' : `Paso ${activeStep + 1} de ${totalSteps}`}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 border-2 border-black rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: emotionColor
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Contenido del paso */}
              <div className="p-6 min-h-[200px] flex flex-col justify-center border-b-2 border-black">
                {isLast ? (
                  <div className="text-center py-4">
                    <div
                      className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_#000000]"
                      style={{ backgroundColor: emotionColor }}
                    >
                      <span className="text-2xl font-black text-black">✓</span>
                    </div>
                    <h3 className="text-lg font-black text-black uppercase tracking-tight mb-2">
                      ¡Actividad completada!
                    </h3>
                    <p className="text-xs font-bold text-neutral-600 leading-relaxed max-w-xs mx-auto">
                      Has terminado todos los pasos de esta guía. ¡Buen trabajo tomando acción por tu bienestar!
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    {/* Badge del número del paso actual con color de emoción */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-black text-sm font-black shadow-[3px_3px_0px_0px_#000000]"
                      style={{ backgroundColor: emotionColor }}
                    >
                      {String(activeStep + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm font-bold text-neutral-800 leading-relaxed pt-1.5">
                      {activeActivity.steps[activeStep]}
                    </p>
                  </div>
                )}
              </div>

              {/* Miniaturas interactivas inferiores */}
              {!isLast && (
                <div className="px-6 pt-4 flex gap-2 flex-wrap justify-center">
                  {activeActivity.steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className="h-3 border-2 border-black rounded-full transition-all duration-300"
                      style={{
                        width: i === activeStep ? '24px' : '12px',
                        backgroundColor: i === activeStep ? emotionColor : i < activeStep ? '#A3A3A3' : '#E5E5E5'
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Footer Navegación */}
              <div className="p-6 flex gap-3">
                {!isLast && activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(s => s - 1)}
                    className="flex-1 bg-white border-2 border-black text-black text-xs font-black uppercase py-3 rounded-sm hover:bg-neutral-50 transition-colors shadow-[2px_2px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    ← Anterior
                  </button>
                )}
                {isLast ? (
                  <button
                    onClick={() => { setActiveActivity(null); setActiveStep(0); }}
                    className="flex-1 bg-black text-white text-xs font-black uppercase py-3 border-2 border-black rounded-sm hover:bg-neutral-900 transition-all shadow-[2px_2px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    Cerrar guía
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveStep(s => s + 1)}
                    className="flex-1 bg-black text-white text-xs font-black uppercase py-3 border-2 border-black rounded-sm hover:bg-neutral-900 transition-all shadow-[2px_2px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    {activeStep === totalSteps - 1 ? 'Finalizar ✓' : 'Siguiente →'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}