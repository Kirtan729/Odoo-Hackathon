import React, { useState } from 'react';
import { Check, X, Eye, Trash2, Users, Package, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { ClothingItem } from '../types';

interface AdminPanelProps {
  onNavigate: (page: string, data?: any) => void;
}

export function AdminPanel({ onNavigate }: AdminPanelProps) {
  const { user } = useAuth();
  const { items, updateItem } = useApp();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel</p>
        </div>
      </div>
    );
  }

  const pendingItems = items.filter(item => !item.isApproved);
  const approvedItems = items.filter(item => item.isApproved);
  const totalUsers = 156; // Mock data
  const totalSwaps = 89; // Mock data

  const handleApprove = (itemId: string) => {
    updateItem(itemId, { isApproved: true });
  };

  const handleReject = (itemId: string) => {
    updateItem(itemId, { isApproved: false, isAvailable: false });
  };

  const handleViewItem = (item: ClothingItem) => {
    onNavigate('item-detail', item);
  };

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'Total Items',
      value: items.length,
      icon: Package,
      color: 'bg-emerald-500'
    },
    {
      label: 'Pending Approval',
      value: pendingItems.length,
      icon: AlertTriangle,
      color: 'bg-orange-500'
    },
    {
      label: 'Total Swaps',
      value: totalSwaps,
      icon: Check,
      color: 'bg-green-500'
    }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending Approval', count: pendingItems.length },
    { id: 'approved', label: 'Approved Items', count: approvedItems.length }
  ];

  const currentItems = activeTab === 'pending' ? pendingItems : approvedItems;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage items and moderate content</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center ${
                    activeTab === tab.id
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {currentItems.length > 0 ? (
              <div className="space-y-4">
                {currentItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description.substring(0, 100)}...</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>by {item.uploaderName}</span>
                          <span>•</span>
                          <span>{item.pointsValue} points</span>
                          <span>•</span>
                          <span>{item.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewItem(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        
                        {activeTab === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleReject(item.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        
                        {activeTab === 'approved' && (
                          <button
                            onClick={() => handleReject(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} items
                </h3>
                <p className="text-gray-500">
                  {activeTab === 'pending' 
                    ? 'All items have been reviewed' 
                    : 'No approved items yet'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}