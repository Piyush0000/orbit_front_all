"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, ShieldCheck, CreditCard, CheckCircle, ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
    const { cart, subtotal, addToCart, removeFromCart, updateQuantity, clearCart } = useCart()
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
            alert("Please fill in all shipping details to proceed.")
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
        }, 4000)
    }

    if (orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(191,155,48,0.1),transparent_70%)]" />

                <div className="relative z-10 space-y-8 max-w-lg mx-auto bg-card/20 backdrop-blur-xl border border-white/5 p-16 velvet-shadow">
                    <div className="w-24 h-24 bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 mx-auto animate-in zoom-in duration-700">
                        <CheckCircle className="w-12 h-12 text-primary" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground uppercase">Order Secured</h1>
                        <p className="text-foreground/70 font-sans font-light leading-relaxed">
                            Excellence is on its way. Thank you for your acquisition, <span className="text-primary font-bold">{formData.firstName}</span>.
                            Your culinary experience is being prepared with meticulous detail.
                        </p>
                    </div>
                    <div className="pt-8 border-t border-white/5">
                        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-primary/40 animate-pulse">
                            Returning to sanctuary...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-background">
                <div className="space-y-8 bg-card/20 backdrop-blur-sm border border-white/5 p-16 velvet-shadow max-w-md">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground">The Collection is Empty</h1>
                    <p className="text-foreground/60 font-sans font-light leading-relaxed">
                        It appears your selection process has not yet begun.
                        Explore our curated categories to find the perfect sustenance.
                    </p>
                    <Link href="/categories/all">
                        <Button size="lg" className="w-full bg-primary text-background hover:bg-primary/90 rounded-none font-sans font-bold uppercase tracking-[0.3em] text-[11px] h-16 velvet-shadow border border-primary">
                            Begin Exploration
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-background min-h-screen relative overflow-hidden">
            {/* Elegant Background Accents */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-[radial-gradient(circle_at_100%_0%,rgba(191,155,48,0.05),transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 py-16 relative z-10">
                {/* Enhanced Breadcrumbs */}
                <div className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/40 mb-12">
                    <Link href="/" className="hover:text-primary transition-colors">Portico</Link>
                    <ChevronRight className="w-3 h-3 opacity-20" />
                    <Link href="/cart" className="hover:text-primary transition-colors">Acquisitions</Link>
                    <ChevronRight className="w-3 h-3 opacity-20" />
                    <span className="text-primary">Finalization</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Main Checkout Form */}
                    <div className="lg:col-span-8 space-y-12">
                        <section className="space-y-10">
                            <div className="space-y-2 border-l-2 border-primary pl-6">
                                <h2 className="text-4xl font-serif font-bold tracking-tight text-foreground uppercase">Shipping Details</h2>
                                <p className="text-[10px] font-sans font-medium uppercase tracking-[0.4em] text-primary/60">The Logistics of Excellence</p>
                            </div>

                            <div className="bg-card/20 backdrop-blur-md border border-white/5 p-10 velvet-shadow grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label htmlFor="firstName" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/50">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="JOHN"
                                        className="bg-background/40 border-white/10 rounded-none h-14 focus:border-primary transition-all font-sans tracking-wide uppercase text-[11px]"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="lastName" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/50">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="DOE"
                                        className="bg-background/40 border-white/10 rounded-none h-14 focus:border-primary transition-all font-sans tracking-wide uppercase text-[11px]"
                                    />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <Label htmlFor="email" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/50">Email Address (Concierge Updates)</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="CONCIERGE@EXAMPLE.COM"
                                        className="bg-background/40 border-white/10 rounded-none h-14 focus:border-primary transition-all font-sans tracking-wide uppercase text-[11px]"
                                    />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <Label htmlFor="address" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/50">Street Address</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="123 HERITAGE WAY"
                                        className="bg-background/40 border-white/10 rounded-none h-14 focus:border-primary transition-all font-sans tracking-wide uppercase text-[11px]"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="city" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/50">City / District</Label>
                                    <Input
                                        id="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="ESTATE VALLEY"
                                        className="bg-background/40 border-white/10 rounded-none h-14 focus:border-primary transition-all font-sans tracking-wide uppercase text-[11px]"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="zip" className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/50">Postal Code</Label>
                                    <Input
                                        id="zip"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        placeholder="100-001"
                                        className="bg-background/40 border-white/10 rounded-none h-14 focus:border-primary transition-all font-sans tracking-wide uppercase text-[11px]"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-10">
                            <div className="space-y-2 border-l-2 border-primary pl-6">
                                <h2 className="text-4xl font-serif font-bold tracking-tight text-foreground uppercase">Payment</h2>
                                <p className="text-[10px] font-sans font-medium uppercase tracking-[0.4em] text-primary/60">Secure Acquisition</p>
                            </div>

                            <div className="bg-card/20 backdrop-blur-md border border-white/5 p-10 velvet-shadow space-y-8">
                                <div className="border border-primary bg-primary/5 p-6 flex items-center justify-between relative group">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3">
                                            <CreditCard className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-foreground">Premium Credit Card</p>
                                            <p className="text-[9px] font-sans text-foreground/50 uppercase tracking-widest">Global Encrypted Processing</p>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 rounded-none border border-primary flex items-center justify-center">
                                        <div className="w-2 h-2 bg-primary" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 md:col-span-2">
                                        <Label className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/50">Card Identification Number</Label>
                                        <Input placeholder="•••• •••• •••• ••••" className="bg-background/40 border-white/10 rounded-none h-14 focus:border-primary transition-all font-sans tracking-[0.4em] text-center text-[11px]" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/50">Valid Thru</Label>
                                        <Input placeholder="MM / YY" className="bg-background/40 border-white/10 rounded-none h-14 focus:border-primary transition-all font-sans text-center text-[11px]" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/50">Verification Code</Label>
                                        <Input placeholder="•••" className="bg-background/40 border-white/10 rounded-none h-14 focus:border-primary transition-all font-sans text-center text-[11px]" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
                        <section className="bg-card/30 backdrop-blur-xl border border-white/5 p-10 velvet-shadow relative overflow-hidden">
                            {/* Accent texture */}
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_0%,rgba(191,155,48,0.02)_100%)] pointer-events-none" />

                            <h2 className="text-2xl font-serif font-bold tracking-tight text-foreground uppercase mb-10 border-b border-white/5 pb-6">Order Manifest</h2>

                            <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-5 group">
                                        <div className="relative w-20 h-20 bg-muted shrink-0 border border-white/5 overflow-hidden">
                                            <Image src={item.image[0]} alt={item.name} fill className="object-cover brightness-90 group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <p className="text-xs font-serif font-bold text-foreground group-hover:text-primary transition-colors truncate tracking-wide">{item.name}</p>
                                            <p className="text-[9px] font-sans text-foreground/40 uppercase tracking-[0.2em]">Quantity: {item.quantity}</p>
                                            <p className="text-sm font-serif font-bold text-primary mt-2">¥{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-5 mb-10 pt-8 border-t border-white/5 relative z-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/40">Subtotal</span>
                                    <span className="text-sm font-serif font-bold text-foreground tracking-tight">¥{subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/40">Transportation</span>
                                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-primary">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                                    <span className="text-lg font-serif font-bold uppercase tracking-tight text-foreground">Total Summary</span>
                                    <span className="text-3xl font-serif font-bold text-primary tracking-tighter">¥{subtotal}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handlePayNow}
                                disabled={isProcessing}
                                className="w-full h-20 text-[11px] font-sans font-bold uppercase tracking-[0.4em] relative group rounded-none bg-primary hover:bg-primary/90 text-background border-none overflow-hidden velvet-shadow transition-all"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {isProcessing ? "Validating..." : "Finalize Acquisition"}
                                    {!isProcessing && <ArrowLeft className="w-4 h-4 rotate-180" />}
                                </span>
                                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                            </Button>
                        </section>

                        {/* Trust Badge */}
                        <div className="bg-primary/5 border border-primary/20 p-8 flex items-start gap-5 velvet-shadow">
                            <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
                            <div className="space-y-2">
                                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary">Sovereign Security</p>
                                <p className="text-[10px] font-sans font-light leading-relaxed text-foreground/60 uppercase tracking-widest">
                                    All personal and fiscal transitions are protected by industry-leading encryption protocols.
                                </p>
                            </div>
                        </div>

                        <Link href="/cart" className="flex items-center justify-center gap-2 group text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-foreground/40 hover:text-primary transition-colors">
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-2 transition-transform" />
                            Return to Acquisitions
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
