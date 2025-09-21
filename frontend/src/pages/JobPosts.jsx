import React, { useState, useEffect, useContext } from 'react'
import API from '../api/api'
import { AuthContext } from '../context/AuthContext'
import PostCard from '../components/PostCard'

export default function JobPosts() {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.token) return

    const fetchPosts = async () => {
      try {
        setLoading(true)
        const { data } = await API.get('/posts', {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        alert('Failed to fetch job posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [user?.token])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading job posts...
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-blue-50">
      <h1 className="text-3xl font-bold text-center mb-8">Job Opportunities</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No job posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
