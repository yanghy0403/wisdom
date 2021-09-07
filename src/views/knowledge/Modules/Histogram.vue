
<template>
  <div class="histogram">
    <div id="MyHistogram" ref="MyHistogram"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    contentData: null,
    myEcharts: null
  }),
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
      this.contentData = newVal;
      this.getGraph();
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
      this.myEcharts = this.$echarts.init(this.$refs.MyHistogram);
      this.myEcharts.showLoading();
      if (this.contentData.legend || this.contentData.xaxisData) {
        // {
        //   legend:['Matcha 个e','Milk Tea','Cheese Cocoa','Walnut Brownie'],
        //   dimensions: ["product", "2015", "2016", "2017", "2018"],
        //   source: [
        //       {
        //         product: "Matcha 个e",
        //         "2015": 43.3,
        //         "2016": 85.8,
        //         "2017": 93.7,
        //         "2018": 93.7
        //       },
        //       {
        //         product: "Milk Tea",
        //         "2015": 83.1,
        //         "2016": 73.4,
        //         "2017": 55.1,
        //         "2018": 93.7
        //       },
        //       {
        //         product: "Cheese Cocoa",
        //         "2015": 86.4,
        //         "2016": 65.2,
        //         "2017": 82.5,
        //         "2018": 93.7
        //       },
        //       {
        //         product: "Walnut Brownie",
        //         "2015": 72.4,
        //         "2016": 53.9,
        //         "2017": 39.1,
        //         "2018": 93.7
        //       }
        //     ]
        // }
        let data = {
          legend: [
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019"
          ],
          dimensions: [
            "杰青项目",
            "优青项目",
            "院士",
            "青年女科学家",
            "青科奖"
          ],
          source: [{ sdsd: 1, asdas: 2 }]
        };
        // console.log(data.source);

        // let legend = [...this.contentData.legend];
        // if (!this.contentData.legend) {
        //   this.contentData.legend.unshift('product');
        // }
        // this.contentData.sourceData = this.contentData.sourceData.map((item,index,arr) => {
        //   item.product = legend[index];
        //   return item
        // });

        // {
        //     legend: ['蒸发量','降水量','平均温度'],
        //     xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        //     series: [
        //         {
        //             name:'蒸发量',
        //             data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        //         },
        //         {
        //             name:'降水量',
        //             data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        //         },
        //         {
        //             name:'平均温度',
        //             data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        //         }
        //     ]
        // }
        let seriesAllData = [];
        this.contentData.series.forEach(item => {
          seriesAllData = [...seriesAllData, ...item.data];
        });
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          legend: {
            // data:['蒸发量','降水量','平均温度']
            data: this.contentData.legend
          },
          dataZoom: [
            {
              type: "slider",
              height: 20,
              textStyle: {
                color: "#999"
              },
              bottom: "3%"
            }
          ],
          xAxis: [
            {
              type: "category",
              data: this.contentData.xaxisData,
              // data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
              axisPointer: {
                type: "shadow"
              },
              axisLine: {
                lineStyle: {
                  color: "#999"
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "人才数",
              nameLocation: "center",
              nameGap: 35,
              min: 0,
              max: Math.max.apply(null, seriesAllData) + 2,
              interval: 10,
              axisLine: {
                lineStyle: {
                  color: "#999"
                }
              },
              axisLabel: {
                formatter: "{value}"
              },
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  opacity: 0.5
                }
              }
            }
          ],

          series: this.contentData.series.map((item, index) => {
            item.type = "bar";
            return item;
          })
          // series: [
          //     {
          //         name:'蒸发量',
          //         type:'bar',
          //         data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          //     },
          //     {
          //         name:'降水量',
          //         type:'bar',
          //         data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          //     },
          //     {
          //         name:'平均温度',
          //         type:'bar',
          //         data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          //     }
          // ]
        };

        // let option = {
        // legend: {
        //   data:this.contentData.dimensions
        // },
        // tooltip: {},
        // dataset: {
        // dimensions: ["product", "2015", "2016", "2017", "2018"],
        // dimensions: this.contentData.legend,
        // source:this.contentData.sourceData
        // source: JSON.parse(JSON.toJSONString(this.contentData.source)),
        // source: [
        //   {
        //     product: "Matcha 个e",
        //     "2015": 43.3,
        //     "2016": 85.8,
        //     "2017": 93.7,
        //     "2018": 93.7
        //   },
        //   {
        //     product: "Milk Tea",
        //     "2015": 83.1,
        //     "2016": 73.4,
        //     "2017": 55.1,
        //     "2018": 93.7
        //   },
        //   {
        //     product: "Cheese Cocoa",
        //     "2015": 86.4,
        //     "2016": 65.2,
        //     "2017": 82.5,
        //     "2018": 93.7
        //   },
        //   {
        //     product: "Walnut Brownie",
        //     "2015": 72.4,
        //     "2016": 53.9,
        //     "2017": 39.1,
        //     "2018": 93.7
        //   }
        // ]
        //   },
        //   xAxis: { type: "category" },
        //   yAxis: {},
        //   series: [
        //     { type: "bar" },
        //     { type: "bar" },
        //     { type: "bar" },
        //     { type: "bar" }
        //   ]
        // };

        this.myEcharts.setOption(option, true);
        this.myEcharts.hideLoading();
      }
    }
  },
  beforeDestroy() {
    this.myEcharts.clear();
  }
};
</script>
<style lang="scss" scoped>
.histogram {
  #MyHistogram {
    width: 100%;
    height: 300px;
  }
}
</style>