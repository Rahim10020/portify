'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { ProgressBar } from '@/components/creator/ProgressBar';
import { LivePreview } from '@/components/creator/LivePreview';
import { Step1Template } from '@/components/creator/steps/Step1Template';
import { Step2Personal } from '@/components/creator/steps/Step2Personal';
import { Step3Experience } from '@/components/creator/steps/Step3Experience';
import { Step4Projects } from '@/components/creator/steps/Step4Projects';
import { Step5Skills } from '@/components/creator/steps/Step5Skills';
import { Step6Contact } from '@/components/creator/steps/Step6Contact';
import { Step7Theme } from '@/components/creator/steps/Step7Theme';
import { Step8Publish } from '@/components/creator/steps/Step8Publish';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/lib/hooks/useAuth';
import { createPortfolio } from '@/lib/firebase/firestore';
import { ROUTES } from '@/lib/constants/routes';
import { slugify } from '@/lib/utils/slugify';
import { createPreviewPortfolio } from '@/lib/utils/preview';

const TOTAL_STEPS = 8;

function CreateContent() {
    const router = useRouter();
    const toast = useToast();
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form data state
    const [templateId, setTemplateId] = useState('');
    const [personalData, setPersonalData] = useState({
        name: '',
        title: '',
        bio: '',
        longBio: '',
        location: '',
    });
    const [experienceData, setExperienceData] = useState<any[]>([]);
    const [projectsData, setProjectsData] = useState<any[]>([]);
    const [skillsData, setSkillsData] = useState<any[]>([]);
    const [socialsData, setSocialsData] = useState<any>({});
    const [themeData, setThemeData] = useState<any>({
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
    });
    const [slug, setSlug] = useState('');
    const [isPublished, setIsPublished] = useState(true);

    const handleTemplateSelect = (id: string) => {
        setTemplateId(id);
    };

    const handlePersonalUpdate = (data: any) => {
        setPersonalData(data);
        // Auto-generate slug from name if not set
        if (!slug && data.name) {
            setSlug(slugify(data.name));
        }
    };

    const handlePublish = async () => {
        if (!user) return;

        try {
            setIsLoading(true);

            const portfolioData = {
                userId: user.id,
                templateId,
                slug,
                isPublished,
                activePages: ['home', 'about', 'projects', 'contact'],
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
                views: 0,
            };

            await createPortfolio(portfolioData as any);

            toast.success(
                isPublished ? 'Portfolio published successfully!' : 'Portfolio saved as draft!'
            );

            router.push(ROUTES.DASHBOARD);
        } catch (error: any) {
            toast.error(error.message || 'Failed to create portfolio');
        } finally {
            setIsLoading(false);
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
                        onPublish={handlePublish}
                        onBack={() => setCurrentStep(7)}
                        isLoading={isLoading}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="container mx-auto px-4 py-8">
                {/* Progress Bar - positioned at top like header */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
                    <div className="container mx-auto px-4 py-4">
                        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
                    </div>
                </div>
                {/* Add padding to account for fixed progress bar */}
                <div className="pt-20"></div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-background rounded-xl border border-border p-8">
                        {renderStep()}
                    </div>

                    {/* Preview Section */}
                    <div className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)]">
                        {templateId ? (
                            <LivePreview
                                className="h-full"
                                portfolio={createPreviewPortfolio(
                                    user?.id || '',
                                    templateId,
                                    slug,
                                    {
                                        personal: personalData,
                                        experience: experienceData,
                                        projects: projectsData,
                                        skills: skillsData,
                                        socials: socialsData,
                                        theme: themeData,
                                    }
                                )}
                                currentPage="home"
                            />
                        ) : (
                            <div className="h-full rounded-xl border border-border bg-background flex flex-col items-center justify-center text-center px-6 py-8 text-foreground/60">
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Choisissez un template pour prévisualiser votre portfolio
                                </h3>
                                <p>
                                    Sélectionnez un template à l’étape précédente pour activer la prévisualisation en direct.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CreatePage() {
    return (
        <ProtectedRoute>
            <CreateContent />
        </ProtectedRoute>
    );
}
