<template>
  <div class="input">
    <input type="file" ref="input_file" />
  </div>
  <div class="node" ref="node"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import p5 from "p5";
import * as tf from "@tensorflow/tfjs";

export default defineComponent({
  name: "one",
  setup(props) {
    let node = ref<HTMLElement>();
    let input_file = ref<HTMLElement>();

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(node.value!.offsetWidth, node.value!.offsetHeight);
        // const data = tf.tensor([1,2,3,4,5,6],[2,3])
        // console.log(data.toString())
        const values = [];

        for (let i = 0; i < 30; i++) {
          values[i] = p.random(0, 100);
        }
        const shape: [number, number, number] = [2, 5, 3];
        const tense = tf.tensor3d(values, shape, "int32");
        // 使用提供的初始值创建一个新变量
        const vtense = tf.variable(tense);
        console.log(vtense);
        // 控制台打印
        tense.print();
        // 将一维的图片数据，转换为3D
        const imageData = [
          0, 0, 0, 100, 255, 255, 255, 100, 20, 255, 0, 255, 0, 0, 255, 100,
        ];
        const m: [number, number, number] = [2, 2, 4];
        const image = tf.tensor3d(imageData, m, "int32");
        image.print();
        // 获得指定位置的元素
        // console.log(tense.gather(1));
        // tense.data().then((value:Float32Array | Int32Array | Uint8Array)=>{
        //    console.log(value);
        // })
      };

      p.draw = () => {
        p.background(0);
      };

      window.onresize = () => {
        p.resizeCanvas(node.value!.offsetWidth, node.value!.offsetHeight);
      };
    };

    onMounted(() => {
      let p = new p5(sketch, node.value);

      input_file.value!.onchange = () => {
        console.log(input_file.value.files[0]);
      };
    });

    return {
      node,
      input_file,
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