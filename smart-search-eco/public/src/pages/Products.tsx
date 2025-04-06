
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SearchOverlay from '@/components/SearchOverlay';
import ProductModal from '@/components/ProductModal';
import CartIcon from '@/components/CartIcon';
import CartDrawer from '@/components/CartDrawer';
import FilterSortControls from '@/components/FilterSortControls';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { sortProducts, filterProducts } from '@/utils/search';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name';

const Products = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' }
  ];

  // Apply filters and sorting
  useEffect(() => {
    // First apply filters
    const filtered = filterProducts(products, {
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      minPrice: priceRange?.min,
      maxPrice: priceRange?.max === Infinity ? undefined : priceRange?.max
    });
    
    // Then apply sorting
    let sorted = [...filtered];
    
    switch (sortBy) {
      case 'price-low':
        sorted = sortProducts(filtered, 'price');
        break;
      case 'price-high':
        sorted = sortProducts(filtered, 'price').reverse();
        break;
      case 'name':
        sorted = sortProducts(filtered, 'name');
        break;
      case 'featured':
      default:
        // Featured is the default order (no sorting needed)
        break;
    }
    
    setDisplayedProducts(sorted);
  }, [sortBy, selectedCategory, priceRange]);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
  };

  const handleToggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className="min-h-screen">
      <Navbar onSearchClick={handleOpenSearch} />
      
      <div className="fixed top-20 right-6 z-30">
        <CartIcon onClick={() => setIsCartOpen(true)} />
      </div>
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-semibold mb-4 md:mb-0">All Products</h1>
          </div>
          
          <FilterSortControls
            selectedCategory={selectedCategory}
            categories={categories}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            sortOptions={sortOptions}
            onSortChange={(value) => setSortBy(value as SortOption)}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onToggleFilters={handleToggleFilters}
            isFiltersVisible={isFiltersVisible}
          />
          
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product, index) => (
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
                    onClick={() => handleProductClick(product)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSortBy('featured');
                  setPriceRange(null);
                }}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Overlays */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={handleCloseSearch} 
        products={products}
      />
      
      <ProductModal 
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default Products;
