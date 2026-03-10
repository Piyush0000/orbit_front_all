import { products } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export default function CombosPage() {
    const combos = products.filter(p => p.category === 'combos')

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Section */}
            <div className="bg-primary text-primary-foreground py-20 md:py-32 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-[0.3em] shadow-lg">
                        Curated Bundles
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-tight">
                        Combos & <span className="text-secondary italic">Packs</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-primary-foreground/70 text-lg md:text-xl font-light leading-relaxed">
                        Indulge in our masterfully curated bundles, specifically designed
                        to offer more value for every unique occasion.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 md:px-6 -mt-12 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {combos.map(product => (
                        <div key={product.id} className="relative group h-full">
                            {/* Refined Savings Badge - Moved to bottom-right of image area to avoid top overlaps */}
                            {product.originalPrice && (
                                <div className="absolute top-[35%] -right-4 z-20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                    <div className="h-16 w-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-2xl border-4 border-background">
                                        <div className="flex flex-col items-center leading-none">
                                            <span className="text-[10px] uppercase font-bold tracking-tighter">Save</span>
                                            <span className="text-sm font-serif">₹{product.originalPrice - product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            {combos.length === 0 && (
                <div className="text-center py-32 flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                        <ShoppingCart className="w-10 h-10 text-primary/20" />
                    </div>
                    <p className="text-muted-foreground font-light text-lg">No bundles available at the moment.</p>
                </div>
            )}
        </div>
    )
}
