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

  const handleLogin = async (e) => {
  e.preventDefault()
  setError('')

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: username,
        password: password
      })
    })

    const data = await response.json()

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user))  // ← сохраняем весь объект
      navigate('/profile')
    } else {
      setError(data.message || 'Ошибка входа')
    }
  } catch (err) {
    setError('Ошибка подключения к серверу')
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
            <button className="button" type="submit" data-testid="login-submit">Войти</button>
          </form>

          {error && <p data-testid="login-error" style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

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
