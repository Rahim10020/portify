'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { skillSchema, SkillInput } from '@/lib/utils/validation';
import { Skill } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

interface Step5SkillsProps {
    data: Skill[];
    onUpdate: (data: Skill[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export const Step5Skills = ({ data, onUpdate, onNext, onBack }: Step5SkillsProps) => {
    const [skills, setSkills] = useState<Skill[]>(data);
    const [isAdding, setIsAdding] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SkillInput>({
        resolver: zodResolver(skillSchema),
    });

    const onSubmit = (formData: SkillInput) => {
        const newSkill: Skill = {
            ...formData,
            level: formData.level || undefined,
        };

        const updatedSkills = [...skills, newSkill];
        setSkills(updatedSkills);
        onUpdate(updatedSkills);
        reset();
        setIsAdding(false);
    };

    const handleDelete = (name: string) => {
        const updatedSkills = skills.filter((skill) => skill.name !== name);
        setSkills(updatedSkills);
        onUpdate(updatedSkills);
    };

    const handleContinue = () => {
        onUpdate(skills);
        onNext();
    };

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Skills</h2>
                <p className="text-foreground/70">List your technical and professional skills</p>
            </div>

            {/* Skills List */}
            {skills.length > 0 && (
                <div className="space-y-4">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <Card key={category}>
                            <h3 className="font-semibold text-foreground mb-3">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {categorySkills.map((skill) => (
                                    <Badge key={skill.name} variant="default" className="gap-2">
                                        {skill.name}
                                        {skill.level && (
                                            <span className="text-xs opacity-70">({skill.level}%)</span>
                                        )}
                                        <button
                                            onClick={() => handleDelete(skill.name)}
                                            className="ml-1 hover:text-red-500"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Skill Form */}
            {isAdding ? (
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Skill Name *"
                            placeholder="JavaScript"
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        <Input
                            label="Category *"
                            placeholder="Frontend, Backend, Design, etc."
                            error={errors.category?.message}
                            {...register('category')}
                        />

                        <Input
                            label="Proficiency Level (Optional, 0-100)"
                            type="number"
                            placeholder="85"
                            min="0"
                            max="100"
                            error={errors.level?.message}
                            {...register('level', { valueAsNumber: true })}
                        />

                        <div className="flex gap-3">
                            <Button type="submit">Add Skill</Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setIsAdding(false);
                                    reset();
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Card>
            ) : (
                <Button
                    variant="secondary"
                    onClick={() => setIsAdding(true)}
                    className="w-full"
                >
                    <Plus size={20} className="mr-2" />
                    Add Skill
                </Button>
            )}

            {/* Quick Add Suggestions */}
            {!isAdding && skills.length === 0 && (
                <Card className="bg-muted/30">
                    <p className="text-sm text-foreground/70 mb-3">
                        Quick add common skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { name: 'JavaScript', category: 'Frontend' },
                            { name: 'React', category: 'Frontend' },
                            { name: 'Node.js', category: 'Backend' },
                            { name: 'Python', category: 'Backend' },
                            { name: 'UI/UX Design', category: 'Design' },
                            { name: 'Figma', category: 'Design' },
                        ].map((skill) => (
                            <Button
                                key={skill.name}
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    const updatedSkills = [...skills, skill];
                                    setSkills(updatedSkills);
                                    onUpdate(updatedSkills);
                                }}
                            >
                                <Plus size={14} className="mr-1" />
                                {skill.name}
                            </Button>
                        ))}
                    </div>
                </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
                <Button type="button" variant="ghost" onClick={onBack}>
                    Back
                </Button>
                <Button
                    type="button"
                    onClick={handleContinue}
                    size="lg"
                    disabled={skills.length === 0}
                >
                    Continue
                </Button>
            </div>

            {skills.length === 0 && (
                <p className="text-sm text-foreground/60 text-center">
                    Add at least one skill to continue
                </p>
            )}
        </div>
    );
};