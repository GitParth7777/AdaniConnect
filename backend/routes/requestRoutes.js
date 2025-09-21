import express from 'express'
import Request from '../models/Request.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Student sends request to alumni
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can send requests' })
    }

    const { toAlumni } = req.body
    const requestExists = await Request.findOne({
      fromStudent: req.user._id,
      toAlumni,
    })
    if (requestExists) return res.status(400).json({ message: 'Request already sent' })

    const request = await Request.create({
      fromStudent: req.user._id,
      toAlumni,
    })

    res.status(201).json(request)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Student sees their sent requests
router.get('/student', protect, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can view their requests' })
    }

    const requests = await Request.find({ fromStudent: req.user._id }).populate(
      'toAlumni',
      'name company designation skills'
    )
    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Alumni sees received requests
router.get('/alumni', protect, async (req, res) => {
  try {
    if (req.user.role !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can view received requests' })
    }

    const requests = await Request.find({ toAlumni: req.user._id }).populate(
      'fromStudent',
      'name university degree batch skills'
    )
    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Alumni accepts/declines request
router.put('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can update request status' })
    }

    const { status } = req.body // 'accepted' or 'declined'
    const request = await Request.findById(req.params.id)

    if (!request) return res.status(404).json({ message: 'Request not found' })
    if (request.toAlumni.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized' })

    request.status = status
    await request.save()
    res.json(request)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get accepted connections for current user
router.get('/connections', protect, async (req, res) => {
  try {
    let connections

    if (req.user.role === 'student') {
      connections = await Request.find({
        fromStudent: req.user._id,
        status: 'accepted',
      }).populate('toAlumni', 'name company designation skills')
    } else if (req.user.role === 'alumni') {
      connections = await Request.find({
        toAlumni: req.user._id,
        status: 'accepted',
      }).populate('fromStudent', 'name university degree batch skills')
    } else {
      return res.status(403).json({ message: 'Invalid role' })
    }

    res.json(connections)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
