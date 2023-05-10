<template>
  <div class="wrapper">
    <div class="container">
      <!-- Page-Title -->
      <div class="row">
        <div class="col-sm-12">
          <h4 class="page-title">植物地图</h4>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-7">
          <div class="portlet">
            <!-- /portlet heading -->
            <div class="portlet-heading">
              <h3 class="portlet-title text-dark text-uppercase">
                下沉广场区域
              </h3>
              <div class="portlet-widgets">
                <a href="javascript:;" data-toggle="reload">
                  <i class="ion-refresh"></i>
                </a>
                <span class="divider"></span>
                <a
                  data-toggle="collapse"
                  data-parent="#accordion1"
                  href="#portlet1"
                >
                  <i class="ion-minus-round"></i>
                </a>
                <span class="divider"></span>
                <a href="#" data-toggle="remove">
                  <i class="ion-close-round"></i>
                </a>
              </div>
              <div class="clearfix"></div>
            </div>
            <div id="portlet1" class="panel-collapse collapse in">
              <div class="portlet-body">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      id="website-stats"
                      style="position: relative; height: 600px"
                    >
                      <!-- 地图 -->
                      <div id="app">
                        <div id="allmap" ref="allmap"></div>
                        <router-view></router-view>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Portlet -->
        </div>
        <!-- end col -->

        <div class="col-lg-5">
          <div class="portlet">
            <!-- /portlet heading -->
            <div class="portlet-heading">
              <h3 class="portlet-title text-dark text-uppercase">鸭子湖区域</h3>
              <div class="portlet-widgets">
                <a href="javascript:;" data-toggle="reload">
                  <i class="ion-refresh"></i>
                </a>
                <span class="divider"></span>
                <a
                  data-toggle="collapse"
                  data-parent="#accordion1"
                  href="#portlet2"
                >
                  <i class="ion-minus-round"></i>
                </a>
                <span class="divider"></span>
                <a href="#" data-toggle="remove">
                  <i class="ion-close-round"></i>
                </a>
              </div>
              <div class="clearfix"></div>
            </div>
            <div id="portlet2" class="panel-collapse collapse in">
              <div class="portlet-body">
                <div class="row">
                  <div class="col-md-12">
                    <div id="pie-chart">
                      <div
                        id="pie-chart-container"
                        class="flot-chart"
                        style="height: 600px"
                      >
                        <!-- 地图 -->
                        <div id="app">
                          <div id="allmap" ref="allmap1"></div>
                          <router-view></router-view>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Portlet -->
        </div>
        <!-- end col -->
      </div>
      <!-- End row -->
    </div>
  </div>
</template>

