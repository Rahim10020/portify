export type TemplateTier = 'free' | 'premium';
export type TemplateCategory = 'developer' | 'designer' | 'generic';

export interface TemplateFeatures {
    projectDetail: boolean;
    darkMode: boolean;
}

export interface TemplateConfig {
    id: string;
    name: string;
    slug: string;
    description: string;
    previewImage: string;
    category: TemplateCategory;
    tier: TemplateTier;
    features: TemplateFeatures;
    availablePages: string[];
}