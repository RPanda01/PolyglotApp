import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Profile from './pages/Profile'

import CoursePage from './components/CoursePage'
import DictionaryRoute from './routes/DictionaryRoute'
import SprintRoute from './routes/SprintRoutes'
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/profile', element: <Profile /> },
//   { path: '/courses/english', element: <EnglishCourse /> },
//   { path: '/courses/french', element: <FrenchCourse /> },
//   { path: '/courses/spanish', element: <SpanishCourse /> },
   // 💡 Курсы
  { path: '/courses', element: <Courses /> },
  { path: '/courses/:lang', element: <CoursePage /> },
  { path: '/courses/:lang/dictionary', element: <DictionaryRoute /> },
  { path: '/courses/:lang/sprint', element: <SprintRoute /> }
])

export default router