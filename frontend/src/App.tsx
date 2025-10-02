import { useState, useEffect } from "react";
import type { Product } from "./types/Product.js";
import { productApi } from "./services/api.js";
import SimpleSwipeCarousel from "./components/SimpleSwipeCarousel.js";
import FilterPanel from "./components/FilterPanel.js";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [goldPrice, setGoldPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (filters?: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number;
    maxPopularity?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.getAllProducts(filters);
      setProducts(response.data);
      setGoldPrice(response.goldPrice);
    } catch (err) {
      console.error("Detailed error:", err);
      setError(
        `Failed to fetch products. Error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (filters: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number;
    maxPopularity?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    fetchProducts(filters);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-avenir">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 font-avenir">
        <div className="flex flex-col items-center justify-center h-screen px-4">
          <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md w-full text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 text-sm mb-6">{error}</p>
            <button
              onClick={() => fetchProducts()}
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-avenir">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <FilterPanel
              onFilterChange={handleFilterChange}
              goldPrice={goldPrice}
            />
          </aside>

          {/* Content */}
          <main className="flex-1">
            <SimpleSwipeCarousel products={products} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
