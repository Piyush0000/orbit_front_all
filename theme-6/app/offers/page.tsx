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
                        <div className="h-14 w-14 bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/20 velvet-shadow">
                            <Percent className="w-6 h-6" />
                        </div>
                        <span className="text-primary font-sans font-bold uppercase tracking-[0.4em] text-[10px] block mt-6">Seasonal Selection</span>
                        <h2 className="text-5xl font-serif font-bold tracking-tight sm:text-7xl text-foreground">
                            Top <span className="text-primary italic">Savings</span>
                        </h2>
                        <div className="w-16 h-[1px] bg-primary/30 mx-auto" />
                    </div>
                    <p className="max-w-[700px] text-foreground/70 md:text-lg font-sans font-light leading-relaxed mx-auto italic">
                        Offering an unparalleled opportunity to acquire our premium collections
                        with exclusive concierge-level reductions. Excellence, now more accessible.
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
