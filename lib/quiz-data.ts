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
export function getPersonalizedFirstInsight() {
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

// 2. FUNÇÃO PARA TÉCNICA PERSONALIZADA
export function getPersonalizedTechnique() {
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

// 3. FUNÇÃO PARA DEPOIMENTO PERSONALIZADO
export function getPersonalizedTestimonial() {
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

// 4. FUNÇÃO PARA PLANO DE 7 DIAS PERSONALIZADO
export function getPersonalized7DayPlan() {
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

// === QUIZ STEPS - 13 PERGUNTAS EXATAS ===

export const quizSteps = [
    {
        id: 1,
        question: "¡NO DEJES QUE LA PERSONA QUE AMAS SALGA DE TU VIDA PARA SIEMPRE!",
        description: "INICIANDO ANÁLISIS PSICOLÓGICO - Para revelar si ella aún siente algo por ti, necesito mapear tu perfil emocional específico.",
        subtext: "DATO CRÍTICO #1 - Tu género influye directamente en cómo ella procesa la separación:",
        options: ["SOY HOMBRE", "SOY MUJER"],
        warning: "⚠️ IMPORTANTE: Este análisis fue desarrollado basándose en 12,000 casos reales de reconquista. Cada respuesta ajusta tu diagnóstico.",
        elements: {
            psychologicalTest: true,
            timer: "Análisis en progreso...",
            analysisIcon: true,
            badge: "ANÁLISIS PSICOLÓGICO",
        }
    },

    {
        id: 2,
        question: "MAPEANDO TU PERFIL EMOCIONAL...",
        description: "Tu edad determina qué técnicas psicológicas tendrán mayor impacto en tu caso específico.",
        subtext: "DATO CRÍTICO #2 - Selecciona tu rango de edad:",
        options: [
            "18-29 años → Fase de alta intensidad emocional",
            "30-39 años → Período de madurez y estabilidad", 
            "40-49 años → Etapa de reevaluación de prioridades",
            "50+ años → Fase de sabiduría emocional"
        ],
        elements: {
            profileBuilding: true,
            counter: "personas analizadas hoy",
            profileComplete: "15%",
        },
        note: "Cada grupo de edad responde a diferentes disparadores emocionales."
    },

    {
        id: 3,
        question: "CALCULANDO PROBABILIDADES DE RECONQUISTA...",
        description: "El tiempo de separación es el factor más crítico para determinar qué técnicas usar y cuándo aplicarlas.",
        subtext: "DATO CRÍTICO #3 - ¿Cuánto tiempo llevan separados?",
        options: [
            "Menos de 1 semana → Ventana de oportunidad crítica",
            "1-4 semanas → Período de reflexión activa", 
            "1-6 meses → Fase de adaptación emocional",
            "Más de 6 meses → Etapa de reconstrucción profunda"
        ],
        elements: {
            probabilityCalculator: true,
            profileComplete: "30%",
        },
        note: "REVELACIÓN: El 73% de las reconquistas exitosas ocurren aplicando la técnica correcta en el momento exacto."
    },

    {
        id: 4,
        question: "IDENTIFICANDO PATRÓN DE RUPTURA...",
        description: "Cómo terminó la relación revela su estado emocional actual y define qué estrategia psicológica será más efectiva.",
        subtext: "DATO CRÍTICO #4 - ¿Cómo fue la separación?",
        options: {
            masculino: [
                "Ella terminó conmigo → Patrón de rechazo activo",
                "Yo terminé con ella → Patrón de arrepentimiento",
                "Decisión mutua → Patrón de duda compartida"
            ],
            feminino: [
                "Él terminó conmigo → Patrón de rechazo activo", 
                "Yo terminé con él → Patrón de arrepentimiento",
                "Decisión mutua → Patrón de duda compartida"
            ]
        },
        elements: {
            patternAnalysis: true,
            profileComplete: "45%",
            testimonialDisplay: true,
            testimonialText: "Mi patrón era 'rechazo activo'. Apliqué la técnica específica y en 8 días me escribió.",
        },
        note: "DESCUBRIMIENTO: Cada patrón de ruptura requiere una aproximación psicológica diferente."
    },

    {
        id: 5,
        question: "ANALIZANDO INTENSIDAD EMOCIONAL...",
        description: "La duración de la relación determina la profundidad del vínculo emocional y qué técnicas de reconexión usar.",
        subtext: "DATO CRÍTICO #5 - ¿Cuánto tiempo estuvieron juntos?",
        options: [
            "Más de 3 años → Vínculo profundo establecido",
            "1-3 años → Conexión emocional sólida", 
            "6 meses-1 año → Atracción en desarrollo",
            "Menos de 6 meses → Química inicial"
        ],
        elements: {
            intensityMeter: true,
            profileComplete: "60%",
        },
        note: "INSIGHT: Relaciones más largas requieren técnicas de 'reactivación de memoria'. Más cortas necesitan 'intensificación de deseo'."
    },

    {
        id: 6,
        question: "DETECTANDO TU PUNTO DE DOLOR PRINCIPAL...",
        description: "Tu mayor sufrimiento revela qué necesitas sanar ANTES de aplicar cualquier técnica de reconquista.",
        subtext: "DATO CRÍTICO #6 - ¿Cuál fue la parte más dolorosa?",
        options: {
            masculino: [
                "😔 La soledad y el vacío → Necesitas 'Protocolo de Autoconfianza'",
                "😢 La montaña rusa emocional → Necesitas 'Estabilización Mental'",
                "😐 Los recuerdos constantes → Necesitas 'Técnica de Reframe'",
                "💔 Imaginarla con otro → Necesitas 'Estrategia de Diferenciación'",
                "🤔 Los planes perdidos → Necesitas 'Visión de Futuro'",
                "⚡ Otro → Requiere análisis personalizado"
            ],
            feminino: [
                "😔 La soledad y el vacío → Necesitas 'Protocolo de Autoconfianza'",
                "😢 La montaña rusa emocional → Necesitas 'Estabilización Mental'", 
                "😐 Los recuerdos constantes → Necesitas 'Técnica de Reframe'",
                "💔 Imaginarlo con otra → Necesitas 'Estrategia de Diferenciación'",
                "🤔 Los planes perdidos → Necesitas 'Visión de Futuro'",
                "⚡ Otro → Requiere análisis personalizado"
            ]
        },
        elements: {
            healingProtocol: true,
            profileComplete: "70%",
        },
        note: "CRUCIAL: Sin sanar tu herida principal, cualquier intento de reconquista fracasará."
    },

    {
        id: 7,
        question: "EVALUANDO TU SITUACIÓN ACTUAL...",
        description: "Tu situación presente define tu PUNTO DE PARTIDA y qué estrategia específica necesitas aplicar primero.",
        subtext: "DATO CRÍTICO #7 - ¿Cuál es tu situación actual con tu ex?",
        options: {
            masculino: [
                "🧐 Contacto cero → Estrategia de 'Ruptura del Silencio'",
                "😢 Me ignora → Protocolo de 'Reactivación de Interés'", 
                "❌ Me bloqueó → Técnica de 'Acceso Indirecto'",
                "🤝 Solo temas necesarios → Método de 'Escalada Emocional'",
                "🤔 Charlamos a veces → Sistema de 'Diferenciación'",
                "😌 Somos 'amigos' → Estrategia de 'Ruptura de Patrón'",
                "🔥 Encuentros íntimos → Protocolo de 'Definición de Relación'"
            ],
            feminino: [
                "🧐 Contacto cero → Estrategia de 'Ruptura del Silencio'",
                "😢 Me ignora → Protocolo de 'Reactivación de Interés'",
                "❌ Me bloqueó → Técnica de 'Acceso Indirecto'", 
                "🤝 Solo temas necesarios → Método de 'Escalada Emocional'",
                "🤔 Charlamos a veces → Sistema de 'Diferenciación'",
                "😌 Somos 'amigos' → Estrategia de 'Ruptura de Patrón'",
                "🔥 Encuentros íntimos → Protocolo de 'Definición de Relación'"
            ]
        },
        elements: {
            strategyMapping: true,
            profileComplete: "80%",
        },
        note: "REVELACIÓN: Cada situación tiene una estrategia específica con 87% de efectividad."
    },

    {
        id: 8,
        question: "ANALIZANDO FACTOR DE COMPETENCIA...",
        description: "Esta información determina la URGENCIA de tu estrategia y qué técnicas avanzadas necesitarás.",
        subtext: "DATO CRÍTICO #8 - ¿Ya está saliendo con otra persona?",
        options: {
            masculino: [
                "🚫 Está soltera → Estrategia estándar aplicable",
                "🤔 No estoy seguro → Protocolo de investigación discreta",
                "😔 Saliendo casual → Técnica de diferenciación intensiva", 
                "💔 Relación seria → Estrategia avanzada de largo plazo",
                "🔄 Varias personas → Protocolo de valor único"
            ],
            feminino: [
                "🚫 Está soltero → Estrategia estándar aplicable",
                "🤔 No estoy segura → Protocolo de investigación discreta",
                "😔 Saliendo casual → Técnica de diferenciación intensiva",
                "💔 Relación seria → Estrategia avanzada de largo plazo", 
                "🔄 Varias personas → Protocolo de valor único"
            ]
        },
        elements: {
            competitionAnalysis: true,
            profileComplete: "85%",
        },
        note: "DATO CLAVE: El 67% de reconquistas exitosas ocurrieron INCLUSO con competencia presente."
    },

    {
        id: 9,
        question: "MIDIENDO TU NIVEL DE COMPROMISO...",
        description: "Tu nivel de determinación define qué tan profundo será tu plan personalizado y qué resultados puedes esperar.",
        subtext: "DATO FINAL - ¿Cuánto quieres recuperar esta relación?",
        options: [
            "1 - No estoy seguro → Plan básico de exploración",
            "2 - Lo estoy considerando → Plan intermedio de evaluación", 
            "3 - Lo quiero bastante → Plan avanzado de reconquista",
            "4 - Lo quiero con toda mi alma → Plan INTENSIVO personalizado"
        ],
        note: "ESTADÍSTICA: El 91% que eligió nivel 4 logró reconquistar usando nuestro sistema personalizado.",
        elements: {
            commitmentThermometer: true,
            profileComplete: "90%",
        },
        subtext2: "Tu nivel determinará la intensidad y efectividad de tu estrategia personalizada."
    },

    {
        id: 10,
        question: "GENERANDO TU DIAGNÓSTICO PERSONALIZADO...",
        description: "Analizando todos tus datos para crear tu estrategia específica de reconquista...",
        options: [],
        autoAdvance: true,
        elements: {
            expertPhoto: true,
            expertImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/09/Generated-Image-September-07_-2025-12_00AM-_1_-e1757389439336.webp",
            autoMessage: "Procesando 9 variables críticas de tu caso... basándome en 7 años de experiencia y 12,000 casos exitosos...",
            profileComplete: "95%",
            diagnosticGeneration: true,
        },
        note: "Este diagnóstico se basa en el análisis de 12,000 casos similares al tuyo."
    },

    {
        id: 11,
        question: "MIENTRAS ANALIZO TU CASO, DESCUBRE LA CIENCIA DETRAS DE ESTE METODO",
        description: "Una investigación reciente revela por qué el PLAN A funciona a nivel neurológico y psicológico.",
        subtext: "Estudios recientes confirman que las técnicas que usaremos son avaladas por ciencia:",
        options: ["CONTINUAR PARA VER MIS RESULTADOS"],
        elements: {
            scientificEvidence: true,
            reportageImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/10/imagem3-nova.webp",
            curiousImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/10/estudos-imagem-2.webp",
            profileComplete: "97%",
        },
        note: "La ciencia respalda nuestras técnicas. Por eso funcionan."
    },

    {
        id: 12,
        question: "TU DIAGNÓSTICO PERSONALIZADO ESTÁ LISTO",
        description: () => `Basándome en tu análisis completo, he identificado el ERROR PRINCIPAL que está saboteando tus posibilidades de reconquista:

${getPersonalizedFirstInsight()}

Y tu técnica específica para solucionarlo:

${getPersonalizedTechnique()}`,
        subtext: "Tu diagnóstico + técnica específica basados en tus respuestas exactas",
        options: ["VER MI PLAN COMPLETO DE 21 DÍAS"],
        elements: {
            expertPhoto: true,
            expertImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/09/Generated-Image-September-07_-2025-12_00AM-_1_-e1757389439336.webp",
            personalizedInsight: true,
            personalizedTechnique: true,
            profileComplete: "100%",
            badge: "DIAGNÓSTICO + TÉCNICA",
            successRate: "89% de efectividad"
        },
        note: "Esta es SOLO la primera técnica. El método completo incluye 21 estrategias más."
    },
    
    {
        id: 13,
        question: "¡FELICITACIONES! TU PLAN DE ACCIÓN PERSONALIZADO ESTÁ LISTO",
        description: () => `Basado en tus respuestas específicas, he creado la estrategia exacta para que recuperes a tu amor en 21 días o menos.

${getPersonalized7DayPlan()}`,
        subtext: "Plan personalizado completo + técnica específica",
        options: ["¡QUIERO ACCEDER AL PLAN A COMPLETO!"],
        note: "Lo que acabas de ver son solo los PRIMEROS 7 pasos del Plan A. El método completo incluye 21 días de estrategias específicas para tu caso.",
        elements: {
            planAReveal: true,
            profileComplete: "100%",
            badge: "PLAN A - MÉTODO COMPLETO",
            finalReveal: true,
            planPreview: true,
            continuationTease: true,
            planLayout: true,
            checklist: true,
            methodIntro: true,
        },
        finalReveal: {
            title: "EL PLAN A INCLUYE:",
            features: [
                "✅ 21 días de estrategias específicas para tu caso",
                "✅ Scripts exactos para cada situación posible", 
                "✅ Técnicas avanzadas de psicología de reconquista",
                "✅ Plan B de emergencia si algo sale mal",
                "✅ Soporte personalizado durante todo el proceso"
            ],
            urgency: "Solo 23 spots disponibles hoy para acceso completo",
            socialProof: "3,847 personas han usado el Plan A con éxito"
        }
    }
]

// === RESTO DO CÓDIGO MANTÉM IGUAL ===

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
    "Estas entre el 17% más decidido a reconquistar",
    "Tu perfil muestra alta compatibilidad",
    "El 87% de personas en tu situación lograron resultados en menos de 14 días",
    "Estás más comprometido que el 73% que hizo esta prueba",
    "Solo 23 spots disponibles hoy para este método",
    "3,847 personas recuperaron sus relaciones este año"
]

// Função utilitaria para personalizar textos basados no gênero
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

// Expor funções globalmente para o quiz-step (se necessário)
if (typeof window !== 'undefined') {
    window.getPersonalizedFirstInsight = getPersonalizedFirstInsight;
    window.getPersonalizedTechnique = getPersonalizedTechnique;
    window.getPersonalized7DayPlan = getPersonalized7DayPlan;
    window.getPersonalizedTestimonial = getPersonalizedTestimonial;
}