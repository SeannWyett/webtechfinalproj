"use client";
import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface UserProfileProps {
  userId: number;
  onClose: () => void;
}

export default function UserProfile({ userId, onClose }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: string; lng: string } | null>(null);

  // Fetch user information
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setCoordinates(data.address.geo); // Use the coordinates from the API
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [userId]);

  // Fetch user's posts
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [userId]);

  if (!user || !coordinates) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg">
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-full max-w-screen-md overflow-y-auto max-h-screen relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          ✖
        </button>

        {/* User Information */}
        <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
        <p className="mb-2">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="mb-2">
          <strong>Website:</strong>{" "}
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            {user.website}
          </a>
        </p>
        <p className="mb-4">
          <strong>Address:</strong> {user.address.street}, {user.address.suite},{" "}
          {user.address.city}, {user.address.zipcode}
        </p>

        {/* Google Maps Embed */}
        <div className="mb-4">
          <iframe
            title="User Location"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        </div>

        {/* User Posts */}
        <h3 className="text-xl font-bold mb-2">Posts by {user.name}</h3>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
            >
              <h4 className="font-semibold">{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}