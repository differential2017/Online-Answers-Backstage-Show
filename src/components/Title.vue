<template>
  <!-- 页头 -->
  <mu-appbar style="width:100%;" color="primary">
    <button color="primary" @click="open = !open" class="menu" slot="left">菜单</button>
    <span slot="right" class="right">在线答题后台管理系统</span>
    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
      <mu-list>
        <div class="admin_info">您好,{{account}}</div>
        <mu-list-item button @click.prevent="create">
          <mu-list-item-title>创建试卷</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click.prevent="preview">
          <mu-list-item-title>预览试卷</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click.prevent="show">
          <mu-list-item-title>判卷</mu-list-item-title>
        </mu-list-item>
        <mu-list-item @click="open = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </mu-appbar>
</template>

<style>
.admin_info {
  padding: 20px;
}
.right {
  margin-right: 50px;
  color: white;
  font-size: 18px;
}
.menu {
  border: 0;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  margin-left: 50px;
  color: white;
  font-size: 18px;
}
</style>

<script>
export default {
  data() {
    return {
      docked: false,
      open: false,
      position: "left",
      account: null
    };
  },
  methods: {
    create() {
      this.$router.push({
        path: "/createmain",
        query: { id: this.$route.query.id }
      });
    },
    preview() {
      this.$router.push({
        path: "/previewmain",
        query: { id: this.$route.query.id }
      });
    },
    show() {
      console.log("11");
      this.$router.push({
        path: "/papershow",
        query: { id: this.$route.query.id }
      });
    }
  },
  mounted() {
    this.bus.$on("adminInfo", data => {
      this.account = data;
    });
  }
};
</script>