<script>
export default {
  name: "plantmap",
  data() {
    return {};
  },
  mounted() {
    this.map();
    this.map_small();
  },
  methods: {
    map() {
      //GPS坐标
      var x = 117.088437;
      var y = 39.092823;
      var ggPoint = new BMap.Point(x, y);

      var mapArr_c = [
        new BMap.Point(117.088611, 39.096839),
        new BMap.Point(117.089014, 39.096872),
        new BMap.Point(117.088582, 39.09637),
        new BMap.Point(117.089031, 39.096376),
        new BMap.Point(117.088584, 39.096283),
        new BMap.Point(117.089026, 39.096282),
        new BMap.Point(117.088579, 39.096122),
        new BMap.Point(117.089016, 39.096112),
        new BMap.Point(117.088597, 39.096042),
        new BMap.Point(117.089016, 39.096058),
        new BMap.Point(117.088593, 39.095788),
        new BMap.Point(117.089036, 39.095805),
      ];
      var mapArr_b = [
        new BMap.Point(117.090134, 39.096916),
        new BMap.Point(117.090502, 39.096894),
        new BMap.Point(117.09012, 39.096392),
        new BMap.Point(117.09059, 39.096364),
        new BMap.Point(117.090125, 39.096303),
        new BMap.Point(117.090572, 39.096318),
        new BMap.Point(117.090159, 39.096143),
        new BMap.Point(117.090559, 39.096124),
        new BMap.Point(117.090133, 39.09607),
        new BMap.Point(117.090576, 39.096055),
        new BMap.Point(117.09011, 39.095827),
        new BMap.Point(117.090562, 39.09582),
      ];
      var mapArr_a = [
        new BMap.Point(117.089089, 39.096045),
        new BMap.Point(117.089385, 39.096032),
        new BMap.Point(117.089114, 39.095824),
        new BMap.Point(117.089351, 39.095811),
        new BMap.Point(117.089773, 39.096055),
        new BMap.Point(117.090072, 39.096048),
        new BMap.Point(117.089754, 39.095863),
        new BMap.Point(117.090061, 39.09581),
      ];

      tran(mapArr_a);
      tran(mapArr_b);
      tran(mapArr_c);

      //主界面右侧小地图
      let map = new BMap.Map(this.$refs.allmap); // 创建Map实例
      map.centerAndZoom(ggPoint, 20); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.NavigationControl());

      //坐标转换完之后的回调函数
      function translateCallback(data) {
        console.log(data);
        if (data.status === 0) {
          data.points.forEach((e) => {
            var marker = new BMap.Marker(e);
            map.addOverlay(marker);
            var label = new BMap.Label("植物", {
              offset: new BMap.Size(20, -10),
            });
            marker.setLabel(label); //添加百度label
          });
          map.setCenter(data.points[0]);
        }
      }
      function tran(arr) {
        let changeCount = Math.ceil(arr.length / 10);
        let num = arr.length;
        var convertor = new BMap.Convertor();
        if (changeCount >= 1) {
          for (var i = 0; i < changeCount; i++) {
            var points = [];
            for (var j = 0; j < 10; j++) {
              if (i * 10 + j < num) points.push(arr[i * 10 + j]);
            }
            convertor.translate(points, 1, 5, translateCallback);
          }
        } else convertor.translate(arr, 1, 5, translateCallback);
      }

      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    map_small() {
      //GPS坐标
      var x = 117.088437;
      var y = 39.092823;
      var ggPoint = new BMap.Point(x, y);

      var mapArr_z = [
        new BMap.Point(117.088571, 39.095346),
        new BMap.Point(117.0893, 39.095363),
        new BMap.Point(117.089822, 39.09537),
        new BMap.Point(117.090574, 39.095342),
        new BMap.Point(117.089308, 39.095093),
        new BMap.Point(117.08981, 39.095137),
        new BMap.Point(117.088571, 39.094189),
        new BMap.Point(117.089568, 39.093925),
        new BMap.Point(117.090543, 39.094201),

        new BMap.Point(117.090404, 39.094079),
        new BMap.Point(117.088665, 39.094106),
      ];
      tran(mapArr_z);
      //主界面右侧小地图
      let map1 = new BMap.Map(this.$refs.allmap1); // 创建Map实例
      map1.centerAndZoom(ggPoint, 20); // 初始化地图,设置中心点坐标和地图级别
      map1.addControl(new BMap.NavigationControl());

      //坐标转换完之后的回调函数
      function translateCallback(data) {
        console.log(data);
        if (data.status === 0) {
          data.points.forEach((e) => {
            var marker = new BMap.Marker(e);
            map1.addOverlay(marker);
            var label = new BMap.Label("植物", {
              offset: new BMap.Size(20, -10),
            });
            marker.setLabel(label); //添加百度label
          });
          map1.setCenter(data.points[0]);
        }
      }
      function tran(arr) {
        let changeCount = Math.ceil(arr.length / 10);
        let num = arr.length;
        var convertor = new BMap.Convertor();
        if (changeCount >= 1) {
          for (var i = 0; i < changeCount; i++) {
            var points = [];
            for (var j = 0; j < 10; j++) {
              if (i * 10 + j < num) points.push(arr[i * 10 + j]);
            }
            convertor.translate(points, 1, 5, translateCallback);
          }
        } else convertor.translate(arr, 1, 5, translateCallback);
      }
      map1.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
  },
};
</script>

<style scoped>
#app {
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
}
#allmap {
  height: 100%;
  overflow: hidden;
}
</style>
