<template>
  <div class="fodder-container">
    <div class="header">
      <el-radio-group v-model="category" size="small" @change="changeCategory">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="small" @click="dialogVisible = true"
        >上传图片</el-button
      >
    </div>
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        :xl="4"
        v-for="(item, index) in images"
        :key="index"
      >
        <el-image :src="item.url" fit="cover" class="material-image"></el-image>
        <div class="collect-delete">
          <el-button
            circle
            type="warning"
            size="small"
            :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            @click="onCollectImage(item)"
          ></el-button>
          <el-button
            circle
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="onDeleteImage(item)"
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentPageChange"
      :disabled="isDisable"
    >
    </el-pagination>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <!-- 注意这里的name属性值一定要写成image, 默认是file会报错 -->
      <el-upload
        :show-file-list="false"
        class="upload-demo"
        name="image" 
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload" ></i>
        <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getUserImages, collectImage, deleteImage } from "@/api/image";
import { getItem } from "@/utils/storage";
export default {
  name: "Fodder",
  data() {
    const { token } = getItem("userInfo");
    console.log(token);
    return {
      category: false, // 状态
      total: 0, // 所有图片的数量
      currentStatus: false, // false是全部图片, true是收藏的图片,
      images: [],
      allImages: [], // 所有图片
      collectImages: [], // 所有的收藏图片
      page: 1, //当前页面
      dialogVisible: false, // 控制对话框的显示和隐藏
      isDisable: false, // 页码的禁用
      uploadHeaders: {
        Authorization: `Bearer ${token}`,
      }, // 上传图片所需要的请求头参数
    };
  },
  methods: {
    async loadUserImage() {
      this.isDisable = true;
      const res = await getUserImages({
        collect: this.currentStatus,
        page: this.page,
        per_page: 20,
      });
      this.images.forEach((val) => {
        val.loading = false;
      });
      this.isDisable = false;
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
      if (this.currentStatus == false) {
        this.allImages = this.images;
      } else {
        this.collectImages = this.images;
      }
    },
    handleCurrentPageChange(page) {
      this.page = page;
      this.loadUserImage();
    },
    changeCategory(state) {
      this.currentStatus = state;
      this.loadUserImage();
    },
    async onCollectImage(image) {
      image.loading = true;
      const res = await collectImage(image.id, !image.is_collected);
      if (res.data.message !== "OK") {
        this.$message.error("操作失败，请稍后再试");
      } else {
        this.loadUserImage();
      }
    },
    onDeleteImage(image) {
      image.loading = true;
      this.$confirm("删除之后不可以恢复，请问是否继续", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deleteImage(image.id);
        this.loadUserImage();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      });
    },
    async uploadSuccess() {
      this.dialogVisible = false;
      this.$message.success("上传成功");
      const { data: res } = await getUserImages({
        collect: false,
      });
      this.images = res.data.results;
    },
  },
  mounted() {
    this.loadUserImage();
  },
};
</script>

<style lang='less' scoped>
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.el-row {
  margin-top: 30px;
}
/deep/.el-col {
  position: relative;
}
.material-image {
  width: 100%;
  height: 150px;
  position: relative;
  cursor: pointer;
}
.collect-delete {
  position: absolute;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.5);
  bottom: 4px;
  height: 39px;
  left: 5px;
  right: 5px;
  background-color: rgba(204, 204, 204, 0.5);
  justify-content: space-evenly;
  display: flex;
  align-items: center;
}


  /deep/.el-upload{
    width: 100%;
    .el-upload-dragger{
      width: 100%;
    }
  }

</style>