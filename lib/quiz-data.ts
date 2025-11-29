// === FUNÇÕES DE PERSONALIZAÇÃO ===

// Função para capturar respostas do usuário (você pode adaptar conforme sua implementação)
function getUserAnswer(questionId) {
  // Esta função deve retornar a resposta do usuário para a questão específica
  // Adapte conforme sua lógica de armazenamento de respostas
  const answers = window.quizAnswers || {};
  return answers[questionId] || '';
}

function getUserGender() {
  return getUserAnswer('question1') || 'MASCULINO';
}

// 1. FUNÇÃO PARA PRIMEIRO INSIGHT PERSONALIZADO
function getPersonalizedFirstInsight() {
  const currentSituation = getUserAnswer('question7'); // Situação atual
  const timeApart = getUserAnswer('question3'); // Tempo separados
  const whoEnded = getUserAnswer('question4'); // Quem terminou
  
  // ERRO ESPECÍFICO baseado na situação atual
  if (currentSituation.includes("contacto cero")) {
    return "❌ ERROR DETECTADO: Estás aplicando contacto cero de forma INCORRECTA. El 73% de los hombres cometen este error que los aleja definitivamente de su ex.";
  }
  
  if (currentSituation.includes("me ignora")) {
    return "❌ ERROR DETECTADO: Estás siendo IGNORADO porque usas las palabras EQUIVOCADAS. Hay 3 tipos de mensajes que rompen el muro del silencio.";
  }
  
  if (currentSituation.includes("bloqueado")) {
    return "❌ ERROR DETECTADO: Fuiste BLOQUEADO porque ella siente PRESIÓN. Existe una técnica específica para casos de bloqueo que funciona en 9 de cada 10 veces.";
  }
  
  if (currentSituation.includes("cosas necesarias")) {
    return "❌ ERROR DETECTADO: El contacto 'solo por necesidad' está MATANDO tu atractivo. Cada mensaje aburrido te aleja más de la reconquista.";
  }
  
  if (currentSituation.includes("charlamos")) {
    return "❌ ERROR DETECTADO: Charlar 'como amigos' es la TRAMPA más peligrosa. Estás en la zona de confort que te mantiene lejos de su corazón.";
  }
  
  if (currentSituation.includes("amigos")) {
    return "❌ ERROR DETECTADO: Ser 'solo amigos' es el LIMBO emocional. El 89% que se queda aquí nunca sale de esta zona.";
  }
  
  // Fallback genérico basado en quien terminó
  if (whoEnded.includes("terminó conmigo")) {
    return "❌ ERROR DETECTADO: Después de que TE DEJARAN, tu estrategia actual está creando más RESISTENCIA. El 84% cometen este error psicológico.";
  }
  
  return "❌ ERROR DETECTADO: Tu estrategia actual está generando el EFECTO CONTRARIO al que buscas. Hay un patrón específico que debes romper.";
}

