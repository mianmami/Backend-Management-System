<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header">
        <BreadCrumb name="个人设置"></BreadCrumb>
      </div>
      <el-row>
        <el-col :span="16">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">
              {{ form.id }}
            </el-form-item>
            <el-form-item label="手机">
              {{ form.mobile }}
            </el-form-item>
            <el-form-item label="用户名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="用户介绍">
              <el-input type="textarea" v-model="form.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
                :loading="isSubmiting"
                >{{ isSubmiting ? "修改中" : "确定" }}</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" class="avatar-col">
          <el-avatar :src="form.photo" :size="150"></el-avatar>
          <el-button @click="changePhoto" type="primary" class="change-photo"
            >修改头像</el-button
          >
          <input type="file" ref="file" @change="onSelectPhoto" hidden/>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="修改头像"
      :visible.sync="isShowUploadPhotoDialog"
      width="30%"
      :before-close="handleClose"
      @opened="onOpened"
      destroy-on-close
      append-to-body
    >
      <div>
        <img
          id="image"
          ref="avatar"
          class="avatar"
          :src="avatar"
          style="max-width: 100%; display: block"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowUploadPhotoDialog = false">取 消</el-button>
        <el-button type="primary" @click="onUpload" :loading="uploadLoading">{{
          uploadLoading ? "上传中" : "确定"
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* 
email: "2564@qq.com"
id: 1
intro: "asdfg"
mobile: "13911111111"
name: "python"
photo: "http://toutiao-img.itheima.net/FiE2yAJVX20b17LBVaILYlmJSSzB" */
import BreadCrumb from "@/components/BreadCrumb.vue";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { getUserProfiles, changeUserProfile } from "@/api/user";
import { uploadUserAvatar } from "@/api/image";
import { mapMutations, mapState } from "vuex";
import {sleep} from '@/utils/sleep'
export default {
  name: "Setting",
  components: { BreadCrumb },
  data() {
    return {
      form: {
        name: "",
        intro: "",
        mobile: "",
        email: "",
        photo: "",
      },
      avatar: "",
      // 点击确定时候的loading
      isSubmiting: false,
      // 选择裁剪图片时候的对话框
      isShowUploadPhotoDialog: false,
      // 上传头像时的loading
      uploadLoading: false,
    };
  },
  methods: {
    ...mapMutations(["updateUserDetailInfo"]),
    async onGetUserProfile() {
      const res = await getUserProfiles();
      const data = res.data.data;
      Object.assign(this.form, data);
    },
    async onSubmit() {
      this.isSubmiting = true;
      await sleep(1500);
      const res = await changeUserProfile({
        name: this.form.name,
        intro: this.form.intro,
        email: this.form.email,
      });
      Object.assign(this.form, res.data.data);
      this.$message.success("用户信息更新成功");
      this.isSubmiting = false;
      this.$bus.$emit("change-header-info", this.form);
    },
    changePhoto() {
      this.$refs.file.click();
    },
    onSelectPhoto() {
      const file = this.$refs.file.files[0];
      this.avatar = window.URL.createObjectURL(file);
      this.isShowUploadPhotoDialog = true;
      this.$refs.file.value = "";
    },
    onOpened() {
      const image = this.$refs.avatar;
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        viewMode: 1,
      });
    },
    handleClose() {
      this.$refs.file.value = "";
      this.cropper.destroy();
    },
    onUpload() {
      this.uploadLoading = true;
      this.cropper.getCroppedCanvas().toBlob(async (file) => {
        const fd = new FormData();
        fd.append("photo", file); // 上传图片需要的格式
        const avatarUrl = window.URL.createObjectURL(file); // 展示图片需要的URL
        try {
          await uploadUserAvatar(fd);
          this.isShowUploadPhotoDialog = false;
          this.updateUserDetailInfo({photo: avatarUrl});
          this.form.photo = avatarUrl;
          this.$message.success("更新头像成功");
          this.uploadLoading = false;
        } catch (err) {
          this.$message.error("更新头像失败");
          this.uploadLoading = false;
        }
      });
    },
  },
  mounted() {
    this.onGetUserProfile();
  },
};
</script>

<style lang='less' scoped>
.avatar-col {
  text-align: center;
  .change-photo {
    display: block;
    margin: 20px auto;
  }
}
.avatar {
  max-width: 100%;
}
</style>