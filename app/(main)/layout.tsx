import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navigation */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default layout
