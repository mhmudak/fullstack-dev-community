import { auth } from '@/auth';
import { updatePost } from '@/lib/actions';
import connectMongo from '@/lib/mongodb';
import Post from '@/models/Post';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

const EditPostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    await connectMongo();
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/")
    }

    const post = await Post.findById(id);

    if (!post) {
        notFound();
    }

    if (post.authorId.toString() !== session.user.id) {
        redirect("/posts");
    }

    return (
        <main className="min-h-screen py-7 px-6">
            <div className="max-w-2xl mx-auto">

                {/* Card */}
                <div className="relative backdrop-blur-xl border border-slate-200 shadow-2xl rounded-b-3xl p-10">

                    {/* Subtle top accent */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-slate-900 to-indigo-500 rounded-t-3xl"></div>

                    <h1 className="text-4xl font-semibold text-slate-900 tracking-tight mb-10">
                        Edit <span className='text-gradient'>Post</span>
                    </h1>

                    <form action={updatePost} className="space-y-8">

                        <input
                            type="hidden"
                            name="postId"
                            value={post._id.toString()}
                        />

                        {/* Title */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-500">
                                Title
                            </label>
                            <input
                                name="title"
                                defaultValue={post.title}
                                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-500">
                                Content
                            </label>
                            <textarea
                                name="content"
                                defaultValue={post.content}
                                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 h-44 text-slate-900 placeholder-slate-400 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                        >
                            Update Post
                        </button>

                    </form>
                </div>

            </div>
        </main>
    )
}

export default EditPostPage