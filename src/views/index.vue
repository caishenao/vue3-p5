<template>
  <el-container>
    <el-header class="header">
      <h2 class="title">vite+vue3+TypeScript+router-vue+p5js相关的例子项目</h2>
    </el-header>
    <el-main></el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "index",
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 40px;
    background-color: #f3f3f3;
    white-space: nowrap;
  }
}
</style>