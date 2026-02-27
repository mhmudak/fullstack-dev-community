import { auth } from "@/auth";
import connectMongo from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectMongo();
        const { id } = await params;
        const post = await Post.findById(id)
            .populate("authorId", "name image");

        if (!post) {
            return NextResponse.json(
                { message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(post, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch post", detailsError: String(error) },
            { status: 500 }
        )
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();

        const { id } = await params;
        const body = await req.json();

        const updated = await Post.findOneAndUpdate(
            { _id: id, authorId: session.user.id },
            {
                title: body.title,
                content: body.content
            },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json("Post not found or forbidden", { status: 404 });
        }

        return NextResponse.json(updated, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update post", detailsError: String(error) },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        const { id } = await params;

        const deleted = await Post.findOneAndDelete({
            _id: id,
            authorId: session.user.id
        });

        if (!deleted) {
            return NextResponse.json({ message: "Post not found or forbidden" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted" }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Failed to delete post", detailsError: String(error) },
            { status: 500 }
        );
    }
}