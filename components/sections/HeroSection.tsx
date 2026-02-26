import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

const HeroSection = () => {
    return (
        <section className="py-16">
            <Card className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">
                    Developer Community Platform
                </h1>

                <p className="text-lg text-slate-600 mb-8">
                    Share knowledge, publish posts, and connect with developers around the world.
                </p>

                <Button className="px-6 py-3 rounded-xl">
                    Sign in with GitHub
                </Button>
            </Card>
        </section>
    )
}

export default HeroSection
