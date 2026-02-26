import connectMongo from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo();

        const posts = await Post.find().sort({ createdAt: -1 });

        return NextResponse.json({ ok: true, data: posts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ ok: false, message: "Failed getting Posts", detailsError: String(error) }, { status: 500 });
    }
}