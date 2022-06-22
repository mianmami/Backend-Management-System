<template>
  <div class="layout-container">
    <el-container>
      <el-aside width="200px" :class="{ 'collapse-side-menu': isCollapse }">
        <div class="collapse">
          <i
            :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
            @click="onCollapseSide"
          ></i>
        </div>
        <Side :isCollapse="isCollapse"></Side>
      </el-aside>
      <el-container>
        <el-header>
          <Head></Head>
        </el-header>
        <el-main>
          <transition name='fade-transform' mode='out-in'>
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Head from "./components/Head.vue";
import Side from "./components/Side.vue";
export default {
  name: "Layout",
  components: { Head, Side },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    onCollapseSide() {
      this.isCollapse = !this.isCollapse;
    },
    
  },
  
};
</script>

<style lang='less' scoped>
.layout-container {
  /* 这样可以通过定位的方式，把元素撑开，且让移动过去时候弹出的东西，盖在这个下面 */
  height:100%;
  .el-container {
    height: 100%;
  }
  .collapse {
    text-align: center;
    line-height: 40px;
    background-color: #545c64;
    i {
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .el-header {
    background-color: white;
  }
  .el-aside {
    transition: width 0.8s;
    background-color: #545c64;
    height: 100%;
    overflow: hidden;
  }
  .collapse-side-menu {
    width: 45px !important;
    transition: width 0.8s;
  }
}
</style>