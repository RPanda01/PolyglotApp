import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import LogoHeader from '../components/logoHeader'


export default function CoursePage() {

  const hasSentRequest = useRef(false)
  const { lang } = useParams()
  const navigate = useNavigate()
  const [userLevel, setUserLevel] = useState('A1')

  useEffect(() => {
    if (hasSentRequest.current) return
    hasSentRequest.current = true
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user?.id

    fetch(`http://localhost:5000/api/course/${userId}/enter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseName: lang,
        levelCode: 'A1'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUserLevel(data.data.levelCode || 'A1')
          console.log(data.exists ? 'Уже был' : 'Добавлен впервые', data.data)
        }
      })
      .catch(() => {
        alert('Ошибка подключения к курсу')
      })
  }, [lang])

  return (
    <div className="container">
      <LogoHeader />
      <h2 className="heading">Курс: {lang.toUpperCase()}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <button className="button" onClick={() => navigate(`/courses/${lang}/dictionary`)}>
          📖 Начать изучение слов
        </button>
        <button className="button" onClick={() => navigate(`/courses/${lang}/sprint`, {
          state: {
            levelCode: userLevel
          }
        })}>
          ⚡ Спринт: тест материала на скорость
        </button>
        <button className="button" onClick={() => navigate(`/courses/${lang}/ai`)}>
          🧠 Тренировка с PolyglotAI
        </button>
        <button
          className="button"
          onClick={() => navigate('/courses')}
        >
          ← Вернуться к списку курсов
        </button>
      </div>
    </div>
  )
}
