import axios from "axios";
import type { ApiResponse } from "../models/product.model";
import { config } from "../config/environment";

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
      const response = await axios.get(`${config.api.baseUrl}/products`, {
        params,
        timeout: config.api.timeout,
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
