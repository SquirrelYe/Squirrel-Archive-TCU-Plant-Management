<template>
  <div class="wrapper">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h4 class="page-title">档案列表</h4>
        </div>
      </div>
      <div class="panel">
        <div class="panel-body">
          <div class="row">
            <div class="col-sm-6">
              <div class="m-b-30">
                <button
                  id="addToTable"
                  class="btn btn-primary waves-effect waves-light"
                  @click="toDocCreate()"
                  data-toggle="modal"
                  data-target="#create"
                >
                  新增植物档案
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
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
            <div class="col-sm-6">
              <div
                id="datatable-editable_filter"
                class="dataTables_filter"
                style="margin-right: 45px"
              >
                <label>
                  搜索:
                  <input
                    type="search"
                    class="form-control input-sm search-input"
                    placeholder="请输入植物名称"
                    v-on:keyup.enter="search()"
                    v-model="doSearchText"
                  />
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
                  <th>号牌</th>
                  <th>位置经度</th>
                  <th>位置纬度</th>
                  <th>位置高程</th>
                  <th>lon</th>
                  <th>lat</th>
                  <th>名称</th>

                  <th>科</th>
                  <th>属</th>
                  <th>种</th>
                  <th>分类</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="gradeX"
                  v-for="(item, index) in showItems"
                  :key="index"
                >
                  <td>{{ item.id }}</td>
                  <td>{{ item.tid }}</td>
                  <td>{{ item.card }}</td>
                  <td>{{ item.x }}</td>
                  <td>{{ item.y }}</td>
                  <td>{{ item.height }}</td>
                  <td>{{ item.lon }}</td>
                  <td>{{ item.lat }}</td>
                  <td>{{ item.name }}</td>

                  <td>{{ item.plant.family }}</td>
                  <td>{{ item.plant.genera }}</td>
                  <td>{{ item.plant.specie }}</td>
                  <td>{{ item.kind.name }}</td>

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
                    <label
                      @click="dodetail(item.plant)"
                      data-toggle="modal"
                      data-target="#Model"
                    >
                      <i
                        class="fa fa-navicon"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="信息"
                      ></i>
                    </label>
                    <label
                      @click="editItem(item)"
                      data-toggle="modal"
                      data-target="#delete"
                    >
                      <i
                        class="fa fa-pencil"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="编辑"
                      ></i>
                    </label>
                    <label @click="deleteItem(item)">
                      <i
                        class="fa fa-trash-o"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="删除"
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
      <div style="margin-top: 100px"></div>
    </div>

    <!-- 新建档案 -->
    <div
      id="create"
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
            <h4 class="modal-title" id="myModalLabel">新建档案信息</h4>
          </div>
          <div class="modal-body" align="center">
            <div class="row">
              <div class="col-sm-12">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label class="col-md-2 control-label">树木编号</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.tid"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">树牌编号</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.card"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">位置经度</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.x"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">位置纬度</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.y"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">位置高程</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.height"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">lon</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.lon"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">lat</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.lat"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">名称</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.name"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <div
                          class="col-md-2 control-label"
                          style="font-weight: 900"
                        >
                          <strong>类型:</strong>
                        </div>
                        <div class="col-md-10">
                          <select
                            class="form-control"
                            v-model="createItem.kind_id"
                          >
                            <option
                              v-for="(item, index) in kinds"
                              :key="index"
                              :value="item.id"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group">
                        <div
                          class="col-md-2 control-label"
                          style="font-weight: 900"
                        >
                          <strong>植株:</strong>
                        </div>
                        <div class="col-md-10">
                          <select
                            class="form-control"
                            v-model="createItem.plant_id"
                          >
                            <option
                              v-for="(item, index) in plants"
                              :key="index"
                              :value="item.id"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default waves-effect"
              data-dismiss="modal"
            >
              关闭
            </button>
            <button
              type="button"
              class="btn btn-primary waves-effect waves-light"
              data-dismiss="modal"
              @click="toCreat()"
            >
              提交档案
            </button>
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

    <!-- 档案详细信息 -->
    <div
      id="Model"
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
            <h4 class="modal-title" id="myModalLabel">档案详细信息</h4>
          </div>
          <div class="modal-body" align="center">
            <div class="row">
              <div class="col-sm-12">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <form class="form-horizontal" role="form" v-if="detail">
                      <div class="form-group">
                        <label class="col-md-2 control-label">名称</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="detail.name"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">学名</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="detail.academic"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">别名</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="detail.alias"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">拉丁名</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            disabled
                            v-model="detail.latin"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">形态</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="detail.morphology"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">习性</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="detail.habit"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">用途</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="detail.purpose"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default waves-effect"
              data-dismiss="modal"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改信息 -->
    <div
      id="delete"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      v-if="item"
    >
      <div class="modal-dialog">
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
            <h4 class="modal-title" id="myModalLabel">编辑植物信息</h4>
          </div>
          <div class="modal-body" align="center">
            <div class="row">
              <div class="col-sm-12">
                <div class="panel panel-default">
                  <div class="panel-heading"><h4>修改植物信息</h4></div>
                  <div class="panel-body">
                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label class="col-md-2 control-label">编号</label>
                        <div class="col-md-10">
                          <input
                            type="number"
                            class="form-control"
                            v-model="item.tid"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">号牌</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="item.card"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">位置经度</label>
                        <div class="col-md-10">
                          <input
                            type="number"
                            class="form-control"
                            v-model="item.x"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">位置纬度</label>
                        <div class="col-md-10">
                          <input
                            type="number"
                            class="form-control"
                            v-model="item.y"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">位置高程</label>
                        <div class="col-md-10">
                          <input
                            type="number"
                            class="form-control"
                            v-model="item.height"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">lon</label>
                        <div class="col-md-10">
                          <input
                            type="number"
                            class="form-control"
                            v-model="item.lon"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">lat</label>
                        <div class="col-md-10">
                          <input
                            type="number"
                            class="form-control"
                            v-model="item.lat"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-default waves-effect"
              data-dismiss="modal"
            >
              关闭
            </button>
            <button
              type="button"
              class="btn btn-primary waves-effect waves-light"
              data-dismiss="modal"
              @click="toEdit()"
            >
              提交
            </button>
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

      doSearchText: null,
      isSearch: false,

      detail: null,
      item: null,

      // 新建
      kinds: null,
      plants: null,
      createItem: {},
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
      let lists = await apis.list.findAndCountAll(this.off, this.PageShowSum);
      const { count, rows } = lists.data;
      this.total = count;
      this.showItems = rows;
      this.sumPage = Math.ceil(this.total / this.PageShowSum);
      console.log(lists.data);
    },
    // 定位到创建
    async toDocCreate() {
      // 初始化数据
      this.createItem = {};

      let kinds = await apis.kind.findAll();
      this.kinds = kinds.data.rows;
      console.log(kinds);

      let plants = await apis.plant.findAll();
      this.plants = plants.data.rows;
      console.log(plants);
    },
    // 更改页面单元展示数量
    changePageShowSum() {
      this.currentPage = 0;
      this.off = 0;
      if (this.isSearch) this.getSearch();
      else this.init();
    },
    // 上一页
    previousPage() {
      if (this.currentPage === 0) {
        s_alert.basic("不能哟~");
        return;
      }
      this.currentPage--;
      this.getPage();
      if (this.isSearch) this.getSearch();
      else this.init();
    },
    // 下一页
    nextPage() {
      if (this.currentPage === this.sumPage - 1) {
        s_alert.basic("不能哟~");
        return;
      }
      this.currentPage++;
      this.getPage();
      if (this.isSearch) this.getSearch();
      else this.init();
    },
    // 定位
    getLocation(item) {
      const { x, y, height, lon, lat, name, card, kind } = item;
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
            title: name + "-" + kind.name + "-" + card, // 信息窗口标题
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
    // 创建元素
    async toCreat() {
      console.log(this.createItem);
      const { tid, card, x, y, height, lon, lat, name, kind_id, plant_id } =
        this.createItem;
      if (
        !tid ||
        !card ||
        !x ||
        !y ||
        !height ||
        !lon ||
        !lat ||
        !name ||
        !kind_id ||
        !plant_id
      ) {
        s_alert.Warning("档案新建失败", "不能输入有空喔~");
        return;
      }
      let newItem = await apis.list.create(this.createItem);
      if (newItem) {
        s_alert.basic("档案新建成功~");
        return;
      }
    },
    // 获取编辑元素
    editItem(item) {
      this.item = JSON.parse(JSON.stringify(item));
    },
    // 执行编辑
    async toEdit() {
      console.log(this.item);
      let list = await apis.list.update(this.item);
      if (list) {
        if (this.isSearch) this.getSearch();
        else this.init();
        s_alert.basic("修改成功~");
      }
    },
    // 删除元素
    async deleteItem(item) {
      if (confirm("确认删除吗？")) {
        let pass = prompt("请确认权限密码");
        if (pass !== "TCU") {
          s_alert.Warning("验证失败", "权限密码输入错误");
          return;
        }
        let del = await apis.list.delete(item.id);
        s_alert.basic("删除成功~");
        console.log(del);
        if (this.isSearch) this.getSearch();
        else this.init();
      }
    },
    // 详细信息
    dodetail(item) {
      this.detail = item;
    },
    // 查找元素
    async search() {
      let search = this.doSearchText;
      this.off = 0;
      this.PageShowSum = 10;
      this.currentPage = 0;
      if (search) {
        this.isSearch = true;
        this.getSearch();
      } else {
        this.isSearch = false;
        this.init();
      }
    },
    // 获取搜索
    async getSearch() {
      let search = this.doSearchText;
      let lists = await apis.list.findAndCountAllByName(
        search,
        this.off,
        this.PageShowSum
      );
      const { count, rows } = lists.data;
      this.total = count;
      this.showItems = rows;
      this.sumPage = Math.ceil(this.total / this.PageShowSum);
      console.log(lists.data);
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
