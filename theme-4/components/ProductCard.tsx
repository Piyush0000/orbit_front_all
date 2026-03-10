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
            className="group relative flex flex-col h-full border-primary/5 shadow-sm transition-all hover:shadow-2xl overflow-hidden bg-white/80 backdrop-blur-sm rounded-[2rem] hover:-translate-y-1 duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/products/${product.id}`} className="block">
                <CardHeader className="p-0">
                    <div className="aspect-[4/5] relative overflow-hidden bg-muted/30">
                        <Image
                            src={product.image[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Status Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            {product.originalPrice && product.originalPrice > product.price && (
                                <Badge className="bg-red-600 text-white font-bold uppercase text-[9px] tracking-widest px-3 py-1 border-none rounded-full shadow-lg w-fit">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </Badge>
                            )}
                            {product.badge && (
                                <Badge className="bg-secondary text-secondary-foreground font-bold uppercase text-[9px] tracking-widest px-3 py-1 border-none rounded-full shadow-lg w-fit">
                                    {product.badge}
                                </Badge>
                            )}
                        </div>

                        {/* Veg/Non-Veg Indicator */}
                        <div className="absolute top-4 right-4 z-10">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white/90 backdrop-blur-sm ${product.veg ? 'border-green-600' : 'border-red-600'}`}>
                                <div className={`w-2 h-2 rounded-full ${product.veg ? 'bg-green-600' : 'bg-red-600'}`} />
                            </div>
                        </div>

                        {/* Quick Add Overlay */}
                        <div className={`absolute inset-0 bg-primary/20 flex items-center justify-center transition-all duration-500 backdrop-blur-[2px] ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <Button
                                size="sm"
                                className="bg-white text-primary hover:bg-secondary hover:text-secondary-foreground shadow-2xl translate-y-8 group-hover:translate-y-0 transition-all duration-500 rounded-full px-8 py-6 font-bold uppercase tracking-widest text-[10px]"
                                onClick={(e) => {
                                    e.preventDefault()
                                    alert(`${product.name} added to cart!`)
                                }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Link>

            <CardContent className="p-6 flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        <Star className="w-3 h-3 fill-secondary text-secondary" />
                        <span>{product.rating} • {product.reviewCount} Reviews</span>
                    </div>
                </div>

                <Link href={`/products/${product.id}`}>
                    <CardTitle className="text-xl font-serif text-foreground transition-colors hover:text-secondary leading-snug line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                    </CardTitle>
                </Link>

                <p className="text-xs text-muted-foreground font-light line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-2xl font-serif text-primary">₹{product.price}</span>
                    <button
                        className="p-2 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                        onClick={() => alert(`${product.name} added to cart!`)}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
