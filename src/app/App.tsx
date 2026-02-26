import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { WishlistScreen } from './screens/WishlistScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { Product } from './types';
import { AnimatePresence } from 'motion/react';

type Screen = 
  | { type: 'home' }
  | { type: 'category'; categoryId: string }
  | { type: 'product'; product: Product; fromCategory: string; fromScreen?: 'category' | 'wishlist' }
  | { type: 'cart' }
  | { type: 'wishlist' }
  | { type: 'profile' };

function AppContent() {
  const [screen, setScreen] = useState<Screen>({ type: 'home' });
  const [activeTab, setActiveTab] = useState<'home' | 'cart' | 'wishlist' | 'profile'>('home');
  const { getCartCount } = useApp();

  const handleTabChange = (tab: 'home' | 'cart' | 'wishlist' | 'profile') => {
    setActiveTab(tab);
    setScreen({ type: tab });
  };

  const handleCategoryClick = (categoryId: string) => {
    setScreen({ type: 'category', categoryId });
  };

  const handleProductClick = (product: Product, fromCategory: string, fromScreen: 'category' | 'wishlist' = 'category') => {
    setScreen({ type: 'product', product, fromCategory, fromScreen });
  };

  const handleBackToCategory = (categoryId: string) => {
    setScreen({ type: 'category', categoryId });
  };

  const handleBackToWishlist = () => {
    setScreen({ type: 'wishlist' });
    setActiveTab('wishlist');
  };

  const handleBackToHome = () => {
    setScreen({ type: 'home' });
    setActiveTab('home');
  };

  const hasProductOverlay = screen.type === 'product';

  return (
    <div className="relative min-h-screen max-w-[428px] mx-auto bg-background">
      {/* Main Content */}
      <AnimatePresence mode="sync">
        {screen.type === 'home' && (
          <HomeScreen
            key="home"
            onCategoryClick={handleCategoryClick}
            onCartClick={() => handleTabChange('cart')}
            onWishlistClick={() => handleTabChange('wishlist')}
          />
        )}

        {(screen.type === 'category' || screen.type === 'product') && (
          <CategoryScreen
            key={screen.type === 'category' ? `category-${screen.categoryId}` : `category-${screen.fromCategory}`}
            categoryId={screen.type === 'category' ? screen.categoryId : screen.fromCategory}
            onBack={handleBackToHome}
            onProductClick={(product) => handleProductClick(product, screen.type === 'category' ? screen.categoryId : screen.fromCategory)}
            hasOverlay={screen.type === 'product'}
          />
        )}

        {screen.type === 'product' && (
          <ProductDetailScreen
            key={`product-${screen.product.id}`}
            product={screen.product}
            onBack={() => handleBackToCategory(screen.fromCategory)}
          />
        )}

        {screen.type === 'cart' && <CartScreen key="cart" />}

        {screen.type === 'wishlist' && (
          <WishlistScreen
            key="wishlist"
            onProductClick={(product, fromCategory) => handleProductClick(product, fromCategory)}
          />
        )}

        {screen.type === 'profile' && <ProfileScreen key="profile" />}
      </AnimatePresence>

      {/* Bottom Navigation - Hide on product detail */}
      {screen.type !== 'product' && screen.type !== 'category' && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          cartCount={getCartCount()}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}