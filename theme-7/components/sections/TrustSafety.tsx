import { ShieldCheck, Truck, Leaf, HardHat, Award, Timer, Globe } from "lucide-react"

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-accent" />,
        title: "Certified Excellence",
        description: "Adherence to the highest international quality and safety benchmarks.",
    },
    {
        icon: <Leaf className="w-8 h-8 text-accent" />,
        title: "Artisanal Packing",
        description: "Prepared and sealed meticulously upon allocation for peak freshness.",
    },
    {
        icon: <Timer className="w-8 h-8 text-accent" />,
        title: "Swift Allocation",
        description: "Priority logistics ensuring your selection arrives with expedited care.",
    },
    {
        icon: <Award className="w-8 h-8 text-accent" />,
        title: "Pure Provenance",
        description: "Small-batch ingredients sourced from trusted heirloom producers.",
    },
]

export default function TrustSafety() {
    return (
        <section className="bg-white/40 py-32 md:py-48 border-y border-border relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center space-y-10 group relative p-10 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-3">

                            <div className="relative">
                                <div className="absolute inset-0 bg-accent/10 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-1000" />
                                <div className="relative w-20 h-20 rounded-full bg-white border border-border flex items-center justify-center shadow-sm transition-all duration-700 group-hover:border-accent">
                                    <div className="text-accent group-hover:scale-110 transition-transform duration-700">
                                        {feature.icon}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-serif font-black text-foreground">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-[11px] font-sans font-medium uppercase tracking-[0.2em] leading-relaxed opacity-70">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 text-center animate-in fade-in duration-1000 delay-500">
                    <div className="inline-flex items-center gap-6 text-[10px] font-sans font-black text-accent/40 uppercase tracking-[0.6em]">
                        <span className="h-[1px] w-12 bg-accent/20" />
                        PROVENANCE VERIFIED BY ATELIER
                        <span className="h-[1px] w-12 bg-accent/20" />
                    </div>
                </div>
            </div>
        </section>
    )
}

