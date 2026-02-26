import Link from "next/link";
import Button from "./ui/Button";
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-semibold text-slate-800 hover:text-slate-900 transition"
                >
                    DevCommunity
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
                    <Link href="/posts" className="hover:text-slate-900 transition">
                        Posts
                    </Link>
                    <Link href="/developers" className="hover:text-slate-900 transition">
                        Developers
                    </Link>

                    {session ? (
                        <>
                            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fade-up_0.5s_ease-out_0.3s_both]'>
                                <Link href="/posts/new"
                                    className='group relative inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition rounded-xl overflow-hidden transition-all duration-300 hover:scale-105'
                                >
                                    <span className='relative z-10'>New Post</span>
                                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>
                                </Link>
                            </div>

                            {session.user?.image && (
                                <Image
                                    src={session.user.image}
                                    alt="User Image"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            )}

                            <form
                                action={async () => {
                                    "use server";
                                    await signOut();
                                }}
                            >
                                <Button>Sign out</Button>
                            </form>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server";
                                await signIn("github");
                            }}
                        >
                            <Button>Sign in with GitHub</Button>
                        </form>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
