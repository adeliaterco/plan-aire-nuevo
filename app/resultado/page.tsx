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

    // Evento de visualização
    enviarEvento("viu_resultado_otimizado", {
      timestamp: new Date().toISOString(),
      user_gender: savedGender
    })

    return () => clearInterval(interval)
  }, [])

  // ===== PROGRESSÃO AUTOMÁTICA DE STEPS (SEM BLOQUEIO) =====
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(2), 8000),   // 8s
      setTimeout(() => setCurrentStep(3), 16000),  // +8s
      setTimeout(() => setCurrentStep(4), 24000),  // +8s
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

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

  // ===== FUNÇÃO DE COMPRA OTIMIZADA =====
  const handlePurchase = (position = "principal") => {
    enviarEvento("clicou_comprar_otimizado", {
      posicao: position,
      step_atual: currentStep,
      timestamp: new Date().toISOString(),
      user_gender: userGender,
      situacao: getPersonalizedSituation()
    })
    
    setTimeout(() => {
      window.open("https://pay.hotmart.com/F100142422S?off=efckjoa7&checkoutMode=10", "_blank")
    }, 100)
  }

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden w-full max-w-[100vw]">
        
        {/* ===== SEÇÃO 1: CONTINUAÇÃO NATURAL DO QUIZ ===== */}
        <div className="mobile-padding bg-gradient-to-r from-green-900/20 to-emerald-900/20 w-full">
          <div className="max-w-4xl mx-auto w-full">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              className="text-center mb-8"
            >
              <h1 className="mobile-headline text-white mb-4 leading-tight break-words">
                ✅ <span className="text-green-400">TU PLAN DE 7 DÍAS</span> ESTÁ COMPLETO
              </h1>
              <p className="mobile-description text-gray-300 mb-6 break-words">
                Como prometido, aquí están tus próximos pasos específicos para reconquistar a {getPronoun()}:
              </p>
            </motion.div>

            <div className="bg-gray-800/80 rounded-xl p-4 mb-8 border-2 border-green-500/50">
              <h3 className="text-green-400 font-bold mobile-subsection-title mb-3 break-words">
                📊 TU SITUACIÓN ANALIZADA:
              </h3>
              <div className="space-y-2 text-white mobile-info-text">
                <p>→ <strong>Tiempo separados:</strong> {getPersonalizedTimeframe()}</p>
                <p>→ <strong>Situación actual:</strong> {getPersonalizedSituation()}</p>
                <p>→ <strong>Protocolo identificado:</strong> Plan A - Recuperación Acelerada</p>
                <p>→ <strong>Tasa de éxito estimada:</strong> <span className="text-green-400 font-bold">87%</span> para tu caso específico</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SECIÓN 2: PRÓXIMOS PASSOS DETALLADOS ===== */}
        <div className="mobile-padding w-full">
          <div className="max-w-4xl mx-auto w-full">
            
            <h2 className="mobile-section-title font-bold text-white text-center mb-8 break-words">
              🎯 TUS <span className="text-orange-400">PRÓXIMOS 14 PASOS</span> DEL PLAN A
            </h2>

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

              {/* STEP 2 - Aparece após 8s */}
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

              {/* STEP 3 - Aparece após 16s */}
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

            {/* Progress bar */}
            <AnimatePresence>
              {currentStep < 4 && (
                <div className="text-center mb-8">
                  <div className="text-gray-400 mobile-small-text mb-2 break-words">
                    Liberando próximo protocolo en...
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 max-w-md mx-auto">
                    <motion.div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 8, ease: "linear" }}
                    />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ===== SECIÓN 3: PROVA SOCIAL ESPECÍFICA ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mobile-padding bg-gradient-to-r from-gray-900 to-black w-full"
            >
              <div className="max-w-4xl mx-auto w-full">
                
                <h2 className="mobile-section-title font-bold text-white text-center mb-8 break-words">
                  💕 <span className="text-pink-400">CASOS DE ÉXITO</span> CON TU MISMA SITUACIÓN
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  
                  {/* CARD 1 - Miguel Á. - CONTACTO CERO (RÁPIDO RESULTADO) */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-start space-x-4">
                      <img 
                        src="https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png" 
                        alt="Testimonio" 
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold mobile-info-text mb-2 break-words">Miguel Á., 33 años - Colombia</h4>
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

                  {/* CARD 2 - Gustavo R. - CON OTRO (DIFÍCIL) */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-start space-x-4">
                      <img 
                        src="https://nutricaoalimentos.shop/wp-content/uploads/2025/09/lg-9xvta-canva-couple-in-love-mafv-z4mya0.jpg" 
                        alt="Testimonio" 
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold mobile-info-text mb-2 break-words">Gustavo R., 29 años - Perú</h4>
                        <p className="text-gray-300 mobile-small-text mb-3 break-words">
                          <span className="text-yellow-400">Situación:</span> {getPronoun()} estaba con otro/otra hace 3 meses
                        </p>
                        <p className="text-white mobile-info-text italic mb-3 break-words">
                          "Mi situación parecía completamente perdida. {getPronoun()} llevaba 3 meses con esta otra persona. Pensé que había perdido para siempre. Pero el Protocolo Anti-Terceros del Plan A me mostró exactamente qué hacer. Día 1-7: diferenciación (hacerme valioso). Día 8-12: reactivación (recordarle lo que teníamos). Día 13: {getPronoun()} empezó a cuestionarse. Día 16: {getPronoun()} me escribió. <strong>Hoy dejó a ese tipo y estamos viviendo juntos. Fue pura estrategia psicológica.</strong>"
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

                  {/* CARD 3 - Javier M. - BLOQUEADO (CRÍTICO) */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-start space-x-4">
                      <img 
                        src="https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png" 
                        alt="Testimonio" 
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold mobile-info-text mb-2 break-words">Javier M., 38 años - España</h4>
                        <p className="text-gray-300 mobile-small-text mb-3 break-words">
                          <span className="text-yellow-400">Situación:</span> Bloqueado en redes, 5 meses sin contacto
                        </p>
                        <p className="text-white mobile-info-text italic mb-3 break-words">
                          "Estaba completamente bloqueado en todas partes. Parecía imposible. Pensé que nunca más hablaría con {getPronoun()}. El Protocolo Indirecto del Plan A fue mi salvación. En lugar de contacto directo, usé la estrategia de tercero (amigo común). Sin presión, sin desesperación, solo información de valor. En una semana, {getPronoun()} me desbloqueó voluntariamente. En 18 días volvimos juntos. <strong>Lo que parecía definitivo se revirtió con la estrategia correcta.</strong>"
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

                  {/* CARD 4 - Roberto L. - SOLO AMIGOS (RELATABLE) */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-start space-x-4">
                      <img 
                        src="https://nutricaoalimentos.shop/wp-content/uploads/2025/09/lg-9xvta-canva-couple-in-love-mafv-z4mya0.jpg" 
                        alt="Testimonio" 
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold mobile-info-text mb-2 break-words">Roberto L., 27 años - Venezuela</h4>
                        <p className="text-gray-300 mobile-small-text mb-3 break-words">
                          <span className="text-yellow-400">Situación:</span> "Solo amigos" desde hace 3 meses
                        </p>
                        <p className="text-white mobile-info-text italic mb-3 break-words">
                          "Sabía que decir 'somos amigos' era la peor trampa. Pero no sabía cómo salir. El Plan A me mostró la Técnica de Ruptura del Patrón. Reducí contacto en 50%, fui más misterioso, mencionaba otros planes, no siempre disponible. En 2 semanas volvió a mirarme diferente. En 4 semanas me pidió salir como pareja. <strong>La disponibilidad constante mata la atracción. La escasez la reaviva.</strong> Ahora entiendo la psicología detrás."
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

                <div className="mobile-grid max-w-2xl mx-auto mb-8">
                  <div className="bg-gray-800 mobile-stats-padding rounded-lg text-center border border-orange-500/30">
                    <div className="mobile-stats-number font-bold text-orange-400 mb-1">89%</div>
                    <p className="text-white mobile-stats-text break-words">Casos como el tuyo</p>
                  </div>
                  <div className="bg-gray-800 mobile-stats-padding rounded-lg text-center border border-green-500/30">
                    <div className="mobile-stats-number font-bold text-green-400 mb-1">16</div>
                    <p className="text-white mobile-stats-text break-words">Días promedio</p>
                  </div>
                  <div className="bg-gray-800 mobile-stats-padding rounded-lg text-center border border-blue-500/30">
                    <div className="mobile-stats-number font-bold text-blue-400 mb-1">2.847</div>
                    <p className="text-white mobile-stats-text break-words">Éxitos este año</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 4: TRANSICIÓN NATURAL PARA VENDA ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mobile-padding w-full"
            >
              <div className="max-w-4xl mx-auto w-full">
                
                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 mb-8 border-2 border-yellow-500/50">
                  <h3 className="text-yellow-400 font-bold mobile-section-title text-center mb-4 break-words">
                    🤔 AQUÍ TIENES UNA DECISIÓN QUE TOMAR...
                  </h3>
                  
                  <div className="text-white mobile-description text-center space-y-4">
                    <p className="break-words">
                      Acabas de ver <strong>exactamente lo que necesitas hacer</strong> para recuperar a {getPronoun()}.
                    </p>
                    
                    <p className="break-words">
                      Estos son los <strong>primeros 3 protocolos</strong> del Plan A completo.
                    </p>
                    
                    <p className="text-yellow-300 font-bold break-words">
                      Los próximos 11 protocolos incluyen los scripts exactos, las técnicas avanzadas y el método completo paso a paso.
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 mt-6">
                    <h4 className="text-orange-400 font-bold mobile-subsection-title mb-3 text-center break-words">
                      LO QUE FALTA POR DESCUBRIR:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white mobile-info-text">
                      <div className="space-y-2">
                        <p className="break-words">✅ Los 21 Disparadores Emocionales exactos</p>
                        <p className="break-words">✅ Scripts para cada tipo de respuesta</p>
                        <p className="break-words">✅ Protocolo de Emergencia 72h</p>
                        <p className="break-words">✅ Técnicas de encuentro presencial</p>
                        <p className="break-words">✅ Plan anti-rechazo</p>
                      </div>
                      <div className="space-y-2">
                        <p className="break-words">✅ Método de diferenciación vs terceros</p>
                        <p className="break-words">✅ Técnicas de lenguaje corporal</p>
                        <p className="break-words">✅ Protocolo de reconciliación</p>
                        <p className="break-words">✅ Plan de relación 2.0</p>
                        <p className="break-words">✅ Soporte directo conmigo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== SECIÓN 5: OFERTA IRRESISTÍVEL ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
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
                          <span><strong>Soporte Direct conmigo:</strong> Dudas y seguimiento (Valor: $197)</span>
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
                      >
                        <Heart className="mobile-icon-size mr-2 flex-shrink-0" />
                        <span className="mobile-cta-offer-text text-center leading-tight break-words">
                          SÍ, QUIERO RECUPERAR A {getPronoun().toUpperCase()} - $12,99
                        </span>
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

        {/* ===== SECIÓN 6: GARANTIA PODEROSA ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
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

        {/* ===== SECIÓN 7: CTA FINAL IRRESISTÍVEL ===== */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
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
                    >
                      <span className="mobile-cta-final-text text-center leading-tight break-words">
                        💕 SÍ, QUIERO RECUPERAR A {getPronoun().toUpperCase()} AHORA
                      </span>
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