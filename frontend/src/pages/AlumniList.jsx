import React, { useState, useEffect, useContext } from 'react'
import API from '../api/api'
import { AuthContext } from '../context/AuthContext'

export default function AlumniList() {
  const [alumni, setAlumni] = useState([])
  const [requests, setRequests] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const { data } = await API.get('/profile/alumni', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setAlumni(data)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchRequests = async () => {
      try {
        const { data } = await API.get('/request/student', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setRequests(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAlumni()
    fetchRequests()
  }, [])

  const handleSendRequest = async (alumniId) => {
    try {
      await API.post(
        '/request',
        { toAlumni: alumniId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      alert('Request sent!')
      setRequests([...requests, { toAlumni: { _id: alumniId }, status: 'pending' }])
    } catch (error) {
      alert(error.response?.data.message || 'Failed to send request')
    }
  }

  const isRequested = (alumniId) => {
    return requests.some((r) => r.toAlumni._id === alumniId)
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-green-50">
      <h1 className="text-3xl font-bold text-center mb-8">Alumni Directory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumni.map((a) => (
          <div
            key={a._id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col justify-between"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{a.name}</h2>
              <p className="text-gray-600 mb-1">{a.company} - {a.designation}</p>
              <p className="text-gray-500 text-sm">Skills: {a.skills?.join(', ') || 'N/A'}</p>
            </div>
            <button
              onClick={() => handleSendRequest(a._id)}
              disabled={isRequested(a._id)}
              className={`w-full py-2 rounded-md font-semibold transition ${
                isRequested(a._id)
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isRequested(a._id) ? 'Requested' : 'Send Request'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
