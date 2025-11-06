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
import { Plus, Trash2, FolderOpen, X, Upload, Image as ImageIcon } from 'lucide-react';

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
    const [uploading, setUploading] = useState(false);

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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image too large. Max 5MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        try {
            setUploading(true);
            const url = await uploadProjectImage(file);
            setProjectImages([...projectImages, url]);
            toast.success('Image uploaded');
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
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

                        <Textarea
                            label="Short Description *"
                            placeholder="A brief description of what this project does..."
                            rows={3}
                            error={errors.shortDescription?.message}
                            {...register('shortDescription')}
                        />

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
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Project Images (Optional)
                            </label>

                            {/* Image Preview */}
                            {projectImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    {projectImages.map((img, index) => (
                                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden border-2 border-border">
                                            <img src={img} alt={`Project ${index + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(img)}
                                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Upload Button */}
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                <div className="flex flex-col items-center justify-center">
                                    {uploading ? (
                                        <p className="text-sm text-foreground/70">Uploading...</p>
                                    ) : (
                                        <>
                                            <ImageIcon className="w-6 h-6 text-foreground/50 mb-1" />
                                            <p className="text-sm text-foreground/70">Click to upload image</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                            </label>
                        </div>

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
                    Back
                </Button>
                <Button
                    type="button"
                    onClick={handleContinue}
                    size="lg"
                    disabled={projects.length === 0}
                >
                    Continue
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