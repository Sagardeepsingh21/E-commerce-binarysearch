
import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface FeaturedProductsProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  className?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  products, 
  onProductClick,
  className 
}) => {
  return (
    <section className={cn("py-16 px-6", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Featured Products</h2>
          <a href="/products" className="text-primary hover:underline text-sm font-medium">
            View all
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              style={{ 
                opacity: 0,
                animation: 'fade-in 0.5s forwards',
                animationDelay: `${index * 50}ms`
              }}
            >
              <ProductCard 
                product={product} 
                onClick={() => onProductClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
