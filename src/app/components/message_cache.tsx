
import { Message } from '../types/message';

class MessageCache {
    private static instance: MessageCache;
    private capacity: number;
    private cache: Map<string, Message[]>;

    private constructor(capacity: number = 50) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    public static getInstance(): MessageCache {
        if (!MessageCache.instance) {
            MessageCache.instance = new MessageCache();
        }
        return MessageCache.instance;
    }

    private set(contactId: string, messages: Message[]) {
        if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value as string;
            this.cache.delete(firstKey);
        }
        this.cache.set(contactId, messages);
    }

    async getMessages(contactId: string): Promise<Message[]> {
        let messages = this.cache.get(contactId);
        if (!messages) {
            messages = await this.fetchFromBackend(contactId);
            this.set(contactId, messages);
        }
        return messages;
    }

    private async fetchFromBackend(contactId: string): Promise<Message[]> {
        const response = await fetch(`http://localhost:8000/messages/${contactId}`);
        return response.json();
    }
}

export const messageCache = MessageCache.getInstance();
