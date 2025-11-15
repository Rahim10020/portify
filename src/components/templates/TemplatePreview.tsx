'use client';

import { useState } from 'react';
import { Portfolio } from '@/types';
import { TemplateRenderer } from './TemplateRenderer';
import { Monitor, Smartphone } from 'lucide-react';

interface TemplatePreviewProps {
    templateId: string;
    templateName: string;
}

// Mock portfolio data for preview
const createMockPortfolio = (templateId: string): Portfolio => ({
    id: 'preview-portfolio',
    userId: 'preview-user',
    templateId,
    slug: 'preview',
    isPublished: true,
    activePages: ['home', 'about', 'projects', 'contact'],
    data: {
        personal: {
            name: 'Alex Johnson',
            title: 'Full-Stack Developer & Designer',
            bio: 'Passionate about creating beautiful and functional web experiences.',
            longBio: 'I\'m a full-stack developer with 5+ years of experience building web applications. I love turning complex problems into simple, beautiful solutions.',
            location: 'San Francisco, CA',
            photo: '',
            cv: '',
        },
        experience: [
            {
                id: '1',
                company: 'Tech Startup Inc.',
                position: 'Senior Developer',
                period: 'Jan 2021 - Present',
                description: 'Leading frontend development for multiple client projects.',
            },
            {
                id: '2',
                company: 'Digital Agency',
                position: 'Web Developer',
                period: 'Jun 2019 - Dec 2020',
                description: 'Developed responsive websites and web applications.',
            },
        ],
        projects: [
            {
                id: '1',
                title: 'E-Commerce Platform',
                shortDescription: 'A modern e-commerce platform with real-time inventory management and payment processing.',
                fullDescription: 'Built a comprehensive e-commerce solution featuring real-time inventory management, secure payment processing with Stripe, and an intuitive admin dashboard.',
                techs: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
                images: [],
                liveUrl: 'https://example.com',
                githubUrl: 'https://github.com/example',
                featured: true,
                challenges: 'Real-time inventory sync across multiple warehouses',
                solution: 'Implemented WebSocket-based real-time updates and conflict resolution',
            },
            {
                id: '2',
                title: 'Task Management App',
                shortDescription: 'Collaborative task management tool with real-time updates and team collaboration features.',
                fullDescription: 'Created a modern task management application with real-time collaboration, drag-and-drop interface, and team communication features.',
                techs: ['Vue.js', 'Firebase', 'Tailwind CSS'],
                images: [],
                liveUrl: 'https://example.com',
                featured: true,
            },
            {
                id: '3',
                title: 'Portfolio Builder',
                shortDescription: 'No-code portfolio builder with customizable templates and drag-and-drop interface.',
                techs: ['Next.js', 'TypeScript', 'Tailwind CSS'],
                images: [],
                githubUrl: 'https://github.com/example',
                featured: false,
            },
        ],
        skills: [
            { name: 'JavaScript', level: 90, category: 'Frontend' },
            { name: 'TypeScript', level: 85, category: 'Frontend' },
            { name: 'React', level: 90, category: 'Frontend' },
            { name: 'Node.js', level: 80, category: 'Backend' },
            { name: 'Python', level: 75, category: 'Backend' },
            { name: 'UI/UX Design', level: 70, category: 'Design' },
        ],
        socials: {
            email: 'alex@example.com',
            github: 'https://github.com/alexjohnson',
            linkedin: 'https://linkedin.com/in/alexjohnson',
            twitter: 'https://twitter.com/alexjohnson',
        },
        theme: {
            darkModeEnabled: true,
            primaryColor: '#3b82f6',
            font: 'inter',
            lightMode: {
                bg: '#ffffff',
                text: '#0f172a',
                accent: '#3b82f6',
            },
            darkMode: {
                bg: '#0f172a',
                text: '#f1f5f9',
                accent: '#60a5fa',
            },
        },
    },
    seo: {
        title: 'Alex Johnson - Full-Stack Developer',
        description: 'Passionate about creating beautiful and functional web experiences.',
        image: '',
    },
    views: 0,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
});

export const TemplatePreview = ({ templateId, templateName }: TemplatePreviewProps) => {
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [currentPage, setCurrentPage] = useState('home');
    const mockPortfolio = createMockPortfolio(templateId);

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('desktop')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                            viewMode === 'desktop'
                                ? 'bg-primary text-white'
                                : 'bg-background text-foreground hover:bg-muted'
                        }`}
                    >
                        <Monitor size={18} />
                        <span className="text-sm font-medium">Desktop</span>
                    </button>
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                            viewMode === 'mobile'
                                ? 'bg-primary text-white'
                                : 'bg-background text-foreground hover:bg-muted'
                        }`}
                    >
                        <Smartphone size={18} />
                        <span className="text-sm font-medium">Mobile</span>
                    </button>
                </div>

                {/* Page Navigation */}
                <div className="flex gap-2">
                    {['home', 'about', 'projects', 'contact'].map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                                currentPage === page
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>

            {/* Preview Frame */}
            <div className="bg-muted/20 rounded-xl border border-border p-8 flex justify-center">
                <div
                    className={`bg-background rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
                        viewMode === 'desktop' ? 'w-full max-w-6xl' : 'w-full max-w-md'
                    }`}
                >
                    {/* Browser/Device Header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b border-border">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/70" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <div className="w-3 h-3 rounded-full bg-green-500/70" />
                        </div>
                        <div className="flex-1 ml-4">
                            <div className="h-6 bg-background/50 rounded px-3 flex items-center text-xs text-foreground/40">
                                portify.app/{mockPortfolio.slug}
                            </div>
                        </div>
                    </div>

                    {/* Template Content */}
                    <div className={`overflow-auto ${viewMode === 'desktop' ? 'max-h-[600px]' : 'max-h-[700px]'}`}>
                        <TemplateRenderer
                            portfolio={mockPortfolio}
                            page={currentPage}
                            isMobile={viewMode === 'mobile'}
                            isPreview={true}
                            onNavigate={setCurrentPage}
                        />
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="text-center text-sm text-foreground/60">
                This is a live preview of the {templateName} template with sample data
            </div>
        </div>
    );
};
