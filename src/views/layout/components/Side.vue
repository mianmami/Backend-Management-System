<template>
  <div class="side-container">
    <el-menu
      :default-active="$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item
        v-for="item in menuInfo"
        :key="item.path"
        :index="item.path"
      >
        <i :class="[item.icon, isCollapse ? 'collapse' : 'no-collapse']"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Side",
  data() {
    return {
      menuInfo: [
        { path: "/", name: "首页", icon: "el-icon-s-home" },
        { path: "/content", name: "内容管理", icon: "el-icon-menu" },
        { path: "/resource", name: "素材", icon: "el-icon-document" },
        {
          path: "/essay",
          name: "发布文章",
          icon: "el-icon-s-promotion",
        },
        {
          path: "/comment",
          name: "评论管理",
          icon: "el-icon-s-comment",
        },
        { path: "/fans", name: "粉丝管理", icon: "el-icon-coordinate" },
        { path: "/setting", name: "个人设置", icon: "el-icon-setting" },
      ],
    };
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang='less' scoped>
.side-container {
  .el-menu {
    border: unset;
    .collapse {
      margin-right: 10px !important;
      transform: translateX(-10px);
      transition: 1s;
    }
    .no-collapse {
      transition: 1s;
    }
  }
}
</style>