import { Timestamp } from 'firebase/firestore';

export interface PersonalInfo {
    name: string;
    title: string;
    bio: string;
    longBio?: string;
    photo?: string;
    location?: string;
    cv?: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    period: string;
    description: string;
}

export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription?: string;
    images: string[];
    liveUrl?: string;
    githubUrl?: string;
    techs: string[];
    featured: boolean;
    challenges?: string;
    solution?: string;
}

export interface Skill {
    name: string;
    level?: number;
    category: string;
}

export interface Socials {
    email?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    dribbble?: string;
    behance?: string;
    website?: string;
}

export interface ThemeColors {
    bg: string;
    text: string;
    accent: string;
}

export interface Theme {
    darkModeEnabled: boolean;
    primaryColor: string;
    font: string;
    lightMode: ThemeColors;
    darkMode: ThemeColors;
}

export interface PortfolioData {
    personal: PersonalInfo;
    experience: Experience[];
    projects: Project[];
    skills: Skill[];
    socials: Socials;
    theme: Theme;
}

export interface SEO {
    title: string;
    description: string;
    image?: string;
}

export type PortfolioPage = 'home' | 'about' | 'projects' | 'contact';

export interface Portfolio {
    id: string;
    userId: string;
    slug: string;
    templateId: string;
    isPublished: boolean;
    activePages: PortfolioPage[];
    data: PortfolioData;
    seo: SEO;
    views: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}