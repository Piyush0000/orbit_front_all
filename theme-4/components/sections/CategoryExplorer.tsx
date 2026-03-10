import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

import { categories } from "@/lib/data"

export default function CategoryExplorer() {
    return (
        <section className="bg-background py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
                    <div className="space-y-3">
                        <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px]">Curation</span>
                        <h2 className="text-4xl font-serif tracking-tight sm:text-5xl text-foreground">Our Collections</h2>
                        <div className="w-16 h-1 bg-secondary/30 mx-auto rounded-full" />
                    </div>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl font-light leading-relaxed">
                        Discover our wide range of premium food and beverage selections,
                        sourced from the finest organic producers.
                    </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
                    {categories.map((category) => (
                        <Link key={category.name} href={`/categories/${category.slug}`} className="group">
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative w-full aspect-square rounded-full overflow-hidden ring-1 ring-primary/10 shadow-xl transition-all duration-500 group-hover:ring-secondary group-hover:shadow-2xl group-hover:-translate-y-2">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="text-center group-hover:translate-y-1 transition-transform duration-300">
                                    <span className="text-lg font-serif text-foreground group-hover:text-secondary transition-colors block">{category.name}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">Explore</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
