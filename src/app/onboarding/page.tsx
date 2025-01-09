'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PersonalInfoStep from '@/app/components/PersonalInfoStep';
import PropertyStep from '@/app/components/PropertyStep';
import PropertyProfileStep from '../components/PropertyProfileStep';
import ThankYouStep from '../components/ThankYouStep';

export default function Onboarding() {
    const { data: session } = useSession();
    const [step, setStep] = useState(1);
    const USER_ID = session?.user?.email || '';
    console.log('User email from Google:', USER_ID);
    useEffect(() => {
        if (USER_ID) {
            sessionStorage.setItem('USER_ID', USER_ID);
        }
    }, [USER_ID]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        user_type: 'landlord',
        address: '',
        properties: [],
        tenants: []
    });
    
    const router = useRouter();

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const renderStep = () => {
        switch (step) {
            case 1:
                return <PersonalInfoStep formData={formData} setFormData={setFormData} onNext={nextStep} />;
            case 2:
                return <PropertyProfileStep formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />;
            case 3:
                return <PropertyStep formData={formData} setFormData={setFormData} onNext={nextStep} onBack={prevStep} />;
            case 4:
                return <ThankYouStep onComplete={() => router.push('/chat/agent')} formData={formData} />;
            default:
                return null;
        }
    };
    return (

        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold text-white mb-2">
                        RepairDAO
                    </h1>
                    <div className="text-3xl text-indigo-400">
                        An AI-Powered Elite Technician Network
                    </div>
                </div>

                {/* Wizard Container */}
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`w-1/3 h-2 rounded ${i <= step ? 'bg-indigo-600' : 'bg-gray-600'}`} />
                                    ))}
                                </div>
                            </div>
                            {/* Step Content */}
                            {renderStep()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
}
