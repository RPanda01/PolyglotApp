import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Profile from './pages/Profile'

import CoursePage from './pages/CoursePage'
import AITrainer from './pages/AITrainer'
import DictionaryRoute from './routes/DictionaryRoute'
import SprintRoute from './routes/SprintRoutes'
const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/courses', element: <Courses /> },
    { path: '/courses/:lang', element: <CoursePage /> },
    { path: '/courses/:lang/dictionary', element: <DictionaryRoute /> },
    { path: '/courses/:lang/sprint', element: <SprintRoute /> },
    { path: '/courses/:lang/ai', element: <AITrainer /> }
], 
{
    basename: '/PolyglotApp'
}
)

export default router