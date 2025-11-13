import { useEffect, useState } from 'react';
import GridAnimation from './GridAnimation';
import PortfolioSection from './PortfolioSection';

const MainSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div >
      <div 
        className={`portfolio-fade-in ${isVisible ? 'visible' : ''}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}
      >
        <PortfolioSection />
      </div>

      {/* <GridAnimation /> */}
    </div>
  );
};

export default MainSection;

