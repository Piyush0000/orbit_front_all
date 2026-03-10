"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, X, Plus, Minus, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { useCart } from "@/context/CartContext"
import { QuantitySelector } from "@/components/ui/product-utils"

interface CartDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart()

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col border-l border-border bg-background shadow-2xl">
                <SheetHeader className="p-8 border-b border-border flex-row items-center justify-between space-y-0 bg-white/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-accent/10 p-2.5 rounded-full">
                            <ShoppingBag className="w-5 h-5 text-accent" />
                        </div>
                        <SheetTitle className="text-2xl font-serif font-black uppercase tracking-tight text-foreground">
                            Bag <span className="text-accent italic font-light font-serif lowercase">({totalItems})</span>
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                            <div className="bg-muted/30 p-10 rounded-full border border-dashed border-border animate-pulse">
                                <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                            </div>
                            <div className="space-y-4">
                                <p className="text-2xl font-serif font-black uppercase tracking-tight text-foreground">The cache is empty</p>
                                <p className="text-sm text-muted-foreground max-w-[240px] mx-auto font-sans font-medium italic">Your selection awaits in the atelier. Begin your curation.</p>
                            </div>
                            <Button
                                onClick={() => onOpenChange(false)}
                                className="font-sans font-black uppercase tracking-[0.3em] rounded-full h-14 px-10 bg-primary text-background hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                            >
                                Enter Atelier
                            </Button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-6 group animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="relative w-28 h-28 bg-white rounded-2xl overflow-hidden border border-border shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                    <Image
                                        src={item.image[0]}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className="font-serif font-black uppercase tracking-tight text-foreground truncate pr-4 text-base">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-muted-foreground transition-all hover:text-accent hover:rotate-90 duration-300"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-sans font-black uppercase tracking-widest text-accent">Selection</span>
                                            <div className="w-1 h-1 rounded-full bg-border" />
                                            <p className="text-sm font-serif font-bold italic text-primary">¥{item.price}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <QuantitySelector
                                            quantity={item.quantity}
                                            onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                                            onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="h-10 px-4 rounded-full border-border bg-white shadow-sm"
                                        />
                                        <p className="text-sm font-serif font-black text-foreground">¥{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <SheetFooter className="p-8 border-t border-border flex-col sm:flex-col gap-6 bg-white/50 backdrop-blur-md">
                        <div className="space-y-3 w-full">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground font-sans font-black uppercase tracking-[0.2em] text-[9px]">Inventory Subtotal</span>
                                <span className="font-serif font-bold text-foreground">¥{subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground font-sans font-black uppercase tracking-[0.2em] text-[9px]">Sovereign Delivery</span>
                                <span className="text-accent font-sans font-black uppercase tracking-[0.2em] text-[9px] italic">Complimentary</span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-border/50">
                                <span className="text-lg font-serif font-black uppercase tracking-tight text-foreground">Final Allocation</span>
                                <span className="text-3xl font-serif font-black text-primary tracking-tighter italic">¥{subtotal}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full pt-2">
                            <Link href="/cart" onClick={() => onOpenChange(false)} className="w-full">
                                <Button variant="ghost" className="w-full h-14 font-sans font-black uppercase tracking-[0.3em] border border-border rounded-full hover:bg-muted/50 text-[10px]">
                                    Review Collection
                                </Button>
                            </Link>
                            <Link href="/checkout" onClick={() => onOpenChange(false)} className="w-full">
                                <Button className="w-full h-16 font-sans font-black uppercase tracking-[0.3em] group rounded-full bg-primary text-background hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 text-[11px]">
                                    Expedite Checkout
                                    <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-2 pt-2 opacity-30">
                            <Sparkles className="w-3 h-3 text-accent" />
                            <span className="text-[8px] font-sans font-black uppercase tracking-[0.5em] text-muted-foreground">Certified Premium Selection</span>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}
