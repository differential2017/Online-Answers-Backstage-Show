<template>
  <!-- 创建试卷的主组件 -->
  <div>
    <Title></Title>
    <!-- 试卷基本信息的表单 -->
    <mu-container>
      <p>只能创建自己部门的试题</p>
      <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
        <mu-form-item prop="input" label="试卷名字">
          <mu-text-field v-model="form.input"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="date" label="开始时间">
          <mu-date-input v-model="form.start" type="dateTime" actions clock-type="24hr"></mu-date-input>
        </mu-form-item>
        <mu-form-item prop="date" label="结束时间">
          <mu-date-input v-model="form.end" type="dateTime" actions clock-type="24hr"></mu-date-input>
        </mu-form-item>
        <mu-form-item prop="number" label="考试时长(分钟)">
          <mu-text-field v-model="form.settime"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <!-- 新加一个题目 -->
      <CreateNew v-on:getTitleInfo="titleInfo"></CreateNew>
      <!-- 展示客观题目 -->
      <div button v-for="(key,value) in titleObj[0]" :key="value" class="title-item">
        <div>题号:{{value+1}}</div>
        <div>题目: {{key.objTitle}}</div>
        <img :src="key.img" alt class="upimg" />
        <div>A选项： {{key.AC}}</div>
        <div>B选项： {{key.BC}}</div>
        <div>C选项： {{key.CC}}</div>
        <div>D选项： {{key.DC}}</div>
        <div>答案： {{key.objAns}}</div>
        <div>分值： {{key.objMark}}</div>
        <!-- 修改题目 -->
        <div class="flex-button">
          <CreateAlterObj v-bind:objinfo="key" v-bind:num="value" v-on:alterObjTitle="alterT"></CreateAlterObj>
          <mu-button color="error" @click.prevent="deleteT(value)">删除</mu-button>
        </div>
      </div>

      <!-- 展示主观题 -->
      <div button v-for="(item,i) in titleObj[1]" :key="'1'+i" class="title-item">
        <div>题号：{{titleObj[0].length+i+1}}</div>
        <div>
          题目：
          <br />
          {{item.subTitle}}
        </div>
        <img :src="item.img" alt class="upimg" />
        <div>
          答案：
          <br />
          {{item.subAns}}
        </div>
        <div>分数:{{item.subMark}}</div>
        <!-- 修改题目 -->
        <div class="flex-button">
          <CreateAlterSub v-bind:subinfo="item" v-bind:num="i" v-on:alterSubTitle="alterS"></CreateAlterSub>
          <mu-button color="error" @click.prevent="deleteS(i)">删除</mu-button>
        </div>
      </div>
      <!-- 提交 -->
      <div class="subForm">
        <p>试卷总分：{{sumMark}}</p>
        <mu-button color="success" @click.prevent="subForm">提交试卷</mu-button>
      </div>
    </mu-container>
  </div>
</template>

<style>
.title-item {
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #ddd;
}
.flex-button {
  display: flex;
  justify-content: space-around;
}
.subForm {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.upimg {
  width: 500px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>

<script>
import CreateNew from "@/components/CreateNew";
import CreateAlterObj from "@/components/CreateAlterObj";
import CreateAlterSub from "@/components/CreateAlterSub";
import Title from "@/components/Title";
export default {
  data() {
    return {
      //题目对象 0 客观 1 主观
      titleObj: [[], []],
      openAlert: false,
      options: ["A", "B", "C", "D"],
      labelPosition: "top",
      form: {
        input: "",
        start: null,
        end: null,
        settime: null
      },
      img: null
    };
  },
  methods: {
    //得到题目的信息，并装载
    titleInfo(obj) {
      if (obj.type == 0) {
        this.titleObj[0].push(obj);
        if (obj.img != null) {
          var reader = new FileReader();
          const that = this;
          reader.onload = evt => {
            that.titleObj[0][that.titleObj[0].length - 1].img =
              evt.target.result;
          };
          reader.readAsDataURL(obj.img);
        }
      }
      if (obj.type == 1) {
        this.titleObj[1].push(obj);
        if (obj.img != null) {
          var reader = new FileReader();
          const that = this;
          reader.onload = evt => {
            that.titleObj[1][that.titleObj[1].length - 1].img =
              evt.target.result;
          };
          reader.readAsDataURL(obj.img);
        }
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
      this.titleObj[0][d.tnum].img = d.img;
    },
    //修改子组件穿过来的主观题对象
    alterS(d) {
      this.titleObj[1][d.tnum].subMark = d.subMark;
      this.titleObj[1][d.tnum].subTitle = d.subTitle;
      this.titleObj[1][d.tnum].subAns = d.subAns;
      this.titleObj[1][d.tnum].img = d.img;
    },
    deleteT(i) {
      this.titleObj[0].splice(i, 1);
    },
    deleteS(i) {
      this.titleObj[1].splice(i, 1);
    },
    //提交
    subForm() {
      let that = this;
      if (new Date(that.form.start) >= new Date(that.form.end)) {
        alert("时间格式不对");
        return false;
      }
      that.form.start = new Date(that.form.start).toString();
      that.form.end = new Date(that.form.end).toString();
      this.axios
        .post(this.apiUrl.examPaperInfo, {
          name: that.form.input,
          start: that.form.start,
          end: that.form.end,
          settime: that.form.settime,
          data: that.titleObj
        })
        .then(function(response) {
          if (response.data == "成功") {
            alert("提交成功");
            that.$router.push({
              path: "/previewmain",
              query: {
                id: that.$route.query.id
              }
            });
          } else {
            alert("提交失败");
          }
        });
    }
  },
  mounted() {
    this.bus.$emit("adminInfo", this.$route.query.id);
  },
  computed: {
    sumMark() {
      let sum = 0;
      for (let i = 0; i < this.titleObj[0].length; i++) {
        sum += parseInt(this.titleObj[0][i].objMark);
      }
      for (let i = 0; i < this.titleObj[1].length; i++) {
        sum += parseInt(this.titleObj[1][i].subMark);
      }
      return sum;
    }
  },
  components: {
    CreateNew,
    CreateAlterObj,
    CreateAlterSub,
    Title
  }
};
</script>

