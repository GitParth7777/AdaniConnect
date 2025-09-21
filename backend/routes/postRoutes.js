import express from 'express'
import { createPost, getPosts } from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Create a post (alumni only)
router.post('/', protect, async (req, res, next) => {
  if (req.user.role !== 'alumni') {
    return res.status(403).json({ message: 'Only alumni can create posts' })
  }
  next()
}, createPost)

// Get all posts (any logged-in user)
router.get('/', protect, getPosts)

export default router
