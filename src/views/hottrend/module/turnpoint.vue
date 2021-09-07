<template>
  <div ref="turnpoint" class="turnpoint"></div>
</template>

<script>
export default {
  name: "turnpoint",
  props: ["data"],
   watch: {
    data(newval, oldval) {
      this.$nextTick(() => {
         
        this.clustering();
      });
    },
  },
  methods: {
    //聚类图谱
    clustering() {
      var myChart = this.echarts.init(this.$refs.turnpoint);
      var data = this.data;

      data.series = data.series.map((item, i) => {
        item.type = "line";
        return item;
      });
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },

        grid: {
          top: "16%",
          left: "2%",
          right: "2%",
          bottom: "12%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: data.xAxis,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: data.series,
      };
      myChart.setOption(option, true);
      myChart.hideLoading();
      var that = this;
    },
  },
  mounted() {
      if(this.data.series && this.data.series.length>0){
             this.$nextTick(()=>{
                this.clustering();
              })
      }
     
  },
};
</script>

<style lang="scss" scoped>
.turnpoint {
  width: 100%;
  height: 100%;
}
</style>