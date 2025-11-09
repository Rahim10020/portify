'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { experienceSchema, ExperienceInput } from '@/lib/utils/validation';
import { Experience } from '@/types';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface Step3ExperienceProps {
    data: Experience[];
    onUpdate: (data: Experience[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export const Step3Experience = ({ data, onUpdate, onNext, onBack }: Step3ExperienceProps) => {
    const [experiences, setExperiences] = useState<Experience[]>(data);
    const [isAdding, setIsAdding] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ExperienceInput>({
        resolver: zodResolver(experienceSchema),
    });

    const onSubmit = (formData: ExperienceInput) => {
        const newExperience: Experience = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
        };

        const updatedExperiences = [...experiences, newExperience];
        setExperiences(updatedExperiences);
        onUpdate(updatedExperiences);
        reset();
        setIsAdding(false);
    };

    const handleDelete = (id: string) => {
        const updatedExperiences = experiences.filter((exp) => exp.id !== id);
        setExperiences(updatedExperiences);
        onUpdate(updatedExperiences);
    };

    const handleContinue = () => {
        onUpdate(experiences);
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Work Experience</h2>
                <p className="text-foreground/70">Add your professional experience (Optional)</p>
            </div>

            {/* Experience List */}
            {experiences.length > 0 && (
                <div className="space-y-3">
                    {experiences.map((exp) => (
                        <Card key={exp.id} className="relative">
                            <button
                                onClick={() => handleDelete(exp.id)}
                                className="cursor-pointer absolute top-4 right-4 text-red-600 hover:text-red-700"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex items-start gap-3 pr-10">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Briefcase className="text-primary" size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground">{exp.position}</h3>
                                    <p className="text-sm text-foreground/70">{exp.company}</p>
                                    <p className="text-xs text-foreground/50">{exp.period}</p>
                                    <p className="text-sm text-foreground/70 mt-2 line-clamp-2">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Experience Form */}
            {isAdding ? (
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Company *"
                            placeholder="Tech Corp"
                            error={errors.company?.message}
                            {...register('company')}
                        />

                        <Input
                            label="Position *"
                            placeholder="Senior Developer"
                            error={errors.position?.message}
                            {...register('position')}
                        />

                        <Input
                            label="Period *"
                            placeholder="Jan 2020 - Present"
                            error={errors.period?.message}
                            {...register('period')}
                        />

                        <Textarea
                            label="Description *"
                            placeholder="Describe your responsibilities and achievements..."
                            rows={4}
                            error={errors.description?.message}
                            {...register('description')}
                        />

                        <div className="flex gap-3">
                            <Button type="submit">Add Experience</Button>
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
                    Add Experience
                </Button>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
                <Button type="button" variant="ghost" onClick={onBack}>
                    Back
                </Button>
                <Button type="button" onClick={handleContinue} size="md">
                    Continue
                </Button>
            </div>
        </div>
    );
};