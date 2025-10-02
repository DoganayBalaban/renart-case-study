import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import type { Product } from "../types/Product.js";
import ProductCard from "./ProductCard.js";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);

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
              Showing {Math.min(4, products.length)} of {products.length}
            </span>
          </div>
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="relative px-12">
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={4}
          slidesPerGroup={4}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 24,
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="product-swiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className="h-auto">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg transition-all duration-200">
          <svg
            className="w-5 h-5 text-gray-600"
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

        <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg transition-all duration-200">
          <svg
            className="w-5 h-5 text-gray-600"
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
      </div>
    </div>
  );
};

export default ProductCarousel;
