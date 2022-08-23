<template>
  <div class="node" ref="node">
    <!-- <img ref="img" src="@/assets/background.png" alt="" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import p5 from "p5";
import { Element } from "p5";
// mediapipe 和Tensorflow框架
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import { Segmentation } from "@tensorflow-models/body-segmentation/dist/shared/calculators/interfaces/common_interfaces";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/selfie_segmentation";
import { Tensor3D } from "@tensorflow/tfjs-core";
import { vi } from "element-plus/es/locale";

export default defineComponent({
  name: "backgroundTest",
  setup(props) {
    let node = ref<HTMLElement>();
    let segmenter: bodySegmentation.BodySegmenter;
    let stream: MediaStream;
    let video: HTMLVideoElement;
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let background: p5.Image;
    let old: number;
    const sketch = (p: p5) => {
      const imageBitmapToCanvas = (
        imageBitmap: ImageBitmap,
        ctx: CanvasRenderingContext2D
      ) => {
        ctx.canvas.width = imageBitmap.width;
        ctx.canvas.height = imageBitmap.height;

        ctx.drawImage(imageBitmap, 0, 0);
        // return ctx.getImageData(0,0,imageBitmap.width,imageBitmap.height);
      };
      // 将原生的canvas，转换为 图片（p5.Image）
      const canvasToP5Image = (ctx: CanvasRenderingContext2D) => {
        // 获得 ImageData
        const imageData = ctx.getImageData(
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );
        const image = p.createImage(imageData.width, imageData.height);
        image.loadPixels();
        // 将像素信息 填充到 创建的Image中
        for (let i = 0; i < imageData.data.length; i++) {
          image.pixels[i] = imageData.data[i];
        }
        image.updatePixels();
        return image;
      };

      const drawBackground = (
        data: ImageData,
        maskImage: p5.Image,
        backhround?: p5.Image,
        color?: number[]
      ) => {
        if (background) {
          background.resize(maskImage.width, maskImage.height);
          maskImage.loadPixels();
          background.loadPixels();
          for (let w = 0; w < maskImage.width; w++) {
            for (let h = 0; h < maskImage.height; h++) {
              const index = (w + h * maskImage.width) * 4;
              if (data.data[index] !== 255) {
                maskImage.pixels[index + 0] = background.pixels[index + 0];
                maskImage.pixels[index + 1] = background.pixels[index + 1];
                maskImage.pixels[index + 2] = background.pixels[index + 2];
                maskImage.pixels[index + 3] = background.pixels[index + 3];
              }
            }
          }
        } else {
          // 绘制背景色
          maskImage.loadPixels();
          let r = 0;
          let g = 255;
          let b = 0;
          let a = 255;
          if (color) {
            r = color[0];
            g = color[1];
            b = color[2];
            a = color[3];
          }
          for (let w = 0; w < maskImage.width; w++) {
            for (let h = 0; h < maskImage.height; h++) {
              const index = (w + h * maskImage.width) * 4;
              if (data.data[index] !== 255) {
                maskImage.pixels[index + 0] = r;
                maskImage.pixels[index + 1] = b;
                maskImage.pixels[index + 2] = b;
                maskImage.pixels[index + 3] = a;
              }
            }
          }
        }
        maskImage.updatePixels();
      };
      // 配置
      p.setup = async () => {
        p.createCanvas(node.value!.offsetWidth, node.value!.offsetHeight);
        background = p.loadImage("/src/assets/350.jpg");
        old = new Date().getTime();
      };

      // 绘制
      p.draw = async () => {
        const segmentation = await segmenter.segmentPeople(video);
        const data = await segmentation[0].mask.toImageData();
        canvas.width = data.width;
        canvas.height = data.height;
        //   原来的视频信息
        ctx?.drawImage(video, 0, 0);
        const nowImg = canvasToP5Image(ctx!);
        drawBackground(data, nowImg, background);
        p.image(nowImg, 0, 0);
        // 绘制FPS
        old = FPS(old);
      };
      const FPS = (old: number) => {
        const now = new Date().getTime();
        const c = now - old;
        const fps = Math.floor(1 / (c / 1000));
        p.textSize(20);
        p.text(`FPS:  ${fps}`, 50, 60);
        return now;
      };

      window.onresize = () => {
        p.resizeCanvas(node.value!.offsetWidth, node.value!.offsetHeight);
      };
    };
    onMounted(async () => {
      // 人体分割 的
      const model =
        bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
      const segmenterConfig: bodySegmentation.MediaPipeSelfieSegmentationMediaPipeModelConfig =
        {
          runtime: "mediapipe", // or 'tfjs'
          solutionPath: "/node_modules/@mediapipe/selfie_segmentation",
          modelType: "general",
        };
      segmenter = await bodySegmentation.createSegmenter(
        model,
        segmenterConfig
      );
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      video = document.createElement("video");
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      // node.value?.append(video);
      new p5(sketch, node.value);
      // const opcity = 1;
      // const flipHorizontal = false;
      // const maskBlurAmount = 0;

      // const canvas = document.createElement('canvas');

      // bodySegmentation.drawMask(canvas,img.value!,coloredPartImage,opcity,maskBlurAmount,flipHorizontal);

      // node.value?.append(canvas);
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