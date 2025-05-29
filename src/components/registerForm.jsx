import { useState } from 'react'

export default function RegisterForm({ onCancel }) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (password !== repeatPassword) {
      setError('Пароли не совпадают')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login,
          password,
          nickname: login,            // можно позволить менять
          avatarBase64: null          // пока без аватара
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        alert('Успешная регистрация! Теперь можно войти.')
        onCancel()
      } else {
        setError(data.message || 'Ошибка регистрации')
      }
    } catch (err) {
      setError('Сервер не отвечает')
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
    >
      <input
        type="text"
        placeholder="Логин"
        className="input"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        className="input"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        required
      />

      {error && <p style={{ color: 'red', margin: '0.5rem 0' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Регистрация успешна!</p>}

      <button className="button" type="submit">Зарегистрироваться</button>

      <p style={{ marginTop: '1rem' }}>
        Уже есть аккаунт?{' '}
        <span
          onClick={onCancel}
          style={{ color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Войти
        </span>
      </p>
    </form>
  )
}
