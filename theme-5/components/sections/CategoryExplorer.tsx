import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

import { categories } from "@/lib/data"

export default function CategoryExplorer() {
    return (
        <section className="bg-background py-24 md:py-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20">
                    <div className="space-y-2">
                        <span className="text-secondary font-mono font-bold uppercase tracking-[0.5em] text-[10px] animate-pulse">// Data Nodes //</span>
                        <h2 className="text-5xl font-syne font-black tracking-tighter sm:text-6xl text-foreground uppercase italic underline decoration-primary/30 underline-offset-8">
                            Collections
                        </h2>
                    </div>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl font-sans font-light leading-relaxed opacity-70">
                        Categorized assets for optimal sustenance retrieval.
                        Scan and select your preferred nutrient vector.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {categories.map((category) => (
                        <Link key={category.name} href={`/categories/${category.slug}`} className="group relative">
                            <div className="flex flex-col items-center gap-6">
                                {/* Holographic Square */}
                                <div className="relative w-full aspect-square overflow-hidden bg-muted/20 border border-primary/20 transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] group-hover:-translate-y-2 group-hover:-skew-x-2">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-all duration-700 brightness-75 contrast-125 saturate-50 group-hover:saturate-100 group-hover:scale-110 group-hover:brightness-100"
                                    />

                                    {/* Scanning Line Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-1/2 -translate-y-full group-hover:animate-scan-slow pointer-events-none" />

                                    {/* Holographic Overlay */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 translate-y-1" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 -translate-y-1" />
                                </div>

                                <div className="text-center space-y-1 transition-all duration-300">
                                    <span className="text-xl font-syne font-bold text-foreground group-hover:text-primary transition-colors block uppercase tracking-tight">
                                        {category.name}
                                    </span>
                                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                                        <div className="h-[1px] w-4 bg-primary/40" />
                                        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-primary">Access Node</span>
                                        <div className="h-[1px] w-4 bg-primary/40" />
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

