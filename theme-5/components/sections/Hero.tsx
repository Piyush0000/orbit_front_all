"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            src: "/hero.png",
            alt: "Premium Snacks and Beverages"
        },
        {
            src: "/category-beverages.png",
            alt: "Refreshing Artisanal Drinks"
        },
        {
            src: "/category-snacks.png",
            alt: "Gourmet Snack Platters"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-background py-20 lg:py-32">
            {/* Cyberpunk Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <div className="flex flex-col justify-center space-y-10 text-center lg:text-left relative z-20">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-[0.3em] animate-in fade-in slide-in-from-left-4 duration-700">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                System Protocol: Active
                            </div>
                            <h1 className="text-6xl font-syne font-black tracking-tighter sm:text-7xl md:text-8xl xl:text-[7rem] text-foreground leading-[1.05] uppercase animate-in fade-in slide-in-from-left-6 duration-700 delay-100 italic">
                                Digital <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">Harvest.</span>
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl font-sans font-light leading-relaxed mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                                Technical sustenance for the next generation.
                                Engineered for performance, delivered via localized nodes.
                                <span className="block mt-4 text-primary/60 font-mono text-sm tracking-widest uppercase opacity-70">// Efficiency Guaranteed //</span>
                            </p>
                        </div>
                        <div className="flex flex-col gap-5 sm:flex-row justify-center lg:justify-start pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                            <Button size="lg" className="group relative px-10 py-8 text-xs font-bold uppercase tracking-[0.2em] h-auto rounded-none bg-primary text-primary-foreground overflow-hidden transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                                <span className="relative z-10 flex items-center gap-3">
                                    Initialize Order <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </Button>
                            <Button size="lg" variant="outline" className="px-10 py-8 text-xs font-bold uppercase tracking-[0.2em] h-auto rounded-none border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary transition-all backdrop-blur-sm">
                                Terminal Access
                            </Button>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex items-center justify-center lg:justify-start gap-4 pt-12 animate-in fade-in duration-1000 delay-500">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1 transition-all duration-500 rounded-none ${currentSlide === idx ? "w-16 bg-primary" : "w-6 bg-muted hover:bg-primary/40"
                                        }`}
                                    aria-label={`Buffer ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none group perspective-1000 z-10">
                        {/* Neon Frame Surround */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary via-secondary to-primary rounded-lg opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />

                        <div className="relative aspect-square overflow-hidden rounded-lg border border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            {slides.map((slide, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === idx ? "opacity-100 translate-x-0 scale-100 z-10" : "opacity-0 translate-x-full scale-110 z-0"
                                        }`}
                                >
                                    <Image
                                        src={slide.src}
                                        fill
                                        alt={slide.alt}
                                        className="object-cover brightness-75 contrast-125 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                        priority={idx === 0}
                                    />
                                    {/* Cyber Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-primary/5 pointer-events-none" />
                                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-primary/10 backdrop-blur-md border-t border-primary/30 flex items-center px-8">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-primary/80">Asset Identified</p>
                                            <p className="text-xl font-syne font-bold text-white tracking-tight uppercase">{slide.alt}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Controls */}
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={prevSlide}
                                    className="h-14 w-14 rounded-none bg-background/80 backdrop-blur-md hover:bg-primary text-primary hover:text-primary-foreground shadow-2xl border border-primary/20"
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextSlide}
                                    className="h-14 w-14 rounded-none bg-background/80 backdrop-blur-md hover:bg-primary text-primary hover:text-primary-foreground shadow-2xl border border-primary/20"
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </Button>
                            </div>
                        </div>

                        {/* Floating Tech Badge */}
                        <div className="absolute -bottom-10 -left-10 bg-background/80 backdrop-blur-xl p-8 rounded-none border border-primary shadow-[0_0_30px_rgba(236,72,153,0.3)] z-30 hidden md:block">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-primary">Node Ver. 5.0.2</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl font-syne font-black text-foreground uppercase italic px-2 bg-primary/20">EST. 1994</span>
                                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">Protocols verified <br /> Integrity confirmed</p>
                                </div>
                                <div className="w-full h-[1px] bg-gradient-to-r from-primary to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
