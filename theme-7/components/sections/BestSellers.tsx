import { ProductCard } from "@/components/ProductCard"
import { products } from "@/lib/data"

export default function BestSellers() {
    const bestSellers = products.filter(p => p.badge === "Bestseller").slice(0, 4)

    return (
        <section className="bg-background py-32 md:py-48 relative overflow-hidden">
            {/* Soft Background Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24 max-w-2xl mx-auto">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="h-[1px] w-8 bg-accent/40" />
                            <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-accent">
                                THE CURATED SELECTION
                            </span>
                            <span className="h-[1px] w-8 bg-accent/40" />
                        </div>
                        <h2 className="text-5xl font-serif font-black tracking-tight sm:text-7xl text-foreground">
                            Essential <span className="italic font-light text-accent">Provisions</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground md:text-lg font-sans font-medium leading-relaxed opacity-70">
                        Our most sought-after artisanal selections, curated for their
                        exceptional quality and sensory profile.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
                    {bestSellers.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="mt-32 flex flex-col items-center space-y-8 animate-in fade-in duration-1000 delay-500">
                    <div className="h-12 w-[1px] bg-gradient-to-b from-accent/40 to-transparent" />
                    <p className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-accent/60">
                        DISCOVER THE FULL ATELIER
                    </p>
                </div>
            </div>
        </section>
    )
}

