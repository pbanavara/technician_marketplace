'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { useState } from 'react';
import {
  ClockIcon, ShieldCheckIcon, BanknotesIcon, StarIcon,
  CalendarIcon, MagnifyingGlassIcon, ChartBarIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/solid';
import Feature from '@/app/components/feature';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const USER_ID = session?.user?.email || '';
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const marketplaceCapabilities = [
    {
      icon: <MagnifyingGlassIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Intelligent Expert Discovery',
      description: 'Our AI scans and analyzes thousands of expert profiles across Yelp, Google, and local directories to find the perfect match for your needs'
    },
    {
      icon: <CalendarIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Smart Scheduling',
      description: 'Automated calendar management synchronizes maintenance schedules between property owners and technicians, eliminating scheduling conflicts'
    },
    {
      icon: <ChartBarIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Predictive Maintenance',
      description: 'AI-driven analytics predict when your property needs maintenance, preventing costly emergency repairs'
    },
    {
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Automated Task Management',
      description: 'Smart workflows handle recurring maintenance tasks, inspections, and follow-ups automatically'
    }
  ];



  const propertyOwnerBenefits = [
    {
      icon: <ClockIcon className="w-6 h-6 text-indigo-400" />,
      title: '24/7 Elite Access',
      description: 'Instant connection to top-tier maintenance professionals with real-time availability'
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Triple-Vetted Experts',
      description: 'AI-powered vetting system analyzes reviews, credentials, and performance metrics to select only the top 1% of technicians'
    },
    {
      icon: <BanknotesIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Smart Pricing',
      description: 'Dynamic pricing model optimizes costs based on service complexity, urgency, and market conditions'
    },
    {
      icon: <StarIcon className="w-6 h-6 text-indigo-400" />,
      title: 'Quality Assurance',
      description: 'AI-powered quality control system monitors service delivery and ensures consistent excellence'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        console.log('Error response:', data)
        // Handle error state in UI
        return
      }
      setShowModal(true);
      setEmail('');

      console.log('Success:', data)
      // Handle success state in UI

    } catch (error) {
      console.log('Fetch error:', error)
      // Hand
      // le network error in UI
    }
    finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">AgentForge</h1>
          <h2 className="text-2xl text-indigo-400 mb-8">
            Where AI agents meet physical agents
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your property maintenance with autonomous AI agents that intelligently coordinate repairs and handyman services,
            from emergency fixes to scheduled HVAC maintenance. Our platform optimizes your property's upkeep through smart dispatching,
            proactive maintenance scheduling, and data-driven insights - connecting you with trusted professionals while you focus on what matters most.
          </p>

        </header>

        <section className="mb-16">
          <h3 className="text-3xl text-white text-center mb-8">Agentic Marketplace Capabilities</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {marketplaceCapabilities.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl text-white text-center mb-8">Property Owner Benefits</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {propertyOwnerBenefits.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </section>

        <section className="text-center">
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <button onClick={handleSubmit}
              className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition"
            >
              Join Waitlist
            </button>
          </div>
        </section>

      </div>
      // Add this JSX right before the closing div of your return statement
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl text-white mb-4">Thank you for joining!</h3>
            <p className="text-gray-300 mb-6">We'll get back to you shortly with exclusive updates.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
