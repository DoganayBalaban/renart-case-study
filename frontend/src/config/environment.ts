// Environment configuration
export const config = {
  api: {
    baseUrl:
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "10000", 10),
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || "Jewelry Store",
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
    environment: import.meta.env.MODE || "development",
    debug: import.meta.env.VITE_DEBUG === "true",
  },
} as const;

// Type-safe environment variables
export const isDevelopment = config.app.environment === "development";
export const isProduction = config.app.environment === "production";
export const isDebug = config.app.debug;

// Validation
if (!config.api.baseUrl) {
  throw new Error("VITE_API_BASE_URL environment variable is required");
}

// Debug logging (only in development)
if (isDebug && isDevelopment) {
  console.log("🔧 Environment Config:", {
    environment: config.app.environment,
    apiBaseUrl: config.api.baseUrl,
    appName: config.app.name,
    version: config.app.version,
  });
}
