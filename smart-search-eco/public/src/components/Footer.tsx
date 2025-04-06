
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(
      "py-12 px-6 border-t border-border",
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-semibold">
                S
              </span>
              <span className="font-semibold text-xl tracking-tight">SmartSearch</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Finding products efficiently with binary search technology
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</a></li>
              <li><a href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</a></li>
              <li><a href="/new-arrivals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">New Arrivals</a></li>
              <li><a href="/best-sellers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Best Sellers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</a></li>
              <li><a href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>© 2023 SmartSearch. All rights reserved.</div>
          <div className="mt-4 md:mt-0">Designed with precision.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
