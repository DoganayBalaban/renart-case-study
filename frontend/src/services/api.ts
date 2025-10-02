import axios from "axios";
import type { ApiResponse } from "../types/Product.js";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const productApi = {
  getAllProducts: async (params?: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number;
    maxPopularity?: number;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<ApiResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params,
        timeout: 10000, // 10 second timeout
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "API Error:",
          error.response?.status,
          error.response?.statusText
        );
      }
      throw error;
    }
  },
};
