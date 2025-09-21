import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-gray-300">
        AdaniConnect
      </Link>

      <div className="flex items-center space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="font-medium">{user.name}</span>

            {/* Role-based navigation */}
            {user.role === 'student' && (
              <>
                <Link
                  to="/alumni"
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Alumni
                </Link>
                <Link
                  to="/jobs"
                  className="bg-teal-600 px-3 py-1 rounded hover:bg-teal-700 transition"
                >
                  Job Posts
                </Link>
              </>
            )}

            {user.role === 'alumni' && (
              <>
                <Link
                  to="/requests"
                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Requests
                </Link>
                <Link
                  to="/create-post"
                  className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700 transition"
                >
                  Create Post
                </Link>
              </>
            )}

            {/* Connections accessible to both roles */}
            <Link
              to="/connections"
              className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 transition"
            >
              Connections
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
