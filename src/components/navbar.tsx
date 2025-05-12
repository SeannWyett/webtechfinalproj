"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // shadCN Input component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // shadCN DropdownMenu components
import UserProfile from "@/components/user_profile"; // Import the UserProfile component

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Fetch users on component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter users based on the search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          My Dashboard
        </div>

        {/* Search Bar */}
        <div className="relative w-1/2">
          <Input
            type="text"
            placeholder="Search for users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dark:bg-gray-700 dark:text-white"
          />
          {filteredUsers.length > 0 && (
            <ul className="absolute z-10 bg-white dark:bg-gray-700 dark:text-white w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none">
              <span>Settings</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-gray-700">
            <DropdownMenuItem onClick={toggleDarkMode}>
              {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* User Profile Modal */}
      {selectedUserId && (
        <UserProfile
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </nav>
  );
}