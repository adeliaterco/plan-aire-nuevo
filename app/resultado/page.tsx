"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  ArrowRight,
  Check,
  Clock,
  Users,
  Heart,
  Play,
  Star,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { enviarEvento } from "../../lib/analytics"

export default function ResultPageExplosive() {
  // ===== ESTADOS =====
  const [isLoaded, setIsLoaded] = useState(false)
  const [userGender, setUserGender] = useState<string>("")
  const [userAnswers, setUserAnswers] = useState<object>({})
  const [recentBuyers, setRecentBuyers] = useState(7)
  const [currentStep, setCurrentStep] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef(Date.now())

  // ===== PERSONALIZAÇÃO BASEADA NO QUIZ =====
  useEffect(() => {
    const savedGender = localStorage.getItem("userGender") || ""
    const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers") || "{}")
    
    setUserGender(savedGender)
    setUserAnswers(savedAnswers)

    setTimeout(() => setIsLoaded(true), 300)

    // Simular compradores
    const interval = setInterval(() => {
      setRecentBuyers(prev => Math.min(prev + Math.floor(Math.random() * 2) + 1, 31))
    }, 35000)

    // ✅ GA4 EVENT: Viu resultado otimizado
    enviarEvento("viu_resultado_otimizado_v2", {
      timestamp: new Date().toISOString(),
      user_gender: savedGender
    })

    // Iniciar o contador de tempo na página
    startTimeRef.current = Date.now()

    // Carregar script Vturb
    loadVTurbScript()

    return () => {
      clearInterval(interval)
      // ✅ GA4 EVENT: Tempo na página ao sair
      const timeSpent = (Date.now() - startTimeRef.current) / 1000
      enviarEvento('tempo_pagina_resultado_v2', {
        tempo_segundos: timeSpent,
        conversao: false
      })
    }
  }, [])

  // ===== PROGRESSÃO AUTOMÁTICA DE STEPS (6 SEGUNDOS CADA) =====
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(2), 6000),   // 6s
      setTimeout(() => setCurrentStep(3), 12000),  // +6s
      setTimeout(() => setCurrentStep(4), 18000),  // +6s
      setTimeout(() => setCurrentStep(5), 24000),  // +6s
      setTimeout(() => setCurrentStep(6), 30000),  // +6s
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  // ===== CARREGAR SCRIPT VTURB =====
  const loadVTurbScript = () => {
    if (!document.querySelector('script[src*="69261bb488d49382e130c0a6"]')) {
      const script = document.createElement("script")
      script.src = "https://scripts.converteai.net/15be01a4-4462-4736-aeb9-b95eda21b8b8/players/69261bb488d49382e130c0a6/v4/player.js"
      script.async = true
      document.head.appendChild(script)
    }
  }

  // ===== FUNÇÕES DE PERSONALIZAÇÃO =====
  const getPronoun = () => userGender === "FEMININO" ? "él" : "ella"
  const getOtherPronoun = () => userGender === "FEMININO" ? "lo" : "la"
  const getOtherWord = () => userGender === "FEMININO" ? "otro" : "otra"

  const getPersonalizedSituation = () => {
    const situation = userAnswers?.question7 || "contacto limitado"
    if (typeof situation === 'string') {
      if (situation.includes("contacto cero")) return "Contacto cero"
      if (situation.includes("ignora")) return "Te ignora"
      if (situation.includes("bloqueado")) return "Bloqueado"
      if (situation.includes("cosas necesarias")) return "Solo cosas necesarias"
      if (situation.includes("charlamos")) return "Charlas ocasionales"
      if (situation.includes("amigos")) return "Solo amigos"
    }
    return "Contacto limitado"
  }

  const getPersonalizedTimeframe = () => {
    const timeframe = userAnswers?.question3 || "1-3 meses"
    return timeframe
  }

  const getPersonalizedFirstInsight = () => {
    const situation = getPersonalizedSituation()
    
    if (situation.includes("Contacto cero")) {
      return `Estás aplicando el "silencio total" pensando que ${getPronoun()} te extrañará automáticamente. ERROR: El silencio sin estrategia solo hace que ${getPronoun()} confirme que fue la decisión correcta dejarte.`
    }
    if (situation.includes("Te ignora")) {
      return `Estás insistiendo con mensajes o intentando "forzar" conversaciones. ERROR: La presión constante activa el sistema de defensa de ${getPronoun()} y la/lo aleja más.`
    }
    if (situation.includes("Bloqueado")) {
      return `Crees que estar bloqueado significa "fin definitivo" y no intentas nada. ERROR: El bloqueo es emocional, no lógico. Existen métodos indirectos que funcionan.`
    }
    if (situation.includes("Solo cosas necesarias")) {
      return `Estás aprovechando cada contacto necesario para "meter conversación personal". ERROR: Mezclar lo práctico con lo emocional hace que ${getPronoun()} evite hasta lo necesario.`
    }
    if (situation.includes("Charlas ocasionales")) {
      return `Te conformas con "charlas de amigos" esperando que ${getPronoun()} recuerde lo que tenían. ERROR: La comodidad de la amistad mata la tensión sexual y romántica que necesitas recrear.`
    }
    if (situation.includes("Solo amigos")) {
      return `Aceptaste ser "solo amigos" esperando demostrar que cambiaste. ERROR: La disponibilidad constante elimina el desafío y la atracción que ${getPronoun()} necesita sentir.`
    }
    
    return `Estás esperando el "momento perfecto" o que ${getPronoun()} haga el primer movimiento. ERROR: Cada día que pasa sin acción estratégica, ${getPronoun()} se aleja emocionalmente.`
  }

  // ===== FUNÇÃO DE COMPRA OTIMIZADA =====
  const handlePurchase = (position = "principal") => {
    const timeToAction = (Date.now() - startTimeRef.current) / 1000
    
    // ✅ GA4 EVENT: Clicou comprar
    enviarEvento("clicou_comprar_otimizado_v2", {
      posicao: position,
      step_atual: currentStep,
      timestamp: new Date().toISOString(),
      user_gender: userGender,
      situacao: getPersonalizedSituation(),
      tempo_ate_acao: timeToAction,
      conversao: true
    })
    
    // ✅ GA4 EVENT: Tempo na página com conversão
    enviarEvento('tempo_pagina_resultado_v2', {
      tempo_segundos: timeToAction,
      conversao: true
    })
    
    setTimeout(() => {
      window.open("https://pay.hotmart.com/F100142422S?off=efckjoa7&checkoutMode=10", "_blank")
    }, 100)
  }

  // ===== FEEDBACK TÁTIL =====
  const handleTouchFeedback = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden w-full max-w-[100vw]">
        
        {/* ===== SEÇÃO 1: NOVA ABERTURA COM FOCO NO ERRO ===== */}
        <div className="mobile-padding bg-gradient-to-r from-red-900/20 to-gray-900/20 w-full">
          <div className="max-w-4xl mx-auto w-full">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              className="text-center mb-8"
            >
              <h1 className="mobile-headline text-white mb-4 leading-tight break-words">
                🚨 <span className="text-red-400">DESCUBRÍ EL ERROR</span> QUE TE ESTÁ ALEJANDO DE {getPronoun().toUpperCase()}
              </h1>
              <p className="mobile-description text-gray-300 mb-6 break-words">
                En los próximos 3 minutos vas a entender exactamente <strong>POR QUÉ {getPronoun()} no ha vuelto</strong>... y QUÉ hacer para cambiar eso de forma definitiva.
              </p>
            </motion.div>

            {/* ERROR ESPECÍFICO */}
            <div className="bg-red-900/30 rounded-xl p-4 mb-8 border-2 border-red-500/50">
              <h3 className="text-red-400 font-bold mobile-subsection-title mb-3 break-words">
                ❌ TU ERROR PRINCIPAL DETECTADO:
              </h3>
              <div className="text-white mobile-info-text">
                <p className="break-words mb-3">
                  {getPersonalizedFirstInsight()}
                </p>
                <p className="text-red-300 font-bold break-words">
                  <strong>87% de hombres en tu situación exacta cometen este mismo error.</strong>
                </p>
              </div>
            </div>

            {/* ANÁLISIS DE SITUACIÓN */}
            <div className="bg-gray-800/80 rounded-xl p-4 mb-8 border-2 border-green-500/50">
              <h3 className="text-green-400 font-bold mobile-subsection-title mb-3 break-words">
                📊 TU SITUACIÓN ANALIZADA:
              </h3>
              <div className="space-y-2 text-white mobile-info-text">
                <p>→ <strong>Tiempo separados:</strong> {getPersonalizedTimeframe()}</p>
                <p>→ <strong>Situación actual:</strong> {getPersonalizedSituation()}</p>
                <p>→ <strong>Protocolo identificado:</strong> Plan A - Recuperación Acelerada</p>
                <p>→ <strong>Tasa de éxito estimada:</strong> <span className="text-green-400 font-bold">89%</span> para tu caso específico</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SECIÓN 1.5: VÍDEO PRINCIPAL CON VTURB ===== */}
        <div className="mobile-padding bg-gradient-to-r from-gray-900 to-black w-full">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-6">
              <h2 className="mobile-section-title font-bold text-white mb-4 max-w-full break-words">
                🎯 <span className="text-orange-400">DESCUBRE</span> LA ESTRATEGIA QUE FUNCIONA
              </h2>
              
              <div className="max-w-2xl mx-auto mb-6 w-full">
                <p className="mobile-description text-gray-300 mb-4 break-words">
                  Mira este video:
                </p>
              </div>
            </div>

            {/* VSL CENTRALIZADA COM VTURB */}
            <div className="flex justify-center mb-6 sm:mb-8 w-full">
              <div className="w-full max-w-3xl">
                <div className="relative bg-black rounded-xl sm:rounded-2xl mobile-video-padding mobile-border-orange shadow-2xl w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl sm:rounded-2xl animate-pulse"></div>
                  <div className="relative z-10 w-full mobile-video-container">
                    <vturb-smartplayer 
                      id="vid-69261bb488d49382e130c0a6" 
                      className="mobile-vturb-player"
                    ></vturb-smartplayer>
                  </div>
                </div>
              </div>
            </div>

            {/* BARRA DE PROGRESSO CON COPY CONVERSIVO */}
            <AnimatePresence>
              {currentStep < 3 && (
                <div className="text-center mb-8 max-w-md mx-auto">
                  <div className="text-gray-300 mobile-small-text mb-3 break-words font-semibold">
                    ⏳ ANALIZANDO TU CASO Y DESBLOQUEANDO TU PLAN PERSONALIZADO...
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 max-w-md mx-auto overflow-hidden border border-orange-500">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  </div>
                  <p className="text-gray-400 mobile-small-text mt-3 break-words italic">
                    Esto garantiza que recibas exactamente lo que necesitas para tu situación...
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ===== SEÇÃO 2: TÉCNICA EXACTA PARA TU CASO ===== */}
        <div className="mobile-padding w-full">
          <div className="max-w-4xl mx-auto w-full">
            
            <h2 className="mobile-section-title font-bold text-white text-center mb-8 break-words">
              ✅ LA <span className="text-green-400">TÉCNICA EXACTA</span> PARA TU CASO ESPECÍFICO
            </h2>
            <p className="text-center text-gray-300 mobile-description mb-6 break-words">
              Basándome en tus 8 respuestas, esta es la estrategia que tiene 89% de éxito en casos como el tuyo:
            </p>

            <div className="space-y-6 mb-8">
              
              {/* STEP 1 - Siempre Visible */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-xl p-6 border-l-4 border-blue-400"
              >
                <h3 className="text-blue-400 font-bold mobile-subsection-title mb-3 break-words">
                  DÍAS 8-10: TÉCNICA DE "RECONEXIÓN EMOCIONAL"
                </h3>
                <div className="text-white mobile-info-text space-y-2">
                  <p>→ <strong>Mensaje exacto específico para tu situación:</strong></p>
                  <div className="bg-black/30 p-3 rounded-lg italic text-green-300 break-words">
                    "{userGender === 'MASCULINO' ? 
                      `"Hey [nombre], encontré una foto nuestra de [memoria específica]. Me hizo sonreír. Espero que estés bien."` :
                      `"Hola [nombre], vi algo que me recordó a [memoria específica]. Me alegró el día. Espero que tengas una buena semana."`
                    }"
                  </div>
                  <p>→ <strong>Timing perfecto:</strong> Enviar martes o miércoles a las 7:30 PM</p>
                  <p>→ <strong>Qué esperar:</strong> 73% de respuesta positiva en casos similares</p>
                </div>
              </motion.div>

              {/* STEP 2 - Aparece após 6s */}
              <AnimatePresence>
                {currentStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl p-6 border-l-4 border-purple-400"
                  >
                    <h3 className="text-purple-400 font-bold mobile-subsection-title mb-3 break-words">
                      DÍAS 11-14: PROTOCOLO DE "ENCUENTRO CASUAL"
                    </h3>
                    <div className="text-white mobile-info-text space-y-2">
                      <p>→ <strong>Lugar estratégico:</strong> [Local frecuentado por {getPronoun()}]</p>
                      <p>→ <strong>Guión de conversación:</strong> 3 frases exactas que reactivan la atracción</p>
                      <p>→ <strong>Lenguaje corporal específico:</strong> Posiciones que generan nostalgia inconsciente</p>
                      <p>→ <strong>Exit strategy:</strong> Cómo terminar la conversación para que {getPronoun()} quiera más</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STEP 3 - Aparece após 12s */}
              <AnimatePresence>
                {currentStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-orange-900/50 to-orange-800/50 rounded-xl p-6 border-l-4 border-orange-400"
                  >
                    <h3 className="text-orange-400 font-bold mobile-subsection-title mb-3 break-words">
                      DÍAS 15-21: FASE DE "RECONCILIACIÓN DEFINITIVA"
                    </h3>
                    <div className="text-white mobile-info-text space-y-2">
                      <p>→ <strong>Los 21 Disparadores Emocionales:</strong> Frases que rompen la resistencia final</p>
                      <p>→ <strong>Momento exacto para la declaración:</strong> Cuándo y cómo expresar tus sentimientos</p>
                      <p>→ <strong>Protocolo anti-rechazo:</strong> Qué hacer si {getPronoun()} aún tiene dudas</p>
                      <p>→ <strong>Plan de relación 2.0:</strong> Cómo hacer que la nueva relación sea mejor que antes</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ===== SECIÓN 3: OFERTA IRRESISTÍVEL (MOVIDA PARA CIMA) ===== */}
        <AnimatePresence>
          {currentStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mobile-padding bg-gradient-to-r from-orange-600 to-red-600 w-full"
            >
              <div className="max-w-4xl mx-auto w-full">
                
                <Card className="bg-black/80 text-white shadow-2xl mobile-border-yellow w-full backdrop-blur-sm">
                  <CardContent className="mobile-offer-padding text-center w-full">
                    
                    <div className="bg-yellow-400 text-black font-bold mobile-offer-badge rounded-full inline-block mb-6">
                      🎯 ACCESO COMPLETO AL PLAN A
                    </div>

                    <h2 className="mobile-offer-title font-black mb-6 text-white break-words">
                      RECUPERA A {getPronoun().toUpperCase()} EN LOS PRÓXIMOS 21 DÍAS
                    </h2>

                    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg p-6 mb-6 border border-green-500/50">
                      <h3 className="text-green-400 font-bold mobile-subsection-title mb-4 break-words">
                        🎁 TODO LO QUE RECIBES HOY:
                      </h3>
                      
                      <div className="text-left space-y-3 max-w-2xl mx-auto">
                        <div className="flex items-start text-white mobile-feature-text break-words">
                          <TrendingUp className="mobile-check-icon text-green-400 mr-3 flex-shrink-0 mt-1" />
                          <span><strong>Plan A Completo:</strong> Los 14 protocolos específicos para tu caso (Valor: $97)</span>
                        </div>
                        
                        <div className="flex items-start text-white mobile-feature-text break-words">
                          <Check className="mobile-check-icon text-green-400 mr-3 flex-shrink-0 mt-1" />
                          <span><strong>21 Disparadores Emocionales:</strong> Las frases exactas que funcionan (Valor: $47)</span>
                        </div>
                        
                        <div className="flex items-start text-white mobile-feature-text break-words">
                          <Check className="mobile-check-icon text-green-400 mr-3 flex-shrink-0 mt-1" />
                          <span><strong>Protocolo de Emergencia 72H:</strong> Para casos críticos (Valor: $37)</span>
                        </div>
                        
                        <div className="flex items-start text-white mobile-feature-text break-words">
                          <Check className="mobile-check-icon text-green-400 mr-3 flex-shrink-0 mt-1" />
                          <span><strong>Scripts Personalizados:</strong> Para tu situación específica (Valor: $67)</span>
                        </div>
                        
                        <div className="flex items-start text-white mobile-feature-text break-words">
                          <Check className="mobile-check-icon text-green-400 mr-3 flex-shrink-0 mt-1" />
                          <span><strong>Soporte Directo conmigo:</strong> Dudas y seguimiento (Valor: $197)</span>
                        </div>
                        
                        <div className="border-t border-gray-600 pt-3 mt-4">
                          <p className="text-gray-400 mobile-small-text mb-2">Valor Total: $445</p>
                          <p className="text-green-400 font-bold mobile-description">Tu inversión hoy: Solo $12,99</p>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      className="mb-6 w-full"
                    >
                      <Button
                        onClick={() => handlePurchase("oferta_principal")}
                        size="lg"
                        className="mobile-cta-offer"
                        onTouchStart={handleTouchFeedback}
                      >
                        <Heart className="mobile-icon-size mr-2 flex-shrink-0" />
                        <div className="text-center break-words">
                          <div className="mobile-cta-offer-text leading-tight font-black">
                            💔 SÍ, QUIERO DEJAR DE SUFRIR Y RECUPERAR{getOtherPronoun().toUpperCase()}
                          </div>
                          <div className="mobile-small-text mt-1 opacity-90">
                            Plan específico para: {getPersonalizedSituation()}
                          </div>
                        </div>
                      </Button>
                    </motion.div>

                    <div className="bg-red-900/80 mobile-urgency-padding rounded-lg mb-6 border border-red-500">
                      <p className="text-yellow-300 font-bold mobile-urgency-text mb-2 break-words">
                        ⏰ PRECIO ESPECIAL EXPIRA EN:
                      </p>
                      <div className="mobile-countdown font-black text-white mb-2">
                        <CountdownTimer minutes={47} seconds={0} />
                      </div>
                      <p className="text-red-300 mobile-small-text break-words">
                        Después vuelve a $67. No lo dejes para mañana.
                      </p>
                    </div>

                    <div className="flex justify-center items-center space-x-4 mobile-social-text text-gray-300 mb-4 flex-wrap gap-2">
                      <div className="flex items-center break-words">
                        <Users className="mobile-social-icon text-green-400 mr-1" />
                        <span><strong className="text-white">{recentBuyers}</strong> personas compraron hoy</span>
                      </div>
                      <div className="flex items-center break-words">
                        <Heart className="mobile-social-icon text-red-400 mr-1" />
                        <span><strong className="text-white">89%</strong> ya vio resultados</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 4: PROVA SOCIAL MELHORADA ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mobile-padding bg-gradient-to-r from-gray-900 to-black w-full"
            >
              <div className="max-w-4xl mx-auto w-full">
                
                <h2 className="mobile-section-title font-bold text-white text-center mb-8 break-words">
                  💕 <span className="text-pink-400">CASOS DE ÉXITO</span> CON TU MISMA SITUACIÓN
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  
                  {/* CARD 1 - Miguel D. */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-start space-x-4">
                      <img 
                        src="https://i.ibb.co/cK6m4D9g/Generatedimage-1764386997197.png" 
                        alt="Testimonio" 
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold mobile-info-text mb-2 break-words">Miguel D., 33 años - Colombia</h4>
                        <p className="text-gray-300 mobile-small-text mb-3 break-words">
                          <span className="text-yellow-400">Situación:</span> Contacto cero desde hace 2 meses
                        </p>
                        <p className="text-white mobile-info-text italic mb-3 break-words">
                          "Estaba 2 meses en contacto cero sin saber qué hacer. El Plan A me enseñó QUÉ mensaje enviar y CUÁNDO. A los 4 días {getPronoun()} respondió preguntando cómo estaba. A los 11 días me pidió que nos viéramos. <strong>La diferencia fue tener un mensaje exacto, no suplicar.</strong> Hoy estamos de vuelta y mejor que antes."
                        </p>
                        <div className="flex items-center mt-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-green-400 mobile-small-text ml-2 font-bold">✅ Recuperó su relación</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2 - Gustavo R. */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-start space-x-4">
                      <img 
                        src="https://i.ibb.co/gZDzThc8/Generatedimage-1764386812007.png" 
                        alt="Testimonio" 
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold mobile-info-text mb-2 break-words">Gustavo R., 29 años - Perú</h4>
                        <p className="text-gray-300 mobile-small-text mb-3 break-words">
                          <span className="text-yellow-400">Situación:</span> {getPronoun()} estaba con otro/otra hace 3 meses
                        </p>
                        <p className="text-white mobile-info-text italic mb-3 break-words">
                          "Mi situación parecía completamente perdida. {getPronoun()} llevaba 3 meses con esta otra persona. Pensé que había perdido para siempre. Pero el Protocolo Anti-Terceros del Plan A me mostró exactamente qué hacer. Día 1-7: diferenciación. Día 8-12: reactivación. Día 13: {getPronoun()} empezó a cuestionarse. Día 16: {getPronoun()} me escribió. <strong>Hoy dejó a ese tipo y estamos viviendo juntos.</strong>"
                        </p>
                        <div className="flex items-center mt-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-green-400 mobile-small-text ml-2 font-bold">✅ Recuperó su relación</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* ESTATÍSTICAS */}
                <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl p-6 mb-6 border border-green-500/30">
                  <h3 className="text-green-400 font-bold mobile-subsection-title text-center mb-4 break-words">
                    📊 RESULTADOS COMPROBADOS EN CASOS COMO EL TUYO:
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="mobile-stats-number font-bold text-green-400 mb-1">89%</div>
                      <p className="text-white mobile-stats-text break-words">Éxito en tu situación</p>
                    </div>
                    <div>
                      <div className="mobile-stats-number font-bold text-blue-400 mb-1">16</div>
                      <p className="text-white mobile-stats-text break-words">Días promedio</p>
                    </div>
                    <div>
                      <div className="mobile-stats-number font-bold text-orange-400 mb-1">2.847</div>
                      <p className="text-white mobile-stats-text break-words">Éxitos este año</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 5: TRATAMENTO DE OBJEÇÕES ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mobile-padding w-full bg-gray-900/50"
            >
              <div className="max-w-4xl mx-auto w-full">
                <h2 className="mobile-section-title font-bold text-white text-center mb-8 break-words">
                  🤔 <span className="text-yellow-400">"PERO... ¿Y SI MI CASO ES DIFERENTE?"</span>
                </h2>

                <div className="space-y-6 mb-8">
                  
                  {/* Objeção 1 */}
                  <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-yellow-400">
                    <h3 className="text-yellow-400 font-bold mobile-subsection-title mb-3 break-words">
                      💭 "¿Y si {getPronoun()} ya me olvidó completamente?"
                    </h3>
                    <p className="text-white mobile-info-text break-words">
                      <strong>REALIDAD:</strong> Imposible. El 91% de mujeres siguen pensando en su ex los primeros 6 meses. 
                      Tu caso específico: <strong>{getPersonalizedTimeframe()}</strong> = alta probabilidad de que tengas recuerdos activos en su mente.
                    </p>
                  </div>

                  {/* Objeção 2 */}
                  <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-400">
                    <h3 className="text-blue-400 font-bold mobile-subsection-title mb-3 break-words">
                      💔 "¿Y si {getPronoun()} está con {getOtherWord()} persona y es feliz?"
                    </h3>
                    <p className="text-white mobile-info-text break-words">
                      <strong>ESTADÍSTICA:</strong> El 67% de relaciones rebote duran menos de 3 meses. Además, tengo técnicas específicas 
                      para casos con terceras personas (como viste en el testimonio de Gustavo).
                    </p>
                  </div>

                  {/* Objeção 3 */}
                  <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-400">
                    <h3 className="text-green-400 font-bold mobile-subsection-title mb-3 break-words">
                      😰 "¿Y si aplico el método y empeoro las cosas?"
                    </h3>
                    <p className="text-white mobile-info-text break-words">
                      <strong>GARANTÍA:</strong> Por eso existe la garantía de 30 días. Si el Plan A no funciona, 
                      te devuelvo el dinero + te doy una consulta personal gratuita.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 6: GARANTIA PODEROSA ===== */}
        <AnimatePresence>
          {currentStep >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mobile-padding bg-gradient-to-r from-green-900/30 to-emerald-900/30 w-full"
            >
              <div className="max-w-4xl mx-auto w-full">
                <Card className="bg-green-50 mobile-border-green shadow-2xl w-full">
                  <CardContent className="mobile-guarantee-padding text-center w-full">
                    <Shield className="mobile-shield-icon text-green-600 mx-auto mb-4" />
                    
                    <h2 className="mobile-guarantee-title font-bold text-green-800 mb-4 break-words">
                      GARANTÍA INCONDICIONAL DE 30 DÍAS
                    </h2>
                    
                    <p className="text-green-700 mobile-guarantee-text font-bold mb-4 break-words">
                      Si en 30 días no ves progreso real con {getPronoun()}, te devuelvo el 100% de tu dinero
                    </p>
                    
                    <div className="bg-white rounded-lg p-4 border-2 border-green-500">
                      <p className="text-green-800 mobile-guarantee-desc font-semibold break-words">
                        <strong>Mi promesa personal:</strong> Si sigues el Plan A y no funciona, no solo te devuelvo el dinero, 
                        te doy una consulta personal gratuita para revisar tu caso específico.
                      </p>
                    </div>
                    
                    <p className="text-green-600 mobile-small-text mt-4 break-words">
                      Tienes 30 días completos para probarlo. Sin preguntas, sin problemas.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 7: MOMENTO DE DECISIÓN ===== */}
        <AnimatePresence>
          {currentStep >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mobile-padding bg-gradient-to-r from-red-900/50 to-black w-full"
            >
              <div className="max-w-4xl mx-auto w-full">
                
                <h2 className="mobile-section-title font-bold text-white text-center mb-8 break-words">
                  ⚡ <span className="text-red-400">{getPronoun().toUpperCase()} ESTÁ DECIDIENDO</span> SU FUTURO AMOROSO AHORA MISMO
                </h2>

                <p className="text-white mobile-description text-center mb-8 break-words">
                  Cada día que pasa sin aplicar el método correcto, {getPronoun()} se aleja más emocionalmente. 
                  <strong>Tienes que elegir AHORA:</strong>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  
                  {/* Opción 1 */}
                  <div className="bg-red-900/30 rounded-xl p-6 border-2 border-red-500/50">
                    <h3 className="text-red-400 font-bold mobile-subsection-title mb-4 break-words">
                      ❌ OPCIÓN 1: Seguir Como Hasta Ahora
                    </h3>
                    <div className="space-y-2 text-white mobile-info-text">
                      <p className="break-words">→ {getPronoun()} sigue alejándose cada día</p>
                      <p className="break-words">→ Cada semana es más difícil</p>
                      <p className="break-words">→ Puede conocer a {getOtherWord()} persona</p>
                      <p className="break-words">→ El dolor y arrepentimiento aumentan</p>
                      <p className="break-words">→ En 6 meses será demasiado tarde</p>
                    </div>
                  </div>

                  {/* Opción 2 */}
                  <div className="bg-green-900/30 rounded-xl p-6 border-2 border-green-500/50">
                    <h3 className="text-green-400 font-bold mobile-subsection-title mb-4 break-words">
                      ✅ OPCIÓN 2: Aplicar el Plan A
                    </h3>
                    <div className="space-y-2 text-white mobile-info-text">
                      <p className="break-words">→ Técnicas específicas para tu caso exacto</p>
                      <p className="break-words">→ 89% de éxito en situaciones como la tuya</p>
                      <p className="break-words">→ Resultados visibles en 21 días</p>
                      <p className="break-words">→ Garantía incondicional de 30 días</p>
                      <p className="break-words">→ Soporte directo conmigo</p>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-yellow-900/30 rounded-lg p-4 border border-yellow-500/50">
                  <p className="text-yellow-300 font-bold mobile-description break-words">
                    La pregunta no es si puedes recuperar{getOtherPronoun()}. Es si VAS a hacerlo.
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 8: CTA FINAL IRRESISTÍVEL ===== */}
        <AnimatePresence>
          {currentStep >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mobile-padding bg-gradient-to-r from-red-600 via-red-700 to-orange-600 w-full"
            >
              <div className="max-w-4xl mx-auto text-center w-full">
                
                <div className="bg-black/80 backdrop-blur-sm rounded-2xl mobile-final-padding border-2 border-yellow-400 w-full">
                  
                  <h2 className="mobile-final-title font-black text-white mb-4 break-words">
                    ⚡ ÚLTIMO AVISO - DECIDE AHORA
                  </h2>
                  
                  <p className="mobile-final-subtitle text-white mb-6 font-bold break-words">
                    Mientras lees esto, {getPronoun()} está tomando decisiones sobre su vida amorosa.
                  </p>
                  
                  <div className="bg-yellow-600/20 border border-yellow-400 rounded-lg p-4 mb-6">
                    <p className="text-yellow-300 mobile-info-text font-bold mb-2 break-words">
                      🤔 PIENSA EN ESTO:
                    </p>
                    <p className="text-white mobile-description break-words">
                      ¿Cuánto vale recuperar a la persona que amas? ¿$12,99 o años de arrepentimiento?
                    </p>
                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="w-full mb-6"
                  >
                    <Button
                      onClick={() => handlePurchase("cta_final_explosivo")}
                      size="lg"
                      className="mobile-cta-final"
                      onTouchStart={handleTouchFeedback}
                    >
                      <div className="text-center break-words">
                        <div className="mobile-cta-final-text leading-tight font-black">
                          ⚡ SÍ, QUIERO EL PLAN A COMPLETO AHORA
                        </div>
                        <div className="mobile-small-text mt-1 opacity-90">
                          Antes de que {getPronoun()} tome otra decisión definitiva
                        </div>
                      </div>
                      <ArrowRight className="mobile-icon-size ml-2 flex-shrink-0" />
                    </Button>
                  </motion.div>

                  <p className="text-yellow-300 mobile-final-warning font-bold break-words">
                    No dejes que {getPronoun()} se aleje definitivamente. Actúa ahora.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== CSS GLOBAL ===== */}
        <style jsx global>{`
          /* Reset e Base Mobile-First */
          * {
            box-sizing: border-box !important;
            max-width: 100% !important;
          }

          html {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100%;
            margin: 0;
            padding: 0;
          }

          /* Padding e Spacing */
          .mobile-padding {
            padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-card-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-offer-padding {
            padding: clamp(1rem, 4vw, 2rem);
          }

          .mobile-price-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-stats-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-urgency-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-guarantee-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-final-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          /* CSS para Vídeo */
          .mobile-video-padding {
            padding: clamp(0.5rem, 2vw, 1rem);
          }

          .mobile-video-container {
            width: 100% !important;
            max-width: 100% !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
          }

          .mobile-vturb-player {
            display: block !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            aspect-ratio: 16/9 !important;
            height: auto !important;
            min-height: clamp(200px, 40vw, 400px) !important;
          }

          vturb-smartplayer {
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            aspect-ratio: 16/9 !important;
            contain: layout style paint !important;
            min-height: clamp(200px, 40vw, 400px) !important;
          }

          .mobile-border-orange {
            border: clamp(1px, 0.5vw, 2px) solid rgb(249 115 22);
          }

          /* Tipografia */
          .mobile-headline {
            font-size: clamp(1.5rem, 6vw, 3rem);
            line-height: 1.2;
            font-weight: 900;
          }

          .mobile-section-title {
            font-size: clamp(1.25rem, 5vw, 2rem);
            line-height: 1.3;
          }

          .mobile-subsection-title {
            font-size: clamp(1.125rem, 4vw, 1.5rem);
            line-height: 1.3;
          }

          .mobile-offer-title {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            line-height: 1.2;
          }

          .mobile-final-title {
            font-size: clamp(1.5rem, 5vw, 2rem);
            line-height: 1.2;
          }

          .mobile-guarantee-title {
            font-size: clamp(1.125rem, 4vw, 1.5rem);
            line-height: 1.3;
          }

          .mobile-description {
            font-size: clamp(1rem, 3vw, 1.125rem);
            line-height: 1.5;
          }

          .mobile-info-text {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-small-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.4;
          }

          .mobile-feature-text {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-price-main {
            font-size: clamp(2.5rem, 8vw, 3.75rem);
            line-height: 1;
          }

          .mobile-price-sub {
            font-size: clamp(1rem, 3vw, 1.25rem);
            line-height: 1.3;
          }

          .mobile-stats-number {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1.2;
          }

          .mobile-stats-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.3;
          }

          .mobile-countdown {
            font-size: clamp(1.5rem, 5vw, 2rem);
            line-height: 1.2;
          }

          .mobile-urgency-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-social-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.3;
          }

          .mobile-guarantee-text {
            font-size: clamp(1rem, 3vw, 1.125rem);
            line-height: 1.4;
          }

          .mobile-guarantee-desc {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.4;
          }

          .mobile-final-subtitle {
            font-size: clamp(1rem, 3vw, 1.25rem);
            line-height: 1.4;
          }

          .mobile-final-warning {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1.3;
          }

          /* Elementos */
          .mobile-circle {
            width: clamp(5rem, 15vw, 6rem);
            height: clamp(5rem, 15vw, 6rem);
          }

          .mobile-percentage {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1;
          }

          /* Ícones */
          .mobile-icon-size {
            width: clamp(1.25rem, 4vw, 1.5rem);
            height: clamp(1.25rem, 4vw, 1.5rem);
          }

          .mobile-check-icon {
            width: clamp(1rem, 3vw, 1.25rem);
            height: clamp(1rem, 3vw, 1.25rem);
          }

          .mobile-social-icon {
            width: clamp(0.75rem, 2.5vw, 1rem);
            height: clamp(0.75rem, 2.5vw, 1rem);
          }

          .mobile-shield-icon {
            width: clamp(3rem, 8vw, 4rem);
            height: clamp(3rem, 8vw, 4rem);
          }

          /* Bordas */
          .mobile-border-yellow {
            border: clamp(2px, 1vw, 4px) solid rgb(250 204 21) !important;
          }

          .mobile-border-green {
            border: clamp(2px, 1vw, 4px) solid rgb(34 197 94) !important;
          }

          /* Grid */
          .mobile-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(0.5rem, 2vw, 1rem);
          }

          /* Botões */
          .mobile-cta-offer,
          .mobile-cta-final {
            width: 100% !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
            transition: all 0.3s ease !important;
          }

          .mobile-cta-offer {
            background: rgb(234 179 8) !important;
            color: black !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1.125rem, 4vw, 1.5rem) !important;
            border: clamp(2px, 1vw, 4px) solid white !important;
            min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
            max-width: 32rem !important;
            margin: 0 auto !important;
          }

          .mobile-cta-final {
            background: rgb(234 179 8) !important;
            color: black !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1.125rem, 4vw, 1.5rem) !important;
            border: clamp(2px, 1vw, 4px) solid white !important;
            min-height: clamp(3.75rem, 14vw, 4.5rem) !important;
            max-width: 28rem !important;
            margin: 0 auto !important;
          }

          .mobile-cta-offer:hover,
          .mobile-cta-final:hover {
            background: rgb(202 138 4) !important;
            transform: scale(1.02) !important;
          }

          .mobile-cta-final:hover {
            transform: scale(1.05) !important;
          }

          .mobile-cta-offer-text,
          .mobile-cta-final-text {
            font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
            line-height: 1.2 !important;
            font-weight: 800 !important;
          }

          /* Performance */
          .bg-gradient-to-r,
          .bg-gradient-to-br {
            will-change: transform !important;
            backface-visibility: hidden !important;
            transform: translateZ(0) !important;
          }

          /* iOS */
          @supports (-webkit-touch-callout: none) {
            input,
            select,
            textarea {
              font-size: 16px !important;
            }
          }

          /* Scroll */
          html {
            scroll-behavior: smooth !important;
          }

          /* Texto */
          .break-words {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            word-break: break-word !important;
          }

          /* Imagens */
          img,
          video {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
          }

          /* Touch */
          button,
          a,
          [role="button"] {
            min-height: 44px !important;
            min-width: 44px !important;
          }

          /* Container limits */
          .min-h-screen {
            max-width: 100vw !important;
            width: 100% !important;
          }

          .max-w-4xl {
            max-width: 100% !important;
            width: 100% !important;
          }

          @media (min-width: 640px) {
            .max-w-4xl { max-width: 56rem !important; }
            .max-w-3xl { max-width: 48rem !important; }
            .max-w-2xl { max-width: 42rem !important; }
            .max-w-md { max-width: 28rem !important; }
            .max-w-sm { max-width: 24rem !important; }
          }

          /* Dark mode */
          @media (prefers-color-scheme: dark) {
            .bg-green-50 {
              background-color: rgb(20 83 45) !important;
            }

            .text-green-800 {
              color: rgb(187 247 208) !important;
            }

            .text-green-700 {
              color: rgb(134 239 172) !important;
            }
          }

          /* Acessibilidade */
          @media (prefers-reduced-motion: reduce) {
            .animate-pulse,
            .animate-bounce {
              animation: none !important;
            }
          }

          /* Mobile pequeno */
          @media (max-width: 375px) {
            .mobile-headline {
              font-size: 1.25rem !important;
            }

            .mobile-section-title {
              font-size: 1.125rem !important;
            }

            .mobile-offer-title {
              font-size: 1.25rem !important;
            }

            .mobile-price-main {
              font-size: 2rem !important;
            }

            .mobile-grid {
              gap: 0.25rem !important;
            }
          }

          @media (min-width: 640px) {
            .mobile-padding {
              padding: 2rem 1rem !important;
            }

            .mobile-grid {
              gap: 1rem !important;
            }
          }
        `}</style>
      </div>
    </>
  )
}