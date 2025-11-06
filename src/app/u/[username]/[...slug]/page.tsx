import { notFound } from 'next/navigation';
import { getPortfolioBySlug, incrementPortfolioViews } from '@/lib/firebase/firestore';
import { Metadata } from 'next';

interface PortfolioPageProps {
    params: {
        username: string;
        slug?: string[];
    };
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
    const portfolio = await getPortfolioBySlug(params.username);

    if (!portfolio) {
        return {
            title: 'Portfolio Not Found',
        };
    }

    return {
        title: portfolio.seo.title,
        description: portfolio.seo.description,
        openGraph: {
            title: portfolio.seo.title,
            description: portfolio.seo.description,
            images: portfolio.seo.image ? [portfolio.seo.image] : [],
        },
    };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
    const portfolio = await getPortfolioBySlug(params.username);

    if (!portfolio || !portfolio.isPublished) {
        notFound();
    }

    // Increment views
    await incrementPortfolioViews(portfolio.id);

    // Determine which page to show
    const currentPage = params.slug?.[0] || 'home';

    return (
        <div className="min-h-screen">
            {/* Portfolio will be rendered here based on template */}
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center space-y-8">
                        {/* Placeholder for template rendering */}
                        <div className="p-12 rounded-xl border border-border bg-muted/30">
                            <h1 className="text-4xl font-bold text-foreground mb-4">
                                {portfolio.data.personal.name}
                            </h1>
                            <p className="text-xl text-foreground/70 mb-6">
                                {portfolio.data.personal.title}
                            </p>
                            <p className="text-foreground/70 mb-8">
                                {portfolio.data.personal.bio}
                            </p>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary">
                                Template: {portfolio.templateId} - Page: {currentPage}
                            </div>

                            <div className="mt-8 text-sm text-foreground/50">
                                This is a placeholder. The actual template will render here.
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-center gap-4">
                            {portfolio.activePages.map((page) => (
                                <a
                                    key={page}
                                    href={`/u/${params.username}${page !== 'home' ? `/${page}` : ''}`}
                                    className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page || (currentPage === 'home' && page === 'home')
                                        ? 'bg-primary text-white'
                                        : 'text-foreground/70 hover:bg-muted'
                                        }`}
                                >
                                    {page.charAt(0).toUpperCase() + page.slice(1)}
                                </a>
                            ))}
                        </div>

                        {/* Projects Preview (if any) */}
                        {portfolio.data.projects.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Projects</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {portfolio.data.projects.slice(0, 4).map((project) => (
                                        <div
                                            key={project.id}
                                            className="p-6 rounded-xl border border-border bg-background"
                                        >
                                            <h3 className="font-semibold text-foreground mb-2">{project.title}</h3>
                                            <p className="text-sm text-foreground/70 mb-3">
                                                {project.shortDescription}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techs.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 rounded text-xs bg-muted text-foreground/70"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills Preview (if any) */}
                        {portfolio.data.skills.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Skills</h2>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {portfolio.data.skills.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="mt-16 pt-8 border-t border-border">
                            <p className="text-sm text-foreground/50">
                                Built with{' '}
                                <a href="/" className="text-primary hover:underline">
                                    Portify
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}