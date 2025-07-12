import React, { useState } from 'react';
import { ChevronLeft, Heart, Share2, MessageCircle, Award, User, Calendar, Tag } from 'lucide-react';
import { ClothingItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';

interface ItemDetailProps {
  item: ClothingItem;
  onNavigate: (page: string, data?: any) => void;
}

export function ItemDetail({ item, onNavigate }: ItemDetailProps) {
  const { user } = useAuth();
  const { addSwapRequest } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');
  const [swapType, setSwapType] = useState<'direct' | 'points'>('direct');

  const conditionColors = {
    'like-new': 'bg-emerald-100 text-emerald-800',
    'excellent': 'bg-blue-100 text-blue-800',
    'good': 'bg-yellow-100 text-yellow-800',
    'fair': 'bg-orange-100 text-orange-800'
  };

  const handleSwapRequest = () => {
    if (!user) {
      onNavigate('login');
      return;
    }

    if (swapType === 'points' && user.points < item.pointsValue) {
      alert('You don\'t have enough points for this item');
      return;
    }

    addSwapRequest({
      requesterId: user.id,
      requesterName: user.name,
      itemId: item.id,
      itemTitle: item.title,
      isPointsRedemption: swapType === 'points',
      pointsOffered: swapType === 'points' ? item.pointsValue : undefined,
      status: 'pending',
      message: swapMessage
    });

    setShowSwapModal(false);
    setSwapMessage('');
    alert('Swap request sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate('browse')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Browse</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={item.images[selectedImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {item.images.length > 1 && (
              <div className="flex space-x-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden ${
                      selectedImageIndex === index ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-bold text-emerald-600">
                  {item.pointsValue} points
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${conditionColors[item.condition]}`}>
                  {item.condition}
                </span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* Item Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Item Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="ml-2 font-medium">{item.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Size:</span>
                  <span className="ml-2 font-medium">{item.size}</span>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-2 font-medium capitalize">{item.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Condition:</span>
                  <span className="ml-2 font-medium capitalize">{item.condition}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Uploader Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Listed by</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.uploaderName}</p>
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Listed {new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {user && user.id !== item.uploaderId && item.isAvailable && (
              <div className="space-y-3">
                <button
                  onClick={() => setShowSwapModal(true)}
                  className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Request Swap</span>
                </button>
                <button
                  onClick={() => {
                    setSwapType('points');
                    setShowSwapModal(true);
                  }}
                  disabled={user.points < item.pointsValue}
                  className="w-full border-2 border-emerald-600 text-emerald-600 py-4 px-6 rounded-xl font-semibold hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Award className="h-5 w-5" />
                  <span>Redeem with Points ({item.pointsValue})</span>
                </button>
                {user.points < item.pointsValue && (
                  <p className="text-sm text-gray-500 text-center">
                    You need {item.pointsValue - user.points} more points to redeem this item
                  </p>
                )}
              </div>
            )}

            {!user && (
              <button
                onClick={() => onNavigate('login')}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Sign In to Request Swap
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {swapType === 'points' ? 'Redeem with Points' : 'Request Swap'}
            </h3>
            
            {swapType === 'direct' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Swap Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSwapType('direct')}
                    className={`p-3 rounded-lg border text-sm font-medium ${
                      swapType === 'direct'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    Direct Swap
                  </button>
                  <button
                    onClick={() => setSwapType('points')}
                    className={`p-3 rounded-lg border text-sm font-medium ${
                      swapType === 'points'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    Use Points
                  </button>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to seller
              </label>
              <textarea
                value={swapMessage}
                onChange={(e) => setSwapMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={swapType === 'points' 
                  ? "Add a message (optional)" 
                  : "Describe what you'd like to offer in exchange..."
                }
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapRequest}
                className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}