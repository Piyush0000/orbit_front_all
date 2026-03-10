import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function LimitedOffer() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-background">
            {/* Cyberpunk Background Accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-secondary/5 skew-x-12 -translate-x-1/4 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="relative overflow-hidden bg-card/40 backdrop-blur-2xl border border-primary/30 px-8 py-16 md:px-20 md:py-28 text-center shadow-[0_0_50px_rgba(236,72,153,0.1)]">
                    {/* Technical Corner Accents */}
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary" />
                    <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary" />
                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary" />

                    <div className="relative z-10 flex flex-col items-center space-y-16">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-[0.5em] animate-pulse">
                                <Clock className="w-4 h-4" /> // Critical_Window //
                            </div>
                            <h2 className="text-5xl font-syne font-black tracking-tighter sm:text-7xl md:text-8xl leading-none uppercase italic">
                                Midnight <span className="text-primary italic glitch-text" data-text="HARVEST">Harvest</span>
                                <br />
                                <span className="text-foreground">Specials</span>
                            </h2>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto font-sans font-light leading-relaxed opacity-70">
                                Secure restricted-access nutritional assets before temporal expiration.
                                Dispatch authorized for protocols initiated before <span className="text-primary font-mono font-bold">22:00_HRS</span>.
                            </p>
                        </div>

                        {/* Countdown Timer - Now Square/Tech Modules */}
                        <div className="flex gap-4 md:gap-8">
                            {[{ l: "HRS", v: "02" }, { l: "MIN", v: "45" }, { l: "SEC", v: "30" }].map((item) => (
                                <div key={item.l} className="flex flex-col items-center gap-4">
                                    <div className="flex h-24 w-24 md:h-36 md:w-36 items-center justify-center bg-black border border-primary/20 text-4xl md:text-6xl font-syne font-black text-primary shadow-[inset_0_0_20px_rgba(236,72,153,0.1)] relative group">
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item.v}
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary" />
                                    </div>
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-muted-foreground opacity-60">{item.l}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-16 h-20 rounded-none font-mono font-bold uppercase tracking-[0.3em] text-[12px] shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all hover:scale-105 active:scale-95">
                                // Initiate_Reservation
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

