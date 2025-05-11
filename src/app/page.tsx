"use client";
import React, { useState, useEffect } from 'react';

// Define the type for a Post
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Define the type for a Comment
interface Comment {
  id: number;
  name: string;
  body: string;
  email: string;
}

// Define the type for a User
interface User {
  id: number;
  name: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // Fetch posts on component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data: Post[]) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Fetch users on component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Fetch comments when a post is selected
  useEffect(() => {
    if (selectedPostId !== null) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPostId}/comments`)
        .then((response) => response.json())
        .then((data: Comment[]) => setComments(data))
        .catch((error) => console.error('Error fetching comments:', error));
    }
  }, [selectedPostId]);

  // Find the user who created a post
  const getUserName = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
            >
              <p className="text-sm text-gray-500 mb-2">
                Posted by: {getUserName(post.userId)}
              </p>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))}
        </div>

        {selectedPostId && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Comments for Post {selectedPostId}
            </h2>
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="p-4 border rounded-lg bg-gray-50"
                >
                  <p className="text-lg font-semibold">{comment.name}</p>
                  <p className="text-gray-700">{comment.body}</p>
                  <p className="text-sm text-gray-500">Email: {comment.email}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
  );
}