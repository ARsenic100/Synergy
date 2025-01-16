export interface Stakeholder {
    _id: string;
    name: string;
    role: string;
    organization: string;
    location: {
      state: string;
      district: string;
      address: string;
    };
    contact: {
      email: string;
      phone: string;
    };
    expertise: string[];
    imageUrl?: string;
    connections: Connection[];
    availability: 'available' | 'busy' | 'unavailable';
  }
  
  export interface Connection {
    user: string;
    status: 'pending' | 'accepted' | 'rejected';
    timestamp: string;
  }
  
  export interface ConnectionRequest {
    stakeholderId: string;
    userId: string;
    status: 'pending' | 'accepted' | 'rejected';
    timestamp: string;
  }