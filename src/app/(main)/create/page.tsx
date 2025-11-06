'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { ProgressBar } from '@/components/creator/ProgressBar';
import { LivePreview } from '@/components/creator/LivePreview';
import { Step1Template } from '@/components/creator/steps/Step1Template';
import { Step2Personal } from '@/components/creator/steps/Step2Personal';
import { Step8Publish } from '@/components/creator/steps/Step8Publish';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/lib/hooks/useAuth';
import { createPortfolio } from '@/lib/firebase/firestore';
import { ROUTES } from '@/lib/constants/routes';
import { slugify } from '@/lib/utils/slugify';

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
            // Steps 3-7 would go here (we'll add simplified versions)
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                Step {currentStep} - Coming Soon
                            </h2>
                            <p className="text-foreground/70">
                                This step will be implemented with full functionality
                            </p>
                        </div>
                        <div className="flex justify-between pt-6">
                            <button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="px-4 py-2 text-foreground/70 hover:text-foreground"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setCurrentStep(currentStep + 1)}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
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
                {/* Progress Bar */}
                <div className="mb-8">
                    <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-background rounded-xl border border-border p-8">
                        {renderStep()}
                    </div>

                    {/* Preview Section */}
                    <div className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)]">
                        <LivePreview
                            templateId={templateId}
                            data={{ personal: personalData }}
                        />
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