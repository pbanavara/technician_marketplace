'use client';

export const getStorageItem = (key: string) => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem(key);
    }
    return null;
};

export const setStorageItem = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, value);
    }
};