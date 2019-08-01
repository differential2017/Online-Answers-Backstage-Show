import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import CreateMain from "@/views/CreateMain";
import PreviewMain from "@/views/PreviewMain";
import PreviewAlter from "@/views/PreviewAlter";
import PeopleShow from "@/views/PeopleShow";
import PaperShow from "@/views/PaperShow";
import MarkExam from "@/views/MarkExam"
Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/createmain",
      name: "CreateMain",
      component: CreateMain
    },
    {
      path: "/previewmain",
      name: "PreviewMain",
      component: PreviewMain
    },
    {
      path: "/previewalter",
      name: "PreviewAlter",
      component: PreviewAlter
    },
    {
      path:"/papershow",
      name:"PaperShow",
      component:PaperShow
    },
    {
      path: "/peopleshow",
      name: "PeopleShow",
      component: PeopleShow
    },
    {
      path: "/markexam",
      name: "MarkExam",
      component: MarkExam
    }
  ]
});
