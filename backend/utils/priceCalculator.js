// Fiyat hesaplama fonksiyonu
export const calculatePrice = (popularityScore, weight, goldPrice) => {
  return (popularityScore + 1) * weight * goldPrice;
};

// Ürünlere fiyat bilgisi ekle
export const addPricesToProducts = (products, goldPrice) => {
  return products.map((product) => ({
    ...product,
    goldPricePerGram: goldPrice,
    price: calculatePrice(product.popularityScore, product.weight, goldPrice),
    priceFormatted: `$${calculatePrice(
      product.popularityScore,
      product.weight,
      goldPrice
    ).toFixed(2)}`,
  }));
};
