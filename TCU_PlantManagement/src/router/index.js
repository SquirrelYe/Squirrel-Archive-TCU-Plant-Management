import Vue from "vue";
import Router from "vue-router";
import login from "@/components/login";
import register from "@/components/register";
import recoverypw from "@/components/recoverypw";
import menu from "@/components/menu";
import resetpwd from "@/components/resetPwd";
// test
import init from "@/components/test/init";
import welcome from "@/components/test/welcome";
import ceshi from "@/components/test/ceshi";
// manage
import index from "@/components/mange/index";
// plant
import plant from "@/components/plant/plant";
import proList from "@/components/plant/prolist";
import photo from "@/components/plant/photo";
import calllist from "@/components/plant/calllist";
// document
import docList from "@/components/document/docList";
import kindList from "@/components/document/kindList";
import plantList from "@/components/document/plantList";
import plantmap from "@/components/document/plantmap";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/init", name: "init", component: init },
    { path: "/login/:id", name: "login", component: login },
    { path: "/", name: "login", component: login, meta: { needLogin: true } },
    { path: "/register", name: "register", component: register },
    { path: "/recoverypw/", name: "recoverypw", component: recoverypw },
    { path: "/resetpwd/:id", name: "resetpwd", component: resetpwd },
    { path: "/welcome", name: "welcome", component: welcome },
    { path: "/ceshi", name: "ceshi", component: ceshi },
    {
      path: "/menu",
      name: "menu",
      component: menu,
      children: [
        { path: "/", name: "index", component: index },
        { path: "index", component: index },

        { path: "plant/:kind", name: "plant", component: plant },
        { path: "prolist", component: proList },
        { path: "photo", component: photo },
        { path: "callback", component: calllist },

        { path: "doclist", component: docList },
        { path: "kindlist", component: kindList },
        { path: "plantlist", component: plantList },

        { path: "plantmap", component: plantmap },
      ],
    },
  ],
});
