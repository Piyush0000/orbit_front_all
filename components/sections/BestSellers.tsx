import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const products = [
    { id: 1, name: "Truffle Popcorn", price: 299, image: "/category-snacks.png", veg: true, rating: 4.8, badge: "Bestseller" },
    { id: 2, name: "Cold Pressed Orange Juice", price: 149, image: "/category-beverages.png", veg: true, rating: 4.5, badge: "Trending" },
    { id: 3, name: "Gourmet Trail Mix", price: 450, image: "/category-organic.png", veg: true, rating: 4.9, badge: "New" },
    { id: 4, name: "Organic Roasted Almonds", price: 599, image: "/category-organic.png", veg: true, rating: 4.7, badge: null },
    { id: 5, name: "Sparkling Berry Fusion", price: 120, image: "/category-beverages.png", veg: true, rating: 4.2, badge: null },
    { id: 6, name: "Dark Chocolate & Fig Cluster", price: 350, image: "/category-snacks.png", veg: true, rating: 4.6, badge: "Bestseller" },
    { id: 7, name: "Spicy Peri Peri Cashews", price: 499, image: "/category-snacks.png", veg: true, rating: 4.4, badge: null },
    { id: 8, name: "Lemon & Mint Iced Tea", price: 99, image: "/category-beverages.png", veg: true, rating: 4.3, badge: "Trending" },
]

export default function BestSellers() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900 uppercase">Best Sellers</h2>
                        <p className="max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                            Our community's most loved snacks and beverages.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Card key={product.id} className="group relative flex flex-col border-zinc-100 shadow-sm transition-all hover:shadow-md overflow-hidden">
                            <CardHeader className="p-0">
                                <div className="aspect-square relative overflow-hidden rounded-t-xl bg-zinc-50">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {product.badge && (
                                        <Badge className="absolute top-3 left-3 bg-primary text-white uppercase text-[10px] tracking-widest px-2 py-0.5 border-none">
                                            {product.badge}
                                        </Badge>
                                    )}
                                    <div className="absolute top-3 right-3">
                                        <div className={`w-3 h-3 rounded-full border border-zinc-100 ${product.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 space-y-2">
                                <div className="flex items-center gap-1 text-sm text-zinc-500">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span>{product.rating}</span>
                                </div>
                                <CardTitle className="text-lg font-bold text-zinc-900">{product.name}</CardTitle>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-primary">₹{product.price}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button className="w-full font-semibold uppercase tracking-wider">Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