// 2. FUNCIÓN PARA TÉCNICA PERSONALIZADA
function getPersonalizedTechnique() {
  const currentSituation = getUserAnswer('question7');
  const timeApart = getUserAnswer('question3');
  const withSomeoneElse = getUserAnswer('question8');
  const gender = getUserGender();
  const pronoun = gender === "MASCULINO" ? "ella" : "él";
  const pronounCap = gender === "MASCULINO" ? "Ella" : "Él";
  
  // TÉCNICA ESPECÍFICA baseada na situação
  if (currentSituation.includes("contacto cero")) {
    return `🎯 TU TÉCNICA: "RUPTURA DEL SILENCIO MAGNÉTICO"
    
Tu situación: Contacto cero + ${timeApart}

PASO 1: Envía exactamente este mensaje en 48h:
"Hey [nombre], encontré algo que te pertenece. ¿Cuándo puedes pasar a recogerlo?"

PASO 2: Cuando responda (lo hará en 67% de los casos):
"Perfecto, déjalo en [lugar específico]. No necesitamos vernos."

¿Por qué funciona? Crea CURIOSIDAD sin presión. El cerebro femenino no puede resistir el misterio.`;
  }
  
  if (currentSituation.includes("me ignora")) {
    return `🎯 TU TÉCNICA: "MENSAJE DE CURIOSIDAD IRRESISTIBLE"
    
Tu situación: Te ignora + ${timeApart} separados

MENSAJE EXACTO para enviar:
"No voy a molestarte más. Solo quería agradecerte por algo que me enseñaste."

NO envíes nada más. Espera 72h.

¿Por qué funciona? Rompe el patrón de expectativa. ${pronounCap} esperaba súplicas, no gratitud.`;
  }
  
  if (currentSituation.includes("bloqueado")) {
    return `🎯 TU TÉCNICA: "PROTOCOLO DE DESBLOQUEO"
    
Tu situación: Bloqueado + ${timeApart} separados

MÉTODO INDIRECTO:
1. Usa cuenta de amigo común para enviar: "María me pidió preguntarte por [tema neutral]"
2. Cuando responda, NO menciones la relación
3. Sé cordial pero breve

¿Por qué funciona? Evita la resistencia directa y reactiva su curiosidad.`;
  }
  
  if (currentSituation.includes("cosas necesarias")) {
    return `🎯 TU TÉCNICA: "TRANSFORMACIÓN DE LO MUNDANO"
    
Tu situación: Solo hablan por necesidad + ${timeApart}

NUEVO ENFOQUE:
En lugar de: "Necesito que me devuelvas..."
Usa: "Encontré [objeto] y recordé cuando [memoria positiva]. Te lo puedo dar cuando quieras."

¿Por qué funciona? Convierte lo aburrido en emocional sin parecer forzado.`;
  }
  
  if (currentSituation.includes("charlamos")) {
    return `🎯 TU TÉCNICA: "ESCALADA EMOCIONAL SUTIL"
    
Tu situación: Charlan de vez en cuando + ${timeApart}

PRÓXIMO MENSAJE:
"Tengo que contarte algo curioso que me pasó que te recordé. ¿Tienes 5 minutos para una llamada?"

Si acepta: Cuenta algo divertido (NO romántico) que conecte con una memoria compartida.

¿Por qué funciona? Eleva la conexión de texto a voz, reactivando química emocional.`;
  }
  
  if (currentSituation.includes("amigos")) {
    return `🎯 TU TÉCNICA: "RUPTURA DEL PATRÓN DE AMISTAD"
    
Tu situación: Son "amigos" + ${timeApart} separados

ESTRATEGIA DE 3 PASOS:
1. Reduce contact frecuencia en 50%
2. Cuando hables, sé más misterioso: "Tengo noticias interesantes, te cuento otro día"
3. Menciona sutilmente otros planes: "No puedo quedar, tengo algo pendiente"

¿Por qué funciona? La disponibilidad constante mata la atracción. La escasez la reaviva.`;
  }
  
  if (currentSituation.includes("encuentros íntimos")) {
    return `🎯 TU TÉCNICA: "CAPITALIZACIÓN EMOCIONAL"
    
Tu situación: Intimidad física + ${timeApart} separados

PRÓXIMO PASO CRÍTICO:
Después del próximo encuentro íntimo, envía esto:
"Ayer fue especial, pero siento que merecemos claridad sobre lo que somos."

NO presiones respuesta inmediata.

¿Por qué funciona? La intimidad sin definición genera ansiedad que ${pronoun} querrá resolver.`;
  }
  
  // Fallback genérico pero personalizado
  return `🎯 TU TÉCNICA: "REACTIVACIÓN EMOCIONAL"
    
Para tu situación específica: ${currentSituation}

MENSAJE ESPECÍFICO:
"Vi [algo específico] y recordé cuando [memoria positiva compartida]. Espero que estés bien."

Envía solo esto. No esperes respuesta inmediata.

¿Por qué funciona? Reactiva conexión emocional sin presión ni demandas.`;
}

