import PageHeader from "@/components/sections/PageHeader";
import { createPost } from "@/lib/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();

    // protect the route
    if (!session?.user?.id) {
        redirect("/");
    }

    return (
        <>
            <PageHeader
                title={
                    <>
                        Create a New{" "}
                        <span className="text-gradient">
                            Post
                        </span>
                    </>
                }
                subtitle="Share your knowledge"
            />

            <form
                action={createPost}
                className="relative max-w-xl mx-auto space-y-4 border border-accent border border-slate-200 shadow-2xl rounded-b-3xl p-10"
            >
                {/* Subtle top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-slate-900 to-indigo-500 rounded-t-3xl"></div>
                <input
                    type="text"
                    name="title"
                    placeholder="Post title"
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                />

                <textarea
                    name="content"
                    placeholder="Write your post..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 h-44 text-slate-900 placeholder-slate-400 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                />

                <button type="submit" className='w-full flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fade-up_0.5s_ease-out_0.3s_both]'>
                    <div
                        className='w-full  group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105'>
                        <span className='w-full  relative z-10'>Publish Post</span>
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                    </div>
                </button>
            </form>
        </>
    );
}
