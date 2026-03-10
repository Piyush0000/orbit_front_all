import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { products } from "@/lib/data"
import Link from "next/link"

export default function DealsCombos() {
    const combos = products
        .filter(p => p.category === 'combos')
        .slice(0, 2) // Just show 2 for the home page section

    return (
        <section className="bg-background py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
                    <div className="space-y-3">
                        <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px]">Special Value</span>
                        <h2 className="text-4xl font-serif tracking-tight sm:text-5xl text-foreground italic">Curated Combos</h2>
                        <div className="w-16 h-1 bg-secondary/30 mx-auto rounded-full" />
                    </div>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl font-light leading-relaxed">
                        Save more with our curated selection of bundled favorites,
                        handpicked for the perfect taste experience.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {combos.map((combo) => (
                        <Card key={combo.id} className="group overflow-hidden border-primary/5 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm flex flex-col sm:flex-row items-stretch rounded-[2.5rem] hover:-translate-y-1">
                            <div className="relative w-full sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden">
                                <Image
                                    src={combo.image[0]}
                                    alt={combo.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <CardContent className="p-8 text-left flex flex-col justify-center gap-4 sm:w-3/5">
                                {combo.originalPrice && (
                                    <Badge className="bg-secondary text-secondary-foreground border-none font-bold uppercase text-[9px] tracking-widest px-3 py-1 rounded-full w-fit shadow-md">
                                        Save ₹{combo.originalPrice - combo.price}
                                    </Badge>
                                )}
                                <h3 className="text-2xl font-serif text-foreground leading-tight">{combo.name}</h3>
                                <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-2">
                                    {combo.shortDescription}
                                </p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-serif text-primary">₹{combo.price}</span>
                                    {combo.originalPrice && (
                                        <span className="text-sm text-muted-foreground/50 line-through">₹{combo.originalPrice}</span>
                                    )}
                                </div>
                                <Link href={`/products/${combo.id}`}>
                                    <Button className="w-full sm:w-auto px-8 py-6 rounded-full font-bold uppercase tracking-widest text-[10px] bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300">
                                        View Combo
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <Link href="/combos">
                        <Button variant="outline" className="px-10 py-7 rounded-full font-bold uppercase tracking-widest text-[10px] border-2 border-primary/10 hover:border-primary hover:bg-white/50 transition-all">
                            View All Combos
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
