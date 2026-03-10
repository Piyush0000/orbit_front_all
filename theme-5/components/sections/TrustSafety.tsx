import { ShieldCheck, Truck, Leaf, HardHat } from "lucide-react"

const features = [
    {
        icon: <ShieldCheck className="w-10 h-10 text-primary" />,
        title: "FSSAI Approved",
        description: "Quality and safety standards guaranteed by FSSAI certification.",
    },
    {
        icon: <Leaf className="w-10 h-10 text-primary" />,
        title: "Freshly Packed",
        description: "Packed only after you order to ensure maximum freshness.",
    },
    {
        icon: <Truck className="w-10 h-10 text-primary" />,
        title: "Fast Delivery",
        description: "Get your favorites delivered to your doorstep within hours.",
    },
    {
        icon: <HardHat className="w-10 h-10 text-primary" />,
        title: "No Artificials",
        description: "100% natural ingredients with no artificial preservatives.",
    },
]

export default function TrustSafety() {
    return (
        <section className="bg-background py-24 md:py-32 border-t border-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center space-y-8 group relative p-8 bg-card/20 backdrop-blur-md border border-primary/10 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2">
                            {/* Scanning line for each box */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 -translate-y-full group-hover:animate-scan-slow pointer-events-none opacity-20" />

                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-none blur-2xl scale-0 group-hover:scale-110 transition-transform duration-700" />
                                <div className="relative rounded-none bg-black border border-primary/20 p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]">
                                    <div className="text-primary group-hover:scale-110 transition-transform duration-500">
                                        {feature.icon}
                                    </div>
                                </div>
                                {/* Corner Accents */}
                                <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-primary/40" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-primary/40" />
                            </div>

                            <div className="space-y-3 relative z-10">
                                <h3 className="text-xl font-syne font-bold text-foreground uppercase tracking-tight italic group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-[11px] font-mono font-bold uppercase tracking-widest leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                                    // {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-4 text-[10px] font-mono font-bold text-primary/40 uppercase tracking-[0.6em]">
                        <div className="h-[1px] w-12 bg-primary/20" />
                        Secure_Node_V5.0.2_Verified
                        <div className="h-[1px] w-12 bg-primary/20" />
                    </div>
                </div>
            </div>
        </section>
    )
}

