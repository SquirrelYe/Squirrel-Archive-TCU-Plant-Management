<template>
  <div class="wrapper">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h4 class="page-title">养护清单</h4>
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
                  data-toggle="modal"
                  data-target="#create"
                  @click="docreate()"
                >
                  新增养护清单
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
                  <th>负责人</th>
                  <th>标题</th>
                  <th>内容</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>更新时间</th>
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
                  <td>{{ item.admin }}</td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.detail }}</td>
                  <td>{{ item.condition | formatCondition }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.updated_at }}</td>

                  <td class="actions">
                    <a
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
                    </a>
                    <a @click="deleteItem(item)">
                      <i
                        class="fa fa-trash-o"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="删除"
                      ></i>
                    </a>
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
                        <label class="col-md-2 control-label">负责人</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.admin"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">名称</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.title"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">内容</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="createItem.detail"
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
              @click="toCreat()"
            >
              提交类别
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
            <h4 class="modal-title" id="myModalLabel">编辑养护信息</h4>
          </div>
          <div class="modal-body" align="center">
            <div class="row">
              <div class="col-sm-12">
                <div class="panel panel-default">
                  <div class="panel-heading"><h4>编辑养护信息</h4></div>
                  <div class="panel-body">
                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label class="col-md-2 control-label">负责人</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="item.admin"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">标题</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="item.title"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">内容</label>
                        <div class="col-md-10">
                          <input
                            type="text"
                            class="form-control"
                            v-model="item.detail"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-2 control-label">状态</label>
                        <div class="col-md-10">
                          <select
                            class="form-control input-sm"
                            v-model="item.condition"
                          >
                            <option value="-1">未解决</option>
                            <option value="0">进行中</option>
                            <option value="1">已解决</option>
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
  filters: {
    formatCondition(x) {
      if (x === -1) return "未解决";
      if (x === 0) return "进行中";
      if (x === 1) return "已解决";
    },
  },
  methods: {
    // 获取偏移量
    getPage() {
      this.off = this.currentPage * this.PageShowSum;
    },
    // 初始化数据
    async init() {
      let lists = await apis.protect.findAndCountAll(
        this.off,
        this.PageShowSum
      );
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
    // 创建初始化
    docreate() {
      this.createItem = { condition: 0 };
    },
    // 创建元素
    async toCreat() {
      console.log(this.createItem);
      const { admin, title, detail } = this.createItem;
      if (!admin || !title || !detail) {
        s_alert.Warning("养护新建失败", "不能输入有空喔~");
        return;
      }
      let newItem = await apis.protect.create(this.createItem);
      if (newItem) {
        this.init();
        s_alert.basic("档案新建成功~");
        return;
      }
    },
    // 获取编辑元素
    editItem(item) {
      console.log(item);
      this.item = JSON.parse(JSON.stringify(item));
    },
    // 执行编辑
    async toEdit() {
      console.log(this.item);
      let list = await apis.protect.update(this.item);
      if (list) {
        this.init();
        s_alert.basic("修改成功~");
      }
    },
    // 删除元素
    async deleteItem(item) {
      if (confirm("确认删除吗？与之关联的数据都会清除喔~")) {
        let pass = prompt("请确认权限密码");
        if (pass !== "TCU") {
          s_alert.Warning("验证失败", "权限密码输入错误");
          return;
        }
        let del = await apis.protect.delete(item.id);
        s_alert.basic("删除成功~");
        console.log(del);
        this.init();
      }
    },
  },
};
</script>
