"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"; // shadCN Card components
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // shadCN Dialog components
import PostDetails from "@/components/comments"; // Import the PostDetails component

// Define the types for Post and User
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // Fetch posts on component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data: Post[]) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Fetch users on component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Find the user who created a post
  const getUserName = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  return (
    <main className="flex-1 p-6">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      {/* Posts Section */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="cursor-pointer hover:shadow-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:shadow-md"
          >
            <div
              onClick={() => setSelectedPostId(post.id)} // Set the selected post ID
              className="p-4"
            >
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Posted by: {getUserName(post.userId)}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Post Details Modal */}
      <Dialog open={!!selectedPostId} onOpenChange={() => setSelectedPostId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
          </DialogHeader>
          {selectedPostId && (
            <PostDetails
              postId={selectedPostId} // Pass the selected post ID
              onClose={() => setSelectedPostId(null)} // Reset the selected post ID on close
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}