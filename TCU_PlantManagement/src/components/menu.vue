<template>
  <div>
    <!-- 头部 -->
    <header id="topnav">
      <div class="topbar-main">
        <div class="container">
          <div class="topbar-left">
            <a href="#/menu" class="logo">
              <i class="md md-terrain"></i>
              <span>
                <router-link to="/menu/index" class="router"
                  >天津城建大学植物信息管理系统</router-link
                >
              </span>
            </a>
          </div>
          <div class="menu-extras">
            <ul class="nav navbar-nav navbar-right pull-right">
              <li>
                <form
                  role="search"
                  class="navbar-left app-search pull-left hidden-xs"
                >
                  <input
                    type="text"
                    placeholder="搜索..."
                    class="form-control"
                  />
                  <a href>
                    <i class="fa fa-search"></i>
                  </a>
                </form>
              </li>
              <li class="dropdown hidden-xs">
                <a
                  href="#"
                  data-target="#"
                  class="dropdown-toggle waves-effect waves-light"
                  data-toggle="dropdown"
                  aria-expanded="true"
                >
                  <i class="md md-notifications"></i>
                  <span class="badge badge-xs badge-danger">3</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-lg">
                  <li class="text-center notifi-title">通知</li>
                  <li class="list-group">
                    <!-- list item-->
                    <a href="javascript:void(0);" class="list-group-item">
                      <div class="media">
                        <div class="pull-left">
                          <em class="fa fa-user-plus fa-2x text-info"></em>
                        </div>
                        <div class="media-body clearfix">
                          <div class="media-heading">新用户申请</div>
                          <p class="m-0">
                            <small>You have 10 unread messages</small>
                          </p>
                        </div>
                      </div>
                    </a>
                    <!-- list item-->
                    <a href="javascript:void(0);" class="list-group-item">
                      <div class="media">
                        <div class="pull-left">
                          <em class="fa fa-diamond fa-2x text-primary"></em>
                        </div>
                        <div class="media-body clearfix">
                          <div class="media-heading">新设置</div>
                          <p class="m-0">
                            <small>There are new settings available</small>
                          </p>
                        </div>
                      </div>
                    </a>
                    <a href="javascript:void(0);" class="list-group-item">
                      <div class="media">
                        <div class="pull-left">
                          <em class="fa fa-bell-o fa-2x text-danger"></em>
                        </div>
                        <div class="media-body clearfix">
                          <div class="media-heading">更新</div>
                          <p class="m-0">
                            <small>
                              There are
                              <span class="text-primary">2</span> new updates
                              available
                            </small>
                          </p>
                        </div>
                      </div>
                    </a>
                    <a href="javascript:void(0);" class="list-group-item">
                      <small>显示所有的通知</small>
                    </a>
                  </li>
                </ul>
              </li>

              <li class="dropdown user-box">
                <a
                  href
                  class="dropdown-toggle waves-effect waves-light profile"
                  data-toggle="dropdown"
                  aria-expanded="true"
                >
                  <img
                    :src="icon_src"
                    alt="user-img"
                    class="img-circle user-img"
                  />
                  <div class="user-status away">
                    <i class="zmdi zmdi-dot-circle"></i>
                  </div>
                </a>

                <ul class="dropdown-menu">
                  <li>
                    <a href="javascript:void(0)">
                      <i class="md md-face-unlock"></i> 简介
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i class="md md-settings"></i> 设置
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i class="md md-lock"></i> 锁屏
                    </a>
                  </li>
                  <li @click="logout()">
                    <a> <i class="md md-settings-power"></i> 注销 </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="menu-item">
              <a class="navbar-toggle">
                <div class="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-custom">
        <div class="container">
          <div id="navigation">
            <ul class="navigation-menu">
              <li class="active">
                <a href="#/menu/index">
                  <i class="md md-home"></i>
                  <span>首页</span>
                </a>
              </li>

              <li class="has-submenu">
                <a href="#">
                  <i class="md md-palette"></i>
                  <span>植物管理</span>
                </a>
                <ul class="submenu">
                  <li>
                    <a @click="toPlant(1)">地被管理</a>
                  </li>
                  <li>
                    <a @click="toPlant(2)">灌木管理</a>
                  </li>
                  <li>
                    <a @click="toPlant(4)">乔木管理</a>
                  </li>
                  <li>
                    <a @click="toPlant(5)">藤木管理</a>
                  </li>
                  <li>
                    <a @click="toPlant(3)">其他管理</a>
                  </li>
                </ul>
              </li>

              <li class="has-submenu">
                <a href="#">
                  <i class="md md-description"></i>
                  <span>档案管理</span>
                </a>
                <ul class="submenu">
                  <li>
                    <a href="#/menu/kindlist">类别列表</a>
                  </li>
                  <li>
                    <a href="#/menu/plantlist">种类列表</a>
                  </li>
                  <li>
                    <a href="#/menu/doclist">档案列表</a>
                  </li>
                </ul>
              </li>

              <li class="has-submenu">
                <a href="#">
                  <i class="md md-invert-colors-on"></i>
                  <span>养护管理</span>
                </a>
                <ul class="submenu">
                  <li>
                    <a href="#/menu/prolist">养护清单</a>
                  </li>
                  <li>
                    <a href="#/menu/callback">师生反馈</a>
                  </li>
                </ul>
              </li>

              <li class="has-submenu">
                <a href="#">
                  <i class="md md-remove-red-eye"></i>
                  <span>校园风景</span>
                </a>
                <ul class="submenu">
                  <li>
                    <a href="#/menu/photo">风景图片</a>
                  </li>
                </ul>
              </li>

              <li class="has-submenu">
                <a href="#">
                  <i class="md md-pages"></i>
                  <span>关于我们</span>
                </a>
                <ul class="submenu megamenu">
                  <li>
                    <ul>
                      <li>
                        <a href="javascript:void(0)">系统简介</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">部门介绍</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">功能介绍</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">反馈信息</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <a href="http://www.tcu.edu.cn/">学校主页</a>
                      </li>
                      <li>
                        <a href="http://cwc.tcu.edu.cn/">财务处</a>
                      </li>
                      <li>
                        <a href="http://jwc.tcu.edu.cn/">教务处</a>
                      </li>
                      <li>
                        <a href="http://kyc.tcu.edu.cn/">科技处</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <!-- Content Part-->
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- End Content Part-->

    <!-- Footer -->
    <footer class="footer text-right yxfoot">
      <div class="container">
        <div class="row">
          <div class="col-xs-6">2019 © 天津城建大学</div>
          <div class="col-xs-6">
            <ul class="pull-right list-inline m-b-0">
              <li>
                <a href="#">关于</a>
              </li>
              <li>
                <a href="#">帮助</a>
              </li>
              <li>
                <a href="#">联系</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
