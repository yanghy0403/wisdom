<template>
    <div class="box">
           <div ref="chart" class="chart"></div>
    </div>
</template>

<script>

export default {
 name:'mygraph',
 data(){
    return{
           personId: "7183c1fc7f9cf7cec154c9570d896353",
           graphData:{},//大图数据
    }
 },
 methods:{
     //获取当前数据
       getData(){
              var url=`/indexCon/queryGraph`;
                var data={
                    endYear:this.enddate,
                    startYear:this.startdate,
                    personId:this.personId,
                    type:'人才,论文,专利,奖励,项目'
                }
                this.axios.get(url,{params:data}).then(res=>{
                    // console.log(res);
                    if(res.data.code =='200'){
                        this.graphData = res.data.data;
                        this.graphData.id = this.personId;
                       this.$nextTick(()=>{
                             this.handleGraph();
                       })
                    }
                }).catch(error=>{
                    console.log(error);
                })
       },
       //渲染图形
       handleGraph() {
      //console.log(JSON.stringify(this.data))
      var color = ["#66ACF9","#486CEB","#73d5e3", "#749FA7", "#C5856A"];
      var mychart = this.echarts.init(this.$refs.chart);
    
      var data = this.graphData;
      //  console.log(data);
      var id = data.id;

      data.nodes.map((item) => {
        if (item.category == "人才") {
          if (item.id == id) {
            item.symbolSize = 120;
            item.fontSize = 10;
            item.itemStyle = {
              color: color[0],
              shadowBlur: 35,
              shadowColor: "rgb(254, 255, 255)",
            //   color: new this.echarts.graphic.RadialGradient(0.5, 0.5, 1.0, [
            //     {
            //       offset: 0,
            //       color: "rgb(115,213, 227)",
            //     },

            //     {
            //       offset: 0.8,
            //       color: "rgb(115,213, 227)",
            //     },
            //     {
            //       offset: 1,
            //      color: "rgb(115,213, 227)",
            //     },
            //   ]),
            };
          } else {
            item.symbolSize = 60;
            item.fontSize = 10;
            item.itemStyle = {
              color: color[0],
            //   color: new this.echarts.graphic.RadialGradient(0.5, 0.5, 1.0, [
            //     // {
            //     //   offset: 0,
            //     //   color: "rgb(241,108, 41)",
            //     // },
            //     // {
            //     //   offset: 0.3,
            //     //   color: "rgb(241,108, 41)",
            //     // },
            //     // {
            //     //   offset: 0.9,
            //     //   color: "rgb(254, 243, 123)",
            //     // },
            //     // {
            //     //   offset: 1,
            //     //   color: "rgb(254, 243, 123)",
            //     // },
            //       {
            //       offset: 0,
            //       color: "rgb(115,213, 227)",
            //     },

            //     {
            //       offset: 0.8,
            //       color: "rgb(115,213, 227)",
            //     },
            //     {
            //       offset: 1,
            //      color: "rgb(115,213, 227)",
            //     },
            //   ]),
            };
          }
          item.label = {
            show: true,
            color: "#fff",
            position: "inside",
          };
          // item.category = data.categories.indexOf(item.category);
        } else if (item.category == "论文") {
          item.symbolSize = 15;
          item.label = {
            show: false,
          };
            item.itemStyle = {
              color: color[1],
            };
          //item.category = data.categories.indexOf(item.category);
        } else if (item.category == "专利") {
          item.symbolSize = 15;
          item.label = {
            show: false,
          },
            item.itemStyle = {
              color: color[2],
            };
         //item.category = data.categories.indexOf(item.category);
        } else if (item.category == "奖励") {
          item.symbolSize = 15;
          item.label = {
            show: false,
          },
          item.itemStyle = {
              color: color[3],
            };
        //  item.category = data.categories.indexOf(item.category);
        } else if (item.category == "项目") {
          item.symbolSize = 15;
          item.label = {
            show: false,
          },
            item.itemStyle = {
              color: color[4],
            };
         // item.category = data.categories.indexOf(item.category);
        }
      });
   
     //var categories = data.nodes.
      let option = {
        tooltip: {
          formatter: function (params) {
           
            if(params.dataType =='node'){
                return params.name + (params.value ? " : " + params.value : "");
              }
          }
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        legend: {
            icon:'circle',
            bottom: 20,
            left:10,
            orient:'vertical',
            data:data.categories
        },
        series: [
          {
            type: "graph",
            layout: "force",
            roam: true,
            hoverAnimation: true,
            focusNodeAdjacency: true,
            draggable: true,
            symbolSize: 33,
            zoom: 0.4,
            force: {
              repulsion: 200,
              edgeLength: 100,
            },
            
            lineStyle: {
              width: 0.5,
              // curveness: 0.3,
              opacity: 0.8,
            },
            label: {
              emphasis: {
                position: "inside",
                show: true,
                fontSize: 16,
              },
            },
            emphasis: {
              itemStyle: {
                borderWidth: 3,
               fontSize:24,
              },
              lineStyle: {
                // color: "#f06122",
                width: 2,
              },
            },
            data: data.nodes,
            links: data.links,
            categories: data.categories.map(item=>{
                 return {
                   name:item
                 }
            }),
            color:color
          },
        ],
      };
      mychart.setOption(option);
    },

 },
 mounted(){
    
       this.getData();
 }
}
</script>

<style lang="scss" scoped>
.box{
    width: 100%;
    height: 100vh;
    .chart{
         width: 100%;
          height: 100%;
    }
}
</style>