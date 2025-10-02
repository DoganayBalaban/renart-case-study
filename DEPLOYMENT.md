# Deployment Guide

## Render.com Backend Deployment

### Prerequisites
- GitHub repository with your code
- Render.com account

### Deployment Steps

#### 1. Prepare Repository
```bash
# Ensure all files are committed
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

#### 2. Deploy on Render

**Option A: Using render.yaml (Recommended)**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and deploy

**Option B: Manual Setup**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `jewelry-store-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free (or paid for better performance)

#### 3. Environment Variables
Set these in Render Dashboard → Service → Environment:

```bash
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.onrender.com
GOLD_PRICE_API_KEY=your_api_key_here  # Optional
```

#### 4. Custom Domain (Optional)
- Go to Settings → Custom Domains
- Add your domain and configure DNS

### Mock Data Deployment

✅ **Good News**: Mock data deploys automatically!

- `backend/data/products.json` is included in the deployment
- No database setup required
- Data is served directly from JSON files
- Fast and reliable

### API Endpoints

After deployment, your API will be available at:
```
https://your-service-name.onrender.com/api/v1/products
```

### Health Checks

Render automatically monitors these endpoints:
- `GET /` - API information
- `GET /health` - Health status
- `GET /api/v1/products` - Products endpoint

### Troubleshooting

#### Common Issues:

1. **Build Fails**
   ```bash
   # Check Node.js version in package.json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

2. **CORS Errors**
   ```bash
   # Update CORS_ORIGIN environment variable
   CORS_ORIGIN=https://your-frontend-domain.com
   ```

3. **API Key Issues**
   ```bash
   # Gold price API is optional
   # App works with fallback price if no API key
   ```

#### Logs
- View logs in Render Dashboard → Service → Logs
- Real-time monitoring available

### Performance Tips

1. **Free Tier Limitations**:
   - Service sleeps after 15 minutes of inactivity
   - Cold start takes ~30 seconds
   - 750 hours/month limit

2. **Upgrade Benefits**:
   - No sleep mode
   - Faster performance
   - More memory/CPU

### Frontend Integration

Update your frontend environment variables:
```bash
# frontend/.env.production
VITE_API_BASE_URL=https://your-backend-service.onrender.com/api/v1
```

### Monitoring

- **Uptime**: Render provides uptime monitoring
- **Logs**: Real-time log streaming
- **Metrics**: CPU, memory, and request metrics
- **Alerts**: Email notifications for issues

### Scaling

- **Horizontal**: Multiple instances (paid plans)
- **Vertical**: More CPU/memory (paid plans)
- **Auto-scaling**: Based on traffic (enterprise)

## Vercel Frontend Deployment

### Prerequisites
- GitHub repository with your code
- Vercel account

### Deployment Steps

#### 1. Prepare Repository
```bash
# Ensure all files are committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### 2. Deploy on Vercel

**Option A: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: jewelry-store-frontend
# - Directory: ./
# - Override settings? No
```

**Option B: Vercel Dashboard**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### 3. Environment Variables
Set these in Vercel Dashboard → Project → Settings → Environment Variables:

```bash
VITE_API_BASE_URL=https://your-backend-service.onrender.com/api/v1
VITE_API_TIMEOUT=15000
VITE_APP_NAME=Jewelry Store
VITE_APP_VERSION=1.0.0
VITE_DEBUG=false
```

#### 4. Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain
- Configure DNS records

### Vercel Features

#### ✅ Automatic Benefits:
- **Global CDN**: Worldwide edge locations
- **Automatic HTTPS**: SSL certificates
- **Git Integration**: Auto-deploy on push
- **Preview Deployments**: Branch previews
- **Analytics**: Performance insights

#### 🚀 Performance:
- **Edge Functions**: Server-side logic
- **Image Optimization**: Automatic WebP conversion
- **Bundle Analysis**: Size optimization
- **Caching**: Intelligent cache headers

### Frontend-Backend Integration

#### Update CORS in Backend:
```bash
# In backend environment variables
CORS_ORIGIN=https://your-frontend-domain.vercel.app,http://localhost:5173
```

#### Test Integration:
1. Deploy backend to Render first
2. Get backend URL
3. Update frontend environment variables
4. Deploy frontend to Vercel
5. Test API calls

### Monitoring & Analytics

#### Vercel Analytics:
- Real User Monitoring (RUM)
- Core Web Vitals
- Page load performance
- User experience metrics

#### Error Tracking:
- Runtime error monitoring
- Build failure notifications
- Performance alerts

## Complete Deployment Flow

### 1. Backend (Render.com)
```bash
# Deploy backend first
git push origin main
# → Render auto-deploys via render.yaml
# → Get backend URL: https://jewelry-store-backend.onrender.com
```

### 2. Frontend (Vercel)
```bash
# Update frontend environment
# Set VITE_API_BASE_URL to backend URL
cd frontend
vercel
# → Frontend deployed: https://jewelry-store-frontend.vercel.app
```

### 3. Update CORS
```bash
# Update backend CORS_ORIGIN environment variable
CORS_ORIGIN=https://jewelry-store-frontend.vercel.app
```

### 4. Test & Monitor
- Test all functionality end-to-end
- Monitor logs and performance
- Set up alerts for issues

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel  
3. 🔧 Configure environment variables
4. 🧪 Test end-to-end functionality
5. 📊 Set up monitoring and alerts
6. 🌐 Configure custom domains (optional)