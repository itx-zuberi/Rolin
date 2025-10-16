# 🚀 SafeFly Deployment Guide

## Platform-Specific Instructions

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Important Notes:**
- Socket.IO may not work properly on Vercel (serverless limitations)
- Remove Socket.IO if not needed, or use a different platform

### **Railway (Full Support)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### **DigitalOcean App Platform**
```bash
# Install doctl
# Follow DigitalOcean deployment guide
# Use the following settings:
# - Build Command: npm run build
# - Run Command: npm run start
# - Node Version: 18.x
```

### **Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
netlify build
netlify deploy --prod
```

## 🔧 **Pre-Deployment Checklist**

### 1. **Environment Variables**
- Set `DATABASE_URL` for production database
- Set `NODE_ENV=production`
- Add any API keys needed

### 2. **Database Setup**
```bash
# Push database schema
npm run db:push

# Generate Prisma client
npm run db:generate
```

### 3. **Build Test**
```bash
# Test production build locally
npm run build
npm start
```

## ⚠️ **Known Issues & Solutions**

### **Socket.IO Issues**
If you're deploying to a serverless platform (Vercel, Netlify):

**Option 1: Remove Socket.IO**
```bash
# Remove socket.io dependencies
npm uninstall socket.io socket.io-client

# Remove socket-related files
rm src/lib/socket.ts
rm server.ts

# Update package.json scripts
"start": "next start"
```

**Option 2: Use WebSocket Alternative**
Replace Socket.IO with native WebSocket or serverless-compatible solution.

### **Database Issues**
- Use managed database service (Railway, PlanetScale, Supabase)
- Update `DATABASE_URL` in production environment
- Run migrations: `npm run db:migrate`

### **Tailwind CSS 4 Issues**
If you encounter CSS compilation errors:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run build
```

## 🌐 **Deployment Commands**

### **Production Build**
```bash
npm run build
npm start
```

### **Database Operations**
```bash
npm run db:push      # Push schema changes
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
```

## 📊 **Monitoring**

### **Health Check**
Your app includes a health endpoint:
```
GET /api/health
```

### **Logs**
```bash
# Local development
tail -f dev.log

# Production logs (platform-specific)
# Vercel: vercel logs
# Railway: railway logs
# DigitalOcean: Check control panel
```

## 🆘 **Troubleshooting**

### **Build Fails**
1. Check Node.js version (>=18.0.0)
2. Clear cache: `rm -rf .next`
3. Reinstall dependencies: `npm install`
4. Check environment variables

### **Runtime Errors**
1. Check database connection
2. Verify environment variables
3. Check platform logs
4. Test API endpoints individually

### **Performance Issues**
1. Enable Next.js optimizations
2. Check database queries
3. Monitor bundle size
4. Enable caching

## 📞 **Support**

For platform-specific issues:
- **Vercel**: support@vercel.com
- **Railway**: support@railway.app
- **DigitalOcean**: support@digitalocean.com

For code-related issues:
- Check GitHub Issues
- Review Next.js documentation
- Test locally first