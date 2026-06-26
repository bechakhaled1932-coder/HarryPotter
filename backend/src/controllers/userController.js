import User from '../models/User.js'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateHouse = async (req, res) => {
  try {
    const { house, answers } = req.body
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        house,
        $push: { quizHistory: { house, answers } },
      },
      { new: true }
    ).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const toggleFavoriteSpell = async (req, res) => {
  try {
    const { spell } = req.body
    const user = await User.findById(req.userId)
    const index = user.favoriteSpells.indexOf(spell)

    if (index === -1) {
      user.favoriteSpells.push(spell)
    } else {
      user.favoriteSpells.splice(index, 1)
    }

    await user.save()
    res.json({ favoriteSpells: user.favoriteSpells })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}