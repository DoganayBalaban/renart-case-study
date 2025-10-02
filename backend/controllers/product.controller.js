import { getGoldPrice } from "../services/goldPriceService.js";
import { loadProducts } from "../services/productService.js";
import { addPricesToProducts } from "../utils/priceCalculator.js";
import {
  filterByPrice,
  filterByPopularity,
  sortProducts,
} from "../utils/productFilters.js";

export const getAllProducts = async (req, res) => {
  try {
    // Query parametrelerini al
    const {
      minPrice,
      maxPrice,
      minPopularity,
      maxPopularity,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    // Ürünleri yükle ve altın fiyatını al
    const products = loadProducts();
    const goldPrice = await getGoldPrice();

    // Fiyat hesapla
    let productsWithPrices = addPricesToProducts(products, goldPrice);

    // Filtreleme uygula
    productsWithPrices = filterByPrice(productsWithPrices, minPrice, maxPrice);
    productsWithPrices = filterByPopularity(
      productsWithPrices,
      minPopularity,
      maxPopularity
    );

    // Sıralama uygula
    productsWithPrices = sortProducts(productsWithPrices, sortBy, sortOrder);

    res.status(200).json({
      success: true,
      count: productsWithPrices.length,
      goldPrice: goldPrice,
      filters: {
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        minPopularity: minPopularity || null,
        maxPopularity: maxPopularity || null,
        sortBy,
        sortOrder,
      },
      data: productsWithPrices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};
