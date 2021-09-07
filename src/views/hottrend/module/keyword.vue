<template>
    <div ref="keyword" class="keyword"></div>
</template>

<script>

export default {
 name:'keyword',
 props:['data'],
 watch:{
    data(newval,oldval){
       
          this.$nextTick(()=>{
            this.clustering();
         })
    }
 },
 methods:{
    //聚类图谱
    clustering() {
      var myChart = this.echarts.init(this.$refs.keyword);
       var data = this.data;
          
            let option = {
        baseOption: {
          timeline: {
            axisType: "category",
            autoPlay: true,
            bottom: "0%",
            left: "5%",
            right: "10%",
            label: {
              color: "#aaa"
            },
            lineStyle: {
              color: "#aaa"
            },
            symbolSize: 4,
            controlStyle: {
              color: "#aaa",
              borderColor: "#aaa",
              itemGap: 15,
              itemSize: 12
            },
            playInterval: 3000,
            data: data.dataTime
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              },
              label: {
                color: "#fff",
                fontFamily: "Arial"
              }
            }
          },
          calculable: true,
          grid: {
            top: "10%",
            bottom: "20%",
            left: "5%",
            right: "8%"
          },
          xAxis: [
            {
              type: "category",
              name: "关键词",
              axisLine: {
                lineStyle: {
                  color: "#666",
                  fontSize: 12
                }
              },
              axisLabel: {
                interval: 0,
                rotate: 15,
               
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "次数",
              axisLine: {
                lineStyle: {
                  color: "#666"
                }
              },
              splitLine: {
                lineStyle: {
                  type: "dashed"
                }
              }
            }
          ],
          series: [
            {
              name: "出现次数",
              type: "bar",
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      "#C1232B",
                      "#0f4471",
                      "#00adb5",
                      "#E87C25",
                      "#5628b4",
                      "#20BF55",
                      "#118df0",
                      "#F3A43B",
                      "#d3327b",
                      "#ae318a",
                      "#993090",
                      "#6f3071",
                      "#9BCA63",
                      "#AEB7F9",
                      "#B5C334",
                      "#89C3F8",
                      "#FCC667",
                      "#FE8463",
                      "#D7504B",
                      "#C6E579"
                    ];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        },

        options:data.options
      };
      myChart.setOption(option, true);
      myChart.hideLoading();
      var that = this;
     
    },
 },
 mounted(){
    
    this.$nextTick(()=>{
      this.clustering();
    })
 }
}
</script>

<style lang="scss" scoped>
 .keyword{
      width: 100%;
      height: 100%;
 }
</style>