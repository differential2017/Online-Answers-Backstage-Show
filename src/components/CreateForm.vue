<template>
  <!-- 创建试卷的表单 -->
  <mu-container>
    <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
      <mu-form-item prop="input" label="试卷名字">
        <mu-text-field v-model="form.input"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="date" label="开始时间">
        <mu-date-input v-model="form.start" type="dateTime" actions></mu-date-input>
      </mu-form-item>
      <mu-form-item prop="date" label="结束时间">
        <mu-date-input v-model="form.end" type="dateTime" actions></mu-date-input>
      </mu-form-item>
    </mu-form>
  </mu-container>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      form: {
        input: "",
        start:"",
        end:""
      }
    };
  }
};
</script>
