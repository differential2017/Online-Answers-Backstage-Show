<template>
  <!-- 创建试卷的主组件 -->
  <mu-container>
    <!-- 试卷基本信息的表单 -->
    <CreateForm></CreateForm>
    <!-- 新加一个题目 -->
    <CreateNew v-on:getTitleInfo="titleInfo"></CreateNew>
    <!-- 展示客观题目 -->
    <div button v-for="(key,value) in titleObj[0]" :key="value" class="title-item">
      <div>题号:{{value+1}}</div>
      <div>题目: {{key.objTitle}}</div>
      <div>A选项： {{key.AC}}</div>
      <div>B选项： {{key.BC}}</div>
      <div>C选项： {{key.CC}}</div>
      <div>D选项： {{key.DC}}</div>
      <div>答案： {{key.objAns}}</div>
      <div>分值： {{key.objMark}}</div>
      <!-- 修改题目 -->
      <CreateAlterObj v-bind:objinfo="key" v-bind:num="value" v-on:alterObjTitle="alterT"></CreateAlterObj>
    </div>

    <!-- 展示主观题 -->
    <div button v-for="(item,i) in titleObj[1]" :key="item+'1'" class="title-item">
      <div>题号：{{titleObj[0].length+i+1}}</div>
      <div>
        题目：
        <br>
        {{item.subTitle}}
      </div>
      <div>
        答案：
        <br>
        {{item.subAns}}
      </div>
      <div>分数:{{item.subMark}}</div>
      <!-- 修改题目 -->
      <CreateAlterSub v-bind:subinfo="item" v-bind:num="i" v-on:alterSubTitle="alterS"></CreateAlterSub>
    </div>
  </mu-container>
</template>

<style>
.title-item {
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #ddd;
}
</style>

<script>
import CreateForm from "@/components/CreateForm";
import CreateNew from "@/components/CreateNew";
import CreateAlterObj from "@/components/CreateAlterObj";
import CreateAlterSub from "@/components/CreateAlterSub";
export default {
  data() {
    return {
      //题目对象 0 客观 1 主观
      titleObj: [[], []],
      openAlert: false,
      options: ["A", "B", "C", "D"]
    };
  },
  methods: {
    //得到题目的信息，并装载
    titleInfo(obj) {
      if (obj.type == 0) {
        this.titleObj[0].push(obj);
      }
      if (obj.type == 1) {
        this.titleObj[1].push(obj);
      }
    },
    //修改子组件穿过来的客观题对象
    alterT(d) {
      this.titleObj[0][d.tnum].objTitle = d.objTitle;
      this.titleObj[0][d.tnum].objAns = d.objAns;
      this.titleObj[0][d.tnum].AC = d.AC;
      this.titleObj[0][d.tnum].BC = d.BC;
      this.titleObj[0][d.tnum].CC = d.CC;
      this.titleObj[0][d.tnum].DC = d.DC;
      this.titleObj[0][d.tnum].objMark = d.objMark;
    },
    //修改子组件穿过来的主观题对象
    alterS(d){
        this.titleObj[1][d.tnum].subMark=d.subMark;
        this.titleObj[1][d.tnum].subTitle=d.subTitle;
        this.titleObj[1][d.tnum].subAns=d.subAns;
    }
  },
  mounted() {},
  components: {
    CreateForm,
    CreateNew,
    CreateAlterObj,
    CreateAlterSub
  }
};
</script>

