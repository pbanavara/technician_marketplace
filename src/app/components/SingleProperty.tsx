
'use client';
import { useState } from 'react';

interface SinglePropertyProps {
    formData: any;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}
export default function SingleProperty({ formData, setFormData, onNext, onBack }: SinglePropertyProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save property data
        setFormData({
            ...formData,
            properties: [{
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zip
            }]
        });
        onNext(); // This will take us to Thank You step
    };
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Primary Residence Details</h2>
            <input
                type="text"
                placeholder="Street Address"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
            />
            <div className="grid grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="City"
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                />
                <input
                    type="text"
                    placeholder="State"
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                />
                <input
                    type="text"
                    placeholder="ZIP"
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                />
            </div>
            <div className="flex gap-4 mt-8">
                <button
                    onClick={onBack}
                    className="w-1/2 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-1/2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
                >
                    Complete Setup
                </button>
            </div>
        </div>
    );
}
