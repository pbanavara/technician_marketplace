// Base message interface with common properties
export interface BaseMessage {
    id?: string;
    timestamp: string;
    sender_id: string;
    receiver_id: string;
    user_type: string;
    content: string;
}

// User to Agent message
export interface UserMessage extends BaseMessage {
    type: 'user_message';
    content: string;
}

// Agent to User message
export interface AgentMessage extends BaseMessage {
    type: 'agent_message';
    agent_response: string;
}

export interface InitMessage extends BaseMessage {
    type: 'init';
    is_first_login: boolean;
    onboarding_data?: string;
}

// Action messages for specific operations
export interface ActionMessage extends BaseMessage {
    type: 'action';
    action: {
        name: 'map_contact' | 'search' | 'confirm_contact' | 'init';
        payload: Record<string, unknown>;
    }
}

export type Message = UserMessage | AgentMessage | ActionMessage | InitMessage | BaseMessage;
