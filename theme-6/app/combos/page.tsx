import { products } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export default function CombosPage() {
    const combos = products.filter(p => p.category === 'combos')

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Section */}
            <div className="bg-card/20 border-b border-white/5 py-24 md:py-32 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(circle_at_100%_0%,rgba(191,155,48,0.05),transparent_70%)]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

                <div className="container mx-auto px-6 relative z-10 text-center space-y-10">
                    <div className="inline-flex items-center px-6 py-2 border border-primary/20 bg-primary/5 text-primary text-[10px] font-sans font-bold uppercase tracking-[0.4em]">
                        Curated Harmonies
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1] text-foreground">
                        Combos & <span className="text-primary italic">Packs</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-foreground/70 text-lg md:text-xl font-sans font-light leading-relaxed italic">
                        Experience the art of pairing with our masterfully curated bundles,
                        specifically designed to elevate every unique occasion.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 md:px-6 -mt-12 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {combos.map(product => (
                        <div key={product.id} className="relative group h-full">
                            {/* Refined Savings Badge */}
                            {product.originalPrice && (
                                <div className="absolute top-8 right-8 z-20">
                                    <div className="bg-primary px-3 py-6 velvet-shadow border border-primary/20">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-[8px] uppercase font-sans font-bold tracking-widest text-background">Save</span>
                                            <span className="text-sm font-serif font-bold text-background leading-none">¥{product.originalPrice - product.price}</span>
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
