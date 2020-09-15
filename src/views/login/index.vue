<template>
  <div class="login-style">
    <div class="form-admin">
      <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              auto-complete="on"
              label-position="left"
      >
        <h3 style="text-align: center;font-size: 16px;margin: 10px">登录</h3>
        <el-form-item prop="username">
          <el-input
                  prefix-icon="el-icon-search"
                  v-model="loginForm.username"
                  name="username"
                  type="text"
                  auto-complete="on"
                  placeholder="username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
                  prefix-icon="el-icon-search"
                  :type="pwdType"
                  v-model="loginForm.password"
                  name="password"
                  auto-complete="on"
                  placeholder="password"
                  @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button
                  :loading="loading"
                  type="primary"
                  style="width:100%;"
                  @click.native.prevent="handleLogin"
          >Sign in</el-button>
        </el-form-item>
        <div>
          <span>username: admin</span>
          <span>password: admin</span>
          <span>role :0</span>
        </div>
        <div>
          <span>username: editor</span>
          <span>password: editor</span>
          <span>role :1</span>
        </div>
        <div>
          <span>username: reader</span>
          <span>password: reader</span>
          <span>role :2</span>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("用户名密码不能小于5位"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "admin"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      redirect: undefined
    };
  },
  watch: {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(data => {
              this.loading = false;
              if (data) {
                this.$router.push("/");
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.$message.error("error submit!!"); //登录失败提示错误
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
div span + span {
  margin-left: 20px;
}
 .login-style {
   width: 100%;
   height: 100%;
  background: url("~@/assets/pageBg.png") no-repeat !important;

  .form-admin {
    padding: 15px;
    width: 400px;
    height: 300px;
    border-radius: 10px;
    background-color: rgb(164,170,186);
    box-shadow: 2px 1px 60px 20px #645656;

    margin: auto;
    position: absolute;
    top: -1.5rem;
    left: 0;
    right: 0;
    bottom: 0;
  }
}


</style>

