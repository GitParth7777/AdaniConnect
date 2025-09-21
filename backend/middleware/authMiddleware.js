import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      return next() // proceed to next middleware or route
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  // No token found
  return res.status(401).json({ message: 'Not authorized, no token' })
}