// 3. FUNCIÓN PARA DEPOIMENTO PERSONALIZADO
function getPersonalizedTestimonial() {
  const currentSituation = getUserAnswer('question7');
  const timeApart = getUserAnswer('question3');
  
  if (currentSituation.includes("contacto cero")) {
    return {
      name: "Miguel R., 29 años",
      text: "Estaba en contacto cero hace 2 meses. Apliqué la técnica exacta y a los 4 días me escribió preguntando cómo estaba. ¡Ahora vivimos juntos otra vez!",
      image: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png"
    };
  }
  
  if (currentSituation.includes("me ignora")) {
    return {
      name: "Roberto S., 35 años", 
      text: "Me ignoraba completamente. Seguí el protocolo al pie de la letra y en 72h me llamó curiosa por mi mensaje. ¡Todo cambió!",
      image: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png"
    };
  }
  
  if (currentSituation.includes("bloqueado")) {
    return {
      name: "Daniel M., 31 años",
      text: "Estaba bloqueado en todo. Usé el método indirecto y en una semana me desbloqueó y me propuso que habláramos. ¡Increíble!",
      image: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png"
    };
  }
  
  return {
    name: "Fernando L., 28 años",
    text: "Mi situación parecía imposible. El plan personalizado me guió paso a paso y en 3 semanas estábamos de vuelta. ¡Gracias!",
    image: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png"
  };
}

// 4. FUNCIÓN PARA PLANO DE 7 DÍAS PERSONALIZADO
function getPersonalized7DayPlan() {
  const gender = getUserGender();
  const timeApart = getUserAnswer('question3');
  const currentSituation = getUserAnswer('question7');
  const withSomeoneElse = getUserAnswer('question8');
  const whoEnded = getUserAnswer('question4');
  
  const pronoun = gender === "MASCULINO" ? "ella" : "él";
  const pronounCap = gender === "MASCULINO" ? "Ella" : "Él";
  
  return `📋 TU PLAN PERSONALIZADO - PRIMEROS 7 DÍAS:

**DÍA 1-2: FASE DE PREPARACIÓN**
→ Elimina todos los comportamientos de "necesidad" detectados en tu perfil
→ Aplica la técnica específica que acabas de ver para tu situación: ${currentSituation}
→ Prepara tu mentalidad con el "Protocolo de Confianza"

**DÍA 3-4: PRIMERA CONEXIÓN**  
→ Envía el mensaje específico diseñado para tu caso
→ Aplica la "Regla de las 72 horas" (CRUCIAL - no quebrar)
→ Si responde: usa el "Guión de Curiosidad" (scripts incluidos)

**DÍA 5-7: CONSTRUCCIÓN DE INTERÉS**
→ Técnica del "Valor Implícito" adaptada a tu tiempo de separación: ${timeApart}
→ ${withSomeoneElse && withSomeoneElse.includes('No') ? 'Protocolo de reconexión directa (campo libre)' : 'Estrategia de diferenciación (caso con terceros)'}
→ Preparación para la "Fase de Encuentro" ${whoEnded.includes('terminó conmigo') ? '- Protocolo Especial para casos donde TE DEJARON' : ''}

⚠️ IMPORTANTE: Estos son solo los PRIMEROS 7 pasos del Plan A completo.

Los próximos 14 pasos incluyen:
→ Scripts exactos para cada respuesta posible de ${pronoun}
→ Técnicas de encuentro presencial específicas para tu perfil
→ Protocolo de reconciliación definitiva (Fase Final)
→ Plan B de emergencia si algo sale mal`;
}

// === QUIZ STEPS TRANSFORMADO ===

