import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Product: [
            { label: 'Templates', href: ROUTES.TEMPLATES },
            { label: 'Pricing', href: ROUTES.PRICING },
            { label: 'Dashboard', href: ROUTES.DASHBOARD },
        ],
        Resources: [
            { label: 'Documentation', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Support', href: '#' },
        ],
        Company: [
            { label: 'About', href: '#' },
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
        ],
    };

    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href={ROUTES.HOME} className="inline-block mb-4">
                            <div className="text-2xl font-bold text-foreground">Portify</div>
                        </Link>
                        <p className="text-sm text-foreground/70 mb-4 max-w-xs">
                            Create professional portfolios in minutes. No coding required.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer text-foreground/70 hover:text-foreground transition-colors"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer text-foreground/70 hover:text-foreground transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer text-foreground/70 hover:text-foreground transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-foreground mb-4">{category}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="cursor-pointer text-sm text-foreground/70 hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-foreground/70 text-center">
                        © {currentYear} Portify. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};