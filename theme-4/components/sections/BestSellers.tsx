import { ProductCard } from "@/components/ProductCard"
import { products } from "@/lib/data"

export default function BestSellers() {
    const bestSellers = products.filter(p => p.badge === "Bestseller").slice(0, 4)

    return (
        <section className="bg-background py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
                    <div className="space-y-3">
                        <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px]">Most Loved</span>
                        <h2 className="text-4xl font-serif tracking-tight sm:text-5xl text-foreground">Best Sellers</h2>
                        <div className="w-16 h-1 bg-secondary/30 mx-auto rounded-full" />
                    </div>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl font-light leading-relaxed">
                        Our community&apos;s most loved snacks and beverages,
                        crafted for the discerning palate.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {bestSellers.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
