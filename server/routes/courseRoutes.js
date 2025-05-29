import { enterCourseLevel, fetchUserCourseLevel, updateCourseData } from '../controllers/courseController.js'
import express from 'express'


const router = express.Router()
router.post('/:userId/enter', enterCourseLevel)
router.get('/:id/:courseName', fetchUserCourseLevel)
router.put('/:userId/update', updateCourseData)

export default router