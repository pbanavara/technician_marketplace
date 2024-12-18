'use client';

import TechnicianStep from '@/app/components/TechnicianStep';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getStorageItem, setStorageItem } from '../utils/storage';

export default function TechnicianOnboarding() {
    const router = useRouter();
    const { data: session } = useSession();
    const USER_ID = session?.user?.email || '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        availability: '',
        user_type: 'technician',
        address: '',
        service_area: ''
    });

    const handleComplete = async () => {
        // Handle form submission
        const USER_ID = formData.email || '';
        console.log("On complete in last step called");
        console.log("On complete user id", USER_ID);
        setStorageItem("USER_ID", USER_ID);
        setStorageItem(`${USER_ID}_hasLoggedIn`, 'true');
        setStorageItem(`${USER_ID}_onboardingData`,
            JSON.stringify(formData));
        setStorageItem('userType', 'technician');
        router.push('/chat/agent');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-center mb-8">
                        <div className="text-6xl font-bold text-white mb-2">
                            RepairDAO
                        </div>
                        <div className="text-3xl text-indigo-400">
                            Technician Registration
                        </div>
                    </h1>

                    <TechnicianStep
                        formData={formData}
                        setFormData={setFormData}
                        onBack={() => router.push('/')}
                        onComplete={handleComplete}
                    />
                </div>
            </div>
        </div>
    );
}
