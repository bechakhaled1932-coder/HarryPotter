import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  house: { type: String, default: null },
  avatar: { type: String, default: null },
  favoriteSpells: [{ type: String }],
  quizHistory: [{
    date: { type: Date, default: Date.now },
    house: String,
    answers: [String],
  }],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('User', userSchema)