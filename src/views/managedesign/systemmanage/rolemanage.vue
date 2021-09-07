<template>
   <div class="wrap">
       <Row style="margin-top:60px">
           <i-col span='24'>
              <!-- <Button>新增角色 <Icon type="md-add" /></Button> -->
              <span style="font-weight:bold;font-size:20px">用户-角色管理</span>
           </i-col>

       </Row>
        <Row style="margin-top:20px">
           <i-col span='24'>
              <Table border :data="tableData" :columns="column" style="width:100%">
                  
                   <template slot-scope="{row}" slot="action">
                         <Icon type="ios-create-outline" @click="handleModal(row)" style="font-weight:bold;font-size:20px"/>
                         <!-- <Icon type="ios-trash-outline" @click="handleClose(row)" style="font-weight:bold;font-size:20px;padding-left:15px"/> -->
                   </template>
              </Table>
           </i-col>
             <i-col span="24" style="display: flex;justify-content: center; align-items: center;margin-top: 15px;">
                <Page :total="total" show-sizer show-total @on-change="handlePage" @on-page-size-change="handlePagesize"/>
            </i-col>
       </Row>
       <Modal
        v-model="modal"
        title="修改用户权限"
        @on-ok="ok"
        okText="修改"
        @on-cancel="modal =false">
       
       <Select v-model="curData.value" style="width:300px">
        <Option v-for="item in permissionlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
       
    </Modal>
   
   </div>
</template>

<script>
export default {
 name:'rolemanage',
 data(){
    return{
        column:[
            {
                type:'index',
                width:60,
                align:'center'
            },
            {
                title:'角色名称',
                key:'user',
                align:'center',
                
            },
            {
                title:'用户名',
                key:'useName',
                align:'center'
            },
            {
                title:'用户邮箱',
                key:'email',
                align:'center'
            },
             {
                title:'权限管理',
                slot:'action',
                align:'center',
                 width:100,
            }
        ],
        tableData:[
            {
               user:'普通用户',
               useName:'张三',
               email:'哈哈哈@163.com',
               value:1,
            },
             {
               user:'系统管理员',
               useName:'张三',
               email:'哈哈哈@163.com',
               value:0,
            },
             {
               user:'普通用户',
               useName:'张三',
               email:'哈哈哈@163.com',
               value:1,
            },
        ],
        modal:false,//
        curData:{},//当前编辑的用户
        permissionlist:[
           {
                label:'系统管理员',
                value:0
            },
            {
                label:'普通用户',
                value:1
            }
        ],
         page:1,
         pagesize:10,
         total:0,
      

    }
 },
 methods:{
     //删除角色
      handleClose(row){
         
      },
      //编辑
      handleModal(row){
           this.modal = true;
           this.curData = row;
          
      },
      //确定修改
      ok(){

      },
       //页码改变
      handlePage(value){
          this.page = value;
          this.handleSearch();
      },
       //页数改变
      handlePagesize(value){
          this.pagesize = value;
          this.handleSearch();
      }
 }
}
</script>

<style lang="scss" scoped>
 .wrap{
     padding: 0 20px;
 }
 .permisslist{
      span{
          padding: 5px 20px;
          border:1px solid #FDE2E2 ;
      }
 }
 .default_list{
     margin-top: 15px;
     display: flex;
     flex-direction: column;
     label{
         margin:5px 0;
     }
 }
</style>