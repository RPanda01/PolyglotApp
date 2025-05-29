import db from '../db.js'

export async function getUserCourseLevel(userId, courseName) {
  const result = await db.request()
    .input('userId', userId)
    .input('courseName', courseName)
    .query(`
      SELECT * FROM UserCourseLevel
      WHERE userId = @userId AND courseName = @courseName
    `)

  return result.recordset[0] || null
}

export async function createUserCourseLevel(userId, courseName, levelCode) {
  await db.request()
    .input('userId', userId)
    .input('courseName', courseName)
    .input('levelCode', levelCode)
    .query(`
      INSERT INTO UserCourseLevel (userId, courseName, levelCode, completedWords, sprintScore, lastUpdated)
      VALUES (@userId, @courseName, @levelCode, 0, 0, GETDATE())
    `)
}

export async function updateUserCourseLevel(userId, courseName, updates) {
  const fields = Object.keys(updates)
  const setClause = fields.map(field => `${field} = @${field}`).join(', ')

  const request = db.request()
    .input('userId', userId)
    .input('courseName', courseName)

  fields.forEach(field => {
    request.input(field, updates[field])
  })

  const query = `
    UPDATE UserCourseLevel
    SET ${setClause}
    WHERE userId = @userId AND courseName = @courseName
  `

  await request.query(query)
}