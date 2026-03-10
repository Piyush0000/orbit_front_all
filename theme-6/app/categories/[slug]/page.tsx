"use client"

import { useParams } from "next/navigation"
import { products, categories as categoriesData, Product } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { Filter, SlidersHorizontal, X, ArrowUpRight } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export default function CategoryPage() {
    const params = useParams()
    const slug = params.slug as string

    const category = categoriesData.find(c => c.slug === slug)

    // Filter States
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedVeg, setSelectedVeg] = useState<string | null>(null)
    const [dietary, setDietary] = useState({
        vegan: false,
        sugarFree: false,
        glutenFree: false
    })
    const [spiceLevel, setSpiceLevel] = useState<string[]>([])

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            if (slug !== "all" && product.category !== slug) return false
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false
            if (selectedVeg === "veg" && !product.veg) return false
            if (selectedVeg === "non-veg" && product.veg) return false
            if (dietary.vegan && !product.dietary.vegan) return false
            if (dietary.sugarFree && !product.dietary.sugarFree) return false
            if (dietary.glutenFree && !product.dietary.glutenFree) return false
            if (spiceLevel.length > 0 && !spiceLevel.includes(product.spiceLevel)) return false
            return true
        })
    }, [slug, priceRange, selectedVeg, dietary, spiceLevel])

    const resetFilters = () => {
        setPriceRange([0, 1000])
        setSelectedVeg(null)
        setDietary({
            vegan: false,
            sugarFree: false,
            glutenFree: false
        })
        setSpiceLevel([])
    }

    const FilterSidebar = () => (
        <div className="space-y-10">
            {/* Price Range */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary" />
                    <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary">Price Spectrum</h3>
                </div>
                <div className="px-2">
                    <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-6"
                    />
                    <div className="flex items-center justify-between mt-6 text-[11px] font-sans font-medium uppercase tracking-widest text-muted-foreground">
                        <span>¥ {priceRange[0]}</span>
                        <span>¥ {priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Veg / Non-Veg */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary" />
                    <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary">Nature Selection</h3>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setSelectedVeg(selectedVeg === "veg" ? null : "veg")}>
                        <div className={`w-4 h-4 border transition-all flex items-center justify-center ${selectedVeg === "veg" ? "border-primary bg-primary/10" : "border-white/10 group-hover:border-primary/30"}`}>
                            {selectedVeg === "veg" && <div className="w-1.5 h-1.5 bg-primary" />}
                        </div>
                        <Label className="text-[11px] font-sans font-medium uppercase tracking-widest text-foreground/80 cursor-pointer flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${selectedVeg === "veg" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-white/10"}`} />
                            Botanical Only
                        </Label>
                    </div>
                    <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setSelectedVeg(selectedVeg === "non-veg" ? null : "non-veg")}>
                        <div className={`w-4 h-4 border transition-all flex items-center justify-center ${selectedVeg === "non-veg" ? "border-primary bg-primary/10" : "border-white/10 group-hover:border-primary/30"}`}>
                            {selectedVeg === "non-veg" && <div className="w-1.5 h-1.5 bg-primary" />}
                        </div>
                        <Label className="text-[11px] font-sans font-medium uppercase tracking-widest text-foreground/80 cursor-pointer flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${selectedVeg === "non-veg" ? "bg-primary shadow-[0_0_8px_rgba(191,155,48,0.4)]" : "bg-white/10"}`} />
                            Signature Blends
                        </Label>
                    </div>
                </div>
            </div>

            {/* Dietary Preference */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary" />
                    <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary">Requirement</h3>
                </div>
                <div className="flex flex-col gap-4">
                    {['vegan', 'sugarFree', 'glutenFree'].map((key) => (
                        <div key={key} className="flex items-center space-x-3 group cursor-pointer" onClick={() => setDietary(prev => ({ ...prev, [key]: !prev[key as keyof typeof dietary] }))}>
                            <div className={`w-4 h-4 border transition-all flex items-center justify-center ${dietary[key as keyof typeof dietary] ? "border-primary bg-primary/10" : "border-white/10 group-hover:border-primary/30"}`}>
                                {dietary[key as keyof typeof dietary] && <div className="w-1.5 h-1.5 bg-primary" />}
                            </div>
                            <Label className="text-[11px] font-sans font-medium uppercase tracking-widest text-foreground/80 cursor-pointer">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spice Level */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary" />
                    <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-primary">Intensity</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                    {['Mild', 'Medium', 'Spicy'].map((level) => (
                        <button
                            key={level}
                            className={`px-4 py-2 text-[9px] font-sans font-bold uppercase tracking-[0.2em] transition-all border ${spiceLevel.includes(level)
                                ? 'bg-primary text-background border-primary'
                                : 'bg-transparent text-muted-foreground border-white/10 hover:border-primary/50 hover:text-primary'}`}
                            onClick={() => {
                                if (spiceLevel.includes(level)) {
                                    setSpiceLevel(spiceLevel.filter(l => l !== level))
                                } else {
                                    setSpiceLevel([...spiceLevel, level])
                                }
                            }}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <Button
                variant="ghost"
                className="w-full text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary hover:bg-white/5 border border-white/5 mt-4"
                onClick={resetFilters}
            >
                Reset Specification
            </Button>
        </div>
    )

    return (
        <div className="min-h-screen bg-background pt-16 pb-32 relative overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(191,155,48,0.02),transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col gap-8 mb-16">
                    <div className="space-y-4">
                        <span className="text-primary font-sans font-bold uppercase tracking-[0.4em] text-[10px]">Curation</span>
                        <h1 className="text-5xl font-serif font-bold tracking-tight sm:text-7xl text-foreground">
                            {category ? category.name : "All Collections"}
                        </h1>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-8">
                        <p className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-foreground/70">
                            Manifesting <span className="text-primary">{filteredProducts.length}</span> Objects of Interest
                        </p>

                        {/* Mobile Filter Toggle */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="lg:hidden gap-3 rounded-none border-white/10 uppercase tracking-widest text-[10px] font-bold">
                                    <SlidersHorizontal className="w-3 h-3 text-primary" />
                                    Specify
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:w-[400px] p-8 bg-background/95 backdrop-blur-2xl border-l border-white/5">
                                <SheetHeader className="mb-12 border-b border-white/5 pb-8">
                                    <SheetTitle className="text-2xl font-serif font-bold">Refine Specification</SheetTitle>
                                    <SheetDescription className="text-[10px] font-sans uppercase tracking-widest opacity-60">Narrow down your selection.</SheetDescription>
                                </SheetHeader>
                                <div className="mt-8">
                                    <FilterSidebar />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                <div className="flex gap-20">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-32">
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 bg-white/[0.01] border border-white/5 velvet-shadow">
                                <div className="p-10 border border-white/5 bg-background/50">
                                    <X className="w-12 h-12 text-muted-foreground/20" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-serif font-bold text-foreground">Void Detected</h3>
                                    <p className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-foreground/60 max-w-[300px] mx-auto leading-relaxed">
                                        No objects match the current specifications. Try broadening your parameters.
                                    </p>
                                </div>
                                <Button onClick={resetFilters} variant="ghost" className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white/5">
                                    Clear Specifications
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
