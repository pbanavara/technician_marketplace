'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef} from 'react';
import { WS_URL } from '@/app/config';
import { BaseMessage, ActionMessage, UserMessage, InitMessage } from '@/app/types/message';

import Navigation from '@/app/components/Navigation';
import { getStorageItem } from '@/app/utils/storage';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default function AgentChat() {
    
    
    const { data: session } = useSession();
    const USER_ID = getStorageItem('USER_ID') || '';
    
    const wsRef = useRef<WebSocket | null>(null);
    const [inputMessage, setInputMessage] = useState('');
    
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [messages, setMessages] = useState<BaseMessage[]>([]);
    
    let hasLoggedInBefore: boolean = false;
    const [onboardingData, setOnboardingData] = useState({});
    const [userType, setUserType] = useState(session?.userType || 'landlord');

    // This first useEffect is for state  initialization with no dependency array elements.
    useEffect(() => {
        setUserType(getStorageItem('userType') || 'landlord');
        hasLoggedInBefore = getStorageItem(`${USER_ID}_hasLoggedIn`) === 'true';
        console.log('hasLoggedInBefore:', hasLoggedInBefore);
        setIsFirstLogin(!hasLoggedInBefore);
        setOnboardingData(JSON.parse(getStorageItem(`${USER_ID}_onboardingData`) || '{}'));
    }, [])

    useEffect(() => {
        console.log("User ID in AgentChat:", USER_ID);
        if (!USER_ID) return;
        const connectWebsocket = () => {
            wsRef.current = new WebSocket(`${WS_URL}/ws/agent/${USER_ID}`);

            wsRef.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.sender_id === "agent") {
                    setMessages(prevMessages => [...prevMessages, message]);
                    setInputMessage('');
                }
                
            };

            wsRef.current.onopen = () => {
                console.log('WebSocket connection opened');
                if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

                const initMessage: InitMessage = {
                    type: 'init',
                    sender_id: USER_ID,
                    receiver_id: 'agent',
                    timestamp: new Date().toISOString(),
                    user_type: userType,
                    is_first_login: true,
                    onboarding_data: onboardingData,
                    content: ''
                };
                wsRef.current.send(JSON.stringify(initMessage));
                console.log('Sent init message:', initMessage);
                
            };

            wsRef.current.onerror = (error) => {
                console.log('WebSocket error:', error);
                setTimeout(() => {
                    connectWebsocket();
                }, 1000);
            };

            wsRef.current.onclose = () => {
                console.log('WebSocket connection closed');
                setTimeout(() => {
                    connectWebsocket();
                }, 1000);
            };
        };
        connectWebsocket();
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [USER_ID]);

    const sendMessage = () => {
        if (!inputMessage.trim() || !wsRef.current) return;

        const userMessage : UserMessage= {
            type: 'user_message',
            content: inputMessage,
            sender_id: USER_ID,
            receiver_id: 'agent',
            timestamp: new Date().toISOString(),
            user_type: userType
        };

        wsRef.current.send(JSON.stringify(userMessage));
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
    };
    
    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Main Chat Container - Centered in Remaining Space */}
            <div className="flex-1 p-6 flex justify-center">
                <div className="w-full max-w-4xl">
                    

                    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                        {/* Rest of your chat window code */}
                        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                            <div className="h-[calc(100vh-12rem)] flex flex-col">
                                {/* Chat Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {messages.map((message, index) => (
                                        <div key={index} className={`flex ${message.sender_id === 'agent' ? 'justify-start' : 'justify-end'}`}>
                                            <div className={`max-w-[80%] p-4 rounded-lg ${message.sender_id === 'agent'
                                                ? 'bg-indigo-600 rounded-tl-none'
                                                : 'bg-gray-700 rounded-tr-none'
                                                }`}>
                                                <p className="text-white text-sm">
                                                    {message.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="border-t border-gray-700 p-4">
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                            className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Message Iris..."
                                        />
                                        <button
                                            onClick={sendMessage}
                                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <Navigation />
        </div>
    );
}

