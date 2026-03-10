"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, ChevronRight } from "lucide-react"
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
                ? <span key={i} className="text-primary font-black bg-primary/10">{part}</span>
                : part
        )
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-24 items-center justify-between px-6">
                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <span className="text-2xl font-serif font-bold tracking-widest text-foreground uppercase group-hover:text-primary transition-colors">
                            PROVISION <span className="text-primary font-normal">&</span> CO.
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-10 text-[11px] font-sans font-medium uppercase tracking-[0.2em]">
                    <Link href="/" className="transition-colors hover:text-primary relative group py-2">
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/categories/all" className="transition-colors hover:text-primary relative group py-2">
                        Collections
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/combos" className="transition-colors hover:text-primary relative group py-2">
                        Curated Sets
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/offers" className="transition-colors hover:text-primary relative group py-2">
                        Privileges
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
                    </Link>
                </nav>

                {/* Icons & Actions */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center relative group">
                        <Input
                            type="search"
                            placeholder="Discover perfection..."
                            className="w-48 h-10 bg-transparent border-none focus-visible:ring-0 focus:w-64 transition-all rounded-none text-xs font-sans tracking-wide placeholder:text-muted-foreground/50 border-b border-white/10 focus:border-primary/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoComplete="off"
                        />
                        <Search className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchQuery ? "text-primary" : "text-muted-foreground"}`} />

                        {/* Search Results Dropdown simplified for luxury */}
                        {searchQuery.length > 1 && (
                            <div className="absolute top-full right-0 mt-4 w-80 bg-card border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                {isSearching ? (
                                    <div className="p-6 flex items-center justify-center">
                                        <div className="w-4 h-4 border border-primary/30 border-t-primary rounded-full animate-spin" />
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="py-2">
                                        {searchResults.map(product => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors group/item"
                                                onClick={() => setSearchQuery("")}
                                            >
                                                <div className="relative w-10 h-10 shrink-0 overflow-hidden bg-muted">
                                                    <Image src={product.image[0]} fill alt={product.name} className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-sans font-medium uppercase tracking-wider text-foreground truncate">
                                                        {highlightText(product.name, searchQuery)}
                                                    </p>
                                                    <p className="text-[9px] font-sans text-muted-foreground uppercase tracking-widest">{product.category}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative hover:bg-white/5 rounded-full"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart className="w-5 h-5 text-primary" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-background">
                                    {totalItems}
                                </span>
                            )}
                        </Button>

                        <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
                            <Link href="/login">
                                <Button variant="ghost" className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] hover:text-primary">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-6 rounded-none bg-primary text-background hover:bg-primary/90 transition-all velvet-shadow">
                                    Join
                                </Button>
                            </Link>
                        </div>

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-white/5">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] bg-background border-l border-white/5">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Navigation Menu</SheetTitle>
                                    <SheetDescription>Main site navigation links for mobile users.</SheetDescription>
                                </SheetHeader>
                                <div className="py-12 flex flex-col h-full">
                                    <nav className="flex flex-col gap-8 text-center">
                                        <Link href="/" className="text-xl font-serif uppercase tracking-widest">Home</Link>
                                        <Link href="/categories/all" className="text-xl font-serif uppercase tracking-widest">Collections</Link>
                                        <Link href="/combos" className="text-xl font-serif uppercase tracking-widest">Curated Sets</Link>
                                        <Link href="/offers" className="text-xl font-serif uppercase tracking-widest">Privileges</Link>
                                    </nav>
                                    <div className="mt-auto flex flex-col gap-4 border-t border-white/5 pt-8">
                                        <Link href="/login"><Button variant="outline" className="w-full rounded-none uppercase text-[10px] tracking-widest">Sign In</Button></Link>
                                        <Link href="/signup"><Button className="w-full rounded-none bg-primary text-background uppercase text-[10px] tracking-widest">Join</Button></Link>
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
