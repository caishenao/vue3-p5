<template>
  <div class="node" ref="node"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import p5 from "p5";
export default defineComponent({
  name: "VueP5",
  props: {
    width: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
    sketch: {
      type: Function,
      requiret: true,
      default: () => {
        return Function;
      },
    },
  },
  setup(props) {
    let node = ref<HTMLElement>();

    if (props.width && props.height) {

    }
    onMounted(() => {
      const p = new p5(props.sketch(), node.value);
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