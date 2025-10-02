import axios from "axios";

// Environment configuration
const GOLD_PRICE_API_KEY = process.env.GOLD_PRICE_API_KEY;
const FALLBACK_GOLD_PRICE = 65.0; // USD per gram

// Altın fiyatını API'den çek
export const getGoldPrice = async () => {
  try {
    // API key varsa gerçek API'yi kullan, yoksa fallback
    if (!GOLD_PRICE_API_KEY) {
      console.log("💰 Using fallback gold price (no API key provided)");
      return FALLBACK_GOLD_PRICE;
    }

    // Metals API - gerçek zamanlı altın fiyatı (USD/gram)
    const response = await axios.get("https://api.metals.live/v1/spot/gold", {
      headers: {
        Authorization: `Bearer ${GOLD_PRICE_API_KEY}`,
      },
    });

    // API'den gelen fiyat ons başına, gram başına çevir (1 ons = 31.1035 gram)
    const goldPricePerOunce = response.data.price;
    const goldPricePerGram = goldPricePerOunce / 31.1035;

    console.log(`💰 Live gold price: $${goldPricePerGram.toFixed(2)}/gram`);
    return goldPricePerGram;
  } catch (error) {
    console.error("Gold price API error:", error.message);
    console.log(`💰 Using fallback gold price: $${FALLBACK_GOLD_PRICE}/gram`);
    return FALLBACK_GOLD_PRICE;
  }
};
