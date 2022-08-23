import p5 from "p5";
import { Vector } from "p5";

class Boundary {
  p: p5;
  a: Vector;
  b: Vector;

  constructor(p: p5, x1: number, y1: number, x2: number, y2: number) {
    this.p = p;
    this.a = p.createVector(x1, y1);
    this.b = p.createVector(x2, y2);
  }

  show() {
    this.p.stroke(255);
    this.p.line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class Ray {
  pos: Vector;
  dir: Vector;
  p: p5;
  constructor(p: p5, pos: Vector, angle: number) {
    this.p = p;
    this.pos = pos;
    this.dir = Vector.fromAngle(angle);
  }

  show() {
    this.p.stroke(255);
    // 将原来的状态配置 存储起来
    this.p.push();
    // 将画布的起始点移动到具体的位置
    this.p.translate(this.pos.x, this.pos.y);
    this.p.line(0, 0, this.dir.x * 10, this.dir.y * 10);
    // 还原状态
    this.p.pop();
  }

  // 指向指定位置
  lookAt(x: number, y: number) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  // 检测两个向量是否相交
  // 1. 判断两个向量是否完全相交
  // 2.
  cast(wall: Boundary) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    // 算出分母
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) {
      return;
    }
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      const pt = this.p.createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
}

class Particle {
  p: p5;
  pos: Vector;
  rays: Ray[];
  constructor(p: p5) {
    this.p = p;
    this.pos = p.createVector(p.width / 2, p.height / 2);
    this.rays = [];
    // 视野 度数
    for (let i = 0; i < 60; i++) {
      this.rays.push(new Ray(p, this.pos, p.radians(i)));
    }
  }

  update(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }

  look(walls: Boundary[]) {
    for (let ray of this.rays) {
      let closet = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = Vector.dist(this.pos, pt!);
          if (d < record) {
            record = d;
            closet = pt;
          }
        }
      }
      if (closet) {
        this.p.line(this.pos.x, this.pos.y, closet.x, closet.y);
      }
    }
  }

  show() {
    this.p.fill(255);
    this.p.ellipse(this.pos.x, this.pos.y, 16);

    for (let i = 0; i < this.rays.length; i++) {
      this.rays[i].show();
    }
  }

  lookAt(x:number,y:number){
    this.pos.x = x;
    this.pos.y = y;
    this.pos.normalize();
  } 
}

export { Boundary, Ray, Particle };
