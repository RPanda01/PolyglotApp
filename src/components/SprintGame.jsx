import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import wordsEn from '../assets/wordsForEnglishCourse.json'
import wordsFr from '../assets/wordsForFrenchCourse.json'
import wordsEs from '../assets/wordsForSpanishCourse.json'

const courseWords = {
  english: wordsEn,
  french: wordsFr,
  spanish: wordsEs
}

export default function SprintGame({ level = 'A1', courseId }) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isFinished, setIsFinished] = useState(false)
  const [nextLevelUnlocked, setNextLevelUnlocked] = useState(false)

  const wordsData = courseWords[courseId] || []
  const levelWords = wordsData.filter(w => w.level === level)
  const currentWord = levelWords[currentIndex] || null

  useEffect(() => {
    if (timeLeft <= 0 || currentIndex >= levelWords.length) {
      const successRate = score / levelWords.length
      if (successRate >= 0.95) {
        setNextLevelUnlocked(true)
        // Здесь можно обновить состояние в БД или localStorage
      }
      setIsFinished(true)
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, currentIndex])

  const handleAnswer = (answer) => {
    if (answer === currentWord.correct) {
      setScore(score + 1)
    }
    setCurrentIndex(currentIndex + 1)
  }

  const restartGame = () => {
    setCurrentIndex(0)
    setScore(0)
    setTimeLeft(30)
    setIsFinished(false)
    setNextLevelUnlocked(false)
  }

  const getNextLevel = (level) => {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1']
    const index = levels.indexOf(level)
    return index < levels.length - 1 ? levels[index + 1] : null
  }

  if (isFinished) {
    return (
      <div className="container">
        <h2 className="heading">Результат</h2>
        <p className="subtext">
          Вы правильно перевели {score} из {levelWords.length} слов
        </p>

        {nextLevelUnlocked ? (
          <p className='subtext' style={{ color: 'green', marginTop: '1rem' }}>
            🎉 Поздравляем! Уровень {getNextLevel(level)} разблокирован.
          </p>
        ) : (
          <p className='subtext' style={{ color: 'gray', marginTop: '1rem' }}>
            Для открытия следующего уровня нужно не менее 95% правильных ответов :(
          </p>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            className="button"
            onClick={() => navigate(`/courses/${courseId}`)}
          >
            ← Вернуться в курс
          </button>
          <button className="button" onClick={restartGame}>Начать заново</button>

        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="heading">Спринт — уровень {level}</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
        Время: <strong>{timeLeft}s</strong>
      </p>

      {currentWord && (
        <>
          <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Слово: <strong>{currentWord.word}</strong>
          </p>
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '300px', width: '100%' }}>
            {currentWord.options.map((option, index) => (
              <button
                key={index}
                className="button"
                style={{ padding: '0.6rem' }}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}

      <p style={{ marginTop: '2rem', color: '#6b7280' }}>
        Правильных ответов: {score}
      </p>
    </div>
  )
}
