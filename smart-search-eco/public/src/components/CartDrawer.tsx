
import React from 'react';
import { X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  
  // Handle Escape key to close drawer
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Prevent scrolling when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full sm:w-[400px] bg-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-medium">Your Cart</h2>
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-sm text-primary flex items-center"
              >
                Continue shopping <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex border rounded-lg overflow-hidden">
                <div className="h-24 w-24 flex-shrink-0 bg-secondary/30">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Footer with checkout */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            
            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <Button className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
