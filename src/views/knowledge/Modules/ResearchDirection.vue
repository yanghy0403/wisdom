
<template>
  <div class="ResearchDirection">
    <div class="MyResearchDirection" ref="MyResearchDirection"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    myEcharts: null,
    contentData: {},
    time: null
  }),
  props: ['Pastresearchdata'],
  watch: {
   
    Pastresearchdata(newval,oldVal){
        this.Pastresearchdata = newval;
       
         if(newval.data && newval.data.length>0){
              this.$nextTick(()=>{
                this.getGraph();
            })
         }
    }
  },
  created() {
    this.contentData = this.data;
  },
  mounted() {
   
    if(JSON.stringify(this.Pastresearchdata) != JSON.stringify({})){
         this.$nextTick(() => {
        
          this.getGraph();
        });
    }
   
  },
  methods: {
    getGraph() {
      this.myEcharts = this.echarts.init(this.$refs.MyResearchDirection);
      // this.myEcharts.showLoading();
      
      let data = this.Pastresearchdata;
     
      var year = data.year;
      var everydata = data.data;
    
      var axisdata = everydata[0].xdata;
      var options = everydata.map((item)=>{
          return {
             xAxis: [
              {
                type: "category",
                axisLabel: {
                  interval: 0
                },
                data: item.xdata,
                splitLine: {
                  show: false
                }
              }
            ],
           
            series: [
              {
                data: item.resultdata
              }
            ]
          }
      })
      // console.log(options);
      let option = {
        baseOption: {
          timeline: {
            axisType: "category",
            autoPlay: true,
            bottom: "0",
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
              color: "#ffd731",
              borderColor: "#aaa",
              itemGap: 15,
              itemSize: 12
            },

            playInterval: 3000,
            data:year
           
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
            },
            formatter:function(params){
              
                return params[0].name+ ':' + params[0].data;
            }
          },
          calculable: true,
          grid: {
            top: "10%",
            bottom: "30%",
            left: "5%",
            right: "8%"
          },
          xAxis: [
            {
              type: "category",
              name: "关键词",
              axisLabel: {
                interval: 0,
                rotate:45
              },
              data: axisdata,
              axisLine: {
                // symbol: ['none', 'arrow'],
                // symbolSize: [6, 12],
                // symbolOffset: [110, 8],
                lineStyle: {
                  color: "#aaa"
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "次数",
              axisLine: {
                // symbol: ['none', 'arrow'],
                // symbolSize: [6, 12],
                // symbolOffset: [10, 18],
                lineStyle: {
                  color: "#aaa"
                  // type:'dashed'
                }
              },
              splitLine: {
                lineStyle: {
                  // color: '#fff',
                  type: "dashed"
                }
              }
            }
          ],
          series: [
            {
              name: "金币1",
              type: "bar",
              itemStyle:{
                 color:'#ffd731'
              }
            },
           
          ]
        },

      
      options:options
      };

      this.myEcharts.setOption(option, true);
      // this.myEcharts.hideLoading();
    }
  },
  beforeDestroy() {
    this.myEcharts.clear();
  }
};
</script>
<style lang="scss" scoped>
.ResearchDirection {
  height: 100%;
  .MyResearchDirection {
    width: 100%;
    height: 100%;
  }
}
</style>