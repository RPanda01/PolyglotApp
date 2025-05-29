import { getUserById, updateNickname, updateUserAvatar } from '../models/userModel.js'

export async function getProfile(req, res) {
  const { id } = req.params
  try {
    const user = await getUserById(id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function changeNickname(req, res) {
  const { userId } = req.params
  const { nickname } = req.body

  try {
    await updateNickname(userId, nickname)
    res.json({ success: true, message: 'Nickname updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateAvatar = async (req, res) => {
  const { userId } = req.params
  const { avatarBase64 } = req.body

  const result = await updateUserAvatar(userId, avatarBase64)

  if (result.success) {
    res.json({ success: true, avatarBase64 })
  } else {
    res.status(500).json({ success: false, message: result.message })
  }
}
