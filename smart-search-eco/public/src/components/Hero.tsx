
import React from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  onSearchClick: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick, className }) => {
  return (
    <section className={cn(
      "w-full py-20 md:py-32 flex flex-col items-center justify-center text-center px-6",
      className
    )}>
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
        Smart Search Technology
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl animate-slide-in">
        Find products instantly with our binary search algorithm
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-2xl mb-8 animate-slide-in" style={{ animationDelay: '100ms' }}>
        Experience lightning-fast search results and discover exactly what you're looking for, with precision that traditional search can't match.
      </p>
      
      <button 
        onClick={onSearchClick}
        className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all transform hover:-translate-y-1 animate-slide-in shadow-lg hover:shadow-xl"
        style={{ animationDelay: '200ms' }}
      >
        Try Smart Search Now
      </button>
    </section>
  );
};

export default Hero;
