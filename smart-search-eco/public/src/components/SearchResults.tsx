
import React from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';

interface SearchResultsProps {
  results: Product[];
  isImageSearch: boolean;
  isLoading: boolean;
  query: string;
  onAddToCart: (product: Product) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isImageSearch,
  isLoading,
  query,
  onAddToCart
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-16 h-16 bg-secondary rounded-full mb-4"></div>
          <div className="h-4 bg-secondary w-3/4 rounded mb-3"></div>
          <div className="h-3 bg-secondary/70 w-1/2 rounded"></div>
        </div>
      </div>
    );
  }

  if (results.length === 0 && (query || isImageSearch)) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p>No results found {isImageSearch ? "for your image" : `for "${query}"`}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {isImageSearch && (
        <div className="text-sm text-muted-foreground mb-2">
          Products similar to your uploaded image:
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
        {results.map((product) => (
          <div 
            key={product.id}
            className="flex p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all cursor-pointer"
          >
            <div className="h-20 w-20 bg-secondary/50 rounded-lg overflow-hidden mr-3">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-muted-foreground">${product.price.toFixed(2)}</div>
              <div className="text-xs mt-1 inline-block px-2 py-1 rounded-full bg-secondary">
                {product.category}
              </div>
              <div className="mt-auto pt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs h-8"
                  onClick={() => onAddToCart(product)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
