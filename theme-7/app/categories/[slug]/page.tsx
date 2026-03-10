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
import { Filter, SlidersHorizontal, X, ArrowRight } from "lucide-react"
import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"

export default function CategoryPage() {
    const params = useParams()
    const slug = params.slug as string

    const category = categoriesData.find(c => c.slug === slug)

    // Filter States
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedVeg, setSelectedVeg] = useState<string | null>(null) // 'veg', 'non-veg', null
    const [dietary, setDietary] = useState({
        vegan: false,
        sugarFree: false,
        glutenFree: false
    })
    const [spiceLevel, setSpiceLevel] = useState<string[]>([])

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Category filter
            if (slug !== "all" && product.category !== slug) return false

            // Price filter
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false

            // Veg filter
            if (selectedVeg === "veg" && !product.veg) return false
            if (selectedVeg === "non-veg" && product.veg) return false

            // Dietary filter
            if (dietary.vegan && !product.dietary.vegan) return false
            if (dietary.sugarFree && !product.dietary.sugarFree) return false
            if (dietary.glutenFree && !product.dietary.glutenFree) return false

            // Spice level filter
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
        <div className="space-y-12">
            {/* Price Range */}
            <div className="space-y-6">
                <h3 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-accent">Price Selection</h3>
                <div className="px-2">
                    <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-8"
                    />
                    <div className="flex items-center justify-between mt-6 text-[10px] font-sans font-black uppercase tracking-widest text-muted-foreground">
                        <span>¥{priceRange[0]}</span>
                        <span>¥{priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Veg / Non-Veg */}
            <div className="space-y-6">
                <h3 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-accent">Preferences</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setSelectedVeg(selectedVeg === "veg" ? null : "veg")}>
                        <Checkbox
                            id="veg"
                            checked={selectedVeg === "veg"}
                            className="rounded-full border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor="veg" className="text-xs font-sans font-bold leading-none cursor-pointer flex items-center gap-2 group-hover:text-primary transition-colors uppercase tracking-widest">
                            Artisanal Only
                        </Label>
                    </div>
                    <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setSelectedVeg(selectedVeg === "non-veg" ? null : "non-veg")}>
                        <Checkbox
                            id="non-veg"
                            checked={selectedVeg === "non-veg"}
                            className="rounded-full border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor="non-veg" className="text-xs font-sans font-bold leading-none cursor-pointer flex items-center gap-2 group-hover:text-primary transition-colors uppercase tracking-widest">
                            Savory Selections
                        </Label>
                    </div>
                </div>
            </div>

            {/* Dietary Preference */}
            <div className="space-y-6">
                <h3 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-accent">Dietary Archives</h3>
                <div className="flex flex-col gap-4">
                    {['vegan', 'sugarFree', 'glutenFree'].map((key) => (
                        <div key={key} className="flex items-center space-x-3 group cursor-pointer" onClick={() => setDietary(prev => ({ ...prev, [key]: !prev[key as keyof typeof dietary] }))}>
                            <Checkbox
                                id={key}
                                checked={dietary[key as keyof typeof dietary]}
                                className="rounded-full border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label htmlFor={key} className="text-xs font-sans font-bold leading-none cursor-pointer capitalize group-hover:text-primary transition-colors uppercase tracking-widest">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spice Level */}
            <div className="space-y-6">
                <h3 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-accent">Intensity Profile</h3>
                <div className="flex flex-wrap gap-3">
                    {['Mild', 'Medium', 'Spicy'].map((level) => (
                        <button
                            key={level}
                            className={`px-4 py-2 text-[9px] font-sans font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 border ${spiceLevel.includes(level)
                                ? 'bg-primary text-background border-primary'
                                : 'bg-transparent text-muted-foreground border-border hover:border-accent hover:text-accent'}`}
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
                className="w-full text-[10px] font-sans font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-accent hover:bg-accent/5 py-8 rounded-full border border-dashed border-border mt-12"
                onClick={resetFilters}
            >
                Reset All Filters
            </Button>
        </div>
    )

    return (
        <div className="min-h-screen bg-background pt-32 pb-48">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col gap-8 mb-20">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="h-[1px] w-8 bg-accent/40" />
                            <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-accent">
                                THE ARCHIVE
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tight text-foreground uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                            {category ? (
                                <>
                                    {category.name.split(" ")[0]} <span className="italic font-light text-accent">{category.name.split(" ")[1] || ""}</span>
                                </>
                            ) : "Full Archive"}
                        </h1>
                    </div>

                    <div className="flex items-center justify-between border-b border-border pb-10">
                        <p className="text-muted-foreground font-sans font-medium text-sm tracking-wide">
                            Displaying <span className="text-foreground font-black tracking-widest">{filteredProducts.length}</span> curated selections
                        </p>

                        {/* Mobile Filter Toggle */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="lg:hidden gap-3 rounded-full px-6 py-5 border-border text-[10px] font-sans font-black uppercase tracking-widest">
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Parameters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-8 bg-background border-l-border">
                                <SheetHeader className="mb-12">
                                    <SheetTitle className="text-2xl font-serif font-black uppercase tracking-tight">System Filter</SheetTitle>
                                    <SheetDescription className="text-xs font-sans font-medium tracking-wide">Refine your artisanal selection.</SheetDescription>
                                </SheetHeader>
                                <FilterSidebar />
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="animate-in fade-in duration-700">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-48 text-center space-y-8 animate-in fade-in duration-1000">
                                <div className="w-24 h-24 rounded-full bg-muted/20 flex items-center justify-center border border-dashed border-border">
                                    <X className="w-10 h-10 text-muted-foreground/30" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-serif font-black text-foreground">No Selections Found</h3>
                                    <p className="text-muted-foreground font-sans font-medium text-sm">Refine your parameters to discover alternatives.</p>
                                </div>
                                <Button onClick={resetFilters} variant="link" className="text-accent font-black uppercase tracking-widest text-[10px] py-0 h-auto">Reset Parameters</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
