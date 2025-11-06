import { z } from 'zod';

export const signUpSchema = z.object({
    displayName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const personalInfoSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    title: z.string().min(2, 'Title must be at least 2 characters'),
    bio: z.string().min(10, 'Bio must be at least 10 characters').max(200, 'Bio must be less than 200 characters'),
    longBio: z.string().optional(),
    location: z.string().optional(),
});

export const experienceSchema = z.object({
    company: z.string().min(2, 'Company name is required'),
    position: z.string().min(2, 'Position is required'),
    period: z.string().min(2, 'Period is required'),
    description: z.string().min(10, 'Description is required'),
});

export const projectSchema = z.object({
    title: z.string().min(2, 'Title is required'),
    shortDescription: z.string().min(10, 'Short description is required'),
    fullDescription: z.string().optional(),
    liveUrl: z.string().url().optional().or(z.literal('')),
    githubUrl: z.string().url().optional().or(z.literal('')),
    techs: z.array(z.string()).min(1, 'Add at least one technology'),
    featured: z.boolean().default(false),
});

export const skillSchema = z.object({
    name: z.string().min(1, 'Skill name is required'),
    level: z.number().min(0).max(100).optional(),
    category: z.string().min(1, 'Category is required'),
});

export const socialsSchema = z.object({
    email: z.string().email().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    dribbble: z.string().url().optional().or(z.literal('')),
    behance: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
});

export const slugSchema = z.object({
    slug: z
        .string()
        .min(3, 'Slug must be at least 3 characters')
        .max(30, 'Slug must be less than 30 characters')
        .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
});

export const newsletterSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type SocialsInput = z.infer<typeof socialsSchema>;
export type SlugInput = z.infer<typeof slugSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;