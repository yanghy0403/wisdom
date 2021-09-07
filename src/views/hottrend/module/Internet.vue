<template>
    <div ref="cluster" class="cluster"></div>
</template>

<script>
import json from '../../knowledge/org/json/cluser.json'
export default {
 name:'cluster',
 props:['zoom','data'],
 watch:{
     data(newval,oldval){
    
           if(newval.nodes && newval.nodes.length>0){
                this.$nextTick(()=>{
                   this.clustering();
                })
           }
     }
 },
 methods:{
    //聚类图谱
    clustering() {
      var myChart = this.echarts.init(this.$refs.cluster);
       myChart.showLoading();
       var data = this.data;
      
      var color =data.colors;
      
        data.nodes = data.nodes.map(item=>{
            return {
                  name:item.name,
                  id:item.id,
                  group:item.group,
                  category:item.group,
              
            }
        })
       
        var category = data.categories;
       var categories = data.categories.map(item=>{
            return {
                name:item,
                icon:'circle'
            }
        })
     
        category.forEach((item,i)=>{
              data.nodes.forEach(each=>{
                
                    if(item ==each.category){
                       
                        each.itemStyle={
                              normal:{
                                  color:color[i]
                              }
                        }
                      
                    }
              })
        })
       
           let option = {
                legend: {
                    top:20,
                    right:10,
                    width:40,
                     orient:'horizontal',
                      data:categories
                },
                 textStyle: {
                    fontSize: 10

                },
                animation: true,
                color:color,
                series: [
                    {
                        type: "graph",
                        layout: "force",

                        label: {
                            normal: {
                                show: true,
                                position: "right",
                                formatter: "{b}",
                                // backgroundColor:'#fff',
                                textBorderColor: 'white',
                                textBorderWidth: 1
                            },

                        },
                        zoom: 0.6,
                        draggable: false,
                        data: data.nodes,
                        roam: true,
                        focusNodeAdjacency: true,
                        categories: categories,
                        force: {
                            layoutAnimation: true,
                            repulsion: [500, 1000],
                            edgeLength: [30, 60],
                            gravity: 0.7
                        },
                        links: data.links,
                        lineStyle: {
                            normal: {
                                show: false,
                                width: 0.3,
                                curveness: 0,
                                opacity: 1,
                                color: '#abc7c9'
                            },
                            emphasis: {
                                show: true,
                                color: "white", //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
                                shadowColor: "red", //阴影颜色
                                shadowOffsetX: 0, //阴影水平方向上的偏移距离。
                                shadowOffsetY: 0, //阴影垂直方向上的偏移距离
                                shadowBlur: 5, //图形阴影的模糊大小。
                                type: "solid", //坐标轴线线的类型，solid，dashed，dotted
                                width: 3, //坐标轴线线宽
                                opacity: 1//图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
                            }
                        }
                    }
                ]
            };
      myChart.setOption(option, true);
      myChart.hideLoading();
      var that = this;
     
    },
 },
 mounted(){
      if(this.data.nodes && this.data.nodes.length>0){
                this.$nextTick(()=>{
                   this.clustering();
                })
           }
 }
}
</script>

<style lang="scss" scoped>
 .cluster{
      width: 100%;
      height: 100%;
 }
</style>