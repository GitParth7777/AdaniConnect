import React, { useState, useContext } from 'react'
import API from '../api/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    skills: '',
    description: '',
    link: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.company || !formData.description) {
      alert('Please fill in all required fields.')
      return
    }

    try {
      await API.post(
        '/posts',
        {
          ...formData,
          skills: formData.skills
            .split(',')
            .map((skill) => skill.trim())
            .filter(Boolean), // remove empty strings
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      alert('Job post created successfully!')
      navigate('/jobs')
    } catch (error) {
      console.error(error)
      alert(error.response?.data.message || 'Failed to create post')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Job Post
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Job Title *"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name *"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Job Description *"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          required
        />

        <input
          type="url"
          name="link"
          placeholder="Application Link (optional)"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-semibold"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}
