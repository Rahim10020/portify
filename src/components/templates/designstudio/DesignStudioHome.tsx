'use client';

import { PortfolioData } from '@/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface DesignStudioHomeProps {
    data: PortfolioData;
    slug: string;
}

export const DesignStudioHome = ({ data, slug }: DesignStudioHomeProps) => {
    const { personal, projects, skills } = data;
    const themeColors = data.theme.lightMode;
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

    return (
        <div className="relative">
            {/* Hero Section with Parallax */}
            <section className="container mx-auto px-4 lg:px-8 min-h-screen flex items-center relative overflow-hidden">
                {/* Floating Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-20 right-10 opacity-20"
                >
                    <Sparkles size={100} style={{ color: themeColors.accent }} />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -5, 0],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-20 left-10 opacity-20"
                >
                    <Star size={80} style={{ color: themeColors.accent }} />
                </motion.div>

                <div className="relative z-10 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                            style={{ backgroundColor: `${themeColors.accent}20`, color: themeColors.accent }}
                        >
                            <Sparkles size={16} />
                            <span className="font-medium">Available for Work</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-6xl md:text-8xl font-bold leading-tight mb-6"
                        >
                            I'm{' '}
                            <span
                                className="inline-block relative"
                                style={{ color: themeColors.accent }}
                            >
                                {personal.name.split(' ')[0]}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="absolute -bottom-2 left-0 right-0 h-3 -z-10"
                                    style={{ backgroundColor: `${themeColors.accent}40` }}
                                />
                            </span>
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-3xl md:text-5xl font-semibold mb-8 opacity-80"
                        >
                            {personal.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-xl md:text-2xl opacity-70 mb-12 max-w-2xl leading-relaxed"
                        >
                            {personal.bio}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.a
                                href="#work"
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 rounded-full font-semibold flex items-center gap-3 shadow-lg"
                                style={{
                                    backgroundColor: themeColors.accent,
                                    color: themeColors.bg,
                                }}
                            >
                                View My Work
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowRight size={20} />
                                </motion.div>
                            </motion.a>

                            <motion.a
                                href={`/u/${slug}/contact`}
                                whileHover={{ scale: 1.05, rotate: -1 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full font-semibold border-2"
                                style={{
                                    borderColor: themeColors.accent,
                                    color: themeColors.accent,
                                }}
                            >
                                Get In Touch
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Profile Image */}
                {personal.photo && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                        style={{ y }}
                        className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            className="w-96 h-96 rounded-[3rem] overflow-hidden border-8 shadow-2xl"
                            style={{ borderColor: themeColors.accent }}
                        >
                            <OptimizedImage
                                src={personal.photo}
                                alt={personal.name}
                                width={384}
                                height={384}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </section>

            {/* Featured Work - Masonry Grid */}
            <section id="work" className="container mx-auto px-4 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-4">Featured Work</h2>
                    <p className="text-xl opacity-70">
                        A selection of my best projects
                    </p>
                </motion.div>

                {/* Masonry Layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="break-inside-avoid group cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                {project.images.length > 0 && (
                                    <div className="relative overflow-hidden">
                                        <OptimizedImage
                                            src={project.images[0]}
                                            alt={project.title}
                                            width={600}
                                            height={400}
                                            className="w-full h-auto"
                                            objectFit="cover"
                                        />
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                                            style={{ backgroundColor: `${themeColors.accent}CC` }}
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                className="text-white font-bold text-2xl"
                                            >
                                                View Project
                                            </motion.div>
                                        </div>
                                    </div>
                                )}

                                <div className="p-6" style={{ backgroundColor: `${themeColors.accent}10` }}>
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="opacity-70 mb-4">{project.shortDescription}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techs.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-sm rounded-full"
                                                style={{
                                                    backgroundColor: `${themeColors.accent}20`,
                                                    color: themeColors.accent,
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Link */}
                {projects.length > featuredProjects.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <a
                            href={`/u/${slug}/projects`}
                            className="inline-flex items-center gap-3 text-xl font-semibold group"
                            style={{ color: themeColors.accent }}
                        >
                            View All Projects
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight size={24} />
                            </motion.div>
                        </a>
                    </motion.div>
                )}
            </section>

            {/* Skills Showcase */}
            <section className="container mx-auto px-4 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-4">What I Do</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.slice(0, 8).map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            className="p-8 rounded-3xl text-center shadow-lg hover:shadow-2xl transition-all duration-500"
                            style={{ backgroundColor: `${themeColors.accent}10` }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-bold"
                                style={{ backgroundColor: themeColors.accent, color: themeColors.bg }}
                            >
                                {skill.name.charAt(0)}
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                            {skill.level && (
                                <p className="opacity-70">{skill.level}% Mastery</p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Project Modal */}
            {selectedProject && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProject(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
                    style={{ backgroundColor: `${themeColors.bg}CC` }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-4xl w-full max-h-[90vh] overflow-auto rounded-3xl shadow-2xl"
                        style={{ backgroundColor: themeColors.bg }}
                    >
                        {selectedProject.images.length > 0 && (
                            <OptimizedImage
                                src={selectedProject.images[0]}
                                alt={selectedProject.title}
                                width={1024}
                                height={384}
                                className="w-full h-96 object-cover"
                            />
                        )}
                        <div className="p-8">
                            <h2 className="text-4xl font-bold mb-4">{selectedProject.title}</h2>
                            <p className="text-lg opacity-80 mb-6">{selectedProject.fullDescription || selectedProject.shortDescription}</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.techs.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 rounded-full"
                                        style={{ backgroundColor: `${themeColors.accent}20`, color: themeColors.accent }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};