import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import AlumniList from './pages/AlumniList'
import Requests from './pages/Requests'
import Connections from './pages/Connections'
import JobPosts from './pages/JobPosts'
import CreatePost from './pages/CreatePost'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard is protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Alumni list, protected and only accessible by students */}
        <Route
          path="/alumni"
          element={
            <ProtectedRoute roles={['student']}>
              <AlumniList />
            </ProtectedRoute>
          }
        />

        {/* Alumni Requests page, protected and only accessible by alumni */}
        <Route
          path="/requests"
          element={
            <ProtectedRoute roles={['alumni']}>
              <Requests />
            </ProtectedRoute>
          }
        />

        {/* Connections page, accessible to both */}
        <Route
          path="/connections"
          element={
            <ProtectedRoute>
              <Connections />
            </ProtectedRoute>
          }
        />

        {/* Job posts, students can view */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute roles={['student']}>
              <JobPosts />
            </ProtectedRoute>
          }
        />

        {/* Create post, only accessible by alumni */}
        <Route
          path="/create-post"
          element={
            <ProtectedRoute roles={['alumni']}>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alumni"
          element={
            <ProtectedRoute roles={['student']}>
              <AlumniList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute roles={['alumni']}>
              <CreatePost />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}
