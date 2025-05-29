import db from '../db.js'

export async function getUserById(id) {
  const result = await db.request()
    .input('id', id)
    .query('SELECT * FROM Users WHERE id = @id')

  return result.recordset[0]
}

export async function updateNickname(userId, nickname) {
  await db.request()
    .input('userId', userId)
    .input('nickname', nickname)
    .query('UPDATE Users SET nickname = @nickname WHERE id = @userId')
}

export const updateUserAvatar = async (userId, avatarBase64) => {
  try {
    console.log('avatarBase64 length:', avatarBase64.length)
    console.log('avatarBase64 preview:', avatarBase64.slice(0, 100))

    await db.request()
      .input('userId', userId)
      .input('avatarBase64', avatarBase64)
      .query('UPDATE Users SET avatarBase64 = @avatarBase64 WHERE id = @userId')

    return { success: true }
  } catch (err) {
    console.error('Ошибка в updateUserAvatar:', err)
    return { success: false, message: 'Ошибка базы данных' }
  }
}