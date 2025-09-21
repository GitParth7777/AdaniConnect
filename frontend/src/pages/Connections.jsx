import React, { useState, useEffect, useContext } from 'react'
import API from '../api/api'
import { AuthContext } from '../context/AuthContext'

export default function Connections() {
  const { user } = useContext(AuthContext)
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const { data } = await API.get('/request/connections', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setConnections(data)
      } catch (error) {
        console.error(error)
        alert('Failed to load connections.')
      } finally {
        setLoading(false)
      }
    }

    fetchConnections()
  }, [user.token])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading connections...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">My Connections</h1>

      {connections.length === 0 ? (
        <p className="text-center text-gray-500">No connections yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((c) => (
            <div
              key={c._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              {user.role === 'student' ? (
                <>
                  <h2 className="text-xl font-semibold mb-1">{c.toAlumni.name}</h2>
                  <p className="text-gray-600 mb-1">{c.toAlumni.company} - {c.toAlumni.designation}</p>
                  {c.toAlumni.skills?.length > 0 && (
                    <p className="text-gray-500 text-sm">
                      Skills: {c.toAlumni.skills.join(', ')}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-1">{c.fromStudent.name}</h2>
                  <p className="text-gray-600 mb-1">
                    {c.fromStudent.university} - {c.fromStudent.degree} ({c.fromStudent.batch})
                  </p>
                  {c.fromStudent.skills?.length > 0 && (
                    <p className="text-gray-500 text-sm">
                      Skills: {c.fromStudent.skills.join(', ')}
                    </p>
                  )}
                </>
              )}
              <p className="mt-2 text-sm text-gray-400">Status: {c.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
