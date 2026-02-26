import connectMongo from "@/lib/mongodb";
import Post from "@/models/Post";
import Developer from "@/models/Developer";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deletePost } from "@/lib/actions";

export default async function PostDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    await connectMongo();

    const session = await auth();

    const post = await Post.findById(id)
        .populate("authorId", "name image");

    if (!post) {
        notFound();
    }

    const isOwner =
        session?.user?.id === post.authorId?._id?.toString();

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            {/* Title */}
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
                {post.title}
            </h1>

            {/* Author */}
            <div className="text-sm text-slate-500 mb-6">
                By {post.authorId.name}
            </div>

            {/* Content */}
            <div className="prose max-w-none text-slate-800">
                {post.content}
            </div>

            {/* Owner actions */}
            {isOwner && (
                <div className="mt-8 flex gap-4">
                    <Link
                        href={`/posts/${post._id}/edit`}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg"
                    >
                        Edit
                    </Link>

                    <form action={async () => {
                        "use server"
                        await deletePost(post._id)
                    }}>
                        <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg">
                            Delete
                        </button>
                    </form>
                </div>
            )}
        </main>
    );
}
