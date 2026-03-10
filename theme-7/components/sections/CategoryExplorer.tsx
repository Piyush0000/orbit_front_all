import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { categories } from "@/lib/data"

export default function CategoryExplorer() {
    return (
        <section className="bg-background py-32 md:py-48 relative overflow-hidden">
            {/* Soft Ambient Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24 max-w-2xl mx-auto">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="h-[1px] w-8 bg-accent/40" />
                            <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-accent">
                                THE ATELIER
                            </span>
                            <span className="h-[1px] w-8 bg-accent/40" />
                        </div>
                        <h2 className="text-5xl font-serif font-black tracking-tight sm:text-7xl text-foreground">
                            Browse <span className="italic font-light text-accent">Archives</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground md:text-lg font-sans font-medium leading-relaxed opacity-70">
                        Explore our thoughtfully categorized collections, each meticulously
                        curated to offer a unique sensory experience.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-20">
                    {categories.map((category) => (
                        <Link key={category.name} href={`/categories/${category.slug}`} className="group relative">
                            <div className="flex flex-col items-center gap-10">
                                {/* Elegant Circular Frame */}
                                <div className="relative w-full aspect-square overflow-hidden rounded-full bg-muted/20 border border-white/50 transition-all duration-1000 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-all duration-1500 group-hover:scale-110"
                                    />

                                    {/* Glass Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
                                            <ArrowRight className="w-5 h-5 text-accent" />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center space-y-2 transition-all duration-300">
                                    <span className="text-sm font-sans font-black uppercase tracking-[0.2em] text-foreground group-hover:text-accent transition-colors block">
                                        {category.name}
                                    </span>
                                    <span className="text-[10px] font-serif italic text-muted-foreground block group-hover:opacity-100 opacity-60 transition-opacity">
                                        Explore Collection
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

