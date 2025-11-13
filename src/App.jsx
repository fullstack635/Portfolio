import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import IntroSection from './components/IntroSection';
import MainSection from './components/MainSection';
import './css/style.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [animatingTransition, setAnimatingTransition] = useState(false);
  const introRef = useRef(null);
  const shapeWrapRef = useRef(null);
  const shapeRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    // Set up global variables needed by background.js and main.js
    window.hiddenProperty = 'hidden' in document ? 'hidden' : 
                            'webkitHidden' in document ? 'webkitHidden' : 
                            'mozHidden' in document ? 'mozHidden' : null;
    
    window.visibilityChangeEvent = window.hiddenProperty ? 
                                    window.hiddenProperty.replace(/hidden/i, 'visibilitychange') : 
                                    'visibilitychange';
    
    window.isPhone = /Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(navigator.userAgent);
    
    window.DIRECTIONS = {
      UP: 'UP',
      DOWN: 'DOWN',
      LEFT: 'LEFT',
      RIGHT: 'RIGHT',
      UNDIRECTED: 'UNDIRECTED'
    };
    
    // Utility selector function
    window.$ = (selector) => document.querySelector(selector);
    
    // Initialize switchPage variable (needed by background.js)
    window.switchPage = { switched: false };
    
    // Set up global config
    window.config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 1,
      VELOCITY_DISSIPATION: 0.2,
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,
      SPLAT_RADIUS: 0.25,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLORFUL: true,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      BACK_COLOR: { r: 30, g: 31, b: 33 },
      TRANSPARENT: false,
      BLOOM: true,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.4,
      BLOOM_THRESHOLD: 0.8,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: true,
      SUNRAYS_RESOLUTION: 196,
      SUNRAYS_WEIGHT: 1.0,
    };
    
    // Set subtitle and signature for main.js
    window.subtitle = "Front back left right end engineer";
    window.signature = "STDIN | Think >> /dev/Mind";

    // Handle scroll event
    const handleScroll = (e) => {
      if (showIntro && !animatingTransition) {
        const deltaY = e.deltaY || -1 * e.wheelDelta || e.detail;
        if (deltaY > 0) {
          handleEnter();
        }
      }
    };

    // Handle touch swipe up
    let startY = 0;
    const handleTouchStart = (e) => {
      startY = e.touches[0].pageY;
    };

    const handleTouchEnd = (e) => {
      if (showIntro && !animatingTransition) {
        const endY = e.changedTouches[0].pageY;
        const deltaY = startY - endY;
        
        // Swipe up detected
        if (deltaY > 50) {
          handleEnter();
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('mousewheel', handleScroll, { passive: true });
    window.addEventListener('DOMMouseScroll', handleScroll, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousewheel', handleScroll);
      window.removeEventListener('DOMMouseScroll', handleScroll);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [showIntro, animatingTransition]);

  const handleEnter = () => {
    if (animatingTransition) return;
    
    setAnimatingTransition(true);
    
    // Mark page as switched (stops background.js mouse events)
    window.switchPage.switched = true;
    
    // Change background color
    const contentInner = document.querySelector('.content-inner');
    const shape = document.querySelector('.shape');
    if (contentInner) contentInner.style.background = 'unset';
    if (shape) shape.style.fill = '#1e1f21';

    // Animate intro section out
    const intro = introRef.current;
    const shapeWrap = shapeWrapRef.current;
    const shapeSvg = shapeRef.current;
    const path = pathRef.current;

    if (intro && shapeSvg && path) {
      shapeSvg.style.transformOrigin = '50% 0%';

      anime({
        targets: intro,
        duration: 1100,
        easing: 'easeInOutSine',
        translateY: '-200vh',
        complete: () => {
          setShowIntro(false);
          setShowMain(true);
        }
      });

      anime({
        targets: shapeSvg,
        scaleY: [
          { value: [0.8, 1.8], duration: 550, easing: 'easeInQuad' },
          { value: 1, duration: 550, easing: 'easeOutQuad' }
        ]
      });

      anime({
        targets: path,
        duration: 1100,
        easing: 'easeOutQuad',
        d: path.getAttribute('pathdata-id')
      });
    }
  };

  return (
    <main>
      {showIntro && (
        <div ref={introRef}>
          <IntroSection onEnter={handleEnter} />
          <div ref={shapeWrapRef} className="shape-wrap">
            <svg ref={shapeRef} className="shape" width="100%" height="100vh" preserveAspectRatio="none" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
              <path 
                ref={pathRef}
                d="M-44-50C-52.71 28.52 15.86 8.186 184 14.69 383.3 22.39 462.5 12.58 638 14 835.5 15.6 987 6.4 1194 13.86 1661 30.68 1652-36.74 1582-140.1 1512-243.5 15.88-589.5-44-50Z" 
                pathdata-id="M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      
      {showMain && <MainSection />}
    </main>
  );
}

export default App;

