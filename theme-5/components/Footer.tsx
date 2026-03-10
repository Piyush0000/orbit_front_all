import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const footerLinks = [
    {
        title: "About Us",
        links: [
            { name: "Our Story", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Press", href: "/press" },
        ],
    },
    {
        title: "Support",
        links: [
            { name: "Contact", href: "/contact" },
            { name: "Shipping & Returns", href: "/shipping" },
            { name: "FAQ", href: "/faq" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Terms of Service", href: "/terms" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Cookie Policy", href: "/cookies" },
        ],
    },
]

export default function Footer() {
    return (
        <footer className="bg-background border-t border-primary/20 pt-24 pb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 lg:gap-16 mb-24">
                    <div className="col-span-2 lg:col-span-3 space-y-10">
                        <Link href="/" className="inline-block group">
                            <span className="text-4xl font-syne font-black tracking-tighter text-foreground uppercase italic group-hover:text-primary transition-colors">
                                PROVISION<span className="text-primary italic">.5</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm font-sans font-light leading-relaxed max-w-sm opacity-70">
                            The authorized vector for premium nutritional assets.
                            Engineered for high-performance biological systems.
                            Grown in secure nodes, delivered via high-speed transit.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="p-4 rounded-none bg-card/40 border border-primary/20 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:-translate-y-1"
                                >
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    {footerLinks.map((section) => (section.title !== "Legal" && (
                        <div key={section.title} className="space-y-8">
                            <h4 className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.5em] flex items-center gap-2">
                                <span className="h-[1px] w-4 bg-primary/40" /> {section.title}
                            </h4>
                            <ul className="space-y-5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground text-[11px] font-mono font-bold uppercase tracking-widest transition-all hover:text-primary hover:translate-x-1 inline-block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )))}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.5em] flex items-center gap-2">
                            <span className="h-[1px] w-4 bg-primary/40" /> SYSTEM
                        </h4>
                        <div className="p-4 bg-primary/5 border border-primary/10 space-y-3">
                            <div className="flex justify-between text-[8px] font-mono uppercase tracking-widest">
                                <span className="text-muted-foreground">Uptime</span>
                                <span className="text-green-500">99.98%</span>
                            </div>
                            <div className="flex justify-between text-[8px] font-mono uppercase tracking-widest">
                                <span className="text-muted-foreground">Latency</span>
                                <span className="text-primary">24ms</span>
                            </div>
                            <div className="w-full h-[2px] bg-primary/10 overflow-hidden">
                                <div className="h-full bg-primary w-2/3 animate-scan-slow" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="space-y-2">
                        <p className="text-muted-foreground/60 text-[9px] font-mono font-bold uppercase tracking-[0.4em]">
                            © {new Date().getFullYear()} PROVISION_DATA_CORRECTIVE_CORP
                        </p>
                        <p className="text-primary/40 text-[8px] font-mono uppercase tracking-[0.5em]">Global Encryption Active // Node 5.0.2</p>
                    </div>
                    <div className="flex items-center gap-8">
                        {['Privacy', 'Terms', 'Sustainability'].map(item => (
                            <span key={item} className="text-muted-foreground/40 text-[9px] font-mono font-bold uppercase tracking-[0.3em] hover:text-primary transition-colors cursor-pointer">
                                {item}.DAT
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

