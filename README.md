# Jewelry Store - Full Stack Application

A modern jewelry e-commerce platform built with React TypeScript frontend and Node.js Express backend, featuring dynamic pricing based on real-time gold prices.

## 🌟 Live Demo

- **Frontend**: https://renart-case-study-7ipp.vercel.app/
- **Backend API**: https://jewelry-store-backend-wb98.onrender.com/api/v1

## 🚀 Features

### Frontend
- **React TypeScript** with Vite for fast development
- **Tailwind CSS** for responsive styling
- **Swiper.js** carousel with touch/swipe support
- **Dynamic color picker** for jewelry variants
- **Real-time pricing** updates
- **Responsive design** for all devices
- **Loading states** and error handling

### Backend
- **Express.js** REST API
- **Dynamic pricing** based on gold market prices
- **Product filtering** and sorting
- **CORS** configured for production
- **Environment-based** configuration
- **Health check** endpoints

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Axios
- Swiper.js

### Backend
- Node.js + Express
- ES6 Modules
- CORS middleware
- Environment variables

### Deployment
- **Frontend**: Vercel
- **Backend**: Render.com

## 📁 Project Structure

```
jewelry-store/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── models/          # TypeScript interfaces
│   │   └── config/          # Configuration files
│   ├── public/              # Static assets
│   └── dist/                # Build output
├── backend/                 # Node.js Express backend
│   ├── routes/              # API routes
│   ├── controllers/         # Route controllers
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   └── data/                # Mock data
└── docs/                    # Documentation
```

## 🔧 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.development .env
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
GOLD_PRICE_API_KEY=your_api_key_here
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_API_TIMEOUT=10000
VITE_APP_NAME=Jewelry Store
```

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Render.com)
- Connected to GitHub repository
- Auto-deploys on push to main branch
- Environment variables configured in Render dashboard

## 🎯 API Endpoints

### Products
- `GET /api/v1/products` - Get all products with dynamic pricing
- `GET /api/v1/products?sortBy=price&sortOrder=desc` - Sort products
- `GET /api/v1/products?minPrice=100&maxPrice=500` - Filter by price range

### Health Check
- `GET /` - API status and information
- `GET /health` - Health check endpoint

## 💎 Product Features

### Dynamic Pricing Formula
```javascript
price = (popularityScore + 1) * weight * goldPricePerGram
```

### Color Variants
- Yellow Gold
- Rose Gold  
- White Gold

### Filtering & Sorting
- Price range filtering
- Popularity score filtering
- Sort by name, price, popularity
- Ascending/descending order

## 🔒 Security Features

- CORS protection
- Environment variable management
- Input validation
- Error handling
- Rate limiting ready

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly carousel
- Responsive grid layout
- Optimized images
- Fast loading times

## 🚀 Performance Optimizations

- Vite for fast builds
- Code splitting
- Image optimization
- Caching headers
- Minified assets

## 📄 Documentation

- [Deployment Guide](DEPLOYMENT.md)
- [Environment Setup](ENVIRONMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ for modern jewelry e-commerce experience.