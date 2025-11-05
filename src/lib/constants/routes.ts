export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',

    TEMPLATES: '/templates',
    TEMPLATE_PREVIEW: (slug: string) => `/templates/${slug}`,

    DASHBOARD: '/dashboard',
    CREATE: '/create',
    EDIT: (id: string) => `/edit/${id}`,
    SETTINGS: '/settings',
    PRICING: '/pricing',

    ADMIN: '/admin',
    ADMIN_SETTINGS: '/admin/settings',
    ADMIN_USERS: '/admin/users',
    ADMIN_USER_DETAIL: (id: string) => `/admin/users/${id}`,
    ADMIN_NEWSLETTER: '/admin/newsletter',

    PORTFOLIO: (username: string) => `/u/${username}`,
    PORTFOLIO_PAGE: (username: string, page: string) => `/u/${username}/${page}`,
} as const;