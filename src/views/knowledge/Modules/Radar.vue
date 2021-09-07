
<template>
  <div class="radar">
    <div ref="MyRadar" class="MyRadar"></div>
    <!-- <p
      v-for="(item,index) in radarData"
      :key="'radar'+index"
      :style="'transform: rotate('+item.rotate+'deg)'"
    >{{item.name}}</p>-->
    
  </div>
</template>
<script>
export default {
  data: () => ({
    radarData: [],
    radarDataA: {},
    myEcharts: null
  }),
  props: {
    radius: {
      // 可选字段，有默认值
      default: 65
    },
    contentData: {
      // default: {}
    }
  },
  watch: {
    contentData(newVal, oldVal) {
      this.radarDataA = newVal;
      // this.getGraph();
    }
  },
  mounted() {
    this.radarDataA = this.contentData;
    this.$nextTick(() => {
      // this.getGraph();
    });
  },
  methods: {
    getColor(idx) {
      let palette = [
        "#2ec7c9",
        "#b6a2de",
        "#5ab1ef",
        "#ffb980",
        "#d87a80",
        "#8d98b3",
        "#e5cf0d",
        "#97b552",
        "#95706d",
        "#dc69aa",
        "#07a2a4",
        "#9a7fd1",
        "#588dd5",
        "#f5994e",
        "#c05050",
        "#59678c",
        "#c9ab00",
        "#7eb00a",
        "#6f5553",
        "#c14089"
      ];
      return palette[idx % palette.length];
    },
    getGraph() {
      let _this = this;
      this.radarData = [
        {
          name: "G-指数",
          rotate: 90,
          color: "#fff"
        },
        {
          name: "H-指数",
          rotate: 40,
          color: "#fff"
        },
        {
          name: "论文",
          rotate: 3,
          color: "#fff"
        },
        {
          name: "奖励",
          rotate: 1,
          color: "#fff"
        },

        {
          name: "标准",
          rotate: 12,
          color: "#fff"
        },
        {
          name: "专利",
          rotate: 1,
          color: "#fff"
        },
        {
          name: "被引数",
          rotate: 20,
          color: "#fff"
        }
      ];

      let statisPaper = this.radarDataA.statisPaper * 1;
      let rewardNum = this.radarDataA.reward * 1;
      let statisPatent = this.radarDataA.statisPatent * 1;
      let staticCriterion = this.radarDataA.staticCriterion * 1;

      let seriesVal = [
        100,
        150,
        statisPaper,
        rewardNum,
        staticCriterion,
        statisPatent,
        200
      ];
      let maxVal = Math.max.apply(null, seriesVal);
      const length = this.radarData.length;
      for (let index = 0; index < length; index++) {
        let rotate = 360 / length;
        this.radarData[index].rotate = 90 + rotate * index;
      }
      this.myEcharts = this.$echarts.init(this.$refs.MyRadar);
      this.myEcharts.showLoading();
      let option = {
        // title: {
        //   text: "多雷达图"
        // },
        tooltip: {
          trigger: "axis"
        },

        // legend: {
        //   x: "center",
        //   data: ["某软件", "某主食手机", "某水果手机", "降水量", "蒸发量"]
        // },
        radar: [
          {
            indicator: [
              { text: "G-指数", max: maxVal, color: "#999" },
              { text: "H-指数", max: maxVal, color: "#999" },
              { text: "论文", max: maxVal, color: "#999" },
              { text: "奖励", max: maxVal, color: "#999" },
              { text: "标准", max: maxVal, color: "#999" },
              { text: "专利", max: maxVal, color: "#999" },

              { text: "被引数", max: maxVal, color: "#999" }
            ],
            //  splitNumber: 4,
            // name: {
            //   show: false
            // },
            nameGap: 7,
            shape: "circle",
            center: ["50%", "50%"],
            radius: _this.radius,
            splitArea: {
              areaStyle: {
                color: ["#EBEBA9", "#EBEBA6", "#EFEFB9", "#F4F4CE", "#F9F9E5"],
                shadowColor: "rgba(0, 0, 0, 0)"
                // shadowBlur: 20
              }
            },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            splitLine: {
              lineStyle: {
                color: "#ccc"
              }
            }
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },

            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [
              {
                // value: [12, 12, 34, 60, 73, 85, 40],
                value: seriesVal,
                name: "信息图谱",
                areaStyle: {
                  normal: {
                    color: "rgba(119, 190, 83,.4)"
                  }
                },
                symbol: "none",
                lineStyle: {
                  normal: {
                    type: "solid",
                    color: "rgba(119, 190, 83,.4)"
                  }
                }
              }
            ]
          }
        ]
      };

      // let option = {
      //   // title: {
      //   //   text: "自定义雷达图"
      //   // },
      //   // legend: {
      //   //   data: ["图一", "图二", "张三", "李四"]
      //   // },
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   radar: [
      //     // color: "#fff"
      //     {
      //       indicator: [
      //         { text: "G-指数" },
      //         { text: "H-指数" },
      //         { text: "论文" },
      //         { text: "奖励" },
      //         { text: "专利" },
      //         { text: "标准" },
      //         { text: "被引数" }
      //       ],
      //       center: ["50%", "50%"],
      //       // radius: _this.radius,
      //       // startAngle: 90,
      //       // splitNumber: 4,
      //       shape: "circle",
      //       // name: {
      //       //   formatter: "【{value}】",
      //       //   textStyle: {
      //       //     color: "#72ACD1"
      //       //   }
      //       // },
      //       splitArea: {
      //         areaStyle: {
      //           color: ["#EBEBA9", "#EBEBA6", "#EFEFB9", "#F4F4CE", "#F9F9E5"],
      //           shadowColor: "rgba(0, 0, 0, 0)",
      //           shadowBlur: 10
      //         }
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: "#ccc"
      //         }
      //       },
      //       splitLine: {
      //         lineStyle: {
      //           color: "#ccc"
      //         }
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       // name: "雷达图",
      //       type: "radar",
      //       tooltip: {
      //         trigger: "item"
      //       },
      //       // itemStyle: {
      //       //   emphasis: {
      //       //     // color: 各异,
      //       //     lineStyle: {
      //       //       width: 4
      //       //     }
      //       //   }
      //       // },
      //       data: [
      //         {
      //           value: [
      //             1,
      //             2,
      //             statisPaper,
      //             rewardNum,
      //             statisPatent,
      //             staticCriterion,
      //             2
      //           ],
      //           name: "网络图",
      //           symbol: "none",
      //           // symbolSize: 5,
      //           areaStyle: {
      //             normal: {
      //               color: "rgba(119, 190, 83,.4)"
      //             }
      //           },
      //           lineStyle: {
      //             normal: {
      //               type: "solid",
      //               color: "rgba(119, 190, 83,.4)"
      //             }
      //           }
      //         }
      //         // {
      //         //   value: [60, 5, 0.3, -140, 1500],
      //         //   name: "图二",
      //         //   areaStyle: {
      //         //     normal: {
      //         //       color: "rgba(255, 255, 255, 0.5)"
      //         //     }
      //         //   }
      //         // }
      //       ]
      //     }
      //   ]
      // };
      this.myEcharts.setOption(option, true);
      this.myEcharts.hideLoading();
    }
  },
  beforeDestroy() {
    // this.myEcharts.clear();
  }
};
</script>
<style lang="scss" scoped>
.radar {
  position: relative;
  width: 100%;
  height: 100%;
  .MyRadar {
    width: 100%;
    height: 100%;
  }
  > p {
    // color: rgba(119, 190, 83,.7);
    position: absolute;
    bottom: 50%;
    font-size: 12px;
    width: 50%;
    padding-left: 8px;
    transform-origin: bottom right;
    transform: rotate(90deg);
  }
}
</style>