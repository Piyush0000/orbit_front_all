"use client"

import { Product } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingBag, Plus, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            className="group relative flex flex-col h-full border-border/50 shadow-none transition-all duration-700 overflow-hidden bg-white/40 backdrop-blur-sm rounded-2xl hover:border-accent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/products/${product.id}`} className="block relative">
                <CardHeader className="p-0">
                    <div className="aspect-[4/5] relative overflow-hidden bg-muted/20">
                        <Image
                            src={product.image[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-1000 group-hover:scale-105"
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            {product.originalPrice && product.originalPrice > product.price && (
                                <Badge className="bg-accent text-white font-sans font-bold uppercase text-[8px] tracking-[0.2em] px-3 py-1 border-none rounded-full shadow-lg shadow-accent/20">
                                    Selection Offer
                                </Badge>
                            )}
                            {product.badge && (
                                <Badge className="bg-primary text-white font-sans font-bold uppercase text-[8px] tracking-[0.2em] px-3 py-1 border-none rounded-full shadow-lg shadow-primary/20">
                                    {product.badge}
                                </Badge>
                            )}
                        </div>

                        {/* Status Indicator */}
                        <div className="absolute top-4 right-4 z-10">
                            <div className="px-3 py-1.5 flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full border border-white/40 shadow-sm">
                                <div className={`w-1.5 h-1.5 rounded-full ${product.veg ? 'bg-green-500' : 'bg-primary/50'}`} />
                                <span className="text-[8px] font-sans font-black uppercase tracking-wider text-foreground/60">
                                    {product.veg ? 'Artisanal' : 'Savory'}
                                </span>
                            </div>
                        </div>

                        {/* Action Overlay */}
                        <div className={`absolute inset-0 bg-background/20 flex items-center justify-center transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                            <Button
                                size="sm"
                                className="relative z-10 bg-white text-foreground hover:bg-primary hover:text-white transition-all duration-500 rounded-full px-8 py-6 font-sans font-bold uppercase tracking-widest text-[10px] shadow-xl border border-border"
                                onClick={(e) => {
                                    e.preventDefault()
                                    // alert initialized logic
                                }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Selection
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Link>

            <CardContent className="p-6 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="px-2 py-0.5 bg-accent/5 rounded-full border border-accent/10 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-accent" />
                        <span className="text-[8px] font-sans font-bold text-accent uppercase tracking-widest">{product.rating} / 5.0</span>
                    </div>
                    <span className="text-[9px] font-sans font-medium text-muted-foreground uppercase tracking-widest">Archive No. {String(product.id).slice(0, 4)}</span>
                </div>

                <Link href={`/products/${product.id}`}>
                    <CardTitle className="text-xl font-serif font-black text-foreground transition-colors hover:text-accent leading-tight min-h-[3.5rem] mt-2">
                        {product.name}
                    </CardTitle>
                </Link>

                <p className="text-[11px] text-muted-foreground font-sans font-medium leading-relaxed opacity-70 line-clamp-2">
                    {product.shortDescription}
                </p>

                <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.originalPrice && (
                            <span className="text-[10px] font-sans text-muted-foreground line-through opacity-40">¥{product.originalPrice}</span>
                        )}
                        <span className="text-2xl font-serif font-black text-primary tracking-tighter italic">¥{product.price}</span>
                    </div>

                    <button
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-muted/30 text-foreground hover:bg-accent hover:text-white transition-all duration-500 border border-border/50 group/btn"
                        onClick={() => { }}
                    >
                        <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
