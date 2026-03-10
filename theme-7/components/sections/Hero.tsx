"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            src: "/hero.png",
            title: "Artisanal Sustenance",
            subtitle: "FOR THE REFINED PALATE",
            description: "Meticulously sourced ingredients, elegantly prepared for those who appreciate the finer details of life."
        },
        {
            src: "/category-beverages.png",
            title: "Vintage Elixirs",
            subtitle: "CRAFTED REFRESHMENTS",
            description: "A curation of exceptional beverages, from sparkling botanicals to aged reserve collections."
        },
        {
            src: "/category-snacks.png",
            title: "Epicurean Bites",
            subtitle: "GOURMET PROVISIONS",
            description: "Small-batch savory selections and artisanal sweets, balanced for superior biological harmony."
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-background">
            {/* Soft Background Accents */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#FBF9F4] opacity-50" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -ml-72 -mb-72 pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-20 lg:pt-0">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <div className="flex flex-col justify-center space-y-12 text-center lg:text-left">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <span className="h-[1px] w-12 bg-accent/40" />
                                <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-accent">
                                    ESTABLISHED MMXVII
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-5xl font-serif font-black tracking-tight sm:text-7xl xl:text-[6.5rem] text-foreground leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                                    {slides[currentSlide].title.split(" ").map((word, i) => (
                                        <span key={i} className="block">
                                            {i === 1 ? <span className="italic font-light text-accent">{word}</span> : word}
                                        </span>
                                    ))}
                                </h1>
                                <p className="max-w-[500px] text-muted-foreground md:text-lg font-sans font-medium leading-relaxed mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                    {slides[currentSlide].description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 sm:flex-row justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                            <Button size="lg" className="px-12 py-8 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-primary text-background hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20">
                                Explore Collection <ArrowRight className="w-4 h-4 ml-3" />
                            </Button>
                            <Button size="lg" variant="ghost" className="px-12 py-8 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-border text-foreground hover:bg-muted/50 transition-all">
                                Our Provenance
                            </Button>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex items-center justify-center lg:justify-start gap-8 pt-12 animate-in fade-in duration-1000 delay-500">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className="group relative py-4"
                                    aria-label={`Slide ${idx + 1}`}
                                >
                                    <div className={`h-[1px] transition-all duration-700 ${currentSlide === idx ? "w-16 bg-accent" : "w-8 bg-border group-hover:bg-accent/40"}`} />
                                    <span className={`absolute -top-2 left-0 text-[8px] font-sans font-black transition-opacity duration-700 ${currentSlide === idx ? "opacity-100" : "opacity-0"}`}>
                                        0{idx + 1}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full group overflow-visible">
                        {/* Decorative floating elements */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 border border-accent/20 rounded-full animate-float pointer-events-none" />
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-primary/20 rounded-full animate-float delay-700 pointer-events-none" />

                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-white/40">
                            {slides.map((slide, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-all duration-1500 ease-in-out ${currentSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                                >
                                    <Image
                                        src={slide.src}
                                        fill
                                        alt={slide.title}
                                        className="object-cover"
                                        priority={idx === 0}
                                    />
                                    {/* Subtitle Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-background/40 to-transparent flex flex-col justify-end">
                                        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                            <p className="text-[10px] font-sans font-black tracking-[0.4em] text-white/80 uppercase">{slide.subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Controls */}
                            <div className="absolute bottom-8 right-8 flex gap-2 z-20">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={prevSlide}
                                    className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextSlide}
                                    className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Floating Heritage Badge */}
                        <div className="absolute top-12 -left-12 bg-white/90 backdrop-blur-xl p-8 rounded-2xl border border-white/40 shadow-2xl z-30 hidden xl:block animate-float">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 w-1.5 bg-accent rounded-full" />
                                    <span className="text-[8px] font-sans font-black uppercase tracking-[0.4em] text-accent">ARCHIVE NO. 427</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-2xl font-serif font-black text-foreground italic">Heritage</span>
                                    <p className="text-[9px] font-sans font-medium text-muted-foreground uppercase tracking-widest leading-relaxed">
                                        Artisanal roots <br /> Modern presentation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
