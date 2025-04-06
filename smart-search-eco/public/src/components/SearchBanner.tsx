
import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBannerProps {
  onSearchClick: () => void;
  className?: string;
}

const SearchBanner: React.FC<SearchBannerProps> = ({ onSearchClick, className }) => {
  return (
    <section className={cn(
      "py-20 px-6 bg-secondary/50 relative overflow-hidden",
      className
    )}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold mb-4">Experience the power of binary search</h2>
          <p className="text-muted-foreground mb-8">
            Our optimized search algorithm finds products in O(log n) time — exponentially faster than traditional methods. Try it yourself.
          </p>
          
          <button 
            onClick={onSearchClick}
            className="inline-flex items-center px-5 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all"
          >
            <Search className="h-5 w-5 mr-2" />
            Try Smart Search
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
        <div className="text-[240px] font-bold text-primary/5">O(log n)</div>
      </div>
    </section>
  );
};

export default SearchBanner;
