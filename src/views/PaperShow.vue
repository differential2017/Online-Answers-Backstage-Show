<template>
  <div>
    <Title></Title>
    <!-- 查看试卷 决定判哪个试卷 -->
    <mu-container>
      <mu-select label="筛选部门" v-model="depart" full-width>
        <mu-option
          v-for="(option,index) in options"
          :key="index"
          :label="option.DEPART_NAME"
          :value="option.DEPART_NAME"
        ></mu-option>
      </mu-select>
      <mu-paper :z-depth="1">
        <mu-data-table
          :columns="columns"
          :sort.sync="sort"
          @sort-change="handleSortChange"
          :data="list.slice((current-1)*10,current*10)"
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
            >判卷</mu-button>
          </template>
        </mu-data-table>
      </mu-paper>
       <mu-flex justify-content="center" style="margin: 32px 0;">
        <mu-pagination raised :total="sum" :current.sync="current"></mu-pagination>
      </mu-flex>
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
import Title from "@/components/Title";
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
      options:[],
      list: [],
      depart:null,
      saveList:[],
      current:1,
      sum:0
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
        path: "/peopleshow",
        query: { paper_id: i }
      });
    }
  },
    watch:{
    depart(value){
      this.list=[];
      for(let i = 0; i< this.saveList.length;i++){
        if(this.saveList[i].DEPART_NAME==value){
          this.list.push(this.saveList[i]);
        }
      }
    }
  },
  mounted() {
    let that = this;
    this.bus.$emit("adminInfo", this.$route.query.id);
    // 请求卷子信息
    this.axios
      .post(this.apiUrl.getExamPaperInfo, {})
      .then(function(response) {
        that.list = response.data;
        that.saveList=that.list;
        that.sum=that.list.length;
        
        //对START_TIME进行排序
        for (let i = 0; i < that.list.length; i++) {
          for (let j = 0; j < that.list.length - 1 - i; j++) {
            if (new Date(that.list[j].START_TIME) < new Date(that.list[j + 1].START_TIME)) {
              let t = that.list[j];
              that.list[j] = that.list[j + 1];
              that.list[j + 1] = t;
            }
          }
        }
      })
      .catch(function(error) {
        alert("请求失败");
      });
    //请求部门信息
    this.axios
      .post(this.apiUrl.departName, {})
      .then(function(response) {
        console.log(response.data);
        that.options = response.data;
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
  components: {
    Title
  }
};
</script>