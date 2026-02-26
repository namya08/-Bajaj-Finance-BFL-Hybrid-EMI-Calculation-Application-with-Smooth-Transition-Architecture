import { motion } from 'motion/react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

export function CartScreen() {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useApp();

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.info('Removed from Cart', {
      description: productName,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">🛒</div>
          <h2 className="text-xl">Your cart is empty</h2>
          <p className="text-muted-foreground">Add products to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 sticky top-0 z-10">
        <h1 className="text-xl">Shopping Cart ({cart.length})</h1>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-3">
        {cart.map((item, index) => (
          <motion.div
            key={item.product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-2xl p-4 flex gap-4"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-xl bg-secondary/30"
            />

            <div className="flex-1 space-y-2">
              <h3 className="text-sm line-clamp-2">{item.product.name}</h3>
              
              <div className="space-y-1">
                <div className="text-base text-primary">
                  ₹{item.product.price.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-green-600">
                  EMI ₹{item.product.emiPrice.toLocaleString('en-IN')}/mo
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 bg-secondary rounded-lg">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      updateCartQuantity(item.product.id, item.quantity - 1)
                    }
                    className="p-2"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      updateCartQuantity(item.product.id, item.quantity + 1)
                    }
                    className="p-2"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemove(item.product.id, item.product.name)}
                  className="p-2 text-destructive"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Price Summary - Fixed at bottom */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4 space-y-4 z-10">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GST (18%)</span>
            <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString('en-IN')}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between">
            <span>Total</span>
            <span className="text-xl text-primary">
              ₹{Math.round(getCartTotal() * 1.18).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toast.success('Proceeding to payment...')}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl"
        >
          Proceed to Payment
        </motion.button>
      </div>
    </div>
  );
}
