export function cursorTrail({ ref, color }) {
  if (!ref?.current) {
    return {
      cleanUp: () => {},
      renderTrailCursor: () => {},
      stopAnimation: () => {},
      startAnimation: () => {},
    };
  }

  const accentValue = getComputedStyle(document.documentElement).getPropertyValue(
    "--accent",
  );
  const accentColor = `hsla(${accentValue ? accentValue.replace(/\s+/g, ",") : "0, 0%, 0%"}, 0.35)`;
  const ctx = ref.current.getContext("2d");

  const animationFeature = {
    friction: 0.5,
    trails: 20,
    size: 40,
    dampening: 0.2,
    tension: 0.98,
  };

  const cursorPosition = {
    x: 0,
    y: 0,
  };

  let running = true;
  let lines = [];

  class Node {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
    }
  }

  class Line {
    constructor({ spring }) {
      this.spring = spring + 0.1 * Math.random() - 0.05;
      this.friction = animationFeature.friction + 0.01 * Math.random() - 0.005;
      this.nodes = [];

      for (let i = 0; i < animationFeature.size; i += 1) {
        const node = new Node();
        node.x = cursorPosition.x;
        node.y = cursorPosition.y;
        this.nodes.push(node);
      }
    }

    update() {
      let spring = this.spring;
      let node = this.nodes[0];

      node.vx += (cursorPosition.x - node.x) * spring;
      node.vy += (cursorPosition.y - node.y) * spring;

      for (let i = 0; i < this.nodes.length; i += 1) {
        node = this.nodes[i];
        if (i > 0) {
          const prev = this.nodes[i - 1];
          node.vx += (prev.x - node.x) * spring;
          node.vy += (prev.y - node.y) * spring;
          node.vx += prev.vx * animationFeature.dampening;
          node.vy += prev.vy * animationFeature.dampening;
        }

        node.vx *= this.friction;
        node.vy *= this.friction;
        node.x += node.vx;
        node.y += node.vy;
        spring *= animationFeature.tension;
      }
    }

    draw() {
      let nodeX = this.nodes[0].x;
      let nodeY = this.nodes[0].y;

      ctx.beginPath();
      ctx.moveTo(nodeX, nodeY);

      for (let i = 1; i < this.nodes.length - 2; i += 1) {
        const current = this.nodes[i];
        const next = this.nodes[i + 1];
        nodeX = 0.5 * (current.x + next.x);
        nodeY = 0.5 * (current.y + next.y);
        ctx.quadraticCurveTo(current.x, current.y, nodeX, nodeY);
      }

      const secondLast = this.nodes[this.nodes.length - 2];
      const last = this.nodes[this.nodes.length - 1];
      ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  function renderAnimation() {
    if (!running) {
      return;
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = color || accentColor;
    ctx.lineWidth = 1;

    for (let i = 0; i < animationFeature.trails; i += 1) {
      const line = lines[i];
      if (line) {
        line.update();
        line.draw();
      }
    }

    window.requestAnimationFrame(renderAnimation);
  }

  function move(event) {
    if (event instanceof MouseEvent) {
      cursorPosition.x = event.clientX;
      cursorPosition.y = event.clientY;
    } else {
      cursorPosition.x = event.touches[0].pageX;
      cursorPosition.y = event.touches[0].pageY;
    }
    event.preventDefault();
  }

  function createLine(event) {
    if (event.touches.length === 1) {
      cursorPosition.x = event.touches[0].pageX;
      cursorPosition.y = event.touches[0].pageY;
    }
  }

  function populateLines() {
    lines = [];
    for (let i = 0; i < animationFeature.trails; i += 1) {
      lines.push(new Line({ spring: 0.45 + (i / animationFeature.trails) * 0.025 }));
    }
  }

  function onMouseMove(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchstart", onMouseMove);
    document.addEventListener("mousemove", move, { passive: false });
    document.addEventListener("touchmove", createLine, { passive: false });
    document.addEventListener("touchstart", createLine, { passive: false });
    move(event);
    populateLines();
    renderAnimation();
  }

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }

  function stopAnimation() {
    running = false;
  }

  function startAnimation() {
    if (!running) {
      running = true;
      renderAnimation();
    }
  }

  function renderTrailCursor() {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchstart", onMouseMove);
    window.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("focus", startAnimation);
    window.addEventListener("blur", stopAnimation);
    resizeCanvas();
  }

  function cleanUp() {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("touchmove", createLine);
    document.removeEventListener("touchstart", createLine);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchstart", onMouseMove);
    window.removeEventListener("orientationchange", resizeCanvas);
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("focus", startAnimation);
    window.removeEventListener("blur", stopAnimation);
  }

  return { cleanUp, renderTrailCursor, stopAnimation, startAnimation };
}

