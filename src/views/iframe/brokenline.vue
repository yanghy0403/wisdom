<template>
     <div class="box">
            <brokenline :data="brokenData"></brokenline>
     </div>
</template>

<script>
//  import brokenjson from '../hottrend/json/broken.json'
 import brokenline from '../hottrend/module/brokenline'
export default {
  name:'broken',
   data(){
       return {
           brokenData:{},//关键词数量变化趋势数据
           keywordId:'fef75ba8dcdc654414c4f58a9fe01913'
       }
   },
   components:{brokenline},
   methods:{
        //获取关键词数量变化趋势
     getbroken(){
          var url=`/portal/graph/keyword/keywordCountYearChangeTrend`;
          var data={
                fieldId:this.keywordId,
                endYear:2021,
                startYear:2011
            }
            this.axios.get(url,{params:data}).then(res=>{
                // console.log(res)
                  if(res.data.code =='200'){
                       this.brokenData = res.data.data;
                  }
            })
     },
   },
   mounted(){
        this.getbroken();
   }
}
</script>

<style lang="scss" scoped>
 .box{
      width: 100%;
      height: 100vh;
     padding-top: 20px;
 }
</style>