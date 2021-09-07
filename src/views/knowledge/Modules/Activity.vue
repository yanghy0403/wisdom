
<template>
  <div class="activity">
    <div class="MyActivity" ref="MyActivity"></div>
  </div>
</template>
<script>
// import { setInterval, clearInterval } from "timers";
export default {
  data: () => ({
    contentData: {},
    myEcharts: null
  }),
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
      this.contentData = newVal;
        this.$nextTick(() => {
        this.getGraph();
      });
    }
  },
  created() {
    this.contentData = this.data;
  },
  mounted() {
    this.$nextTick(() => {
       this.getGraph();
    });
  },

  methods: {
    getGraph() {
    
      this.myEcharts = this.echarts.init(this.$refs.MyActivity);
      let _this = this;
       var color =['#76bcbf','#fcdf3d','#ff7b3a','#b42c0d','#8023c8','#1d99d3']
      // this.myEcharts.showLoading();
      if (this.data.content) {
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line",
              lineStyle: {
                color: "rgba(0,0,0,0.2)",
                width: 1,
                type: "solid"
              }
            },
            formatter: function(params) {
               
              var html = "",
                axisValue = "";
              params.forEach(function(item, index) {
               
                axisValue = item.axisValue;
                //  console.log(axisValue)
                html =
                  html +
                  `<li><i style="background: ${item.color}"></i>${
                    item.value[2]
                  }：<span>${item.value[1]}</span></li>`;
              });
              return `
                <div class="tip-box">
                    <span>
                      年份：${params[0].value[0]}
                    </span>
                    <ul>
                        ${html}
                    </ul>
                </div>
                `;
            }
          },

          legend: {
            // data: ["DQ", "TY", "SS", "QG", "SY", "DD"],
            data: _this.contentData.legend,
            icon: "circle", //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
            // itemWidth: 20, // 设置宽度
            // itemHeight: 20, // 设置高度
            // itemGap: 40, // 设置间距
             left: 10,
             bottom:5
          },
         
           dataZoom: [
            {
              show: true,
             bottom: 40,
               height: 20,
              handleIcon:
                "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
              handleSize: "110%",
              handleStyle: {
                color: "#d3dee5",
                // color: '#fff',
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffsetX: 2,
                shadowOffsetY: 2
              },
              labelPrecision:0,
              moveOnMouseWheel:false,
              moveOnMouseMove:false,
              zoomOnMouseWheel:false,
              textStyle: {
                color: "#000"
              },
              borderColor: "#eee",
              labelFormatter: function (value) {
                  var date = new Date(value);
                
                return date.getFullYear();
              }
            },
            {
              type: "inside",
              show: true,
              height: 15,
              start: "",
              end: ""
            }
          ],
          singleAxis: {
            bottom: 100,
            left:20,
            axisTick: {
              //坐标轴的刻度
              show: false
            },
            axisLabel: {
              formatter: function(value, index) {
                
                var date = new Date(value);
                
                return date.getFullYear();
              }
            },
            data: _this.contentData.time,
            type: "time",
            axisLine: {
              show: false
            },
            // axisPointer: {
            //   animation: true,
            //   label: {
            //     show: true
            //   },
            //   formatter: function(value, index) {
            //     console.log(value);

            //     var date = new Date(value);
            //     return date.getFullYear();
            //   }
            // },
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                width: 1.5,
                opacity: 0.5
              }
            }
          },

          series: [
            {
              type: "themeRiver",
              itemStyle: {
                emphasis: {
                  shadowBlur: 20,
                  shadowColor: "rgba(0, 0, 0, 0.8)"
                }
              },
              label: {
                show: false
              },
              formatter: function(value, index) {
                   console.log(value);
                   console.log(index);
                // 格式化成月/日，只在第一个刻度显示年份
                return index;
              },
              data: _this.contentData.content,
              color:color
            }
          ]
        };
        this.myEcharts.setOption(option, true);
        // this.myEcharts.hideLoading();
      }
    }
  },
  beforeDestroy() {
    this.myEcharts.clear();
  }
};
</script>
<style lang="scss" scoped>
.activity {
  height: 100%;
  .MyActivity {
    width: 100%;
    height: 100%;
  }
}
</style>