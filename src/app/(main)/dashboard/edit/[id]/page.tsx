'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { getPortfolioById, updatePortfolio } from '@/lib/firebase/firestore';
import { useToast } from '@/components/ui/Toast';
import { ROUTES } from '@/lib/constants/routes';
import { Portfolio } from '@/types';
import { Step1Template } from '@/components/creator/steps/Step1Template';
import { Step2Personal } from '@/components/creator/steps/Step2Personal';
import { Step3Experience } from '@/components/creator/steps/Step3Experience';
import { Step4Projects } from '@/components/creator/steps/Step4Projects';
import { Step5Skills } from '@/components/creator/steps/Step5Skills';
import { Step6Contact } from '@/components/creator/steps/Step6Contact';
import { Step7Theme } from '@/components/creator/steps/Step7Theme';
import { Step8Publish } from '@/components/creator/steps/Step8Publish';
import { ProgressBar } from '@/components/creator/ProgressBar';
import { LivePreview } from '@/components/creator/LivePreview';
import { Loader2 } from 'lucide-react';
import { Experience, Project, Skill, Socials, Theme, PersonalInfo } from '@/types';

export default function EditPortfolioPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const toast = useToast();

    const portfolioId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    // Form data state
    const [templateId, setTemplateId] = useState('');
    const [personalData, setPersonalData] = useState<PersonalInfo>({} as PersonalInfo);
    const [experienceData, setExperienceData] = useState<Experience[]>([]);
    const [projectsData, setProjectsData] = useState<Project[]>([]);
    const [skillsData, setSkillsData] = useState<Skill[]>([]);
    const [socialsData, setSocialsData] = useState<Socials>({});
    const [themeData, setThemeData] = useState<Theme>({} as Theme);
    const [slug, setSlug] = useState('');
    const [isPublished, setIsPublished] = useState(true);

    // Load portfolio data
    useEffect(() => {
        const loadPortfolio = async () => {
            if (!user || !portfolioId) return;

            try {
                const data = await getPortfolioById(portfolioId);

                if (!data) {
                    toast.error('Portfolio not found');
                    router.push(ROUTES.DASHBOARD);
                    return;
                }

                // Check ownership
                if (data.userId !== user.id) {
                    toast.error('You do not have permission to edit this portfolio');
                    router.push(ROUTES.DASHBOARD);
                    return;
                }

                setPortfolio(data);

                // Pre-fill form data
                setTemplateId(data.templateId);
                setPersonalData(data.data.personal);
                setExperienceData(data.data.experience || []);
                setProjectsData(data.data.projects || []);
                setSkillsData(data.data.skills || []);
                setSocialsData(data.data.socials || {});
                setThemeData(data.data.theme || {});
                setSlug(data.slug);
                setIsPublished(data.isPublished);
            } catch (error) {
                toast.error('Failed to load portfolio');
                router.push(ROUTES.DASHBOARD);
            } finally {
                setLoading(false);
            }
        };

        loadPortfolio();
    }, [user, portfolioId, router, toast]);

    const handleTemplateSelect = (id: string) => {
        setTemplateId(id);
    };

    const handlePersonalUpdate = (data: PersonalInfo) => {
        setPersonalData(data);
    };

    const handleSave = async () => {
        if (!user || !portfolio) return;

        try {
            setSaving(true);

            const updatedData = {
                templateId,
                slug,
                isPublished,
                data: {
                    personal: personalData,
                    experience: experienceData,
                    projects: projectsData,
                    skills: skillsData,
                    socials: socialsData,
                    theme: themeData,
                },
                seo: {
                    title: `${personalData.name} - ${personalData.title}`,
                    description: personalData.bio,
                },
            };

            await updatePortfolio(portfolioId, updatedData);

            toast.success('Portfolio updated successfully!');
            router.push(ROUTES.DASHBOARD);
        } catch (error: any) {
            toast.error(error.message || 'Failed to update portfolio');
        } finally {
            setSaving(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1Template
                        selectedTemplateId={templateId}
                        onSelect={handleTemplateSelect}
                        onNext={() => setCurrentStep(2)}
                    />
                );
            case 2:
                return (
                    <Step2Personal
                        data={personalData}
                        onUpdate={handlePersonalUpdate}
                        onNext={() => setCurrentStep(3)}
                        onBack={() => setCurrentStep(1)}
                    />
                );
            case 3:
                return (
                    <Step3Experience
                        data={experienceData}
                        onUpdate={setExperienceData}
                        onNext={() => setCurrentStep(4)}
                        onBack={() => setCurrentStep(2)}
                    />
                );
            case 4:
                return (
                    <Step4Projects
                        data={projectsData}
                        onUpdate={setProjectsData}
                        onNext={() => setCurrentStep(5)}
                        onBack={() => setCurrentStep(3)}
                    />
                );
            case 5:
                return (
                    <Step5Skills
                        data={skillsData}
                        onUpdate={setSkillsData}
                        onNext={() => setCurrentStep(6)}
                        onBack={() => setCurrentStep(4)}
                    />
                );
            case 6:
                return (
                    <Step6Contact
                        data={socialsData}
                        onUpdate={setSocialsData}
                        onNext={() => setCurrentStep(7)}
                        onBack={() => setCurrentStep(5)}
                    />
                );
            case 7:
                return (
                    <Step7Theme
                        data={themeData}
                        onUpdate={setThemeData}
                        onNext={() => setCurrentStep(8)}
                        onBack={() => setCurrentStep(6)}
                    />
                );
            case 8:
                return (
                    <Step8Publish
                        slug={slug}
                        isPublished={isPublished}
                        onUpdate={(data) => {
                            setSlug(data.slug);
                            setIsPublished(data.isPublished);
                        }}
                        onPublish={handleSave}
                        onBack={() => setCurrentStep(7)}
                        isLoading={saving}
                    />
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-foreground/70">Loading portfolio...</p>
                </div>
            </div>
        );
    }

    if (!portfolio) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Progress Bar */}
            <ProgressBar currentStep={currentStep} totalSteps={8} />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        {/* Header */}
                        <div className="mb-12">
                            <h1 className="text-3xl font-bold text-foreground mb-2">Edit Portfolio</h1>
                            <p className="text-foreground/70">
                                Make changes to your portfolio. Step {currentStep} of 8
                            </p>
                        </div>

                        {/* Step Content */}
                        <div className="bg-card rounded-lg border border-border p-8">
                            {renderStep()}
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)]">
                        <LivePreview
                            portfolio={{
                                ...portfolio,
                                templateId,
                                slug,
                                isPublished,
                                data: {
                                    personal: personalData,
                                    experience: experienceData,
                                    projects: projectsData,
                                    skills: skillsData,
                                    socials: socialsData,
                                    theme: themeData,
                                },
                            }}
                            currentPage="home"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}