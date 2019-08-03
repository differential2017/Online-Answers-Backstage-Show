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
      scrollable
    >
      <!-- 题目的表单 -->
      <mu-container>
        <label>题目</label>
        <mu-text-field v-model="subObj.subTitle" multi-line :rows="4" full-width class="title-form"></mu-text-field>
        <div>
          <img :src="subObj.img" alt class="upimg" />
          <br />
          <label for="upfile">
            <span class="upbutton">上传文件</span>
          </label>
          <input
            name="file"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            @change="uploadImg"
            style="display:none"
            id="upfile"
          />
        </div>
        <label>答案</label>
        <mu-text-field v-model="subObj.subAns" multi-line :rows="4" full-width></mu-text-field>
        <label>分值</label>
        <mu-text-field v-model="subObj.subMark"></mu-text-field>
        <br />
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">关闭</mu-button>
        <mu-button slot="actions" flat color="primary" @click="submit">确定</mu-button>
      </mu-container>
    </mu-dialog>
  </mu-container>
</template>

<script>
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
        subAns: null,
        img: null
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
    },
    //展示图片
    uploadImg(e) {
      let file = e.target.files[0];
      var reader = new FileReader();
      const that = this;
      reader.onload = evt => {
        that.subObj.img = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  mounted() {
    this.subObj.tnum = this.num;
    this.subObj.subMark = this.subinfo.subMark;
    this.subObj.subTitle = this.subinfo.subTitle;
    this.subObj.subAns = this.subinfo.subAns;
    let file = this.subinfo.img;
    this.subObj.img=file;
  },
  watch: {
    subinfo: {
      deep: true,
      handler(n) {
        this.subObj.tnum = this.num;
        this.subObj.subMark = n.subMark;
        this.subObj.subTitle = n.subTitle;
        this.subObj.subAns = n.subAns;
        this.subObj.img = n.img;
      }
    }
  }
};
</script>