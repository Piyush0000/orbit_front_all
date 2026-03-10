"use client"

import { Product } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/context/CartContext"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const { addToCart } = useCart()

    return (
        <Card
            className="group relative flex flex-col h-full border-white/5 shadow-none transition-all duration-700 overflow-hidden bg-card/20 backdrop-blur-sm rounded-none hover:border-primary/30 velvet-shadow"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/products/${product.id}`} className="block relative">
                <CardHeader className="p-0">
                    <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                        <Image
                            src={product.image[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-1000 brightness-90 contrast-[1.05] grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100"
                        />

                        {/* Luxury Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            {product.originalPrice && product.originalPrice > product.price && (
                                <Badge className="bg-primary text-background font-sans font-bold uppercase text-[9px] tracking-[0.2em] px-3 py-1 border-none rounded-none shadow-xl">
                                    Exclusive Offer
                                </Badge>
                            )}
                            {product.badge && (
                                <Badge className="bg-background/80 backdrop-blur-md text-foreground font-sans font-bold uppercase text-[9px] tracking-[0.2em] px-3 py-1 border border-white/10 rounded-none">
                                    {product.badge}
                                </Badge>
                            )}
                        </div>

                        {/* Status Indicator */}
                        <div className="absolute top-4 right-4 z-10">
                            <div className={`px-2 py-1 flex items-center gap-2 bg-background/60 backdrop-blur-md border border-white/5`}>
                                <div className={`w-1 h-1 rounded-full ${product.veg ? 'bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-primary/80 shadow-[0_0_8px_rgba(191,155,48,0.4)]'}`} />
                                <span className={`text-[8px] font-sans font-bold uppercase tracking-widest text-foreground/80`}>
                                    {product.veg ? 'Botanical' : 'Signature'}
                                </span>
                            </div>
                        </div>

                        {/* Action Overlay */}
                        <div className={`absolute inset-0 bg-background/20 flex items-center justify-center transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                            <Button
                                size="sm"
                                className="relative z-10 bg-primary text-background hover:bg-primary/90 transition-all duration-500 rounded-none px-10 py-6 font-sans font-bold uppercase tracking-[0.2em] text-[10px] velvet-shadow"
                                onClick={(e) => {
                                    e.preventDefault()
                                    addToCart(product)
                                }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add to Selection
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Link>

            <CardContent className="p-6 flex-1 flex flex-col gap-5 bg-gradient-to-b from-transparent to-white/[0.02]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[9px] font-sans font-bold text-primary uppercase tracking-[0.3em]">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span>Score: {product.rating}</span>
                    </div>
                    <span className="text-[9px] font-sans text-muted-foreground uppercase tracking-widest opacity-40">Ref: {String(product.id).slice(0, 8)}</span>
                </div>

                <Link href={`/products/${product.id}`}>
                    <CardTitle className="text-xl font-serif font-bold text-foreground transition-colors hover:text-primary leading-tight line-clamp-2 min-h-[3rem]">
                        {product.name}
                    </CardTitle>
                </Link>

                <p className="text-[11px] text-foreground/70 font-sans font-light line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.originalPrice && (
                            <span className="text-[10px] font-sans text-foreground/50 line-through uppercase tracking-widest">¥{product.originalPrice}</span>
                        )}
                        <span className="text-2xl font-serif font-bold text-primary tracking-tight">¥{product.price}</span>
                    </div>
                    <button
                        className="p-3 rounded-none bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-background hover:velvet-shadow transition-all duration-500 group/btn"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                </div>
            </CardContent>
            {/* Bottom Accent */}
            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                <div className={`h-full bg-primary transition-all duration-1000 ease-out ${isHovered ? 'w-full' : 'w-0'}`} />
            </div>
        </Card>
    )
}
