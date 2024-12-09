'use client';
import { useState, useEffect } from 'react';
import { API_URL } from '../config';

interface Contact {
    id: string | null;
    name: string | null;
    lastMessage?: string | null;
    type: 'tenant' | 'agent' | 'landlord';
    email: string | null;
}

interface ContactListProps {
    onSelectContact: (contactId: string | null) => void;
    currentUser: string;
    selectedContact?: string | null;
    userType: string;
}

export default function ContactList({ onSelectContact, currentUser, selectedContact, userType }: ContactListProps) {
    const [contacts, setContacts] = useState<Contact[]>(() => [
        { id: 'agent', name: 'Iris', type: 'agent', email: 'agent@example.com' }
    ]);

    useEffect(() => {
        if (!currentUser) return;
        const fetchContacts = async () => {
            try {
                const response = await
                    fetch(`${API_URL}/landlord/tenants/${currentUser}`);
                const data = await response.json();
                if (data.status === 'success') {
                    setContacts(prev => [...prev, ...data.tenants]);
                }
                
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, [currentUser]);

    return (
        <div className="w-64 bg-gray-800 h-screen overflow-y-auto">
            {contacts.map((contact) => (
                <div
                    key={contact.id}
                    onClick={() => onSelectContact(contact.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-700 ${selectedContact === contact.id ? 'bg-gray-700' : ''
                        }`}
                >
                    <div className="text-white">{contact.name}</div>
                    <div className="text-sm text-gray-400">{contact.type}</div>
                </div>
            ))}
        </div>
    );
}
