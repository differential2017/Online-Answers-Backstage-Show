<template>
  <!-- 主观题的信息 -->
  <mu-container>
    <label>题目</label>
    <mu-text-field v-model="subObj.subTitle" multi-line :rows="4" full-width class="title-form"></mu-text-field>
    <!-- 上交图片 -->
    <div>
      <img src alt ref="img" class="upimg"/>
      <input name="file" type="file" accept="image/png, image/gif, image/jpeg" @change="uploadImg" />
    </div>
    <label>答案</label>
    <mu-text-field v-model="subObj.subAns" multi-line :rows="4" full-width></mu-text-field>
    <label>分值</label>
    <mu-text-field v-model="subObj.subMark"></mu-text-field>
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
      // 主观题对象
      subObj: {
        type: 1,
        subMark: null,
        subTitle: null,
        subAns: null,
        img: null
      }
    };
  },
  methods: {
    submit() {
      this.$emit("titleInfo", false, this.subObj);
    },
    close() {
      this.$emit("titleInfo", false);
    },
    //展示图片
    uploadImg(e) {
      let file = e.target.files[0];
      var reader = new FileReader();
      const that = this;
      reader.onload = evt => {
        that.$refs.img.src = evt.target.result;
        that.subObj.img = file;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style>
</style>