const cookie = require("../utils/cookie");
const s_alert = require("../utils/alert");
const ses = require("../utils/ses");
const print = require("../utils/print");
const apis = require("../interface/apis").default;

import { mapMutations } from "vuex";

export default {
  name: "menus",
  data() {
    return {
      icon_src: "api/www/logo/logo.jpeg",
    };
  },
  async mounted() {
    //默认加载 index
    // this.$router.push("/menu/index");
    setInterval(() => {
      if (localStorage.getItem("isLogin") != 1) {
        s_alert.basic("缺少登录态");
        window.location.href = "/";
      }
    }, 5000);
  },
  methods: {
    ...mapMutations(["LOGOUT"]),
    logout() {
      this.LOGOUT();
      s_alert.basic("注销成功！");
      setTimeout(function () {
        window.location.href = "/";
      }, 2000);
    },
    // 页面跳转
    toPlant(kind) {
      this.$router.push({ name: "menu" });
      setTimeout(() => {
        this.$router.push({ name: "plant", params: { kind } });
      }, 50);
    },
  },
};
</script>

<style scoped>
.bc {
  background-color: black;
}
.yxfoot {
  position: fixed;
  bottom: 0;
}
.content {
  margin-top: 150px;
  height: 100px;
}
.router {
  color: white;
  font-weight: normal;
}
</style>
