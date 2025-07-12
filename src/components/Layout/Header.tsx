import React from 'react';
import { Shirt, User, Plus, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate('landing')}
          >
            <Shirt className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">ReWear</span>
          </div>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-500 hover:text-gray-900'
                } pb-1`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('browse')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'browse' 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-500 hover:text-gray-900'
                } pb-1`}
              >
                Browse Items
              </button>
              <button
                onClick={() => onNavigate('add-item')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'add-item' 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-500 hover:text-gray-900'
                } pb-1`}
              >
                List Item
              </button>
              {user.isAdmin && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === 'admin' 
                      ? 'text-emerald-600 border-b-2 border-emerald-600' 
                      : 'text-gray-500 hover:text-gray-900'
                  } pb-1`}
                >
                  Admin
                </button>
              )}
            </nav>
          )}

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-medium">{user.points} points</span>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-emerald-600" />
                      </div>
                    )}
                    <span className="hidden sm:block font-medium">{user.name}</span>
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={() => onNavigate('profile')}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Join ReWear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}