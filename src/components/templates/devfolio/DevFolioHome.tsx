'use client';

import { PortfolioData } from '@/types';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, ExternalLink, Github } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface DevFolioHomeProps {
    data: PortfolioData;
    slug: string;
}

export const DevFolioHome = ({ data, slug }: DevFolioHomeProps) => {
    const { personal, projects, skills } = data;
    const themeColors = data.theme.darkMode;
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mb-32"
            >
                {/* Terminal-style greeting */}
                <div className="font-mono text-sm mb-6 opacity-60">
                    <span style={{ color: themeColors.accent }}>$</span> cat introduction.txt
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    Hi, I'm{' '}
                    <span
                        className="inline-block"
                        style={{ color: themeColors.accent }}
                    >
                        {personal.name.split(' ')[0]}
                    </span>
                </h1>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 opacity-80">
                    {personal.title}
                </h2>

                <p className="text-base sm:text-lg md:text-xl opacity-70 mb-8 leading-relaxed max-w-2xl">
                    {personal.bio}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                    <a
                        href="#projects"
                        className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                        style={{
                            backgroundColor: themeColors.accent,
                            color: themeColors.bg,
                        }}
                    >
                        View My Work
                        <ArrowRight className="inline ml-2" size={18} />
                    </a>
                    <a
                        href="#contact"
                        className="px-6 py-3 rounded-lg font-medium border transition-all hover:bg-current/5"
                        style={{ borderColor: themeColors.accent, color: themeColors.accent }}
                    >
                        Get In Touch
                    </a>
                </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-32"
            >
                <div className="font-mono text-sm mb-8 opacity-60">
                    <span style={{ color: themeColors.accent }}>$</span> ls skills/
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.slice(0, 8).map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="p-4 rounded-lg border border-current/10 hover:border-current/30 transition-all hover:scale-105"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Code2 size={16} style={{ color: themeColors.accent }} />
                                <span className="font-medium">{skill.name}</span>
                            </div>
                            {skill.level && (
                                <div className="w-full h-1 bg-current/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ delay: 0.5 + index * 0.05, duration: 0.8 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: themeColors.accent }}
                                    />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <motion.section
                    id="projects"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="font-mono text-sm mb-8 opacity-60">
                        <span style={{ color: themeColors.accent }}>$</span> cat featured_projects.json
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12">Featured Work</h2>

                    <div className="space-y-12">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="border border-current/10 rounded-lg overflow-hidden hover:border-current/30 transition-all">
                                    <div className="p-8">
                                        {/* Project Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl sm:text-2xl font-bold group-hover:text-accent transition-colors">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-3">
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="opacity-60 hover:opacity-100 transition-opacity"
                                                    >
                                                        <Github size={20} />
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="opacity-60 hover:opacity-100 transition-opacity"
                                                    >
                                                        <ExternalLink size={20} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="opacity-70 mb-6 leading-relaxed">
                                            {project.shortDescription}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.techs.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 text-sm font-mono rounded border border-current/20"
                                                    style={{ color: themeColors.accent }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* View Details Link */}
                                        {project.fullDescription && (
                                            <a
                                                href={`/u/${slug}/projects/${project.id}`}
                                                className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all"
                                                style={{ color: themeColors.accent }}
                                            >
                                                View Details
                                                <ArrowRight size={16} />
                                            </a>
                                        )}
                                    </div>

                                    {/* Project Image */}
                                    {project.images.length > 0 && (
                                        <div className="aspect-video bg-current/5 overflow-hidden">
                                            <OptimizedImage
                                                src={project.images[0]}
                                                alt={project.title}
                                                width={800}
                                                height={450}
                                                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                                                objectFit="cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View All Projects Link */}
                    {projects.length > featuredProjects.length && (
                        <div className="text-center mt-12">
                            <a
                                href={`/u/${slug}/projects`}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border font-medium hover:bg-current/5 transition-all"
                                style={{ borderColor: themeColors.accent, color: themeColors.accent }}
                            >
                                View All Projects
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    )}
                </motion.section>
            )}
        </div>
    );
};