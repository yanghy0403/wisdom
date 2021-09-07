<template>
     <Table :columns="columns" :data="List">
          <template slot="title" slot-scope="{row}">
              <span  @click="handleRouter(row)" class="title">{{row.chineseTitle}}</span>
              
         </template>
          <template slot="record" slot-scope="{row}">
              <span >{{row.record ? row.record :'暂无数据'}}</span>
          </template>
           <template slot="org" slot-scope="{row}">
              <span >{{row.org ? row.org :'暂无数据'}}</span>
          </template>
           <template slot="complexImpact" slot-scope="{row}">
              <span >{{row.complexImpact ? row.complexImpact :'暂无数据'}}</span>
          </template>
           <template slot="fullImpact" slot-scope="{row}">
               <span >{{row.fullImpact ? row.fullImpact :'暂无数据'}}</span>
          </template>
     </Table>
</template>

<script>
export default {
 name:'journalList',
 data(){
    return {
         columns:[
             {
                 title:'期刊名称',
                 slot:'title',
                 align:'left'
             },
              {
                 title:'收录情况',
                 slot:'record',
                  align:'center',
                  width:150
             },
              {
                 title:'主办单位',
                 slot:'org',
                  align:'center',
                width:150
             },
              {
                 title:'复合影响因子',
                 slot:'complexImpact',
                 align:'center',
                 width:150
             },
              {
                 title:'综合影响因子',
                 slot:'fullImpact',
                 align:'center',
                width:150
             },
              {
                 title:'被引次数',
                 key:'citation',
                 align:'center',
                 width:100
             }
         ],
    }
 },
 props:['List'],
 methods:{
       handleRouter(item){
         this.$router.push('journaldetail');
    }
 }
}
</script>

<style lang="scss" scoped>
//   .title:hover{
//      color: #3366cc;
//      text-decoration: underline;
//      cursor: pointer;
//  }
</style>