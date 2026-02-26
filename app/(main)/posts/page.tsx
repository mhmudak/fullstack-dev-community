import PageHeader from "@/components/sections/PageHeader"
import PostsGrid from "@/components/sections/PostsGrid"
import connectMongo from "@/lib/mongodb"
import Post from "@/models/Post"

export default async function PostsPage() {
    await connectMongo();
    const posts = await Post.find()
    .populate("authorId", "name image")
    .sort({ createdAt: -1 });
    
    const formattedPosts = posts.map((post) => ({
        _id: post._id.toString(),
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        createdAt: post.createdAt.toISOString(),
    }));

    return (
        <>
            <PageHeader
                title="Community Posts"
                subtitle="Discover knowledge shared by developers."
            />

            <PostsGrid posts={formattedPosts} />
        </>
    )
}
