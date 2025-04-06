
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import SearchBanner from '@/components/SearchBanner';
import Footer from '@/components/Footer';
import SearchOverlay from '@/components/SearchOverlay';
import ProductModal from '@/components/ProductModal';
import CartIcon from '@/components/CartIcon';
import CartDrawer from '@/components/CartDrawer';
import { products } from '@/data/products';
import { Product } from '@/types/product';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const handleToggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen">
      <Navbar onSearchClick={handleOpenSearch} />
      
      <div className="fixed top-20 right-6 z-30">
        <CartIcon onClick={handleToggleCart} />
      </div>
      
      <main>
        <Hero onSearchClick={handleOpenSearch} className="pt-24" />
        
        <FeaturedProducts 
          products={products.slice(0, 8)} 
          onProductClick={handleProductClick}
        />
        
        <SearchBanner onSearchClick={handleOpenSearch} />
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

export default Index;
