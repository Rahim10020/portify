'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, ExternalLink, ArrowRight } from 'lucide-react';

interface DevFolioProjectsProps {
    data: PortfolioData;
    slug: string;
}

export const DevFolioProjects = ({ data, slug }: DevFolioProjectsProps) => {
    const { projects, personal } = data;
    const themeColors = data.theme.darkMode;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    // Get all unique technologies
    const allTechs = Array.from(
        new Set(projects.flatMap((p) => p.techs))
    ).sort();

    // Filter projects
    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            project.shortDescription
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        const matchesTech = !selectedTech || project.techs.includes(selectedTech);

        return matchesSearch && matchesTech;
    });

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-16"
            >
                <div className="font-mono text-sm mb-6 opacity-60">
                    <span style={{ color: themeColors.accent }}>$</span> ls projects/ -la
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">All Projects</h1>
                <p className="text-base sm:text-lg opacity-70">
                    A collection of {projects.length} projects I've worked on
                </p>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-6xl mb-12"
            >
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-current/20 bg-transparent focus:outline-none focus:border-current/40 transition-colors"
                        style={{ color: themeColors.text }}
                    />
                </div>

                {/* Tech Filter */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedTech(null)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${!selectedTech
                            ? 'border-2'
                            : 'border border-current/20 opacity-60 hover:opacity-100'
                            }`}
                        style={{
                            borderColor: !selectedTech ? themeColors.accent : undefined,
                            color: !selectedTech ? themeColors.accent : themeColors.text,
                        }}
                    >
                        All
                    </button>
                    {allTechs.map((tech) => (
                        <button
                            key={tech}
                            onClick={() => setSelectedTech(tech)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedTech === tech
                                ? 'border-2'
                                : 'border border-current/20 opacity-60 hover:opacity-100'
                                }`}
                            style={{
                                borderColor: selectedTech === tech ? themeColors.accent : undefined,
                                color: selectedTech === tech ? themeColors.accent : themeColors.text,
                            }}
                        >
                            {tech}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Projects Grid */}
            <div className="max-w-6xl">
                <AnimatePresence mode="wait">
                    {filteredProjects.length > 0 ? (
                        <motion.div
                            key="projects-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid md:grid-cols-2 gap-8"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group border border-current/10 rounded-lg overflow-hidden hover:border-current/30 transition-all hover:scale-[1.02]"
                                >
                                    {/* Project Image */}
                                    {project.images.length > 0 && (
                                        <div className="aspect-video bg-current/5 overflow-hidden">
                                            <img
                                                src={project.images[0]}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-bold group-hover:text-accent transition-colors flex-1">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-2">
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="opacity-60 hover:opacity-100 transition-opacity"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Github size={18} />
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="opacity-60 hover:opacity-100 transition-opacity"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="opacity-70 mb-4 line-clamp-3">
                                            {project.shortDescription}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.techs.slice(0, 4).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 text-xs font-mono rounded border border-current/20"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techs.length > 4 && (
                                                <span className="px-2 py-1 text-xs opacity-60">
                                                    +{project.techs.length - 4} more
                                                </span>
                                            )}
                                        </div>

                                        {/* View Details */}
                                        {project.fullDescription && (
                                            <a
                                                href={`/u/${slug}/projects/${project.id}`}
                                                className="inline-flex items-center gap-2 font-medium text-sm group/link"
                                                style={{ color: themeColors.accent }}
                                            >
                                                View Details
                                                <ArrowRight
                                                    size={14}
                                                    className="group-hover/link:translate-x-1 transition-transform"
                                                />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <p className="text-xl opacity-60">
                                No projects found matching your filters
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};