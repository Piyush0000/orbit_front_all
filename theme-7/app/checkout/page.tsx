"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, ShieldCheck, CreditCard, CheckCircle, Sparkles, MapPin, Truck } from "lucide-react"

export default function CheckoutPage() {
    const { cart, subtotal, clearCart } = useCart()
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const router = useRouter()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zip: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handlePayNow = async () => {
        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.zip) {
            alert("Please provide complete shipping coordinates to proceed.")
            return
        }

        setIsProcessing(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsProcessing(false)
        setOrderPlaced(true)
        clearCart()

        // Redirect after delay
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background">
                <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mb-10 animate-in zoom-in duration-500 relative">
                    <CheckCircle className="w-16 h-16 text-accent" />
                    <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping" />
                </div>
                <h1 className="text-5xl font-serif font-black uppercase tracking-tight text-foreground mb-4">Allocation Secured</h1>
                <p className="text-muted-foreground max-w-sm mb-12 font-sans font-medium italic text-lg">
                    Thank you, {formData.firstName}. Your selection is being prepared within our atelier.
                </p>
                <div className="flex items-center gap-4 text-[10px] font-sans font-black uppercase tracking-[0.4em] text-accent animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    Return to Atelier in progress
                </div>
            </div>
        )
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-background pt-40">
                <h1 className="text-5xl font-serif font-black uppercase tracking-tight text-foreground mb-4">The Cache is Empty</h1>
                <p className="text-muted-foreground max-w-sm mb-12 font-sans font-medium italic text-lg">
                    Curate your selection to proceed with the final allocation.
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
                    <Link href="/cart" className="hover:text-accent transition-colors">Selection</Link>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                    <span className="text-foreground">Final Allocation</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-20 items-start">
                    {/* Main Checkout Form */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Shipping Section */}
                        <div className="bg-white/40 backdrop-blur-md border border-border rounded-[2.5rem] p-12 shadow-xl shadow-black/5">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 bg-accent/10 rounded-full">
                                    <MapPin className="w-5 h-5 text-accent" />
                                </div>
                                <h2 className="text-3xl font-serif font-black uppercase tracking-tight text-foreground">Provenance</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="space-y-3">
                                    <Label htmlFor="firstName" className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">First Name</Label>
                                    <Input id="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="E.g. Julian" className="h-14 rounded-2xl border-border bg-white placeholder:text-muted-foreground/30 font-sans font-medium" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="lastName" className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Last Name</Label>
                                    <Input id="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="E.g. Avery" className="h-14 rounded-2xl border-border bg-white placeholder:text-muted-foreground/30 font-sans font-medium" />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <Label htmlFor="email" className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Electronic Correspondence</Label>
                                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="julian.avery@atelier.com" className="h-14 rounded-2xl border-border bg-white placeholder:text-muted-foreground/30 font-sans font-medium" />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <Label htmlFor="address" className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Shipping Coordinates</Label>
                                    <Input id="address" value={formData.address} onChange={handleInputChange} placeholder="Street Address, Suite No." className="h-14 rounded-2xl border-border bg-white placeholder:text-muted-foreground/30 font-sans font-medium" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="city" className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">District / City</Label>
                                    <Input id="city" value={formData.city} onChange={handleInputChange} placeholder="Paris" className="h-14 rounded-2xl border-border bg-white placeholder:text-muted-foreground/30 font-sans font-medium" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="zip" className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Postal Code</Label>
                                    <Input id="zip" value={formData.zip} onChange={handleInputChange} placeholder="75001" className="h-14 rounded-2xl border-border bg-white placeholder:text-muted-foreground/30 font-sans font-medium" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="bg-white/40 backdrop-blur-md border border-border rounded-[2.5rem] p-12 shadow-xl shadow-black/5">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 bg-accent/10 rounded-full">
                                    <CreditCard className="w-5 h-5 text-accent" />
                                </div>
                                <h2 className="text-3xl font-serif font-black uppercase tracking-tight text-foreground">Acquisition</h2>
                            </div>

                            <div className="flex gap-4 mb-10">
                                <div className="border-2 border-accent bg-accent/5 p-6 rounded-3xl flex items-center gap-4 w-full cursor-pointer transition-all">
                                    <CreditCard className="w-6 h-6 text-accent" />
                                    <div className="flex flex-col">
                                        <span className="font-sans font-black uppercase tracking-widest text-[10px] text-foreground">Direct Transaction</span>
                                        <span className="font-serif italic text-accent text-sm">Sovereign Credit</span>
                                    </div>
                                    <div className="ml-auto w-6 h-6 rounded-full border-2 border-accent flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-accent" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Card Identification</Label>
                                    <Input placeholder="0000 0000 0000 0000" className="h-14 rounded-2xl border-border bg-white font-sans tracking-widest" />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Horizon</Label>
                                        <Input placeholder="MM/YY" className="h-14 rounded-2xl border-border bg-white font-sans" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Security Code</Label>
                                        <Input placeholder="CVV" className="h-14 rounded-2xl border-border bg-white font-sans" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-32">
                        <div className="bg-primary text-background p-12 rounded-[2.5rem] shadow-2xl shadow-primary/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16" />

                            <h2 className="text-2xl font-serif font-black uppercase tracking-tight mb-10 border-b border-background/10 pb-6">Archive Summary</h2>

                            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-16 h-16 bg-white/10 rounded-xl shrink-0 border border-white/5 overflow-hidden">
                                            <Image src={item.image[0]} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <div className="flex-1 min-w-0 py-1">
                                            <p className="text-xs font-serif font-bold text-background truncate opacity-90">{item.name}</p>
                                            <p className="text-[9px] font-sans font-black uppercase tracking-widest text-background/50 mt-1">Qt. {item.quantity}</p>
                                            <p className="text-sm font-serif font-black text-accent mt-1 italic">¥{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-5 mb-10 pt-6 border-t border-background/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-background/50">Subtotal</span>
                                    <span className="font-serif font-bold text-background">¥{subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-background/50">Delivery</span>
                                    <span className="text-accent font-sans font-black uppercase tracking-[0.2em] text-[10px] italic">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-center pt-6 border-t border-background/10">
                                    <span className="text-xl font-serif font-black uppercase tracking-tight">Final Sum</span>
                                    <span className="text-4xl font-serif font-black text-accent tracking-tighter italic">¥{subtotal}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handlePayNow}
                                disabled={isProcessing}
                                className="w-full h-18 text-[11px] font-sans font-black uppercase tracking-[0.4em] group rounded-full bg-accent hover:bg-accent/90 text-white border-none shadow-xl shadow-accent/20 transition-all active:scale-95"
                            >
                                {isProcessing ? "Allocating..." : "Secure Allocation"}
                                {!isProcessing && <Sparkles className="ml-3 w-4 h-4" />}
                            </Button>
                        </div>

                        <div className="bg-white/40 backdrop-blur-md border border-border p-8 rounded-[2rem] space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-secondary/20 rounded-full">
                                    <ShieldCheck className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-sans font-black uppercase tracking-widest text-foreground">Secure Interface</p>
                                    <p className="text-[9px] font-sans font-medium text-muted-foreground opacity-60 uppercase tracking-widest">End-to-End Cryptography</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-secondary/20 rounded-full">
                                    <Truck className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-sans font-black uppercase tracking-widest text-foreground">Bespoke Handling</p>
                                    <p className="text-[9px] font-sans font-medium text-muted-foreground opacity-60 uppercase tracking-widest">Artisanal Chain of Custody</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
