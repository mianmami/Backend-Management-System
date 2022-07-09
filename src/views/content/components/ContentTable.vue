<template>
  <div class="contentTable-container">
    <el-table
      :data="tableData"
      size="mini"
      stripe
      height="500px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop="" label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.cover.images[0]"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status == 0" type="primary"
            >草稿</el-button
          >
          <el-button
            size="mini"
            v-else-if="scope.row.status == 1"
            type="success"
            >待审核</el-button
          >
          <el-button
            size="mini"
            v-else-if="scope.row.status == 2"
            type="warning"
            >审核通过</el-button
          >
          <el-button size="mini" v-else-if="scope.row.status == 3" type="info"
            >审核失败</el-button
          >
          <el-button size="mini" v-else-if="scope.row.status == 4" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total_count"
      :current-page.sync="params.page"
      :page-size.sync="params.per_page"
      @current-change="onPageChange"
      :disabled="loading"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getArticleList, deleteArticle } from "@/api/article";
import { mapMutations, mapState } from "vuex";
import {sleep} from '@/utils/sleep';
export default {
  name: "ContentTable",
  data() {
    return {
      tableData: [],
      total_count: 0,
      currentPage: "",
      params: {
        page: 1,
        per_page: 10,
        status: null,
        channel_id: null,
      },
      loading: false
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    ...mapMutations(["stopLoading"]),
    async loadArticles() {
      this.loading = true;
      await sleep(3000) // 故意让几秒钟后才开始获取数据
      const res = await getArticleList(this.params);
      const data = res.data.data;
      this.tableData = data.results;
      this.total_count = data.total_count;
      this.$emit("onGetTotalCount", this.total_count);
      
      this.loading = false
      this.stopLoading()
      
    },
    onPageChange() {
      this.loadArticles();
    },
    handleEdit(index, row) {
      this.$router.push("/essay");
    },
    handleDelete(index, row) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle(row.id.toString()).then(() => {
            this.loadArticles();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    selectData(data) {
      Object.assign(this.params, data);
      this.loadArticles();
    },
  },
  mounted() {
    this.loadArticles();
    this.$bus.$on("selectData", this.selectData);
  },
};
</script >

<style lang='less' scoped>
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
</style>