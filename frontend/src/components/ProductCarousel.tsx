import { useState } from "react";
import type { Product } from "../models/product.model.js";
import ProductCard from "./ProductCard.js";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 text-sm">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  const goToPrevious = () => {
    if (currentPage > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  // Touch/Swipe handling
  let startX = 0;
  let endX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - go to next
        goToNext();
      } else {
        // Swipe right - go to previous
        goToPrevious();
      }
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-medium text-gray-900 font-avenir">
            Product List
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <span className="text-xs text-gray-400">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons & Carousel Container */}
      <div className="relative px-16">
        {/* Navigation Buttons - Outside and Higher */}
        {totalPages > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={currentPage === 0 || isTransitioning}
              className={`absolute left-0 z-50 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 ${
                currentPage === 0 || isTransitioning
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-110"
              }`}
              style={{ top: "30%", transform: "translateY(-50%)" }}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages - 1 || isTransitioning}
              className={`absolute right-0 z-50 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-200 ${
                currentPage === totalPages - 1 || isTransitioning
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-110"
              }`}
              style={{ top: "30%", transform: "translateY(-50%)" }}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="transition-all duration-300 ease-out touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
            }}
          >
            <div className="flex" style={{ width: `${totalPages * 100}%` }}>
              {Array.from({ length: totalPages }, (_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="flex-shrink-0"
                  style={{ width: `${100 / totalPages}%` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products
                      .slice(
                        pageIndex * itemsPerPage,
                        (pageIndex + 1) * itemsPerPage
                      )
                      .map((product, index) => (
                        <div key={`${pageIndex}-${index}`}>
                          <ProductCard product={product} />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Navigation */}
      {totalPages > 1 && (
        <div className="mt-8 px-16">
          <div className="relative">
            {/* Background Track */}
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              {/* Active Progress */}
              <div
                className="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${((currentPage + 1) / totalPages) * 100}%`,
                }}
              />
            </div>

            {/* Page Indicators */}
            <div className="flex justify-between mt-3">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setCurrentPage(index);
                      setTimeout(() => setIsTransitioning(false), 300);
                    }
                  }}
                  className={`flex flex-col items-center space-y-1 transition-all duration-200 ${
                    currentPage === index
                      ? "text-gray-700"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                ></button>
              ))}
            </div>

            {/* Page Info */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                Showing {currentPage * itemsPerPage + 1}-
                {Math.min((currentPage + 1) * itemsPerPage, products.length)} of{" "}
                {products.length} products
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
