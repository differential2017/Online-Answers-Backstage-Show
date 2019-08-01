<template>
  <!-- 客观题表单 -->
  <mu-container>
    <label>题目</label>
    <mu-text-field v-model="objObj.objTitle" multi-line :rows="4" full-width class="title-form"></mu-text-field>
    <!-- 上交图片 -->
    <div>
    <img src alt ref="img" class="upimg"/>
    <input name="file" type="file" accept="image/png, image/gif, image/jpeg" @change="uploadImg" />
    </div>
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
    <mu-button slot="actions" flat color="primary" @click="close">关闭</mu-button>
    <mu-button slot="actions" flat color="primary" @click="submit">确定</mu-button>
  </mu-container>
</template>
<style>
.upimg{
  width: 500px;
  margin: 0 auto;
}
</style>

<script>
export default {
  data() {
    return {
      //客观题对象
      // type 类型
      // objTitle 题干
      // objAns 标答
      // AC~BC 选项内容
      // objMark 满分
      // img 图片
      objObj: {
        type: 0,
        objTitle: null,
        objAns: null,
        AC: null,
        BC: null,
        CC: null,
        DC: null,
        objMark: null,
        img:null
      },
      options: ["A", "B", "C", "D"]
    };
  },
  methods: {
    // 提交对象并关闭视图
    submit() {
      this.$emit("titleInfo", false, this.objObj);
    },
    close() {
      this.$emit("titleInfo", false);
    },
    //展示图片
    uploadImg(e) {
      let file = e.target.files[0];
      var reader = new FileReader();
      const that = this;
      reader.onload = (evt) => {
        that.$refs.img.src = evt.target.result;
        that.objObj.img=file;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

