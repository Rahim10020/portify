import { Portfolio, PortfolioData } from '@/types';

const getDefaultPlaceholderData = (templateId: string): Partial<PortfolioData> => {
    const baseData = {
        personal: {
            name: 'John Doe',
            title: 'Full Stack Developer',
            bio: 'Passionate developer with 5+ years of experience building web applications. I love creating user-friendly solutions and working with modern technologies.',
            longBio: 'I am a dedicated full-stack developer with a passion for creating innovative web solutions. With over 5 years of experience in the tech industry, I have worked on various projects ranging from small business websites to large-scale enterprise applications. My expertise spans across multiple technologies and frameworks, and I am always eager to learn and adapt to new challenges.',
            location: 'San Francisco, CA',
        },
        experience: [
            {
                id: '1',
                company: 'TechCorp Inc.',
                position: 'Senior Full Stack Developer',
                period: '2022 - Present',
                description: 'Led development of multiple web applications, mentored junior developers, and implemented best practices for code quality and performance.',
            },
            {
                id: '2',
                company: 'StartupXYZ',
                position: 'Full Stack Developer',
                period: '2020 - 2022',
                description: 'Developed and maintained React-based applications, collaborated with design team, and contributed to open-source projects.',
            },
        ],
        projects: [
            {
                id: '1',
                title: 'E-Commerce Platform',
                shortDescription: 'A modern e-commerce solution built with Next.js and Stripe integration.',
                fullDescription: 'A comprehensive e-commerce platform featuring user authentication, payment processing, inventory management, and admin dashboard. Built with Next.js, TypeScript, and integrated with Stripe for secure payments.',
                images: ['/placeholder-project-1.jpg'],
                liveUrl: 'https://example.com',
                githubUrl: 'https://github.com/example/project',
                techs: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
                featured: true,
            },
            {
                id: '2',
                title: 'Task Management App',
                shortDescription: 'A collaborative task management application with real-time updates.',
                fullDescription: 'A productivity app that allows teams to manage projects, assign tasks, and track progress in real-time. Features include drag-and-drop interface, notifications, and team collaboration tools.',
                images: ['/placeholder-project-2.jpg'],
                liveUrl: 'https://example.com',
                githubUrl: 'https://github.com/example/project',
                techs: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
                featured: false,
            },
        ],
        skills: [
            { name: 'JavaScript', level: 95, category: 'Programming Languages' },
            { name: 'TypeScript', level: 90, category: 'Programming Languages' },
            { name: 'Python', level: 85, category: 'Programming Languages' },
            { name: 'React', level: 95, category: 'Frontend Frameworks' },
            { name: 'Next.js', level: 90, category: 'Frontend Frameworks' },
            { name: 'Node.js', level: 88, category: 'Backend Frameworks' },
            { name: 'Express.js', level: 85, category: 'Backend Frameworks' },
            { name: 'MongoDB', level: 80, category: 'Databases' },
            { name: 'PostgreSQL', level: 75, category: 'Databases' },
        ],
        socials: {
            email: 'john.doe@example.com',
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            twitter: 'https://twitter.com/johndoe',
        },
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

    // Template-specific customizations
    switch (templateId) {
        case 'designstudio':
            return {
                ...baseData,
                personal: {
                    ...baseData.personal,
                    name: 'Alex Rivera',
                    title: 'UI/UX Designer',
                    bio: 'Creative designer specializing in user-centered design with a passion for crafting beautiful and functional digital experiences.',
                },
                skills: [
                    { name: 'Figma', level: 98, category: 'Design Tools' },
                    { name: 'Adobe Creative Suite', level: 95, category: 'Design Tools' },
                    { name: 'Sketch', level: 90, category: 'Design Tools' },
                    { name: 'Prototyping', level: 92, category: 'Design Skills' },
                    { name: 'User Research', level: 88, category: 'Design Skills' },
                    { name: 'Design Systems', level: 85, category: 'Design Skills' },
                ],
                projects: [
                    {
                        id: '1',
                        title: 'Mobile Banking App',
                        shortDescription: 'Redesigned mobile banking experience with focus on accessibility and user experience.',
                        fullDescription: 'Complete redesign of a mobile banking application, focusing on improving user experience, accessibility, and modern design principles. The project involved extensive user research, prototyping, and collaboration with development teams.',
                        images: ['/placeholder-design-1.jpg'],
                        liveUrl: 'https://example.com',
                        githubUrl: 'https://github.com/example/project',
                        techs: ['Figma', 'Principle', 'InVision', 'UserTesting'],
                        featured: true,
                    },
                ],
            };
        case 'minimal':
            return {
                ...baseData,
                personal: {
                    ...baseData.personal,
                    name: 'Sarah Chen',
                    title: 'Product Manager',
                    bio: 'Strategic product manager focused on building products that solve real problems and deliver exceptional user value.',
                },
                skills: [
                    { name: 'Product Strategy', level: 95, category: 'Product Management' },
                    { name: 'Data Analysis', level: 90, category: 'Product Management' },
                    { name: 'Agile/Scrum', level: 88, category: 'Product Management' },
                    { name: 'SQL', level: 85, category: 'Technical Skills' },
                    { name: 'A/B Testing', level: 82, category: 'Technical Skills' },
                    { name: 'User Research', level: 80, category: 'Technical Skills' },
                ],
            };
        default:
            return baseData;
    }
};

// Helper function to merge objects deeply, keeping user data when provided
const deepMerge = <T extends Record<string, any>>(defaultObj: T, userObj: Partial<T> | undefined): T => {
    if (!userObj) return defaultObj;

    const merged = { ...defaultObj };

    for (const key in userObj) {
        const userValue = userObj[key];
        const defaultValue = defaultObj[key];

        // If user value is null, undefined, or empty string, keep default
        if (userValue === null || userValue === undefined || userValue === '') {
            continue;
        }

        // If both are objects (and not arrays), merge recursively
        if (
            typeof userValue === 'object' &&
            typeof defaultValue === 'object' &&
            !Array.isArray(userValue) &&
            !Array.isArray(defaultValue)
        ) {
            merged[key] = deepMerge(defaultValue, userValue);
        } else {
            // Otherwise, use user value
            merged[key] = userValue as T[Extract<keyof T, string>];
        }
    }

    return merged;
};

// Helper function to merge arrays - use user array if it has items, otherwise use default
const mergeArray = <T>(defaultArray: T[], userArray: T[] | undefined): T[] => {
    if (!userArray || userArray.length === 0) {
        return defaultArray;
    }
    return userArray;
};

export const createPreviewPortfolio = (
    userId: string,
    templateId: string,
    slug: string,
    data: Partial<PortfolioData>
): Portfolio => {
    const now = new Date();
    const defaultData = getDefaultPlaceholderData(templateId);

    // Merge personal info - keep user values when provided, otherwise use defaults
    const mergedPersonal = deepMerge(defaultData.personal!, data.personal);

    // For arrays, use user data if it exists and has items, otherwise use defaults
    const mergedExperience = mergeArray(defaultData.experience || [], data.experience);
    const mergedProjects = mergeArray(defaultData.projects || [], data.projects);
    const mergedSkills = mergeArray(defaultData.skills || [], data.skills);

    // Merge socials and theme objects deeply
    const mergedSocials = deepMerge(defaultData.socials!, data.socials);
    const mergedTheme = deepMerge(defaultData.theme!, data.theme);

    return {
        id: 'preview',
        userId,
        templateId: templateId || 'devfolio',
        slug: slug || 'preview',
        isPublished: false,
        activePages: ['home', 'about', 'projects', 'contact'],
        data: {
            personal: mergedPersonal,
            experience: mergedExperience,
            projects: mergedProjects,
            skills: mergedSkills,
            socials: mergedSocials,
            theme: mergedTheme,
        },
        seo: {
            title: mergedPersonal.name || 'Preview',
            description: mergedPersonal.bio || '',
        },
        views: 0,
        createdAt: now as any,
        updatedAt: now as any,
    };
};