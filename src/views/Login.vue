<template>
  <!-- 登录界面 -->
  <mu-container>
    <mu-form ref="form" :model="validateForm" class="mu-demo-form adminlogin">
      <mu-form-item label="用户名" prop="username" :rules="usernameRules">
        <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="密码" prop="password" :rules="passwordRules">
        <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item>
        <mu-button color="primary" @click="submit">提交</mu-button>
        <mu-button @click="clear">重置</mu-button>
      </mu-form-item>
    </mu-form>
  </mu-container>
</template>


<style>
.adminlogin {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 150px;
  border: 1px #ddd solid;
}
</style>

<script>
export default {
  data() {
    return {
      usernameRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length >= 3, message: "用户名长度大于3" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10"
        }
      ],
      validateForm: {
        username: "",
        password: "",
        isAgree: false
      }
    };
  },
  methods: {
    submit() {
      let that = this;
      this.$refs.form.validate().then(result => {
        //result 返回布尔值 代表表单前端验证是否通过
        if (result) {
          this.axios
            .post(that.apiUrl.adminLogin, {
              account: that.validateForm.username,
              password: that.validateForm.password
            })
            .then(function(response) {
              alert(response.data);
              if (response.data == "登录成功") {
                //传递给主页面用户名
                that.$router.push({
                  path: "/main",
                  query: { id: that.validateForm.username }
                });
              }
            })
            .catch(function(error) {
              console.log(error);
              alert("请求失败,请稍后再试");
            });
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: "",
        password: "",
        isAgree: false
      };
    }
  }
};
</script>