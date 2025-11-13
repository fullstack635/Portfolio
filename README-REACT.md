# SimonAKing Personal Website - React + Vite Version

This is a React + Vite version of the SimonAKing personal website, migrated from the original HTML/CSS/JS stack.

## 🚀 Features

- ⚡️ Vite for fast development and optimized builds
- ⚛️ React 18 with hooks
- 🎨 All original styles preserved
- 🎬 AnimeJS for smooth animations
- 🖼️ WebGL fluid simulation background
- 📱 Fully responsive and mobile-optimized
- 🎮 Interactive grid animation with snake game

## 📦 Project Structure

```
SimonAKing.github.io/
├── public/                 # Static assets
│   ├── assets/
│   │   └── background.png
│   ├── manifest.json
│   ├── robots.txt
│   ├── CNAME
│   └── ...
├── src/
│   ├── components/        # React components
│   │   ├── BackgroundCanvas.jsx
│   │   ├── GridAnimation.jsx
│   │   ├── IntroSection.jsx
│   │   └── MainSection.jsx
│   ├── css/              # Styles
│   │   └── style.css
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── index.html            # HTML template
├── package.json
├── vite.config.js
└── README-REACT.md
```

## 🛠️ Development

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The development server will start at `http://localhost:3000` (or another available port) and automatically open in your browser.

### Build for Production

```bash
npm run build
```

The optimized production build will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm preview
```

## 🎯 Key Components

### App.jsx
Main application component that manages the page transition between intro and main sections.

### IntroSection.jsx
The landing page with:
- Animated title and subtitle
- WebGL fluid simulation background
- GitHub corner link
- "PRESS START" button

### MainSection.jsx
The main content page with:
- Personal information card
- Navigation links
- Interactive grid animation background

### BackgroundCanvas.jsx
WebGL-powered fluid simulation background effect.

### GridAnimation.jsx
Interactive grid animation with:
- Mouse/touch tracking
- Snake-like trail effect
- Special collectible blocks
- Double-tap to reset (mobile)

## 🎨 Original Features Preserved

All original visual effects and interactions have been preserved:
- ✅ Fluid simulation background
- ✅ Animated text effects
- ✅ Page transition animations
- ✅ Interactive grid with snake effect
- ✅ Mobile touch interactions
- ✅ GitHub corner animation
- ✅ All CSS animations and styles
- ✅ Responsive design
- ✅ PWA manifest

## 📱 Mobile Support

The website is fully optimized for mobile devices with:
- Touch event handling
- Performance optimizations
- Vibration feedback (optional)
- Responsive grid sizing
- Optimized canvas rendering

## 🔧 Configuration

### Vite Config
Edit `vite.config.js` to customize build settings.

### Animation Config
The WebGL simulation config is set in `App.jsx` and can be customized via the `window.config` object.

### Grid Animation Config
Customize grid options in `GridAnimation.jsx`:
- `speed`: Animation speed
- `squareSize`: Grid cell size
- `direction`: Movement direction
- `specialBlockColor`: Color of collectible blocks
- And more...

## 📝 Migration Notes

The following changes were made during migration:

1. **HTML to JSX**: All HTML has been converted to React components
2. **Event Listeners**: Converted to React hooks (useEffect, useState)
3. **Animations**: AnimeJS integrated as a React dependency
4. **Canvas Logic**: WebGL and Canvas 2D code wrapped in React components with proper cleanup
5. **CSS**: Preserved as-is in `src/css/style.css`
6. **Assets**: Moved to `public/` directory for static serving

## 🌐 Deployment

### GitHub Pages

To deploy to GitHub Pages:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your gh-pages branch

### Other Platforms

The `dist/` folder can be deployed to any static hosting platform:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3
- etc.

## 📄 License

This project maintains the same license as the original codebase.

## 👤 Author

**SimonAKing**

- Website: https://simonaking.com
- GitHub: [@SimonAKing](https://github.com/SimonAKing)

---

**Note**: This is a React + Vite migration of the original website. All visual effects and interactions from the original have been preserved.

