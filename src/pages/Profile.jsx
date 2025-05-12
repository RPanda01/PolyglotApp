import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoHeader from '../components/logoHeader'
import avatarPlaceholder from '../assets/avatar-placeholder.jpg' // заранее добавь такую картинку
import { FaEdit } from 'react-icons/fa'

export default function Profile() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('user')
  const [editing, setEditing] = useState(false)
  const [newNickname, setNewNickname] = useState(nickname)
  const [hovered, setHovered] = useState(false)

  const handleSave = () => {
    if (newNickname.trim()) {
      setNickname(newNickname.trim())
      setEditing(false)
    }
  }

  const handleAvatarChange = () => {
    alert('Изменение аватара пока не реализовано 😺')
  }

  return (
    <div className="container" >
      <LogoHeader />

      {/* Аватар с кнопкой при наведении */}
      <div
        style={{ position: 'relative', marginBottom: '1rem' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={avatarPlaceholder}
          alt="Аватар"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #3b82f6'
          }}
        />
        {hovered && (
          <button
            onClick={handleAvatarChange}
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#3274D3',
              color: '#fff',
              padding: '0.3rem 0.7rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              whiteSpace: 'nowrap'
            }}
          >
            Изменить аватар
          </button>
        )}
      </div>

      {/* Никнейм и редактирование */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        {editing ? (
          <>
            <input
              type="text"
              className="input"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
            <button className="button" onClick={handleSave}>Сохранить</button>
          </>
        ) : (
          <>
            <h2 className="heading" style={{ margin: 0 }}>{nickname}</h2>
            <FaEdit
              onClick={() => setEditing(true)}
              style={{ cursor: 'pointer', color: '#3274D3', width: '30px', height:'30px' }}
              title="Редактировать"
            />
          </>
        )}
      </div>

      {/* Прогресс */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: '1rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '2rem',
          width: '300px'
        }}
      >
        <h3 style={{ marginBottom: '0.5rem' }}>Прогресс</h3>
        <p>Английский язык: 3 из 10 уроков</p>
        <div style={{ background: '#e5e7eb', height: '8px', borderRadius: '4px' }}>
          <div
            style={{
              background: '#3b82f6',
              width: '30%',
              height: '100%',
              borderRadius: '4px'
            }}
          ></div>
        </div>
      </div>

      <button className="button" onClick={() => navigate('/courses')}>
        Перейти к курсам
      </button>
    </div>
  )
}
