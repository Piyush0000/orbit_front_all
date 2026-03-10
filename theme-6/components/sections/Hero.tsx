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
            {/* Elegant Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(191,155,48,0.05),transparent_70%)]" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[linear-gradient(45deg,rgba(0,0,0,0)_0%,rgba(191,155,48,0.02)_100%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <div className="flex flex-col justify-center space-y-12 text-center lg:text-left relative z-20">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-1 border-l-2 border-primary text-primary text-[10px] font-sans font-bold uppercase tracking-[0.4em] animate-in fade-in slide-in-from-left-4 duration-700">
                                Rare & Exquisite
                            </div>
                            <h1 className="text-6xl font-serif font-bold tracking-tight sm:text-7xl md:text-8xl xl:text-[6.5rem] text-foreground leading-[1.1] animate-in fade-in slide-in-from-left-6 duration-700 delay-100">
                                Culinary <br />
                                <span className="text-gold">Artistry.</span>
                            </h1>
                            <p className="max-w-[550px] text-foreground/70 md:text-lg font-sans font-light leading-relaxed mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                                Discover a curated collection of artisanal sustenance,
                                meticulously prepared for the discerning palate.
                                Excellence in every detail, delivered to your sanctuary.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6 sm:flex-row justify-center lg:justify-start pt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                            <Link href="/categories/all">
                                <Button size="lg" className="group relative px-12 py-8 text-[11px] font-bold uppercase tracking-[0.3em] h-auto rounded-none bg-primary text-background overflow-hidden transition-all hover:bg-primary/90 velvet-shadow border border-primary w-full sm:w-auto">
                                    Explore Collection
                                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="ghost" className="px-12 py-8 text-[11px] font-bold uppercase tracking-[0.3em] h-auto rounded-none border border-white/10 text-foreground hover:bg-white/5 transition-all">
                                Our Story
                            </Button>
                        </div>

                        {/* Slide Indicators simplified */}
                        <div className="flex items-center justify-center lg:justify-start gap-3 pt-12 animate-in fade-in duration-1000 delay-500">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-[1px] transition-all duration-700 ${currentSlide === idx ? "w-12 bg-primary" : "w-4 bg-muted hover:bg-primary/50"
                                        }`}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none group z-10">
                        {/* Subtle Frame */}
                        <div className="absolute -inset-1 border border-white/5 pointer-events-none" />

                        <div className="relative aspect-[4/5] overflow-hidden velvet-shadow">
                            {slides.map((slide, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-all duration-[1.5s] ease-out ${currentSlide === idx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"
                                        }`}
                                >
                                    <Image
                                        src={slide.src}
                                        fill
                                        alt={slide.alt}
                                        className="object-cover brightness-90 grayscale-[10%] group-hover:grayscale-0 transition-all duration-[2s]"
                                        priority={idx === 0}
                                    />
                                    {/* Luxury Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm border-t border-white/5">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-sans font-medium tracking-[0.4em] uppercase text-primary">Signature Selection</p>
                                            <p className="text-2xl font-serif font-bold text-white tracking-wide">{slide.alt}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Controls simplified */}
                            <div className="absolute bottom-10 right-10 flex gap-2 z-20">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={prevSlide}
                                    className="h-12 w-12 rounded-none bg-background/40 backdrop-blur-md hover:bg-primary text-primary hover:text-background border border-white/5"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextSlide}
                                    className="h-12 w-12 rounded-none bg-background/40 backdrop-blur-md hover:bg-primary text-primary hover:text-background border border-white/5"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Floating Badge (Luxury themed) */}
                        <div className="absolute -top-6 -right-6 bg-card p-6 border border-white/5 velvet-shadow z-30 hidden xl:block">
                            <div className="flex flex-col space-y-3">
                                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-primary">Provenance</p>
                                <div className="space-y-1">
                                    <span className="text-xl font-serif font-bold text-foreground">Established 1994</span>
                                    <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest leading-relaxed">Legacy of Excellence</p>
                                </div>
                                <div className="w-12 h-[1px] bg-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
