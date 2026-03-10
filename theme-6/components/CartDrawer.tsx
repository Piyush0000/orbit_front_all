"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, X, Plus, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
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
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col border-l border-white/5 bg-background/95 backdrop-blur-2xl shadow-2xl">
                <SheetHeader className="p-8 border-b border-white/5 flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/5 p-3 border border-primary/20">
                            <ShoppingBag className="w-5 h-5 text-primary" />
                        </div>
                        <SheetTitle className="text-2xl font-serif font-bold tracking-tight">Your Selection ({totalItems})</SheetTitle>
                        <SheetDescription className="sr-only">Review your selected items before initiation of acquisition.</SheetDescription>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                            <div className="p-8 border border-white/5 bg-white/[0.02]">
                                <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xl font-serif font-bold text-foreground">The cache is empty</p>
                                <p className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground max-w-[200px] mx-auto opacity-70">
                                    Browse our curation to begin your selection.
                                </p>
                            </div>
                            <Button
                                onClick={() => onOpenChange(false)}
                                className="font-sans font-bold uppercase tracking-[0.2em] rounded-none mt-6 px-10 h-14 bg-primary text-background hover:bg-primary/90"
                            >
                                Begin Exploration
                            </Button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-6 group">
                                <div className="relative w-24 h-32 bg-muted overflow-hidden border border-white/5 shrink-0 velvet-shadow">
                                    <Image
                                        src={item.image[0]}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className="font-serif font-bold text-lg text-foreground truncate pr-4">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-muted-foreground/40 hover:text-primary transition-colors p-1"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-sm font-sans font-bold text-primary tracking-[0.1em]">¥{item.price}</p>
                                    </div>

                                    <div className="pt-4">
                                        <QuantitySelector
                                            quantity={item.quantity}
                                            onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                                            onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="h-10 scale-90 -ml-2 origin-left bg-transparent border-white/10"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <SheetFooter className="p-8 border-t border-white/5 flex-col sm:flex-col gap-6 bg-white/[0.01]">
                        <div className="space-y-4 w-full">
                            <div className="flex justify-between items-center text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
                                <span className="text-muted-foreground/60">Subtotal</span>
                                <span className="text-foreground">¥{subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-sans font-bold uppercase tracking-[0.3em]">
                                <span className="text-muted-foreground/60">Concierge Delivery</span>
                                <span className="text-primary">Complimentary</span>
                            </div>
                            <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                                <span className="text-lg font-serif font-bold text-foreground">Total</span>
                                <span className="text-3xl font-serif font-bold text-primary">¥{subtotal}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full pt-2">
                            <Link href="/cart" onClick={() => onOpenChange(false)} className="w-full">
                                <Button variant="outline" className="w-full h-14 font-sans font-bold uppercase tracking-[0.2em] text-[10px] border-white/10 rounded-none hover:bg-white/5">
                                    Details
                                </Button>
                            </Link>
                            <Link href="/checkout" onClick={() => onOpenChange(false)} className="w-full">
                                <Button className="w-full h-16 font-sans font-bold uppercase tracking-[0.2em] text-[10px] rounded-none bg-primary text-background hover:bg-primary/90 transition-all velvet-shadow group border border-primary">
                                    Initiate Acquisition
                                    <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}
