<template>
     <Table :columns="columns" :data="List">
          <template slot="chineseName" slot-scope="{row}">
              <span  @click="handleRouter(row)" class="title">{{row.chineseName}}</span>
              
         </template>
         <template slot="record" slot-scope="{row}">
                <span v-for="item in row.inventor" :key="item.personId" >{{item.personName+'; '}}</span>
         </template>
          <template slot="applyDate" slot-scope="{row}">
              <span>{{row.applyDate}}</span>
              
         </template>
          <template slot="awardDate" slot-scope="{row}">
                <span >{{row.awardDate}}</span>
         </template>
     </Table>
</template>

<script>
export default {
 name:'patentList',
 data(){
    return {
         columns:[
             {
                 title:'专利名称',
                 slot:'chineseName',
                 align:'center'
             },
              {
                 title:'发明人',
                 slot:'record',
                  align:'center'
             },
              {
                 title:'申请单位',
                 key:'applicant',
                  align:'center'
             },
              {
                 title:'申请号',
                 key:'patentNo',
                 align:'center'
             },
              {
                 title:'申请日',
                 slot:'applyDate',
                 align:'center',
                 width:140
             },
              {
                 title:'公开日',
                 slot:'awardDate',
                 align:'center',
                 width:140
             },
              {
                 title:'法律状态',
                 key:'patentStatus',
                 align:'center',
                 width:100
             }
         ],
    }
 },
 props:['List'],
 methods:{
       handleRouter(item){
         this.$router.push({
             path:'/results/patentdetail',
             query:{
                 patentId:item.patentId
             }
         });
    }
 }
}
</script>

<style lang='scss' scoped>
//  .title:hover{
//      color: #3366cc;
//      text-decoration: underline;
//      cursor: pointer;
//  }
</style>