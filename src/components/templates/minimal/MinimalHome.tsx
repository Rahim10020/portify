'use client';

import { PortfolioData } from '@/types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface MinimalHomeProps {
    data: PortfolioData;
    slug: string;
}

export const MinimalHome = ({ data, slug }: MinimalHomeProps) => {
    const { personal, projects, skills } = data;
    const themeColors = data.theme.lightMode;
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

    return (
        <div>
            {/* Hero Section */}
            <section className="container mx-auto px-4 lg:px-8 py-32 lg:py-40">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                >
                    <p className="text-sm uppercase tracking-widest mb-8 opacity-40">
                        {personal.location}
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-light leading-tight mb-8 tracking-tight">
                        {personal.name}
                    </h1>

                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-12 opacity-60">
                        {personal.title}
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl opacity-80 mb-12">
                        {personal.bio}
                    </p>

                    <div className="flex gap-4">
                        <a
                            href={`/u/${slug}/projects`}
                            className="inline-flex items-center gap-2 px-8 py-3 border transition-colors hover:bg-current hover:text-white group"
                            style={{ borderColor: themeColors.text }}
                        >
                            <span className="uppercase text-sm tracking-wider">View Work</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href={`/u/${slug}/contact`}
                            className="inline-flex items-center gap-2 px-8 py-3 uppercase text-sm tracking-wider opacity-60 hover:opacity-100 transition-opacity"
                        >
                            Contact
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Featured Projects Grid */}
            {featuredProjects.length > 0 && (
                <section className="border-t transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                    <div className="container mx-auto px-4 lg:px-8 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <p className="text-sm uppercase tracking-widest opacity-40 mb-4">Selected Work</p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light tracking-tight">Featured Projects</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-16">
                            {featuredProjects.map((project, index) => (
                                <motion.a
                                    key={project.id}
                                    href={`/u/${slug}/projects#${project.id}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group block"
                                >
                                    {/* Project Image */}
                                    {project.images.length > 0 && (
                                        <div className="aspect-[4/3] mb-6 overflow-hidden border transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                                            <motion.div
                                                className="w-full h-full"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <OptimizedImage
                                                    src={project.images[0]}
                                                    alt={project.title}
                                                    width={600}
                                                    height={450}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Project Info */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl sm:text-2xl font-light tracking-tight group-hover:opacity-60 transition-opacity">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm opacity-60 leading-relaxed">
                                            {project.shortDescription}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techs.slice(0, 3).map((tech) => (
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
                                </motion.a>
                            ))}
                        </div>

                        {/* View All Link */}
                        {projects.length > featuredProjects.length && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mt-16 text-center"
                            >
                                <a
                                    href={`/u/${slug}/projects`}
                                    className="inline-flex items-center gap-2 text-sm uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity group"
                                >
                                    View All Projects
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {/* Skills Section */}
            <section className="border-t transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                <div className="container mx-auto px-4 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <p className="text-sm uppercase tracking-widest opacity-40 mb-4">Capabilities</p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light tracking-tight">Skills</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {skills.slice(0, 12).map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="border-l-2 pl-4 transition-colors"
                                style={{ borderColor: themeColors.text + '40' }}
                            >
                                <h4 className="text-lg font-light mb-2">{skill.name}</h4>
                                <p className="text-xs uppercase tracking-wider opacity-40">{skill.category}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};