export const quizSteps = [
  {
    id: 1,
    question: "¡NO DEJES QUE LA PERSONA QUE AMAS SALGA DE TU VIDA PARA SIEMPRE!",
    description: "Haz la prueba rápida de 2 minutos y descubre cómo aplicar el PLAN A - en tu caso específico.",
    subtext: "Selecciona tu género:",
    options: ["MASCULINO", "FEMENINO"],
    warning: "⚠️ ATENCIÓN: ¡Este método comprobado solo debe usarse si estás 100% comprometido en reconquistar tu amor perdido!",
    elements: {
      heartbeat: true,
      timer: "Prueba de 2 minutos",
    },
  },
  {
    id: 2,
    question: "¿CUÁL ES TU EDAD?",
    description: "(Esta información es crucial para personalizar tu plan de reconquista)",
    options: [
      "18-29 - Fase de descubrimientos emocionales",
      "29-39 - Período de consolidación de valores",
      "39-49 - Momento de reevaluación de prioridades",
      "50+ - Fase de madurez emocional",
    ],
    elements: {
      ageIcons: true,
      counter: "personas que ya hicieron la prueba hoy",
    },
  },
  {
    id: 3,
    question: "¿CUÁNTO TIEMPO LLEVAN SEPARADOS?",
    description: "(El tiempo es un factor crítico para tu estrategia de reconquista)",
    options: {
      masculino: ["Menos de una semana", "Hace 1 mes", "De 2 a 6 meses", "Más de 6 meses"],
      feminino: ["Menos de una semana", "Hace 1 mes", "De 2 a 6 meses", "Más de 6 meses"],
    },
    bonusUnlock: {
      id: 1,
      title: "21 DISPARADORES EMOCIONALES QUE FUNCIONAN",
      value: 47,
      description: "Las 21 frases exactas que hacen que piense en ti obsesivamente.",
    },
  },
  {
    id: 4,
    question: {
      masculino: "¿CÓMO FUE SU SEPARACIÓN?",
      feminino: "¿CÓMO FUE SU SEPARACIÓN?",
    },
    description: "(Esta información es vital para determinar tu estrategia específica)",
    options: {
      masculino: ["Ella terminó conmigo", "Yo terminé con ella", "Decidimos terminar de mutuo acuerdo"],
      feminino: ["Él terminó conmigo", "Yo terminé con él", "Decidimos terminar de mutuo acuerdo"],
    },
    elements: {
      analysisText: "Calculando tasa de éxito para tu caso...",
      successRate: "¡Tu caso tiene características prometedoras!",
      testimonialDisplay: true,
      testimonialName: "Carlos M., 34 años",
      testimonialText: "Respondió en 3 días. Volvimos en 11.",
      testimonialImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png",
    },
  },
  {
    id: 5,
    question: "¿CUÁNTO TIEMPO ESTUVIERON JUNTOS?",
    description: "(La duración de la relación influye directamente en tu estrategia)",
    options: ["Más de 3 años", "De 1 a 3 años", "De 6 meses a 1 año", "Menos de 6 meses"],
  },
  {
    id: 6,
    question: "¿CUÁL FUE LA PARTE MÁS DOLOROSA DE LA RUPTURA?",
    description: "(Identificar tu dolor principal es esencial para tu recuperación emocional y reconquista)",
    options: {
      masculino: [
        "😔 Lidiar con la soledad y el vacío",
        "😢 La montaña rusa emocional: ira, tristeza, arrepentimiento",
        "😐 Lidiar con recuerdos y memorias",
        "💔 Imaginarla con otro hombre",
        "🤔 Darme cuenta de que los planes que hicimos nunca se harán realidad",
        "⚡ Otro",
      ],
      feminino: [
        "😔 Lidiar con la soledad y el vacío",
        "😢 La montaña rusa emocional: ira, tristeza, arrepentimiento",
        "😐 Lidiar con recuerdos y memorias",
        "💔 Imaginarlo con otra mujer",
        "🤔 Darme cuenta de que los planes que hicimos nunca se harán realidad",
        "⚡ Otro",
      ],
    },
    elements: {
      profileAnalysis: "Personalizando tu estrategia emocional...",
      profileComplete: "46%",
    },
  },
  {
    id: 7,
    question: {
      masculino: "¿CUÁL ES TU SITUACIÓN ACTUAL CON TU EX?",
      feminino: "¿CUÁL ES TU SITUACIÓN ACTUAL CON TU EX?",
    },
    description: "(Esta información determinará tu punto de partida en el PLAN A)",
    options: {
      masculino: [
        "🧐 Estoy aplicando contacto cero",
        "😢 Ella me ignora completamente",
        "❌ Me ha bloqueado en todas las redes sociales",
        "🤝 Hablamos solo de cosas necesarias",
        "🤔 Charlamos de vez en cuando",
        "😌 Seguimos siendo amigos",
        "🔥 Hemos tenido encuentros íntimos después de la ruptura",
      ],
      feminino: [
        "🧐 Estoy aplicando contacto cero",
        "😢 Él me ignora completamente",
        "❌ Me ha bloqueado en todas las redes sociales",
        "🤝 Hablamos solo de cosas necesarias",
        "🤔 Charlamos de vez en cuando",
        "😌 Seguimos siendo amigos",
        "🔥 Hemos tenido encuentros íntimos después de la ruptura",
      ],
    },
    elements: {
      profileComplete: "62%",
      testimonialImage: "",
    },
  },
  {
    id: 8,
    question: {
      masculino: "¿ELLA YA ESTÁ SALIENDO CON OTRA PERSONA?",
      feminino: "¿ÉL YA ESTÁ SALIENDO CON OTRA PERSONA?",
    },
    description: "(Esta información es crucial para definir tu enfoque estratégico)",
    options: {
      masculino: [
        "🚫 No, está soltera",
        "🤔 No estoy seguro",
        "😔 Sí, está saliendo con alguien",
        "💔 Sí, tiene una relación seria",
        "🔄 Está saliendo con varias personas",
      ],
      feminino: [
        "🚫 No, está soltero",
        "🤔 No estoy segura",
        "😔 Sí, está saliendo con alguien",
        "💔 Sí, tiene una relación seria",
        "🔄 Está saliendo con varias personas",
      ],
    },
    bonusUnlock: {
      id: 2,
      title: "PROTOCOLO DE EMERGENCIA 72H",
      value: 37,
      description: "Qué hacer cuando todo parece perdido y tienes 72 horas para actuar.",
    },
    elements: {
      profileComplete: "77%",
      testimonialDisplay: true,
      testimonialName: "Diego L., 36 años",
      testimonialText: "Estaba con otro tipo. En 16 días lo dejó por mí.",
      testimonialImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png",
    },
  },
  {
    id: 9,
    question: {
      masculino: "¿CUÁNTO QUIERES RECUPERARLA?",
      feminino: "¿CUÁNTO QUIERES RECUPERARLO?",
    },
    description: "(Tu nivel de compromiso determinará tu éxito)",
    subtext: "El 91% de las personas que seleccionaron nivel 4 reconquistaron a su ex en menos de 21 días usando el PLAN A.",
    options: ["1 - No estoy seguro", "2 - Me lo estoy pensando", "3 - Lo quiero bastante", "4 - Lo quiero muchísimo"],
    note: "Solo trabajo con personas decididas a transformar su situación amorosa. El PLAN A fue desarrollado para quien está preparado para actuar.",
    elements: {
      thermometer: true,
      profileComplete: "85%",
    },
  },
  {
    id: 10,
    question: "EXPERTO ANALIZANDO TU CASO...",
    description: "Espera mientras analizo tus respuestas para crear tu estrategia personalizada.",
    options: [],
    autoAdvance: true,
    elements: {
      expertPhoto: true,
      expertImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/09/Generated-Image-September-07_-2025-12_00AM-_1_-e1757389439336.webp",
      autoMessage: "Basándome en 7 años de experiencia ayudando a personas como tú...",
      profileComplete: "90%",
    },
  },

  // === QUESTÕES 11-13 TRANSFORMADAS ===
  
  {
    id: 11,
    question: "PRIMER DESCUBRIMIENTO PERSONALIZADO PARA TU CASO",
    description: "Baseado en tu situación específica, he identificado el error #1 que está arruinando tus chances de reconquista.",
    subtext: () => getPersonalizedFirstInsight(),
    options: ["DESCUBRIR MI ERROR #1"],
    elements: {
      expertPhoto: true,
      expertImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/09/Generated-Image-September-07_-2025-12_00AM-_1_-e1757389439336.webp",
      personalizedInsight: true,
      profileComplete: "70%",
      badge: "INSIGHT PERSONALIZADO",
      analysisIcon: true,
    },
  },
  
  {
    id: 12,
    question: "TU PRIMERA TÉCNICA PERSONALIZADA - FUNCIONA EN 72H",
    description: () => getPersonalizedTechnique(),
    subtext: "Esta técnica está diseñada específicamente para tu situación y tiene 89% de efectividad en casos similares.",
    options: ["APLICAR ESTA TÉCNICA AHORA"],
    elements: {
      personalizedTechnique: true,
      situationSpecific: true,
      profileComplete: "85%",
      badge: "TÉCNICA ESPECÍFICA", 
      timer: "Aplicar en 48-72h",
    },
  },
  
  {
    id: 13,
    question: "TU PLAN PERSONALIZADO DE 7 DÍAS ESTÁ LISTO",
    description: "He creado tu estrategia específica basada en todos tus datos. Estos son los primeros 7 pasos que necesitas seguir.",
    subtext: () => getPersonalized7DayPlan(),
    options: ["VER LOS PRÓXIMOS 14 PASOS DEL PLAN A"],
    note: "Esto es solo el 30% del método completo. Los próximos 70% incluyen las técnicas avanzadas y scripts exactos.",
    elements: {
      sevenDayPlan: true,
      profileComplete: "100%",
      planPreview: true,
      continuationTease: true,
      planLayout: true,
      checklist: true,
    },
  }
]

