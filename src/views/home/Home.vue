<template>
  <div class="home-container">
    <baidu-map
      class="bm-view"
      @ready="init"
      :center="mapData.center"
      :zoom="mapData.zoom"
      style='height:100%; width:100%;'
    ></baidu-map>
  </div>
</template>

<script>
import { L2Dwidget } from "live2d-widget";
export default {
  name: "Home",
  data() {
    return {
      //地图数据
      mapData: {
        //中心坐标
        center: { lng: 0, lat: 0 },
        //缩放级别
        zoom: 13,
      },
      //BMap类
      BMap: null,
      //地图对象
      map: null,
    };
  },
  methods: {
    // 参考资料
    initBeautifulGirl() {
      setTimeout(() => {
        L2Dwidget.init({
          model: {
            jsonPath:
              "https://cdn.jsdelivr.net/gh/wangsrGit119/wangsr-image-bucket/L2Dwidget/live2d-widget-model-haruto/assets/haruto.model.json",
          },
          display: {
            width: 150,
            height: 300,
            vOffset: -60,
            hOffset: 50,
          },
          mobile: {
            show: true,
          },
        });
      }, 1000);
    },
    //

    async init({ BMap, map }) {
      //保存百度地图类
      this.BMap = BMap;
      //保存地图对象
      this.map = map;
      // let xy = coordinateTrans.WGS84toBD([114.35567, 30.52922]);
      // let point = new BMap.Point(xy[0], xy[1]); //设置城市经纬度坐标
      // map.centerAndZoom(point, 15); //
      // map.setCurrentCity("武汉"); // 设置地图显示的城市 此项是必须设置的
      // map.enableScrollWheelZoom(true); //鼠标滚动缩放
      // map.setMapStyleV2({
      //   styleId: "",
      // });

      map.centerAndZoom(new BMap.Point(114.35567, 30.52922), 10); // 初始化地图,设置中心点坐标和地图级别
      //添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        })
      );
      map.setCurrentCity("武汉"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true);
      
    },
  },
  created() {
    this.$notify({
      title: "消息",
      message: "仅仅作为测试百度地图的页面",
    });
  },
  mounted() {
    this.initBeautifulGirl();
  },
};
</script>

<style lang='less' scoped>
  .home-container {
    width: 100%;
    height: 100%;
  }
</style>