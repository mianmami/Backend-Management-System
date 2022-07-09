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
        <span>共找到{{ total }}条记录</span>
      </div>
        <ContentTable @onGetTotalCount="onGetTotalCount"></ContentTable>
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
  data(){
    return {
      total: ''
    }
  },
  methods: {
    onGetTotalCount(total){
      this.total=total
    }
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
</style>