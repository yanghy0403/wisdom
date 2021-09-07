<template>
   <div class="wrap">
       <Row style="margin-top:60px">
           <i-col span='24'>
              <!-- <Button>新增角色 <Icon type="md-add" /></Button> -->
              <span style="font-weight:bold;font-size:20px">角色-权限管理</span>
           </i-col>

       </Row>
        <Row style="margin-top:20px">
           <i-col span='24'>
              <Table border :data="tableData" :columns="column" style="width:100%">
                   <template slot-scope="{row}" slot="permission">
                         <span v-for="(item,i) in row.permission" :key="i">【{{item.label}}】</span>
                   </template>
                   <template slot-scope="{row}" slot="action">
                         <Icon type="ios-create-outline" @click="handleModal(row)" style="font-weight:bold;font-size:20px"/>
                         <Icon type="ios-trash-outline" @click="handleClose(row)" style="font-weight:bold;font-size:20px;padding-left:15px"/>
                   </template>
              </Table>
           </i-col>
             <i-col span="24" style="display: flex;justify-content: center; align-items: center;margin-top: 15px;">
                <Page :total="total" show-sizer show-total @on-change="handlePage" @on-page-size-change="handlePagesize"/>
            </i-col>
       </Row>
       <Modal
        v-model="modal"
        title="修改角色权限"
        @on-ok="ok"
        okText="修改"
        @on-cancel="modal =false">
       
        <Input v-model="permission" disabled style="width:300px;margin-bottom:10px"/>
        <div class="permisslist">
             
               <Tag v-for="(item,i) in curData.permission" closable @on-close="handleClear" :key="i"  :name="item.value" color="cyan" style="margin-right:10px">{{ item.label}}</Tag>
        </div>
        <CheckboxGroup v-model="default_list" class="default_list">
            <Checkbox label="香蕉"></Checkbox>
            <Checkbox label="苹果"></Checkbox>
            <Checkbox label="西瓜"></Checkbox>
        </CheckboxGroup>
    </Modal>
   
   </div>
</template>

<script>
export default {
 name:'rightsmanage',
 data(){
    return{
        column:[
            {
                type:'index',
                width:60,
                align:'center'
            },
            {
                title:'角色',
                key:'user',
                align:'center',
                width:150,
            },
            {
                title:'角色',
                slot:'permission',
                align:'center'
            },
             {
                title:'操作',
                slot:'action',
                align:'center',
                 width:100,
            }
        ],
        tableData:[
            {
               user:'普通用户',
               permission:[
                   {
                       label:'人才查询列表',
                       value:'personlist'
                   },
                    {
                       label:'人才详情',
                       value:'persondetail'
                   },
                    {
                       label:'机构列表',
                       value:'orglist'
                   },
                    {
                       label:'机构详情',
                       value:'orgdetail'
                   },
                    {
                       label:'中文论文列表',
                       value:'cnpaperlist'
                   },
                    {
                       label:'英文论文列表',
                       value:'enpaperlist'
                   },
                    {
                       label:'专利',
                       value:'patent'
                   },
                    {
                       label:'奖励',
                       value:'reward'
                   },
               ]
            },
             {
               user:'系统管理员',
               permission:[
                   {
                       label:'人才查询列表',
                       value:'personlist'
                   },
                    {
                       label:'人才详情',
                       value:'persondetail'
                   },
                    {
                       label:'机构列表',
                       value:'orglist'
                   },
                    {
                       label:'机构详情',
                       value:'orgdetail'
                   },
                    {
                       label:'中文论文列表',
                       value:'cnpaperlist'
                   },
                    {
                       label:'英文论文列表',
                       value:'enpaperlist'
                   },
                    {
                       label:'专利',
                       value:'patent'
                   },
                    {
                       label:'奖励',
                       value:'reward'
                   },
               ]
            },
             {
               user:'普通用户',
               permission:[
                   {
                       label:'人才查询列表',
                       value:'personlist'
                   },
                    {
                       label:'人才详情',
                       value:'persondetail'
                   },
                    {
                       label:'机构列表',
                       value:'orglist'
                   },
                    {
                       label:'机构详情',
                       value:'orgdetail'
                   },
                    {
                       label:'中文论文列表',
                       value:'cnpaperlist'
                   },
                    {
                       label:'英文论文列表',
                       value:'enpaperlist'
                   },
                    {
                       label:'专利',
                       value:'patent'
                   },
                    {
                       label:'奖励',
                       value:'reward'
                   },
               ]
            }
        ],
        modal:false,//
        fruit:[],//当前选中的权限
        curData:[],//当前编辑的对象数据
        permissionlist:[
            {
                label:'安全审计员',
                value:1
            },
            {
                label:'系统管理员',
                value:0
            },
            {
                label:'普通用户',
                value:2
            }
        ],
        permission:'',//默认的权限
        default_list:[],//默认有权限看的列表
        page:1,
         pagesize:10,
         total:0,

    }
 },
 methods:{
     //删除角色
      handleClose(row){
         
      },
      handleModal(row){
           this.modal = true;
           this.curData = row;
           this.permission = row.user;
         
           this.default_list = row.permission.map(item=>{
                return item.value;
           })
      },
      handleClear(event, name){
         
           let newData = this.curData.permission.filter(item=>{
                 return item.value != name;
           })
           console.log(newData)
      },
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