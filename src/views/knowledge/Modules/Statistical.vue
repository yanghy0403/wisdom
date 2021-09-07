<template>
     <div ref="statistical" class="statistical"></div>
</template>

<script>
export default {
 name:'statistical',
 props:['data'],
 data(){
    return {
    
    }
 },
 watch:{
    data(newval,oldval){
        
        if(newval.series){
            this.$nextTick(()=>{
                this.mygraph();
            })
        }
    }
 },
 methods:{
       mygraph(){
           
             var data =this.data;
            console.log(data);
           var mychart =this.echarts.init(this.$refs.statistical);
           var color=['#ffd85b','#CA8EC2','#ff6609','#d15001','#2828FF','#810101','#1ac08b','#1a99d3','#4c1dd3','#8023c8','#a3468e'];
           if(data.series.length>10){
               data.series = data.series.slice(0,10).map((item, i) => {
                item.type = "bar";
                return item;
            })
           }else{
               data.series = data.series.map((item, i) => {
                item.type = "bar";
                return item;
            })
           }
            let option = {
                legend:{
                    top:10,
                    data:data.legend,
                    formatter:function(params){
                        console.log(params)
                        return params.length>6? params.substr(0,6) + '...' : params;
                    }
                },
                 tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: data.xAxis
                },
                yAxis: {
                    type: 'value'
                },
                color:color,
                grid:{
                   bottom:60,
                   left:"5%",
                   right:'5%'
                },
               
                dataZoom: [{
                    show: true,
                    height: 18,
                    xAxisIndex: [0],
                    bottom: 10,
                    start: 0,
                    end: 100,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: "#d3dee5",

                    },
                    textStyle: {
                        color: "#000"
                    },
                    borderColor: "#eee"
                }, {
                    type: "inside",
                    show: true,
                    height: 15,
                    start: 1,
                    end: 35
                }],
                series: data.series
            };
          mychart.setOption(option,true);
       }
 },
 mounted(){
    if(this.data.series && this.data.series.length>0){
           this.$nextTick(()=>{
             this.mygraph();
            })
    }
 }
}
</script>

<style lang="scss" scoped>
 .statistical{
      width: 100%;
      height: 100%;
 }
</style>