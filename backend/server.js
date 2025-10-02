import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.route.js";

// Environment configuration
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// CORS origins - support multiple origins
const CORS_ORIGINS = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

const app = express();

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if origin is in allowed list
      if (CORS_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // For production, also allow vercel.app domains
        if (NODE_ENV === "production" && origin.includes("vercel.app")) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint for Render
app.get("/", (req, res) => {
  res.json({
    message: "Jewelry Store API is running!",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    endpoints: {
      products: "/api/v1/products",
      health: "/health",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/products", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`🌐 CORS Origins: ${CORS_ORIGINS.join(", ")}`);
  console.log(`📊 Using mock data from JSON files`);
});
