"use client";
import React, { useState, useEffect } from "react";
import UserProfile from "../../components/user_profile";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Fetch users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
        Users
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> {user.email}
            </p>
          </li>
        ))}
      </ul>

      {selectedUserId && (
        <UserProfile
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}