"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Gift,
  Check,
  ArrowRight,
  ArrowLeft,
  Heart,
  Clock,
  AlertTriangle,
  User,
  TrendingUp,
  Target,
  Zap,
  Calendar,
  Users,
  MessageCircle,
  Smile,
  Star,
  CheckCircle,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizSteps, socialProofMessages, getPersonalizedContent } from "@/lib/quiz-data"
import { BonusUnlock } from "@/components/bonus-unlock"
import { ValueCounter } from "@/components/value-counter"
import { LoadingAnalysis } from "@/components/loading-analysis"

// Função para enviar eventos a Google Analytics
function enviarEvento(nombre_evento, propriedades = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', nombre_evento, propriedades);
    console.log('Evento enviado:', nombre_evento, propriedades);
  }
}

// === COMPONENTE MOCKUP WHATSAPP ===
const WhatsAppMockup = ({ userGender }) => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [analysisPoints, setAnalysisPoints] = useState([
    { status: 'pending', text: 'Enviando mensaje optimizado...' },
    { status: 'pending', text: 'Generando curiosidad e interés...' },
    { status: 'pending', text: 'Activando memoria emocional...' },
    { status: 'pending', text: 'Respuesta emocional detectada...' }
  ])
  const [successPercentage, setSuccessPercentage] = useState(0)

  // ✅ CORREÇÃO: Nome fixo para header
  const getExName = () => {
    return "JOSÉ PLAN"
  }

  // ✅ CORREÇÃO DEFINITIVA: Usar sua imagem sempre
  const getExAvatar = () => {
    // Sempre retorna a sua imagem, independente do gênero
    return "https://i.ibb.co/5gSMWD68/Generatedimage-1764387030465.png";
  }

  // ✅ CORREÇÃO DEFINITIVA: Sem nomes nas mensagens
  const getPersonalizedFirstMessage = () => {
    const answers = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("quizAnswers") || "{}") : {}
    const currentSituation = answers.question7 || ""
    
    if (currentSituation.includes("contacto cero")) {
      return `Hola, encontré algo que es tuyo. ¿Cuándo puedes pasar a recogerlo?`
    }
    if (currentSituation.includes("me ignora")) {
      return `Hola, no voy a molestarte más. Solo quería agradecerte por algo que me enseñaste.`
    }
    if (currentSituation.includes("bloqueado")) {
      return `Hola, María me pidió preguntarte sobre el evento del viernes.`
    }
    if (currentSituation.includes("cosas necesarias")) {
      return `Hola, vi esta foto nuestra del viaje a la playa y me hizo sonreír. Espero que estés bien.`
    }
    if (currentSituation.includes("charlamos")) {
      return `Hola, tengo que contarte algo curioso que me pasó que te va a hacer reír. ¿Tienes 5 minutos para una llamada?`
    }
    return `Hola, vi algo que me recordé a cuando fuimos al parque. Me alegró el día. Espero que estés bien.`
  }

  const getPersonalizedExResponse = () => {
    const answers = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("quizAnswers") || "{}") : {}
    const currentSituation = answers.question7 || ""
    
    if (currentSituation.includes("contacto cero")) {
      return "¿Qué cosa? No recuerdo haber dejado nada..."
    }
    if (currentSituation.includes("me ignora")) {
      return "¿Qué me enseñé? Me tienes curiosa..."
    }
    if (currentSituation.includes("bloqueado")) {
      return "Ah sí, dile que sí voy. Gracias por preguntar."
    }
    if (currentSituation.includes("cosas necesarias")) {
      return "😊 Qué bonito recuerdo. Yo también estoy bien, gracias."
    }
    if (currentSituation.includes("charlamos")) {
      return "Jajaja ya me tienes intrigada. Cuéntame por aquí primero"
    }
    return "Gracias por acordarte de mí. ¿Cómo has estado?"
  }

  const conversation = [
    {
      type: 'sent',
      message: getPersonalizedFirstMessage(),
      delay: 1000,
      timestamp: 'Día 1 - 19:30'
    },
    {
      type: 'typing',
      duration: 1500
    },
    {
      type: 'received', 
      message: getPersonalizedExResponse(),
      delay: 500,
      timestamp: '19:47'
    },
    {
      type: 'sent',
      message: "Me alegra que respondas. ¿Te parece si hablamos mejor mañana? Tengo algunas cosas que hacer ahora.",
      delay: 1000,
      timestamp: '19:52'
    }
  ]

  const updateAnalysisPoint = (pointIndex, status) => {
    setAnalysisPoints(prev => prev.map((point, index) => 
      index === pointIndex ? { ...point, status } : point
    ))
  }

  const animateSuccessPercentage = () => {
    let current = 0
    const target = 89
    const increment = target / 30 // Reduzido para animação mais rápida
    
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(interval)
      }
      setSuccessPercentage(Math.round(current))
    }, 30) // Intervalo reduzido para 30ms
  }

  // ✅ ANIMAÇÃO ACELERADA
  useEffect(() => {
    let stepIndex = 0
    const steps = [
      { delay: 500, action: 'showUserMessage' },    // Era 1000ms
      { delay: 1500, action: 'showTyping' },        // Era 3000ms
      { delay: 2500, action: 'hideTyping' },        // Era 5000ms
      { delay: 3000, action: 'showExResponse' },    // Era 5500ms
      { delay: 4000, action: 'showUserFollowup' },  // Era 7000ms
      { delay: 4500, action: 'showSuccess' }        // Era 8000ms
    ]

    const runAnimation = () => {
      if (stepIndex >= steps.length) return
      
      const step = steps[stepIndex]
      setTimeout(() => {
        executeStep(step.action)
        stepIndex++
        runAnimation()
      }, step.delay)
    }

    const executeStep = (action) => {
      switch(action) {
        case 'showUserMessage':
          setCurrentMessage(1)
          updateAnalysisPoint(0, 'active')
          break
        case 'showTyping':
          setIsTyping(true)
          updateAnalysisPoint(0, 'completed')
          updateAnalysisPoint(1, 'active')
          break
        case 'hideTyping':
          setIsTyping(false)
          break
        case 'showExResponse':
          setCurrentMessage(2)
          updateAnalysisPoint(1, 'completed')
          updateAnalysisPoint(2, 'active')
          break
        case 'showUserFollowup':
          setCurrentMessage(3)
          updateAnalysisPoint(2, 'completed')
          updateAnalysisPoint(3, 'active')
          break
        case 'showSuccess':
          updateAnalysisPoint(3, 'completed')
          animateSuccessPercentage()
          setShowSuccess(true)
          break
      }
    }

    // ✅ INICIA MAIS RÁPIDO
    setTimeout(runAnimation, 300) // Era sem setTimeout
  }, [])

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 mb-8">
      {/* iPhone Mockup */}
      <div className="phone-mockup">
        <div className="iphone-frame">
          <div className="notch"></div>
          <div className="screen">
            {/* WhatsApp Header */}
            <div className="whatsapp-header">
              <div className="back-arrow">←</div>
              {/* ✅ TESTE DE DEBUG - Adicionar fallback visual */}
              <img 
                src={getExAvatar()} 
                className="contact-avatar" 
                alt="Avatar"
                onError={(e) => {
                  console.error("Erro ao carregar imagem:", getExAvatar());
                  e.target.style.backgroundColor = "#FF6B6B";
                  e.target.style.display = "flex";
                  e.target.style.alignItems = "center";
                  e.target.style.justifyContent = "center";
                  e.target.innerHTML = "❌";
                }}
                onLoad={() => {
                  console.log("✅ Imagem carregada com sucesso:", getExAvatar());
                }}
              />
              <div className="contact-info">
                <div className="contact-name">{getExName()}</div>
                <div className="last-seen">
                  {isTyping ? 'escribiendo...' : 'En línea'}
                </div>
              </div>
              <div className="header-icons">
                <span>📹</span>
                <span>📞</span>
                <span>⋮</span>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="chat-messages">
              <div className="date-separator">
                <span>Hoy</span>
              </div>
              
              {/* Mensaje del usuario */}
              <AnimatePresence>
                {currentMessage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }} // ✅ Mais rápido
                    className="message-bubble sent"
                  >
                    <div className="message-content">{conversation[0].message}</div>
                    <div className="message-time">19:30 ✓✓</div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }} // ✅ Mais rápido
                  className="message-bubble received typing-indicator"
                >
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              
              {/* Respuesta de la ex */}
              <AnimatePresence>
                {currentMessage >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }} // ✅ Mais rápido
                    className="message-bubble received"
                  >
                    <div className="message-content">{conversation[2].message}</div>
                    <div className="message-time">19:47</div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Segundo mensaje del usuario */}
              <AnimatePresence>
                {currentMessage >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }} // ✅ Mais rápido
                    className="message-bubble sent"
                  >
                    <div className="message-content">{conversation[3].message}</div>
                    <div className="message-time">19:52 ✓✓</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* WhatsApp Input */}
            <div className="whatsapp-input">
              <div className="input-container">
                <span>😊</span>
                <div className="input-field">Escribe un mensaje</div>
                <span>📎</span>
                <span>🎤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Análisis en tiempo real */}
      <div className="real-time-analysis">
        <h3 className="text-lg font-bold text-white mb-4 text-center">
          📊 ANÁLISIS PSICOLÓGICO EN TIEMPO REAL
        </h3>
        
        <div className="space-y-3 mb-6">
          {analysisPoints.map((point, index) => (
            <motion.div 
              key={index} 
              className="analysis-point"
              // ✅ ANIMAÇÃO MAIS RÁPIDA dos pontos
              animate={{
                scale: point.status === 'active' ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 0.5, // Era mais lento
                repeat: point.status === 'active' ? Infinity : 0,
              }}
            >
              <div className={`point-status ${point.status}`}>
                {point.status === 'completed' ? '✓' : 
                 point.status === 'active' ? '⚡' : '⏳'}
              </div>
              <div className="point-text">{point.text}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="success-probability">
          <div className="probability-circle">
            <div className="percentage">{successPercentage}%</div>
            <div className="label">Probabilidad de éxito</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .phone-mockup {
          width: 300px;
          height: 600px;
        }

        .iphone-frame {
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          border-radius: 35px;
          padding: 8px;
          box-shadow: 
            0 25px 50px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.1);
          position: relative;
        }

        .notch {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 25px;
          background: #000;
          border-radius: 0 0 15px 15px;
          z-index: 10;
        }

        .screen {
          background: #000;
          height: 100%;
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .whatsapp-header {
          background: #075e54;
          padding: 35px 15px 15px 15px;
          display: flex;
          align-items: center;
          color: white;
          font-size: 14px;
        }

        .back-arrow {
          margin-right: 10px;
          font-size: 18px;
        }

        .contact-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
          object-fit: cover;
          /* ✅ FALLBACK VISUAL */
          background-color: #666;
          color: white;
          font-size: 16px;
        }

        .contact-info {
          flex: 1;
        }

        .contact-name {
          font-weight: bold;
          margin-bottom: 2px;
        }

        .last-seen {
          font-size: 12px;
          color: #b3d4d1;
        }

        .header-icons {
          display: flex;
          gap: 15px;
        }

        .chat-messages {
          flex: 1;
          background: #ece5dd;
          padding: 20px 15px;
          overflow-y: auto;
        }

        .date-separator {
          text-align: center;
          margin: 10px 0 20px 0;
        }

        .date-separator span {
          background: rgba(0,0,0,0.1);
          color: #667781;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .message-bubble {
          margin: 8px 0;
          max-width: 80%;
          position: relative;
        }

        .message-bubble.sent {
          margin-left: auto;
          background: #dcf8c6;
          border-radius: 18px 18px 4px 18px;
        }

        .message-bubble.received {
          margin-right: auto;
          background: white;
          border-radius: 18px 18px 18px 4px;
        }

        .message-content {
          padding: 8px 12px 4px 12px;
          font-size: 14px;
          line-height: 1.4;
        }

        .message-time {
          padding: 0 12px 8px 12px;
          font-size: 11px;
          color: #667781;
          text-align: right;
        }

        .message-bubble.received .message-time {
          text-align: left;
        }

        .typing-indicator {
          background: white !important;
          padding: 12px !important;
          width: 60px !important;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          background: #999;
          border-radius: 50%;
          animation: typingDots 1s infinite; /* ✅ Mais rápido */
        }

        .typing-dots span:nth-child(1) { animation-delay: 0s; }
        .typing-dots span:nth-child(2) { animation-delay: 0.15s; } /* ✅ Delay reduzido */
        .typing-dots span:nth-child(3) { animation-delay: 0.3s; }  /* ✅ Delay reduzido */

        @keyframes typingDots {
          0%, 60%, 100% { transform: scale(0.8); opacity: 0.5; }
          30% { transform: scale(1.2); opacity: 1; }
        }

        .whatsapp-input {
          background: #f0f0f0;
          padding: 8px;
        }

        .input-container {
          background: white;
          border-radius: 25px;
          display: flex;
          align-items: center;
          padding: 8px 15px;
          gap: 10px;
        }

        .input-field {
          flex: 1;
          color: #999;
          font-size: 14px;
        }

        .real-time-analysis {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 25px;
          color: white;
          max-width: 350px;
          width: 100%;
        }

        .analysis-point {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 12px 0;
          padding: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          transition: all 0.3s ease; /* ✅ Mais rápido */
        }

        .point-status {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }

        .point-status.pending {
          background: rgba(255,255,255,0.2);
          color: #ffd700;
        }

        .point-status.active {
          background: #4CAF50;
          color: white;
          animation: pulse 0.8s infinite; /* ✅ Mais rápido */
        }

        .point-status.completed {
          background: #4CAF50;
          color: white;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .point-text {
          font-size: 14px;
          flex: 1;
        }

        .success-probability {
          text-align: center;
        }

        .probability-circle {
          width: 100px;
          height: 100px;
          border: 4px solid rgba(255,255,255,0.2);
          border-top: 4px solid #4CAF50;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          animation: rotate 1.5s linear infinite; /* ✅ Mais rápido */
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .percentage {
          font-size: 24px;
          font-weight: bold;
          color: #4CAF50;
        }

        .label {
          font-size: 10px;
          color: #ccc;
          margin-top: 2px;
        }

        @media (max-width: 767px) {
          .phone-mockup {
            width: 280px;
            height: 560px;
          }
          
          .real-time-analysis {
            max-width: 100%;
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  )
}

// === RESTO DO CÓDIGO PERMANECE IGUAL ===

export default function QuizStep() {
  const params = useParams()
  const router = useRouter()
  const step = Number.parseInt(params.step as string)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [quizData, setQuizData] = useState<any>({})
  const [unlockedBonuses, setUnlockedBonuses] = useState<number[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [showBonusUnlock, setShowBonusUnlock] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [newBonus, setNewBonus] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [peopleCount, setPeopleCount] = useState(17)
  const [userGender, setUserGender] = useState<string>("")

  const currentStep = quizSteps[step - 1]
  const progress = (step / 13) * 100

  useEffect(() => {
    // Cargar datos guardados
    const saved = localStorage.getItem("quizData")
    const savedBonuses = localStorage.getItem("unlockedBonuses")
    const savedValue = localStorage.getItem("totalValue")
    const savedGender = localStorage.getItem("userGender")
    const savedAnswers = localStorage.getItem("quizAnswers")

    if (saved) setQuizData(JSON.parse(saved))
    if (savedBonuses) setUnlockedBonuses(JSON.parse(savedBonuses))
    if (savedValue) setTotalValue(Number.parseInt(savedValue))
    if (savedGender) setUserGender(savedGender)
    if (savedAnswers) {
      window.quizAnswers = JSON.parse(savedAnswers)
    }

    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    enviarEvento('visualizou_etapa_quiz', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`
    });

    if (currentStep?.autoAdvance) {
      const timer = setTimeout(() => {
        proceedToNextStep()
      }, 3000)

      return () => clearTimeout(timer)
    }

    const interval = setInterval(() => {
      setPeopleCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 45000)

    return () => clearInterval(interval)
  }, [step])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)

    enviarEvento('selecionou_resposta', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta: answer
    });

    if (step === 1) {
      setUserGender(answer)
      localStorage.setItem("userGender", answer)
    }

    const button = document.querySelector(`button[data-option="${answer}"]`)
    if (button) {
      button.classList.add("scale-105")
      setTimeout(() => button.classList.remove("scale-105"), 200)
    }
  }

  const handleNext = () => {
    enviarEvento('avancou_etapa', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta_selecionada: selectedAnswer
    });

    const newQuizData = { ...quizData, [step]: selectedAnswer }
    setQuizData(newQuizData)
    localStorage.setItem("quizData", JSON.stringify(newQuizData))

    const answers = window.quizAnswers || {}
    answers[`question${step}`] = selectedAnswer
    window.quizAnswers = answers
    localStorage.setItem("quizAnswers", JSON.stringify(answers))

    if (currentStep?.elements?.analysisText || currentStep?.elements?.profileAnalysis) {
      setShowAnalysis(true)
      setTimeout(() => {
        setShowAnalysis(false)
        proceedToNextStep()
      }, 1500) // ✅ Reduzido de 2000ms para 1500ms
      return
    }

    proceedToNextStep()
  }

  const proceedToNextStep = () => {
    const currentUrl = new URL(window.location.href);
    let utmString = '';
    
    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }
    
    if (utmString.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }

    if (currentStep?.bonusUnlock && !unlockedBonuses.includes(currentStep.bonusUnlock.id)) {
      enviarEvento('desbloqueou_bonus', {
        numero_etapa: step,
        bonus_id: currentStep.bonusUnlock.id,
        bonus_titulo: currentStep.bonusUnlock.title
      });

      const newUnlockedBonuses = [...unlockedBonuses, currentStep.bonusUnlock.id]
      const newTotalValue = totalValue + currentStep.bonusUnlock.value

      setUnlockedBonuses(newUnlockedBonuses)
      setTotalValue(newTotalValue)

      const personalizedBonus = {
        ...currentStep.bonusUnlock,
        title: currentStep.bonusUnlock?.title || 'Bonus desbloqueado',
        description: currentStep.bonusUnlock?.description || 'Descripción del bonus',
      }
      setNewBonus(personalizedBonus)

      localStorage.setItem("unlockedBonuses", JSON.stringify(newUnlockedBonuses))
      localStorage.setItem("totalValue", newTotalValue.toString())

      setShowBonusUnlock(true)
      return
    }

    if (step < 13) {
      router.push(`/quiz/${step + 1}${utmString}`)
    } else {
      enviarEvento('concluiu_quiz', {
        total_etapas_completadas: 13,
        total_bonus_desbloqueados: unlockedBonuses.length
      });
      
      router.push(`/resultado${utmString}`)
    }
  }

  const handleBonusUnlockComplete = () => {
    setShowBonusUnlock(false)
    
    const currentUrl = new URL(window.location.href);
    let utmString = '';
    
    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }
    
    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }
    
    if (step < 13) {
      router.push(`/quiz/${step + 1}${utmString}`)
    } else {
      router.push(`/resultado${utmString}`)
    }
  }

  const handleBack = () => {
    enviarEvento('retornou_etapa', {
      de_etapa: step,
      para_etapa: step > 1 ? step - 1 : 'inicio'
    });
    
    const currentUrl = new URL(window.location.href);
    let utmString = '';
    
    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }
    
    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }
    
    if (step > 1) {
      router.push(`/quiz/${step - 1}${utmString}`)
    } else {
      router.push(`/${utmString}`)
    }
  }

  const getStepIcon = (stepNumber: number, index: number) => {
    const iconMaps = {
      1: [User, Users],
      2: [Calendar, TrendingUp, Target, Zap],
      3: [Clock, Calendar, MessageCircle, Heart],
      4: [Heart, MessageCircle, Users],
      5: [Calendar, Heart, TrendingUp, Clock],
      6: [Smile, Heart, MessageCircle, TrendingUp, Target, Zap],
      7: [MessageCircle, Heart, Users, TrendingUp, Smile, Users, Heart],
      8: [MessageCircle, Heart, Users, TrendingUp, Smile],
      9: [Heart, TrendingUp, Target, Zap],
    }

    const icons = iconMaps[stepNumber] || [Heart]
    const Icon = icons[index] || Heart
    return <Icon className="w-6 h-6" />
  }

  const getPersonalizedQuestion = () => {
    return getPersonalizedContent(currentStep.question, userGender)
  }

  const getPersonalizedDescription = () => {
    const desc = currentStep.description
    if (typeof desc === 'function') {
      try {
        return desc()
      } catch (error) {
        console.error('Erro ao executar função de description:', error)
        return ''
      }
    }
    return getPersonalizedContent(desc, userGender)
  }

  const getPersonalizedSubtext = () => {
    const subtext = currentStep.subtext
    if (typeof subtext === 'function') {
      try {
        return subtext()
      } catch (error) {
        console.error('Erro ao executar função de subtext:', error)
        return ''
      }
    }
    return getPersonalizedContent(subtext, userGender)
  }

  const getPersonalizedOptions = () => {
    const options = getPersonalizedContent(currentStep.options, userGender)
    return Array.isArray(options) ? options : currentStep.options
  }

  if (!currentStep) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado con progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:bg-white/20 border border-white/20"
              disabled={currentStep?.autoAdvance}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>

            <div className="flex items-center gap-4">
              {currentStep?.elements?.timer && (
                <div className="flex items-center gap-2 text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>{currentStep.elements.timer}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/20 rounded-full p-1 mb-2">
            <Progress value={progress} className="h-3" />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              Etapa {step} de 13 • {Math.round(progress)}% completado
            </p>
          </div>
        </div>

        {/* Testimonial Display */}
        {currentStep?.elements?.testimonialDisplay && (currentStep?.elements?.testimonialText || currentStep?.elements?.testimonialData) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-yellow-500/40 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    {currentStep.elements.testimonialImage || (currentStep.elements.testimonialData && currentStep.elements.testimonialData().image) ? (
                      <motion.img
                        src={currentStep.elements.testimonialImage || (currentStep.elements.testimonialData && currentStep.elements.testimonialData().image)}
                        alt={currentStep.elements.testimonialName || (currentStep.elements.testimonialData && currentStep.elements.testimonialData().name) || "Cliente"}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-yellow-500 shadow-md"
                        animate={{
                          y: [0, -2, 0],
                          scale: [1, 1.01, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      {currentStep.elements.testimonialName || (currentStep.elements.testimonialData && currentStep.elements.testimonialData().name) ? (
                        <p className="text-yellow-400 font-bold text-sm sm:text-base truncate">
                          {currentStep.elements.testimonialName || (currentStep.elements.testimonialData && currentStep.elements.testimonialData().name)}
                        </p>
                      ) : null}
                      
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 + 0.3 }}
                          >
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.div 
                    className="bg-gray-700/30 rounded-lg p-3 sm:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-white text-sm sm:text-base leading-relaxed italic">
                      "{currentStep.elements.testimonialText || (currentStep.elements.testimonialData && currentStep.elements.testimonialData().text)}"
                    </p>
                  </motion.div>

                  <motion.div 
                    className="flex items-center justify-center gap-1 text-green-400 text-xs font-semibold bg-green-900/20 rounded-full py-1 px-3 self-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>VERIFICADO</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tarjeta de Pregunta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border-orange-500/30 shadow-2xl border-2">
            <CardContent className="p-6 sm:p-8">
              
              {/* === RENDERIZAÇÃO ESPECIAL PARA STEP 12 === */}
              {step === 12 && (
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                    🎬 CREANDO TU DEMOSTRACIÓN PERSONALIZADA EN TIEMPO REAL
                  </h2>
                  
                  <p className="text-orange-200 text-center mb-8 text-base sm:text-lg font-medium">
                    Basándome en tu perfil psicológico completo, esta es EXACTAMENTE la conversación que tendrás con tu ex usando el Plan A:
                  </p>
                  
                  <WhatsAppMockup userGender={userGender} />
                  
                  <p className="text-gray-400 text-sm mb-8">
                    Vista previa basada en 8,347 casos exitosos similares al tuyo
                  </p>
                  
                  <motion.div className="text-center">
                    <Button
                      onClick={() => {
                        setSelectedAnswer("VER_PLAN_COMPLETO")
                        handleNext()
                      }}
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg w-full sm:w-auto text-sm sm:text-base"
                    >
                      🎯 VER MI ESTRATEGIA COMPLETA DE 21 DÍAS
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* === RESTO DO CÓDIGO PERMANECE IGUAL === */}

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}