import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-white py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none text-zinc-900 uppercase">
                                Fresh Food & Drinks <br />
                                <span className="text-primary/80">Delivered to Your Door</span>
                            </h1>
                            <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 mx-auto lg:mx-0">
                                Premium snacks, refreshing beverages & ready-to-eat meals.
                                Sourced fresh, packed with care, delivered fast.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start">
                            <Button size="lg" className="px-8 py-6 text-lg font-medium uppercase tracking-wider h-auto">
                                Order Now
                            </Button>
                            <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-medium uppercase tracking-wider h-auto bg-transparent border-2">
                                Browse Menu
                            </Button>
                        </div>
                    </div>
                    <div className="mx-auto w-full max-w-[600px] lg:max-w-none">
                        <Image
                            src="/hero.png"
                            width={800}
                            height={600}
                            alt="Fresh snacks and beverages"
                            className="aspect-video lg:aspect-square overflow-hidden rounded-xl object-cover shadow-2xl transition-all hover:scale-[1.01]"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
