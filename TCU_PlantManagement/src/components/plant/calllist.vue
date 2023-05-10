<template>
  <div class="wrapper">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h4 class="page-title">用户反馈</h4>
        </div>
      </div>
      <div class="panel">
        <div class="panel-body">
          <div class="row">
            <div class="col-sm-6">
              <div class="dataTables_length" id="datatable-editable_length">
                <label>
                  显示
                  <select
                    class="form-control input-sm"
                    v-model="PageShowSum"
                    @change="changePageShowSum()"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  项
                </label>
              </div>
            </div>
          </div>
          <div>
            <table
              class="table table-bordered table-striped"
              style
              id="datatable-editable"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>编号</th>
                  <th>树牌</th>
                  <th>反馈学号</th>
                  <th>内容</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="gradeX"
                  v-for="(item, index) in showItems"
                  :key="index"
                >
                  <td>{{ index }}</td>
                  <td>{{ item.id }}</td>
                  <td v-if="item.list">{{ item.list.card }}</td>
                  <td v-else></td>
                  <td v-if="item.user">{{ item.user.stu_id }}</td>
                  <td v-else></td>
                  <td>{{ item.callback }}</td>
                  <td>{{ item.created_at }}</td>

                  <td class="actions">
                    <label
                      @click="getLocation(item)"
                      data-toggle="modal"
                      data-target="#location"
                    >
                      <i
                        class="fa fa-location-arrow"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="位置"
                      ></i>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row">
              <div class="col-sm-6">
                <div
                  class="dataTables_info"
                  id="datatable-editable_info"
                  role="status"
                  aria-live="polite"
                >
                  展示 {{ PageShowSum }} 总共 {{ total }} 项 {{ sumPage }} 页
                </div>
              </div>
              <div class="col-sm-6">
                <div
                  class="dataTables_paginate paging_simple_numbers"
                  id="datatable-editable_paginate"
                >
                  <ul class="pagination">
                    <li
                      class="paginate_button previous"
                      :class="{ disabled: currentPage === 0 }"
                    >
                      <a @click="previousPage()">上一页</a>
                    </li>
                    <li class="paginate_button active">
                      <a>{{ currentPage + 1 }}</a>
                    </li>
                    <li
                      class="paginate_button next"
                      :class="{ disabled: currentPage === sumPage - 1 }"
                    >
                      <a @click="nextPage()">下一页</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 档案定位信息 -->
    <div
      id="location"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="custom-width-modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style="width: 55%">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
            <h4 class="modal-title" id="myModalLabel">档案定位信息</h4>
          </div>
          <div class="modal-body" align="center">
            <div class="row">
              <div class="col-sm-12">
                <div class="panel panel-default">
                  <div class="panel-body" style="height: 50vh">
                    <!-- 地图 -->
                    <div id="app" style="height: 100%; width: 100%">
                      <div id="gpslocation" ref="gpslocation"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const cookie = require("../../utils/cookie");
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const print = require("../../utils/print");
const apis = require("../../interface/apis").default;

import { mapMutations } from "vuex";

export default {
  name: "doclist",
  data() {
    return {
      // 分页信息
      off: 0,
      currentPage: 0,
      sumPage: 0,
      PageShowSum: 10,

      showItems: [],
      total: 0,

      detail: null,
      item: null,

      // 新建
      kinds: null,
      plants: null,
      createItem: { condition: 0 },
    };
  },
  mounted() {
    this.getPage();
    this.init();
  },
  updated() {
    $(function () {
      $("[data-toggle='tooltip']").tooltip();
    });
  },
  methods: {
    // 获取偏移量
    getPage() {
      this.off = this.currentPage * this.PageShowSum;
    },
    // 初始化数据
    async init() {
      let lists = await apis.call.findAndCountAll(this.off, this.PageShowSum);
      const { count, rows } = lists.data;
      this.total = count;
      this.showItems = rows;
      this.sumPage = Math.ceil(this.total / this.PageShowSum);
      console.log(lists.data);
    },
    // 更改页面单元展示数量
    changePageShowSum() {
      this.currentPage = 0;
      this.off = 0;
      this.init();
    },
    // 上一页
    previousPage() {
      if (this.currentPage === 0) {
        s_alert.basic("不能哟~");
        return;
      }
      this.currentPage--;
      this.getPage();
      this.init();
    },
    // 下一页
    nextPage() {
      if (this.currentPage === this.sumPage - 1) {
        s_alert.basic("不能哟~");
        return;
      }
      this.currentPage++;
      this.getPage();
      this.init();
    },
    // 定位
    getLocation(item) {
      const { x, y, height, lon, lat, name, card, kind } = item.list;
      console.log(item);
      //GPS坐标
      var ggPoint = new BMap.Point(lon, lat);

      //主界面右侧小地图
      let map = new BMap.Map(this.$refs.gpslocation); // 创建Map实例
      map.centerAndZoom(ggPoint, 18); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.NavigationControl());

      //坐标转换完之后的回调函数
      function translateCallback(data) {
        console.log(data);
        if (data.status === 0) {
          var marker = new BMap.Marker(data.points[0]);
          map.addOverlay(marker);
          // var label = new BMap.Label("叶武当前所在位置",{offset:new BMap.Size(30,-10)});
          // marker.setLabel(label); //添加百度label
          map.setCenter(data.points[0]);

          let opts = {
            width: 250, // 信息窗口宽度
            height: 100, // 信息窗口高度
            title: name + "-" + card, // 信息窗口标题
          };
          let detail = `
                    位置经度：${x},<br>
                    位置纬度：${y},<br>
                    位置高度：${height},<br>
                    lon:${lon},
                    lat:${lat}
                    `;
          let infoWindow = new BMap.InfoWindow(detail, opts); // 创建信息窗口对象
          map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口

          marker.addEventListener("click", function (e) {
            map.openInfoWindow(
              infoWindow,
              new BMap.Point(e.point.lng, e.point.lat)
            ); // 打开信息窗口
          });
        }
      }
      setTimeout(function () {
        var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, 1, 5, translateCallback);
      }, 200);
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
  },
};
</script>
<style scoped>
#gpslocation {
  height: 100%;
  overflow: hidden;
}
</style>
