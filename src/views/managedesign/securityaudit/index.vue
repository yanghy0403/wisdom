<template>
    <div class="home">
          <div class="selection">
               <div class="sc_left">
                      <div class="menu">
                        <p>安全审计</p>
                        <!-- <ul>
                            <li @click="handleRouter('systemmanage')">系统管理</li>
                       
                        </ul> -->
                 </div>
               </div>
               <div class="sc_right">
                 <Tooltip content="导航栏" placement="left" class="menu_logo" v-if="isShow">
                        <img src="../../../assets/image/index/01/menu2.png" alt="" @click="handleClick"  class="menulogo">
                    </Tooltip>
                     <Row style="margin-top:60px">
                          <i-col span='24'>
                              <!-- <Button>新增角色 <Icon type="md-add" /></Button> -->
                              <span style="font-weight:bold;font-size:20px">系统日志</span>
                          </i-col>

                      </Row>
                  <Row class="row">
                     <i-col span="8">
                           <label for="">操作者：</label>
                           <Input placeholder="请输入操作者" style="width:80%" v-model="name"/>
                     </i-col>
                     <i-col span="8">
                           <label for="">时间：</label>
                           <Input placeholder="请输入年份" style="width:80%" v-model.trim="date"/>
                     </i-col>
                     <i-col span="8">
                             <Button @click="handleSearch">查询</Button>
                              <Button style="margin-left:10px" @click="handleClear">清空</Button>
                     </i-col>
                  </Row>
                   <Row style="margin-top:20px">
                      <i-col span='24'>
                          <Table border :data="tableData" :columns="column" style="width:100%"></Table>
                      </i-col>
                      <i-col span="24" style="display: flex;justify-content: center; align-items: center;margin-top: 15px;">
                           <Page :total="total" show-sizer show-total @on-change="handlePage" @on-page-size-change="handlePagesize"/>
                      </i-col>
                  </Row>
               </div>
              <navmenu></navmenu>
          </div>
    </div>
</template>

<script>
import navmenu from '@/components/Navmenu';
export default {
 name:'securityaudit',
 data(){
    return{
         isShow:true,//控制餐单的显隐
         date:'',//搜索的时间
         name:"",//操作者
         column:[
           {
             type:'index',
             width:60,
             align:'center'
           },
           {
             title:'访问模块',
             key:'title',
              align:'center'
           },
           {
             title:'操作者',
             key:'operName',
             align:'center'
           },
           {
             title:'操作ip',
             key:'operIp',
              align:'center'
           },
           {
             title:'操作时间',
             key:'operTime',
              align:'center'
           },
           {
             title:'操作者类型',
             key:'operatorType',
              align:'center'
           },
           {
             title:'查询参数',
             key:'operParam',
              align:'center'
           },
           {
             title:'执行状态',
             key:'status',
              align:'center'
           },
          
         ],
         tableData:[
           {
               module:'机构列表',
               user:'张三',
               ip:'159.226.10.0',
               date:'2021-1-3 16:04:59',
               permission:'系统管理员',
               parameter:'哈哈哈',
               state:'成功'
           }
         ],
         page:1,
         pagesize:10,
         total:0,
    }
 },
 components:{navmenu},
 methods:{
      //跳转不同的导航
      handleRouter(path){
           this.$router.push({name:path});
      },
      //清除
      handleClear(){
           this.name = '';
           this.date = "";
           this.handleSearch();
      },
      //查询
      handleSearch(){
         let url=`/manager/detail/info`;
         let data={
            limit:this.pagesize,
            offset:this.page,
            time:this.date,
            userName:this.name
         }
         this.axios.get(url,{params:data}).then(res=>{
            //  console.log(res)
             if(res.data.code == '200'){
                 this.tableData= res.data.data.data.detail;
                 this.total = res.data.data.data.count;
                //  console.log(this.tableData)
             }
         }).catch(error=>{
             console.log(error)
         })
      },
        //点击打开导航栏
      handleClick(){
            this.isShow =false;
           window.Bus.$emit('openMenu',true);
      },
      //关闭导航栏
       closeMenu(data){
           this.isShow = data;
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
 },
  mounted(){
       window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
       this.handleSearch();
 }
}
</script>

<style lang="scss" scoped>

 .selection{
     display: flex;
     .sc_left{
         width:20%;
         height:inherit;
         background: #000000;
         color: #939393;
         .menu{
             display: flex;
             justify-content: flex-start;
             align-items: center;
             height:120px;
             margin: 0 20px;
            p{
                 font-size: 24px;
                 color:#ffc509;
                 font-weight: bolder;
                 margin-right: 5px;
                //  margin-left: 40px;
             }
            ul{
                display: flex;
                 justify-content: flex-start;
                align-items: center;
                margin-left: 20px;
                li{
                  cursor: pointer;
                  padding:0 5px;
                  font-size: 10px;
                  color: #9d9d9d;
                }
               
            }
         }
       
     }
       .sc_right{
           width: 80%;
           padding: 0 20px;
           padding-bottom: 20px;
           overflow: hidden;
           overflow-y: auto;
           .row{
             margin-top: 20px;
             /deep/ .ivu-col{
               display: flex;
               align-items: center;
             }
             label{
                 font-size: 18px;
             }
           }
       }
 }

</style>