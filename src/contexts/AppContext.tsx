import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ClothingItem, SwapRequest } from '../types';

interface AppContextType {
  items: ClothingItem[];
  swapRequests: SwapRequest[];
  addItem: (item: Omit<ClothingItem, 'id' | 'createdAt'>) => void;
  updateItem: (id: string, updates: Partial<ClothingItem>) => void;
  addSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt'>) => void;
  updateSwapRequest: (id: string, status: SwapRequest['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockItems: ClothingItem[] = [
  {
    id: 'item1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering and adding a vintage touch to any outfit.',
    category: 'outerwear',
    type: 'jacket',
    size: 'M',
    condition: 'excellent',
    tags: ['vintage', 'denim', 'classic', 'blue'],
    images: ['https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?w=400&h=400&fit=crop'],
    uploaderId: 'user1',
    uploaderName: 'Jane Smith',
    pointsValue: 75,
    isAvailable: true,
    isApproved: true,
    createdAt: '2024-01-20',
    featured: true
  },
  {
    id: 'item2',
    title: 'Summer Floral Dress',
    description: 'Beautiful floral print dress perfect for summer occasions. Lightweight and comfortable fabric.',
    category: 'dresses',
    type: 'midi dress',
    size: 'S',
    condition: 'like-new',
    tags: ['floral', 'summer', 'midi', 'comfortable'],
    images: ['https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?w=400&h=400&fit=crop'],
    uploaderId: 'user2',
    uploaderName: 'Sarah Johnson',
    pointsValue: 60,
    isAvailable: true,
    isApproved: true,
    createdAt: '2024-01-18',
    featured: true
  },
  {
    id: 'item3',
    title: 'Designer Sneakers',
    description: 'High-quality designer sneakers in great condition. Comfortable and stylish for everyday wear.',
    category: 'shoes',
    type: 'sneakers',
    size: '9',
    condition: 'good',
    tags: ['designer', 'comfortable', 'casual', 'white'],
    images: ['https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?w=400&h=400&fit=crop'],
    uploaderId: 'user3',
    uploaderName: 'Mike Wilson',
    pointsValue: 90,
    isAvailable: true,
    isApproved: true,
    createdAt: '2024-01-15',
    featured: true
  },
  {
    id: 'item4',
    title: 'Cozy Knit Sweater',
    description: 'Soft and warm knit sweater perfect for chilly days. Beautiful cable knit pattern.',
    category: 'tops',
    type: 'sweater',
    size: 'L',
    condition: 'excellent',
    tags: ['knit', 'cozy', 'warm', 'cable-knit'],
    images: ['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?w=400&h=400&fit=crop'],
    uploaderId: 'user4',
    uploaderName: 'Emma Davis',
    pointsValue: 55,
    isAvailable: true,
    isApproved: true,
    createdAt: '2024-01-12'
  }
];

const mockSwapRequests: SwapRequest[] = [
  {
    id: 'swap1',
    requesterId: 'user1',
    requesterName: 'Jane Smith',
    itemId: 'item2',
    itemTitle: 'Summer Floral Dress',
    offeredItemId: 'item1',
    offeredItemTitle: 'Vintage Denim Jacket',
    isPointsRedemption: false,
    status: 'pending',
    message: 'Would love to swap my denim jacket for your beautiful dress!',
    createdAt: '2024-01-21'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ClothingItem[]>(mockItems);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>(mockSwapRequests);

  const addItem = (itemData: Omit<ClothingItem, 'id' | 'createdAt'>) => {
    const newItem: ClothingItem = {
      ...itemData,
      id: `item${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setItems(prev => [newItem, ...prev]);
  };

  const updateItem = (id: string, updates: Partial<ClothingItem>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const addSwapRequest = (requestData: Omit<SwapRequest, 'id' | 'createdAt'>) => {
    const newRequest: SwapRequest = {
      ...requestData,
      id: `swap${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSwapRequests(prev => [newRequest, ...prev]);
  };

  const updateSwapRequest = (id: string, status: SwapRequest['status']) => {
    setSwapRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  };

  return (
    <AppContext.Provider value={{
      items,
      swapRequests,
      addItem,
      updateItem,
      addSwapRequest,
      updateSwapRequest
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}