import { useNavigate } from 'react-router-dom'
import LogoHeader from '../components/logoHeader'
import { PiSignOutBold } from "react-icons/pi";

export default function Courses() {
    const navigate = useNavigate()
    const courses = [
        {
            id: 'english',
            title: 'Английский язык',
            level: 'A1',
            description: 'Базовый курс английского для начинающих.',
            progress: 30,
            lessons: 10,
            completed: 3,
            image: 'https://flagcdn.com/w320/gb.png'
        },
        {
            id: 'french',
            title: 'Французский язык',
            level: 'A2',
            description: 'Основы грамматики и чтения на французском.',
            progress: 10,
            lessons: 12,
            completed: 1,
            image: 'https://flagcdn.com/w320/fr.png'
        },
        {
            id: 'spanish',
            title: 'Испанский язык',
            level: 'B1',
            description: 'Разговорный испанский для повседневного общения.',
            progress: 0,
            lessons: 15,
            completed: 0,
            image: 'https://flagcdn.com/w320/es.png'
        }
    ]

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
                {courses.map(course => (
                    <div
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
                        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>Уровень: {course.level}</p>
                        {/* <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>{course.description}</p> */}
                        <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                            Пройдено {course.completed} из {course.lessons} уроков
                        </p>
                        <div style={{ background: '#e5e7eb', height: '8px', borderRadius: '4px' }}>
                            <div
                                style={{
                                    background: '#3b82f6',
                                    width: `${course.progress}%`,
                                    height: '100%',
                                    borderRadius: '4px'
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