// === RESTO DO CÓDIGO MANTÉM IGUAL ===

export const bonuses = [
  {
    id: 1,
    title: "21 DISPARADORES EMOCIONALES QUE FUNCIONAN",
    value: 47,
    description: "Las 21 frases exactas que hacen que piense en ti obsesivamente.",
    details: ["✓ 7 Gatillos de Nostalgia", "✓ 7 Gatillos de Curiosidad", "✓ 7 Gatillos de Deseo"],
  },
  {
    id: 2,
    title: "PROTOCOLO DE EMERGENCIA 72H",
    value: 37,
    description: "Qué hacer cuando todo parece perdido y tienes 72 horas para actuar.",
    details: ["✓ Plan de Acción Inmediata", "✓ Independencia Emocional", "✓ Comunicación Magnética"],
  },
]

export const testimonials = [
  {
    name: "Carlos M., 34 años",
    text: "Respondió en 3 días. Volvimos en 11.",
    rating: 5,
  },
  {
    name: "Santiago B., 31 años",
    text: "Seguí exactamente los pasos del Plan A. Al día 7, rompí el contacto cero. Al día 14 me pidió que nos viéramos. Ahora llevamos 6 meses juntos de nuevo.",
    rating: 5,
  },
  {
    name: "Diego L., 36 años",
    text: "Pensé que era imposible porque estaba con otro tipo. En 16 días lo dejó por mí.",
    rating: 5,
  },
  {
    name: "Javier M., 38 años",
    text: "Estaba completamente bloqueado. En 18 días volvimos a estar juntos.",
    rating: 5,
  },
]

export const socialProofMessages = [
  "¡Estás entre el 17% más decidido a reconquistar!",
  "¡Tu perfil muestra compatibilidad!",
  "¡Bonificación liberada por desbloqueo!",
  "¡Has desbloqueado los 2 bonos - valor total de $84!",
  "El 87% de las personas en tu situación lograron resultados en menos de 14 días",
  "Estás más comprometido que el 73% de las personas que hicieron esta prueba",
  "-",
  "-",
  "-",
  "-",
]

// Função utilitaria para personalizar textos basados en el género
export function getPersonalizedContent(content, gender) {
  if (typeof content === "string") {
    return content
  }

  if (typeof content === "object" && content !== null) {
    if (content.masculino && content.feminino) {
      return gender === "MASCULINO" ? content.masculino : content.feminino
    }
    return content
  }

  return content
}