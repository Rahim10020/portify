'use client';

import { PortfolioData } from '@/types';
import { motion } from 'framer-motion';
import { Download, Briefcase, Code2 } from 'lucide-react';

interface DevFolioAboutProps {
    data: PortfolioData;
}

export const DevFolioAbout = ({ data }: DevFolioAboutProps) => {
    const { personal, experience, skills } = data;
    const themeColors = data.theme.darkMode;

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-20"
            >
                <div className="font-mono text-sm mb-6 opacity-60">
                    <span style={{ color: themeColors.accent }}>$</span> whoami
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-8">About Me</h1>

                {/* Photo & Bio */}
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {personal.photo && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="md:col-span-1"
                        >
                            <img
                                src={personal.photo}
                                alt={personal.name}
                                className="w-full aspect-square object-cover rounded-lg border border-current/20"
                            />
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className={personal.photo ? 'md:col-span-2' : 'md:col-span-3'}
                    >
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg opacity-80 leading-relaxed whitespace-pre-line">
                                {personal.longBio || personal.bio}
                            </p>
                        </div>

                        {personal.cv && (
                            <a
                                href={personal.cv}
                                download
                                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                                style={{
                                    backgroundColor: themeColors.accent,
                                    color: themeColors.bg,
                                }}
                            >
                                <Download size={18} />
                                Download CV
                            </a>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Experience Timeline */}
            {experience.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mb-20"
                >
                    <div className="font-mono text-sm mb-8 opacity-60">
                        <span style={{ color: themeColors.accent }}>$</span> git log --experience
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>

                    <div className="space-y-8">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 border-l-2 border-current/20 hover:border-current/40 transition-colors"
                            >
                                {/* Timeline dot */}
                                <div
                                    className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2"
                                    style={{
                                        backgroundColor: themeColors.bg,
                                        borderColor: themeColors.accent,
                                    }}
                                />

                                {/* Content */}
                                <div className="pb-8">
                                    <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                                        <h3 className="text-xl font-bold">{exp.position}</h3>
                                        <span
                                            className="text-sm font-mono px-3 py-1 rounded"
                                            style={{
                                                backgroundColor: `${themeColors.accent}20`,
                                                color: themeColors.accent,
                                            }}
                                        >
                                            {exp.period}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-3 opacity-70">
                                        <Briefcase size={16} />
                                        <span className="font-medium">{exp.company}</span>
                                    </div>

                                    <p className="opacity-70 leading-relaxed">{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* Skills Grid */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl"
            >
                <div className="font-mono text-sm mb-8 opacity-60">
                    <span style={{ color: themeColors.accent }}>$</span> npm list --global
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-12">Technical Skills</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                            className="border border-current/10 rounded-lg p-6 hover:border-current/30 transition-all"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Code2 size={20} style={{ color: themeColors.accent }} />
                                <h3 className="font-bold text-lg">{category}</h3>
                            </div>

                            <div className="space-y-3">
                                {categorySkills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">{skill.name}</span>
                                            {skill.level && (
                                                <span className="text-xs opacity-60">{skill.level}%</span>
                                            )}
                                        </div>
                                        {skill.level && (
                                            <div className="w-full h-1 bg-current/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.2, duration: 0.8 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: themeColors.accent }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};