'use client';

import { PortfolioData } from '@/types';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface MinimalAboutProps {
    data: PortfolioData;
}

export const MinimalAbout = ({ data }: MinimalAboutProps) => {
    const { personal, experience, skills } = data;
    const themeColors = data.theme.lightMode;

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <div>
            {/* Header */}
            <section className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <p className="text-sm uppercase tracking-widest opacity-40 mb-4">About</p>
                    <h1 className="text-5xl lg:text-7xl font-light tracking-tight">
                        {personal.name}
                    </h1>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Photo */}
                    {personal.photo && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5"
                        >
                            <div className="aspect-[3/4] overflow-hidden border transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                                <img
                                    src={personal.photo}
                                    alt={personal.name}
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={personal.photo ? 'lg:col-span-7' : 'lg:col-span-12'}
                    >
                        <div className="prose prose-lg max-w-none">
                            <div className="text-lg leading-relaxed space-y-6 opacity-80">
                                {(personal.longBio || personal.bio).split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {personal.cv && (
                            <motion.a
                                whileHover={{ x: 5 }}
                                href={personal.cv}
                                download
                                className="inline-flex items-center gap-2 mt-8 px-6 py-3 border transition-colors hover:bg-current hover:text-white"
                                style={{ borderColor: themeColors.text }}
                            >
                                <Download size={18} />
                                <span className="uppercase text-sm tracking-wider">Download CV</span>
                            </motion.a>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Experience */}
            {experience.length > 0 && (
                <section className="border-t transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                    <div className="container mx-auto px-4 lg:px-8 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <p className="text-sm uppercase tracking-widest opacity-40 mb-4">Career</p>
                            <h2 className="text-4xl lg:text-6xl font-light tracking-tight">Experience</h2>
                        </motion.div>

                        <div className="space-y-12">
                            {experience.map((exp, index) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="grid lg:grid-cols-12 gap-8 border-l-2 pl-8 transition-colors"
                                    style={{ borderColor: themeColors.text + '20' }}
                                >
                                    {/* Period */}
                                    <div className="lg:col-span-3">
                                        <p className="text-sm uppercase tracking-wider opacity-60">{exp.period}</p>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:col-span-9">
                                        <h3 className="text-2xl font-light mb-2">{exp.position}</h3>
                                        <p className="text-lg opacity-60 mb-4">{exp.company}</p>
                                        <p className="opacity-80 leading-relaxed">{exp.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills */}
            <section className="border-t transition-colors" style={{ borderColor: themeColors.text + '20' }}>
                <div className="container mx-auto px-4 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <p className="text-sm uppercase tracking-widest opacity-40 mb-4">Expertise</p>
                        <h2 className="text-4xl lg:text-6xl font-light tracking-tight">Skills</h2>
                    </motion.div>

                    <div className="space-y-16">
                        {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: catIndex * 0.1 }}
                            >
                                <h3 className="text-2xl font-light mb-8 opacity-60 uppercase tracking-wider">
                                    {category}
                                </h3>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categorySkills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: skillIndex * 0.05 }}
                                            className="space-y-3"
                                        >
                                            <div className="flex items-baseline justify-between">
                                                <span className="text-lg font-light">{skill.name}</span>
                                                {skill.level && (
                                                    <span className="text-xs uppercase tracking-wider opacity-40">
                                                        {skill.level}%
                                                    </span>
                                                )}
                                            </div>
                                            {skill.level && (
                                                <div className="w-full h-px bg-current opacity-20">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: skillIndex * 0.05 + 0.2, duration: 1 }}
                                                        className="h-full bg-current opacity-60"
                                                    />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};