<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <BreadCrumb name="粉丝管理"></BreadCrumb>
      </div>
      <div class="userinfo-container">
        <div class="userinfo" v-for="(item, index) in fanList" :key="index">
          <el-image :src="item.photo" style="width:100%;height:100%;">

          </el-image>
          <el-button class="focus-btn" size="small" type="primary"
            >+关注</el-button
          >
        </div>
      </div>
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
import { getFansList } from "@/api/user";
export default {
  name: "Fans",
  components: { BreadCrumb },
  data() {
    return {
      total: 0,
      params: { page: 1, per_page: 20 },
      isTableLoading: false,
      fanList: [],
    };
  },
  methods: {
    handleSizeChange() {
      this.currentPage = 1;
      this.ongetFansList();
    },
    handleCurrentChange() {
      this.ongetFansList();
    },
    async ongetFansList() {
      const res = await getFansList(this.params);
      this.fanList = res.data.data.results;
      this.total = res.data.data.total_count;
    },
  },
  mounted() {
    this.ongetFansList();
  },
};
</script>

<style scoped lang="less">
.fans-container {
  .userinfo-container {
    display: flex;
    justify-content: flex-start;
    margin-right: -20px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .userinfo {
      margin-right: 20px;
      width: 150px;
      height: 200px;
      border: 1px dashed #eee;
      box-sizing: border-box;
      padding: 20px 30px 10px 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /deep/ .user-photo {
        height: 80px;
        width: 80px;
        img {
          border-radius: 50%;
        }
      }
      .username {
        text-align: center;
        font-size: 16px;
        color: pink;
      }
      .focus-btn {
        border-radius: 30px;
      }
      margin-bottom: 20px;
    }
  }
  /deep/ .el-pagination {
    text-align: center;
  }
}
</style>
