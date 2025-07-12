export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  joinedDate: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
  type: string;
  size: string;
  condition: 'like-new' | 'excellent' | 'good' | 'fair';
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  pointsValue: number;
  isAvailable: boolean;
  isApproved: boolean;
  createdAt: string;
  featured?: boolean;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  itemId: string;
  itemTitle: string;
  offeredItemId?: string;
  offeredItemTitle?: string;
  isPointsRedemption: boolean;
  pointsOffered?: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}