import { useState } from "react";

interface ProductFilterPanelProps {
  onFilterChange: (filters: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number;
    maxPopularity?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => void;
  goldPrice: number;
}

const ProductFilterPanel: React.FC<ProductFilterPanelProps> = ({
  onFilterChange,
  goldPrice,
}) => {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minPopularity, setMinPopularity] = useState<string>("");
  const [maxPopularity, setMaxPopularity] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const handleApplyFilters = () => {
    const filters: {
      minPrice?: number;
      maxPrice?: number;
      minPopularity?: number;
      maxPopularity?: number;
      sortBy: string;
      sortOrder: string;
    } = {
      sortBy,
      sortOrder,
    };

    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (minPopularity) filters.minPopularity = parseFloat(minPopularity);
    if (maxPopularity) filters.maxPopularity = parseFloat(maxPopularity);

    onFilterChange(filters);
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinPopularity("");
    setMaxPopularity("");
    setSortBy("name");
    setSortOrder("asc");
    onFilterChange({ sortBy: "name", sortOrder: "asc" });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <h3 className="text-lg font-medium text-gray-900 mb-6 font-avenir">
        Filters
      </h3>

      {/* Gold Price Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Gold Price:</span>
          <span className="ml-2">${goldPrice.toFixed(2)}/gram</span>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
      </div>

      {/* Popularity */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Popularity Score
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            placeholder="Min"
            value={minPopularity}
            onChange={(e) => setMinPopularity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            placeholder="Max"
            value={maxPopularity}
            onChange={(e) => setMaxPopularity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Sort By
        </label>
        <div className="space-y-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
            <option value="weight">Weight</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
        <button
          className="w-full bg-white text-gray-700 py-2 px-4 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProductFilterPanel;
