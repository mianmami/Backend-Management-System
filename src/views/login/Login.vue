<template>
  <div class="login-container">
    <el-form ref="form" :model="loginForm" label-width="65px">
      <div class="login-title">仿今日头条后台管理系统</div>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="loginForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="loginForm.code"></el-input>
      </el-form-item>
      <el-form-item prop="checked" label-width="0" class="mind">
        <el-checkbox v-model="loginForm.checked">
          记住我
          <el-tooltip
            content="点击记住我并且登录成功后,下次登录时会自动填充账号密码"
            placement="top-start"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-checkbox>
      </el-form-item>
      <el-form-item prop="isAgree" label-width="0">
        <el-checkbox
          label="我已同意相关条款"
          v-model="loginForm.isAgree"
        ></el-checkbox>
      </el-form-item>
      <el-form-item class="btn" label-width="0">
        <el-button type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        mobile: "13911111111",
        code: "246810",
        isAgree: "",
        checked: "",
      },
      checked: "",
    };
  },
};
</script>

<style lang='less' scoped>
.login-container {
  background: url("@/assets/images/login/login.jpg") no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  .el-form {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 80px;
    .login-title {
      text-align: center;
      letter-spacing: 5px;
      font-size: 20px;
      position: relative;
      top: -40px;
    }
    /deep/.el-form-item__label {
      text-align-last: left;
    }
    /deep/.mind {
      margin-bottom: 0;
      .el-form-item__content {
        line-height: 0px;
      }
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>>
