<script setup lang="ts">
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="aside">
        <div class="logo_box" @click="$router.push('/')">
          <img src="./assets/vue.svg" alt="" />
          <h5>p5.js相关技术集合 </h5>
        </div>
        <el-scrollbar>
          <el-menu router>
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Monitor /></el-icon>p5
              </template>
              <el-menu-item-group>
                <el-menu-item index="/p5/demo">p5.js例子</el-menu-item>
                <el-menu-item index="/p5/raycasting">2D光线成像</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="/tensorflow">
              <template #title>
                <el-icon><Tools /></el-icon>Tensorflow
              </template>
              <el-menu-item-group>
                <el-menu-item index="/tensorflow/one">学习的第一个例子</el-menu-item>
                <el-menu-item index="/tensorflow/two">线性回归学习</el-menu-item>
                <el-menu-item index="/tensorflow/backgroundTest">背景分离的例子</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
        <router-view></router-view>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
  .aside {
    height: 100%;
    overflow: auto;
    .logo_box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20px 0;
      cursor: pointer;
    }
  }
  
}
</style>

