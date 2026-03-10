"use client"

import { Button } from "@/components/ui/button"
import { Clock, Star, ArrowRight } from "lucide-react"

export default function LimitedOffer() {
    return (
        <section className="py-32 md:py-48 relative overflow-hidden bg-background">
            {/* Organic Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -mr-72 -mt-72 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="relative overflow-hidden bg-white/40 backdrop-blur-2xl border border-border/50 rounded-[3rem] px-8 py-20 md:px-20 md:py-32 text-center shadow-2xl shadow-black/5">

                    {/* Subtle Decorative Accent */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-20">
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-accent" />
                            <Star className="w-4 h-4 text-accent fill-accent" />
                            <div className="h-[1px] w-12 bg-accent" />
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center space-y-20">
                        <div className="space-y-10">
                            <div className="inline-flex items-center gap-4 px-8 py-3 bg-accent/10 border border-accent/20 rounded-full text-accent text-[10px] font-sans font-black uppercase tracking-[0.4em] animate-pulse">
                                <Clock className="w-4 h-4" /> Temporal Allocation
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-5xl font-serif font-black tracking-tight sm:text-7xl md:text-8xl leading-[0.9] text-foreground uppercase">
                                    Nocturnal <br />
                                    <span className="italic font-light text-accent">Curations</span>
                                </h2>
                                <p className="max-w-[650px] text-muted-foreground md:text-xl mx-auto font-sans font-medium leading-relaxed italic opacity-80">
                                    Secure your allocation of our restricted heritage provisions before the window concludes.
                                    Dispatch authorized for selections finalized before <span className="text-accent font-serif font-black not-italic border-b border-accent/30 pr-1">22:00 HRS</span>.
                                </p>
                            </div>
                        </div>

                        {/* Countdown Timer - Elegant Glassmorphism Modules */}
                        <div className="flex gap-6 md:gap-12 flex-wrap justify-center">
                            {[{ l: "Hours", v: "02" }, { l: "Minutes", v: "45" }, { l: "Seconds", v: "30" }].map((item) => (
                                <div key={item.l} className="flex flex-col items-center gap-6">
                                    <div className="flex h-28 w-28 md:h-40 md:w-40 items-center justify-center bg-white/60 backdrop-blur-md border border-border/40 rounded-[2.5rem] text-4xl md:text-6xl font-serif font-black text-foreground shadow-sm relative group hover:-translate-y-2 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-accent/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="italic tracking-tighter">{item.v}</span>
                                        {/* Subtle corner detail */}
                                        <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-accent/30" />
                                    </div>
                                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-muted-foreground/60">{item.l}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-10">
                            <Button size="lg" className="bg-primary text-background hover:bg-primary/90 px-16 h-20 rounded-full font-sans font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group">
                                Secure Allocation <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

