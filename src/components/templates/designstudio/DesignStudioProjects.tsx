'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

interface DesignStudioProjectsProps {
    data: PortfolioData;
    slug: string;
}

export const DesignStudioProjects = ({ data, slug }: DesignStudioProjectsProps) => {
    const { projects } = data;
    const themeColors = data.theme.lightMode;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    // Get all unique technologies
    const allTechs = Array.from(new Set(projects.flatMap((p) => p.techs))).sort();

    // Filter projects
    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTech = !selectedTech || project.techs.includes(selectedTech);
        return matchesSearch && matchesTech;
    });

    return (
        <div className="relative">
            {/* Header */}
            <section className="container mx-auto px-4 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        All{' '}
                        <span style={{ color: themeColors.accent }}>Projects</span>
                    </h1>
                    <p className="text-xl opacity-70 mb-12">
                        Explore my collection of {projects.length} creative works
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    {/* Search Bar */}
                    <div className="relative max-w-2xl">
                        <Search
                            className="absolute left-6 top-1/2 -translate-y-1/2 opacity-40"
                            size={24}
                        />
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-6 py-4 rounded-full text-lg border-2 focus:outline-none transition-all"
                            style={{
                                borderColor: searchQuery ? themeColors.accent : 'transparent',
                                backgroundColor: `${themeColors.accent}10`,
                            }}
                        />
                    </div>

                    {/* Tech Filters */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 opacity-70">
                            <Filter size={20} />
                            <span className="font-medium">Filter by:</span>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTech(null)}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${!selectedTech ? 'shadow-lg' : ''
                                }`}
                            style={{
                                backgroundColor: !selectedTech ? themeColors.accent : `${themeColors.accent}10`,
                                color: !selectedTech ? themeColors.bg : themeColors.text,
                            }}
                        >
                            All
                        </motion.button>

                        {allTechs.map((tech) => (
                            <motion.button
                                key={tech}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedTech(tech)}
                                className={`px-6 py-3 rounded-full font-medium transition-all ${selectedTech === tech ? 'shadow-lg' : ''
                                    }`}
                                style={{
                                    backgroundColor: selectedTech === tech ? themeColors.accent : `${themeColors.accent}10`,
                                    color: selectedTech === tech ? themeColors.bg : themeColors.text,
                                }}
                            >
                                {tech}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Projects Masonry Grid */}
            <section className="container mx-auto px-4 lg:px-8 pb-20">
                <AnimatePresence mode="wait">
                    {filteredProjects.length > 0 ? (
                        <motion.div
                            key="projects-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.05 }}
                                    layoutId={project.id}
                                    className="break-inside-avoid group cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <motion.div
                                        whileHover={{ y: -10, rotate: 1 }}
                                        className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                                    >
                                        {/* Image */}
                                        {project.images.length > 0 && (
                                            <div className="relative overflow-hidden aspect-[4/3]">
                                                <motion.img
                                                    src={project.images[0]}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.6 }}
                                                />

                                                {/* Overlay on hover */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                    style={{ backgroundColor: `${themeColors.accent}DD` }}
                                                >
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        whileHover={{ scale: 1 }}
                                                        transition={{ type: 'spring', stiffness: 300 }}
                                                        className="text-white font-bold text-2xl"
                                                    >
                                                        View Project
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6" style={{ backgroundColor: `${themeColors.accent}10` }}>
                                            <motion.h3
                                                className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors"
                                            >
                                                {project.title}
                                            </motion.h3>

                                            <p className="opacity-70 mb-4 line-clamp-2">
                                                {project.shortDescription}
                                            </p>

                                            {/* Tech Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.techs.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 text-sm rounded-full"
                                                        style={{
                                                            backgroundColor: `${themeColors.accent}30`,
                                                            color: themeColors.accent,
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techs.length > 3 && (
                                                    <span className="px-3 py-1 text-sm opacity-60">
                                                        +{project.techs.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-6xl mb-6"
                            >
                                🔍
                            </motion.div>
                            <p className="text-2xl font-bold mb-2">No projects found</p>
                            <p className="text-lg opacity-70">Try adjusting your filters</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
                        style={{ backgroundColor: `${themeColors.bg}DD` }}
                    >
                        <motion.div
                            layoutId={selectedProject.id}
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-5xl w-full max-h-[90vh] overflow-auto rounded-3xl shadow-2xl"
                            style={{ backgroundColor: themeColors.bg }}
                        >
                            {/* Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                                style={{ backgroundColor: themeColors.accent, color: themeColors.bg }}
                            >
                                <X size={24} />
                            </motion.button>

                            {/* Images Gallery */}
                            <div className="grid md:grid-cols-2 gap-4 p-4">
                                {selectedProject.images.map((image, index) => (
                                    <motion.img
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        src={image}
                                        alt={`${selectedProject.title} - ${index + 1}`}
                                        className="w-full h-auto rounded-2xl"
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl md:text-5xl font-bold mb-4"
                                >
                                    {selectedProject.title}
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-lg opacity-80 mb-8 leading-relaxed"
                                >
                                    {selectedProject.fullDescription || selectedProject.shortDescription}
                                </motion.p>

                                {/* Tech Stack */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-wrap gap-3 mb-8"
                                >
                                    {selectedProject.techs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 rounded-full font-medium"
                                            style={{
                                                backgroundColor: `${themeColors.accent}20`,
                                                color: themeColors.accent,
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </motion.div>

                                {/* Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    {selectedProject.liveUrl && (
                                        <motion.a
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 rounded-full font-semibold shadow-lg"
                                            style={{
                                                backgroundColor: themeColors.accent,
                                                color: themeColors.bg,
                                            }}
                                        >
                                            View Live Site
                                        </motion.a>
                                    )}
                                    {selectedProject.githubUrl && (
                                        <motion.a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 rounded-full font-semibold border-2"
                                            style={{
                                                borderColor: themeColors.accent,
                                                color: themeColors.accent,
                                            }}
                                        >
                                            View Code
                                        </motion.a>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};