
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ArrowUpDown } from 'lucide-react';

interface FilterSortControlsProps {
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  sortBy: string;
  sortOptions: { value: string; label: string }[];
  onSortChange: (sort: string) => void;
  priceRange: { min: number; max: number } | null;
  onPriceRangeChange: (range: { min: number; max: number } | null) => void;
  onToggleFilters: () => void;
  isFiltersVisible: boolean;
}

const FilterSortControls: React.FC<FilterSortControlsProps> = ({
  selectedCategory,
  categories,
  onCategoryChange,
  sortBy,
  sortOptions,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  onToggleFilters,
  isFiltersVisible
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start md:items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            <span>{isFiltersVisible ? 'Hide Filters' : 'Show Filters'}</span>
          </Button>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 rounded-lg bg-secondary/50 border-none focus:ring-2 focus:ring-primary/30 focus:outline-none text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {isFiltersVisible && (
        <div className="bg-secondary/20 p-4 rounded-lg mb-4 animate-fade-in">
          <h3 className="font-medium mb-3">Filters</h3>
          
          <div className="mb-4">
            <label className="block text-sm mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(category)}
                  className="text-xs capitalize"
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-2">Price Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange?.min || ''}
                onChange={(e) => {
                  const min = parseFloat(e.target.value);
                  const max = priceRange?.max || Infinity;
                  if (!isNaN(min)) {
                    onPriceRangeChange({ min, max });
                  } else {
                    onPriceRangeChange({ min: 0, max });
                  }
                }}
                className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:outline-none text-sm w-24"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange?.max !== Infinity ? priceRange?.max || '' : ''}
                onChange={(e) => {
                  const max = parseFloat(e.target.value);
                  const min = priceRange?.min || 0;
                  if (!isNaN(max)) {
                    onPriceRangeChange({ min, max });
                  } else {
                    onPriceRangeChange({ min, max: Infinity });
                  }
                }}
                className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-primary/30 focus:outline-none text-sm w-24"
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPriceRangeChange(null)}
                className="ml-2 text-xs"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSortControls;
