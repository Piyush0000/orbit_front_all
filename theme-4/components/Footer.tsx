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
        <footer className="bg-primary/5 border-t border-primary/10 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
                    <div className="col-span-2 lg:col-span-3 space-y-8">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-serif tracking-tight text-primary italic">Provision & Co.</span>
                        </Link>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-sm font-light">
                            Your premium destination for high-quality organic snacks,
                            artisanal beverages, and chef-curated meals.
                            Grown with passion, delivered with care.
                        </p>
                        <div className="flex space-x-5">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <Link key={i} href="#" className="p-3 rounded-full bg-white border border-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 shadow-sm">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-6">
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-muted-foreground text-sm font-light transition-all hover:text-secondary hover:translate-x-1 inline-block">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="pt-10 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} Provision & Co. Organic Est.
                    </p>
                    <div className="flex items-center gap-8">
                        <span className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-[0.2em]">Privacy</span>
                        <span className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-[0.2em]">Terms</span>
                        <span className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-[0.2em]">Sustainability</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
