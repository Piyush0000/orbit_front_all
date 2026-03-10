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
        <section className="relative w-full overflow-hidden bg-background py-16 md:py-24 lg:py-32">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
                        <div className="space-y-6">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-700">
                                Fresh & Artisanal
                            </div>
                            <h1 className="text-5xl font-serif tracking-tight sm:text-6xl md:text-7xl xl:text-8xl text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                                Nature&apos;s Finest <br />
                                <span className="text-secondary italic">Bottled & Baked.</span>
                            </h1>
                            <p className="max-w-[550px] text-muted-foreground md:text-xl font-light leading-relaxed mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                                Experience the harmony of organic ingredients and artisanal craft.
                                Delivered with care, from our garden to your doorstep.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            <Button size="lg" className="px-10 py-7 text-sm font-bold uppercase tracking-widest h-auto rounded-full shadow-2xl hover:scale-105 transition-all bg-primary text-primary-foreground">
                                Explore Collection
                            </Button>
                            <Button size="lg" variant="outline" className="px-10 py-7 text-sm font-bold uppercase tracking-widest h-auto rounded-full border-2 border-primary/20 hover:border-primary hover:bg-white/50 transition-all">
                                Our Story
                            </Button>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex items-center justify-center lg:justify-start gap-3 pt-8 animate-in fade-in duration-1000 delay-500">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === idx ? "w-12 bg-primary" : "w-4 bg-primary/20"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none group">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
                            {slides.map((slide, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === idx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"
                                        }`}
                                >
                                    <Image
                                        src={slide.src}
                                        fill
                                        alt={slide.alt}
                                        className="object-cover"
                                        priority={idx === 0}
                                    />
                                    {/* Soft Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                </div>
                            ))}

                            {/* Controls */}
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={prevSlide}
                                    className="h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-primary shadow-xl border border-primary/10"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={nextSlide}
                                    className="h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-primary shadow-xl border border-primary/10"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Floating Decorative Badge */}
                        <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-2xl z-30 hidden md:block border border-primary/5 animate-bounce-subtle">
                            <div className="flex flex-col items-center text-center">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-2">Since 1994</span>
                                <span className="text-2xl font-serif text-primary">100% Organic</span>
                                <div className="w-12 h-0.5 bg-secondary/30 my-3" />
                                <span className="text-xs font-medium text-muted-foreground italic">Grown with passion</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
