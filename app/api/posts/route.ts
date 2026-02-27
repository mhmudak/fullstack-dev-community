import { auth } from "@/auth";
import connectMongo from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo();

        const posts = await Post.find().sort({ createdAt: -1 }).populate("authorId", "name image");

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch Posts", detailsError: String(error) }, { status: 500 });
    }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, content } = body;

    await connectMongo();

    const post = await Post.create({
      title,
      content,
      authorId: session.user.id,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create post", detailsError: String(error) },
      { status: 500 }
    );
  }
}