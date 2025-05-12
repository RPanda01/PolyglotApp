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
      <p className="subtext">Добро пожаловать! <p></p>Начни изучение языков прямо сейчас</p>
      <button className="button" onClick={() => navigate('/login')}>
        Войти
      </button>

      {/* SVG-декор внизу */}
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