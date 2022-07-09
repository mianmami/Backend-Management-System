<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <BreadCrumb name="评论管理"></BreadCrumb>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="isTableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column prop="title" label="标题" width=""> </el-table-column>
        <el-table-column prop="total_comment_count" label="总品论述" width="">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column prop="address" label="评论状态">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.comment_status"
              type="success"
              size="mini"
              >开启</el-button
            >
            <el-button v-else type="danger" size="mini">关闭</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleChange(scope.row)"
              :disabled="scope.row.commentStatus"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>

      <!-- 页码 -->

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="params.page"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="isTableLoading"
      >
      </el-pagination>
    </el-card>
  </div>
</template>



<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { getArticleList, changeArticleCommentStatus } from "@/api/article";
export default {
  name: "Comment",
  components: { BreadCrumb },
  data() {
    return {
      tableData: [],
      params: { page: 1, per_page: 10, response_type: "comment" },

      total: 0,
      // 分页的禁用
      isPaginationDisabled: false,
      // 表格加载时的禁用
      isTableLoading: false,
    };
  },
  methods: {
    async getArticle() {
      this.isTableLoading = true;
      this.isPaginationDisabled = true;
      const data = await getArticleList(this.params);

      // 给每一个评论的按钮，都设置一个独享的loading控制
      data.data.data.results.forEach((val) => {
        val.commentStatus = false;
      });

      this.total = data.data.data.total_count;
      this.tableData = data.data.data.results;
      

      this.isTableLoading = false;
      this.isPaginationDisabled = false;
    },
    async handleChange(val) {
      val.commentStatus = true;
      await changeArticleCommentStatus(val.id.toString(), val.comment_status);
      this.$message({
        type: "success",
        message: "修改成功",
      });
      val.commentStatus = false
    },
    handleSizeChange(val) {
      this.params.per_page = val;
      this.params.page = 1;
      this.getArticle();
    },
    handleCurrentChange() {
      this.getArticle();
    },
  },
  mounted() {
    this.getArticle();
  },
};
</script>

<style lang='less' scoped>
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
</style>