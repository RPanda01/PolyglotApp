import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/registerForm'
import LogoHeader from '../components/logoHeader'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showRegister, setShowRegister] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    if (username === 'user' && password === '1111') {
      setError('')
      navigate('/profile')
    } else {
      setError('Неверный логин или пароль')
    }
  }

  return (
    <div className="container">
    <LogoHeader />
      <h2 className="heading">{showRegister ? 'Регистрация' : 'Вход в Polyglot'}</h2>

      {showRegister ? (
        <RegisterForm onCancel={() => setShowRegister(false)} />
      ) : (
        <>
          <form
            onSubmit={handleLogin}
            style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
          >
            <input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
            <button className="button" type="submit">Войти</button>
          </form>

          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

          <p style={{ marginTop: '1.5rem' }}>
            Нет аккаунта?{' '}
            <span
              onClick={() => {
                setShowRegister(true)
                setError('')
              }}
              style={{ color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Зарегистрироваться
            </span>
          </p>
        </>
      )}
    </div>
  )
}
