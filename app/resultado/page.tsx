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
  Lock,
  TrendingUp,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { enviarEvento } from "../../lib/analytics"

export default function ResultPageOptimized() {
  // ===== ESTADOS ORIGINAIS =====
  const [isLoaded, setIsLoaded] = useState(false)
  const [recentBuyers, setRecentBuyers] = useState(7)
  const [userGender, setUserGender] = useState<string>("")
  const [userAnswers, setUserAnswers] = useState<object>({})
  const contentRef = useRef<HTMLDivElement>(null)

  // ===== ESTADO DO OVERLAY =====
  const [showOverlay, setShowOverlay] = useState(true)
  const [unlockTimer, setUnlockTimer] = useState(20)
  const [accessCount, setAccessCount] = useState(31)

  // ===== PROGRESSÃO AUTOMÁTICA DE STEPS =====
  const [currentStep, setCurrentStep] = useState(1)

  // ===== DEBUG MODE =====
  const debugGA = true

  // ===== FUNÇÃO PARA ENVIAR EVENTOS =====
  const enviarEventoComLog = (evento, dados = {}) => {
    try {
      if (debugGA) {
        console.log(`🎯 GA Event: ${evento}`, dados)
      }
      enviarEvento(evento, dados)
    } catch (error) {
      console.error(`❌ Erro no evento ${evento}:`, error)
    }
  }

  // ===== CARREGAR DADOS DO QUIZ =====
  useEffect(() => {
    const savedGender = localStorage.getItem("userGender")
    const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers") || "{}")
    
    if (savedGender) setUserGender(savedGender)
    setUserAnswers(savedAnswers)

    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Simular compradores recentes
    const interval = setInterval(() => {
      setRecentBuyers((prev) => {
        const increase = Math.floor(Math.random() * 2) + 1
        return Math.min(prev + increase, 23)
      })
    }, 45000)

    // Evento de visualização
    setTimeout(() => {
      enviarEventoComLog("viu_resultado", {
        timestamp: new Date().toISOString(),
        user_gender: savedGender || "unknown",
        user_answers: savedAnswers
      })
    }, 1000)

    // Carregar script do Vturb
    const loadVTurbScript = () => {
      if (!document.querySelector('script[src*="69261bb488d49382e130c0a6"]')) {
        const script = document.createElement("script")
        script.src = "https://scripts.converteai.net/15be01a4-4462-4736-aeb9-b95eda21b8b8/players/69261bb488d49382e130c0a6/v4/player.js"
        script.async = true
        document.head.appendChild(script)
      }
    }

    loadVTurbScript()

    return () => clearInterval(interval)
  }, [])

  // ===== PROGRESSÃO AUTOMÁTICA (8s, 16s, 24s) =====
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(2), 8000),
      setTimeout(() => setCurrentStep(3), 16000),
      setTimeout(() => setCurrentStep(4), 24000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  // ===== TIMER DE DESBLOQUEIO =====
  useEffect(() => {
    if (showOverlay && unlockTimer > 0) {
      const timer = setTimeout(() => {
        setUnlockTimer(prev => prev - 1)
      }, 1000)
      
      return () => clearTimeout(timer)
    } else if (showOverlay && unlockTimer <= 0) {
      setShowOverlay(false)
      
      enviarEventoComLog("pagina_desbloqueada", {
        tempo_espera: 20,
        timestamp: new Date().toISOString()
      })
      
      setTimeout(() => {
        enviarEventoComLog("viu_resultado_completo", {
          timestamp: new Date().toISOString()
        })
      }, 500)
    }
  }, [unlockTimer, showOverlay])

  // ===== SIMULAR DIMINUIÇÃO DE ACESSOS =====
  useEffect(() => {
    const interval = setInterval(() => {
      setAccessCount(prev => Math.max(prev - 1, 15))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // ===== FUNÇÕES DE PERSONALIZAÇÃO =====
  const getPersonalizedPronoun = () => {
    return userGender === "FEMININO" ? "él" : "ella"
  }

  const getPersonalizedOther = () => {
    return userGender === "FEMININO" ? "otra" : "otro"
  }

  const getPersonalizedSituation = () => {
    const situation = userAnswers?.question7 || "contacto limitado"
    if (situation.includes("contacto cero")) return "Contacto cero"
    if (situation.includes("ignora")) return "Te ignora"
    if (situation.includes("bloqueado")) return "Bloqueado"
    if (situation.includes("cosas necesarias")) return "Solo cosas necesarias"
    if (situation.includes("charlamos")) return "Charlas ocasionales"
    if (situation.includes("amigos")) return "Solo amigos"
    return "Contacto limitado"
  }

  const getPersonalizedTimeframe = () => {
    const timeframe = userAnswers?.question3 || "1-3 meses"
    return timeframe
  }

  const getPersonalizedFirstStep = () => {
    const situation = userAnswers?.question7 || ""
    
    if (situation.includes("contacto cero")) {
      return "RUPTURA DEL SILENCIO MAGNÉTICO"
    }
    if (situation.includes("ignora")) {
      return "MENSAJE DE CURIOSIDAD IRRESISTIBLE"
    }
    if (situation.includes("bloqueado")) {
      return "PROTOCOLO DE DESBLOQUEO"
    }
    return "REACTIVACIÓN EMOCIONAL"
  }

  const getPersonalizedSecondStep = () => {
    return "TÉCNICA DE RECONEXIÓN EMOCIONAL"
  }

  const getPersonalizedThirdStep = () => {
    return "PROTOCOLO DE ENCUENTRO CASUAL"
  }

  const getPersonalizedFourthStep = () => {
    return "FASE DE RECONCILIACIÓN DEFINITIVA"
  }

  // ===== FUNÇÃO DE COMPRA =====
  const handlePurchase = (posicao = "principal") => {
    try {
      enviarEventoComLog("clicou_comprar", {
        posicao: posicao,
        overlay_ativo: showOverlay,
        timestamp: new Date().toISOString(),
        user_gender: userGender || "unknown",
        access_count: accessCount,
        timer_remaining: unlockTimer,
        current_step: currentStep
      })
      
      if (debugGA) {
        console.log("🛒 Compra iniciada:", { 
          posicao, 
          overlay_ativo: showOverlay,
          timer_remaining: unlockTimer,
          current_step: currentStep
        })
      }
    } catch (error) {
      console.error("❌ Error al registrar evento de clic:", error)
    }
    
    setTimeout(() => {
      window.open("https://pay.hotmart.com/F100142422S?off=efckjoa7&checkoutMode=10", "_blank")
    }, 150)
  }

  const handleTouchFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden w-full max-w-[100vw] mobile-container relative" ref={contentRef}>
        
        {/* ===== SEÇÃO 1: HEADER DE URGÊNCIA ===== */}
        <div className="relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-orange-600/30 animate-pulse"></div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            className="relative z-10 mobile-padding text-center w-full"
          >
            
            <h1 className="mobile-headline text-white mb-4 sm:mb-6 leading-tight max-w-full break-words">
              🚨 <span className="text-red-400">ÚLTIMA CHANCE:</span>
              <br />
              {getPersonalizedPronoun()} está con {getPersonalizedOther()} <span className="text-yellow-400">HOY</span>...
              <br />
              o tú haces que {getPersonalizedPronoun()} <span className="text-green-400">rastree ahora</span>
            </h1>

            <div className="bg-red-900/80 rounded-xl p-4 mb-6 border-2 border-red-500 max-w-md mx-auto">
              <div className="space-y-3">
                <div className="bg-black/50 rounded-lg p-3">
                  <p className="text-red-300 font-bold mobile-description mb-2">
                    ⏰ ESTA PÁGINA SE DESCONECTA EN:
                  </p>
                  <div className="mobile-countdown font-black text-white">
                    <CountdownTimer minutes={57} seconds={23} />
                  </div>
                </div>

                <div className="bg-orange-900/50 rounded-lg p-2 border border-orange-500">
                  <p className="text-orange-300 font-bold mobile-small-text">
                    🔥 Solo <span className="text-white">{accessCount} accesos</span> restantes hoy
                  </p>
                </div>

                <div className="bg-yellow-600 rounded-lg p-3">
                  <p className="text-black font-bold mobile-small-text mb-1">
                    ⚠️ PARA DESBLOQUEAR TU RESULTADO:
                  </p>
                  <p className="text-black mobile-small-text font-semibold">
                    Mira el video abajo y espera el tiempo
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== SECIÓN 2: VÍDEO PRINCIPAL ===== */}
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

            <div className="bg-orange-600 rounded-xl p-4 mb-6 border-2 border-yellow-400 max-w-md mx-auto">
              <div className="text-center">
                <p className="text-black font-bold mobile-description mb-2">
                  ⏳ ESPERA... EL ACCESO SERÁ LIBERADO
                </p>
                <p className="text-black mobile-small-text font-semibold mb-3">
                  Es importante ver parte del video para garantizar el mejor resultado
                </p>
                
                <div className="bg-black/20 rounded-lg p-3 mb-3">
                  <p className="text-black font-bold mobile-small-text mb-1">
                    LIBERANDO ACCESO EN:
                  </p>
                  <div className="text-black font-black text-2xl">
                    {Math.floor(unlockTimer / 60)}:{(unlockTimer % 60).toString().padStart(2, '0')}
                  </div>
                </div>

                <p className="text-black mobile-small-text font-semibold">
                  {unlockTimer > 0 ? "Mantén esta página abierta" : "¡Desbloqueando resultado!"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SECIÓN 3: PRÓXIMOS PASOS PROGRESIVOS ===== */}
        <div className="mobile-padding bg-gradient-to-r from-blue-900/20 to-blue-800/20 w-full">
          <div className="max-w-4xl mx-auto w-full">
            
            <h2 className="mobile-section-title font-bold text-white text-center mb-8 break-words">
              🎯 TUS <span className="text-blue-400">PRÓXIMOS PASOS</span> DEL PLAN A
            </h2>

            <div className="space-y-6 mb-8">
              
              {/* PASO 1 - Siempre visible */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-xl p-6 border-l-4 border-blue-400"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-400 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="text-blue-300 font-bold mobile-subsection-title mb-3 break-words">
                      DÍAS 1-7: {getPersonalizedFirstStep()}
                    </h3>
                    <div className="text-white mobile-info-text space-y-2">
                      <p>→ Identifica y rompe el patrón que la alejó</p>
                      <p>→ Aprende los 3 tipos de mensajes que funcionan</p>
                      <p>→ Prepara tu mentalidad para actuar sin presión</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* PASO 2 - Aparece tras 8s */}
              <AnimatePresence>
                {currentStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl p-6 border-l-4 border-purple-400"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-400 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">2</div>
                      <div className="flex-1">
                        <h3 className="text-purple-300 font-bold mobile-subsection-title mb-3 break-words">
                          DÍAS 8-10: {getPersonalizedSecondStep()}
                        </h3>
                        <div className="text-white mobile-info-text space-y-2">
                          <p>→ Envía el mensaje exacto para tu situación</p>
                          <p>→ Maneja la respuesta con el "Guión de Curiosidad"</p>
                          <p>→ Crea atracción sin parecer desesperado</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PASO 3 - Aparece tras 16s */}
              <AnimatePresence>
                {currentStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-orange-900/50 to-orange-800/50 rounded-xl p-6 border-l-4 border-orange-400"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-400 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">3</div>
                      <div className="flex-1">
                        <h3 className="text-orange-300 font-bold mobile-subsection-title mb-3 break-words">
                          DÍAS 11-14: {getPersonalizedThirdStep()}
                        </h3>
                        <div className="text-white mobile-info-text space-y-2">
                          <p>→ Planifica el encuentro "casual" perfecto</p>
                          <p>→ Usa técnicas de lenguaje corporal específicas</p>
                          <p>→ Termina la conversación para que {getPersonalizedPronoun()} quiera más</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PASO 4 - Aparece tras 24s */}
              <AnimatePresence>
                {currentStep >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-xl p-6 border-l-4 border-green-400"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-green-400 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">4</div>
                      <div className="flex-1">
                        <h3 className="text-green-300 font-bold mobile-subsection-title mb-3 break-words">
                          DÍAS 15-21: {getPersonalizedFourthStep()}
                        </h3>
                        <div className="text-white mobile-info-text space-y-2">
                          <p>→ Usa los 21 Disparadores Emocionales exactos</p>
                          <p>→ Expresa tus sentimientos en el momento perfecto</p>
                          <p>→ Cierra con el Protocolo de Reconciliación Definitiva</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress de Liberación */}
            <AnimatePresence>
              {currentStep < 4 && (
                <div className="text-center mb-8">
                  <div className="text-gray-400 mobile-small-text mb-2">
                    Liberando próximo paso en...
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 max-w-md mx-auto">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 8, ease: "linear" }}
                    />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ===== SECIÓN 4: TRANSICIÓN A LA VENTA ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mobile-padding bg-gradient-to-r from-yellow-900/30 to-orange-900/30 w-full"
            >
              <div className="max-w-4xl mx-auto w-full">
                
                <div className="bg-yellow-900/80 rounded-xl p-6 mb-8 border-2 border-yellow-500/50">
                  <h3 className="text-yellow-400 font-bold mobile-section-title text-center mb-4 break-words">
                    🤔 AQUÍ TIENES UNA DECISIÓN QUE TOMAR...
                  </h3>
                  
                  <div className="text-white mobile-description text-center space-y-4">
                    <p>
                      Acabas de ver <strong>exactamente los primeros 4 pasos</strong> que necesitas dar para recuperar a {getPersonalizedPronoun()}.
                    </p>
                    
                    <p>
                      <strong>Situación identificada:</strong> {getPersonalizedSituation()} ({getPersonalizedTimeframe()})
                    </p>
                    
                    <p className="text-yellow-300 font-bold">
                      Los próximos 10 pasos incluyen los scripts exactos, las técnicas avanzadas y el método completo paso a paso.
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 mt-6">
                    <h4 className="text-orange-400 font-bold mobile-subsection-title mb-3 text-center break-words">
                      LO QUE FALTA POR DESCUBRIR:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white mobile-info-text">
                      <div className="space-y-2">
                        <p>✅ Los 21 Disparadores Emocionales exactos</p>
                        <p>✅ Scripts para cada tipo de respuesta</p>
                        <p>✅ Protocolo de Emergencia 72h</p>
                        <p>✅ Técnicas de encuentro presencial</p>
                      </div>
                      <div className="space-y-2">
                        <p>✅ Plan anti-rechazo</p>
                        <p>✅ Método vs terceros</p>
                        <p>✅ Protocolo de reconciliación</p>
                        <p>✅ Soporte directo conmigo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 5: CASOS DE ÉXITO SIMILARES ===== */}
        <div className="mobile-padding bg-gradient-to-r from-green-900/30 to-emerald-900/30 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: showOverlay ? 0.3 : 1, y: 0 }}
              className="text-center"
            >
              <h2 className="mobile-section-title font-bold text-white text-center mb-8 break-words">
                💕 <span className="text-pink-400">CASOS DE ÉXITO</span> CON TU MISMA SITUACIÓN
              </h2>

              {/* Resultados */}
              <div className="max-w-sm mx-auto mb-8 w-full">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 mobile-border rounded-2xl mobile-card-padding shadow-2xl max-w-full">
                  <div className="mobile-circle mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mobile-border-white mb-4">
                    <div className="text-center">
                      <span className="mobile-percentage font-extrabold text-black">90,5%</span>
                      <p className="mobile-success-text font-bold text-black">ÉXITO</p>
                    </div>
                  </div>
                  
                  <div className="text-white space-y-2 mobile-info-text">
                    <p><strong>Tu situación:</strong> {getPersonalizedSituation()}</p>
                    <p><strong>Tiempo estimado:</strong> 14-21 días</p>
                    <p><strong>Tipo:</strong> Altamente recuperable</p>
                  </div>
                </div>
              </div>

              {/* Depoimentos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png" 
                      alt="Testimonio" 
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-bold mobile-info-text mb-2 break-words">Carlos M., 32 años</h4>
                      <p className="text-gray-300 mobile-small-text mb-3">
                        <span className="text-yellow-400 font-bold">Situación:</span> {getPersonalizedSituation()}, {getPersonalizedTimeframe()}
                      </p>
                      <p className="text-white mobile-info-text italic mb-3">
                        "Seguí los pasos exactos. Al día 11 me escribió. Al día 18 volvimos. El Plan A funciona."
                      </p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-green-400 mobile-small-text ml-2 font-bold">✅ Recuperado</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://nutricaoalimentos.shop/wp-content/uploads/2025/09/lg-9xvta-canva-couple-in-love-mafv-z4mya0.jpg" 
                      alt="Testimonio" 
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-bold mobile-info-text mb-2 break-words">Rafael S., 28 años</h4>
                      <p className="text-gray-300 mobile-small-text mb-3">
                        <span className="text-yellow-400 font-bold">Caso crítico:</span> {getPersonalizedPronoun()} con {getPersonalizedOther()}
                      </p>
                      <p className="text-white mobile-info-text italic mb-3">
                        "Pensé era imposible. El Plan A me guió paso a paso. En 16 días {getPersonalizedPronoun()} me pidió volver."
                      </p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-green-400 mobile-small-text ml-2 font-bold">✅ Recuperado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Números de Prova Social */}
              <div className="mobile-grid max-w-2xl mx-auto w-full">
                <div className="bg-gray-800 mobile-stats-padding rounded-lg mobile-border-orange text-center">
                  <div className="mobile-stats-number font-bold text-orange-400 mb-1">87%</div>
                  <p className="text-white mobile-stats-text break-words">Ven resultados en 14 días</p>
                </div>
                <div className="bg-gray-800 mobile-stats-padding rounded-lg mobile-border-orange text-center">
                  <div className="mobile-stats-number font-bold text-orange-400 mb-1">3.847+</div>
                  <p className="text-white mobile-stats-text break-words">Relaciones recuperadas</p>
                </div>
                <div className="bg-gray-800 mobile-stats-padding rounded-lg mobile-border-orange text-center">
                  <div className="mobile-stats-number font-bold text-orange-400 mb-1">21</div>
                  <p className="text-white mobile-stats-text break-words">Días o menos</p>
                </div>
              </div>

              {/* Prints WhatsApp */}
              <div className="mb-6 sm:mb-8 w-full mt-8">
                <h3 className="mobile-subsection-title font-bold text-white text-center mb-4 break-words">
                  💬 PRUEBA REAL DE NUESTROS USUARIOS
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-4">
                  <div className="bg-white rounded-xl p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="https://comprarplanseguro.shop/wp-content/uploads/2025/10/01-PROVA.webp" 
                      alt="Print WhatsApp - Resultado positivo"
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="https://comprarplanseguro.shop/wp-content/uploads/2025/10/PROVA-2.webp" 
                      alt="Print WhatsApp - Testemunho de sucesso"
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* CTA Secundario */}
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
                  onClick={() => handlePurchase("resultado_principal")}
                  className="mobile-cta-secondary max-w-md mx-auto"
                  onTouchStart={handleTouchFeedback}
                >
                  <Play className="mobile-small-icon mr-2 flex-shrink-0" />
                  <span className="mobile-cta-text truncate break-words">
                    <span className="mobile-show">QUIERO RESULTADOS</span>
                    <span className="desktop-show">QUIERO LOS MISMOS RESULTADOS</span>
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ===== SECIÓN 6: OFERTA IRRESISTIBLE ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mobile-padding w-full"
            >
              <div className="max-w-4xl mx-auto w-full">
                <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl mobile-border-yellow w-full">
                  <CardContent className="mobile-offer-padding text-center w-full">
                    
                    <div className="bg-yellow-400 text-black font-bold mobile-offer-badge rounded-full inline-block mb-4 sm:mb-6 mobile-badge-text max-w-full">
                      🎯 ACCESO COMPLETO AL PLAN A
                    </div>

                    <h2 className="mobile-offer-title font-black mb-4 sm:mb-6 break-words">
                      RECUPERA A {getPersonalizedPronoun().toUpperCase()} EN LOS PRÓXIMOS 21 DÍAS
                    </h2>

                    <div className="bg-black/20 rounded-lg mobile-price-padding mb-4 sm:mb-6 w-full">
                      <div className="text-center mb-4">
                        <div className="mobile-price-main font-black text-yellow-300 mb-2">$12,99</div>
                        <div className="mobile-price-sub">
                          <span className="line-through text-gray-400 mr-3">$69,99</span>
                          <span className="text-green-400 font-bold">AHORRAS $57</span>
                        </div>
                      </div>

                      <div className="text-left space-y-2 sm:space-y-3 max-w-md mx-auto w-full">
                        <div className="flex items-start text-white mobile-feature-text">
                          <TrendingUp className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                          <span className="break-words"><strong>Plan A Completo:</strong> Los 14 protocolos (Valor: $97)</span>
                        </div>
                        <div className="flex items-start text-white mobile-feature-text">
                          <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                          <span className="break-words"><strong>21 Disparadores:</strong> Frases exactas ($47)</span>
                        </div>
                        <div className="flex items-start text-white mobile-feature-text">
                          <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                          <span className="break-words"><strong>Protocolo 72H:</strong> Para casos críticos ($37)</span>
                        </div>
                        <div className="flex items-start text-white mobile-feature-text">
                          <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                          <span className="break-words"><strong>Garantía 30 días:</strong> 100% devolución</span>
                        </div>
                        <div className="flex items-start text-white mobile-feature-text">
                          <Check className="mobile-check-icon text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                          <span className="break-words"><strong>Acceso inmediato:</strong> Todo listo para descargar</span>
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
                      className="mb-4 sm:mb-6 w-full"
                    >
                      <Button
                        onClick={() => handlePurchase("oferta_principal")}
                        size="lg"
                        className="mobile-cta-offer"
                        onTouchStart={handleTouchFeedback}
                      >
                        <span className="mobile-cta-offer-text text-center leading-tight break-words">
                          <span className="mobile-show">💕 RECUPERAR - $12,99</span>
                          <span className="desktop-show">💕 RECUPERAR AHORA POR $12,99</span>
                        </span>
                      </Button>
                    </motion.div>

                    <div className="bg-red-800 mobile-urgency-padding rounded-lg mb-4 w-full">
                      <p className="text-yellow-300 font-bold mobile-urgency-text mb-2">⏰ OFERTA EXPIRA EN:</p>
                      <div className="mobile-countdown font-black text-white">
                        <CountdownTimer minutes={15} seconds={0} />
                      </div>
                    </div>

                    <div className="flex justify-center mobile-social-gap mobile-social-text text-white mb-4 flex-wrap">
                      <div className="flex items-center">
                        <Users className="mobile-social-icon text-orange-400 mr-1" />
                        <span><strong>{recentBuyers}</strong> compraron hoy</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mobile-social-icon text-red-400 mr-1" />
                        <span>Últimas horas</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 7: GARANTÍA ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="mobile-padding bg-gradient-to-r from-green-900/30 to-emerald-900/30 w-full"
            >
              <div className="max-w-4xl mx-auto w-full">
                <Card className="bg-green-50 mobile-border-green shadow-2xl w-full">
                  <CardContent className="mobile-guarantee-padding text-center w-full">
                    <Shield className="mobile-shield-icon text-green-600 mx-auto mb-4" />
                    <h2 className="mobile-guarantee-title font-bold text-green-800 mb-4 break-words">
                      GARANTÍA TOTAL DE 30 DÍAS
                    </h2>
                    <p className="text-green-700 mobile-guarantee-text font-semibold mb-4 break-words">
                      Si no ves resultados, te devolvemos el 100% de tu dinero sin hacer preguntas
                    </p>
                    <p className="text-green-600 max-w-2xl mx-auto mobile-guarantee-desc break-words">
                      Prueba el método durante 30 días. Si no funciona, <strong>te devolvemos todo</strong> + consulta personal gratuita.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 8: FAQ ===== */}
        <div className="mobile-padding w-full">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="mobile-faq-title font-bold text-white text-center mb-6 sm:mb-8 break-words">
              PREGUNTAS FRECUENTES
            </h2>

            <div className="space-y-4 max-w-2xl mx-auto w-full">
              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="mobile-faq-padding w-full">
                  <h3 className="mobile-faq-question font-bold text-orange-400 mb-2 break-words">
                    ¿Y si {getPersonalizedPronoun()} ya está con otra persona?
                  </h3>
                  <p className="text-gray-300 mobile-faq-answer break-words">
                    El método funciona incluso en estos casos. El 67% de nuestros éxitos comenzaron en esta situación.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="mobile-faq-padding w-full">
                  <h3 className="mobile-faq-question font-bold text-orange-400 mb-2 break-words">
                    ¿Cuánto tiempo para ver resultados?
                  </h3>
                  <p className="text-gray-300 mobile-faq-answer break-words">
                    El 87% ve cambios positivos en menos de 14 días. El sistema completo funciona en 21 días máximo.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="mobile-faq-padding w-full">
                  <h3 className="mobile-faq-question font-bold text-orange-400 mb-2 break-words">
                    ¿Cómo recibo el acceso?
                  </h3>
                  <p className="text-gray-300 mobile-faq-answer break-words">
                    Inmediatamente después del pago recibes email con credenciales. Todo disponible al momento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* ===== SECIÓN 9: CTA FINAL ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="mobile-padding bg-gradient-to-r from-red-600 to-orange-600 w-full"
            >
              <div className="max-w-4xl mx-auto text-center w-full">
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl mobile-final-padding mobile-border-yellow w-full">
                  
                  <h2 className="mobile-final-title font-black text-white mb-4 break-words">
                    ⏰ ÚLTIMO AVISO - DECIDE AHORA
                  </h2>
                  
                  <p className="mobile-final-subtitle text-white mb-4 sm:mb-6 font-bold break-words">
                    Mientras lees esto, {getPersonalizedPronoun()} está tomando decisiones sobre su vida amorosa.
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
                      onClick={() => handlePurchase("cta_final")}
                      size="lg"
                      className="mobile-cta-final"
                      onTouchStart={handleTouchFeedback}
                    >
                      <span className="mobile-cta-final-text text-center leading-tight break-words">
                        <span className="mobile-show">💕 ¡RECUPERAR YA!</span>
                        <span className="desktop-show">💕 ¡SÍ, QUIERO RECUPERAR AHORA!</span>
                      </span>
                      <ArrowRight className="mobile-icon-size ml-2 flex-shrink-0" />
                    </Button>
                  </motion.div>

                  <p className="text-yellow-300 mobile-final-warning mt-4 font-semibold break-words">
                    No dejes que {getPersonalizedPronoun()} se aleje definitivamente. Actúa ahora.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== OVERLAY BLOQUEANDO SEÇÕES ===== */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center"
              style={{ zIndex: 50 }}
            >
              <div className="text-center max-w-sm mx-auto p-6">
                
                <Lock className="text-red-400 mx-auto mb-6" size={60} />
                
                <h3 className="text-white font-black text-xl mb-4 break-words">
                  🔒 CONTENIDO BLOQUEADO
                </h3>
                <p className="text-gray-300 font-semibold mb-6 break-words">
                  Tu resultado y oferta especial se desbloquearán automáticamente
                </p>

                <div className="bg-orange-600 rounded-lg p-4 mb-4">
                  <p className="text-black font-bold mb-2 break-words">
                    ⏳ DESBLOQUEANDO EN:
                  </p>
                  <div className="text-black font-black text-3xl">
                    {Math.floor(unlockTimer / 60)}:{(unlockTimer % 60).toString().padStart(2, '0')}
                  </div>
                </div>

                <p className="text-gray-400 text-sm break-words">
                  Continúa viendo el video mientras esperas
                </p>
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

          .mobile-container {
            max-width: 100vw !important;
            overflow-x: hidden !important;
            width: 100% !important;
            position: relative;
          }

          /* Sistema de Breakpoints */
          .mobile-show { display: inline !important; }
          .desktop-show { display: none !important; }

          @media (min-width: 640px) {
            .mobile-show { display: none !important; }
            .desktop-show { display: inline !important; }
          }

          /* Padding e Spacing Responsivo */
          .mobile-padding {
            padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-card-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          .mobile-video-padding {
            padding: clamp(0.5rem, 2vw, 1rem);
          }

          .mobile-badge-padding {
            padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 1.5rem);
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

          .mobile-faq-padding {
            padding: clamp(0.75rem, 3vw, 1rem);
          }

          .mobile-final-padding {
            padding: clamp(1rem, 4vw, 1.5rem);
          }

          /* Tipografia Responsiva */
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

          .mobile-faq-title {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
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

          .mobile-badge-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
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

          .mobile-faq-question {
            font-size: clamp(0.875rem, 3vw, 1.125rem);
            line-height: 1.3;
          }

          .mobile-faq-answer {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
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

          /* Elementos Específicos */
          .mobile-circle {
            width: clamp(5rem, 15vw, 6rem);
            height: clamp(5rem, 15vw, 6rem);
          }

          .mobile-percentage {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            line-height: 1;
          }

          .mobile-success-text {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
            line-height: 1;
          }

          /* Ícones Responsivos */
          .mobile-icon-size {
            width: clamp(1.25rem, 4vw, 1.5rem);
            height: clamp(1.25rem, 4vw, 1.5rem);
          }

          .mobile-check-icon {
            width: clamp(1rem, 3vw, 1.25rem);
            height: clamp(1rem, 3vw, 1.25rem);
          }

          .mobile-small-icon {
            width: clamp(0.75rem, 2.5vw, 1rem);
            height: clamp(0.75rem, 2.5vw, 1rem);
          }

          .mobile-social-icon {
            width: clamp(0.75rem, 2.5vw, 1rem);
            height: clamp(0.75rem, 2.5vw, 1rem);
          }

          .mobile-shield-icon {
            width: clamp(3rem, 8vw, 4rem);
            height: clamp(3rem, 8vw, 4rem);
          }

          /* Bordas Responsivas */
          .mobile-border {
            border-width: clamp(2px, 1vw, 4px);
          }

          .mobile-border-white {
            border: clamp(2px, 1vw, 4px) solid white;
          }

          .mobile-border-orange {
            border: clamp(1px, 0.5vw, 2px) solid rgb(249 115 22);
          }

          .mobile-border-yellow {
            border: clamp(2px, 1vw, 4px) solid rgb(250 204 21);
          }

          .mobile-border-green {
            border: clamp(2px, 1vw, 4px) solid rgb(34 197 94);
          }

          /* Grid Responsivo */
          .mobile-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(0.5rem, 2vw, 1rem);
          }

          .mobile-social-gap {
            gap: clamp(0.5rem, 2vw, 1rem);
          }

          /* Botões Mobile-Optimized */
          .mobile-cta-primary,
          .mobile-cta-secondary,
          .mobile-cta-offer,
          .mobile-cta-final {
            width: 100% !important;
            box-sizing: border-box !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
            transition: all 0.3s ease !important;
          }

          .mobile-cta-primary {
            background: linear-gradient(to right, rgb(249 115 22), rgb(220 38 38)) !important;
            color: white !important;
            font-weight: 900 !important;
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 2rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(1rem, 3vw, 1.25rem) !important;
            border: clamp(2px, 1vw, 4px) solid rgb(250 204 21) !important;
            min-height: clamp(3.5rem, 12vw, 4rem) !important;
            max-width: 28rem !important;
            margin: 0 auto !important;
          }

          .mobile-cta-secondary {
            background: linear-gradient(to right, rgb(249 115 22), rgb(220 38 38)) !important;
            color: white !important;
            font-weight: 700 !important;
            padding: clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 1.5rem) !important;
            border-radius: 9999px !important;
            font-size: clamp(0.875rem, 3vw, 1rem) !important;
            border: clamp(1px, 0.5vw, 2px) solid rgb(250 204 21) !important;
            min-height: clamp(2.75rem, 10vw, 3rem) !important;
            max-width: 24rem !important;
            margin: 0 auto !important;
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

          .mobile-cta-primary:hover,
          .mobile-cta-secondary:hover,
          .mobile-cta-offer:hover,
          .mobile-cta-final:hover {
            transform: scale(1.02) !important;
          }

          .mobile-cta-final:hover {
            transform: scale(1.05) !important;
          }

          /* Texto dos Botões */
          .mobile-cta-text {
            font-size: clamp(0.875rem, 3vw, 1.125rem) !important;
            line-height: 1.2 !important;
            font-weight: 700 !important;
          }

          .mobile-cta-offer-text,
          .mobile-cta-final-text {
            font-size: clamp(1rem, 3.5vw, 1.25rem) !important;
            line-height: 1.2 !important;
            font-weight: 800 !important;
          }

          /* Vídeo Container */
          .mobile-video-container {
            width: 100% !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: clamp(0.5rem, 2vw, 1rem) !important;
          }

          .mobile-vturb-player {
            display: block !important;
            width: 100% !important;
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
            height: auto !important;
            display: block !important;
            aspect-ratio: 16/9 !important;
            min-height: clamp(200px, 40vw, 400px) !important;
          }

          /* Otimizações para telas pequenas */
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

            .mobile-social-gap {
              gap: 1rem !important;
            }
          }

          /* Performance */
          .bg-gradient-to-r, 
          .bg-gradient-to-br {
            will-change: transform !important;
            backface-visibility: hidden !important;
            transform: translateZ(0) !important;
          }

          /* Prevenção de zoom iOS */
          @supports (-webkit-touch-callout: none) {
            input, 
            select, 
            textarea {
              font-size: 16px !important;
            }
          }

          /* Scroll suave */
          html {
            scroll-behavior: smooth !important;
          }

          /* Truncamento de texto */
          .truncate {
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }

          .break-words {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            word-break: break-word !important;
          }

          /* Responsividade total */
          img, 
          video {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
          }

          /* Touch feedback */
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
          }

          /* Acessibilidade */
          @media (prefers-reduced-motion: reduce) {
            .animate-pulse,
            .animate-bounce {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </>
  )
}