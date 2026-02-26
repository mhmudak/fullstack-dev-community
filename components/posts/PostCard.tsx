import Card from "@/components/ui/Card"
import Link from "next/link"

type PostCardProps = {
    id: string
    title: string
    excerpt: string
    author: string
    date: string
}

const PostCard = ({ id, title, excerpt, author, date }: PostCardProps) => {
    return (
        <Card className="hover:shadow-md transition">
            <Link href={`/posts/${id}`} className="block">
                <h2 className="text-xl font-semibold text-slate-900 mb-2 hover:underline">
                    {title}
                </h2>

                <p className="text-slate-600 text-sm mb-4">
                    {excerpt}
                </p>

                <div className="text-xs text-slate-500 flex justify-between">
                    <span>{author}</span>
                    <span>{date}</span>
                </div>
            </Link>
        </Card>
    )
}

export default PostCard
