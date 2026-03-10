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
        <section className="bg-background py-24 md:py-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20">
                    <div className="space-y-2">
                        <span className="text-secondary font-mono font-bold uppercase tracking-[0.5em] text-[10px] animate-pulse">// AGGREGATE_VALUES //</span>
                        <h2 className="text-5xl font-syne font-black tracking-tighter sm:text-6xl text-foreground uppercase italic underline decoration-primary/30 underline-offset-8">
                            Curated Combos
                        </h2>
                    </div>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl font-sans font-light leading-relaxed opacity-70">
                        Optimized asset bundles for maximum efficiency.
                        Multi-vector sustenance integration at reduced bit-rates.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {combos.map((combo) => (
                        <Card key={combo.id} className="group overflow-hidden border-primary/20 bg-card/40 backdrop-blur-xl flex flex-col sm:flex-row items-stretch rounded-none hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] hover:-translate-y-1">
                            {/* Technical Corner Accents */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/40" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/40" />

                            <div className="relative w-full sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden border-r border-primary/10">
                                <Image
                                    src={combo.image[0]}
                                    alt={combo.name}
                                    fill
                                    className="object-cover transition-all duration-700 brightness-75 contrast-125 saturate-50 group-hover:saturate-100 group-hover:scale-110 group-hover:brightness-100"
                                />
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Scan line overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 -translate-y-full group-hover:animate-scan-slow pointer-events-none opacity-30" />
                            </div>

                            <CardContent className="p-10 text-left flex flex-col justify-center gap-5 sm:w-3/5 relative">
                                {combo.originalPrice && (
                                    <div className="flex items-center gap-2">
                                        <div className="h-[1px] w-4 bg-secondary/40" />
                                        <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-[0.3em]">
                                            Yield Gain: ¥{combo.originalPrice - combo.price}
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-3xl font-syne font-bold text-foreground leading-tight uppercase italic group-hover:text-primary transition-colors tracking-tighter">
                                    {combo.name}
                                </h3>
                                <p className="text-muted-foreground text-[13px] font-sans font-light leading-relaxed line-clamp-2 opacity-70">
                                    {combo.shortDescription}
                                </p>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl font-syne font-black text-primary italic">¥{combo.price}</span>
                                    {combo.originalPrice && (
                                        <span className="text-xs font-mono text-muted-foreground/40 line-through tracking-widest">¥{combo.originalPrice}</span>
                                    )}
                                </div>
                                <Link href={`/products/${combo.id}`}>
                                    <Button className="w-full sm:w-auto px-10 h-14 rounded-none font-mono font-bold uppercase tracking-[0.2em] text-[11px] bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all">
                                        Access Combo
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link href="/combos" className="group">
                        <Button variant="outline" className="h-16 px-12 rounded-none font-mono font-bold uppercase tracking-[0.3em] text-[11px] border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-foreground group-hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]">
                            Pull Full Aggregate_Set
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

