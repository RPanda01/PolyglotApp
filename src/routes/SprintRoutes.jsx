import { useParams, useNavigate } from 'react-router-dom'
import SprintGame from '../components/SprintGame'
import LogoHeader from '../components/logoHeader'

export default function SprintRoute() {
  const { lang } = useParams()
  const navigate = useNavigate()

  return (
    <div className="container">
      <LogoHeader />
      <SprintGame courseId={lang} level="A1" />
    </div>
    
  )
}