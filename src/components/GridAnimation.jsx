import { useEffect, useRef } from 'react';

const GridAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isPhone = /Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(navigator.userAgent);
    const hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');

    class GridAnimationClass {
      constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = {
          direction: options.direction || 'right',
          speed: options.speed || 1,
          borderColor: options.borderColor || 'rgba(255, 255, 255, 0.05)',
          squareSize: options.squareSize || 40,
          hoverFillColor: options.hoverFillColor || 'rgba(255, 255, 255, 0.6)',
          hoverShadowColor: options.hoverShadowColor || 'rgba(255, 255, 255, 0.3)',
          transitionDuration: options.transitionDuration || 200,
          trailDuration: options.trailDuration || 1000,
          specialBlockColor: options.specialBlockColor || 'rgba(255, 100, 100, 0.8)',
          specialHoverColor: options.specialHoverColor || 'rgba(100, 255, 100, 0.8)',
          snakeHeadColor: options.snakeHeadColor || 'rgba(255, 255, 255, 0.9)',
          snakeTailColor: options.snakeTailColor || 'rgba(100, 100, 255, 0.3)',
          snakeGradientStops: options.snakeGradientStops || 5,
          snakeColorDecay: options.snakeColorDecay || 0.7,
          touchSensitivity: options.touchSensitivity || 1,
          vibrationEnabled: options.vibrationEnabled || false,
          ...options
        };

        this.gridOffset = { x: 0, y: 0 };
        this.hoveredSquare = null;
        this.animationFrame = null;
        this.currentOpacity = 0;
        this.targetOpacity = 0;
        this.lastTimestamp = 0;
        this.hoverRadius = 3;
        this.trailSquares = new Map();
        this.specialBlock = null;
        this.specialBlockTimer = null;
        this.isSpecialBlockHovered = false;
        this.snakeBody = [];
        this.shouldGrow = false;
      }

      init() {
        this.resizeCanvas();
        this.setupEventListeners();

        if (isPhone) {
          this.optimizeForMobile();
        }

        this.animate();

        if (isPhone) {
          setTimeout(() => {
            this.createSpecialBlock();
          }, 500);
        } else {
          this.createSpecialBlock();
        }

        document.addEventListener(visibilityChangeEvent, this.handleVisibilityChange.bind(this));
      }

      optimizeForMobile() {
        const ctx = this.canvas.getContext('2d');
        const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
          ctx.fillRect(0, 0, 1, 1);
        }
        const timeTaken = performance.now() - startTime;

        if (timeTaken > 10) {
          this.options.squareSize = Math.max(this.options.squareSize * 1.5, 60);
          this.options.speed *= 0.7;
          this.options.trailDuration *= 0.5;
        } else if (timeTaken > 5) {
          this.options.squareSize = Math.max(this.options.squareSize * 1.2, 50);
          this.options.speed *= 0.8;
        }
      }

      resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;

        this.canvas.width = Math.floor(width * dpr);
        this.canvas.height = Math.floor(height * dpr);

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        this.ctx.scale(dpr, dpr);
      }

      setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());

        if (isPhone) {
          this.setupTouchEvents();
        }

        if (isPhone && typeof window.orientation !== 'undefined') {
          window.addEventListener('orientationchange', () => {
            setTimeout(() => {
              this.resizeCanvas();
              this.createSpecialBlock();
            }, 300);
          });
        }
      }

      setupTouchEvents() {
        let startTouch = null;
        let currentTouch = null;
        let isTouching = false;
        let lastTouchTime = 0;
        let tapCount = 0;

        this.handleTouchStart = (e) => {
          e.preventDefault();
          const now = Date.now();
          if (now - lastTouchTime < 16) return;
          lastTouchTime = now;

          if (e.touches.length === 1) {
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            startTouch = {
              x: touch.clientX - rect.left,
              y: touch.clientY - rect.top,
              time: now
            };
            isTouching = true;
            tapCount++;

            this.handleTouchMove(startTouch.x, startTouch.y);

            if (!this.hoveredSquare) {
              this.targetOpacity = 0.8 * this.options.touchSensitivity;
            }

            if (this.options.vibrationEnabled && navigator.vibrate) {
              navigator.vibrate(10);
            }
          }
        };

        this.handleTouchMoveEvent = (e) => {
          e.preventDefault();
          if (isTouching && e.touches.length === 1) {
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            currentTouch = {
              x: touch.clientX - rect.left,
              y: touch.clientY - rect.top
            };
            this.handleTouchMove(currentTouch.x, currentTouch.y);
          }
        };

        this.handleTouchEndEvent = (e) => {
          e.preventDefault();
          const now = Date.now();

          if (startTouch && now - startTouch.time < 300) {
            tapCount++;
            if (tapCount === 2) {
              this.resetSnake();
              tapCount = 0;
              if (this.options.vibrationEnabled && navigator.vibrate) {
                navigator.vibrate([50, 50, 50]);
              }
              return;
            }
          } else {
            tapCount = 0;
          }

          isTouching = false;
          currentTouch = null;
          startTouch = null;

          this.handleTouchEnd();
        };

        this.handleTouchCancel = (e) => {
          e.preventDefault();
          isTouching = false;
          currentTouch = null;
          startTouch = null;
        };

        this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        this.canvas.addEventListener('touchmove', this.handleTouchMoveEvent, { passive: false });
        this.canvas.addEventListener('touchend', this.handleTouchEndEvent, { passive: false });
        this.canvas.addEventListener('touchcancel', this.handleTouchCancel, { passive: false });
      }

      handleTouchMove(x, y) {
        const gridStartX = Math.floor(this.gridOffset.x / this.options.squareSize) * this.options.squareSize;
        const gridStartY = Math.floor(this.gridOffset.y / this.options.squareSize) * this.options.squareSize;
        const gridX = Math.floor((x + this.gridOffset.x - gridStartX) / this.options.squareSize);
        const gridY = Math.floor((y + this.gridOffset.y - gridStartY) / this.options.squareSize);

        if (this.hoveredSquare?.x === gridX && this.hoveredSquare?.y === gridY) {
          return;
        }

        if (this.hoveredSquare) {
          this.snakeBody.unshift({ x: this.hoveredSquare.x, y: this.hoveredSquare.y });
          if (!this.shouldGrow && this.snakeBody.length > 0) {
            this.snakeBody.pop();
          }
          this.shouldGrow = false;
        }

        this.hoveredSquare = { x: gridX, y: gridY };
        this.targetOpacity = 0.8 * this.options.touchSensitivity;

        if (this.specialBlock && gridX === this.specialBlock.x && gridY === this.specialBlock.y) {
          this.shouldGrow = true;
          this.createSpecialBlock();
          if (this.options.vibrationEnabled && navigator.vibrate) {
            navigator.vibrate(100);
          }
        }
      }

      handleTouchEnd() {
        if (this.hoveredSquare) {
          this.snakeBody.unshift({ x: this.hoveredSquare.x, y: this.hoveredSquare.y });
          if (!this.shouldGrow && this.snakeBody.length > 0) {
            this.snakeBody.pop();
          }
          this.shouldGrow = false;

          const gridStartX = Math.floor(this.gridOffset.x / this.options.squareSize) * this.options.squareSize;
          const gridStartY = Math.floor(this.gridOffset.y / this.options.squareSize) * this.options.squareSize;
          const key = `${this.hoveredSquare.x},${this.hoveredSquare.y}`;
          this.trailSquares.set(key, {
            x: this.hoveredSquare.x * this.options.squareSize + gridStartX,
            y: this.hoveredSquare.y * this.options.squareSize + gridStartY,
            opacity: 0.8
          });
        }

        if (this.hoveredSquare) {
          this.targetOpacity = 0.4;
        }
      }

      resetSnake() {
        this.snakeBody = [];
        this.hoveredSquare = null;
        this.targetOpacity = 0;
        this.trailSquares.clear();
        this.createSpecialBlock();
        if (this.options.vibrationEnabled && navigator.vibrate) {
          navigator.vibrate(200);
        }
      }

      handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gridStartX = Math.floor(this.gridOffset.x / this.options.squareSize) * this.options.squareSize;
        const gridStartY = Math.floor(this.gridOffset.y / this.options.squareSize) * this.options.squareSize;
        const gridX = Math.floor((x + this.gridOffset.x - gridStartX) / this.options.squareSize);
        const gridY = Math.floor((y + this.gridOffset.y - gridStartY) / this.options.squareSize);

        if (this.hoveredSquare?.x === gridX && this.hoveredSquare?.y === gridY) {
          return;
        }

        if (this.hoveredSquare) {
          this.snakeBody.unshift({ x: this.hoveredSquare.x, y: this.hoveredSquare.y });
          if (!this.shouldGrow && this.snakeBody.length > 0) {
            this.snakeBody.pop();
          }
          this.shouldGrow = false;
        }

        this.hoveredSquare = { x: gridX, y: gridY };
        this.targetOpacity = 0.6;

        if (this.specialBlock && gridX === this.specialBlock.x && gridY === this.specialBlock.y) {
          this.shouldGrow = true;
          this.createSpecialBlock();
        }
      }

      handleMouseLeave() {
        if (this.hoveredSquare) {
          const gridStartX = Math.floor(this.gridOffset.x / this.options.squareSize) * this.options.squareSize;
          const gridStartY = Math.floor(this.gridOffset.y / this.options.squareSize) * this.options.squareSize;
          const key = `${this.hoveredSquare.x},${this.hoveredSquare.y}`;
          this.trailSquares.set(key, {
            x: this.hoveredSquare.x * this.options.squareSize + gridStartX,
            y: this.hoveredSquare.y * this.options.squareSize + gridStartY,
            opacity: 0.6
          });
        }
        this.hoveredSquare = null;
        this.targetOpacity = 0;
      }

      createSpecialBlock() {
        if (this.specialBlockTimer) {
          clearTimeout(this.specialBlockTimer);
        }

        const dpr = window.devicePixelRatio || 1;
        const cols = Math.ceil(this.canvas.width / dpr / this.options.squareSize);
        const rows = Math.ceil(this.canvas.height / dpr / this.options.squareSize);

        let blockX, blockY;
        do {
          blockX = Math.floor(Math.random() * (cols - 2)) + 1;
          blockY = Math.floor(Math.random() * (rows - 2)) + 1;
        } while (this.snakeBody.some(segment => segment.x === blockX && segment.y === blockY));

        this.specialBlock = {
          x: blockX,
          y: blockY,
          color: this.options.specialBlockColor,
          initialOffset: { ...this.gridOffset }
        };
      }

      drawGrid() {
        const dpr = window.devicePixelRatio || 1;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const gridStartX = Math.floor(this.gridOffset.x / this.options.squareSize) * this.options.squareSize;
        const gridStartY = Math.floor(this.gridOffset.y / this.options.squareSize) * this.options.squareSize;

        this.ctx.lineWidth = isPhone ? 1 : 0.5;

        if (isPhone) {
          this.ctx.translate(0.5, 0.5);
        }

        // Draw snake body
        this.snakeBody.forEach((segment, index) => {
          const x = Math.round(segment.x * this.options.squareSize + gridStartX - (this.gridOffset.x % this.options.squareSize));
          const y = Math.round(segment.y * this.options.squareSize + gridStartY - (this.gridOffset.y % this.options.squareSize));

          this.ctx.shadowColor = this.options.hoverShadowColor;
          this.ctx.shadowBlur = 15;
          this.ctx.shadowOffsetX = 0;
          this.ctx.shadowOffsetY = 0;

          if (index === 0) {
            this.ctx.fillStyle = this.options.snakeHeadColor;
          } else {
            const decay = Math.pow(this.options.snakeColorDecay, index);
            const headMatch = this.options.snakeHeadColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?\)/);
            const tailMatch = this.options.snakeTailColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?\)/);

            if (headMatch && tailMatch) {
              const hr = parseInt(headMatch[1]);
              const hg = parseInt(headMatch[2]);
              const hb = parseInt(headMatch[3]);
              const ha = headMatch[4] ? parseFloat(headMatch[4]) : 1;

              const tr = parseInt(tailMatch[1]);
              const tg = parseInt(tailMatch[2]);
              const tb = parseInt(tailMatch[3]);
              const ta = tailMatch[4] ? parseFloat(tailMatch[4]) : 1;

              const r = Math.round(hr + (tr - hr) * (1 - decay));
              const g = Math.round(hg + (tg - hg) * (1 - decay));
              const b = Math.round(hb + (tb - hb) * (1 - decay));
              const a = ha + (ta - ha) * (1 - decay);

              this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            } else {
              const opacity = Math.max(0.2, decay);
              this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            }
          }

          this.ctx.fillRect(x, y, this.options.squareSize, this.options.squareSize);

          this.ctx.shadowColor = 'transparent';
          this.ctx.shadowBlur = 0;
        });

        // Draw grid
        for (let x = gridStartX; x < this.canvas.width + this.options.squareSize; x += this.options.squareSize) {
          for (let y = gridStartY; y < this.canvas.height + this.options.squareSize; y += this.options.squareSize) {
            const drawX = Math.round(x - (this.gridOffset.x % this.options.squareSize));
            const drawY = Math.round(y - (this.gridOffset.y % this.options.squareSize));

            const gridX = Math.floor((x - gridStartX) / this.options.squareSize);
            const gridY = Math.floor((y - gridStartY) / this.options.squareSize);

            // Draw special block
            if (this.specialBlock && gridX === this.specialBlock.x && gridY === this.specialBlock.y) {
              this.ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
              this.ctx.shadowBlur = 20;
              this.ctx.fillStyle = this.specialBlock.color;
              this.ctx.fillRect(drawX, drawY, this.options.squareSize, this.options.squareSize);
              this.ctx.shadowColor = 'transparent';
              this.ctx.shadowBlur = 0;
            }

            // Draw hovered square
            if (this.hoveredSquare && gridX === this.hoveredSquare.x && gridY === this.hoveredSquare.y) {
              this.ctx.shadowColor = this.options.hoverShadowColor;
              this.ctx.shadowBlur = 15;
              this.ctx.shadowOffsetX = 0;
              this.ctx.shadowOffsetY = 0;

              const fillColor = this.options.hoverFillColor.replace('0.6', this.currentOpacity.toString());
              this.ctx.fillStyle = fillColor;
              this.ctx.fillRect(drawX, drawY, this.options.squareSize, this.options.squareSize);

              this.ctx.shadowColor = 'transparent';
              this.ctx.shadowBlur = 0;
            }

            // Draw grid lines
            this.ctx.strokeStyle = this.options.borderColor;
            this.ctx.strokeRect(drawX, drawY, this.options.squareSize, this.options.squareSize);
          }
        }

        if (isPhone) {
          this.ctx.translate(-0.5, -0.5);
        }

        // Draw vignette
        const gradient = this.ctx.createRadialGradient(
          this.canvas.width / dpr / 2, this.canvas.height / dpr / 2, 0,
          this.canvas.width / dpr / 2, this.canvas.height / dpr / 2,
          Math.sqrt(Math.pow(this.canvas.width / dpr, 2) + Math.pow(this.canvas.height / dpr, 2)) / 2
        );
        gradient.addColorStop(0, 'rgba(6, 6, 6, 0)');
        gradient.addColorStop(1, '#060606');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);
      }

      updateAnimation(timestamp) {
        if (!this.lastTimestamp) {
          this.lastTimestamp = timestamp;
        }

        const deltaTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;

        // Update opacity
        if (this.currentOpacity !== this.targetOpacity) {
          const alpha = Math.min(deltaTime / this.options.transitionDuration, 1);
          this.currentOpacity = this.currentOpacity + (this.targetOpacity - this.currentOpacity) * alpha;
        }

        // Update trail squares
        for (const [key, square] of this.trailSquares) {
          square.opacity -= deltaTime / this.options.trailDuration;
          if (square.opacity <= 0) {
            this.trailSquares.delete(key);
          }
        }

        // Update grid offset
        const dpr = window.devicePixelRatio || 1;
        const speed = Math.max(isPhone ? this.options.speed * 0.8 : this.options.speed, 0);
        const roundedSpeed = isPhone ? Math.round(speed * 100) / 100 : speed;

        switch (this.options.direction) {
          case 'right':
            this.gridOffset.x = (this.gridOffset.x - roundedSpeed + this.options.squareSize) % this.options.squareSize;
            break;
          case 'left':
            this.gridOffset.x = (this.gridOffset.x + roundedSpeed + this.options.squareSize) % this.options.squareSize;
            break;
          case 'up':
            this.gridOffset.y = (this.gridOffset.y + roundedSpeed + this.options.squareSize) % this.options.squareSize;
            break;
          case 'down':
            this.gridOffset.y = (this.gridOffset.y - roundedSpeed + this.options.squareSize) % this.options.squareSize;
            break;
          case 'diagonal':
            this.gridOffset.x = (this.gridOffset.x - roundedSpeed + this.options.squareSize) % this.options.squareSize;
            this.gridOffset.y = (this.gridOffset.y - roundedSpeed + this.options.squareSize) % this.options.squareSize;
            break;
        }

        // Check if special block is out of bounds
        if (this.specialBlock) {
          const gridStartX = Math.floor(this.gridOffset.x / this.options.squareSize) * this.options.squareSize;
          const gridStartY = Math.floor(this.gridOffset.y / this.options.squareSize) * this.options.squareSize;

          const blockDrawX = Math.round(this.specialBlock.x * this.options.squareSize + gridStartX - (this.gridOffset.x % this.options.squareSize));
          const blockDrawY = Math.round(this.specialBlock.y * this.options.squareSize + gridStartY - (this.gridOffset.y % this.options.squareSize));

          if (blockDrawX < -this.options.squareSize || blockDrawX > this.canvas.width / dpr ||
              blockDrawY < -this.options.squareSize || blockDrawY > this.canvas.height / dpr) {
            this.createSpecialBlock();
          }
        }

        this.drawGrid();
        this.animationFrame = requestAnimationFrame((t) => this.updateAnimation(t));
      }

      animate() {
        this.animationFrame = requestAnimationFrame((t) => this.updateAnimation(t));
      }

      handleVisibilityChange() {
        if (document[hiddenProperty]) {
          if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
          }
        } else {
          if (!this.animationFrame) {
            this.lastTimestamp = 0;
            this.animate();
          }
        }
      }

      destroy() {
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame);
        }

        window.removeEventListener('resize', () => this.resizeCanvas());
        this.canvas.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.removeEventListener('mouseleave', () => this.handleMouseLeave());

        if (isPhone && this.handleTouchStart) {
          this.canvas.removeEventListener('touchstart', this.handleTouchStart);
          this.canvas.removeEventListener('touchmove', this.handleTouchMoveEvent);
          this.canvas.removeEventListener('touchend', this.handleTouchEndEvent);
          this.canvas.removeEventListener('touchcancel', this.handleTouchCancel);
        }

        document.removeEventListener(visibilityChangeEvent, this.handleVisibilityChange.bind(this));

        if (isPhone && typeof window.orientation !== 'undefined') {
          window.removeEventListener('orientationchange', () => {});
        }
      }
    }

    const gridAnimation = new GridAnimationClass(canvas, {
      direction: 'diagonal',
      speed: isPhone ? 0.03 : 0.05,
      borderColor: isPhone ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
      squareSize: isPhone ? 50 : 40,
      hoverFillColor: 'rgba(255, 255, 255, 0.8)',
      hoverShadowColor: 'rgba(255, 255, 255, 0.8)',
      transitionDuration: isPhone ? 150 : 200,
      trailDuration: isPhone ? 2000 : 1500,
      specialBlockColor: 'rgba(100, 255, 152, 0.8)',
      specialHoverColor: 'rgba(29, 202, 29, 0.8)',
      snakeHeadColor: 'rgba(255, 255, 255, 0.95)',
      snakeTailColor: 'rgba(218, 231, 255, 0.25)',
      snakeColorDecay: 0.85,
      touchSensitivity: isPhone ? 1.2 : 1,
      vibrationEnabled: isPhone
    });

    gridAnimation.init();

    return () => {
      gridAnimation.destroy();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="grid-background" 
      id="gridCanvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
};

export default GridAnimation;

