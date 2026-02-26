"use server"
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import connectMongo from "./mongodb";
import Post from "@/models/Post";
import Developer from "@/models/Developer";

export async function createPost(formData: FormData) {
    const session = await auth();
    // protect route
    if (!session?.user?.email) {
        redirect("/signin");
    }

    await connectMongo();

    const developer = await Developer.findOne({ email: session.user.email, });

    if (!developer) {
        redirect("/");
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await Post.create({
        title,
        content,
        authorId: developer._id,
    });

    redirect("/posts");
}

export async function deletePost(postId: string) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/posts");
    }

    await connectMongo();

    await Post.findOneAndDelete({
        _id: postId,
        authorId: session.user.id
    });

    redirect("/posts");
}

export async function updatePost(formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/");
    }

    const postId = formData.get("postId") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await Post.findOneAndUpdate(
        {
            _id: postId,
            authorId: session.user.id
        },
        {
            title,
            content
        }
    );

    redirect(`/posts/${postId}`);
}