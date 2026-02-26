import PostCard from "@/components/posts/PostCard"

type Post = {
    _id: string,
    title: string,
    content: string,
    authorId: {
        _id: string,
        name: string,
        image: string
    },
    createdAt: string
}

type PostsGridProps = {
    posts: Post[]
}

const PostsGrid = ({ posts }: PostsGridProps) => {
    return (
        <section>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard
  key={post._id}
  id={post._id}
  title={post.title}
  excerpt={post.content.slice(0, 120) + "..."}
  author={post.authorId?.name ?? "Unknown"}
  date={new Date(post.createdAt).toLocaleDateString()}
/>

                ))}
            </div>
        </section>
    )
}

export default PostsGrid
