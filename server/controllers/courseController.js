import { getUserCourseLevel, createUserCourseLevel, updateUserCourseLevel } from '../models/userCourseLevelModel.js'

export const enterCourseLevel = async (req, res) => {
  const { userId } = req.params
  const { courseName, levelCode } = req.body

  try {
    const existing = await getUserCourseLevel(userId, courseName)

    if (existing) {
      res.json({ success: true, exists: true, data: existing })
    } else {
      await createUserCourseLevel(userId, courseName, levelCode)
      const newRecord = await getUserCourseLevel(userId, courseName)
      res.json({ success: true, exists: false, data: newRecord })
    }
  } catch (err) {
    console.error('Ошибка при входе в курс:', err)
    res.status(500).json({ success: false, message: 'Ошибка базы данных' })
  }
}

export async function fetchUserCourseLevel(req, res) {
  const { id, courseName } = req.params

  try {
    const data = await getUserCourseLevel(id, courseName)
    res.json(data || {})
  } catch (err) {
    console.error('Ошибка при получении уровня курса:', err)
    res.status(500).json({ success: false, message: 'Ошибка сервера' })
  }
}

export async function updateCourseData(req, res) {
  const { userId } = req.params
  const { courseName, updates } = req.body

  try {
    await updateUserCourseLevel(userId, courseName, updates)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Ошибка обновления данных' })
  }
}
