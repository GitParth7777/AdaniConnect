import Post from '../models/Post.js'

// Create a post (alumni only)
export const createPost = async (req, res) => {
  try {
    if (req.user.role !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can create posts' })
    }

    const { title, company, location, skills, description, link } = req.body

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: 'Title, company, location, and description are required' })
    }

    const post = await Post.create({
      title,
      company,
      location,
      skills: skills || [],
      description,
      link: link || '',
      createdBy: req.user._id,
    })

    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 })
      .select('-__v')
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
