import { useParams, useNavigate } from 'react-router-dom'
import LogoHeader from '../components/logoHeader'


export default function CoursePage() {
  const { lang } = useParams()
  const navigate = useNavigate()

  return (
    <div className="container">
      <LogoHeader />
      <h2 className="heading">Курс: {lang.toUpperCase()}</h2>
      <p className="subtext">Выбери режим изучения:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <button className="button" onClick={() => navigate(`/courses/${lang}/dictionary`)}>
          📖 Начать изучение слов
        </button>
        <button className="button" onClick={() => navigate(`/courses/${lang}/sprint`)}>
          ⚡ Спринт: тест материала на скорость
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
