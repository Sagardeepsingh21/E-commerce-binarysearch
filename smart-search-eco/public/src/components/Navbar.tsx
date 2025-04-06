
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cn } from "@/lib/utils";

interface NavbarProps {
  onSearchClick: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchClick, className }) => {
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between glass-morphism",
      className
    )}>
      <Link to="/" className="flex items-center space-x-2 group">
        <span className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-semibold transition-all duration-300 group-hover:rotate-12">
          S
        </span>
        <span className="font-semibold text-xl tracking-tight">SmartSearch</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={onSearchClick}
          className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary transition-colors duration-300"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">All Products</Link>
          <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">Categories</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
