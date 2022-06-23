<template>
  <div class="content-container">
    <el-card class="" style='margin-bottom: 30px'>
      <div slot="header">
        <BreadCrumb name='内容管理'></BreadCrumb>
      </div>
        <ContentSearch></ContentSearch>
    </el-card>
    <el-card class="">
      <div slot="header">
        
      </div>
        <ContentTable></ContentTable>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import ContentSearch from "./components/ContentSearch.vue";
import ContentTable from "./components/ContentTable.vue";
export default {
  name: "Content",
  components: { BreadCrumb, ContentSearch, ContentTable },
  methods: {},
  mounted() {},
};
</script>

<style lang='less' scoped>
</style>