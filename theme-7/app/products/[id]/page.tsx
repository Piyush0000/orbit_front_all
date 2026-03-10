"use client"

import { useParams } from "next/navigation"
import { products, Product } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Star,
    ShoppingBag,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Truck,
    RotateCcw
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
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-8">
                    <h1 className="text-4xl font-serif font-black uppercase tracking-tight">Selection not found</h1>
                    <Link href="/categories/all">
                        <Button variant="ghost" className="font-sans font-black uppercase tracking-[0.3em] px-8 py-6 rounded-full border border-border">Back to Atelier</Button>
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
                <li key={index} className="text-muted-foreground mb-2 text-sm font-sans font-medium uppercase tracking-wide">
                    {hasAllergen ? <strong className="text-foreground border-b border-accent/30">{item}</strong> : item}
                </li>
            )
        })
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-48">
            <div className="container mx-auto px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-3 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-muted-foreground mb-16 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-accent transition-colors">Atelier</Link>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                    <Link href="/categories/all" className="hover:text-accent transition-colors">Boutique</Link>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                    <Link href={`/categories/${product.category}`} className="hover:text-accent transition-colors">{product.category}</Link>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                    <span className="text-foreground">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-start">
                    {/* Left: Image Gallery */}
                    <div className="space-y-8 sticky top-32">
                        <div className="aspect-square relative rounded-3xl overflow-hidden bg-white border border-border shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
                            <Image
                                src={product.image[activeImage]}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-1500 hover:scale-110"
                                priority
                            />
                            {product.badge && (
                                <div className="absolute top-8 left-8 bg-accent text-white text-[10px] font-sans font-black uppercase tracking-[0.4em] px-6 py-3 rounded-full shadow-2xl">
                                    {product.badge}
                                </div>
                            )}
                        </div>
                        {product.image.length > 1 && (
                            <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                                {product.image.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-28 aspect-square rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-accent shadow-lg shadow-accent/20' : 'border-transparent hover:border-border'}`}
                                    >
                                        <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col gap-12">
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <span className={`px-4 py-1.5 rounded-full border text-[9px] font-sans font-black uppercase tracking-widest ${product.veg ? 'bg-green-50 text-green-600 border-green-200' : 'bg-primary/5 text-primary border-primary/20'}`}>
                                    {product.veg ? 'Artisanal' : 'Savory'}
                                </span>
                                <div className="h-4 w-[1px] bg-border" />
                                <span className="text-[9px] font-sans font-black uppercase tracking-widest text-muted-foreground">{product.spiceLevel} Profile</span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tight text-foreground uppercase leading-[0.9]">
                                {product.name.split(" ").map((word, i) => (
                                    <span key={i} className="block">
                                        {i === 1 ? <span className="italic font-light text-accent">{word}</span> : word}
                                    </span>
                                ))}
                            </h1>

                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/5 rounded-full border border-accent/10">
                                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                                    <span className="text-[10px] font-sans font-black text-accent uppercase tracking-widest">{product.rating} / 5.0</span>
                                </div>
                                <span className="text-muted-foreground text-[10px] font-sans font-black uppercase tracking-[0.3em]">{product.reviewCount} Curated Reviews</span>
                            </div>
                        </div>

                        <div className="text-6xl font-serif font-black text-primary tracking-tighter italic">
                            ¥{product.price}
                        </div>

                        <p className="text-muted-foreground text-xl font-sans font-medium leading-relaxed max-w-xl opacity-70 italic underline decoration-accent/20 underline-offset-8">
                            {product.shortDescription}
                        </p>

                        <div className="flex flex-col gap-6 pt-6">
                            <div className="flex items-center gap-4">
                                <QuantitySelector
                                    quantity={quantity}
                                    onIncrement={() => setQuantity(quantity + 1)}
                                    onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-16 px-6"
                                />
                                <Button
                                    className="flex-1 h-16 rounded-full text-[10px] font-sans font-black uppercase tracking-[0.3em] bg-primary text-background hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20"
                                    onClick={() => {
                                        for (let i = 0; i < quantity; i++) addToCart(product)
                                    }}
                                >
                                    <ShoppingBag className="w-5 h-5 mr-3" />
                                    Add to Selection
                                </Button>
                            </div>
                            <Link href="/checkout" className="flex-1">
                                <Button
                                    variant="ghost"
                                    className="w-full h-16 rounded-full text-[10px] font-sans font-black uppercase tracking-[0.3em] border border-border text-foreground hover:bg-muted/50 transition-all"
                                >
                                    Expedited Allocation
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-10 pt-12 border-t border-border mt-8">
                            {[
                                { icon: ShieldCheck, text: "Certified Pure" },
                                { icon: Truck, text: "Bespoke Delivery" },
                                { icon: RotateCcw, text: "Curated Returns" }
                            ].map((badge, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <badge.icon className="w-4 h-4 text-accent/50" />
                                    <span className="text-[9px] font-sans font-black uppercase tracking-widest text-muted-foreground">{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom: Tabs Section */}
                <div className="mb-48">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none h-auto p-0 mb-16 overflow-x-auto overflow-y-hidden no-scrollbar">
                            {['description', 'ingredients', 'nutrition', 'storage'].map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab}
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-12 py-6 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-muted-foreground data-[state=active]:text-foreground transition-all"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="description" className="mt-0 outline-none">
                            <div className="max-w-3xl space-y-10">
                                <p className="text-accent text-3xl font-serif italic font-light leading-relaxed">"{product.shortDescription}"</p>
                                <p className="text-muted-foreground leading-[2] text-lg font-sans font-medium opacity-80 whitespace-pre-wrap first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-foreground">
                                    {product.fullDescription}
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="ingredients" className="mt-0 outline-none">
                            <div className="max-w-4xl bg-white/40 backdrop-blur-md p-16 rounded-[2rem] border border-border shadow-xl">
                                <h3 className="text-[10px] font-sans font-black text-accent mb-12 uppercase tracking-[0.5em]">Composition Archive</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                                    {formatIngredients(product.ingredients)}
                                </ul>
                                <div className="mt-16 p-8 border-l-2 border-accent bg-accent/5 rounded-r-2xl">
                                    <p className="text-[10px] text-muted-foreground italic font-sans font-medium uppercase tracking-[0.1em] leading-relaxed">
                                        * Underlined items denote primary allergens. We maintain rigorous standards of provenance and purity throughout our sourcing protocols.
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
                                <div className="space-y-6 bg-foreground text-background p-16 rounded-[2rem]">
                                    <h3 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-accent">Preservation Protocols</h3>
                                    <p className="text-background/80 leading-loose font-sans font-medium tracking-wide">{product.storage.instructions}</p>
                                </div>
                                <div className="space-y-6 border border-border p-16 rounded-[2rem] bg-white/40">
                                    <h3 className="text-[10px] font-sans font-black text-muted-foreground uppercase tracking-[0.5em]">Freshness Horizon</h3>
                                    <p className="text-foreground leading-tight font-serif font-black text-6xl tracking-tighter uppercase italic">{product.storage.bestBefore}</p>
                                    <p className="text-[9px] font-sans font-black text-accent uppercase tracking-widest">{product.storage.disclaimer}</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="pt-32 border-t border-border">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <span className="h-[1px] w-8 bg-accent/40" />
                                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-accent">
                                        CURATED PAIRINGS
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-foreground uppercase">Accompaniments</h2>
                            </div>
                            <Link href={`/categories/${product.category}`} className="group flex items-center gap-4 text-accent font-sans font-black uppercase tracking-widest text-[10px] border border-border px-8 py-5 rounded-full hover:bg-accent hover:text-white transition-all">
                                View Full Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {relatedProducts.slice(0, 4).map(p => (
                                <div key={p.id}>
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
