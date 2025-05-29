import { useParams, useLocation } from 'react-router-dom'
import { useState } from 'react'
import SprintGame from '../pages/SprintGame'
import LogoHeader from '../components/logoHeader'

export default function SprintRoute() {
  const { lang } = useParams()
  const location = useLocation()
  const [level, setLevel] = useState(location.state?.levelCode || 'A1')
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user?.id

  const refreshLevel = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/course/${userId}/${lang}`)
      const data = await response.json()
      setLevel(data?.levelCode || 'A1')
    } catch (err) {
      console.error('Ошибка при обновлении уровня:', err)
    }
  }

  return (
    <div className="container">
      <LogoHeader />
      <SprintGame courseId={lang} level={level} refreshLevel={refreshLevel} />
    </div>

  )
}