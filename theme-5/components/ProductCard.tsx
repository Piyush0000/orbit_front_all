"use client"

import { Product } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart, Plus } from "lucide-react"
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
            className="group relative flex flex-col h-full border-primary/20 shadow-none transition-all duration-500 overflow-hidden bg-card/40 backdrop-blur-xl rounded-none hover:border-primary hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/products/${product.id}`} className="block relative">
                <CardHeader className="p-0">
                    <div className="aspect-[4/5] relative overflow-hidden bg-black/40">
                        <Image
                            src={product.image[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-700 brightness-75 contrast-125 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100"
                        />

                        {/* Cyber Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            {product.originalPrice && product.originalPrice > product.price && (
                                <Badge className="bg-primary text-primary-foreground font-mono font-bold uppercase text-[9px] tracking-[0.2em] px-3 py-1 border-none rounded-none shadow-[0_0_15px_rgba(236,72,153,0.5)] w-fit italic">
                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% DETECTED
                                </Badge>
                            )}
                            {product.badge && (
                                <Badge className="bg-secondary text-secondary-foreground font-mono font-bold uppercase text-[9px] tracking-[0.2em] px-3 py-1 border-none rounded-none shadow-[0_0_15px_rgba(99,102,241,0.5)] w-fit">
                                    {product.badge}
                                </Badge>
                            )}
                        </div>

                        {/* Bio-Status Indicator */}
                        <div className="absolute top-4 right-4 z-10">
                            <div className={`px-2 py-1 flex items-center gap-2 bg-black/60 backdrop-blur-md border ${product.veg ? 'border-green-500/50' : 'border-red-500/50'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${product.veg ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} />
                                <span className={`text-[8px] font-mono font-bold uppercase ${product.veg ? 'text-green-500' : 'text-red-500'}`}>
                                    {product.veg ? 'BIO-SAFE' : 'MEAT-DATA'}
                                </span>
                            </div>
                        </div>

                        {/* Action Overlay */}
                        <div className={`absolute inset-0 bg-primary/5 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
                            <Button
                                size="sm"
                                className="relative z-10 bg-primary text-primary-foreground hover:bg-secondary transition-all duration-300 rounded-none px-8 py-6 font-syne font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                                onClick={(e) => {
                                    e.preventDefault()
                                    alert(`${product.name} initialized for transport!`)
                                }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add to Batch
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Link>

            <CardContent className="p-5 flex-1 flex flex-col gap-4 bg-gradient-to-b from-transparent to-black/20">
                <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                        <Star className="w-3 h-3 fill-primary text-primary animate-pulse" />
                        <span>Rating: {product.rating}</span>
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground uppercase opacity-60">ID://{String(product.id).slice(0, 8)}</span>
                </div>

                <Link href={`/products/${product.id}`}>
                    <CardTitle className="text-xl font-syne font-bold text-foreground transition-colors hover:text-primary leading-tight line-clamp-2 min-h-[3rem] uppercase group-hover:italic">
                        {product.name}
                    </CardTitle>
                </Link>

                <p className="text-[11px] text-muted-foreground font-sans font-light line-clamp-2 leading-relaxed opacity-80">
                    {product.shortDescription}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.originalPrice && (
                            <span className="text-[10px] font-mono text-muted-foreground line-through opacity-50">¥{product.originalPrice}</span>
                        )}
                        <span className="text-2xl font-syne font-black text-primary tracking-tighter italic">¥{product.price}</span>
                    </div>
                    <button
                        className="p-3 rounded-none bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300 group/btn"
                        onClick={() => alert(`${product.name} added to batch!`)}
                    >
                        <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                </div>
            </CardContent>
            {/* Cyber Bottom Bar */}
            <div className="h-1 w-full bg-muted overflow-hidden">
                <div className={`h-full bg-primary transition-all duration-1000 ease-out ${isHovered ? 'w-full' : 'w-0'}`} />
            </div>
        </Card>

    )
}
