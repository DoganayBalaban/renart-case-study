# Environment Configuration

This project uses environment variables for configuration. Follow these steps to set up your environment.

## Frontend Environment Variables

### Setup
1. Copy the example file:
   ```bash
   cp frontend/.env.example frontend/.env
   ```

2. Update the values in `frontend/.env`:
   ```bash
   # API Configuration
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   VITE_API_TIMEOUT=10000

   # App Configuration
   VITE_APP_NAME=Jewelry Store
   VITE_APP_VERSION=1.0.0

   # Development Configuration
   VITE_DEBUG=true
   ```

### Environment Files
- `.env` - Default environment variables
- `.env.development` - Development specific variables
- `.env.production` - Production specific variables
- `.env.example` - Template file (committed to git)

## Backend Environment Variables

### Setup
1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Update the values in `.env`:
   ```bash
   # Backend Configuration
   NODE_ENV=development
   PORT=3000

   # API Configuration
   GOLD_PRICE_API_KEY=your_api_key_here

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

### Note
This project uses **mock data** from JSON files instead of a database. No database configuration is required.

## Important Notes

⚠️ **Security**: Never commit actual `.env` files to git. Only commit `.env.example` files.

✅ **Best Practices**:
- Use different values for development, staging, and production
- Keep sensitive data (API keys) in environment variables
- The application works without API keys using fallback mock data
- All data is served from JSON files, no database required

## Vite Environment Variables

Vite requires the `VITE_` prefix for environment variables to be accessible in the frontend:

```bash
# ✅ Accessible in frontend
VITE_API_BASE_URL=http://localhost:3000

# ❌ Not accessible in frontend
API_BASE_URL=http://localhost:3000
```

## Mock Data Architecture

This application uses a **mock data architecture** instead of a traditional database:

### Data Sources
- **Products**: `backend/data/products.json` - Static product catalog
- **Gold Prices**: Live API with fallback to mock price ($65/gram)
- **No Database**: All data is file-based for simplicity

### Benefits
- **Zero Setup**: No database installation or configuration
- **Fast Development**: Instant startup, no migrations
- **Easy Testing**: Predictable data, easy to modify
- **Deployment Simple**: No database hosting required

### Gold Price API
- **With API Key**: Live gold prices from metals.live API
- **Without API Key**: Uses fallback price of $65/gram
- **Graceful Degradation**: Always works, even if API is down