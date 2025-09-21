import express from 'express'
import User from '../models/User.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get own profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update own profile
router.put('/me', protect, async (req, res) => {
  try {
    const updates = req.body
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get list of alumni (for students)
router.get('/alumni', protect, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can view alumni list' })
    }
    const alumniList = await User.find({ role: 'alumni' }).select('-password')
    res.json(alumniList)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get list of students (for alumni)
router.get('/students', protect, async (req, res) => {
  try {
    if (req.user.role !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can view students list' })
    }
    const studentList = await User.find({ role: 'student' }).select('-password')
    res.json(studentList)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
