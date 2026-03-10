import { products } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import LimitedOffer from "@/components/sections/LimitedOffer"
import { Badge } from "@/components/ui/badge"
import { Percent } from "lucide-react"

export default function OffersPage() {
    const discountedProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price)

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Limited Time Offer Section (Reused) */}
            <LimitedOffer />

            {/* Offers Header */}
            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
                    <div className="space-y-3">
                        <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary mx-auto shadow-inner">
                            <Percent className="w-6 h-6" />
                        </div>
                        <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] block mt-4">Seasonal Discounts</span>
                        <h2 className="text-4xl font-serif tracking-tight sm:text-6xl text-foreground">
                            Top <span className="text-secondary italic">Savings</span>
                        </h2>
                        <div className="w-16 h-1 bg-secondary/30 mx-auto rounded-full" />
                    </div>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl font-light leading-relaxed">
                        Indulge in our premium selections with exclusive limited-time reductions.
                        Artisanal quality, now even more accessible.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {discountedProducts.map(product => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {discountedProducts.length === 0 && (
                    <div className="text-center py-32 flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                            <Percent className="w-10 h-10 text-primary/20" />
                        </div>
                        <p className="text-muted-foreground font-light text-lg">No additional offers available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
