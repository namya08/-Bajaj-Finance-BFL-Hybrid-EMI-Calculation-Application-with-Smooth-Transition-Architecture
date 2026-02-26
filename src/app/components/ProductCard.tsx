import { motion } from 'motion/react';
import { Product } from '../types';
import { Star, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success('Added to Cart', {
      description: product.name,
      duration: 2000,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="aspect-square bg-secondary/30 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-3 space-y-2">
        <h3 className="text-sm line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-[#FF9500] text-[#FF9500]" />
          <span className="text-sm text-[#FF9500]">{product.rating}</span>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground line-through">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          <div className="text-base text-green-600">
            EMI from ₹{product.emiPrice.toLocaleString('en-IN')}/mo
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-xl text-sm flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
