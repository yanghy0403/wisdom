<template>
   <div class="home">
       <div class="selection">
             <div class="sc_left">
                 <div class="menu">
                     
                            <p>成果查询</p>
                            <ul>
                                <li @click="handleRouter('org')">机构查询</li>
                                <li>|</li>
                                 <!-- <li>领域查询</li>
                                <li>|</li> -->
                                <li @click="handleRouter('talent')">人才查询</li>
                            </ul>
                     
                 </div>
                 <div class="choose">
                     <div class="brush">
                           <ul>
                                <!-- <li @click="handleRouter('journal')" >国内期刊</li> -->
                                <li @click="handleRouter('domesticPaper')">中文论文</li>
                                <li @click="handleRouter('internationalPaper')">英文论文</li>
                                <li @click="handleRouter('patent')" class="active">专利</li>
                                <li @click="handleRouter('reward')">奖励</li>
                            </ul>
                            
                             <div class="search">
                                 <div>
                                      <!-- <Checkbox-group v-model="params.checkArr" @on-change="checkGroupChange">
                                        <Checkbox label="4">发明公布</Checkbox>
                                        <Checkbox label="5">发明授权</Checkbox>
                                        <Checkbox label="6">实用新型</Checkbox>
                                        <Checkbox label="3">外观设计</Checkbox>
                                    </Checkbox-group> -->
                                 
                                     <div class="chebox">
                                        <div class="checkbox" v-for="(item,i) in checkData" :key="i"  @click="handlecheckbox(i)">
                                                <div class="checkboxFour" :class="item.checked ? 'checked':''">
                                                    <span class="checkboxFourInput"></span>
                                                </div>
                                                <label for="">{{item.name}}</label>
                                        </div>
                                    </div>
                                    <Select v-model="params.Select">
                                        <Option v-for="item in resultList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <input placeholder="请输入检索关键词" v-model="params.search"/>
                               </div>
                            </div>
                           
                     </div>
                 </div>
                 
                  <div class="button">
                      <button @click="getList">查询</button>
                       <Icon type="md-refresh" @click="handleReset"/>
                </div>
                  <div class="filter">
                      <div class="every">
                          <ol>
                              <li>
                                    <img src="../../../../assets/image/result/patent/patent.png" alt="">
                              </li>
                              <li>
                                   <div v-for="(item,i) in filterData.patentType" :key="i"  :class="patentindex ==i ? 'active':''">
                                       <p @click="handlepatentType(item.name,i)">{{item.title}}</p>
                                        <p>
                                            <span>{{item.value.toLocaleString()}}</span>
                                            <Icon type="ios-close-circle" v-if="patentindex ==i" @click="handleClosepatentType"/>
                                            <i v-else></i>
                                         </p>
                                   </div>
                              </li>
                              
                          </ol>
                      </div>
                      <div class="every">
                             <ol>
                              <li>
                                    <img src="../../../../assets/image/result/patent/ipc.png" alt="">
                              </li>
                              <li>
                                   <div v-for="(item,i) in filterData.subPartName" :key="i"  :class="ipcindex ==i ? 'active':''">
                                       <p @click="handlesubPartName(item.name,i)">{{item.name}}</p>
                                       <p>
                                            <span>{{item.value.toLocaleString()}}</span>
                                            <Icon type="ios-close-circle" v-if="ipcindex ==i" @click="handleClosesubPartName"/>
                                            <i v-else></i>
                                         </p>
                                   </div>
                              </li>
                              
                          </ol>
                      </div>
                    <div class="every">
                             <ol>
                              <li>
                                    <img src="../../../../assets/image/result/patent/prive.png" alt="" >
                              </li>
                              <li>
                                   <div v-for="(item,i) in filterData.province" :key="i"  :class="proindex ==i ? 'active':''">
                                       <p @click="handleprovince(item.name,i)">{{item.name}}</p>
                                        <p>
                                            <span>{{item.value.toLocaleString()}}</span>
                                            <Icon type="ios-close-circle" v-if="proindex ==i" @click="handleCloseprovince"/>
                                            <i v-else></i>
                                         </p>
                                   </div>
                              </li>
                              
                          </ol>
                      </div>
                </div>
               
             </div>
             <div class="sc_right">
                <div class="main">
                            <div class="header">
                                    <div class="group">
                                            <h2>分组浏览</h2>
                                            <ul>
                                                <li @click="handleClickNav(0)" :class="menuindex == 0? 'active':''">申请年度</li>
                                                <li @click="handleClickNav(1)" :class="menuindex == 1? 'active':''">授权年度</li>
                                                <li @click="handleClickNav(2)" :class="menuindex == 2? 'active':''">申请人</li>
                                                <li @click="handleClickNav(3)" :class="menuindex == 3? 'active':''">发明人</li>
                                            </ul>
                                    </div>
                                    <div class="choose">
                                        <ul>
                                            <li v-for="(item,i) in chooseData" :key="i" :class="chooseindex == i? 'active':''" @click="handleChoose(item.name,i)"> {{item.title}} ({{item.value}})</li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            <div class="top">
                                    <span>检索到 {{total.toLocaleString()}}条结果</span>
                                   
                                    <ul>
                                        <li><i class="el-icon-menu" @click="logoindex =0" :class="logoindex ==0? 'logo_active':''"></i></li>
                                        <li><Icon type="ios-list" @click="logoindex = 1" :class="logoindex ==1? 'logo_active':''"/></li>
                                        <li>
                                            <p >排序方式:</p>
                                            <Select v-model="sort" @on-change="handleOption">
                                                <Option v-for="item in sortData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </li>
                                    </ul>
                            </div>
                            <div class="List list">
                                    <patent-image :List="List" v-if="logoindex ==0"></patent-image>
                                    <patent-list :List="List" v-if="logoindex ==1"></patent-list>
                            </div>
                            <div class="foot">
                                    <el-pagination
                                        layout="prev, pager, next"
                                        :total="total"
                                        @size-change="handleSize"
                                        @current-change="handlePage"
                                        >
                                    </el-pagination>
                            </div>
                </div>
             </div>
              <Tooltip content="导航栏" placement="left" class="menu_logo" v-if="isShow">
                    <img src="../../../../assets/image/index/01/menu2.png" alt="" @click="handleClick" class="menulogo">
                </Tooltip>
       </div>
        <navmenu></navmenu>
   </div>
