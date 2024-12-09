'use client';
import React from 'react';
import { ReactNode } from 'react';

interface FeatureProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
    <div className="flex items-center gap-4 bg-gray-800/50 p-6 rounded-lg hover:bg-gray-800/70 transition-all">
        <div className="text-indigo-400">
            {icon}
        </div>
        <div className="text-left">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);

export default Feature;
