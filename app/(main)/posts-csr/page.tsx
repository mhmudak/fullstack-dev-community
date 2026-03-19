"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  content: string;
};

export default function PostsCSRPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-3xl font-semibold text-slate-900">
          Posts (CSR)
        </h1>

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-2xl shadow border border-slate-200"
          >
            <Link
              href={`/posts/${post._id}`}
              className="text-xl font-medium text-slate-900 hover:underline"
            >
              {post.title}
            </Link>

            <p className="text-slate-600 mt-2 line-clamp-2">
              {post.content}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}