</template>

<script>



import patentList from './patentList'
import patentImage from './patentImage'
import navmenu from '@/components/Navmenu'
import { log } from 'util'
export default {
 name:'domesticPaper',
 data(){
    return{
       
         isShow:true,//控制右上角的logo
        resultList: [
            {
                value: "主题",
                label: "主题"
            },
            {
                value: "专利名称",
                label: "专利名称"
            },
            {
                value: "主权利要求",
                label: "主权利要求"
            },
            {
                value: "申请号",
                label: "申请号"
            },
            {
                value: "公开号",
                label: "公开号"
            },
            {
                value: "分类号",
                label: "分类号"
            },
            {
                value: "主分类号",
                label: "主分类号"
            },
            {
                value: "申请人",
                label: "申请人"
            },
            {
                value: "发明人",
                label: "发明人"
            },
            {
                value: "地址",
                label: "地址"
            },
            {
                value: "代理人",
                label: "代理人"
            },
            {
                value: "优先权",
                label: "优先权"
            }
         ],
        params:{
            Select:'',
            search :'',
            checkArr:[]
         },
         chooseData:[],
         menuindex:0,
         total:100,
         page:1,
         limit:8,
         sort:"citation",//排序方式
         sortData:[
              {
                value:'citation',
                label:'相关度'
             },
             {
                value:'applyDateSort',
                label:'申请日'
             },
              {
                value:'公开日',
                label:'公开日'
             },
              {
                value:'awardDateSort',
                label:'授权日'
             }
         ],
        logoindex:0,//默认展示列表
        chooseindex:-1,//分组浏览子菜单下标
        List:[],
       query_EQ_applyDate:"",//申请年度
        query_EQ_awardDate:'',//授权年度
        query_EQ_applicant_group:'',//申请人
        query_EQ_inventor_personName_group:'',//发明人
        filterData:{},//过滤条件数据
        filter:{
            query_EQ_patentType:'',
            query_EQ_subPartName:'',
            query_EQ_province:''
        },//子组件传过来的选中的刷选条件
        patentindex:-1,//选中的专利类别
        ipcindex:-1,//选中的ipc
        proindex:-1,//选中的区域
        isSelectType:false,//是否选中了专利类别也就是发明公布、发明授权等等条件
       checkData:[
           {
               name:'发明公布',
               value:'4',
               checked:false
           },
            {
               name:'发明授权',
               value:'5',
               checked:false
           },
            {
               name:'实用新型',
               value:'6',
               checked:false
           },
            {
               name:'外观设计',
               value:'3',
               checked:false
           }
       ],
      
    }
 },
 components:{navmenu,patentList,patentImage},
 methods:{
    
        //重置
        handleReset(){
           this.isSelectType = false;
           this.sort="citation";
           this.page = 1;
           this.limit = 8;
           this.query_EQ_applyDate = '';
           this.query_EQ_awardDate = '';
           this.query_EQ_applicant_group = '';
           this.query_EQ_inventor_personName_group = '';
            this.filter={
                query_EQ_patentType:'',
                query_EQ_subPartName:'',
                query_EQ_province:''
            },
           this.params={
            Select:'',
            search :'',
            checkArr:[]
         }
          this.patentindex = -1;
          this.ipcindex = -1;
          this.proindex = -1;
           this.checkData.forEach(item=>{
                item.checked = false;
           })
         
           this.getList();
           this.fieldindex = -1;
           this.includeindex = -1;
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
      handleRouter(path){
          this.$router.push({name:path});
      },
      //切换分组浏览
       handleClickNav(num){
        this.menuindex = num;
        if(num ==0){
            var data = this.filterData.applyDate;
              data.forEach(item => {
                item.title =
                item.name.slice(0, 4) +
                "-" +
                item.name.slice(4, 6) +
                "-" +
                item.name.slice(6, 8);
            });
             data  = data.sort(this.compare('value'));
          
        }else if(num ==1){
            var data = this.filterData.awardDate;
              data.forEach(item => {
                item.title =
                item.name.slice(0, 4) +
                "-" +
                item.name.slice(4, 6) +
                "-" +
                item.name.slice(6, 8);
            });
             data  = data.sort(this.compare('value'));
          
        }else if(num ==2){
            var data = this.filterData.applicant;
              data.forEach(item => {
                item.title =item.name
            });
             data  = data.sort(this.compare('value'));
          
        }else if(num ==3){
            var data = this.filterData.personName;
               data.forEach(item => {
                item.title =item.name
            });
            data  = data.sort(this.compare('value'));
        }
         this.chooseData = data;
         this.chooseindex = -1;
            
     },
      patentType(key) {
      switch (key) {
        case "4":
          return "发明公布";
          break;
        case "5":
          return "发明授权";
          break;
        case "6":
          return "实用新型";
          break;
        case "3":
          return "外观设计";
          break;
        case "其他":
          return "其他";
          break;
        default:
          return "其他";
          break;
      }
    },
     //数组对象排序
      compare(key){
         return function(value1,value2){
            var val1=value1[key];
            var val2=value2[key];
                return val2-val1;
            }
        },
        //获取数据
     getList(){
        
           var url=`/portal/es/achievement/patentQuery`;
           if(this.sort =='公开日'){
               this.sort = '';
           }
           var data={
                 offset:this.page -1,
                 limit:this.limit,
                 sort_sortBy:this.sort
           }
          if(this.params.Select =='主题'){
            
                if(this.params.search !=''){
                  
                    data.query_EQ_abstractWords = this.params.search;
                    data.query_EQ_chineseName = this.params.search;
                    data['query_EQ_requirement'] = this.params.search;
                }
           }else if(this.params.Select =='专利名称'){
              
               if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_chineseName'] = this.params.search;
           }else if(this.params.Select =='主权利要求'){
              
               if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_requirement'] = this.params.search;
           }else if(this.params.Select =='申请号'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_patentNo'] = this.params.search;
                
           }else if(this.params.Select =='公开号'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_publishNo'] = this.params.search;
                 
           }else if(this.params.Select =='分类号'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                    return ;
               }
                data['query_EQ_rankNo'] = this.params.search;
                
           }else if(this.params.Select =='主分类号'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_rankNo'] = this.params.search;
                
           }else if(this.params.Select =='申请人'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_applicant'] = this.params.search;
                
           }else if(this.params.Select =='发明人'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_inventor.personName'] = this.params.search;
                
           }else if(this.params.Select =='地址'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_address'] = this.params.search;
                
           }else if(this.params.Select =='代理人'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_agentPerson'] = this.params.search;
                
           }else if(this.params.Select =='优先权'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_null'] = this.params.search;
                
           }
            //console.log(this.filter);
            if(this.query_EQ_applyDate != ''){
                 data['query_EQ_applyDate'] = this.query_EQ_applyDate;
            }
            if(this.query_EQ_awardDate != ''){
                 data['query_EQ_awardDate'] = this.query_EQ_awardDate;
            }
            if(this.query_EQ_applicant_group != ''){
                 data['query_EQ_applicant.group'] = this.query_EQ_applicant_group;
            }
            if(this.query_EQ_inventor_personName_group != ''){
                 data['query_EQ_inventor.personName.group'] = this.query_EQ_inventor_personName_group;
            }
             if(this.filter.query_EQ_patentType != ''){
                 data['query_EQ_patentType'] = this.filter.query_EQ_patentType;
            }
             if(this.filter.query_EQ_subPartName != ''){
                 data['query_EQ_subPartName'] = this.filter.query_EQ_subPartName;
            }
             if(this.filter.query_EQ_province != ''){
                 data['query_EQ_province'] = this.filter.query_EQ_province;
            }


           if(this.isSelectType == true){
                 var data={
                     query_EQ_patentType:this.params.checkArr.join(',')
                 }
           }
         var prveindex = this.chooseindex;
           this.axios.get(url,{params:data}).then(res=>{
                 //console.log(res);
                 if(res.data.code*1 ==200){
                     var content = res.data.data.content;
                     this.total = res.data.count*1;
                     content.forEach(item => {
                            item.applyDate =
                                item.applyDate.slice(0, 4) +
                                "-" +
                                item.applyDate.slice(4, 6) +
                                "-" +
                                item.applyDate.slice(6, 8);
                            item.awardDate =
                                item.awardDate.slice(0, 4) +
                                "-" +
                                item.awardDate.slice(4, 6) +
                                "-" +
                                item.awardDate.slice(6, 8);
                            // 法律状态
                            switch (item.patentStatus) {
                                case "1":
                                item.patentStatus = "申请";
                                break;
                                case "2":
                                item.patentStatus = "授权";
                                break;
                                case "3":
                                item.patentStatus = "申中";
                                break;
                                default:
                                item.patentStatus = "未知";
                                break;
                            }
                             item.patentType = this.patentType(item.patentType);
                    });
                    this.List = content;
                    this.filterData = res.data.groupFilter;
                 
                    this.filterData.patentType.forEach(item=>{
                         if(item.name=='3'){
                                item.title = '外观设计'
                            }else  if(item.name=='4'){
                                item.title = '发明公布'
                            }else if(item.name=='5'){
                                item.title = '发明授权'
                            }else if(item.name=='6'){
                                item.title = '实用新型'
                            }else{
                                item.title = '其他'
                            }
                        })
                  
                   
                 }
                  this.handleClickNav(this.menuindex);
                  this.chooseindex = prveindex;
           })
     },
     //获取刷选
     //页数
     handleSize(num){
          this.limit = num;
          this.getList();
     },
     //页码
     handlePage(num){
         this.page = num;
        this.getList();
     },
    
    //分组浏览子菜单选择
    handleChoose(str,i){
        this.chooseindex =i;
       
        if(this.menuindex ==0){
            this.query_EQ_applyDate = str;
             this.query_EQ_awardDate='';
             this.query_EQ_applicant_group='';
             this.query_EQ_inventor_personName_group='';

        }else  if(this.menuindex ==1){
            this.query_EQ_awardDate = str;
             this.query_EQ_applyDate='';
             this.query_EQ_applicant_group='';
             this.query_EQ_inventor_personName_group='';
        }else  if(this.menuindex ==2){
            this.query_EQ_applicant_group = str;
              this.query_EQ_applyDate='';
            this.query_EQ_awardDate='';
             this.query_EQ_inventor_personName_group='';
        }else  if(this.menuindex ==3){
            this.query_EQ_inventor_personName_group = str;
             this.query_EQ_applicant_group = '';
              this.query_EQ_applyDate='';
            this.query_EQ_awardDate='';
        }
         this.getList();   
    },
     //选择专利类型
     handlepatentType(value,i){
          this.filter.query_EQ_patentType = value;
          this.patentindex = i;
         this.getList();   
     },
     //重置专利类型
     handleClosepatentType(){
          this.filter.query_EQ_patentType = '';
          this.patentindex = -1;
         this.getList();   
     },
     //选择ipc分类
     handlesubPartName(value,i){
          this.filter.query_EQ_subPartName = value;
          this.ipcindex = i;
          this.getList();   
     },
      //重置ipc分类
     handleClosesubPartName(){
          this.filter.query_EQ_subPartName = '';
          this.ipcindex = -1;
          this.getList();   
     },
     //选择区域
     handleprovince(value,i){
          this.filter.query_EQ_province = value;
           this.proindex = i;
           this.getList();   
      },
       //重置区域
     handleCloseprovince(){
          this.filter.query_EQ_province = '';
           this.proindex = -1;
           this.getList();   
      },
     //选中多选框
      checkGroupChange(val) {
          this.checkArr = val;
       this.isSelectType = true;
       },
       //排序方式发生变化
       handleOption(){
         
           this.getList();
       },
       //选中多选框
       handlecheckbox(i){
              this.isSelectType = true;
             this.checkData[i].checked = !this.checkData[i].checked;
             var arr =  this.checkData.filter(item=>{
                   if(item.checked){
                     return item;
                   }
             })
             this.params.checkArr = arr.map(item=>{
                  return item.value;
             })
           
             this.getList();
       }
 },
 mounted(){
      window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
        this.getList();
  
 }
}
</script>

