'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { setStorageItem } from '../utils/storage';

interface TechnicianStepProps {
    formData: any;
    setFormData: (data: any) => void;
    onBack: () => void;
    onComplete: () => void;
}

export default function TechnicianStep({ formData, setFormData, onBack, onComplete }: TechnicianStepProps) {
    const updateField = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const { data: session } = useSession();
    const router = useRouter();
    const USER_ID = formData.email || '';

    

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Technician Information</h2>
            <div className="p-4 bg-gray-700 rounded-lg space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name || ''}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                />
                <input
                    type="address"
                    placeholder="Address"
                    value={formData.address || ''}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Service area"
                    value={formData.service_area || ''}
                    onChange={(e) => updateField('service_area', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Specialization"
                    value={formData.specialization || ''}
                    onChange={(e) => updateField('specialization', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                />
               
                    
                <select
                    value={formData.availability || ''}
                    onChange={(e) => updateField('availability', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                >
                    <option value="">Select Availability</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="weekends">Weekends Only</option>
                </select>
            </div>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={onBack}
                    className="w-1/2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={onComplete}
                    className="w-1/2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Complete
                </button>
            </div>
        </div>
    );
}
