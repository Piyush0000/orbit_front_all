"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
    quantity: number
    onIncrement: () => void
    onDecrement: () => void
    className?: string
}

export function QuantitySelector({ quantity, onIncrement, onDecrement, className }: QuantitySelectorProps) {
    return (
        <div className={cn("inline-flex items-center border border-white/10 bg-white/[0.02] rounded-none overflow-hidden", className)}>
            <Button
                variant="ghost"
                size="icon"
                onClick={onDecrement}
                className="h-10 w-10 hover:bg-white/5 rounded-none border-r border-white/10"
            >
                <Minus className="h-3 w-3" />
            </Button>
            <span className="w-12 text-center text-sm font-sans font-bold text-foreground">{quantity}</span>
            <Button
                variant="ghost"
                size="icon"
                onClick={onIncrement}
                className="h-10 w-10 hover:bg-white/5 rounded-none border-l border-white/10"
            >
                <Plus className="h-3 w-3" />
            </Button>
        </div>
    )
}

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function NutritionTable({ nutrition }: { nutrition: any }) {
    const items = [
        { label: "Energy", value: nutrition.energy },
        { label: "Protein", value: nutrition.protein },
        { label: "Carbohydrates", value: nutrition.carbohydrates },
        { label: "Total Sugar", value: nutrition.sugar },
        { label: "Total Fat", value: nutrition.fat },
    ]

    return (
        <div className="border border-white/5 rounded-none overflow-hidden bg-card/20 backdrop-blur-sm shadow-xl">
            <Table>
                <TableHeader className="bg-white/[0.03]">
                    <TableRow className="hover:bg-transparent border-0">
                        <TableHead className="text-primary font-sans font-bold uppercase tracking-[0.2em] h-12 text-[10px]">Nutrient</TableHead>
                        <TableHead className="text-primary font-sans font-bold uppercase tracking-[0.2em] h-12 text-[10px] text-right">Magnitude</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.label} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                            <TableCell className="font-sans font-medium text-muted-foreground text-[11px] py-5 uppercase tracking-wide">{item.label}</TableCell>
                            <TableCell className="text-right font-serif font-bold text-foreground text-sm py-5">{item.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
