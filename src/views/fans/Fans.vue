<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <BreadCrumb name='粉丝管理'></BreadCrumb>
      </div>
      
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
export default {
  name: "Fans",
  components:{BreadCrumb}
};
</script>

<style lang='less' scoped>
</style>