<template>
    <div ref="brokenline" class="brokenline"></div>
</template>

<script>

export default {
 name:'brokenline',
 props:['data'],
  watch: {
    data(newval, oldval) {
      this.$nextTick(() => {
        this.clustering();
      });
    },
  },
 methods:{
    //聚类图谱
    clustering() {
      var myChart = this.echarts.init(this.$refs.brokenline);
        myChart.showLoading();
       var data = this.data;
        //  console.log( data.series)
          data.series = data.series.map(item => {
                item.areaStyle = { normal: {} }; //设置基本区域
                item.smooth = true;//设置曲线拐角处是否光滑
                item.type = 'line'; //设置类型 
                return item;
            })

            let option = {
                    // title: {
                    //     text: '堆叠区域图'
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: data.legend
                    },
                   
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: data.xAxis
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: data.series
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
 .brokenline{
      width: 100%;
      height: 100%;
 }
</style>