"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ArrowRight, Trash2, Truck, ShieldCheck, ChevronRight, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { QuantitySelector } from "@/components/ui/product-utils"
import { products } from "@/lib/data"

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart()

    // Dummy cross-sell data
    const crossSells = products.filter(p => p.category === "beverages" || p.category === "snacks").slice(0, 4)

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-background pt-40">
                <div className="w-32 h-32 bg-muted/30 rounded-full flex items-center justify-center border border-dashed border-border mb-10 animate-pulse">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <h1 className="text-5xl font-serif font-black uppercase tracking-tight text-foreground mb-4">The Cache is Empty</h1>
                <p className="text-muted-foreground max-w-sm mb-12 font-sans font-medium italic text-lg">
                    Your selection awaits in the atelier. Begin your curation to proceed.
                </p>
                <Link href="/categories/all">
                    <Button size="lg" className="font-sans font-black uppercase tracking-[0.3em] px-12 h-16 rounded-full bg-primary text-background hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20">
                        Enter Atelier
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-background min-h-screen pt-32 pb-48">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-3 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-muted-foreground mb-16 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-accent transition-colors">Atelier</Link>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                    <span className="text-foreground">Your Selection</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-20 items-start">
                    {/* Main Cart Content */}
                    <div className="lg:col-span-8 space-y-20">
                        <div className="bg-white/40 backdrop-blur-md border border-border rounded-[2.5rem] overflow-hidden shadow-xl shadow-black/5">
                            <div className="p-12 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white/50">
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-serif font-black uppercase tracking-tight text-foreground">Review Selection</h1>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-sans font-black text-accent uppercase tracking-[0.3em]">
                                            {totalItems} Curated Items
                                        </span>
                                        <div className="w-1 h-1 rounded-full bg-border" />
                                        <span className="text-[10px] font-sans font-black text-muted-foreground uppercase tracking-[0.3em]">
                                            Atelier Reference: #{Math.floor(1000 + Math.random() * 9000)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-accent/10 px-6 py-3 rounded-full border border-accent/10">
                                    <Truck className="w-4 h-4 text-accent" />
                                    <span className="text-[9px] font-sans font-black uppercase tracking-[0.2em] text-accent">Est. Allocation: 30-45 Mins</span>
                                </div>
                            </div>

                            <div className="divide-y divide-border/50">
                                {cart.map((item) => (
                                    <div key={item.id} className="p-12 flex flex-col md:flex-row gap-10 items-center group animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="relative w-40 h-40 bg-white rounded-[2rem] shrink-0 border border-border overflow-hidden shadow-sm transition-transform group-hover:scale-105 duration-700">
                                            <Image
                                                src={item.image[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 py-2 w-full text-center md:text-left">
                                            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6 gap-4">
                                                <div>
                                                    <h3 className="text-2xl font-serif font-black uppercase tracking-tight text-foreground mb-2 group-hover:text-accent transition-colors">{item.name}</h3>
                                                    <div className="flex items-center justify-center md:justify-start gap-3">
                                                        <span className="text-[9px] font-sans font-black text-muted-foreground uppercase tracking-widest">{item.category}</span>
                                                        <div className="w-1 h-1 rounded-full bg-border" />
                                                        <span className="text-[9px] font-sans font-black text-accent uppercase tracking-widest italic">In Stock</span>
                                                    </div>
                                                </div>
                                                <p className="text-3xl font-serif font-black text-foreground tracking-tighter italic">¥{item.price * item.quantity}</p>
                                            </div>

                                            <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-8">
                                                <QuantitySelector
                                                    quantity={item.quantity}
                                                    onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                                                    onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="h-12 px-6 rounded-full border-border bg-white shadow-sm"
                                                />
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-all group/btn"
                                                >
                                                    <div className="p-2.5 rounded-full border border-border group-hover/btn:border-accent group-hover/btn:bg-accent/5 transition-all">
                                                        <Trash2 className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[9px] font-sans font-black uppercase tracking-[0.3em]">Discard Selection</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cross-Sell Section */}
                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <span className="h-[1px] w-8 bg-accent/40" />
                                        <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-accent">
                                            CURATED PAIRINGS
                                        </span>
                                    </div>
                                    <h2 className="text-4xl font-serif font-black uppercase tracking-tight text-foreground">Accompaniments</h2>
                                </div>
                                <Link href="/categories/all" className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors border-b border-border pb-1">
                                    View Full Archive
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                                {crossSells.map((product) => (
                                    <div key={product.id} className="bg-white/40 backdrop-blur-md border border-border p-6 rounded-[2rem] transition-all hover:shadow-2xl hover:-translate-y-2 group">
                                        <div className="relative aspect-square mb-6 bg-white rounded-2xl overflow-hidden border border-border shadow-sm">
                                            <Image src={product.image[0]} fill alt={product.name} className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-accent/10 p-2 rounded-full backdrop-blur-md">
                                                    <Star className="w-3 h-3 text-accent fill-accent" />
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="text-[11px] font-serif font-black uppercase tracking-tight text-foreground truncate mb-2">{product.name}</h4>
                                        <p className="text-lg font-serif font-bold text-primary italic mb-6">¥{product.price}</p>
                                        <Button
                                            variant="ghost"
                                            className="w-full text-[9px] font-sans font-black uppercase tracking-[0.3em] h-11 rounded-full border border-border hover:bg-primary hover:text-background transition-all"
                                        >
                                            Collaborate
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Checkout Summary Sidebar */}
                    <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-32">
                        <div className="bg-primary text-background p-12 rounded-[2.5rem] shadow-2xl shadow-primary/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl -mr-20 -mt-20 opacity-50" />

                            <h2 className="text-2xl font-serif font-black uppercase tracking-tight mb-10 border-b border-background/10 pb-6">Final Curation</h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-background/50">Selection Total</span>
                                    <span className="font-serif font-bold text-background">¥{subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-background/50">Expedited Handling</span>
                                    <span className="text-accent font-sans font-black uppercase tracking-[0.2em] text-[10px] italic">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-background/50">Registry Fees</span>
                                    <span className="font-serif font-bold text-background italic opacity-50">¥0</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-12 pt-8 border-t border-background/10">
                                <span className="text-xl font-serif font-black uppercase tracking-tight">Net Allocation</span>
                                <span className="text-4xl font-serif font-black text-accent tracking-tighter italic">¥{subtotal}</span>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full h-20 text-[11px] font-sans font-black uppercase tracking-[0.4em] group rounded-full bg-accent hover:bg-accent/90 text-white border-none shadow-xl shadow-accent/20 transition-all active:scale-95">
                                    Initiate Acquisition
                                    <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-3" />
                                </Button>
                            </Link>
                        </div>

                        <div className="bg-white/40 backdrop-blur-md border border-border p-10 rounded-[2.5rem] space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-secondary/10 rounded-full">
                                    <ShieldCheck className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-sans font-black uppercase tracking-widest text-foreground">Secure Interface</p>
                                    <p className="text-[9px] font-sans font-medium text-muted-foreground opacity-60 uppercase tracking-widest mt-1 italic">Protected Correspondence</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-secondary/10 rounded-full">
                                    <Truck className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-sans font-black uppercase tracking-widest text-foreground">Bespoke Logistics</p>
                                    <p className="text-[9px] font-sans font-medium text-muted-foreground opacity-60 uppercase tracking-widest mt-1 italic">Artisanal Custody Protocol</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
