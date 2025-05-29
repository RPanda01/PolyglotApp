import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '0.5rem'
      }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: '64px', height: '64px' }}
        />
        <h1 className="heading" style={{ margin: 0 }}>Polyglot</h1>
      </div>
      <div className="home-description">
  <h3>Открой мир языков вместе с Polyglot</h3>
  <p>
    Polyglot — это твой личный помощник в изучении иностранных языков. Учись в удобном темпе,
    играй, запоминай и отслеживай прогресс — всё в одном приложении.
  </p>

  <div className="features-grid">
  <div className="features-column">
    <div className="feature-item"><span>📚</span> 5 уровней сложности — от A1 до C1</div>
    <div className="feature-item"><span>⚡</span> Спринт-игры на скорость запоминания</div>
    <div className="feature-item"><span>🎯</span> Индивидуальный путь обучения</div>
  </div>

  <div className="features-divider"></div>

  <div className="features-column">
    <div className="feature-item"><span>🧠</span> Интерактивный словарь с тренировками</div>
    <div className="feature-item"><span>📈</span> Прогресс по каждому курсу и уровню</div>
    <div className="feature-item"><span>🎨</span> Аватар и настройка профиля</div>
  </div>
</div>

  <p style={{ marginTop: '3rem' }}>
    Начни изучать новый язык уже сегодня — это просто, бесплатно и весело!
  </p>
</div>

      <button data-testid="home-login" className="button" onClick={() => navigate('/login')}>
        Войти
      </button>

      <svg
        viewBox="0 0 1440 320"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: -1,
        }}
      >
        <path
          fill="#e0f2fe"
          fillOpacity="0.8"
          d="M0,224L30,202.7C60,181,120,139,180,149.3C240,160,300,224,360,250.7C420,277,480,267,540,229.3C600,192,660,128,720,101.3C780,75,840,85,900,90.7C960,96,1020,96,1080,90.7C1140,85,1200,75,1260,74.7C1320,75,1380,85,1410,90.7L1440"
        ></path>
      </svg>
    </div>
  )
}