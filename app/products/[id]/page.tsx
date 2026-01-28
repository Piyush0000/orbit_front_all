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
    ShoppingCart,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    ArrowRight
} from "lucide-react"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ProductDetailPage() {
    const params = useParams()
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Product not found</h1>
                    <Link href="/categories/all">
                        <Button variant="link" className="mt-4">Back to Shop</Button>
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
                <li key={index} className="text-zinc-600 mb-1">
                    {hasAllergen ? <strong className="text-zinc-900">{item}</strong> : item}
                </li>
            )
        })
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/categories/all" className="hover:text-primary">Shop</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={`/categories/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-zinc-900 font-medium truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square relative rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-100">
                            <Image
                                src={product.image[activeImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            {product.badge && (
                                <Badge className="absolute top-6 left-6 bg-primary text-white uppercase text-xs tracking-widest px-3 py-1 border-none shadow-lg">
                                    {product.badge}
                                </Badge>
                            )}
                        </div>
                        {product.image.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.image.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 aspect-square rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-zinc-200'}`}
                                    >
                                        <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${product.veg ? 'border-green-600' : 'border-red-600'}`}>
                                    <div className={`w-2.5 h-2.5 rounded-full ${product.veg ? 'bg-green-600' : 'bg-red-600'}`} />
                                </div>
                                <span className={`text-sm font-bold uppercase tracking-widest ${product.veg ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 uppercase leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 px-2 py-1 rounded-md text-sm font-bold">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span>{product.rating}</span>
                                </div>
                                <span className="text-zinc-500 text-sm font-medium">{product.reviewCount} Reviews</span>
                            </div>
                        </div>

                        <div className="text-3xl font-black text-primary">
                            ₹{product.price}
                        </div>

                        <p className="text-zinc-600 text-lg leading-relaxed">
                            {product.shortDescription}
                        </p>

                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-zinc-200 rounded-xl h-14 bg-zinc-50/50">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-full w-12 hover:bg-transparent"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-full w-12 hover:bg-transparent"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Button
                                    className="flex-1 h-14 rounded-xl text-lg font-bold uppercase tracking-wider shadow-lg shadow-primary/20"
                                    onClick={() => alert(`${product.name} (${quantity}) added to cart!`)}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-3" />
                                    Add to Cart
                                </Button>
                            </div>
                            <Button
                                variant="outline"
                                className="h-14 rounded-xl text-lg font-bold uppercase tracking-wider border-zinc-200 hover:bg-zinc-50"
                                onClick={() => alert(`Redirecting to checkout for ${product.name}...`)}
                            >
                                Buy it Now
                            </Button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-100">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Spice Level</span>
                                <span className="text-zinc-900 font-bold">{product.spiceLevel}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Best Before</span>
                                <span className="text-zinc-900 font-bold">{product.storage.bestBefore}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom: Tabs Section */}
                <div className="mb-20">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full justify-start border-b border-zinc-200 bg-transparent rounded-none h-12 p-0 mb-8 overflow-x-auto overflow-y-hidden no-scrollbar">
                            <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-500 data-[state=active]:text-primary transition-all">Description</TabsTrigger>
                            <TabsTrigger value="ingredients" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-500 data-[state=active]:text-primary transition-all">Ingredients</TabsTrigger>
                            <TabsTrigger value="nutrition" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-500 data-[state=active]:text-primary transition-all">Nutrition</TabsTrigger>
                            <TabsTrigger value="storage" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-500 data-[state=active]:text-primary transition-all">Storage & Shelf Life</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-0">
                            <div className="max-w-3xl">
                                <p className="text-zinc-600 leading-loose text-lg whitespace-pre-wrap">
                                    {product.fullDescription}
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="ingredients" className="mt-0">
                            <div className="max-w-2xl bg-zinc-50 p-8 rounded-2xl">
                                <h3 className="text-lg font-bold text-zinc-900 mb-4 uppercase tracking-wider">What's Inside</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5">
                                    {formatIngredients(product.ingredients)}
                                </ul>
                                <p className="mt-6 text-xs text-zinc-400 italic font-medium">
                                    * Bold items indicate potential allergens.
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="nutrition" className="mt-0">
                            <div className="max-w-md border border-zinc-200 rounded-2xl overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-zinc-50">
                                        <TableRow className="hover:bg-transparent border-zinc-200">
                                            <TableHead className="font-bold text-zinc-900 uppercase text-xs tracking-widest h-12">Nutrients</TableHead>
                                            <TableHead className="text-right font-bold text-zinc-900 uppercase text-xs tracking-widest h-12">Value (Approx)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(product.nutrition).map(([key, value]) => (
                                            <TableRow key={key} className="border-zinc-100 last:border-0 h-12">
                                                <TableCell className="capitalize font-medium text-zinc-600">{key}</TableCell>
                                                <TableCell className="text-right font-bold text-zinc-900">{value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="storage" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4 bg-zinc-50 p-8 rounded-2xl">
                                    <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wider">Storage Instructions</h3>
                                    <p className="text-zinc-600 leading-relaxed">{product.storage.instructions}</p>
                                </div>
                                <div className="space-y-4 border border-zinc-100 p-8 rounded-2xl">
                                    <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wider">Shelf Life</h3>
                                    <p className="text-zinc-600 leading-relaxed font-bold text-2xl text-primary">{product.storage.bestBefore}</p>
                                    <p className="text-xs text-zinc-400">{product.storage.disclaimer}</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-zinc-100 pt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">You may also like</h2>
                            <Link href={`/categories/${product.category}`} className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all">
                                View Category <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar -mx-4 px-4">
                            {relatedProducts.map(p => (
                                <div key={p.id} className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px]">
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
