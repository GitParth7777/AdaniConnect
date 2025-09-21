import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to AdaniConnect</h1>
        <p className="text-gray-600">
          Connect with alumni for career guidance and job opportunities.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link
            to="/login"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
