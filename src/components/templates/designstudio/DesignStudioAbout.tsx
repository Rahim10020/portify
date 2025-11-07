'use client';

import { PortfolioData } from '@/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Heart, Coffee, Zap } from 'lucide-react';
import { useRef } from 'react';

interface DesignStudioAboutProps {
    data: PortfolioData;
}

export const DesignStudioAbout = ({ data }: DesignStudioAboutProps) => {
    const { personal, experience, skills, projects } = data;
    const themeColors = data.theme.lightMode;
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <div ref={containerRef} className="relative">
            {/* Hero Section */}
            <section className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold mb-6"
                        >
                            About{' '}
                            <span style={{ color: themeColors.accent }}>Me</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-6 text-lg opacity-80 leading-relaxed"
                        >
                            {(personal.longBio || personal.bio).split('\n\n').map((paragraph, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </motion.div>

                        {personal.cv && (
                            <motion.a
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                href={personal.cv}
                                download
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full font-semibold shadow-lg"
                                style={{
                                    backgroundColor: themeColors.accent,
                                    color: themeColors.bg,
                                }}
                            >
                                <Download size={20} />
                                Download CV
                            </motion.a>
                        )}
                    </motion.div>

                    {/* Right: Image */}
                    {personal.photo && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, type: 'spring' }}
                            style={{ y, opacity }}
                            className="relative"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="relative rounded-[3rem] overflow-hidden shadow-2xl"
                            >
                                <img
                                    src={personal.photo}
                                    alt={personal.name}
                                    className="w-full h-auto"
                                />

                                {/* Decorative elements */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 180, 360],
                                    }}
                                    transition={{ duration: 10, repeat: Infinity }}
                                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
                                    style={{ backgroundColor: themeColors.accent }}
                                />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        rotate: [0, -180, -360],
                                    }}
                                    transition={{ duration: 15, repeat: Infinity }}
                                    className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-20"
                                    style={{ backgroundColor: themeColors.accent }}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {/* Fun Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
                >
                    {[
                        { icon: Heart, label: 'Projects Completed', value: projects.length },
                        { icon: Coffee, label: 'Cups of Coffee', value: '∞' },
                        { icon: Zap, label: 'Years Experience', value: experience.length },
                        { icon: Heart, label: 'Happy Clients', value: '50+' },
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: 'spring' }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="text-center p-8 rounded-3xl shadow-lg"
                                style={{ backgroundColor: `${themeColors.accent}10` }}
                            >
                                <Icon
                                    size={40}
                                    className="mx-auto mb-4"
                                    style={{ color: themeColors.accent }}
                                />
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-sm opacity-70">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>

            {/* Experience Section */}
            {experience.length > 0 && (
                <section className="container mx-auto px-4 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold mb-4">Experience</h2>
                        <p className="text-xl opacity-70">My professional journey</p>
                    </motion.div>

                    <div className="space-y-8">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ scale: 1.02, x: 10 }}
                                className="relative p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
                                style={{ backgroundColor: `${themeColors.accent}10` }}
                            >
                                {/* Timeline Dot */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                                    className="absolute -left-4 top-8 w-8 h-8 rounded-full border-4"
                                    style={{
                                        backgroundColor: themeColors.accent,
                                        borderColor: themeColors.bg,
                                    }}
                                />

                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
                                        <p className="text-lg opacity-70">{exp.company}</p>
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="inline-block px-4 py-2 rounded-full font-medium mt-4 lg:mt-0"
                                        style={{
                                            backgroundColor: themeColors.accent,
                                            color: themeColors.bg,
                                        }}
                                    >
                                        {exp.period}
                                    </motion.div>
                                </div>

                                <p className="opacity-80 leading-relaxed">{exp.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills Section */}
            <section className="container mx-auto px-4 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-4">Skills & Tools</h2>
                    <p className="text-xl opacity-70">What I bring to the table</p>
                </motion.div>

                <div className="space-y-12">
                    {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                        >
                            <h3 className="text-3xl font-bold mb-8" style={{ color: themeColors.accent }}>
                                {category}
                            </h3>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categorySkills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: skillIndex * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="p-6 rounded-2xl shadow-lg"
                                        style={{ backgroundColor: `${themeColors.accent}10` }}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xl font-bold">{skill.name}</span>
                                            {skill.level && (
                                                <span
                                                    className="px-3 py-1 rounded-full text-sm font-medium"
                                                    style={{
                                                        backgroundColor: themeColors.accent,
                                                        color: themeColors.bg,
                                                    }}
                                                >
                                                    {skill.level}%
                                                </span>
                                            )}
                                        </div>

                                        {skill.level && (
                                            <div className="w-full h-2 rounded-full overflow-hidden"
                                                style={{ backgroundColor: `${themeColors.accent}30` }}
                                            >
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: skillIndex * 0.05 + 0.3, duration: 1 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: themeColors.accent }}
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};