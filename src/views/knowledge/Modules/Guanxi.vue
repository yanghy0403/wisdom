<template>
  <div class="guanxi position">
    <i class="full-icon-small" @click="handleChange"></i>
    <div  class="MyGuanxi" ref="MyGuanxi"></div>
   
  </div>
</template>
<script>
import { fail } from "assert";
import { setTimeout, clearTimeout } from "timers";
import personImg from "../../../assets/image/knowledge/person/personlist/knslogo.png"; //人图标
import paperImg from "../../../assets/image/knowledge/person/personlist/paperlogo.png"; //论文图标
import patentImg from "../../../assets/image/knowledge/person/personlist/patentlogo.jpg"; //专利
import criterionImg from "../../../assets/image/knowledge/person/personlist/knowlogo.jpg"; //标准
import projectImg from "../../../assets/image/knowledge/person/personlist/biaozhunlogo.jpg"; //项目
export default {
  data: () => ({
    myEcharts: null,
    newData: [],
    change: true,
    clientHeight: "",
    zoom:0.5,
  }),
  props: ["data",'ischange'],
  watch: {
    data(newVal, oldVal) {
      this.newData = newVal;
      this.$nextTick(() => {
       
         this.handleChange();
       
      });
    },
   
  },
  mounted() {

             this.newData = this.data;
              this.getclientWidth();
             if(this.newData.nodes){
                   this.$nextTick(() => {
                     this.handleChange();
                     
                  });
              }
  },
  methods: {
    //根据屏幕分辨率展示图形的缩放比例
    getclientWidth(){
         var width = document.body.clientWidth || document.documentElement.clientWidth;
       
         if(width>1366){
            this.zoom = 0.7;
         }else if(width>900 && width <=1366){
             this.zoom = 0.4;
         }else{
             this.zoom = 0.3;
         }
    },
    handleChange() {
      
       this.$refs.MyGuanxi.height = document.querySelector('.guanxi').clientHeight;
       this.$refs.MyGuanxi.width = document.querySelector('.guanxi').clientWidth;
      //  this.change = false;
      if(this.ischange == 'true'){
          this.change = false;
      }
        this.getGraph();
    },
    getGraph() {
              
                  this.newData = this.data;
                  
                     var labelShow = false;
                     var repulsion = 200;
                     var edgeLength = [40,120];
                   
                     var nodes =  this.newData.nodes,
                       
                        nodesArr = [[], [], [], [],[]];
                         
                        nodes.forEach(item => {
                        switch (item.type) {
                            case "person":
                            nodesArr[0].push({
                                name: item.name,
                                category: "人员",
                                id: item.id,
                                symbolSize: 60,
                                symbol: "image://" + personImg,
                                itemStyle:{

                                }
                            });
                            break;
                            case "project":
                            nodesArr[1].push({
                                name: item.name,
                                category: "项目",
                             
                                id: item.id,
                                symbolSize: 30,
                                symbol: "image://" + projectImg
                            });
                            break;
                            case "patent":
                            nodesArr[2].push({
                                name: item.name,
                                category: "专利",
                             
                                id: item.id,
                                symbolSize: 30,
                                symbol: "image://" + patentImg
                            });
                            break;
                            case "reward_project":
                            nodesArr[3].push({
                                name: item.name,
                                category: "获奖项目",
                               
                                id: item.id,
                                symbolSize: 30,
                                symbol: "image://" + criterionImg
                            });
                            break;
                            case "paper":
                            nodesArr[4].push({
                                name: item.name,
                                category: "论文",
                              
                                id: item.id,
                                symbolSize: 30,
                                symbol: "image://" + paperImg
                            })
                            break;
                            
                            default:
                            break;
                        }
                        });
                        var limit = 10;
                        var content = [
                        ...nodesArr[0].slice(0, limit),
                        ...nodesArr[1].slice(0, limit),
                        ...nodesArr[2].slice(0, limit),
                        ...nodesArr[3].slice(0, limit),
                        ...nodesArr[4].slice(0, limit)
                        ];
                     
                        nodes = content;
                      
                        var legend = content.map(item=>{
                              return item.category;
                        })
                        legend = Array.from(new Set(legend));
                      var  links = this.newData.links;
                      var category=[];
                     
                      if(legend){
                        legend =  category = legend.map(item=>{
                              if(item =='人员'){
                                  return {
                                     name:item,
                                     icon:'image://' +personImg
                                  }
                              }else if(item =='项目'){
                                  return {
                                     name:item,
                                     icon:'image://' +projectImg
                                  }
                              }else if(item =='专利'){
                                  return {
                                     name:item,
                                     icon:'image://' +patentImg
                                  }
                              }else if(item =='获奖项目'){
                                  return {
                                     name:item,
                                     icon:'image://' +criterionImg
                                  }
                              }else if(item =='论文'){
                                  return {
                                     name:item,
                                     icon:'image://' +paperImg
                                  }
                              }
                          })
                      }
                    
                     if (!this.change) {
                          repulsion = 1000;
                          edgeLength = [100,200]
                          labelShow = false;
                         
                           var nodes =  this.newData.nodes,
                        nodesArr = [[], [], [], [],[]];
                        nodes.forEach(item => {
                        switch (item.type) {
                            case "person":
                            nodesArr[0].push({
                                name: item.name,
                                category: "人员",
                                id: item.id,
                                symbolSize: 90,
                                symbol: "image://" + personImg,
                                itemStyle:{

                                }
                            });
                            break;
                            case "project":
                            nodesArr[1].push({
                                name: item.name,
                                category: "项目",
                              
                                id: item.id,
                                symbolSize: 40,
                                symbol: "image://" + projectImg
                            });
                            break;
                            case "patent":
                            nodesArr[2].push({
                                name: item.name,
                                category: "专利",
                                symbolSize: 40,
                                id: item.id,
                                
                                symbol: "image://" + patentImg
                            });
                            break;
                            case "reward_project":
                            nodesArr[3].push({
                                name: item.name,
                                category: "奖励",
                                symbolSize: 40,
                                id: item.id,
                              
                                symbol: "image://" + criterionImg
                            });
                            break;
                            case "paper":
                            nodesArr[4].push({
                                name: item.name,
                                category: "论文",
                                symbolSize: 40,
                                id: item.id,
                               
                                symbol: "image://" + paperImg
                            })
                            break;
                            
                            default:
                            break;
                        }
                        });
                        var limit = 10;
                        var content = [
                        ...nodesArr[0].slice(0, limit),
                        ...nodesArr[1].slice(0, limit),
                        ...nodesArr[2].slice(0, limit),
                        ...nodesArr[3].slice(0, limit),
                        ...nodesArr[4].slice(0, limit)
                        ];
                      
                        nodes = content;
                    }
                  
                    var color=['#fec200','#699848','#682cff','#00ce96'];
                    this.myEcharts = this.echarts.init(this.$refs.MyGuanxi);
                    // this.myEcharts.showLoading();
         
      var option = {
        tooltip: {
          formatter: function(item) {
            if (item.dataType === "node") {
              return `<span>${item.data.category}</span></br><span>${item.name}</span>`;
            }
          }
        },
        legend:{
            show:true,
            icon:'circle',
            data:legend,
            orient:'vertical',
            left: 10,
            bottom:10,
            itemGap:2,
           itemHeight:20,
            textStyle:{
              fontSize:10
            }
        },
        animation: false,
        series: [
          {
            itemStyle: {
              //图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              borderType: "solid", //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
              borderColor: "#51be68", //设置图形边框为淡金色,透明度为0.4
              borderWidth: 2, //图形的描边线宽。为 0 时无描边。
              opacity: 1 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
            },

            type: "graph",
            layout: "force",
            data: nodes,
            links:links,
            categories:legend,
            zoom:this.zoom,
            cursor: "pointer",
            draggable: false,
            label: {
              normal: {
                position: "right",
                rotate: "30",
                show: labelShow,
                textBorderColor: "white",
                textBorderWidth: 4
              },
              emphasis: {
                show: labelShow,
                textBorderColor: "white",
                textBorderWidth: 4
              }
            },
            lineStyle: {
              normal: {
                color: "#6ab7ff",
                opacity: 0.8
              },
              emphasis: {
                color: "#6ab7ff",
                opacity: 0.8
              }
            },
            force: {
              repulsion: repulsion,
              edgeLength: edgeLength,
              gravity: 0.2,
              layoutAnimation: false
            },
            color:color
          }
        ]
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
.guanxi {
  width: 100%;
  height: 100%;
  .MyGuanxi {
    width: 100%;
    height: 100%;
  }
}
</style>