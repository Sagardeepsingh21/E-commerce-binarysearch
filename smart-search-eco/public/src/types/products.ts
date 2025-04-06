
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  features: string[];
  imageColors?: string[]; // Optional array of dominant colors in the image
  imageKeywords?: string[]; // Optional keywords derived from image analysis
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ImageSearchResult {
  product: Product;
  similarityScore: number;
}
