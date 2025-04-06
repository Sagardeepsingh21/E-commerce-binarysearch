
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface CartIconProps {
  onClick: () => void;
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick, className }) => {
  const { totalItems } = useCart();
  
  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative p-2 transition-colors hover:text-primary",
        className
      )}
      aria-label="Open shopping cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
