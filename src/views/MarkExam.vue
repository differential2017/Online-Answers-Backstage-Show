<template>
  <mu-container>
    判卷子
    <!-- 客观题部分 -->
    <div button v-for="(key,value) in titleObj[0]" :key="value" class="title-item">
      <div>题号:{{value+1}}</div>
      <div>题目: {{key.objTitle}}</div>
      <div>A选项： {{key.AC}}</div>
      <div>B选项： {{key.BC}}</div>
      <div>C选项： {{key.CC}}</div>
      <div>D选项： {{key.DC}}</div>
      <div>答案：{{key.ANS}}</div>
      <div>考生答案：{{key.USER_ANS}}</div>
      <div>该题得分：{{key.ANS_MARK}}</div>
      <div>总分值： {{key.objMark}}</div>
    </div>
    <!-- 主观题部分 -->
    <div button v-for="(item,i) in titleObj[1]" :key="i+'1111'" class="title-item">
      <div>题号：{{titleObj[0].length+i+1}}</div>
      <div>
        题目：
        <br />
        {{item.subTitle}}
      </div>
      <br />
      <div>
        考生回答：
        <br />
        {{item.USER_ANS}}
      </div>
      <label>得分：</label>
      <mu-text-field v-model="item.ans_mark"></mu-text-field>
      <div>分数:{{item.subMark}}</div>
    </div>
    <mu-button color="primary" @click.prevent="save">保存</mu-button>
  </mu-container>
</template>
<style>
.ans {
  text-align: left;
}
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
.subAns {
  margin-top: 20px;
  text-align: center;
}
</style>
<script>
export default {
  data() {
    return {
      titleObj: [[], []],
      paperId: null
    };
  },
  methods: {
    save() {
      let that = this;
      this.axios
        .post(that.apiUrl.saveSub, {
          adminId: that.$route.query.adminId,  
          userId: that.$route.query.userId,
          paperId: that.$route.query.paperId,
          sub: that.titleObj[1]
        })
        .then(function(response) {
          alert(response.data);
        });
      this.$router.go(-1);
    }
  },
  mounted() {
    let that = this;
    that.axios
      .post(that.apiUrl.peopleAnsInfo, {
        paperId: that.$route.query.paperId,
        userId: that.$route.query.userId
      })
      .then(function(response) {
        //赋值客观题 并生成对应数量的 回答客观题对象
        for (let i = 0; i < response.data[0].length; i++) {
          let a = {
            AC: response.data[0][i].A,
            BC: response.data[0][i].B,
            CC: response.data[0][i].C,
            DC: response.data[0][i].D,
            objTitle: response.data[0][i].QUES_CONTENT,
            objMark: response.data[0][i].QUES_MAX,
            id: response.data[0][i].QUES_ID,
            type: response.data[0][i].QUES_TYPE,
            ANS: response.data[0][i].ANS,
            ANS_MARK: response.data[0][i].ANS_MARK,
            USER_ANS: response.data[0][i].USER_ANS
          };
          that.titleObj[0].push(a);
        }
        //赋值主观题
        for (let i = 0; i < response.data[1].length; i++) {
          let a = {
            subMark: response.data[1][i].QUES_MAX,
            subTitle: response.data[1][i].QUES_CONTENT,
            type: response.data[1][i].QUES_TYPE,
            id: response.data[1][i].QUES_ID,
            USER_ANS: response.data[1][i].USER_ANS,
            ans_mark: null
          };
          that.titleObj[1].push(a);
        }
      })
      .catch(function(error) {});
  }
};
</script>
