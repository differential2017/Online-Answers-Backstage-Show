<template>
  <!-- 修改客观题 在创建试卷时-->
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
        <mu-text-field v-model="objObj.objTitle" multi-line :rows="4" full-width class="title-form"></mu-text-field>
        <label>A选项</label>
        <mu-text-field v-model="objObj.AC"></mu-text-field>
        <br />
        <label>B选项</label>
        <mu-text-field v-model="objObj.BC"></mu-text-field>
        <br />
        <label>C选项</label>
        <mu-text-field v-model="objObj.CC"></mu-text-field>
        <br />
        <label>D选项</label>
        <mu-text-field v-model="objObj.DC"></mu-text-field>
        <br />
        <mu-select label="答案" v-model="objObj.objAns" full-width>
          <mu-option v-for="(option) in options" :key="option" :label="option" :value="option"></mu-option>
        </mu-select>
        <label>分值</label>
        <mu-text-field v-model="objObj.objMark"></mu-text-field>
        <br />
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">关闭</mu-button>
        <mu-button slot="actions" flat color="primary" @click="submit">确定</mu-button>
      </mu-container>
    </mu-dialog>
  </mu-container>
</template>

<script>
export default {
  props: ["objinfo", "num"],
  data() {
    return {
      objObj: {
        tnum: null,
        type: 0,
        objTitle: null,
        objAns: null,
        AC: null,
        BC: null,
        CC: null,
        DC: null,
        objMark: null
      },
      openAlert: false,
      options: ["A", "B", "C", "D"]
    };
  },
  methods: {
    openAlertDialog() {
      this.openAlert = true;
    },
    closeAlertDialog() {
      this.openAlert = false;
    },
    //将修改后的对象返回
    submit() {
      this.openAlert = false;
      this.$emit("alterObjTitle", this.objObj);
    }
  },
  mounted() {
    this.objObj.objTitle = this.objinfo.objTitle;
    this.objObj.objAns = this.objinfo.objAns;
    this.objObj.AC = this.objinfo.AC;
    this.objObj.BC = this.objinfo.BC;
    this.objObj.CC = this.objinfo.CC;
    this.objObj.DC = this.objinfo.DC;
    this.objObj.objMark = this.objinfo.objMark;
    this.objObj.tnum = this.num; //数组号
  }
};
</script>
<style>
</style>