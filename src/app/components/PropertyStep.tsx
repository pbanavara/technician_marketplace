'use client';

import SingleProperty from '@/app/components/SingleProperty';
import MultiPropertyManager from '@/app/components/MultiPropertyManager';

interface PropertyStepProps {
    formData: any;
    setFormData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function PropertyStep({ formData, setFormData, onNext, onBack }: PropertyStepProps) {
    return (
        <div>
            {formData.isMultipleProperties ? (
                <MultiPropertyManager
                    formData={formData}
                    setFormData={setFormData}
                    onNext={onNext}
                    onBack={onBack}
                />
            ) : (
                <SingleProperty
                    formData={formData}
                    setFormData={setFormData}
                    onNext={onNext}
                    onBack={onBack}
                />
            )}
        </div>
    );
}
