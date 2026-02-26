import { motion } from 'motion/react';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useState } from 'react';
import { FilterDrawer, FilterState } from '../components/FilterDrawer';

interface CategoryScreenProps {
  categoryId: string;
  onBack: () => void;
  onProductClick: (product: Product) => void;
  hasOverlay?: boolean;
}

export function CategoryScreen({ categoryId, onBack, onProductClick, hasOverlay }: CategoryScreenProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ sortBy: 'none', minRating: 0 });

  const categoryProducts = products.filter((p) => p.category === categoryId);
  const categoryName = categoryProducts[0]?.category || categoryId;

  // Apply filters
  let filteredProducts = [...categoryProducts];

  // Filter by rating
  if (filters.minRating > 0) {
    filteredProducts = filteredProducts.filter((p) => p.rating >= filters.minRating);
  }

  // Sort
  if (filters.sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ 
        x: hasOverlay ? -10 : 0,
        scale: hasOverlay ? 0.98 : 1,
        opacity: hasOverlay ? 0.85 : 1,
      }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 bg-background z-30 pb-20"
    >
      {/* App Bar */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h2 className="text-lg capitalize">{categoryName}</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFilterOpen(true)}
          className="p-2 hover:bg-secondary rounded-full"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Products Grid */}
      <div className="p-4 overflow-y-auto h-[calc(100vh-60px-80px)]">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} onClick={() => onProductClick(product)} />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
            <p>No products found</p>
            <button
              onClick={() => setFilters({ sortBy: 'none', minRating: 0 })}
              className="mt-4 text-primary underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={setFilters}
      />
    </motion.div>
  );
}