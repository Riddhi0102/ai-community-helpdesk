export interface UserProfile {
  userId: string;
  demographics: {
    age: number;
    location: { state: string; district: string; pincode?: string; };
    incomeCategory: 'bpl' | 'apl' | 'middle' | 'not_specified';
    occupation?: string;
  };
  preferences: {
    language: string; 
    communicationStyle: 'simple' | 'detailed' | 'technical';
    accessibilityNeeds: ('screen_reader' | 'keyboard_only' | 'high_contrast')[];
  };
  serviceHistory: string[];
  createdAt: Date;
}

export interface ServiceInformation {
  serviceId: string;
  name: string;
  description: string;
  category: 'information' | 'application' | 'emergency' | 'navigation';
  eligibilityCriteria: {
    minAge?: number;
    allowedIncomeCategories: ('bpl' | 'apl' | 'middle' | 'not_specified')[];
    requiredDistrict?: string;
  };
  requiredDocuments: string[];
  applicationProcess: string[];
  deadline: string;
  contactInformation: { phone: string; email: string; office: string; };
  multilingual: {
    [languageCode: string]: { name: string; description: string; process: string[]; };
  };
  lastUpdated: string;
  verified: boolean;
}

export interface Entity {
  type: 'location' | 'scheme_type' | 'identity_document' | 'action_type';
  value: string;
  confidence: number;
}

export interface ConversationContext {
  sessionId: string;
  language: string;
  extractedEntities: Entity[];
  conversationHistory: { sender: 'user' | 'system'; text: string; timestamp: Date }[];
}