import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../PolyglotAI.css'
import LogoHeader from '../components/logoHeader'
import { PiSignOutBold } from "react-icons/pi"
import dialogScript from '../assets/dialogScript.json'

export default function PolyglotAI() {
    const [chat, setChat] = useState([{ from: 'bot', text: dialogScript[0].question, translation: dialogScript[0].question_ru }])
    const [userInput, setUserInput] = useState('')
    const [step, setStep] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [awaitingContinue, setAwaitingContinue] = useState(false)
    const { lang } = useParams()
    const navigate = useNavigate()

    const chatRef = useRef(null)

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [chat, isTyping])

    const botSend = (message, translation, callback) => {
        setIsTyping(true)
        setTimeout(() => {
            setIsTyping(false)
            setChat(prev => [...prev, { from: 'bot', text: message, translation: translation || null }])
            if (callback) callback()
        }, 1500)
    }

    const handleUserSubmit = () => {
        if (!userInput.trim()) return

        const userText = userInput.trim()
        setChat(prev => [...prev, { from: 'user', text: userText }])
        setUserInput('')

        if (awaitingContinue) {
            const cont = ['yes', 'ok', 'yeah', 'next']
            if (cont.some(word => userText.toLowerCase().includes(word))) {
                const nextStep = step + 1
                if (nextStep < dialogScript.length) {
                    setStep(nextStep)
                    botSend(dialogScript[nextStep].question, dialogScript[nextStep].question_ru)
                    setAwaitingContinue(false)
                } else {
                    botSend("That's all for now! Great job ✨", "На этом пока что всё! Отличная работа ✨")
                    botSend("Try yourself in another study mode.", "Проверь себя в другом режиме обучения.")
                }
            } else {
                botSend("No problem! You can come back anytime.", "Без проблем! Ты можешь продолжить в любое время.")
                setAwaitingContinue(false)
            }
        } else {
            const current = dialogScript[step]
            const matched = current.expected.some(phrase => userText.toLowerCase().includes(phrase))
            const replyObj = matched
                ? current.responses[Math.floor(Math.random() * current.responses.length)]
                : { text: "Hmm...", translation: null }

            const secondReplyObj = current.second_responses
                ? current.second_responses[Math.floor(Math.random() * current.second_responses.length)]
                : null

            botSend(replyObj.text, replyObj.translation, () => {
                if (secondReplyObj) {
                    setTimeout(() => {
                        botSend(secondReplyObj.text, secondReplyObj.translation, () => {
                            setAwaitingContinue(true)
                            setTimeout(() => {
                                botSend("Would you like to continue?", "Хочешь продолжить?")
                            }, 500)
                        })
                    }, 600)
                } else {
                    setAwaitingContinue(true)
                    setTimeout(() => {
                        botSend("Would you like to continue?", "Хочешь продолжить?")
                    }, 500)
                }
            })
        }
    }

    return (
        <div className="ai-container">
            <LogoHeader />
            <div className="header-row">
                <h2>🤖 <span className="brand">PolyglotAI</span> Chat</h2>
                <button
                    className="back-button"
                    onClick={() => navigate(`/courses/${lang}`)}
                    title="Назад к курсу"
                >
                    <PiSignOutBold size={24} />
                </button>
            </div>
            <div className="chat-box" ref={chatRef}>
                {chat.map((entry, index) => (
                    <div key={index} className={`msg ${entry.from}`}>
                        {entry.text}
                        {entry.translation && entry.from === 'bot' && (
                            <details className="translation">
                                <summary>Показать перевод</summary>
                                <p>{entry.translation}</p>
                            </details>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="msg bot">
                        <span className="dots">
                            <span>.</span><span>.</span><span>.</span>
                        </span>
                    </div>
                )}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleUserSubmit()}
                    placeholder="Type your response (напиши ответ) ..."
                />
                <button onClick={handleUserSubmit}>Отправить</button>
            </div>
        </div>
    )
}
