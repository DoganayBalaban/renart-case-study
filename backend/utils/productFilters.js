// Fiyat aralığına göre filtreleme
export const filterByPrice = (products, minPrice, maxPrice) => {
  if (!minPrice && !maxPrice) return products;

  return products.filter((product) => {
    const price = product.price;
    const minPriceFilter = minPrice ? price >= parseFloat(minPrice) : true;
    const maxPriceFilter = maxPrice ? price <= parseFloat(maxPrice) : true;
    return minPriceFilter && maxPriceFilter;
  });
};

// Popülerlik skoruna göre filtreleme
export const filterByPopularity = (products, minPopularity, maxPopularity) => {
  if (!minPopularity && !maxPopularity) return products;

  return products.filter((product) => {
    const popularity = product.popularityScore;
    const minPopularityFilter = minPopularity
      ? popularity >= parseFloat(minPopularity)
      : true;
    const maxPopularityFilter = maxPopularity
      ? popularity <= parseFloat(maxPopularity)
      : true;
    return minPopularityFilter && maxPopularityFilter;
  });
};

// Ürünleri sırala
export const sortProducts = (products, sortBy = "name", sortOrder = "asc") => {
  return products.sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      case "popularity":
        aValue = a.popularityScore;
        bValue = b.popularityScore;
        break;
      case "weight":
        aValue = a.weight;
        bValue = b.weight;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    if (sortOrder === "desc") {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    } else {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    }
  });
};
