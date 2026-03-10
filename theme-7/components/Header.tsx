"use client"

import Link from "next/link"
import { ShoppingBag, Search, Menu, User, ChevronRight, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import {
    Sheet,
    SheetContent,
    SheetDescription,
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
                ? <span key={i} className="text-accent font-bold">{part}</span>
                : part
        )
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-24 items-center justify-between px-6">
                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <span className="text-2xl font-serif font-black tracking-widest text-foreground uppercase group-hover:text-primary transition-colors">
                            PROVISION <span className="text-accent font-light italic">&</span> CO.
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-12 text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/60">
                    <Link href="/" className="transition-colors hover:text-primary relative group py-2">
                        Atelier
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/categories/all" className="transition-colors hover:text-primary relative group py-2">
                        Boutique
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/combos" className="transition-colors hover:text-primary relative group py-2">
                        Curated
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/offers" className="transition-colors hover:text-primary relative group py-2">
                        Privileges
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
                    </Link>
                </nav>

                {/* Icons & Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center relative">
                        <Input
                            type="search"
                            placeholder="Fine selection..."
                            className="w-48 h-10 bg-transparent border-none focus-visible:ring-0 focus:w-64 transition-all rounded-none text-xs font-sans tracking-wide placeholder:text-muted-foreground/50 border-b border-border/50 focus:border-accent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoComplete="off"
                        />
                        <Search className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchQuery ? "text-accent" : "text-muted-foreground/40"}`} />

                        {/* Search Results */}
                        {searchQuery.length > 1 && (
                            <div className="absolute top-full right-0 mt-4 w-80 bg-background border border-border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50 rounded-lg">
                                {isSearching ? (
                                    <div className="p-8 flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="py-2">
                                        <div className="px-4 py-2 border-b border-border bg-muted/30">
                                            <p className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-muted-foreground">Catalog Matches</p>
                                        </div>
                                        {searchResults.map(product => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors group/item"
                                                onClick={() => setSearchQuery("")}
                                            >
                                                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-md bg-muted">
                                                    <Image src={product.image[0]} fill alt={product.name} className="object-cover group-hover/item:scale-105 transition-transform duration-500" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-serif font-bold text-foreground truncate">
                                                        {highlightText(product.name, searchQuery)}
                                                    </p>
                                                    <p className="text-[9px] font-sans text-muted-foreground uppercase tracking-widest">{product.category}</p>
                                                </div>
                                                <span className="text-[10px] font-sans font-bold text-accent">¥{product.price}</span>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-10 text-center">
                                        <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground/50">Zero Matches Found</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative hover:bg-muted/50 rounded-full"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag className="w-5 h-5 text-primary" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                                    {totalItems}
                                </span>
                            )}
                        </Button>

                        <div className="hidden lg:flex items-center gap-4 border-l border-border pl-6 ml-2">
                            <Link href="/login">
                                <Button variant="ghost" className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] hover:text-accent">
                                    Account
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-6 rounded-full bg-primary text-background hover:bg-primary/90 transition-all shadow-lg shadow-primary/10">
                                    Identity
                                </Button>
                            </Link>
                        </div>

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-muted/50 rounded-full">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] bg-background border-l border-border p-0">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Mobile Navigation</SheetTitle>
                                    <SheetDescription>Explore the boutique categories and access your account.</SheetDescription>
                                </SheetHeader>
                                <div className="p-8 flex flex-col h-full">
                                    <div className="flex justify-between items-center mb-12">
                                        <span className="text-xl font-serif font-black uppercase tracking-widest">P.CO</span>
                                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                                            <X className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <nav className="flex flex-col gap-6">
                                        <Link href="/" className="text-3xl font-serif italic text-foreground hover:text-accent transition-colors">Atelier</Link>
                                        <Link href="/categories/all" className="text-3xl font-serif italic text-foreground hover:text-accent transition-colors">Boutique</Link>
                                        <Link href="/combos" className="text-3xl font-serif italic text-foreground hover:text-accent transition-colors">Curated</Link>
                                        <Link href="/offers" className="text-3xl font-serif italic text-foreground hover:text-accent transition-colors">Privileges</Link>
                                    </nav>
                                    <div className="mt-auto flex flex-col gap-4 border-t border-border pt-12">
                                        <Link href="/login" className="w-full">
                                            <Button variant="outline" className="w-full h-14 rounded-full uppercase text-[10px] font-bold tracking-widest">Account</Button>
                                        </Link>
                                        <Link href="/signup" className="w-full">
                                            <Button className="w-full h-14 rounded-full bg-primary text-background uppercase text-[10px] font-bold tracking-widest">Join Atelier</Button>
                                        </Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
        </header>
    )
}
