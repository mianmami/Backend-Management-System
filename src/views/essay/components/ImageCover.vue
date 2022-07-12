<template>
  <div class="image-cover-container">
    <div class="image-border" @click="dialogVisible = true">
      <img
        alt=""
        class="image-cover"
        ref="imageCover"
        :src="imgUrl"
        v-show="imgUrl || isShowImageCover"
      />
    </div>
    <el-dialog
      title="选择封面"
      :modal-append-to-body="false"
      width="70%"
      :visible.sync="dialogVisible"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <Fodder
            style="height: 300px; overflow: auto"
            :hide-action="true"
            :hideUpload="true"
            :hideSelect="true"
            @selected-img="handleSelectedImg"
          ></Fodder>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="second">
          <input type="file" ref="file" @change="displayImage" />
          <img
            ref="dialogImageCover"
            class="dialog-image-cover"
            style="width: 150px; height: 150px; display: block"
          />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Fodder from "@/components/Fodder.vue";
import { uploadImg } from "@/api/image";
export default {
  name: "ImageCover",
  components: { Fodder },
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      selectedImgUrl: "", // 被选中的图片地址
      url: "",
      isShowImageCover: false,
    };
  },
  props: {
    imgUrl:{
      default: "",
      type: String
    }
  },
  methods: {
    displayImage(val) {
      const file = this.$refs.file.files[0];
      const data = window.URL.createObjectURL(file);
      this.$refs.dialogImageCover.src = data;
    },
    handleSelectedImg(url) {
      this.selectedImgUrl = url;
    },
    async onUploadImg(file) {
      const res = await uploadImg(file);
      const url = res.data.data.url;
      this.$emit("upload-image", url); // 上传图片获得的url,提交给父组件
    },
    onConfirm() {
      if (this.activeName == "first") {
        if(this.selectedImgUrl == ''){
          this.$message.warning('请选择一张封面图片')
        }else{
          this.$refs.imageCover.src = this.selectedImgUrl
          this.dialogVisible = false
          this.isShowImageCover = true
          this.$emit("upload-image", this.selectedImgUrl)
        }
      } else {
        if (this.$refs.dialogImageCover.src) {
          const file = this.$refs.file.files[0];
          const fd = new FormData();
          fd.append("image", file);
          this.$refs.imageCover.src = this.$refs.dialogImageCover.src;
          this.onUploadImg(fd);
          // 关闭弹窗
          this.dialogVisible = false;
          this.isShowImageCover = true;
          // this.$refs.file.value = "";

        } else {
          this.$message.warning("您还未选择图片");
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.image-border {
  width: 150px;
  height: 150px;
  border: 1px solid #000;
  .image-cover {
    width: 100%;
    height: 100%;
  }
}
.upload-display {
  display: block;
  width: 150px;
  height: 150px;
  border: 1px solid #000;
}
</style>