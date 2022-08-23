<template>
  <div class="node">
    <div class="one" ref="one"></div>
    <div class="two" ref="two"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import p5 from "p5";
import { Boundary, Particle } from "@/lib/p5/raycastingTypes";

export default defineComponent({
  name: "Raycasting",
  setup(props) {
    let one = ref<HTMLElement>();
    let two = ref<HTMLElement>();

    const sketch = (p: p5) => {
      let walls: Boundary[] = [];
      let particle: Particle;
      let xoff = 0;
      let yoff = 100;
      p.setup = () => {
        p.createCanvas(one.value!.offsetWidth, one.value!.offsetHeight);

        for (let i = 0; i < 10; i++) {
          const x1 = p.random(p.width);
          const x2 = p.random(p.width);
          const y1 = p.random(p.height);
          const y2 = p.random(p.height);
          walls.push(new Boundary(p, x1, y1, x2, y2));
        }
        // ray = new Ray(p,100,200);
        particle = new Particle(p);
      };
      p.draw = () => {
        p.background(0);
        particle.show();
        for (let i = 0; i < walls.length; i++) {
          walls[i].show();
        }
        particle.look(walls);
        particle.update(p.noise(xoff) * p.width, p.noise(yoff) * p.height);

        // particle.lookAt(p.mouseX,p.mouseY);
        xoff+=0.01;
        yoff+=0.01;


        
      };

      window.onresize = () => {
        p.resizeCanvas(one.value!.offsetWidth, one.value!.offsetHeight);
      };
    };

    onMounted(() => {
      new p5(sketch, one.value);
    });

    return {
      one,
      two,
    };
  },
});
</script>

<style lang="less" scoped>
.node {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .one {
    flex: 1;
    width: 50%;
    height: 100%;
  }
  .two {
    flex: 1;
    width: 50%;
    height: 100%;
  }
}
</style>