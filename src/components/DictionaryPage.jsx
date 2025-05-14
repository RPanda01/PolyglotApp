import { useState, useMemo } from 'react'
import wordsEn from '../assets/wordsForEnglishCourse.json'
import wordsFr from '../assets/wordsForFrenchCourse.json'
import wordsEs from '../assets/wordsForSpanishCourse.json'

const levelList = ['A1', 'A2', 'B1', 'B2', 'C1']
const openLevels = ['A1'] // в будущем берётся из БД
const wordsPerPage = 5
const courseWords = {
  english: wordsEn,
  french: wordsFr,
  spanish: wordsEs
}


export default function DictionaryPage({ courseId }) {
  const [level, setLevel] = useState('A1')
  const [page, setPage] = useState(0)
  const [learnedWords, setLearnedWords] = useState([])
  const [showLockMessage, setShowLockMessage] = useState(false)

  const wordsData = courseWords[courseId] || []

  const filteredWords = useMemo(
    () => wordsData.filter((w) => w.level === level),
    [level]
  )

  const totalPages = Math.ceil(filteredWords.length / wordsPerPage)
  const currentWords = filteredWords.slice(page * wordsPerPage, (page + 1) * wordsPerPage)

  const allOnPageLearned = currentWords.every((w) => learnedWords.includes(w.word))
  const levelCompleted = learnedWords.length === filteredWords.length

  const markAsKnown = (word) => {
    if (!learnedWords.includes(word)) {
      setLearnedWords([...learnedWords, word])
    }
  }

  const markAsUnknown = (word) => {
    setLearnedWords(learnedWords.filter((w) => w !== word))
  }

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

  return (
    <div className="container">
      <h2 className="heading">Словарь</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {levelList.map((lvl) => (
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

      {!levelCompleted ? (
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

          {allOnPageLearned && page < totalPages - 1 && (
            <button className="button" onClick={() => setPage(page + 1)}>Следующая страница</button>
          )}
        </>
      ) : (
        <p className="subtext" style={{ marginTop: '2rem' }}>
          🎉 Поздравляю! Ты изучил все слова уровня {level}. Пройди тест на скорость, чтобы открыть следующий уровень.
        </p>
      )}
    </div>
  )
}
