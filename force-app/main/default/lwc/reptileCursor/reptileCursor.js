import { LightningElement } from 'lwc';

export default class ReptileCursor extends LightningElement {
    
  SEGMENT_COUNT = 20;
  segments = [];
  positions = [];
  lines = [];
  mouse = { x: 0, y: 0 };

  connectedCallback() {
    this.segments = Array.from({ length: this.SEGMENT_COUNT }, (_, i) => ({
      id: i,
      style: 'transform: translate3d(0,0,0);'
    }));
    this.positions = this.segments.map(() => ({ x: 0, y: 0 }));
    this.lines = Array.from({ length: this.SEGMENT_COUNT - 1 }, (_, i) => ({
      id: i, x1: 0, y1: 0, x2: 0, y2: 0
    }));

    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    requestAnimationFrame(this.animate.bind(this));
  }

  handleMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  animate() {
    const speed = 0.2;

    this.positions[0].x += (this.mouse.x - this.positions[0].x) * speed;
    this.positions[0].y += (this.mouse.y - this.positions[0].y) * speed;

    for (let i = 1; i < this.SEGMENT_COUNT; i++) {
      this.positions[i].x += (this.positions[i - 1].x - this.positions[i].x) * speed;
      this.positions[i].y += (this.positions[i - 1].y - this.positions[i].y) * speed;
    }

    this.segments = this.segments.map((seg, idx) => {
      const p = this.positions[idx];
      return {
        ...seg,
        style: `transform: translate3d(${p.x}px, ${p.y}px, 0);`
      };
    });

    this.lines = this.lines.map((line, idx) => {
      const a = this.positions[idx];
      const b = this.positions[idx + 1];
      return {
        id: idx,
        x1: a.x + 5,
        y1: a.y + 5,
        x2: b.x + 5,
        y2: b.y + 5
      };
    });

    requestAnimationFrame(this.animate.bind(this));
  }
}



