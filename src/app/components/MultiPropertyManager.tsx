'use client';
import { on } from 'events';
import { useState } from 'react';

interface MultiPropertyManagerProps {
    formData: any;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}
interface Property {
    address: string;
    city: string;
    state: string;
    zip: string;
    tenant: {
        name: string;
        email: string;
        phone: string;
    }
}

export default function MultiPropertyManager({ formData, setFormData, onNext, onBack }: MultiPropertyManagerProps) {
    const [properties, setProperties] = useState<Property[]>([])
    const [newPropertyaddress, setNewPropertyAddress] = useState<string>('')
    
    const handleComplete = () => {
        // Save multiple properties data
        setFormData({
            ...formData,
            properties: properties // Your collected properties array
        });
        onNext(); // This will take us to Thank You step
    };

    const handleAddProperty = () => {
        if (newPropertyaddress) {
            setProperties([...properties, {
                address: newPropertyaddress,
                city: '',
                state: '',
                zip: '',
                tenant: {
                    name: '',
                    email: '',
                    phone: ''
                }
            }]);
            setNewPropertyAddress('');
        }
    };  

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Property Portfolio</h2>
            <div className="text-lg text-white mb-4">
                Properties Added: {properties.length}
            </div>

            {/* Initial Property Input */}
            <div className="bg-gray-800 p-4 rounded-lg">
                <input
                    type="text"
                    placeholder="Enter property address"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={newPropertyaddress}
                    onChange={(e) => setNewPropertyAddress(e.target.value)}
                />
                <button
                    onClick={handleAddProperty}
                    className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                    Add Property
                </button>
            </div>
            {properties.map((property, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Property Address"
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="City"
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-white mb-3">Tenant Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Tenant Name"
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            />
                            <input
                                type="email"
                                placeholder="Tenant Email"
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            />
                            <input
                                type="phone"
                                placeholder="Tenant Phone"
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-between mt-8">
                <button
                    onClick={onBack}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                >
                    Back
                </button>
                <button
                    onClick={handleComplete}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                    Complete Portfolio Setup
                </button>
            </div>
        </div>
    );
}
