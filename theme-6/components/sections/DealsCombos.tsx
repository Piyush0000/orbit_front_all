import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { products } from "@/lib/data"
import Link from "next/link"

export default function DealsCombos() {
    const combos = products
        .filter(p => p.category === 'combos')
        .slice(0, 2)

    return (
        <section className="bg-background py-24 md:py-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(191,155,48,0.03),transparent_70%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24">
                    <div className="space-y-4">
                        <span className="text-primary font-sans font-bold uppercase tracking-[0.4em] text-[10px]">The Art of Pairing</span>
                        <h2 className="text-5xl font-serif font-bold tracking-tight sm:text-6xl text-foreground">
                            Curated <span className="text-gold">Harmonies</span>
                        </h2>
                    </div>
                    <div className="w-12 h-[1px] bg-primary/30" />
                    <p className="max-w-[700px] text-muted-foreground md:text-lg font-sans font-light leading-relaxed opacity-70">
                        Expertly balanced pairings designed to provide a comprehensive
                        culinary experience. Excellence, compounded.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {combos.map((combo) => (
                        <Card key={combo.id} className="group overflow-hidden border-white/5 bg-card/20 backdrop-blur-sm flex flex-col sm:flex-row items-stretch rounded-none hover:border-primary/20 transition-all duration-700 hover:velvet-shadow hover:-translate-y-1">
                            <div className="relative w-full sm:w-2/5 aspect-[4/5] sm:aspect-auto overflow-hidden">
                                <Image
                                    src={combo.image[0]}
                                    alt={combo.name}
                                    fill
                                    className="object-cover transition-all duration-1000 brightness-90 contrast-[1.05] grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100"
                                />
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            </div>

                            <CardContent className="p-10 text-left flex flex-col justify-center gap-6 sm:w-3/5 relative">
                                {combo.originalPrice && (
                                    <div className="flex items-center gap-3">
                                        <div className="h-[1px] w-6 bg-primary/30" />
                                        <span className="text-[10px] font-sans font-bold text-primary uppercase tracking-[0.3em]">
                                            Exquisite Value: ¥{combo.originalPrice - combo.price} Off
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-3xl font-serif font-bold text-foreground leading-tight tracking-wide group-hover:text-primary transition-colors">
                                    {combo.name}
                                </h3>
                                <p className="text-muted-foreground text-[13px] font-sans font-light leading-relaxed line-clamp-2 opacity-70">
                                    {combo.shortDescription}
                                </p>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl font-serif font-bold text-primary">¥{combo.price}</span>
                                    {combo.originalPrice && (
                                        <span className="text-xs font-sans text-muted-foreground/40 line-through tracking-[0.2em] uppercase">¥{combo.originalPrice}</span>
                                    )}
                                </div>
                                <Link href={`/products/${combo.id}`}>
                                    <Button className="w-full sm:w-auto px-12 h-14 rounded-none font-sans font-bold uppercase tracking-[0.2em] text-[11px] bg-primary text-background hover:bg-primary/90 transition-all velvet-shadow border border-primary">
                                        View Selection
                                    </Button>
                                </Link>

                                {/* Elegant Corner Accents */}
                                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <Link href="/combos" className="group">
                        <Button variant="outline" className="h-16 px-16 rounded-none font-sans font-bold uppercase tracking-[0.3em] text-[11px] border-white/10 hover:border-primary/40 hover:bg-white/5 transition-all text-foreground">
                            Explore All Pairings
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
