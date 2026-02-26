import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { ArrowLeft, Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetailScreen({ product, onBack }: ProductDetailScreenProps) {
  const [emiMonths, setEmiMonths] = useState(12);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const inWishlist = isInWishlist(product.id);

  // Drag to close functionality
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 300], [1, 0]);
  const shadowOpacity = useTransform(x, [0, 200], [0.15, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 150 || info.velocity.x > 500) {
      onBack();
    }
  };

  const calculateEMI = (months: number) => {
    return Math.round(product.price / months);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to Cart', {
      description: product.name,
      duration: 2000,
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    toast.success('Product added! Redirecting to cart...', {
      duration: 2000,
    });
    setTimeout(() => onBack(), 1000);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Removed from Wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to Wishlist');
    }
  };

  return (
    <>
      {/* Dimmed Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onBack}
        className="fixed inset-0 bg-black/30 z-40"
      />

      {/* Product Detail Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300,
          duration: 0.3,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.2 }}
        onDragEnd={handleDragEnd}
        style={{ 
          x, 
          opacity,
          boxShadow: `-8px 0 24px rgba(0, 0, 0, ${shadowOpacity})`,
        }}
        className="fixed inset-y-0 right-0 w-full max-w-[428px] bg-background z-50 overflow-y-auto pb-24 rounded-l-2xl"
      >
        {/* Swipe Indicator */}
        <div className="absolute top-4 left-4 w-1 h-12 bg-border rounded-full opacity-50" />

        {/* Hero Image */}
        <motion.div
          layoutId={`product-image-${product.id}`}
          className="relative w-full aspect-square bg-secondary/30"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="absolute top-4 left-4 p-3 bg-card/90 backdrop-blur rounded-full shadow-lg z-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className="absolute top-4 right-4 p-3 bg-card/90 backdrop-blur rounded-full shadow-lg"
          >
            <Heart
              className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`}
            />
          </motion.button>
        </motion.div>

        {/* Product Details - Fade in with delay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="p-4 space-y-6"
        >
          {/* Title and Rating */}
          <div className="space-y-2">
            <h1 className="text-xl">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm text-accent">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">4,523 ratings</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl text-primary">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-sm text-muted-foreground line-through">
                ₹{Math.round(product.price * 1.2).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-green-600">
              or EMI from ₹{product.emiPrice.toLocaleString('en-IN')}/month
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm text-muted-foreground">About this product</h3>
            <p className="text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* EMI Calculator */}
          <div className="bg-card rounded-2xl p-4 space-y-4 border border-border">
            <div className="flex items-center justify-between">
              <h3>EMI Calculator</h3>
              <div className="text-primary">
                ₹{calculateEMI(emiMonths).toLocaleString('en-IN')}/mo
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tenure</span>
                <span>{emiMonths} months</span>
              </div>
              <input
                type="range"
                min="6"
                max="24"
                step="6"
                value={emiMonths}
                onChange={(e) => setEmiMonths(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6 months</span>
                <span>12 months</span>
                <span>18 months</span>
                <span>24 months</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span>₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="text-green-600">₹0</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3>Key Features</h3>
            <div className="space-y-2">
              {['No Cost EMI Available', 'Free Delivery', '7 Days Replacement', 'Warranty Included'].map(
                (feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Fixed Bottom Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 max-w-[428px] mx-auto bg-card border-t border-border p-4 space-y-2 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBuyNow}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl"
          >
            Buy Now
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}