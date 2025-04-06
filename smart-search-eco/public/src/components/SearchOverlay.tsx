
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Image } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Product, ImageSearchResult } from '@/types/product';
import { binarySearch, searchByImage } from '@/utils/search';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import ImageSearchUploader from '@/components/ImageSearchUploader';
import SearchResults from '@/components/SearchResults';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, products }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [selectedAttribute, setSelectedAttribute] = useState<'name' | 'price' | 'category'>('name');
  const [isImageSearch, setIsImageSearch] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageSearchResults, setImageSearchResults] = useState<ImageSearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current && !isImageSearch) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isImageSearch]);

  // Handle text search
  useEffect(() => {
    if (isImageSearch || query.trim() === '') {
      if (!isImageSearch) setResults([]);
      return;
    }

    // Different search based on selected attribute
    if (selectedAttribute === 'name') {
      // For name, we'll sort and use binary search
      const sortedProducts = [...products].sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      const found = binarySearch(
        sortedProducts, 
        query.toLowerCase(), 
        (product, searchTerm) => product.name.toLowerCase().includes(searchTerm)
      );
      
      setResults(found);
    } else if (selectedAttribute === 'price') {
      // For price, we parse and compare numerically
      const price = parseFloat(query);
      if (!isNaN(price)) {
        const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
        
        const found = binarySearch(
          sortedByPrice,
          price,
          (product, searchPrice) => product.price === searchPrice
        );
        
        setResults(found);
      } else {
        setResults([]);
      }
    } else if (selectedAttribute === 'category') {
      // For category, we'll sort by category and use binary search
      const sortedByCategory = [...products].sort((a, b) => 
        a.category.localeCompare(b.category)
      );
      
      const found = binarySearch(
        sortedByCategory,
        query.toLowerCase(),
        (product, searchTerm) => product.category.toLowerCase().includes(searchTerm)
      );
      
      setResults(found);
    }
  }, [query, products, selectedAttribute, isImageSearch]);

  // Handle Escape key to close overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Process image search
  const processImageSearch = (imageData: string) => {
    setIsProcessing(true);
    setResults([]);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        // Call the searchByImage function to get similar products
        const searchResults = searchByImage(products, imageData);
        setImageSearchResults(searchResults);
        
        // Extract products for display
        const productResults = searchResults.map(result => result.product);
        setResults(productResults);
        
        toast({
          title: "Image analysis complete",
          description: `Found ${productResults.length} products similar to your image.`,
        });
      } catch (error) {
        console.error("Error processing image search:", error);
        toast({
          title: "Error analyzing image",
          description: "We couldn't process your image. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  // Reset image search
  const resetImageSearch = () => {
    setIsImageSearch(false);
    setUploadedImage(null);
    setResults([]);
    setImageSearchResults([]);
    setQuery('');
  };

  // Switch between image and text search
  const toggleSearchMode = () => {
    if (isImageSearch) {
      resetImageSearch();
    } else {
      setIsImageSearch(true);
      setQuery('');
      setResults([]);
    }
  };

  // Handle image upload
  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    processImageSearch(imageDataUrl);
  };

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div 
        className={cn(
          "w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 transform transition-all duration-300",
          isOpen ? "scale-100 translate-y-0" : "scale-95 -translate-y-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-4 mb-6">
          {!isImageSearch ? (
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary/30 focus:outline-none"
              />
            </div>
          ) : (
            <ImageSearchUploader
              onUpload={handleImageUpload}
              isProcessing={isProcessing}
              uploadedImage={uploadedImage}
              onReset={resetImageSearch}
            />
          )}
          
          <div className="flex items-center space-x-2">
            {!isImageSearch && (
              <select
                value={selectedAttribute}
                onChange={(e) => setSelectedAttribute(e.target.value as 'name' | 'price' | 'category')}
                className="px-3 py-3 rounded-xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary/30 focus:outline-none"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="category">Category</option>
              </select>
            )}
            
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSearchMode}
              title={isImageSearch ? "Text search" : "Image search"}
              className="h-12 w-12 rounded-xl"
            >
              {isImageSearch ? <Search className="h-5 w-5" /> : <Image className="h-5 w-5" />}
            </Button>
            
            <button
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-secondary/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Search results */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <SearchResults
            results={results}
            isImageSearch={isImageSearch}
            isLoading={isProcessing}
            query={query}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
