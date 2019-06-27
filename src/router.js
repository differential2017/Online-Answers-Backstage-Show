import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Main from "@/views/Main";
import CreateMain from "@/views/CreateMain";
import PreviewMain from "@/views/PreviewMain";
import PreviewAlter from "@/views/PreviewAlter";
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
      path: "/main",
      name: "Main",
      component: Main
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
    }
  ]
});
