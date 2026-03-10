"use client"

import { useParams } from "next/navigation"
import { products, Product } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Star,
    ShoppingCart,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Award
} from "lucide-react"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"

import { VegNonVegBadge, SpiceLevelTag, TrustBadge } from "@/components/ui/custom-badges"
import { QuantitySelector, NutritionTable } from "@/components/ui/product-utils"
import { useCart } from "@/context/CartContext"

export default function ProductDetailPage() {
    const params = useParams()
    const { addToCart } = useCart()
    const id = parseInt(params.id as string)

    const product = products.find(p => p.id === id)
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)

    const relatedProducts = useMemo(() => {
        if (!product) return []
        return products.filter(p => p.category === product.category && p.id !== product.id)
    }, [product])

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-8">
                    <h1 className="text-4xl font-serif font-bold text-foreground">Provenance Not Found</h1>
                    <Link href="/categories/all">
                        <Button className="bg-primary text-background font-sans font-bold uppercase tracking-[0.2em] px-10 h-14 rounded-none">
                            Return to Collection
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const allergens = ["nuts", "cashews", "milk", "soy", "wheat", "peanuts", "egg"]
    const formatIngredients = (ingredients: string[]) => {
        return ingredients.map((item, index) => {
            const hasAllergen = allergens.some(allergen => item.toLowerCase().includes(allergen))
            return (
                <li key={index} className="text-muted-foreground/80 mb-2 text-[13px] font-sans font-medium flex items-center gap-3">
                    <div className="w-1 h-1 bg-primary/40" />
                    {hasAllergen ? <span className="text-primary font-bold">{item}</span> : item}
                </li>
            )
        })
    }

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-foreground relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_100%_0%,rgba(191,155,48,0.03),transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 py-16 relative z-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-4 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-16 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <div className="w-1 h-1 bg-white/10" />
                    <Link href="/categories/all" className="hover:text-primary transition-colors">Curation</Link>
                    <div className="w-1 h-1 bg-white/10" />
                    <Link href={`/categories/${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
                    <div className="w-1 h-1 bg-white/10" />
                    <span className="text-primary truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
                    {/* Left: Image Gallery */}
                    <div className="space-y-8">
                        <div className="relative aspect-[4/5] overflow-hidden bg-card/20 border border-white/5 velvet-shadow">
                            <Image
                                src={product.image[activeImage]}
                                alt={product.name}
                                fill
                                className="object-cover transition-all duration-1000 grayscale-[10%] hover:grayscale-0 hover:scale-105 brightness-90 hover:brightness-100"
                                priority
                            />
                            {product.badge && (
                                <div className="absolute top-8 left-8 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-sans font-bold uppercase tracking-[0.4em] px-6 py-3">
                                    {product.badge}
                                </div>
                            )}
                            {/* Decorative corner accents */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/20" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/20" />
                        </div>
                        {product.image.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {product.image.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 aspect-[4/5] overflow-hidden border transition-all duration-500 shrink-0 ${activeImage === idx ? 'border-primary' : 'border-white/5 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 hover:border-white/20'}`}
                                    >
                                        <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col gap-10">
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <VegNonVegBadge veg={product.veg} />
                                <div className="h-4 w-[1px] bg-white/10" />
                                <SpiceLevelTag level={product.spiceLevel} />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-foreground leading-[1.1]">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2 group">
                                    <Star className="w-4 h-4 fill-primary text-primary" />
                                    <span className="text-lg font-serif font-bold text-foreground">{product.rating}</span>
                                </div>
                                <div className="h-4 w-[1px] bg-white/10" />
                                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{product.reviewCount} Verified Testimonials</span>
                            </div>
                        </div>

                        <div className="text-6xl font-serif font-bold text-primary tracking-tight">
                            ¥{product.price}
                        </div>

                        <p className="text-foreground/70 text-lg font-sans font-light leading-relaxed max-w-xl italic">
                            {product.shortDescription}
                        </p>

                        <div className="flex flex-col gap-6 pt-6">
                            <div className="flex flex-col sm:flex-row items-stretch gap-4">
                                <QuantitySelector
                                    quantity={quantity}
                                    onIncrement={() => setQuantity(quantity + 1)}
                                    onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-16 px-4 bg-white/[0.02] border-white/10"
                                />
                                <Button
                                    className="flex-1 h-16 rounded-none text-[11px] font-sans font-bold uppercase tracking-[0.3em] bg-primary text-background hover:bg-primary/90 transition-all velvet-shadow border border-primary"
                                    onClick={() => {
                                        for (let i = 0; i < quantity; i++) addToCart(product)
                                    }}
                                >
                                    <ShoppingCart className="w-4 h-4 mr-3" />
                                    Add to Selection
                                </Button>
                            </div>
                            <Link href="/checkout" className="w-full">
                                <Button
                                    variant="outline"
                                    className="w-full h-16 rounded-none text-[11px] font-sans font-bold uppercase tracking-[0.3em] border-white/10 hover:bg-white/5 transition-all text-foreground"
                                >
                                    Direct Acquisition
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-6 pt-10 border-t border-white/5">
                            <TrustBadge icon="shield" text="Certified Provenance" />
                            <TrustBadge icon="truck" text="Concierge Delivery" />
                            <TrustBadge icon="refresh" text="Return Privilege" />
                        </div>
                    </div>
                </div>

                {/* Bottom: Tabs Section */}
                <div className="mb-32">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full justify-start border-b border-white/5 bg-transparent rounded-none h-auto p-0 mb-12 overflow-x-auto overflow-y-hidden no-scrollbar">
                            {['description', 'ingredients', 'nutrition', 'storage'].map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab}
                                    className="rounded-none border-b border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-10 py-6 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-muted-foreground/40 data-[state=active]:text-primary transition-all capitalize"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="description" className="mt-0 outline-none">
                            <div className="max-w-4xl space-y-10">
                                <div className="flex gap-6">
                                    <div className="w-1 h-12 bg-primary/20 mt-1" />
                                    <p className="text-muted-foreground leading-relaxed text-2xl font-serif font-light italic">
                                        "Offering an unparalleled sensory journey through meticulous craftsmanship and pure material selection."
                                    </p>
                                </div>
                                <p className="text-foreground/80 leading-relaxed text-lg font-sans font-light whitespace-pre-wrap max-w-3xl">
                                    {product.fullDescription}
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="ingredients" className="mt-0 outline-none">
                            <div className="max-w-3xl bg-card/10 p-12 border border-white/5 velvet-shadow relative">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Award className="w-32 h-32" />
                                </div>
                                <h3 className="text-[10px] font-sans font-bold text-primary mb-10 uppercase tracking-[0.4em]">Curated Components</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 list-none">
                                    {formatIngredients(product.ingredients)}
                                </ul>
                                <div className="mt-12 p-8 bg-background/50 border-l border-primary/40">
                                    <p className="text-[11px] text-muted-foreground/60 italic font-sans font-medium uppercase tracking-widest leading-relaxed">
                                        * Highlighted items represent core focuses or essential profile components. We maintain exhaustive purity standards.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="nutrition" className="mt-0 outline-none">
                            <div className="max-w-md">
                                <NutritionTable nutrition={product.nutrition} />
                            </div>
                        </TabsContent>

                        <TabsContent value="storage" className="mt-0 outline-none">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6 bg-card/20 border border-white/5 p-12 velvet-shadow">
                                    <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary">Preservation Protocol</h3>
                                    <p className="text-muted-foreground/80 leading-relaxed text-lg font-sans font-light italic">{product.storage.instructions}</p>
                                </div>
                                <div className="space-y-6 bg-white/[0.02] border border-white/5 p-12">
                                    <h3 className="text-[10px] font-sans font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">Freshness Assurance</h3>
                                    <p className="text-foreground leading-none font-serif font-bold text-5xl tracking-tight uppercase">
                                        {product.storage.bestBefore}
                                    </p>
                                    <p className="text-[9px] font-sans font-bold text-primary/40 uppercase tracking-[0.4em] pt-4">{product.storage.disclaimer}</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-white/5 pt-24">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <div className="space-y-4">
                                <span className="text-primary font-sans font-bold uppercase tracking-[0.4em] text-[10px]">Selections</span>
                                <h2 className="text-4xl font-serif font-bold tracking-tight text-foreground">Complementary Pairings</h2>
                            </div>
                            <Link href={`/categories/${product.category}`} className="group inline-flex items-center gap-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-primary hover:text-primary/80 transition-all">
                                View Full Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {relatedProducts.slice(0, 4).map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
