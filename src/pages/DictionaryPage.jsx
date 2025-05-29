import { useState, useEffect } from 'react'
import wordsEn from '../assets/wordsForEnglishCourse.json'
import wordsFr from '../assets/wordsForFrenchCourse.json'
import wordsEs from '../assets/wordsForSpanishCourse.json'

const allLevels = ['A1', 'A2', 'B1', 'B2', 'C1']
const wordsPerPage = 5

const courseWords = {
  english: wordsEn,
  french: wordsFr,
  spanish: wordsEs
}

export default function DictionaryPage({ courseId }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user?.id

  const [level, setLevel] = useState('A1')
  const [openLevels, setOpenLevels] = useState(['A1'])
  const [page, setPage] = useState(0)
  const [learnedWords, setLearnedWords] = useState([])
  const [showLearned, setShowLearned] = useState(false)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const [currentCompletedWords, setCurrentCompletedWords] = useState(0)

  const wordsData = courseWords[courseId] || []
  const currentLevelWords = wordsData.filter(w => w.level === level)

  const learningWordsList = currentLevelWords.slice(currentCompletedWords)
  const totalPages = Math.ceil(learningWordsList.length / wordsPerPage)
  const currentWords = learningWordsList.slice(page * wordsPerPage, (page + 1) * wordsPerPage)

  // 🔹 Загружаем прогресс пользователя один раз при заходе
  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch(`http://localhost:5000/api/course/${userId}/${courseId}`)
        const data = await res.json()
        const userLevel = data?.levelCode || 'A1'
        setCurrentCompletedWords(data?.completedWords || 0)
        setLevel(userLevel)

        const unlockedIndex = allLevels.indexOf(userLevel)
        const unlockedLevels = allLevels.slice(0, unlockedIndex + 1)
        setOpenLevels(unlockedLevels)
      } catch (err) {
        console.error('Ошибка при загрузке прогресса:', err)
      }
    }

    fetchProgress()
  }, [userId, courseId])

  const handleLevelClick = (lvl) => {
    if (!openLevels.includes(lvl)) {
      setShowLockMessage(true)
    } else {
      setLevel(lvl)
      setPage(0)
      setLearnedWords([])
      setShowLockMessage(false)
    }
  }

  const markAsKnown = (word) => {
    if (!learnedWords.includes(word)) {
      setLearnedWords([...learnedWords, word])
    }
  }

  const markAsUnknown = (word) => {
    setLearnedWords(learnedWords.filter(w => w !== word))
  }

  const handleNextPage = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/course/${userId}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseName: courseId,
        updates: {
          completedWords: currentCompletedWords + wordsPerPage
        }
      })
    })

    const data = await response.json()
    if (data.success) {
      console.log('Прогресс обновлён: +', wordsPerPage, 'слов')

      const freshData = await fetch(`http://localhost:5000/api/course/${userId}/${courseId}`)
        .then(res => res.json())
      setCurrentCompletedWords(freshData?.completedWords)
      setLevel(freshData.levelCode)
      
      // 🔹 сбрасываем страницу на 0
      setPage(0)
    } else {
      alert('Ошибка обновления прогресса')
    }
  } catch (err) {
    console.error('Ошибка:', err)
    alert('Сервер недоступен')
  }
}


  return (
    <div className="container">
      <h2 className="heading">Словарь</h2>

      {/* Тумблер режима */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          className="button"
          onClick={() => setShowLearned(false)}
          style={{ backgroundColor: !showLearned ? '#3b82f6' : '#cbd5e1' }}
        >
          Изучаемые слова
        </button>
        <button
          className="button"
          onClick={() => setShowLearned(true)}
          style={{ backgroundColor: showLearned ? '#3b82f6' : '#cbd5e1' }}
        >
          Изученные слова
        </button>
      </div>

      {/* Кнопки уровней */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {allLevels.map(lvl => (
          <button
            key={lvl}
            className="button"
            onClick={() => handleLevelClick(lvl)}
            style={{
              backgroundColor: level === lvl ? '#2563eb' : openLevels.includes(lvl) ? '#3b82f6' : '#cbd5e1',
              cursor: openLevels.includes(lvl) ? 'pointer' : 'not-allowed'
            }}
          >
            {lvl}
          </button>
        ))}
      </div>

      {showLockMessage && (
        <p style={{ color: 'red', marginBottom: '1rem' }}>
          Уровень закрыт. Пройди тест на скорость, чтобы открыть его.
        </p>
      )}

      {showLearned ? (
        currentLevelWords.slice(0, currentCompletedWords).length > 0 ? (
          currentLevelWords.slice(0, currentCompletedWords).map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '1rem',
                background: '#ecfdf5',
                marginBottom: '1rem'
              }}
            >
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <strong>{item.word}</strong> — {item.correct}
              </p>
            </div>
          ))
        ) : (
          <p className="subtext">Нет изученных слов.</p>
        )
      ) : (
        <>
          {currentWords.map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '1rem',
                background: learnedWords.includes(item.word) ? '#ecfdf5' : '#fff',
                marginBottom: '1rem'
              }}
            >
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <strong>{item.word}</strong> — {item.correct}
              </p>
              {learnedWords.includes(item.word) ? (
                <button className="buttonDictionary" onClick={() => markAsUnknown(item.word)}>
                  Убрать из изученных
                </button>
              ) : (
                <button className="buttonDictionary" onClick={() => markAsKnown(item.word)}>
                  Отметить как выученное
                </button>
              )}
            </div>
          ))}

          {page < totalPages - 1 && (
            <button className="button" onClick={handleNextPage}>
              Следующая страница
            </button>
          )}
        </>
      )}
    </div>
  )
}
