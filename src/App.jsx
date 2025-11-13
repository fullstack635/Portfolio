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

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (showIntro) {
      if (html) html.style.overflow = 'hidden';
      if (body) body.style.overflow = 'hidden';
    } else {
      if (html) html.style.overflow = '';
      if (body) body.style.overflow = '';
    }

    return () => {
      if (html) html.style.overflow = '';
      if (body) body.style.overflow = '';
    };
  }, [showIntro]);

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

    // Animate intro section out with fade
    const intro = introRef.current;

    if (intro) {
      anime({
        targets: intro,
        duration: 800,
        easing: 'easeInOutQuad',
        opacity: [1, 0],
        scale: [1, 0.95],
        complete: () => {
          setShowIntro(false);
          setShowMain(true);
        }
      });
    }
  };

  return (
    <main>
      {showIntro && (
        <div ref={introRef}>
          <IntroSection onEnter={handleEnter} />
        </div>
      )}
      
      {showMain && <MainSection />}
    </main>
  );
}

export default App;

