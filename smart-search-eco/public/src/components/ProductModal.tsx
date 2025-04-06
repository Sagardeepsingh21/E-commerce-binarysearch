
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  if (!product) return null;
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
        isOpen 
          ? "opacity-100 pointer-events-auto" 
          : "opacity-0 pointer-events-none"
      )}
    >
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        className={cn(
          "bg-white rounded-2xl shadow-2xl p-0 overflow-hidden max-w-2xl w-full transform transition-all duration-500 max-h-[90vh] flex flex-col",
          isOpen ? "scale-100" : "scale-95"
        )}
      >
        <div className="relative aspect-video bg-secondary/50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="inline-block px-2 py-1 rounded-full bg-secondary text-xs font-medium mb-2">
            {product.category}
          </div>
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <div className="text-xl font-semibold text-primary mt-2">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="mt-4 text-muted-foreground">
            {product.description}
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-sm">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="p-6 border-t border-border">
          <Button 
            className="w-full" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
