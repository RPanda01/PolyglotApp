import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoHeader from '../components/logoHeader'
import avatarPlaceholder from '../assets/avatar-placeholder.jpg'
import { FaEdit } from 'react-icons/fa'

export default function Profile() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const [avatar, setAvatar] = useState(user?.avatarBase64 || avatarPlaceholder)
  const [nickname, setNickname] = useState(user?.nickname)
  const [editing, setEditing] = useState(false)
  const [newNickname, setNewNickname] = useState(nickname)
  const [hovered, setHovered] = useState(false)
  const userId = user?.id

  const [userCourses, setUserCourses] = useState([])

  useEffect(() => {
    async function fetchCourses() {
      const courseList = ['english', 'french', 'spanish']
      const results = await Promise.all(
        courseList.map(async (course) => {
          const res = await fetch(`http://localhost:5000/api/course/${userId}/${course}`)
          const data = await res.json()
          return {
            course,
            level: data?.levelCode || 'A1'
          }
        })
      )
      setUserCourses(results)
    }

    fetchCourses()
  }, [userId])



  const handleSave = async () => {
    const trimmed = newNickname.trim()
    if (!trimmed) return

    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}/nickname`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: trimmed })
      })

      const data = await response.json()

      if (data.success) {
        setNickname(trimmed)
        setNewNickname('')
        setEditing(false)
        localStorage.setItem('nickname', trimmed) // обновим в хранилище
      } else {
        alert(data.message || 'Ошибка при обновлении ника')
      }
    } catch (err) {
      alert('Ошибка соединения с сервером')
    }
  }

  const handleAvatarChange = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = reader.result
        const user = JSON.parse(localStorage.getItem('user'))
        const userId = user?.id

        try {
          const response = await fetch(`http://localhost:5000/api/user/${userId}/avatar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatarBase64: base64 })
          })

          const data = await response.json()

          if (data.success) {
            setAvatar(base64)
            const updatedUser = { ...user, avatarBase64: base64 }
            localStorage.setItem('user', JSON.stringify(updatedUser))
          } else {
            alert(data.message || 'Ошибка при загрузке аватара')
          }
        } catch (err) {
          alert('Сервер недоступен')
        }
      }

      reader.readAsDataURL(file)
    }

    input.click()
  }



  return (
    <div className="container" >
      <LogoHeader />
      <div
        style={{ position: 'relative', marginBottom: '1rem' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={avatar}
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
            data-testid="save-nickname"
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
            <button data-testid="save-nickname" className="button" onClick={handleSave}>Сохранить</button>
          </>
        ) : (
          <>
            <h2 className="heading" style={{ margin: 0 }}>{nickname}</h2>
            <span data-testid="edit-nickname">
              <FaEdit
                onClick={() => setEditing(true)}
                style={{ cursor: 'pointer', color: '#3274D3', width: '30px', height: '30px' }}
                title="Редактировать"
              />
            </span>
          </>
        )}
      </div>

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
        <h3 style={{ marginBottom: '0.5rem' }}>Статистика по курсам</h3>
        {userCourses.map((entry) => {
          const allLevels = ['A1', 'A2', 'B1', 'B2', 'C1']
          const currentIndex = allLevels.indexOf(entry.level)
          const progressPercent = Math.round(((currentIndex) / allLevels.length) * 100)

          return (
            <div key={entry.course} style={{ marginBottom: '1rem' }}>
              <p style={{ marginBottom: '0.25rem' }}>{entry.course.toUpperCase()}</p>
              <div style={{ background: '#e5e7eb', height: '8px', borderRadius: '4px' }}>
                <div
                  style={{
                    background: '#3b82f6',
                    width: `${progressPercent}%`,
                    height: '100%',
                    borderRadius: '4px'
                  }}
                ></div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                Уровень: {entry.level} из C1
              </p>
            </div>
          )
        })}
      </div>



      <button className="button" onClick={() => navigate('/courses')}>
        Перейти к курсам
      </button>
    </div>
  )
}
