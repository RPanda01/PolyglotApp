import { useParams, useNavigate } from 'react-router-dom'
import DictionaryPage from '../components/DictionaryPage'
import LogoHeader from '../components/logoHeader'

export default function DictionaryRoute() {
  const { lang } = useParams()
  const navigate = useNavigate()

  return (
    <div className="container">
      <LogoHeader />
      <DictionaryPage courseId={lang} />
      <button
        className="button"
        style={{ margin_bottom: "2rem" }}
        onClick={() => navigate(`/courses/${lang}`)}
      >
        ← Вернуться в курс
      </button>
    </div>
  )
}