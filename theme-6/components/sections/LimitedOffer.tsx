import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function LimitedOffer() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-background">
            {/* Elegant Background Accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[radial-gradient(circle_at_0%_100%,rgba(191,155,48,0.05),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="relative overflow-hidden bg-card/10 backdrop-blur-2xl border border-white/5 px-8 py-20 md:px-24 md:py-32 text-center velvet-shadow">

                    {/* Minimalist Accents */}
                    <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-primary/30" />
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-primary/30" />

                    <div className="relative z-10 flex flex-col items-center space-y-16">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 border border-primary/20 text-primary text-[10px] font-sans font-bold uppercase tracking-[0.4em]">
                                <Clock className="w-4 h-4" /> The Privilege Window
                            </div>
                            <h2 className="text-5xl font-serif font-bold tracking-tight sm:text-7xl md:text-8xl leading-[1.1]">
                                The <span className="text-gold">Twilight</span> Collection
                                <br />
                                <span className="text-foreground">Exclusives</span>
                            </h2>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto font-sans font-light leading-relaxed opacity-70">
                                Rare selections available only during these specific hours.
                                Secure your invitation to the most sought-after culinary
                                secrets before the window concludes.
                            </p>
                        </div>

                        {/* Elegant Countdown */}
                        <div className="flex gap-6 md:gap-12">
                            {[{ l: "Hours", v: "02" }, { l: "Minutes", v: "45" }, { l: "Seconds", v: "30" }].map((item) => (
                                <div key={item.l} className="flex flex-col items-center gap-4">
                                    <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center bg-background border border-white/10 text-4xl md:text-5xl font-serif font-bold text-primary relative group">
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item.v}
                                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 pointer-events-none" />
                                    </div>
                                    <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-muted-foreground opacity-60">{item.l}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <Button size="lg" className="bg-primary text-background hover:bg-primary/90 px-20 h-20 rounded-none font-sans font-bold uppercase tracking-[0.3em] text-[11px] velvet-shadow transition-all border border-primary">
                                Secure Access
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
