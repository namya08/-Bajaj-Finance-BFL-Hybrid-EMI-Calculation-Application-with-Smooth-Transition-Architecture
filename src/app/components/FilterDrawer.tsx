import { motion, AnimatePresence } from 'motion/react';
import { X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
  sortBy: 'price-low' | 'price-high' | 'rating' | 'none';
  minRating: number;
}

export function FilterDrawer({ isOpen, onClose, onApplyFilters }: FilterDrawerProps) {
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('none');
  const [minRating, setMinRating] = useState(0);

  const handleApply = () => {
    onApplyFilters({ sortBy, minRating });
    onClose();
  };

  const handleReset = () => {
    setSortBy('none');
    setMinRating(0);
    onApplyFilters({ sortBy: 'none', minRating: 0 });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-card z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  <h2 className="text-lg">Filters & Sort</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Sort By */}
                <div className="space-y-3">
                  <h3 className="text-sm text-muted-foreground">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'none', label: 'Relevance' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Customer Rating' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as FilterState['sortBy'])}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                          sortBy === option.value
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:bg-secondary'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <h3 className="text-sm text-muted-foreground">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[0, 3, 4].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                          minRating === rating
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:bg-secondary'
                        }`}
                      >
                        {rating === 0 ? 'All' : `${rating}★+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border space-y-2">
                <button
                  onClick={handleApply}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl"
                >
                  Reset All
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
