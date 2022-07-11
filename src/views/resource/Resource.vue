<template>
  <div class="resource-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <BreadCrumb name="素材管理"></BreadCrumb>
      </div>
      <Fodder></Fodder>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import Fodder from "@/components/Fodder.vue";
export default {
  name: "Resource",
  components: { BreadCrumb, Fodder },
};
</script>

<style lang='less' scoped>
</style>