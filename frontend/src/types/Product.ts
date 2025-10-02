export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  goldPricePerGram: number;
  price: number;
  priceFormatted: string;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}

export interface ApiResponse {
  success: boolean;
  count: number;
  goldPrice: number;
  filters?: {
    minPrice: string | null;
    maxPrice: string | null;
    minPopularity: string | null;
    maxPopularity: string | null;
    sortBy: string;
    sortOrder: string;
  };
  data: Product[];
}

export type ColorType = "yellow" | "rose" | "white";
