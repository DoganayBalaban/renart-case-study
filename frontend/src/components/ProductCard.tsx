import { useState } from "react";
import type { Product, ColorType } from "../types/Product.js";
import ColorPicker from "./ColorPicker.js";
import SimpleImage from "./SimpleImage.js";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<ColorType>("yellow");

  // Popülerlik skorunu 5 üzerinden hesapla (1 ondalık basamak)
  const popularityOutOfFive = (product.popularityScore * 5).toFixed(1);

  // Yıldız gösterimi için
  const renderStars = () => {
    const score = product.popularityScore * 5;
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        <div className="flex text-gold-400 text-sm">
          {"★".repeat(fullStars)}
          {hasHalfStar && <span className="text-gold-300">☆</span>}
          {"☆"
            .repeat(emptyStars)
            .split("")
            .map((star, index) => (
              <span key={index} className="text-gray-300">
                {star}
              </span>
            ))}
        </div>
        <span
          className="text-gray-500 ml-1 font-avenir font-normal"
          style={{ fontSize: "14px" }}
        >
          {popularityOutOfFive}/5
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 overflow-hidden group">
      {/* Product Image */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        <SimpleImage
          src={product.images[selectedColor]}
          alt={`${product.name} - ${selectedColor}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          fallbackText={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name - Montserrat Medium 15px */}
        <h3
          className="font-montserrat font-medium text-gray-900 mb-2"
          style={{ fontSize: "15px" }}
        >
          {product.name}
        </h3>

        {/* Price - Montserrat Regular 15px */}
        <div
          className="font-montserrat font-normal text-gray-900 mb-3"
          style={{ fontSize: "15px" }}
        >
          {product.priceFormatted}
        </div>

        {/* Color Picker */}
        <div className="mb-3">
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">{renderStars()}</div>
      </div>
    </div>
  );
};

export default ProductCard;
