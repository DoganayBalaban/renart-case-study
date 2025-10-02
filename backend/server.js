import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.route.js";

const app = express();
const port = 3000;

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/v1/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
