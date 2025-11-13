import { useEffect, useState } from 'react';
import GridAnimation from './GridAnimation';

const MainSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="content content-main">
      <div id="card">
        <div className={`card-inner fade ${isVisible ? 'in' : ''}`}>
          <header>
            <img 
              src="https://cdn.jsdelivr.net/gh/SimonAKing/images/blog/avatar.jpg" 
              width="100" 
              height="100" 
              alt="avatar" 
            />
            <h1 data-translate="name">SimonAKing</h1>
            <h2 id="signature" data-translate="signature">STDIN | Think &gt;&gt; /dev/Mind</h2>
          </header>
          
          <ul>
            <li>
              <a href="blog/" aria-label="Blog">
                <i className="icon icon-bokeyuan"></i>
                <span data-translate="Blog">Blog</span>
              </a>
            </li>
            <li>
              <a href="/blog/weibo/" aria-label="Thoughts">
                <i className="icon icon-biaoqing"></i>
                <span data-translate="Thoughts">Thoughts</span>
              </a>
            </li>
            <li>
              <a href="about/" aria-label="About">
                <i className="icon icon-zhifeiji"></i>
                <span data-translate="About">About</span>
              </a>
            </li>
            <li>
              <a href="gallery/" aria-label="Gallery">
                <i className="icon icon-xiangce"></i>
                <span data-translate="Gallery">Gallery</span>
              </a>
            </li>
            <li>
              <a href="projects/" aria-label="Projects">
                <i className="icon icon-projects"></i>
                <span data-translate="Projects">Projects</span>
              </a>
            </li>
            <li>
              <a href="https://thinking.simonaking.com/" aria-label="Thinking">
                <i className="icon icon-idea"></i>
                <span data-translate="Thinking">Thinking</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <GridAnimation />
    </div>
  );
};

export default MainSection;

