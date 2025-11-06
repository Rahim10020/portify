import { create } from 'zustand';
import { PortfolioData } from '@/types';

interface CreatorState {
    currentStep: number;
    templateId: string;
    formData: Partial<PortfolioData>;
    setCurrentStep: (step: number) => void;
    setTemplateId: (id: string) => void;
    updateFormData: (data: Partial<PortfolioData>) => void;
    resetForm: () => void;
    nextStep: () => void;
    prevStep: () => void;
}

const initialFormData: Partial<PortfolioData> = {
    personal: {
        name: '',
        title: '',
        bio: '',
    },
    experience: [],
    projects: [],
    skills: [],
    socials: {},
    theme: {
        darkModeEnabled: false,
        primaryColor: '#3B82F6',
        font: 'inter',
        lightMode: {
            bg: '#FFFFFF',
            text: '#000000',
            accent: '#3B82F6',
        },
        darkMode: {
            bg: '#0A0A0A',
            text: '#FFFFFF',
            accent: '#60A5FA',
        },
    },
};

export const useCreatorStore = create<CreatorState>((set) => ({
    currentStep: 1,
    templateId: '',
    formData: initialFormData,
    setCurrentStep: (step) => set({ currentStep: step }),
    setTemplateId: (id) => set({ templateId: id }),
    updateFormData: (data) =>
        set((state) => ({
            formData: {
                ...state.formData,
                ...data,
            },
        })),
    resetForm: () =>
        set({
            currentStep: 1,
            templateId: '',
            formData: initialFormData,
        }),
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () =>
        set((state) => ({
            currentStep: Math.max(1, state.currentStep - 1),
        })),
}));