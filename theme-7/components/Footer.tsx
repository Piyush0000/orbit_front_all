import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const footerLinks = [
    {
        title: "Atelier",
        links: [
            { name: "Our Story", href: "/about" },
            { name: "Artisans", href: "/artisans" },
            { name: "Provenance", href: "/provenance" },
        ],
    },
    {
        title: "Concierge",
        links: [
            { name: "Contact", href: "/contact" },
            { name: "Allocations", href: "/shipping" },
            { name: "Inquiries", href: "/faq" },
        ],
    },
    {
        title: "Collections",
        links: [
            { name: "Seasonal", href: "/categories/seasonal" },
            { name: "Signature", href: "/categories/signature" },
            { name: "Archive", href: "/categories/archive" },
        ],
    },
]

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border pt-32 pb-16 relative overflow-hidden">
            {/* Soft decorative element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-12 gap-y-16 mb-24">
                    <div className="lg:col-span-3 space-y-12">
                        <Link href="/" className="inline-block group">
                            <span className="text-4xl font-serif font-black tracking-widest text-foreground uppercase group-hover:text-primary transition-colors">
                                PROVISION <span className="text-accent font-light italic">&</span> CO.
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm font-sans font-light leading-relaxed max-w-sm">
                            A heritage of excellence in artisanal sustenance.
                            Meticulously sourced, elegantly prepared, and
                            distributed to those who appreciate the finer details of life.
                        </p>
                        <div className="flex space-x-8">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="text-muted-foreground transition-all duration-300 hover:text-accent hover:-translate-y-1"
                                >
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-8">
                            <h4 className="text-[10px] font-sans font-bold text-accent uppercase tracking-[0.4em]">
                                {section.title}
                            </h4>
                            <ul className="space-y-5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground text-[11px] font-sans font-medium uppercase tracking-[0.1em] transition-all hover:text-primary inline-block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-16 border-t border-border flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
                    <div className="space-y-3">
                        <p className="text-muted-foreground/60 text-[9px] font-sans font-bold uppercase tracking-[0.4em]">
                            © {new Date().getFullYear()} Provision & Co. All Rights Reserved.
                        </p>
                        <p className="text-accent/40 text-[8px] font-sans uppercase tracking-[0.5em]">Artisanal Foundation // Global Presence</p>
                    </div>

                    <div className="flex items-center gap-10">
                        {['Privacy', 'Allocations', 'Legal'].map(item => (
                            <span key={item} className="text-muted-foreground/40 text-[9px] font-sans font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors cursor-pointer">
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/30 animate-pulse" />
                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-muted-foreground/40">Atelier Active</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

