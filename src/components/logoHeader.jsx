import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function LogoHeader() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        position: 'fixed', // ← фиксированное позиционирование
        top: '1rem',
        left: '1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '0.5rem 1rem',
        borderRadius: '12px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000
      }}
      onClick={() => navigate('/')}
    >
      <img src={logo} alt="Polyglot Logo" style={{ width: '32px', height: '32px' }} />
      <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#1f2937' }}>
        Polyglot
      </span>
    </div>
  )
}
