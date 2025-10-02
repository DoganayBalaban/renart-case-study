import axios from "axios";

// Altın fiyatını API'den çek
export const getGoldPrice = async () => {
  try {
    // Metals API - gerçek zamanlı altın fiyatı (USD/gram)
    const response = await axios.get("https://api.metals.live/v1/spot/gold");
    // API'den gelen fiyat ons başına, gram başına çevir (1 ons = 31.1035 gram)
    const goldPricePerOunce = response.data.price;
    const goldPricePerGram = goldPricePerOunce / 31.1035;
    return goldPricePerGram;
  } catch (error) {
    console.error("Gold price API error:", error.message);
    // Fallback fiyat (yaklaşık güncel altın fiyatı USD/gram)
    return 65.0;
  }
};
