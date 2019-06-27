<template>
  <div>
    <Title></Title>
     <mu-container>
    <mu-paper :z-depth="1">
      <mu-data-table
        :columns="columns"
        :sort.sync="sort"
        @sort-change="handleSortChange"
        :data="list"
        class="preview-form"
      >
        <template slot-scope="scope">
          <td class="is-center">{{scope.row.DEPART_NAME}}</td>
          <td class="is-center">{{scope.row.PAPER_NAME}}</td>
          <td class="is-center">{{scope.row.START_TIME | t}}</td>
          <td class="is-center">{{scope.row.END_TIME | t}}</td>
          <td class="is-center">{{scope.row.SET_TIME}}</td>
          <mu-button
            color="primary"
            class="is-center update-button"
            @click.prevent="goToPreviewAlter(scope.row.PAPER_ID)"
          >修改</mu-button>
        </template>
      </mu-data-table>
    </mu-paper>
     </mu-container>
  </div>
</template>
<style>
.update-button {
  margin-left: 50px !important;
  margin-top: 5px !important;
}
.preview-form {
  margin-top: 30px;
}
</style>

<script>
import Title from "@/components/Title"
export default {
  data() {
    return {
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: "试卷所属部门", name: "DEPART_NAME", align: "center" },
        { title: "试卷名", name: "PAPER_NAME", align: "center" },
        { title: "开始时间", name: "START_TIME", align: "center" },
        { title: "结束时间", name: "END_TIME", align: "center" },
        { title: "考试时长", name: "SET_TIME", align: "center" },
        { title: "修改", align: "center" }
      ],
      list: []
    };
  },
  methods: {
    handleSortChange({ name, order }) {
      this.list = this.list.sort((a, b) =>
        order === "asc" ? a[name] - b[name] : b[name] - a[name]
      );
    },
    goToPreviewAlter(i) {
      this.$router.push({
        path: "/previewalter",
        query: { id: this.$route.query.id,paper_id: i }
      });
    }
  },
  mounted() {
    let that = this;
    this.bus.$emit('adminInfo',this.$route.query.id);
    //请求卷子信息
    this.axios
      .post(this.apiUrl.getExamPaperInfo, {})
      .then(function(response) {
        that.list = response.data;
        console.log(that.list);
      })
      .catch(function(error) {
        alert("请求失败");
      });
  },
  filters: {
    t: function(time) {
      var t = new Date(time);
      var y = t.getFullYear();
      var mm = t.getMonth() + 1;
      var d = t.getDate();
      var h = t
        .getHours()
        .toString()
        .padStart(2, "0");
      var m = t
        .getMinutes()
        .toString()
        .padStart(2, "0");
      mm = mm.toString().padStart(2, "0");
      d = d.toString().padStart(2, "0");
      return `${y}-${mm}-${d} ${h}:${m}`;
    }
  },
  components:{
    Title
  }
};
</script>