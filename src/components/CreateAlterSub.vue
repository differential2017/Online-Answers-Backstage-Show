<template>
  <!-- 修改主观题 在创建时 -->
  <mu-container>
    <mu-flex justify-content="center">
      <mu-button @click="openAlertDialog">修改</mu-button>
    </mu-flex>
    <mu-dialog
      title="修改"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlert"
    >
      <!-- 题目的表单 -->
      <mu-container>
        <label>题目</label>
        <mu-text-field v-model="subObj.subTitle" multi-line :rows="4" full-width class="title-form"></mu-text-field>
        <label>答案</label>
        <mu-text-field v-model="subObj.subAns" multi-line :rows="4" full-width></mu-text-field>
        <label>分值</label>
        <mu-text-field v-model="subObj.subMark"></mu-text-field>
        <br>
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">关闭</mu-button>
        <mu-button slot="actions" flat color="primary" @click="submit">确定</mu-button>
      </mu-container>
    </mu-dialog>
  </mu-container>
</template>

<script>
import { setTimeout } from "timers";
export default {
  props: ["subinfo", "num"],
  data() {
    return {
      // 主观题对象
      subObj: {
        tnum: null,
        type: 1,
        subMark: null,
        subTitle: null,
        subAns: null
      },
      openAlert: false
    };
  },
  methods: {
    submit() {
      this.openAlert = false;
      this.$emit("alterSubTitle", this.subObj);
    },
    openAlertDialog() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    }
  },
  mounted() {
      this.subObj.tnum = this.num;
      this.subObj.subMark = this.subinfo.subMark;
      this.subObj.subTitle = this.subinfo.subTitle;
      this.subObj.subAns = this.subinfo.subAns;
  }
};
</script>