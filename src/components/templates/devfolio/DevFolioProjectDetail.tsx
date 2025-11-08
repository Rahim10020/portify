'use client';

import { PortfolioData } from '@/types';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface DevFolioProjectDetailProps {
    data: PortfolioData;
    projectSlug: string;
    slug: string;
}

export const DevFolioProjectDetail = ({ data, projectSlug, slug }: DevFolioProjectDetailProps) => {
    const { projects, personal } = data;
    const themeColors = data.theme.darkMode;

    const project = projects.find((p) => p.id === projectSlug);

    if (!project) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <p className="opacity-70 mb-6">The project you're looking for doesn't exist.</p>
                    <a
                        href={`/u/${slug}/projects`}
                        className="inline-flex items-center gap-2 font-medium"
                        style={{ color: themeColors.accent }}
                    >
                        <ArrowLeft size={18} />
                        Back to Projects
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-5xl mb-8"
            >
                <a
                    href={`/u/${slug}/projects`}
                    className="inline-flex items-center gap-2 font-medium opacity-60 hover:opacity-100 transition-opacity"
                >
                    <ArrowLeft size={18} />
                    Back to Projects
                </a>
            </motion.div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mb-12"
            >
                <div className="font-mono text-sm mb-6 opacity-60">
                    <span style={{ color: themeColors.accent }}>$</span> cat projects/{project.id}.md
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>

                <p className="text-xl opacity-80 mb-8">{project.shortDescription}</p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center gap-2 opacity-60">
                        <Calendar size={18} />
                        <span>2024</span>
                    </div>
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                            style={{ color: themeColors.accent }}
                        >
                            <Github size={18} />
                            View Source
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                            style={{ color: themeColors.accent }}
                        >
                            <ExternalLink size={18} />
                            Live Demo
                        </a>
                    )}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 font-mono rounded border border-current/20"
                            style={{ color: themeColors.accent }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Project Images */}
            {project.images.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-5xl mb-16"
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        {project.images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="aspect-video rounded-lg overflow-hidden border border-current/10"
                            >
                                <img
                                    src={image}
                                    alt={`${project.title} - Image ${index + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Content Sections */}
            <div className="max-w-5xl grid md:grid-cols-3 gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-2 space-y-12"
                >
                    {/* Full Description */}
                    {project.fullDescription && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Overview</h2>
                            <div className="prose prose-lg max-w-none opacity-80 leading-relaxed">
                                <ReactMarkdown>{project.fullDescription}</ReactMarkdown>
                            </div>
                        </section>
                    )}

                    {/* Challenges */}
                    {project.challenges && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Challenges</h2>
                            <div className="prose prose-lg max-w-none opacity-80 leading-relaxed">
                                <ReactMarkdown>{project.challenges}</ReactMarkdown>
                            </div>
                        </section>
                    )}

                    {/* Solution */}
                    {project.solution && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Solution</h2>
                            <div className="prose prose-lg max-w-none opacity-80 leading-relaxed">
                                <ReactMarkdown>{project.solution}</ReactMarkdown>
                            </div>
                        </section>
                    )}
                </motion.div>

                {/* Sidebar */}
                <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8"
                >
                    {/* Quick Links */}
                    <div className="border border-current/10 rounded-lg p-6">
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <div className="space-y-3">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
                                >
                                    <Github size={18} />
                                    <span>Source Code</span>
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
                                >
                                    <ExternalLink size={18} />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="border border-current/10 rounded-lg p-6">
                        <h3 className="font-bold mb-4">Technologies Used</h3>
                        <div className="space-y-2">
                            {project.techs.map((tech) => (
                                <div
                                    key={tech}
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: themeColors.accent }}
                                    />
                                    <span className="text-sm">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.aside>
            </div>

            {/* Navigation to other projects */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mt-20 pt-12 border-t border-current/10"
            >
                <h3 className="text-2xl font-bold mb-8">More Projects</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {projects
                        .filter((p) => p.id !== project.id)
                        .slice(0, 2)
                        .map((otherProject) => (
                            <a
                                key={otherProject.id}
                                href={`/u/${slug}/projects/${otherProject.id}`}
                                className="border border-current/10 rounded-lg p-6 hover:border-current/30 transition-all group"
                            >
                                <h4 className="font-bold mb-2 group-hover:text-accent transition-colors">
                                    {otherProject.title}
                                </h4>
                                <p className="text-sm opacity-70 line-clamp-2">
                                    {otherProject.shortDescription}
                                </p>
                            </a>
                        ))}
                </div>
            </motion.div>
        </div>
    );
};