<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通用后台管理系统</span>
      </div>
      <el-form label-width="80px" :model="form" ref="form">
        <!-- 用户名框 -->
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { mix: 4, max: 10, message: '长度在4-10位', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { mix: 6, max: 12, message: '长度在6-12位', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { setToken } from "@/utils/setToken.js";
import { login } from "../api/api.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    login(form) {
      console.log("form", this.$refs[form]);
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log("yes:", this.form);
          this.service.post("/login", this.form).then((res) => {
        login(this.form).then((res) => {
          setToken("username", res.data.username);
          setToken("token", res.data.token);
          this.$message({ message: res.data.message, type: "success" });
          this.$router.push("/home");
        });
        
        console.log("res:", res);
      });
        }
      });
      
    },
  },
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  .box-card {
    width: 450px;
    margin: 100px auto;
    .el-card__header {
      font-size: 23px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>