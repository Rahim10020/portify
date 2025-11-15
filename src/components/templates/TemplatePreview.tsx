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
    personalInfo: {
        name: 'Alex Johnson',
        tagline: 'Full-Stack Developer & Designer',
        bio: 'Passionate about creating beautiful and functional web experiences. Specializing in modern web technologies and user-centered design.',
        email: 'alex@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        avatar: '',
    },
    socialLinks: {
        github: 'https://github.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        twitter: 'https://twitter.com/alexjohnson',
    },
    projects: [
        {
            id: '1',
            title: 'E-Commerce Platform',
            description: 'A modern e-commerce platform with real-time inventory management and payment processing.',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
            images: [],
            liveUrl: 'https://example.com',
            githubUrl: 'https://github.com/example',
            featured: true,
            order: 0,
        },
        {
            id: '2',
            title: 'Task Management App',
            description: 'Collaborative task management tool with real-time updates and team collaboration features.',
            technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
            images: [],
            liveUrl: 'https://example.com',
            featured: true,
            order: 1,
        },
        {
            id: '3',
            title: 'Portfolio Builder',
            description: 'No-code portfolio builder with customizable templates and drag-and-drop interface.',
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
            images: [],
            githubUrl: 'https://github.com/example',
            featured: false,
            order: 2,
        },
    ],
    about: {
        description: 'I\'m a full-stack developer with 5+ years of experience building web applications. I love turning complex problems into simple, beautiful solutions.',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'UI/UX Design'],
        experience: [
            {
                id: '1',
                company: 'Tech Startup Inc.',
                position: 'Senior Developer',
                startDate: '2021-01',
                endDate: null,
                description: 'Leading frontend development for multiple client projects.',
                current: true,
            },
        ],
        education: [
            {
                id: '1',
                school: 'University of Technology',
                degree: 'B.S. Computer Science',
                startDate: '2015-09',
                endDate: '2019-05',
                description: 'Focus on software engineering and web development.',
            },
        ],
    },
    contact: {
        email: 'alex@example.com',
        message: 'Let\'s work together on your next project!',
    },
    settings: {
        primaryColor: '#3b82f6',
        darkMode: true,
    },
    analytics: {
        viewCount: 0,
    },
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
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
