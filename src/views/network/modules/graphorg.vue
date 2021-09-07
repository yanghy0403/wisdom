<template>
   <div style="position:relative;">
            <div id="indexGraph"> </div>
            <div id="divHoverNode" >{{temp}}</div>
            <div class="lengend">
                 <div class="org">
                    <span></span> 机构
                 </div>
                  <div class="paper">
                     <span></span> 论文
                  </div>
                  <div class="reward">
                     <span></span> 奖励
                  </div>
                  <div class="project">
                     <span></span> 项目
                  </div>
                  <div class="patent">
                     <span></span> 专利
                  </div>
            </div>
    </div>
</template>

<script>
import $ from 'jquery';
import vis from "../../../../node_modules/vis-network/dist/vis-network";
import "../../../../node_modules/vis-network/dist/dist/vis-network.css";
export default {
  name: "graphorg",
  data() {
    return {
      zoom:0.6,
       temp: ""
    };
  },
  watch: {
    data(newval, oldval) {
      this.$nextTick(() => {
        this.handleGraph();
      });
    },
  },

  props: ["data"],
  methods: {
    handleGraph() {
      //console.log(JSON.stringify(this.data))
      var color = ["#f06122", "#73d5e3", "#6138fa", "#759653", "#f73d32"];
      var mychart = this.echarts.init(document.getElementById("indexGraph"));
    // console.log(this.data);
      var data = this.data;
      //console.log(data)
      var id = data.id;

      data.nodes.map((item,i) => {
        if (item.category == "机构") {
          if (item.id == id) {
              item.size =120;
            item.color=color[0];
          } else {
             item.size =60;
            item.color=color[0];
          }
          item.label = item.name;
          // item.category = data.categories.indexOf(item.category);
        } else if (item.category == "论文") {
         // item.symbolSize = 15;
           item.size = 40;
            item.color=color[1];
          //  item.label = item.name;
            // item.itemStyle = {
            //   color: color[1],
            // };
          //item.category = data.categories.indexOf(item.category);
        } else if (item.category == "专利") {
         // item.symbolSize = 15;
        
           item.size = 40;
            item.color=color[4];
          // item.label = item.name;
            // item.itemStyle = {
            //   color: color[2],
            // };
         //item.category = data.categories.indexOf(item.category);
        } else if (item.category == "奖励") {
         // item.symbolSize = 15;
           item.size = 40;
            item.color=color[2];
          //  item.label = item.name;
          // item.itemStyle = {
          //     color: color[3],
          //   };
        //  item.category = data.categories.indexOf(item.category);
        } else if (item.category == "项目") {
         // item.symbolSize = 15;
           item.size = 40;
            item.color=color[3];
          //  item.label = item.name;
            // item.itemStyle = {
            //   color: color[4],
            // };
         // item.category = data.categories.indexOf(item.category);
        }
      });
      data.edges = data.links.map(item=>{
            return {
                from:item.source,
                to:item.target,
                ...item
            }
        });
 
      // let option = {
      //   tooltip: {
      //     formatter: function (params) {
           
      //       if(params.dataType =='node'){
      //           return params.name + (params.value ? " : " + params.value : "");
      //         }
      //     }
      //   },
      //   animationDurationUpdate: 1500,
      //   animationEasingUpdate: "quinticInOut",
      //   legend: {
      //       icon:'circle',
      //       bottom: 20,
      //       left:10,
      //       orient:'vertical',
      //       data:data.categories
      //   },
      //   series: [
      //     {
      //       type: "graph",
      //       layout: "force",
      //       roam: true,
      //       hoverAnimation: true,
      //       focusNodeAdjacency: true,
      //       draggable: true,
      //       symbolSize: 33,
      //       zoom: this.zoom,
      //       force: {
      //         repulsion: 200,
      //         edgeLength: 100,
      //       },
            
      //       lineStyle: {
      //         width: 0.5,
      //         // curveness: 0.3,
      //         opacity: 0.8,
      //       },
      //       label: {
      //         emphasis: {
      //           position: "inside",
      //           show: true,
      //           fontSize: 16,
      //         },
      //       },
      //       emphasis: {
      //         itemStyle: {
      //           borderWidth: 3,
      //          fontSize:24,
      //         },
      //         lineStyle: {
      //           // color: "#f06122",
      //           width: 2,
      //         },
      //       },
      //       data: data.nodes,
      //       links: data.links,
      //       categories: data.categories.map(item=>{
      //            return {
      //              name:item
      //            }
      //       }),
      //       color:color
      //     },
      //   ],
      // };
      // mychart.setOption(option);
       let option = {
        nodes:{
          shape:'dot',
          // label: undefined,
          // title: undefined,
          // value: undefined,
           shadow:true,
           font: {//字体配置
                  color: '#f06122',//颜色
                  size: 60, // 大小，单位px
                  // face: 'arial',//字体
                // background: 'rgba(0,0,0,0.6)',//背景
                  // align: 'center',//位置left right center
              },

        },
         physics: {
          // forceAtlas2Based: {
          //   gravitationalConstant: -30,
          //   centralGravity: 0.003,
          //   springLength: 230,
          //   springConstant: 0.18,
          // },
          maxVelocity: 146,
          solver: "forceAtlas2Based",
          timestep: 0.35,
          stabilization: { iterations: 150 },
        },
        interaction: {
          tooltipDelay: 200,
          hover: true,
        },
      }
       var network = new vis.Network(
        document.getElementById("indexGraph"),
        data,
        option
      );
      var that = this;
       network.on("hoverNode", (params) => {
        let _this = this
        data.nodes.forEach(item => {
            let nodesId = params.node;
            if (item.id === nodesId) {
              let divHoverNode = document.getElementById('divHoverNode')
              var temp = '<div>'+item.name+'</div>'
              $("#divHoverNode").append(temp);
              $('#divHoverNode').css({
                        'display': 'block',
                        'left': params.event.offsetX +10,
                        'top' : params.event.offsetY + 10
                    });

            }
        })
      });
      network.on('blurNode',function(params){
            $("#divHoverNode").hide();
            $("#divHoverNode").empty();//移除之后清空div
        });
      network.off("click");
      network.on("doubleClick", (params) => {
        let that = this;
        if (params.nodes.length > 0) {
          let nodesId = params.nodes[0];
          data.nodes.forEach((item) => {
            if (item.id === nodesId) {
              if(item.category =='人才'){
                  that.$router.push({
                    path:'/talentDetails',
                    query:{
                          personId:item.id
                    }
                  })
              }else if(item.category =='专利'){
                  that.$router.push({
                    name:'patentdetail',
                    query:{
                          patentId:item.id
                    }
                  })
              }
         
            }
          });
        }
      });
    },
  },
  mounted() {
     $('#indexGraph').height($('.graph').height());
     var width = document.body.clientWidth || document.documentElement.clientWidth;
    
      if(width<=1366){
          this.zoom = 0.4;
          
      }else{
      this.zoom = 0.6;
      }
  },
};
</script>

<style lang="scss">
#indexGraph {
  width: 100%;
  height: 100%;
  position: relative;
}
#divHoverNode{
   position: absolute;
    background: rgba(0,0,0,0.6);
    border-radius: 5px;
    padding: 5px 10px;
    left: -99999px;
    top: -999999px;
    display: none;
    color: #fff;
}
.lengend{
  position: absolute;
  left: 10px;
  bottom: 15px;
   >div{
     font-size: 14px;
     color: #515a6e;
     height:30px;
     line-height:30px;
     display: flex;
     align-items: center;
     span{
         display: inline-block;
         width: 20px;
         height: 20px;
         border-radius: 50%;
         margin-right: 10px;
     }
   }
   .org{
      span{
          background:#f06122 ;
      }
   }
    .paper{
      span{
          background:#73d5e3 ;
      }
   }
    .reward{
      span{
          background:#6138fa ;
      }
   }
    .project{
      span{
          background:#759653 ;
      }
   }
    .patent{
      span{
          background:#f73d32 ;
      }
   }
}
</style>
