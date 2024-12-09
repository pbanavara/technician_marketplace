'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Feature from '@/app/components/feature';
import { ClockIcon, ShieldCheckIcon, BanknotesIcon, StarIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const USER_ID = session?.user?.email || '';

  useEffect(() => {
    if (USER_ID) {
      const hasLoggedInBefore = sessionStorage.getItem(`${USER_ID}_hasLoggedIn`);
      if (hasLoggedInBefore) {
        router.replace('/chat/agent');
      }
    }
  }, [USER_ID, router]);

  const homeownerFeatures = [
    {
      icon: <ClockIcon className="w-6 h-6 text-indigo-400" />,
      title: '24/7 Elite Access',
      description: 'Instant connection to top-tier maintenance professionals'
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Triple-Vetted Experts',
      description: 'Only the top 1% of technicians make our cut'
    },
    {
      icon: <BanknotesIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Simple Pricing',
      description: 'Predictable retainer + transparent task-based fees'
    },
    {
      icon: <StarIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Quality Guaranteed',
      description: 'Every maintenance task completed to perfection'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-center mb-8">
            <div className="text-6xl font-bold text-white mb-2">
              RepairDAO
            </div>
            <div className="text-3xl text-indigo-400">
              An AI-Powered Elite Technician Network
            </div>
          </h1>


          <div className="bg-gray-800 p-8 rounded-lg mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              {homeownerFeatures.map((feature, index) => (
                <Feature
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push('/onboarding')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"  
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
