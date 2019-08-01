<template>
  <!-- 展示考生信息的界面 -->
  <div>
    <Title></Title>
    <mu-container>
      <p>只会展示已经作答了该试卷的人员信息</p>
      <label for>学号</label>
      <mu-text-field v-model="id"></mu-text-field>
      <br />
      <mu-paper :z-depth="1">
        <mu-data-table
          stripe
          :columns="columns"
          :sort.sync="sort"
          @sort-change="handleSortChange"
          :data="list"
        >
          <template slot-scope="scope">
            <td class="is-center">{{scope.row.fresh_id}}</td>
            <td class="is-center">{{scope.row.fresh_name}}</td>
            <td class="is-center">{{scope.row.objmark}}</td>
            <td class="is-center">{{scope.row.submark}}</td>
            <td class="is-center">{{scope.row.max}}</td>
            <td class="is-center">
              <mu-button color="primary" @click.prevent="goToMark(scope.row)">详情</mu-button>
            </td>
          </template>
        </mu-data-table>
      </mu-paper>
    </mu-container>
  </div>
</template> 

<script>
import Title from "@/components/Title";
export default {
  data() {
    return {
      id:null,
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: "学号", align: "center", name: "fresh_id" },
        {
          title: "姓名",
          name: "fresh_name",
          align: "center"
        },
        {
          title: "客观题得分",
          name: "submaek",
          align: "center",
          sortable: true
        },
        {
          title: "主观题得分",
          name: "objmark",
          align: "center",
          sortable: true
        },
        {
          title: "总分",
          name: "max",
          align: "center",
          sortable: true
        },
        {
          title: "详情",
          name: "info",
          align: "center"
        }
      ],
      list: [],
      saveList:[]
    };
  },
  methods: {
    search() {
      let that = this;
      that.axios
        .post(that.apiUrl.ansInfo, {
          grade: that.grade,
          depart: that.depart
        })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {});
    },
    handleSortChange({ name, order }) {
      this.list = this.list.sort((a, b) =>
        order === "asc" ? a[name] - b[name] : b[name] - a[name]
      );
    },
    goToMark(d) {
      let that=this;
      this.$router.push({
        path: "/markexam",
        query: {
          userId: d.fresh_id,
          paperId: that.$route.query.paper_id,
          adminId:that.$route.query.id
        }
      });
    }
  },
  watch:{
    id(value){
    this.list=[];
      for(let i = 0; i< this.saveList.length;i++){
        if(this.saveList[i].fresh_id.indexOf(value)!=-1){
          this.list.push(this.saveList[i]);
        }
      }
    }
  },
  mounted() {
    let that = this;
    //得到回答信息
    that.axios
      .post(that.apiUrl.ansInfo, {
        paper_id: that.$route.query.paper_id
      })
      .then(function(response) {
        console.log(response.data);
        that.list = response.data;
        that.saveList=that.list;
        //计算总分
        for (let i = 0; i < that.list.length; i++) {
          if (that.list[i].objmark == null && that.list[i].submark != null)
            that.list[i].max = that.list[i].submark;
          else if (that.list[i].objmark != null && that.list[i].submark == null)
            that.list[i].max = that.list[i].objmark;
          else if (that.list[i].objmark != null && that.list[i].submark != null)
            that.list[i].max = parseInt(that.list[i].objmark) + parseInt(that.list[i].submark);
          else that.list[i].max = "无";
          if (that.list[i].objmark == null) {
            that.list[i].objmark = "无";
          }
          if (that.list[i].submark == null) {
            that.list[i].submark = "未批阅";
          }
        }
      })
      .catch(function(error) {});
  },
  components: {
    Title
  }
};
</script>

