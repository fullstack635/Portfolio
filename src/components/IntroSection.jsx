import { useEffect, useState } from 'react';
import BackgroundCanvas from './BackgroundCanvas';

const IntroSection = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [subtitleChars, setSubtitleChars] = useState([]);
  const subtitle = "Front back left right end engineer";

  useEffect(() => {
    // Fade in animation and subtitle characters at the same time
    const timer = setTimeout(() => {
      setIsVisible(true);
      setSubtitleChars(subtitle.split(''));
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="content content-intro">
      <div className="content-inner">
        <BackgroundCanvas />
        <div className={`wrap fade ${isVisible ? 'in' : ''}`}>
          <a 
            className="github-corner" 
            href="https://github.com/SimonAKing/HomePage" 
            aria-label="View source on GitHub" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg width="80" height="80" viewBox="0 0 250 250" style={{ fill: 'transparent', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0 }} aria-hidden="true">
              <path d="M0 0 115 115 130 115 142 142 250 250 250 0Z"></path>
              <path 
                className="octo-arm" 
                d="M128.3 109C113.8 99.7 119 89.6 119 89.6 122 82.7 120.5 78.6 120.5 78.6 119.2 72 123.4 76.3 123.4 76.3 127.3 80.9 125.5 87.3 125.5 87.3 122.9 97.6 130.6 101.9 134.4 103.2" 
                fill="currentColor" 
                style={{ transformOrigin: '130px 106px' }}
              ></path>
              <path 
                className="octo-body" 
                d="M115 115C114.9 115.1 118.7 116.5 119.8 115.4L133.7 101.6C136.9 99.2 139.9 98.4 142.2 98.6 133.8 88 127.5 74.4 143.8 58 148.5 53.4 154 51.2 159.7 51 160.3 49.4 163.2 43.6 171.4 40.1 171.4 40.1 176.1 42.5 178.8 56.2 183.1 58.6 187.2 61.8 190.9 65.4 194.5 69 197.7 73.2 200.1 77.6 213.8 80.2 216.3 84.9 216.3 84.9 212.7 93.1 206.9 96 205.4 96.6 205.1 102.4 203 107.8 198.3 112.5 181.9 128.9 168.3 122.5 157.7 114.1 157.9 116.9 156.7 120.9 152.7 124.9L141 136.5C139.8 137.7 141.6 141.9 141.8 141.8Z" 
                fill="currentColor"
              ></path>
            </svg>
          </a>
          
          <h2 className="content-title">SimonAKing</h2>
          
          <h3 className="content-subtitle" original-content={subtitle}>
            {subtitleChars.length > 0 ? (
              subtitleChars.map((char, index) => (
                <span key={index}>{char}</span>
              ))
            ) : (
              '\u00A0'
            )}
          </h3>
          
          <a className="enter" onClick={onEnter} onTouchStart={onEnter}>PRESS START</a>
          
          <div className="arrow arrow-1"></div>
          <div className="arrow arrow-2"></div>
        </div>
      </div>
      
      <div className="shape-wrap">
        <svg className="shape" width="100%" height="100vh" preserveAspectRatio="none" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M-44-50C-52.71 28.52 15.86 8.186 184 14.69 383.3 22.39 462.5 12.58 638 14 835.5 15.6 987 6.4 1194 13.86 1661 30.68 1652-36.74 1582-140.1 1512-243.5 15.88-589.5-44-50Z" 
            pathdata-id="M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default IntroSection;

