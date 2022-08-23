<template>
  <div class="node" ref="node"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import p5 from "p5";

export default defineComponent({
  name: "demo",
  setup() {
    let node = ref<HTMLElement>();

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(node.value!.clientWidth, node.value!.clientHeight);
      };
      p.draw = () => {
        p.fill(0, 10);
        p.rect(0, 0, p.width, p.height);

        p.fill(0, 255, 0);
        p.noStroke();
        p.ellipse(p.mouseX, p.mouseY, 20, 20);
      };

      // 窗口改变时，清空并改变画布的大小
      window.onresize = () => {
        p.resizeCanvas(node.value!.clientWidth, node.value!.clientHeight);
      };
    };
    onMounted(() => {
      let p = new p5(sketch, node.value);
    });
    return {
      node,
    };
  },
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  width: 100%;
  height: calc(100vh - 60px);
  .node {
    width: 100%;
    height: 100%;
  }
}
</style>