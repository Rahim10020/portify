import slugifyLib from 'slugify';

export const slugify = (text: string): string => {
    return slugifyLib(text, {
        lower: true,
        strict: true,
        trim: true,
    });
};

export const generateUniqueSlug = (baseSlug: string, existingSlugs: string[]): string => {
    let slug = baseSlug;
    let counter = 1;

    while (existingSlugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
};