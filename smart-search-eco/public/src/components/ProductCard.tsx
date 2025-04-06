
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, className }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card click
    addToCart(product);
  };
  
  return (
    <div 
      className={cn(
        "product-card cursor-pointer animate-fade-in relative group",
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-secondary/50 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Add to cart"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="text-xs font-medium text-muted-foreground mb-1">
          {product.category}
        </div>
        <h3 className="font-medium text-balance">{product.name}</h3>
        <div className="mt-2 font-semibold text-primary">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
