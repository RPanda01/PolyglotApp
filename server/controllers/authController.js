import db from '../db.js'
import bcrypt from 'bcrypt'

export async function loginUser(req, res) {
  const { login, password } = req.body

  try {
    const result = await db.request()
      .input('login', login)
      .query('SELECT * FROM Users WHERE login = @login')

    if (result.recordset.length === 0) {
      return res.status(401).json({ success: false, message: 'Пользователь не найден' })
    }

    const user = result.recordset[0]
    const hashedPassword = user.password  // здесь лежит хэш из БД

    const isMatch = await bcrypt.compare(password, hashedPassword)

    if (isMatch) {
      res.json({ success: true, user })
    } else {
      res.status(401).json({ success: false, message: 'Неверный пароль' })
    }

  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}


export async function registerUser(req, res) {
  const { login, password, nickname, avatarBase64 } = req.body

  try {
    // Проверка на существование
    const existing = await db.request()
      .input('login', login)
      .query('SELECT id FROM users WHERE login = @login')

    if (existing.recordset.length > 0) {
      return res.status(400).json({ success: false, message: 'Логин уже занят' })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    // Вставка нового пользователя
    const result = await db.request()
      .input('login', login)
      .input('password', hashedPassword) //вставка хэшированного пароля
      .input('nickname', nickname || 'вставьте никнейм')
      .input('avatarBase64', avatarBase64 || null)
      .query(`
        INSERT INTO Users (login, password, nickname, avatarBase64)
        OUTPUT INSERTED.id
        VALUES (@login, @password, @nickname, @avatarBase64)
      `)

    const userId = result.recordset[0].id

    res.json({ success: true, userId, nickname })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}
