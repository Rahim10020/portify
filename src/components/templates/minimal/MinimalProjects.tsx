'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

interface MinimalProjectsProps {
    data: PortfolioData;
    slug: string;
}

export const MinimalProjects = ({ data, slug }: MinimalProjectsProps) => {
    const { projects } = data;
    const themeColors = data.theme.lightMode;

    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    // Get all unique technologies
    const allTechs = Array.from(new Set(projects.flatMap((p) => p.techs))).sort();

    // Filter projects
    const filteredProjects = selectedTech
        ? projects.filter((p) => p.techs.includes(selectedTech))
        : projects;

    return (
        <div>
            {/* Header */}
            <section className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="text-sm uppercase tracking-widest opacity-40 mb-4">Portfolio</p>
                    <h1 className="text-5xl lg:text-7xl font-light tracking-tight mb-8">All Projects</h1>
                    <p className="text-lg opacity-60">{projects.length} Projects</p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 flex flex-wrap gap-3"
                >
                    <button
                        onClick={() => setSelectedTech(null)}
                        className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${!selectedTech ? 'bg-current text-white' : 'hover:bg-current hover:text-white'
                            }`}
                        style={{ borderColor: themeColors.text + '40' }}
                    >
                        All
                    </button>
                    {allTechs.map((tech) => (
                        <button
                            key={tech}
                            onClick={() => setSelectedTech(tech)}
                            className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${selectedTech === tech ? 'bg-current text-white' : 'hover:bg-current hover:text-white'
                                }`}
                            style={{ borderColor: themeColors.text + '40' }}
                        >
                            {tech}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* Projects Grid */}
            <section className="border-t transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                <div className="container mx-auto px-4 lg:px-8 py-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTech || 'all'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid md:grid-cols-2 gap-16"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    id={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    {/* Project Image */}
                                    {project.images.length > 0 && (
                                        <div className="aspect-[4/3] mb-6 overflow-hidden border transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                                            <motion.img
                                                src={project.images[0]}
                                                alt={project.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                whileHover={{ scale: 1.05 }}
                                            />
                                        </div>
                                    )}

                                    {/* Project Info */}
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="text-2xl font-light tracking-tight group-hover:opacity-60 transition-opacity">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 border hover:bg-current hover:text-white transition-colors"
                                                        style={{ borderColor: themeColors.text + '40' }}
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 border hover:bg-current hover:text-white transition-colors"
                                                        style={{ borderColor: themeColors.text + '40' }}
                                                    >
                                                        <Github size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-sm leading-relaxed opacity-60">
                                            {project.shortDescription}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.techs.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs uppercase tracking-wider px-3 py-1 border opacity-40"
                                                    style={{ borderColor: themeColors.text + '20' }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 opacity-40">
                            <p className="text-lg">No projects found with this filter</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                        style={{ backgroundColor: themeColors.bg + 'F0' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-5xl w-full max-h-[90vh] overflow-auto border"
                            style={{
                                backgroundColor: themeColors.bg,
                                borderColor: themeColors.text + '20'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-8 right-8 p-2 border hover:bg-current hover:text-white transition-colors z-10"
                                style={{
                                    backgroundColor: themeColors.bg,
                                    borderColor: themeColors.text + '40'
                                }}
                            >
                                <X size={20} />
                            </button>

                            {/* Images */}
                            <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: themeColors.text + '20' }}>
                                {selectedProject.images.map((image, index) => (
                                    <div key={index} className="aspect-video" style={{ backgroundColor: themeColors.bg }}>
                                        <img
                                            src={image}
                                            alt={`${selectedProject.title} - ${index + 1}`}
                                            className="w-full h-full object-cover grayscale"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="p-12">
                                <div className="mb-8">
                                    <p className="text-xs uppercase tracking-wider opacity-40 mb-4">Project Details</p>
                                    <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="text-lg leading-relaxed opacity-80">
                                        {selectedProject.fullDescription || selectedProject.shortDescription}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div className="mb-8">
                                    <p className="text-xs uppercase tracking-wider opacity-40 mb-4">Technologies</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.techs.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs uppercase tracking-wider px-3 py-1 border"
                                                style={{ borderColor: themeColors.text + '40' }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    {selectedProject.liveUrl && (
                                        <a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 border hover:bg-current hover:text-white transition-colors"
                                            style={{ borderColor: themeColors.text }}
                                        >
                                            <ExternalLink size={16} />
                                            <span className="text-sm uppercase tracking-wider">Visit Site</span>
                                        </a>
                                    )}
                                    {selectedProject.githubUrl && (
                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 border hover:bg-current hover:text-white transition-colors"
                                            style={{ borderColor: themeColors.text }}
                                        >
                                            <Github size={16} />
                                            <span className="text-sm uppercase tracking-wider">View Code</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};