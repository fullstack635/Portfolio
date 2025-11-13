import { useEffect, useRef } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || scriptLoadedRef.current) return;

    let script = null;

    // Wait for next tick to ensure canvas is fully mounted in DOM
    const timeoutId = setTimeout(() => {
      // Verify canvas is accessible
      const canvasElement = document.getElementById('background');
      if (!canvasElement) {
        console.error('Canvas element not found!');
        return;
      }

      console.log('Canvas found, loading background.js...');
      console.log('Canvas dimensions:', canvasElement.clientWidth, 'x', canvasElement.clientHeight);

      // Load the complete background.js fluid simulation
      script = document.createElement('script');
      script.src = '/js/background.js';
      script.async = false;
      
      script.onload = () => {
        scriptLoadedRef.current = true;
        console.log('✅ WebGL fluid simulation loaded');
        
        // Manually trigger initialization since DOMContentLoaded already fired
        // The background.js listens to visibilitychange event, so we dispatch it
        if (typeof Event === 'function') {
          // Create and dispatch a visibility change event to trigger initialization
          const event = new Event(window.visibilityChangeEvent || 'visibilitychange');
          window.dispatchEvent(event);
        } else {
          // Fallback: directly call the init function if it exists
          if (window._initBackground && typeof window._initBackground === 'function') {
            window._initBackground();
          }
        }
        
        console.log('Animation initialized');
      };

      script.onerror = () => {
        console.error('❌ Failed to load background.js');
      };
      
      document.body.appendChild(script);
    }, 100); // Slightly longer delay to ensure canvas is rendered

    return () => {
      // Cleanup
      clearTimeout(timeoutId);
      
      if (window.animationID) {
        cancelAnimationFrame(window.animationID);
        window.animationID = null;
      }
      
      if (script && script.parentNode) {
        document.body.removeChild(script);
      }
      
      scriptLoadedRef.current = false;
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="background"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default BackgroundCanvas;
