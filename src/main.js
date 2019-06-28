import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import axios from 'axios';
//api 接口
Vue.prototype.apiUrl = {
  // 管理员验证登录  
  adminLogin:"http://localhost:8088/sql/codeIgniter-3.1.10/index.php/login/checkadmin",
  //提交试卷
  examPaperInfo:"http://localhost:8088/sql/CodeIgniter-3.1.10/index.php/examinfo/subinfo",
  //获得试卷信息
  getExamPaperInfo:"http://localhost:8088/sql/CodeIgniter-3.1.10/index.php/examinfo/getexaminfo",
  //通过试卷id 得到试题信息
  getExamPaperTitleInfo:"http://localhost:8088/sql/CodeIgniter-3.1.10/index.php/examinfo/getexamtitle",
  //删除试卷
  deletePaper:"http://localhost:8088/sql/CodeIgniter-3.1.10/index.php/examinfo/deleteexam",
  //修改试卷
  alterPaper:"http://localhost:8088/sql/CodeIgniter-3.1.10/index.php/examinfo/alterexam"
};  

//事件总线
Vue.prototype.bus = new Vue();
Vue.prototype.axios = axios;
Vue.config.productionTip = false
Vue.use(MuseUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
