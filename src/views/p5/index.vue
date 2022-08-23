<template>
   <el-container>
      <el-header class="header">
         <h3>p5.js的学习</h3>
      </el-header>
      <el-main class="main">
         <router-view></router-view>
      </el-main>
   </el-container>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
   name:'index'

})
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
}
</style>