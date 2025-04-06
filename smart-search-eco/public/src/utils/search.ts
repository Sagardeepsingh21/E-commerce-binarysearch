
import { Product, ImageSearchResult } from "@/types/product";

// Binary search function that returns all matching items
export function binarySearch<T, K>(
  array: T[],
  searchTerm: K,
  comparator: (item: T, term: K) => boolean
): T[] {
  if (array.length === 0) return [];
  
  // First, we'll find any match using binary search
  let left = 0;
  let right = array.length - 1;
  let foundIndex = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (comparator(array[mid], searchTerm)) {
      foundIndex = mid;
      break;
    } else {
      // This is a simplified comparison that works for our use case
      // In a real implementation, you'd need more sophisticated comparison logic
      const stringMid = String(array[mid]).toLowerCase();
      const stringTerm = String(searchTerm).toLowerCase();
      
      if (stringMid < stringTerm) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  
  // If nothing was found with exact binary search, we'll fall back to linear search
  // In a real app, you might use a more sophisticated algorithm or indexing
  if (foundIndex === -1) {
    return array.filter(item => comparator(item, searchTerm));
  }
  
  // If we found one match, look for all neighboring elements that also match
  const results: T[] = [array[foundIndex]];
  
  // Check elements to the left
  let leftIndex = foundIndex - 1;
  while (leftIndex >= 0 && comparator(array[leftIndex], searchTerm)) {
    results.unshift(array[leftIndex]);
    leftIndex--;
  }
  
  // Check elements to the right
  let rightIndex = foundIndex + 1;
  while (rightIndex < array.length && comparator(array[rightIndex], searchTerm)) {
    results.push(array[rightIndex]);
    rightIndex++;
  }
  
  return results;
}

// Sort products by a specific attribute
export function sortProducts(products: Product[], sortBy: keyof Product): Product[] {
  return [...products].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal;
    }
    
    return String(aVal).localeCompare(String(bVal));
  });
}

// Filter products by criteria
export function filterProducts(
  products: Product[],
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    searchTerm?: string;
  }
): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }
    
    // Search term filter
    if (filters.searchTerm && !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}

// Image similarity search based on uploaded image content
export function searchByImage(products: Product[], imageData: string): ImageSearchResult[] {
  // Extract dominant colors from the uploaded image (simplified mock implementation)
  const mockExtractedColors = getMockImageColors(imageData);
  const mockKeywords = getMockImageKeywords(imageData);
  
  console.log("Analyzing image with mock colors:", mockExtractedColors);
  console.log("Extracted keywords:", mockKeywords);
  
  // Calculate similarity scores based on color and keyword matching
  const results = products.map(product => {
    let similarityScore = 0;
    
    // Check for color similarity
    if (product.imageColors) {
      const colorMatches = product.imageColors.filter(color => 
        mockExtractedColors.includes(color)
      ).length;
      
      if (product.imageColors.length > 0) {
        similarityScore += (colorMatches / product.imageColors.length) * 0.5;
      }
    }
    
    // Check for keyword similarity
    if (product.imageKeywords && mockKeywords.length > 0) {
      const keywordMatches = product.imageKeywords.filter(keyword => 
        mockKeywords.includes(keyword)
      ).length;
      
      if (product.imageKeywords.length > 0) {
        similarityScore += (keywordMatches / Math.max(product.imageKeywords.length, 1)) * 0.5;
      }
    } else {
      // For products without imageKeywords, add a small random factor
      similarityScore += Math.random() * 0.3;
    }
    
    return {
      product,
      similarityScore
    };
  });
  
  // Sort by similarity score and return top matches
  return results
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 8); // Return top 8 results
}

// Mock function to extract colors from an image
// In a real implementation, this would use computer vision APIs or libraries
function getMockImageColors(imageData: string): string[] {
  // Mock implementation - in a real app, this would analyze the actual image
  const colors = [
    'red', 'blue', 'green', 'black', 'white', 
    'yellow', 'purple', 'orange', 'brown', 'gray'
  ];
  
  // Randomly select 2-4 colors to simulate image analysis
  const numColors = Math.floor(Math.random() * 3) + 2;
  const selectedColors = [];
  
  for (let i = 0; i < numColors; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    selectedColors.push(colors[randomIndex]);
  }
  
  return selectedColors;
}

// Mock function to extract keywords from an image
function getMockImageKeywords(imageData: string): string[] {
  // Mock implementation - in a real app, this would use image recognition
  const keywords = [
    'shirt', 'pants', 'dress', 'shoes', 'hat', 
    'jacket', 'watch', 'bag', 'sunglasses', 'jewelry',
    'casual', 'formal', 'sport', 'outdoor', 'elegant'
  ];
  
  // Randomly select 3-5 keywords to simulate image analysis
  const numKeywords = Math.floor(Math.random() * 3) + 3;
  const selectedKeywords = [];
  
  for (let i = 0; i < numKeywords; i++) {
    const randomIndex = Math.floor(Math.random() * keywords.length);
    selectedKeywords.push(keywords[randomIndex]);
  }
  
  return selectedKeywords;
}
