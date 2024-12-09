'use client';

interface PropertyProfileStepProps {
    formData: any;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function PropertyProfileStep({ formData, setFormData, onNext, onBack }: PropertyProfileStepProps) {
    const handleSelection = (isMultiple: boolean) => {
        setFormData({
            ...formData,
            isMultipleProperties: isMultiple,
            properties: []  // Reset properties array for both cases
        });
        onNext();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Tell us about your properties</h2>
            <div className="space-y-4">
                <button
                    onClick={() => handleSelection(false)}
                    className="w-full p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left group"
                >
                    <div className="flex items-center space-x-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">Just My Primary Residence</h3>
                            <p className="text-gray-300">I want to manage maintenance for my home</p>
                        </div>
                        <div className="text-indigo-400 group-hover:translate-x-2 transition-transform">
                            →
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleSelection(true)}
                    className="w-full p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left group"
                >
                    <div className="flex items-center space-x-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">I Manage Multiple Properties</h3>
                            <p className="text-gray-300">I have several properties that need maintenance</p>
                        </div>
                        <div className="text-indigo-400 group-hover:translate-x-2 transition-transform">
                            →
                        </div>
                    </div>
                </button>
            </div>

            <div className="mt-8">
                <button
                    onClick={onBack}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
