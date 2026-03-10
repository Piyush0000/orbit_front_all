import Link from "next/link"
import Image from "next/image"

import { categories } from "@/lib/data"

export default function CategoryExplorer() {
    return (
        <section className="bg-background py-24 md:py-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(191,155,48,0.03),transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24">
                    <div className="space-y-4">
                        <span className="text-primary font-sans font-bold uppercase tracking-[0.4em] text-[10px]">The Collection</span>
                        <h2 className="text-5xl font-serif font-bold tracking-tight sm:text-6xl text-foreground">
                            Curated <span className="text-gold">Selections</span>
                        </h2>
                    </div>
                    <div className="w-12 h-[1px] bg-primary/30" />
                    <p className="max-w-[650px] text-foreground/70 md:text-lg font-sans font-light leading-relaxed mx-auto italic">
                        Explore our meticulously organized offerings, each chosen for
                        its exceptional quality and unique sensory profile.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {categories.map((category) => (
                        <Link key={category.name} href={`/categories/${category.slug}`} className="group relative">
                            <div className="flex flex-col items-center gap-8">
                                {/* Elegant Frame */}
                                <div className="relative w-full aspect-square overflow-hidden bg-muted border border-white/5 transition-all duration-700 group-hover:border-primary/20 velvet-shadow">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-all duration-1000 brightness-[0.8] contrast-[1.1] grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100"
                                    />

                                    {/* Luxury Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Corner Accents */}
                                    <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150" />
                                    <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150" />
                                </div>

                                <div className="text-center space-y-2">
                                    <span className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors block tracking-wide">
                                        {category.name}
                                    </span>
                                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                        <div className="h-[1px] w-6 bg-primary/20" />
                                        <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-primary">Discover</span>
                                        <div className="h-[1px] w-6 bg-primary/20" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
