<template>
  <div class="mapview">
    <div class="main"></div>
  </div>
</template>


 
<script>
import chinaJson from "echarts/map/json/china";
export default {
  data() {
    return {};
  },
  mounted() {
    let charts = this.$echarts.init(document.getElementsByClassName("main")[0]);
    console.log(charts);
    this.$echarts.registerMap("china", chinaJson);
    let option = {
      geo: {
        map: "china",
        aspectScale: 0.75, //scale地图长宽比
        zoom: 1.1,
        regions: [
          {
            name: "南海诸岛",
          },
        ],
      },
      series: [{ type: "map", zoom: 1.1, map: "china" }],
    };
    charts.setOption(option);
  },
};
</script>

<style lang="less">
.mapview {
  width: 100%;
  .main {
    height: 600px;
  }
}
</style>