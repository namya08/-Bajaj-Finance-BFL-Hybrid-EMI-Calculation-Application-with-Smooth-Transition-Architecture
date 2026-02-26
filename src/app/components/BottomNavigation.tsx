import { motion } from 'motion/react';
import { Home, ShoppingCart, Heart, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'home' | 'cart' | 'wishlist' | 'profile';
  onTabChange: (tab: 'home' | 'cart' | 'wishlist' | 'profile') => void;
  cartCount: number;
}

export function BottomNavigation({ activeTab, onTabChange, cartCount }: BottomNavigationProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'cart' as const, icon: ShoppingCart, label: 'Cart' },
    { id: 'wishlist' as const, icon: Heart, label: 'Wishlist' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-[428px] mx-auto flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1 px-6 relative"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                {tab.id === 'cart' && cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-[10px]"
                    style={{
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  >
                    {cartCount}
                  </motion.div>
                )}
              </div>
              <span
                className={`text-xs transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
