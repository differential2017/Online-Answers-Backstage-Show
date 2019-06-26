<template>
  <!-- 主观题的信息 -->
  <mu-container>
    <label>题目</label>
    <mu-text-field v-model="subObj.subTitle" multi-line :rows="4" full-width class="title-form"></mu-text-field>
    <label>答案</label>
    <mu-text-field v-model="subObj.subAns" multi-line :rows="4" full-width></mu-text-field>
    <label>分值</label>
    <mu-text-field v-model="subObj.subMark"></mu-text-field>
    <br>
    <mu-button slot="actions" flat color="primary" @click="close">关闭</mu-button>
    <mu-button slot="actions" flat color="primary" @click="submit">确定</mu-button>
  </mu-container>
</template>

<script>
export default {
  data() {
    return {
      // 主观题对象
      subObj: {
        type:1,
        subMark: null,
        subTitle: null,
        subAns: null
      }
    };
  },
  methods: {
    submit() {
      this.$emit("titleInfo", false, this.subObj);
    },
    close() {
      this.$emit("titleInfo", false);
    }
  }
};
</script>

<style>
</style>
