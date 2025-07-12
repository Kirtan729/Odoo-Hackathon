import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/Layout/Header';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { BrowseItems } from './pages/BrowseItems';
import { ItemDetail } from './pages/ItemDetail';
import { AddItem } from './pages/AddItem';
import { AdminPanel } from './pages/AdminPanel';
import { ClothingItem } from './types';

type Page = 'landing' | 'login' | 'register' | 'dashboard' | 'browse' | 'item-detail' | 'add-item' | 'admin' | 'profile';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>(user ? 'dashboard' : 'landing');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as Page);
    if (data) {
      setSelectedItem(data);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <AuthPage mode="login" onNavigate={handleNavigate} />;
      case 'register':
        return <AuthPage mode="register" onNavigate={handleNavigate} />;
      case 'dashboard':
        return user ? <Dashboard onNavigate={handleNavigate} /> : <LandingPage onNavigate={handleNavigate} />;
      case 'browse':
        return <BrowseItems onNavigate={handleNavigate} />;
      case 'item-detail':
        return selectedItem ? (
          <ItemDetail item={selectedItem} onNavigate={handleNavigate} />
        ) : (
          <BrowseItems onNavigate={handleNavigate} />
        );
      case 'add-item':
        return <AddItem onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPanel onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  // Don't show header on landing page if user is not logged in
  const showHeader = currentPage !== 'landing' || user;

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;