import { useNavigate } from 'react-router-dom'
import LogoHeader from '../components/logoHeader'
import { useEffect, useState } from 'react'
import { PiSignOutBold } from "react-icons/pi";

export default function Courses() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [userProgress, setUserProgress] = useState({})

    const courses = [
        {
            id: 'english',
            title: 'Английский язык',
            image: 'https://flagcdn.com/w320/gb.png',
            totalWords: 100
        },
        {
            id: 'french',
            title: 'Французский язык',
            image: 'https://flagcdn.com/w320/fr.png',
            totalWords: 120
        },
        {
            id: 'spanish',
            title: 'Испанский язык',
            image: 'https://flagcdn.com/w320/es.png',
            totalWords: 150
        }
    ]

    useEffect(() => {
        if (!user) return

        courses.forEach(course => {
            fetch(`http://localhost:5000/api/course/${user.id}/${course.id}`)
                .then(res => res.json())
                .then(data => {
                    setUserProgress(prev => ({
                        ...prev,
                        [course.id]: data
                    }))
                })
                .catch(err => console.error('Ошибка загрузки прогресса по курсу', course.id))
        })
    }, [])

    const getProgressData = (courseId, totalWords) => {
        const entry = userProgress[courseId]
        const level = entry?.levelCode || 'A1'
        const completedWords = entry?.completedWords || 0
        const completedLessons = Math.floor(completedWords / 10)
        const totalLessons = Math.ceil(totalWords / 10)
        const progressPercent = Math.min(100, Math.round((completedLessons / totalLessons) * 100))
        return { level, completedLessons, totalLessons, progressPercent }
    }

    return (
        <div style={{ padding: '6rem 2rem' }}>
            <LogoHeader />
            <PiSignOutBold
                onClick={() => navigate('/profile')}
                title="Вернуться в профиль"
                style={{
                    fontSize: '2.5rem',
                    position: 'absolute',
                    top: '1rem',
                    right: '1.5rem',
                    color: '#3b82f6',
                    cursor: 'pointer'
                }}
            />

            <h2 className="heading" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Доступные курсы
            </h2>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {courses.map(course => {
                    const userData = userProgress[course.id]
                    const level = userData?.levelCode || 'A1'
                    const sprintScore = userData?.sprintScore || 0
                    const completedWords = userData?.completedWords || 0

                    return (
                        <div
                            data-testid={`course-card-${course.id}`}
                            key={course.id}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                width: '300px',
                                padding: '1.5rem',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate(`/courses/${course.id}`)}
                        >
                            <img src={course.image} alt={course.title} style={{ width: '64px', marginBottom: '1rem' }} />
                            <h3>{course.title}</h3>

                            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                                Уровень: {level}
                            </p>

                            <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                Изучено слов: {completedWords}
                            </p>

                            <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                Прогресс Спринта {sprintScore}%
                            </p>

                            <div style={{ background: '#e5e7eb', height: '8px', borderRadius: '4px' }}>
                                <div
                                    style={{
                                        background: '#3b82f6',
                                        width: `${sprintScore}%`,
                                        height: '100%',
                                        borderRadius: '4px'
                                    }}
                                ></div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )

}
