import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome, {user?.name || 'User'}!</p>
        <p className="text-gray-500">Role: {user?.role || 'N/A'}</p>

        {/* Student Features */}
        {user?.role === 'student' && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Student Features</h2>
            <p className="text-gray-600">Connect with alumni for career guidance.</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/alumni')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Browse Alumni
              </button>
              <button
                onClick={() => navigate('/connections')}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                My Connections
              </button>
            </div>
          </div>
        )}

        {/* Alumni Features */}
        {user?.role === 'alumni' && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Alumni Features</h2>
            <p className="text-gray-600">Help students find jobs and share your experience.</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/requests')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                View Connection Requests
              </button>
              <button
                onClick={() => navigate('/connections')}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                My Connections
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
