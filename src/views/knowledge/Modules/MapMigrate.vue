
<template>
  <div class="mapMigrate">
    <div id="MyMapMigrate" ref="MyMapMigrate" ></div>
  </div>
</template>

<script>
import "echarts/map/js/china.js";
export default {
  data: () => ({
    myEcharts: null,
    height:0,
    Migrationpaths:{},
  }),
 props:['data'],
  mounted() {
   
      if(this.data.dataT && this.data.dataT.length>0){
            this.$nextTick(() => {
                   this.getGraph();

            });
     }
   
  },
  watch:{
    data(newval,oldval){
        this.data = newval;
        this.$nextTick(()=>{
          this.getGraph();
        })
    },
  
  },
  methods: {
    getGraph() {
        console.log(111)
      let that = this;
      this.myEcharts = this.echarts.init(this.$refs.MyMapMigrate);
    //   console.log(this.Migrationpaths)
      // this.myEcharts.showLoading();
               var geoCoordMap = this.data.geoCoordMap;
                var dataT = this.data.dataT;
                var center = this.data.center;
               // geoCoordMap['淮北供电公司'] = [116.8549110000, 33.9014640000];



                var GZData = [];
                var tempData = [center, GZData];

                dataT.map((item, index) => {
                   
                    var arr = [];
                    arr.push(item)
                    arr.push({
                        name: center
                    })
                    GZData.push(arr)
                })
             
                var convertData = function(data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i];
                        var fromCoord = geoCoordMap[dataItem[0].name];
                        var toCoord = geoCoordMap[dataItem[1].name];
                        if (fromCoord && toCoord) {
                            res.push({
                                fromName: dataItem[0].name,
                                toName: dataItem[1].name,
                                coords: [fromCoord, toCoord],
                                value: dataItem[0].value
                            });
                        }
                    }
                    return res;
                };

                var color =['#76bcbf','#fcdf3d','#ff7b3a','#b42c0d','#8023c8','#1d99d3'];
                var series = [];

              
                var arr = tempData[1].map(function(dataItem) {
                        return {
                            name: dataItem[0].name,
                            value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                        };
                    })
              
                series.push(
                     {
                     name: tempData[0],
                     type: 'lines',
                     zlevel: 3,
                     symbol: ['none', 'none'], 
                     effect: {
                         show: false,
                         period: 3, //箭头指向速度，值越小速度越快
                         trailLength: 0.01, //特效尾迹长度[0,1]值越大，尾迹越长重
                         symbolSize: 2, //图标大小
                     },
                     lineStyle: {
                         normal: {
                             opacity: 1,
                             curveness: 0.4, //曲线的弯曲程度
                             color: '#609fd4',
                             show:false
                         }
                     },
                     data: convertData(tempData[1])
                 },
               {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 3,
                    symbolSize: 8,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                            color: '#000'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c60000'
                        }
                    },
                    rippleEffect: {
                        scale: 4,
                        brushType: 'fill'
                    },
                    data: [{
                        name: tempData[0],
                        value: geoCoordMap[tempData[0]],
                        visualMap: false
                    }],
                }
                );
               arr.forEach((item,i)=>{
                  series.push({
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 5,
                    symbolSize: 10,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                            color: '#000'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: color[i]
                        }
                    },
                    rippleEffect: {
                        scale: 4,
                        brushType: 'fill'
                    },
                    data: [{
                        name: item.name,
                        value: geoCoordMap[item.name],
                        visualMap: false
                    }],
                 })
               })
              
              var  option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                              if (params.seriesType == "scatter" && params.name != tempData[0]) {
                                  return params.seriesName ;
                              } else if (params.seriesType == "lines") {
                                  returnparams.data.fromName ;
                              } else {
                                  return params.name;
                              }
                          }
                    },
                    visualMap: {
                        min: 0,
                        max: 100,
                        calculable: true,
                        color: color,
                         show: false
                    },
                    geo: {
                        map: 'china',
                        zoom: 0.98,
                        zlevel: 2,
                        label: {
                            emphasis: {
                                show: false
                            },
                        },
                        roam: false, //是否允许缩放
                        itemStyle: {
                            normal: {
                                areaColor: '#fff',
                                borderColor: "#b3adad", //省市边界线00fcff 516a89

                            },
                            emphasis: {
                                color: '#ddd' //悬浮背景
                            }
                        },
                    },
                    series: series
                };
      this.myEcharts.setOption(option, true);
      // this.myEcharts.hideLoading();
      // echart图表自适应
      window.addEventListener("resize", function() {
        // mapBoxEchart.resize();
      });
    }
  },
  beforeDestroy() {
   // this.myEcharts.clear();
  }
};
</script>
<style lang="scss" scoped>
.mapMigrate {
  height: 100%;
  #MyMapMigrate {
    width: 100%;
    height: 100%;
  }
}
</style>