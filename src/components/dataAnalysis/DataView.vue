<template>
  <div class="data-view">
    <el-card class="card1"><div id="main1"></div></el-card>
    <el-card class="card2"><div id="main2"></div></el-card>
  </div>
</template>

<script>
import { dataview } from "../../api/api.js";
export default {
  data() {
    return {};
  },
  created() {
    //第二个图标的绘制
    dataview().then(res=>{
      console.log(res);
      if(res.data.status === 200){
        let {legend, xAxis, series} = res.data.data
        this.draw(legend, xAxis, series)
      }
    })
  },
  mounted() {
    let myCharts = this.$echarts.init(document.getElementById("main1")); //初始化echarts实例
    console.log("Charts:", myCharts);
    myCharts.setOption({
      title: {
        text: "进阶",
      },
      xAxis: {
        data: ["1", "2", "3", "4", "5", "6"],
      },
      yAxis: {},
      series: [
        {
          name: "人数",
          type: "bar", //柱状图，折线图为line
          data: [45, 42, 46, 48, 53, 57],
        },
      ],
    });
  },
  methods: {
    draw(legend, xAxis, series) {
      let myChart = this.$echarts.init(document.getElementById("main2"));
      let option = {
        title: {
          text: "会话量",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: legend,
        },
        xAxis: {
          type: "category",
          data: xAxis,
        },
        yAxis: {
          type: "value",
        },
        series: series,
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less">
.data-view {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 70%;
    margin: 0px 10px;
    #main1,
    #main2 {
      height: 500px;
    }
  }
}
</style>