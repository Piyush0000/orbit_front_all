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
        <footer className="bg-background border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(191,155,48,0.03),transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-16 mb-24 lg:gap-16">
                    <div className="sm:col-span-2 lg:col-span-3 space-y-10">
                        <Link href="/" className="inline-block group">
                            <span className="text-3xl font-serif font-bold tracking-widest text-foreground uppercase group-hover:text-primary transition-colors">
                                PROVISION <span className="text-primary font-normal">&</span> CO.
                            </span>
                        </Link>
                        <p className="text-foreground/70 text-sm font-sans font-light leading-relaxed max-w-sm">
                            A heritage of excellence in artisanal sustenance.
                            Meticulously sourced, elegantly prepared, and
                            distributed to those who appreciate the finer details of life.
                        </p>
                        <div className="flex space-x-6">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="text-muted-foreground transition-all duration-300 hover:text-primary"
                                >
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-8">
                            <h4 className="text-[10px] font-sans font-bold text-primary uppercase tracking-[0.4em]">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
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
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-sans font-bold text-primary uppercase tracking-[0.4em]">
                            Contact
                        </h4>
                        <div className="space-y-4">
                            <p className="text-foreground/70 text-[11px] font-sans uppercase tracking-[0.1em]">
                                1245 Heritage Way<br />
                                Culinary District<br />
                                Estate 90210
                            </p>
                            <p className="text-primary text-[11px] font-sans font-bold uppercase tracking-[0.2em] border-b border-primary/20 pb-1 inline-block break-all sm:break-normal">
                                concierge@provision.co
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="space-y-2">
                        <p className="text-foreground/60 text-[9px] font-sans font-medium uppercase tracking-[0.3em]">
                            © {new Date().getFullYear()} Provision & Co. All Rights Reserved.
                        </p>
                        <p className="text-primary/40 text-[8px] font-sans uppercase tracking-[0.4em]">Global Presence // Estate Ver. 1.0.0</p>
                    </div>
                    <div className="flex items-center gap-8">
                        {['Privacy', 'Terms', 'Bequest'].map(item => (
                            <span key={item} className="text-muted-foreground/40 text-[9px] font-sans font-medium uppercase tracking-[0.2em] hover:text-primary transition-colors cursor-pointer">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
