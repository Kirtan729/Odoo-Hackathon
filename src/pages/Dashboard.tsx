import React from 'react';
import { Plus, TrendingUp, Package, Repeat, Award, Calendar, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { ItemCard } from '../components/ItemCard';
import { ClothingItem } from '../types';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();
  const { items, swapRequests } = useApp();

  if (!user) return null;

  const userItems = items.filter(item => item.uploaderId === user.id);
  const userSwaps = swapRequests.filter(req => req.requesterId === user.id);
  const pendingSwaps = userSwaps.filter(swap => swap.status === 'pending');
  const completedSwaps = userSwaps.filter(swap => swap.status === 'completed');

  const handleItemClick = (item: ClothingItem) => {
    onNavigate('item-detail', item);
  };

  const stats = [
    {
      label: 'Total Points',
      value: user.points,
      icon: Award,
      color: 'bg-emerald-500',
      change: '+12 this week'
    },
    {
      label: 'Items Listed',
      value: userItems.length,
      icon: Package,
      color: 'bg-blue-500',
      change: `${userItems.filter(item => item.isAvailable).length} available`
    },
    {
      label: 'Active Swaps',
      value: pendingSwaps.length,
      icon: Repeat,
      color: 'bg-orange-500',
      change: 'awaiting response'
    },
    {
      label: 'Completed Swaps',
      value: completedSwaps.length,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: 'all time'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Here's what's happening with your sustainable fashion journey
              </p>
            </div>
            <button
              onClick={() => onNavigate('add-item')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="h-5 w-5" />
              <span>List New Item</span>
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-emerald-600" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>{user.points} points earned</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Your Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Items</h2>
                <button
                  onClick={() => onNavigate('add-item')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
              </div>
              
              {userItems.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {userItems.slice(0, 4).map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onItemClick={handleItemClick}
                      showUploader={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
                  <p className="text-gray-500 mb-4">Start listing your unused clothing to earn points</p>
                  <button
                    onClick={() => onNavigate('add-item')}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    List Your First Item
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            {/* Pending Swaps */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Swaps</h2>
              {pendingSwaps.length > 0 ? (
                <div className="space-y-3">
                  {pendingSwaps.map((swap) => (
                    <div key={swap.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{swap.itemTitle}</h4>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{swap.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(swap.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Repeat className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No pending swaps</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('browse')}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium">Browse Items</span>
                  </div>
                </button>
                <button
                  onClick={() => onNavigate('add-item')}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <Plus className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">List New Item</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}