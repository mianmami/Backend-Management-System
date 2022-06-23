<template>
  <div class="contentTable-container">
    <el-table :data="tableData" size="mini">
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
    >
    </el-pagination>
  </div>
</template>

<script>
import { getArticleList, deleteArticle } from "@/api/article";
export default {
  name: "ContentTable",
  data() {
    return {
      tableData: [],
      total_count: 0,
      currentPage: "",
      params: {
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
      },
    };
  },
  methods: {
    async loadArticles() {
      const res = await getArticleList(this.params);
      const data = res.data.data;
      this.tableData = data.results;
      this.total_count = data.total_count;
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