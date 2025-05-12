
export default function RegisterForm({ onCancel }) {
  const handleRegister = (e) => {
    e.preventDefault()
    alert('Регистрация пока не реализована :)')
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
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        className="input"
        required
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        className="input"
        required
      />
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
