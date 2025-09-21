import React, { useState, useEffect, useContext } from 'react'
import API from '../api/api'
import { AuthContext } from '../context/AuthContext'

export default function Requests() {
  const { user } = useContext(AuthContext)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await API.get('/request/alumni', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setRequests(data)
      } catch (error) {
        console.error(error)
        alert('Failed to fetch requests')
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [user.token])

  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await API.put(
        `/request/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      setRequests((prev) => prev.map((r) => (r._id === id ? data : r)))
    } catch (error) {
      alert(error.response?.data.message || 'Failed to update status')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading requests...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Connection Requests</h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((r) => (
            <div
              key={r._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-1">{r.fromStudent.name}</h2>
                <p className="text-gray-600 mb-1">
                  {r.fromStudent.university} - {r.fromStudent.degree} ({r.fromStudent.batch})
                </p>
                <p className="text-gray-500 mb-2">
                  Skills: {r.fromStudent.skills?.join(', ') || 'N/A'}
                </p>
                <p className="text-sm text-gray-400 font-medium">Status: {r.status}</p>
              </div>

              {r.status === 'pending' && (
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleUpdateStatus(r._id, 'accepted')}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(r._id, 'declined')}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
