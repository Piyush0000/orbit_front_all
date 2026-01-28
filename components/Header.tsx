"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu } from "lucide-react"
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

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight text-primary uppercase">Provision & Co.</span>
                    </Link>
                </div>

                {/* Search Bar - Hidden on mobile, visible on medium+ */}
                <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                    <Input
                        type="search"
                        placeholder="Search for snacks, beverages, combos..."
                        className="w-full pl-10 h-10 bg-zinc-50 border-zinc-200 focus-visible:ring-primary"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary relative group">
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/categories/all" className="transition-colors hover:text-primary relative group">
                        Categories
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/combos" className="transition-colors hover:text-primary relative group">
                        Combos
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/offers" className="transition-colors hover:text-primary relative group">
                        Offers
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                </nav>

                {/* Icons & Mobile Menu */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Button variant="ghost" size="icon" className="relative hover:bg-zinc-50 rounded-full">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                            0
                        </span>
                    </Button>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-zinc-50 rounded-full">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6">
                            <SheetHeader className="text-left mb-8">
                                <SheetTitle className="text-2xl font-black text-primary uppercase tracking-tighter">
                                    Provision & Co.
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-6">
                                {/* Mobile Search */}
                                <div className="relative md:hidden">
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        className="w-full pl-10 h-10 bg-zinc-50 border-zinc-200"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                </div>

                                <nav className="flex flex-col gap-4">
                                    <Link
                                        href="/"
                                        className="text-lg font-bold uppercase tracking-widest text-zinc-900 hover:text-primary py-2 border-b border-zinc-100 last:border-0 transition-colors"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/categories/all"
                                        className="text-lg font-bold uppercase tracking-widest text-zinc-900 hover:text-primary py-2 border-b border-zinc-100 last:border-0 transition-colors"
                                    >
                                        Categories
                                    </Link>
                                    <Link
                                        href="/combos"
                                        className="text-lg font-bold uppercase tracking-widest text-zinc-900 hover:text-primary py-2 border-b border-zinc-100 last:border-0 transition-colors"
                                    >
                                        Combos
                                    </Link>
                                    <Link
                                        href="/offers"
                                        className="text-lg font-bold uppercase tracking-widest text-zinc-900 hover:text-primary py-2 border-b border-zinc-100 last:border-0 transition-colors"
                                    >
                                        Offers
                                    </Link>
                                </nav>

                                <div className="mt-8 pt-8 border-t border-zinc-100 text-center">
                                    <p className="text-sm text-zinc-400 font-medium">© 2026 Provision & Co.</p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
