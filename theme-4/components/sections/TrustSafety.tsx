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
        <section className="bg-background py-20 md:py-32 border-t border-primary/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center space-y-6 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700" />
                                <div className="relative rounded-2xl bg-white border border-primary/5 p-6 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                                    <div className="text-primary group-hover:text-secondary transition-colors duration-500">
                                        {feature.icon}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-serif text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground text-[13px] font-light max-w-[220px] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
