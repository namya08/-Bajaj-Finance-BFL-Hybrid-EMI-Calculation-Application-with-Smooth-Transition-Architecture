import { motion } from 'motion/react';
import { Search, ShoppingCart, Heart } from 'lucide-react';
import { categories } from '../data';
import { Category } from '../types';
import { useApp } from '../context/AppContext';

interface HomeScreenProps {
  onCategoryClick: (categoryId: string) => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
}

export function HomeScreen({ onCategoryClick, onCartClick, onWishlistClick }: HomeScreenProps) {
  const { getCartCount, wishlist } = useApp();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* App Bar */}
      <div className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl">Bajaj Finserv</h1>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onWishlistClick}
              className="relative p-2"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-xs rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onCartClick}
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-xs rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-input-background text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="p-4">
        <h2 className="mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <CategoryTile
              key={category.id}
              category={category}
              onClick={() => onCategoryClick(category.id)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CategoryTileProps {
  category: Category;
  onClick: () => void;
  delay: number;
}

function CategoryTile({ category, onClick, delay }: CategoryTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="bg-card rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer"
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        minHeight: '140px',
      }}
    >
      <div className="text-5xl">{category.icon}</div>
      <span className="text-sm text-center">{category.name}</span>
    </motion.div>
  );
}
