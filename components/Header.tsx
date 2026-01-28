"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Header() {
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
                        className="w-full pl-10 h-10 bg-zinc-50 border-zinc-200"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                </div>

                {/* Navigation Links */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">Home</Link>
                    <Link href="/categories" className="transition-colors hover:text-primary">Categories</Link>
                    <Link href="/combos" className="transition-colors hover:text-primary">Combos</Link>
                    <Link href="/offers" className="transition-colors hover:text-primary">Offers</Link>
                </nav>

                {/* Cart Icon & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                            0
                        </span>
                    </Button>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
