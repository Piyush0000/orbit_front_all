import { ProductCard } from "@/components/ProductCard"
import { products } from "@/lib/data"

export default function BestSellers() {
    const bestSellers = products.filter(p => p.badge === "Bestseller").slice(0, 4)

    return (
        <section className="bg-background py-24 md:py-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.05),transparent)]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="space-y-2">
                        <span className="text-primary font-mono font-bold uppercase tracking-[0.5em] text-[10px] animate-pulse">// PRIORITY_ASSETS //</span>
                        <h2 className="text-5xl font-syne font-black tracking-tighter sm:text-6xl text-foreground uppercase italic underline decoration-secondary/30 underline-offset-8">
                            Best Sellers
                        </h2>
                    </div>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl font-sans font-light leading-relaxed opacity-70">
                        Top-tier sustenance protocols with verified high-demand status.
                        Optimize your intake with community-validated nodes.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {bestSellers.map((product) => (
                        <div key={product.id} className="h-full group">
                            <div className="relative h-full transition-all duration-500 hover:-translate-y-2">
                                <ProductCard product={product} />

                                {/* Static Cyber-Accents for Best Sellers */}
                                <div className="absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 border-primary/20 pointer-events-none group-hover:border-primary transition-colors" />
                                <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-primary/20 pointer-events-none group-hover:border-primary transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <div className="h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                </div>
            </div>
        </section>
    )
}

