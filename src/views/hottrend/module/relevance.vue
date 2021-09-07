<template>
  <div ref="relevance" class="relevance"></div>
</template>

<script>
export default {
  name: "relevance",
  props: ["data"],
  watch: {
    data(newval, oldval) {
      this.$nextTick(() => {
        this.clustering();
      });
    },
  },
  methods: {
    //聚类图谱
    clustering() {
      var myChart = this.echarts.init(this.$refs.relevance);
      var data = this.data;
       
       var id= data.id;
        data.nodes.forEach(item=>{
            if(item.id ==id){
              item.symbolSize=40;
               item.itemStyle={
                 normal:{
                    color: "#f06122",
                     borderColor: "#f06122",

                 }
               }
            }else{
                 item.symbolSize=18;
                item.itemStyle={
                  normal:{
                      color: "#73d5e3",
                      borderColor: "#73d5e3",

                  }
                }
            }
        })
      let option = {
        tooltip: {
          show: false,
        },

        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 18,
            itemStyle: {
              normal: {
                color: "#97C2FC",
                borderColor: "#3784EA",
                borderWidth: 1,
                label: {
                  show: true, //标签文字
                  textStyle: {
                    color: "#333",
                    fontSize: 14,
                    // fontWeight: "bold"
                  },
                  position: "top",
                  textShadowColor: "#fff",
                  textShadowBlur: 10,
                  textBorderColor: "#fff",
                  textBorderWidth: 2,
                },
              },
              emphasis: {
                label: {},
                nodeStyle: {
                  //r: 30
                },
                linkStyle: {},
              },
            },
            lineStyle: {
              color: "#97C2FC",
            },
            force: {
              repulsion: 500,
              gravity: 0.1,
              edgeLength: 50,
              layoutAnimation: true,
            },
            roam: "scale",
            draggable: true,
            focusNodeAdjacency: true,
            nodes: data.nodes,
            links: data.links,
            zoom:0.6
          },
        ],
      };
      myChart.setOption(option, true);
      myChart.hideLoading();
      var that = this;
    },
  },
  mounted() {
      if(this.data.nodes && this.data.nodes.length>0){
             this.$nextTick(()=>{
                this.clustering();
              })
      }
  },
};
</script>

<style lang="scss" scoped>
.relevance {
  width: 100%;
  height: 100%;
}
</style>