import React from 'react';
import { Heart, Star, MapPin } from 'lucide-react';
import { ClothingItem } from '../types';

interface ItemCardProps {
  item: ClothingItem;
  onItemClick: (item: ClothingItem) => void;
  showUploader?: boolean;
}

export function ItemCard({ item, onItemClick, showUploader = true }: ItemCardProps) {
  const conditionColors = {
    'like-new': 'bg-emerald-100 text-emerald-800',
    'excellent': 'bg-blue-100 text-blue-800',
    'good': 'bg-yellow-100 text-yellow-800',
    'fair': 'bg-orange-100 text-orange-800'
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={() => onItemClick(item)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        {item.featured && (
          <div className="absolute top-3 left-3">
            <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Star className="h-3 w-3 fill-current" />
              <span>Featured</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {item.title}
          </h3>
          <span className="text-lg font-bold text-emerald-600">
            {item.pointsValue} pts
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {item.category}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              Size {item.size}
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${conditionColors[item.condition]}`}>
            {item.condition}
          </span>
        </div>

        {showUploader && (
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>by {item.uploaderName}</span>
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{item.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}