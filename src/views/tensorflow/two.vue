<template>
  <div class="node" ref="node"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import p5 from "p5";
import * as tf from "@tensorflow/tfjs";

export default defineComponent({
  name: "two",
  setup() {
    let node = ref<HTMLElement>();
    let x_value: number[] = [];
    let y_value: number[] = [];
    const sketch = (p: p5) => {
      let m: tf.Variable, b: tf.Variable;

      const learningRate = 0.2;
      const optimize = tf.train.sgd(learningRate);
      // 绘制相关的设置
      p.setup = () => {
        p.createCanvas(node.value!.offsetWidth, node.value!.offsetHeight);
        m = tf.variable(tf.scalar(p.random(1)));
        b = tf.variable(tf.scalar(p.random(1)));
      };

      const train = () => {
        return loss(predict(xs), ys);
      };
      // 绘制
      p.draw = () => {

        const ys = tf.tensor1d(y_value);
        optimize.minimize(()=>loss(predict(x_value),ys));

        p.background(0);
        p.fill(0, 255, 0);
        p.noStroke();
        for (let i = 0; i < xs.length; i++) {
          p.ellipse(xs[i], ys[i], 20, 20);
        }
      };

      // 鼠标点击函数
      p.mousePressed = () => {
        x_value.push(p.mouseX);
        y_value.push(p.mouseY);
      };

      const predict = (x: number[]) => {
        const xs = tf.tensor1d(x);
        // y = mx + b
        const ys = xs.mul(m).add(b);
        return ys;
      };

      const loss = (pred: tf.Tensor, labels: number[]) => {
        return pred.sub(labels).square().mean();
      };

      // 窗口改变时对应的画布也要改变
      window.onresize = () => {
        p.resizeCanvas(node.value!.offsetWidth, node.value!.offsetHeight);
      };
    };

    onMounted(() => {
      new p5(sketch, node.value);
    });

    return {
      node,
    };
  },
});
</script>

<style lang="less" scoped>
.node {
  width: 100%;
  height: 100%;
}
</style>