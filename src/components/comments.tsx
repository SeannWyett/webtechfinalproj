"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"; // shadCN Card components
import { Button } from "@/components/ui/button"; // shadCN Button component
import UserProfile from "@/components/user_profile"; // Import the UserProfile component

// Define the types for Post, Comment, and User
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  name: string;
  body: string;
  email: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface PostDetailsProps {
  postId: number;
  onClose: () => void; // Callback to close the component
}

export default function PostDetails({ postId, onClose }: PostDetailsProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false); // State to control user profile modal

  // Fetch the post details
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data: Post) => {
        setPost(data);
        // Fetch the user details based on the userId from the post
        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then((response) => response.json())
      .then((userData: User) => setUser(userData))
      .catch((error) => console.error("Error fetching post or user:", error));
  }, [postId]);

  // Fetch the comments for the post
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data: Comment[]) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [postId]);

  if (!post || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading post details...</p>
      </div>
    );
  }

  return (
    <>
      <Card className="mt-8 w-full max-w-2xl mx-auto p-4 sm:p-5 lg:p-6 max-h-[75vh] overflow-y-auto rounded-md shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">{post.title}</CardTitle>
          <p className="text-sm text-gray-500">Post ID: {post.id}</p>
          <p className="text-sm text-gray-500">
            Posted by:{" "}
            <button
              onClick={() => setShowUserProfile(true)} // Show the user profile modal
              className="text-blue-500 hover:underline"
            >
              {user.name}
            </button>
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{post.body}</p>

          <h3 className="text-lg font-bold mb-4">Comments</h3>
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="p-3 border rounded-md bg-gray-50 dark:bg-gray-800"
              >
                <p className="text-md font-semibold">{comment.name}</p>
                <p className="text-gray-700">{comment.body}</p>
                <p className="text-sm text-gray-500">Email: {comment.email}</p>
              </li>
            ))}
          </ul>

          <Button
            variant="outline"
            className="mt-4"
            onClick={onClose}
          >
            Close
          </Button>
        </CardContent>
      </Card>

      {/* User Profile Modal */}
      {showUserProfile && (
        <UserProfile
          userId={user.id} // Pass the user ID to the UserProfile component
          onClose={() => setShowUserProfile(false)} // Close the user profile modal
        />
      )}
    </>
  );
}