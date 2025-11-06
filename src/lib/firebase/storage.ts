import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

export const uploadImage = async (
    file: File,
    path: string
): Promise<string> => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

export const deleteImage = async (path: string): Promise<void> => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
};

export const uploadProfilePhoto = async (
    userId: string,
    file: File
): Promise<string> => {
    const path = `users/${userId}/profile/${Date.now()}_${file.name}`;
    return uploadImage(file, path);
};

export const uploadProjectImage = async (
    userId: string,
    portfolioId: string,
    file: File
): Promise<string> => {
    const path = `portfolios/${portfolioId}/projects/${Date.now()}_${file.name}`;
    return uploadImage(file, path);
};

export const uploadCV = async (
    userId: string,
    file: File
): Promise<string> => {
    const path = `users/${userId}/cv/${Date.now()}_${file.name}`;
    return uploadImage(file, path);
};