
<template>
  <div class="river">
    <div class="MyRiver" ref="MyRiver"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    contentData: {},
    time: null,
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
    
      this.myEcharts = this.echarts.init(this.$refs.MyRiver);
      let _this = this;
      // this.myEcharts.showLoading();
      // let zeroD = ["期刊论文（中文）", "专利", "标准", "图书"];
     //  console.log(this.contentData);
      if (this.contentData.content) {
        let option = {
          tooltip: {
            trigger: "axis",
            formatter: function(params) {
              var html = "",
                axisValue = "";
              params.forEach(function(item, index) {
                  
                axisValue = item.axisValue;
                html =
                  html +
                  `<li><i style="background: ${item.color}"></i>${
                    item.value[2]
                  }：<span>${item.value[1]}</span></li>`;
              });
              return `
                <div class="tip-box">
                    <span>
                      年份：${axisValue}
                    </span>
                    <ul>
                        ${html}
                    </ul>
                </div>
                `;
            },
            axisPointer: {
              type: "line",
              lineStyle: {
                color: "rgba(0,0,0,0.2)",
                width: 1,
                type: "solid"
              }
            }
          },
           
          legend: {
            // data:zeroD
            data: _this.contentData.legend,
             icon:'circle',
             left: 10,
             bottom:5
          },
          dataZoom: [
            {
              show: true,
              height: 20,
              // xAxisIndex: [0],
              bottom: 40,
              // start: 10,
              // end: 90,
              handleIcon:
                "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
              handleSize: "100%",
              handleStyle: {
                color: "#d3dee5",
                // color: '#fff',
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffsetX: 2,
                shadowOffsetY: 2
              },
              labelPrecision:0,
              textStyle: {
                color: "#000"
              },
              borderColor: "#eee",
              // labelFormatter: function (value) {
              //   console.log(value)
              //   //   var date = new Date(value);
                
              //   // return date.getFullYear();
              // }
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
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            },
            //type: 'time',
            type: "category",
            // data: ["2011","2012","2013","2014","2015","2016","2017","2018","2019"],
            data: _this.contentData.time,
            // position: 'top',
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                opacity: 0.2,
                color:'#ddd'
              }
            }
          },
          color: ["#ffdf76", "#ff962f", "#ff9a09", "#d15001",'#ff6609','#1ac08b','#8023c8','#ffc509'],
        
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
                normal: {
                  position: "right",
                  show: true,
                  textBorderColor: "white",
                  textBorderWidth: 4
                },
                emphasis: {
                  show: true,
                  textBorderColor: "white",
                  textBorderWidth: 4
                }
              },
              data: _this.contentData.content
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
.river {
  height: 100%;
  .MyRiver {
    width: 100%;
    height: 100%;
  }
}
</style>