<template>
  <div>
    <Title></Title>
    <!-- 创建试卷的主组件 -->
    <mu-container>
      <!-- 试卷基本信息的表单 -->
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
      <!-- 提交 -->
      <div class="subForm">
        <p>试卷总分：{{sumMark}}</p>
        <mu-button color="success" @click.prevent="subAlter">提交修改</mu-button>
        <mu-button color="error" @click.prevent="deletePaper">删除试卷</mu-button>
      </div>
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
        <div class="flex-button">
          <CreateAlterObj v-bind:objinfo="key" v-bind:num="value" v-on:alterObjTitle="alterT"></CreateAlterObj>
          <mu-button color="error" @click.prevent="deleteT(value)">删除</mu-button>
        </div>
      </div>

      <!-- 展示主观题 -->
      <div button v-for="(item,i) in titleObj[1]" :key="i+'1111'" class="title-item">
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
        <div class="flex-button">
          <CreateAlterSub v-bind:subinfo="item" v-bind:num="i" v-on:alterSubTitle="alterS"></CreateAlterSub>
          <mu-button color="error" @click.prevent="deleteS(i)">删除</mu-button>
        </div>
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
      }
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
      this.titleObj[0][d.tnum].flag = 1;
    },
    //修改子组件穿过来的主观题对象
    alterS(d) {
      this.titleObj[1][d.tnum].subMark = d.subMark;
      this.titleObj[1][d.tnum].subTitle = d.subTitle;
      this.titleObj[1][d.tnum].subAns = d.subAns;
      this.titleObj[1][d.tnum].flag = 1;
    },
    //删除试卷
    deletePaper() {
      let that = this;
      this.axios
        .post(this.apiUrl.deletePaper, {
          paperId: this.$route.query.paper_id,
          userName: this.$route.query.id
        })
        .then(function(response) {
          alert(response.data);
          that.$router.go(-1);
        })
        .catch(function(error) {
          alert("失败");
        });
    },
    //提交试卷信息
    subAlter() {
      let that = this;
      console.log(this.titleObj);
      this.axios
        .post(this.apiUrl.alterPaper, {
          paperId: this.$route.query.paper_id,
          userName: this.$route.query.id,
          paperName:that.form.input,
          startTime:that.form.start,
          endTime:that.form.end,
          setTime:that.form.settime,
          title:that.titleObj
        })
        .then(function(response) {
          alert(response.data);
          that.$router.go(-1);
        })
        .catch(function(error) {
          alert("失败");
        });
    },
    deleteT(i) {
      this.titleObj[0].splice(i, 1);
    },
    deleteS(i) {
      this.titleObj[1].splice(i, 1);
    }
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
  mounted() {
    let that = this;
    this.axios
      .post(this.apiUrl.getExamPaperTitleInfo, {
        paperId: this.$route.query.paper_id,
        userName: this.$route.query.id
      })
      .then(function(response) {
        console.log(response.data);
        //赋值基本信息
        that.form.input = response.data[2][0].PAPER_NAME;
        that.form.end = response.data[2][0].END_TIME;
        that.form.start = response.data[2][0].START_TIME;
        that.form.settime = response.data[2][0].SET_TIME;
        //赋值客观题
        for (let i = 0; i < response.data[0].length; i++) {
          let a = {
            AC: response.data[0][i].A,
            BC: response.data[0][i].B,
            CC: response.data[0][i].C,
            DC: response.data[0][i].D,
            objTitle: response.data[0][i].QUES_CONTENT,
            objAns: response.data[0][i].ANS,
            objMark: response.data[0][i].QUES_MAX,
            id: response.data[0][i].QUES_ID,
            type:response.data[0][i].QUES_TYPE
          };
          that.titleObj[0].push(a);
        }
        //赋值主观题
        for (let i = 0; i < response.data[1].length; i++) {
          let a = {
            subMark: response.data[1][i].QUES_MAX,
            subTitle: response.data[1][i].QUES_CONTENT,
            subAns: response.data[1][i].ANS,
            type:response.data[1][i].QUES_TYPE,
            id: response.data[1][i].QUES_ID
          };
          that.titleObj[1].push(a);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  components: {
    CreateNew,
    CreateAlterObj,
    CreateAlterSub,
    Title
  }
};
</script>

