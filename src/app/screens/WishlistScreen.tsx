import { motion } from 'motion/react';
import { Trash2, Star, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { Product } from '../types';

interface WishlistScreenProps {
  onProductClick: (product: Product, fromCategory: string) => void;
}

export function WishlistScreen({ onProductClick }: WishlistScreenProps) {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleRemove = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast.info('Removed from Wishlist', {
      description: productName,
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success('Added to Cart', {
      description: product.name,
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">❤️</div>
          <h2 className="text-xl">Your wishlist is empty</h2>
          <p className="text-muted-foreground">Save items you like for later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl">My Wishlist ({wishlist.length})</h1>
      </div>

      {/* Wishlist Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {wishlist.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-2xl overflow-hidden relative"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div
              onClick={() => onProductClick(product, product.category)}
              className="cursor-pointer"
            >
              <div className="aspect-square bg-secondary/30 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 space-y-2">
                <h3 className="text-sm line-clamp-2 min-h-[40px]">{product.name}</h3>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm text-accent">{product.rating}</span>
                </div>

                <div className="text-base text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="p-3 pt-0 space-y-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(product)}
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRemove(product.id, product.name)}
                className="w-full py-2 px-4 bg-destructive/10 text-destructive rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}