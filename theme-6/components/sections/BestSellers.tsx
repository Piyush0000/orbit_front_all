import { ProductCard } from "@/components/ProductCard"
import { products } from "@/lib/data"

export default function BestSellers() {
    const bestSellers = products.filter(p => p.badge === "Bestseller").slice(0, 4)

    return (
        <section className="bg-background py-24 md:py-32 overflow-hidden relative">
            {/* Subtle light accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(191,155,48,0.03),transparent_70%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24 anim-fade-in">
                    <div className="space-y-4">
                        <span className="text-primary font-sans font-bold uppercase tracking-[0.4em] text-[10px]">The Favourites</span>
                        <h2 className="text-5xl font-serif font-bold tracking-tight sm:text-6xl text-foreground">
                            Signature <span className="text-gold">Selection</span>
                        </h2>
                    </div>
                    <div className="w-12 h-[1px] bg-primary/30" />
                    <p className="max-w-[600px] text-foreground/70 md:text-lg font-sans font-light leading-relaxed mx-auto italic">
                        A curated showcase of our most desired offerings, each
                        representing the pinnacle of culinary craftsmanship.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {bestSellers.map((product) => (
                        <div key={product.id} className="h-full group">
                            <div className="relative h-full transition-all duration-700 hover:-translate-y-2">
                                <ProductCard product={product} />

                                {/* Subtle corner accents for best sellers */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 border-t border-r border-primary/20 pointer-events-none group-hover:border-primary/50 transition-colors" />
                                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b border-l border-primary/20 pointer-events-none group-hover:border-primary/50 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 flex justify-center">
                    <div className="h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
            </div>
        </section>
    )
}
