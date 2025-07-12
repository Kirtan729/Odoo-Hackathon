import React from 'react';
import { ArrowRight, Recycle, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ItemCard } from '../components/ItemCard';
import { ClothingItem } from '../types';

interface LandingPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { items } = useApp();
  const featuredItems = items.filter(item => item.featured && item.isApproved);

  const handleItemClick = (item: ClothingItem) => {
    onNavigate('item-detail', item);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Give Your Clothes a 
                <span className="text-emerald-200"> Second Life</span>
              </h1>
              <p className="text-xl lg:text-2xl text-emerald-100 leading-relaxed">
                Join ReWear's community-driven clothing exchange. Swap, redeem, and discover amazing pre-loved fashion while making a positive environmental impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Start Swapping</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onNavigate('browse')}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-emerald-700 transition-all duration-300"
                >
                  Browse Items
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?w=600&h=600&fit=crop"
                  alt="Sustainable fashion"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Recycle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Items Exchanged</p>
                      <p className="text-2xl font-bold text-gray-900">2,847+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How ReWear Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes sustainable fashion accessible through three simple ways to participate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Direct Swaps</h3>
              <p className="text-gray-600 leading-relaxed">
                Exchange your items directly with other community members. Find the perfect match and make a fair trade.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Points System</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn points by listing quality items. Use your points to redeem clothing from our extensive catalog.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                <Recycle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainable Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Every exchange reduces textile waste and promotes circular fashion. Make a difference with every swap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Items
              </h2>
              <p className="text-xl text-gray-600">
                Discover amazing pieces from our community
              </p>
            </div>
            <button
              onClick={() => onNavigate('browse')}
              className="hidden sm:flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredItems.slice(0, 4).map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onItemClick={handleItemClick}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('browse')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Explore More Items</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Join thousands of fashion-forward individuals making a positive impact on the planet, one clothing swap at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('register')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Join ReWear Community
            </button>
            <button
              onClick={() => onNavigate('add-item')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300"
            >
              List Your First Item
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}