<style lang="scss" scoped>
 .selection{
     display: flex;
     .sc_left{
        
         .choose{
             display: flex;
             justify-content: center;
             align-items: center;
             margin: 0 20px;
             .brush{
                 width:100%;
                 display: flex;
                 justify-content: flex-end;
                 align-items: flex-start;
                 position: relative;
                 >ul{
                     width: 30%;
                     position: absolute;
                     left: 0;
                     top: 0;
                     z-index: 10;
                     >li{
                         height: 50px;
                         line-height: 50px;
                         text-align: center;
                         color: #909090;
                         background: #3b3b3b;
                         cursor: pointer;
                     }
                     li.active{
                         width:112px;
                         height: 50px;
                         background: url(../../../../assets/image/result/journal/active.png) no-repeat;
                         background-size: 100%;
                         color: #000000;
                         font-weight: bolder;
                     }
                 }
                 .search{
                     width: 70%;
                     height: 200px;
                     background:#1b1b1b;
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     margin-left: 10px;
                     >div{
                         width:80%;
                         input{
                                 height: 40px;
                                width: 100%;
                                margin-top: 20px;
                                background: #1b1b1b;
                                text-align: center;
                                border-bottom: 1px solid #909090;
                                color: #fff;
                                font-size: 14px;
                         }
                         /deep/.ivu-select-selected-value {
                                color:#fff;
                                text-align: center;
                            }
                            /deep/ .ivu-select-placeholder{
                                text-align: center;
                            }
                         /deep/ .ivu-checkbox-group{
                               display: flex;
                               flex-wrap: wrap;
                             .ivu-checkbox-group-item{
                                 margin-right: 0;
                                 width: 50%;
                             }
                         }
                     }
                 }
                 
             }
         }
         .button{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                margin: 20px 0;
                button{
                    width:90px;
                    height:36px;
                    line-height: 36px;
                    background:#ffc509 ;
                    text-align: center;
                    border-radius: 20px;
                    font-size: 18px;
                    border:none;
                    margin-right:10px;
                    font-weight: bold;
                    cursor: pointer;
                }
                i{
                   font-size: 24px;
                    cursor: pointer;
                }
        }
        .filter{
            margin:0 20px;
            height:420px;
            border:1px solid #3b3b3b;
            border-radius: 5px;
            margin-top: 30px;
            flex-direction: column;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .every{
                
                width:100%;
                 border-bottom:1px solid #3b3b3b;
               height: 33%;
                ol{
                     height: 100%;
                    display: flex;
                    li{
                        height: 100%;
                    }
                    li:first-child{
                       width:20%;
                       display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    li:nth-child(2){
                        width:80%;
                        padding: 0 10px;
                         overflow: auto;
                        //  height: 80%;
                        //   margin-top: 5%;
                          cursor: pointer;
                        div{
                            line-height: 26px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            p{
                                   width: 90%;
                                    height: 26px;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                            }
                        }
                    }
                    // li:last-child{
                    //     width:10%;
                    //     height:140px;
                    //     display: flex;
                    //     justify-content: center;
                    //     align-items: center;
                    //      position: relative;
                    //      .line{
                    //          width: 2px;
                    //          height: 80%;
                    //          background: #3b3b3b;
                    //          margin: 0 auto;
                    //      }
                    //      .scroll{
                    //          position: absolute;
                    //          top:10%;
                    //      }
                    // }
                
                }
           }
           
           
        }

        .active{
        color: #ffc509;
        }
      
     }
     .sc_right{
         width: 80%;
         overflow-y:auto;
         .main{
             width: 100%;
             height: 100%;
             background: #f8f8f8;

                    .header{
                        display: flex;
                        background: #fff;
                        .group{
                            width:40%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            h2{
                                font-size: 20px;
                                color: #ffc100;
                                margin-right: 24px;
                                font-weight: bolder;
                                margin-left: 20px;
                            }
                            ul{
                                display: flex;
                                li{
                                    font-size: 15px;
                                    margin: 0 10px;
                                    cursor: pointer;
                                }
                                li.active{
                                        background: #ffc300;
                                        border-radius: 15px;
                                        padding: 3px 14px;
                                        font-weight: bold;
                                }
                            }
                            
                        }
                        .choose{
                            width:60%;
                            height: 125px;
                            ul{
                                width: 100%;
                                height: 100%;
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                flex-wrap: wrap;
                                li{
                                    float: left;
                                    line-height: 30px;
                                    margin-right: 30px;
                                    display: flex;
                                    cursor: pointer;
                                }
                                li.active{
                                        color: #ffc300;
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                    .top{
                        height: 56px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 0 20px;
                        span{
                            font-weight: bold;
                            color: #000;
                            font-size: 18px;
                            
                        }
                        ul{
                            display: flex;
                                justify-content: space-between;
                                align-items: center;
                                li{
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-left: 10px;
                                    p{
                                    //   width:120px;
                                    text-align: right;
                                        padding-right: 10px;
                                        padding-left: 10px;
                                    }
                                    i{
                                        font-size: 22px;
                                        cursor: pointer;
                                    }
                                
                                }
                                li:nth-child(2){
                                    i{
                                        font-size: 36px;
                                    font-weight: bold;
                                    }
                                }
                                li:last-child{
                                    background: #fff;
                                }
                        }
                    }
                    .logo_active{
                            color: #ffc300;
                    }
                    .list{
                        margin: 0 20px;
                    }
                    .foot{
                        height:60px;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                    }
         }
     }
 }
 .chebox{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .checkbox{
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 5px 0;
        cursor: pointer;
          .checkboxFour {
            width: 12px;
            height: 12px;
            background:#1b1b1b;
            border-radius: 50%;
            border: 1px solid #9d9d9d;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                display: block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                cursor: pointer;
                background:#1b1b1b;
            }
        }
        .checked {
                border:1px solid #ffc509;
            span{
                    background: #ffc509;
            }
        }
        >label{
            padding-left: 8px;
              cursor: pointer;
        }
    }
}
   @media screen and (max-width: 1366px){
     .header{
          .choose{
                ul{
                    li{
                        margin-right: 10px!important;
                    }
                }
            }
     }

 .selection{
       .sc_left{
           .choose{
               .brush{
                    ul{
                        li.active{
                            // width:144px;
                           height: 50px;
                          background: url(../../../../assets/image/result/journal/active.png) no-repeat;
                          background-size: 100% 100%;
                         color: #000000;
                         font-weight: bolder;
                        
                        }
                    }
               }
           }
       }
       .sc_right{
           width: 80%;
       }
  }

 }

</style>