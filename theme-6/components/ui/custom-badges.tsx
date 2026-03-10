import { cn } from "@/lib/utils"
import { ShieldCheck, Truck, RotateCcw } from "lucide-react"

interface VegNonVegBadgeProps {
    veg: boolean
    className?: string
}

export function VegNonVegBadge({ veg, className }: VegNonVegBadgeProps) {
    return (
        <div className={cn("inline-flex items-center gap-2", className)}>
            <div className={cn(
                "flex h-3.5 w-3.5 items-center justify-center border-2 border-white/10 rounded-none",
            )}>
                <div className={cn(
                    "h-1.5 w-1.5 rounded-none",
                    veg ? "bg-green-500/80" : "bg-primary/80"
                )} />
            </div>
            <span className={cn(
                "text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/60",
            )}>
                {veg ? "Botanical" : "Signature"}
            </span>
        </div>
    )
}

interface SpiceLevelTagProps {
    level: "Mild" | "Medium" | "Spicy" | "None"
    className?: string
}

export function SpiceLevelTag({ level, className }: SpiceLevelTagProps) {
    if (level === "None") return null

    const levels = {
        Mild: "text-foreground/60",
        Medium: "text-primary/70",
        Spicy: "text-primary font-bold"
    }

    return (
        <div className={cn(
            "inline-flex items-center text-[9px] font-sans font-bold uppercase tracking-[0.3em]",
            levels[level],
            className
        )}>
            {level === "Spicy" && <span className="mr-1">◈</span>}
            Intensity: {level}
        </div>
    )
}

export function TrustBadge({ icon, text }: { icon: "shield" | "truck" | "refresh", text: string }) {
    const icons = {
        shield: <ShieldCheck className="w-4 h-4 text-primary/60" />,
        truck: <Truck className="w-4 h-4 text-primary/60" />,
        refresh: <RotateCcw className="w-4 h-4 text-primary/60" />
    }

    return (
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2 velvet-shadow">
            {icons[icon]}
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/70">{text}</span>
        </div>
    )
}
