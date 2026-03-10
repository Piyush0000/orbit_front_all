import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function LimitedOffer() {
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="relative overflow-hidden rounded-[3rem] bg-primary px-8 py-16 md:px-16 md:py-24 text-center text-primary-foreground shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center space-y-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-[0.3em] shadow-lg animate-bounce-subtle">
                                Exclusive Deal
                            </div>
                            <h2 className="text-4xl font-serif tracking-tight sm:text-6xl md:text-7xl leading-tight">
                                Midnight <span className="text-secondary italic">Harvest</span> Specials
                            </h2>
                            <p className="max-w-[650px] text-primary-foreground/70 md:text-xl mx-auto font-light leading-relaxed">
                                Curated organic selections at peak freshness.
                                Order before <span className="text-secondary font-bold italic">10:00 PM</span> for guaranteed same-day garden dispatch.
                            </p>
                        </div>

                        {/* Countdown Timer */}
                        <div className="flex gap-6 md:gap-12">
                            {[{ l: "Hours", v: "02" }, { l: "Minutes", v: "45" }, { l: "Seconds", v: "30" }].map((item) => (
                                <div key={item.l} className="flex flex-col items-center space-y-4">
                                    <div className="flex h-20 w-20 md:h-32 md:w-32 items-center justify-center rounded-full bg-white/10 border border-white/20 text-3xl md:text-5xl font-serif shadow-inner backdrop-blur-md transition-transform hover:scale-110 duration-500">
                                        {item.v}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60 font-bold">{item.l}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-white hover:text-primary px-16 py-8 text-sm font-bold uppercase tracking-[0.2em] h-auto rounded-full shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95">
                                Reserve Collection
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
