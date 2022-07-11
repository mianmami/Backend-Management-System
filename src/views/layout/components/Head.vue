<template>
  <div class="header-container">
    <div class="title">XXX科技有限公司</div>
    <div class="avatar-setting">
      <el-avatar :src="userProfile.photo">
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userProfile.name
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="el-icon-setting">
            <span style="margin-left: 5px" @click="$router.push('/setting')"
              >个人设置</span
            >
          </el-dropdown-item>
          <el-dropdown-item class="iconfont icon-exit">
            <span @click="onExitLogin">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getUserProfiles } from "@/api/user";
import { mapMutations } from "vuex";
export default {
  name: "Head",
  data() {
    return {
      userProfile: "",
    };
  },
  methods: {
    ...mapMutations(["setUserDetailInfo", "removeUserInfo"]),
    async loadUserProfile() {
      const res = await getUserProfiles();
      const userProfile = res.data.data;
      this.userProfile = userProfile;
      this.setUserDetailInfo(userProfile);
    },
    onExitLogin() {
      this.$confirm('确定退出码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push("/login")
          this.removeUserInfo('userInfo')
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
    },
  },
  created() {
    this.loadUserProfile();
    this.$bus.$on('change-header-info', (obj)=>{
      Object.assign(this.userProfile, obj);
    })
  },
};
</script>

<style lang='less' scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid green;
  color: green;
  .el-dropdown-link {
    cursor: pointer;
    color: green;
    margin-left: 10px;
  }
  .avatar-setting {
    display: flex;
    align-items: center;
  }
}
</style>