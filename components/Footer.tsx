const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500 text-center">
                © {new Date().getFullYear()} DevCommunity. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
