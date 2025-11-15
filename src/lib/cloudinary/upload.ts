export interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
}

export const uploadToCloudinary = async (
    file: File,
    folder: string = 'portify'
): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration missing');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data: CloudinaryUploadResponse = await response.json();
        return data.secure_url;
    } catch (error) {
        // Cloudinary error - already handled
        throw new Error('Failed to upload image');
    }
};

export const uploadProfilePhoto = async (file: File): Promise<string> => {
    return uploadToCloudinary(file, 'portify/profiles');
};

export const uploadProjectImage = async (file: File): Promise<string> => {
    return uploadToCloudinary(file, 'portify/projects');
};

export const uploadCV = async (file: File): Promise<string> => {
    return uploadToCloudinary(file, 'portify/cv');
};