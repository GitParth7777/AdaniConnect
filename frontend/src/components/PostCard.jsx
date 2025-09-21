import React from 'react'

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
        <p className="text-gray-600 mb-1">{post.company}</p>
        {post.location && <p className="text-gray-500 mb-2">{post.location}</p>}
        <p className="text-gray-700 mb-2">{post.description}</p>
        {post.skills?.length > 0 && (
          <p className="text-sm text-gray-600">
            Skills: {post.skills.join(', ')}
          </p>
        )}
      </div>
      {post.link && (
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-blue-600 hover:underline"
        >
          Apply Here
        </a>
      )}
    </div>
  )
}
