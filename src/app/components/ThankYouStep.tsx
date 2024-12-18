'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface ThankYouStepProps {
    formData: any;
    onComplete: () => void;
}

export default function ThankYouStep({ onComplete, formData }: ThankYouStepProps) {
    const { data: session } = useSession();
    const router = useRouter();

    onComplete = () => {
        const USER_ID = formData.email || '';
        setStorageItem("userType", 'landlord');
        setStorageItem(`${USER_ID}_hasLoggedIn`, 'false');
        setStorageItem(`${USER_ID}_onboardingData`,
            JSON.stringify(formData));
        router.push('/chat/agent');
    };

    return (
        <div className="text-center py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Welcome to RepairDAO!</h2>
                <p className="text-xl text-indigo-400">Your property maintenance journey begins now</p>
            </div>

            <div className="space-y-6 mb-8">
                <p className="text-gray-300">
                    We're excited to help you manage your property maintenance needs.
                    Your AI maintenance assistant is ready to help you 24/7.
                </p>
            </div>

            <button
                onClick={onComplete}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
            >
                Get Started →
            </button>
        </div>
    );
}
