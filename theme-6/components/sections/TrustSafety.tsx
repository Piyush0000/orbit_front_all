import { ShieldCheck, Truck, Leaf, HardHat } from "lucide-react"

const features = [
    {
        icon: <ShieldCheck className="w-10 h-10 text-primary" />,
        title: "Certified Excellence",
        description: "Uncompromising quality standards guaranteed by rigorous certification.",
    },
    {
        icon: <Leaf className="w-10 h-10 text-primary" />,
        title: "Artisanal Freshness",
        description: "Hand-selected and prepared only upon your request to ensure perfection.",
    },
    {
        icon: <Truck className="w-10 h-10 text-primary" />,
        title: "Swift Sanctuary",
        description: "Priority delivery to your doorstep within hours of preparation.",
    },
    {
        icon: <HardHat className="w-10 h-10 text-primary" />,
        title: "Pure Origins",
        description: "100% natural ingredients, free from artificial enhancements.",
    },
]

export default function TrustSafety() {
    return (
        <section className="bg-background py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(191,155,48,0.02),transparent_70%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center space-y-8 group relative p-8 bg-card/10 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-700 hover:velvet-shadow">

                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-1000" />
                                <div className="relative rounded-none bg-background border border-white/5 p-6 transition-all duration-700 group-hover:border-primary/30">
                                    <div className="text-primary group-hover:scale-110 transition-transform duration-700">
                                        {feature.icon}
                                    </div>
                                </div>
                                {/* Elegant Corner Accents */}
                                <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-primary/20" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-primary/20" />
                            </div>

                            <div className="space-y-4 relative z-10">
                                <h3 className="text-xl font-serif font-bold text-foreground tracking-wide group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-foreground/60 text-[11px] font-sans font-medium uppercase tracking-[0.15em] leading-relaxed group-hover:text-foreground/90 transition-all">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-6 text-[10px] font-sans font-bold text-primary/40 uppercase tracking-[0.6em]">
                        <div className="h-[1px] w-12 bg-primary/10" />
                        Provenance Verified
                        <div className="h-[1px] w-12 bg-primary/10" />
                    </div>
                </div>
            </div>
        </section>
    )
}
