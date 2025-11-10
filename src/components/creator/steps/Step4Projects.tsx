'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { projectSchema, ProjectInput } from '@/lib/utils/validation';
import { Project } from '@/types';
import { uploadProjectImage } from '@/lib/cloudinary/upload';
import { ImageUploadWithPreview } from '@/components/ui/ImageUploadWithPreview';
import { PROJECT_DESCRIPTION_SUGGESTIONS } from '@/lib/constants/suggestions';
import { Plus, Trash2, FolderOpen, X, Upload, Image as ImageIcon, ArrowLeft, ArrowRight } from 'lucide-react';

interface Step4ProjectsProps {
    data: Project[];
    onUpdate: (data: Project[]) => void;
    onNext: () => void;
    onBack: () => void;
}

export const Step4Projects = ({ data, onUpdate, onNext, onBack }: Step4ProjectsProps) => {
    const toast = useToast();
    const [projects, setProjects] = useState<Project[]>(data);
    const [isAdding, setIsAdding] = useState(false);
    const [techInput, setTechInput] = useState('');
    const [techs, setTechs] = useState<string[]>([]);
    const [projectImages, setProjectImages] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<ProjectInput>({
        resolver: zodResolver(projectSchema),
    });

    const handleAddTech = () => {
        if (techInput.trim() && !techs.includes(techInput.trim())) {
            const updatedTechs = [...techs, techInput.trim()];
            setTechs(updatedTechs);
            setValue('techs', updatedTechs);
            setTechInput('');
        }
    };

    const handleRemoveTech = (tech: string) => {
        const updatedTechs = techs.filter((t) => t !== tech);
        setTechs(updatedTechs);
        setValue('techs', updatedTechs);
    };

    const handleImageUpload = async (file: File) => {
        try {
            const url = await uploadProjectImage(file);
            setProjectImages([...projectImages, url]);
            return url;
        } catch (error) {
            toast.error('Failed to upload image');
            throw error;
        }
    };

    const handleRemoveImage = (url: string) => {
        setProjectImages(projectImages.filter((img) => img !== url));
    };

    const onSubmit = (formData: ProjectInput) => {
        const newProject: Project = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
            images: projectImages,
            featured: false,
        };

        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        onUpdate(updatedProjects);
        reset();
        setTechs([]);
        setProjectImages([]);
        setIsAdding(false);
    };

    const handleDelete = (id: string) => {
        const updatedProjects = projects.filter((proj) => proj.id !== id);
        setProjects(updatedProjects);
        onUpdate(updatedProjects);
    };

    const handleDescriptionSuggestion = (suggestion: string) => {
        setValue('shortDescription', suggestion);
    };

    const handleContinue = () => {
        onUpdate(projects);
        onNext();
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Projects</h2>
                <p className="text-foreground/70">Showcase your best work</p>
            </div>

            {/* Projects List */}
            {projects.length > 0 && (
                <div className="space-y-3">
                    {projects.map((project) => (
                        <Card key={project.id} className="relative">
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="absolute top-4 right-4 text-red-600 hover:text-red-700"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex items-start gap-3 pr-10">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <FolderOpen className="text-primary" size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                                    <p className="text-sm text-foreground/70 mt-1 line-clamp-2">
                                        {project.shortDescription}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.techs.map((tech) => (
                                            <Badge key={tech} variant="secondary">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Project Form */}
            {isAdding ? (
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Project Title *"
                            placeholder="My Awesome Project"
                            error={errors.title?.message}
                            {...register('title')}
                        />

                        <div className="space-y-2">
                            <Textarea
                                label="Short Description *"
                                placeholder="A brief description of what this project does..."
                                rows={3}
                                error={errors.shortDescription?.message}
                                {...register('shortDescription')}
                            />
                            <div className="space-y-2">
                                <p className="text-sm text-foreground/70">Project description suggestions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {PROJECT_DESCRIPTION_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
                                        <Button
                                            key={index}
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => handleDescriptionSuggestion(suggestion)}
                                            className="text-xs"
                                        >
                                            Use this suggestion
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Textarea
                            label="Full Description (Optional)"
                            placeholder="A detailed description for the project detail page..."
                            rows={5}
                            {...register('fullDescription')}
                        />

                        <Input
                            label="Live URL (Optional)"
                            placeholder="https://myproject.com"
                            error={errors.liveUrl?.message}
                            {...register('liveUrl')}
                        />

                        <Input
                            label="GitHub URL (Optional)"
                            placeholder="https://github.com/username/repo"
                            error={errors.githubUrl?.message}
                            {...register('githubUrl')}
                        />

                        {/* Technologies */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                Technologies *
                            </label>
                            <div className="flex gap-2 mb-2">
                                <Input
                                    placeholder="React, Node.js, etc."
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddTech();
                                        }
                                    }}
                                />
                                <Button type="button" onClick={handleAddTech}>
                                    Add
                                </Button>
                            </div>

                            {techs.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {techs.map((tech) => (
                                        <Badge key={tech} variant="default" className="gap-1">
                                            {tech}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTech(tech)}
                                                className="ml-1 hover:text-red-500"
                                            >
                                                <X size={14} />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {errors.techs && (
                                <p className="mt-1.5 text-sm text-red-600">{errors.techs.message}</p>
                            )}
                        </div>

                        {/* Project Images */}
                        <ImageUploadWithPreview
                            onUpload={handleImageUpload}
                            currentImage={projectImages.length > 0 ? projectImages[0] : undefined}
                            onRemove={() => setProjectImages([])}
                            label="Project Images (Optional)"
                            maxSizeMB={5}
                            aspectRatio="landscape"
                        />

                        <div className="flex gap-3">
                            <Button type="submit">Add Project</Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                    setIsAdding(false);
                                    reset();
                                    setTechs([]);
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
                    Add Project
                </Button>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
                <Button type="button" variant="ghost" onClick={onBack}>
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                </Button>
                <Button
                    type="button"
                    onClick={handleContinue}
                    size="md"
                    disabled={projects.length === 0}
                >
                    Continue
                    <ArrowRight size={16} className="ml-2" />
                </Button>
            </div>

            {projects.length === 0 && (
                <p className="text-sm text-foreground/60 text-center">
                    Add at least one project to continue
                </p>
            )}
        </div>
    );
};