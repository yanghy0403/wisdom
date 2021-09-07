<template>
     <div ref="orglearnrls" class="orglearnrls"></div>
</template>

<script>
import json from '../org/json/org.json'
import echarts from 'echarts'
export default {
 name:'orglearnrls',
 data(){
    return {
       
    }
 },
 props:['zoom'],
 methods:{
       mygraph(){
            var data =json;
            var categories = data.legend.map(item=>{
                return {
                    name:item
                }
            })
            var color=['#ffd85b','#ff9a09','#ff6609','#d15001','#b82301','#810101','#1ac08b','#1a99d3','#4c1dd3','#8023c8','#a3468e'];
            var zoom = this.zoom;
           var mychart =this.echarts.init(this.$refs.orglearnrls);
         let option = {
                   
                    tooltip: {},
                    legend: [{
                        formatter: function(name) {
                            return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
                        },
                        tooltip: {
                            show: true
                        },
                        selectedMode: 'false',
                        top:0,
                        data: data.legend
                    }],
                    
                    animationDuration: 3000,
                    animationEasingUpdate: 'quinticInOut',
                    series: [{
                        name: '三国演义',
                        type: 'graph',
                        layout: 'force',
                        zoom:zoom,
                        force: {
                            repulsion: 300
                        },
                        data: data.nodes,
                        links: data.links,
                        categories: categories,
                        focusNodeAdjacency: true,
                        roam: true,
                        label: {
                            normal: {

                                show: false,
                                position: 'top',

                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'source',
                                curveness: 0,
                                type: "solid"
                            }
                        },
                        color:color
                    }]
                };
          mychart.setOption(option,true);
       },
    
 },
 mounted(){
    this.$nextTick(()=>{
      this.mygraph();
    })
 }
}
</script>

<style lang="scss" scoped>
 .orglearnrls{
      width: 100%;
      height: 100%;
 }
</style>