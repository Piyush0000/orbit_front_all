"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, User, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"

import { CartDrawer } from "./CartDrawer"
import { useCart } from "@/context/CartContext"
import { products, Product } from "@/lib/data"
import Image from "next/image"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const pathname = usePathname()
    const { totalItems } = useCart()

    // Search logic
    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            setIsSearching(true)
            const timer = setTimeout(() => {
                const results = products.filter(p =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 5)
                setSearchResults(results)
                setIsSearching(false)
            }, 300)
            return () => clearTimeout(timer)
        } else {
            setSearchResults([])
        }
    }, [searchQuery])

    // Close results when route changes
    useEffect(() => {
        setIsOpen(false)
        setSearchQuery("")
    }, [pathname])

    const highlightText = (text: string, query: string) => {
        if (!query) return text
        const parts = text.split(new RegExp(`(${query})`, "gi"))
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase()
                ? <span key={i} className="text-primary font-black bg-primary/10">{part}</span>
                : part
        )
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <span className="text-3xl font-syne font-black tracking-tighter text-foreground uppercase italic group-hover:text-primary transition-colors">
                            PROVISION<span className="text-primary italic">.5</span>
                        </span>
                    </Link>
                </div>

                {/* Search Bar - Hidden on mobile, visible on medium+ */}
                <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
                    <Input
                        type="search"
                        placeholder="SCAN_DATA: snacks, beverages, combos..."
                        className="w-full pl-10 h-11 bg-card/40 border-primary/20 focus-visible:ring-primary focus:bg-card/60 transition-all rounded-none text-xs font-mono uppercase tracking-widest placeholder:text-muted-foreground/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                    />
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchQuery ? "text-primary" : "text-muted-foreground"}`} />

                    {/* Search Results Dropdown */}
                    {searchQuery.length > 1 && (
                        <div className="absolute top-full left-0 right-0 mt-0 bg-card/90 backdrop-blur-2xl border border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50 rounded-none">
                            {isSearching ? (
                                <div className="p-6 flex items-center gap-3">
                                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary">Executing Search...</span>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="py-2">
                                    <p className="px-4 py-2 text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-muted-foreground/60 border-b border-primary/10">Matches Identified</p>
                                    {searchResults.map(product => (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.id}`}
                                            className="flex items-center gap-4 px-4 py-3 hover:bg-primary/10 transition-colors group/item"
                                            onClick={() => setSearchQuery("")}
                                        >
                                            <div className="relative w-12 h-12 bg-black shrink-0 overflow-hidden border border-primary/20">
                                                <Image src={product.image[0]} fill alt={product.name} className="object-cover group-hover/item:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-syne font-bold uppercase tracking-tight text-foreground group-hover/item:text-primary transition-colors truncate italic">
                                                    {highlightText(product.name, searchQuery)}
                                                </p>
                                                <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest">{product.category}</p>
                                            </div>
                                            <span className="text-sm font-syne font-black text-primary pr-2">¥{product.price}</span>
                                        </Link>
                                    ))}
                                    <Link href="/categories/all" className="block text-center p-3 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary hover:bg-primary/5 border-t border-primary/10">
                                        // Access Full Database
                                    </Link>
                                </div>
                            ) : (
                                <div className="p-10 text-center bg-card/50">
                                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary mb-2">Error: Zero Results</p>
                                    <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest">Recalibrate parameters and retry</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-10 text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
                    <Link href="/" className="transition-colors hover:text-primary relative group py-2">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/categories/all" className="transition-colors hover:text-primary relative group py-2">
                        Nexus
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/combos" className="transition-colors hover:text-primary relative group py-2">
                        Aggregates
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/offers" className="transition-colors hover:text-primary relative group py-2">
                        Efficiency
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                </nav>

                {/* Icons & Mobile Menu */}
                <div className="flex items-center gap-3 md:gap-5">
                    <div className="hidden lg:flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] hover:bg-primary/10 px-6 rounded-none border border-transparent hover:border-primary/30">
                                Authorize
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-8 rounded-none bg-primary text-primary-foreground shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:bg-primary/90 transition-all">
                                Register
                            </Button>
                        </Link>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:bg-primary/10 rounded-none border border-primary/20"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-none bg-primary text-[10px] font-black text-white italic">
                                {totalItems}
                            </span>
                        )}
                    </Button>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/10 rounded-none border border-primary/20">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-full sm:w-[380px] p-0 bg-background/95 backdrop-blur-2xl border-r border-primary/20">
                            <div className="p-8 space-y-12">
                                <SheetHeader className="text-left border-b border-primary/20 pb-8">
                                    <SheetTitle className="text-3xl font-syne font-black text-foreground uppercase italic tracking-tighter">
                                        PROVISION<span className="text-primary italic">.5</span>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-8">
                                    {/* Mobile Search */}
                                    <div className="relative md:hidden">
                                        <Input
                                            type="search"
                                            placeholder="System Search..."
                                            className="w-full pl-10 h-12 bg-card/40 border-primary/20 rounded-none font-mono text-[10px] uppercase tracking-widest"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                    </div>

                                    <nav className="flex flex-col gap-6">
                                        <Link
                                            href="/"
                                            className="text-2xl font-syne font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                                        >
                                            Protocol: Home <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                        <Link
                                            href="/categories/all"
                                            className="text-2xl font-syne font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                                        >
                                            System: Nexus <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                        <Link
                                            href="/combos"
                                            className="text-2xl font-syne font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                                        >
                                            Data: Aggregates <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                        <Link
                                            href="/offers"
                                            className="text-2xl font-syne font-bold uppercase tracking-tighter text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                                        >
                                            Flow: Efficiency <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                    </nav>

                                    <div className="flex flex-col gap-4 py-10 border-y border-primary/20">
                                        <Link href="/login" className="w-full">
                                            <Button className="w-full h-14 font-mono font-bold uppercase tracking-[0.3em] rounded-none bg-primary text-primary-foreground">
                                                Authorize
                                            </Button>
                                        </Link>
                                        <Link href="/signup" className="w-full">
                                            <Button variant="outline" className="w-full h-14 font-mono font-bold uppercase tracking-[0.3em] border-primary/30 hover:bg-primary/5 rounded-none text-foreground">
                                                Register
                                            </Button>
                                        </Link>
                                    </div>

                                    <div className="pt-4 text-center">
                                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.5em]">© 2026 PROVISION_DATA_CORP</p>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
        </header>
    )
}
