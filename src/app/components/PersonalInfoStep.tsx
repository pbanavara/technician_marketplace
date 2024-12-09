'use client';
import { signIn, useSession } from 'next-auth/react';

import { useState } from 'react';
import { setStorageItem } from '../utils/storage';

interface PersonalInfoStepProps {
    formData: any;
    setFormData: (data: any) => void;
    onNext: () => void;
}

export default function PersonalInfoStep({ formData, setFormData, onNext }: PersonalInfoStepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        setStorageItem('USER_ID', formData.email);
        e.preventDefault();
        onNext();
    };
    

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg opacity-50"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg opacity-50"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
}
