<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-width="65px"
    >
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
        <el-button
          type="primary"
          @click="submitForm('loginForm')"
          :loading="isLoading"
          >{{ isLoading ? "登录中" : "登录" }}</el-button
        >
      </el-form-item>
    </el-form>
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="triangle"
      :particleSize="6"
      linesColor="#FFF"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      id="particles-js"
    >
    </vue-particles>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { mapActions, mapMutations, mapState } from "vuex";
import { getCookie, setCookie, removeCookie } from "@/utils/storage";
export default {
  name: "Login",
  data() {
    // 判断有无勾选"agree"，必须通过自定义校验规则的方式。
    const checkAgree = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("您必须同意该选项才可以进行后续操作"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        mobile: "13911111111",
        code: "246810",
        // mobile: "",
        // code: "",
        isAgree: true,
        checked: true,
      },
      loginRules: {
        mobile: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机格式不对",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "验证码必须为6位数字",
            trigger: "blur",
          },
        ],
        isAgree: [{ validator: checkAgree, trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    ...mapActions(["onLogin"]),
    ...mapMutations(["startLoading", "stopLoading"]),
    // 表单验证，如果通过，就执行登录操作， 否则就退出
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const res = this.userLogin();
        } else {
          return false;
        }
      });
    },
    async userLogin() {
      try {
        this.startLoading();
        // 验证通过，跳转
        const res = await this.onLogin(this.loginForm);
        this.$message.success("欢迎登录");
        this.$router.push("/");
        // 验证通过的同时，把账号和密码通过加密的方式，保存到cookie中
        if (this.loginForm.checked == true) {
          setCookie(this.loginForm.mobile, this.loginForm.code, 7);
        } else {
          clearCookie();
        }
        this.stopLoading();
      } catch (err) {
        const { response } = err;
        if (response && response.status === 400) {
          this.$message.error("手机号码或验证码不对");
        } else if (response && response.status === 403) {
          this.$message.error("权限不足无法登录");
        } else if (response && response.status === 507) {
          this.$message.error("数据异常");
        } else {
        }
        this.stopLoading();
      }
    },
  },

  created() {
    getCookie(this.loginForm); // cookie中存放的是登陆时候的用户名+密码
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
