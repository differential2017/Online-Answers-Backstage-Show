<template>
  <!-- 添加一个新题目 -->
  <mu-container>
    <mu-flex justify-content="center">
      <mu-button @click="openAlertDialog">新建一个题目</mu-button>
    </mu-flex>
    <mu-dialog
      title="题目基本信息"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlert"
    >
      <!-- 题目的表单 -->

      <div class="select-control-group">
        <mu-flex class="select-control-row" :key="x" v-for="(i,x) in radio" @click="typeTab">
          <mu-radio :value="i" v-model="titleType" :label="i.title"></mu-radio>
        </mu-flex>
      </div>
      <component :is="comtitlename" v-on:titleInfo="getTitleInfo"></component>
    </mu-dialog>
  </mu-container>
</template>

<script>
import SubType from "@/components/SubType";
import ObjType from "@/components/ObjType";
export default {
  data() {
    //   titleType.id 0 是客观 1 是主观
    return {
      // type: null,
      comtitlename: null,
      titleType: null,
      openAlert: false,
      radio: [{ title: "客观题", id: 0 }, { title: "主观题", id: 1 }]
    };
  },
  methods: {
    // 根据titleType的值切换组件
    typeTab() {
      if (this.titleType.id == 0) {
        this.comtitlename = "ObjType";
      }
      if (this.titleType.id == 1) {
        this.comtitlename = "SubType";
      }
    },
    openAlertDialog() {
      this.openAlert = true;
    },
    //接受子组件发过来的题目对象，并继续发送给父对象
    getTitleInfo(flag,obj){
      this.openAlert = flag;
      if(obj!=null){
      this.$emit("getTitleInfo",obj);
      }
    }
  },
  components: {
    SubType,
    ObjType
  },
};
</script>
<style>
</style>