'use client';

interface TenantStepProps {
    formData: any;
    setFormData: (data: any) => void;
    onBack: () => void;
    onComplete: () => void;
}

export default function TenantStep({ formData, setFormData, onBack, onComplete }: TenantStepProps) {
    const handleAddTenant = () => {
        setFormData({
            ...formData,
            tenants: [...formData.tenants, { name: '', email: '', phone: '', propertyIndex: 0 }]
        });
    };

    const updateTenant = (index: number, field: string, value: string) => {
        const updatedTenants = formData.tenants.map((tenant: any, i: number) =>
            i === index ? { ...tenant, [field]: value } : tenant
        );
        setFormData({ ...formData, tenants: updatedTenants });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Tenant Information</h2>
            <div className="space-y-6">
                {formData.tenants.map((tenant: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-700 rounded-lg space-y-4">
                        <h3 className="text-white font-medium">Tenant {index + 1}</h3>
                        <select
                            value={tenant.propertyIndex}
                            onChange={(e) => updateTenant(index, 'propertyIndex', e.target.value)}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                        >
                            {formData.properties.map((prop: any, i: number) => (
                                <option key={i} value={i}>
                                    {prop.address}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Tenant Name"
                            value={tenant.name}
                            onChange={(e) => updateTenant(index, 'name', e.target.value)}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                        />
                        <input
                            type="email"
                            placeholder="Tenant Email"
                            value={tenant.email}
                            onChange={(e) => updateTenant(index, 'email', e.target.value)}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                        />
                        <input
                            type="tel"
                            placeholder="Tenant Phone"
                            value={tenant.phone}
                            onChange={(e) => updateTenant(index, 'phone', e.target.value)}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg"
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddTenant}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Add Tenant
                </button>
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
