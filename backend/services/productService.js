import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ürün verilerini dosyadan oku
export const loadProducts = () => {
  try {
    const productsPath = path.join(__dirname, "../data/products.json");
    const productsData = fs.readFileSync(productsPath, "utf8");
    return JSON.parse(productsData);
  } catch (error) {
    throw new Error(`Error loading products: ${error.message}`);
  }
};
