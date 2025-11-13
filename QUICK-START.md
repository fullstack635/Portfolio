# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

That's it! Your website should now be running at `http://localhost:3000` 🎉

## 📦 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |

## 🎯 What You'll See

### Development Mode (`npm run dev`)
- ✅ Instant hot module replacement (changes appear immediately)
- ✅ Source maps for easy debugging
- ✅ Fast refresh without losing state
- ✅ Opens automatically in your browser

### Production Build (`npm run build`)
- ✅ Minified and optimized code
- ✅ Code splitting for faster loads
- ✅ All assets optimized
- ✅ Ready to deploy to any static host

## 🎨 Features to Test

When you run the site, try these interactions:

### On Intro Page
1. **Scroll down** or click "PRESS START" → Page transition
2. **Hover GitHub corner** → Octocat animation
3. **Watch subtitle** → Letter glow animation
4. **See background** → WebGL fluid simulation

### On Main Page
1. **Hover grid cells** → White glow effect
2. **Move mouse around** → Snake trail follows
3. **Collect green blocks** → Snake grows
4. **Double-tap (mobile)** → Reset snake

### Mobile Specific
1. **Swipe up on intro** → Navigate to main
2. **Touch and drag** → Create snake trail
3. **Collect blocks** → Vibration feedback (if enabled)
4. **Double-tap grid** → Reset everything

## 🔧 Common Issues & Solutions

### Port Already in Use
If port 3000 is busy:
```bash
# Vite will automatically use next available port
# Or specify a port in vite.config.js:
export default defineConfig({
  server: { port: 3001 }
})
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload Not Working
```bash
# Restart the dev server
# Press Ctrl+C to stop, then run npm run dev again
```

## 📱 Testing on Mobile

### Local Network Testing
1. Find your local IP (usually shown in Vite output)
2. On your phone, visit `http://YOUR_IP:3000`
3. Make sure your phone is on the same network

### Example:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.100:3000/
```
Use the Network URL on your phone.

## 🚀 Deploying to Production

### Step 1: Build
```bash
npm run build
```

### Step 2: Test Build Locally
```bash
npm run preview
```

### Step 3: Deploy
The `dist/` folder contains your production site. Deploy it to:

**GitHub Pages**
```bash
# After building, push dist/ to gh-pages branch
npm run build
# ... deploy dist/ to gh-pages
```

**Vercel**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
# Drag and drop dist/ folder to Netlify
# Or connect your Git repo
```

**Any Static Host**
```bash
# Just upload the contents of dist/
# Set index.html as the entry point
```

## 💡 Development Tips

### File Structure
```
src/
├── components/     ← React components
│   ├── BackgroundCanvas.jsx
│   ├── GridAnimation.jsx
│   ├── IntroSection.jsx
│   └── MainSection.jsx
├── css/           ← Styles
│   └── style.css
├── App.jsx        ← Main app logic
└── main.jsx       ← Entry point
```

### Making Changes

**Change text/content:**
→ Edit components in `src/components/`

**Change styles:**
→ Edit `src/css/style.css`

**Change animations:**
→ Edit component files or `App.jsx`

**Change config:**
→ Edit `vite.config.js` or component options

### Auto-Save and Reload
Files auto-reload on save:
- ✅ `.jsx` files → Full refresh
- ✅ `.css` files → Instant style update
- ✅ Hot Module Replacement (HMR) enabled

## 📚 Next Steps

1. **Read README-REACT.md** for detailed documentation
2. **Check MIGRATION-SUMMARY.md** for what changed
3. **See OLD-FILES-NOTE.md** for info about original files
4. **Customize** components to make it your own!

## 🎉 Enjoy!

Your website is now running on modern React + Vite stack with:
- ⚡️ Lightning-fast development
- 🔥 Hot module replacement
- 📦 Optimized production builds
- 🎨 All original styles preserved
- 🚀 Ready for deployment

Happy coding! 🎊

