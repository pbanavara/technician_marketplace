'use client';

import { useRouter } from 'next/navigation';

export default function Navigation() {
    const router = useRouter();
    const USER_ID = sessionStorage.getItem('USER_ID');

    const handleSignOut = () => {
        sessionStorage.removeItem(`${USER_ID}_hasLoggedIn`);
        router.push('/');
    };

    return (
        <div className="fixed bottom-6 left-6 flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="text-white">
                <div className="font-medium">{USER_ID}</div>
                <div className="text-sm text-gray-400">User</div>
            </div>
            <button
                onClick={handleSignOut}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
                Sign Out
            </button>
        </div>
    );
}