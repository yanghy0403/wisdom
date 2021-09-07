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
                                <!-- <li @click="handleRouter('journal')">国内期刊</li> -->
                                <li  @click="handleRouter('domesticPaper')">中文论文</li>
                                <li @click="handleRouter('internationalPaper')" class="active">英文论文</li>
                                <li @click="handleRouter('patent')">专利</li>
                                <li @click="handleRouter('reward')">奖励</li>
                            </ul>
                            
                             <div class="search">
                                 <div>
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
                 <div class="filter" v-if="(filterData.name && filterData.name.length>0) || filterData.field && filterData.field.length>0">
                    <div class="every" v-if="filterData.field && filterData.field.length>0 ">
                        <ol>
                            <li>
                                <img src="../../../../assets/image/result/paper/paper.png" alt="">
                            </li>
                            <li>
                                <div v-for="(item,i) in filterData.field" :key="i" :class="fieldindex ==i ? 'active':''">
                                    <p @click="handlediscipline(item,i)" >{{item.name}}</p>
                                    <p>
                                        <span>{{item.value.toLocaleString()}}</span>
                                        <Icon type="ios-close-circle" v-if="fieldindex ==i" @click="handleClosediscipline"/>
                                        <i v-else></i>
                                    </p>
                                </div>
                            </li>
                            
                        </ol>
                    </div>
                    <div class="every" v-if="filterData.name && filterData.name.length>0 ">
                            <ol>
                            <li>
                                <img src="../../../../assets/image/result/paper/keyword.png" alt="">
                            </li>
                            <li>
                                <div v-for="(item,i) in filterData.name" :key="i"  :class="includeindex ==i ? 'active':''">
                                    <p @click="handledincluded(item,i)">{{item.name}}</p>
                                    <p>
                                        <span>{{item.value.toLocaleString()}}</span>
                                        <Icon type="ios-close-circle" v-if="includeindex ==i" @click="handleClosedincluded"/>
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
                                                <!-- <li @click="handleClickNav(0)" :class="menuindex == 0? 'active':''">专题</li> -->
                                                <li @click="handleClickNav(1)" :class="menuindex == 1? 'active':''">发表年度</li>
                                                <li @click="handleClickNav(2)" :class="menuindex == 2? 'active':''">作者</li>
                                                <li @click="handleClickNav(3)" :class="menuindex == 3? 'active':''">机构</li>
                                            </ul>
                                    </div>
                                    <div class="choose">
                                        <ul>
                                            <li v-for="(item,i) in chooseData" :key="i" :class="chooseindex == i? 'active':''" @click="handleChoose(item.name,i)"> {{item.name}} ({{item.value}})</li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            <div class="top">
                                    <span>检索到 {{total.toLocaleString()}}条结果</span>
                                    <ul>
                                    
                                        <li>
                                            <p >排序方式:</p>
                                            <Select v-model="sort">
                                                <Option v-for="item in sortData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </li>
                                    </ul>
                            </div>
                            <div class="list List">
                                    <Table :columns="columns" :data="List">
                                        <template slot-scope="{row}" slot="title">
                                            <span @click="handleTodetail('internationaldetail',row)" class="title">{{row.chineseTitle}}</span>
                                        </template>
                                        <template slot-scope="{row}" slot="author">
                                            <span v-for="(item,i) in row.authors" :key="i" style="padding-right:5px;">{{item.personName}} ;</span>
                                        </template>
                                        <template slot-scope="{row}" slot="journal">
                                            <span>{{row.journal?row.journal:'未知'}}</span>
                                        </template>
                                        <template slot-scope="{row}" slot="publishDate">
                                            <span>{{row.publishDate.slice(0,4)+'-'+row.publishDate.slice(4,6)}}</span>
                                        </template>
                                    </Table>
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
                    <img src="../../../../assets/image/index/01/menu2.png" alt="" @click="handleClick"  class="menulogo">
                </Tooltip>
       </div>
        <navmenu></navmenu>
   </div>
</template>

<script>




import navmenu from '@/components/Navmenu'
import { log } from 'util'
export default {
 name:'internationalPaper',
 data(){
    return{
         periodicalList: [
            {
                value: "刊名（曾用刊名）",
                label: "刊名（曾用刊名）"
            },
            {
                value: "主办单位",
                label: "主办单位"
            },
            {
                value: "出版地",
                label: "出版地"
            },
            {
                value: "ISSN",
                label: "ISSN"
            },
            {
                value: "CN",
                label: "CN"
            }
        ],//国内期刊筛选条件
         isShow:true,//控制右上角的logo
        curnav:0,//当前选中的导航下标
          search :'',
         resultList: [
            {
                value: "主题",
                label: "主题"
            },
            {
                value: "作者",
                label: "作者"
            },
            // {
            //     value: "关键词",
            //     label: "关键词"
            // },
            {
                value: "摘要",
                label: "摘要"
            },
            {
                value: "篇名",
                label: "篇名"
            },
            {
                value: "单位",
                label: "单位"
            },
            {
                value: "刊名",
                label: "刊名"
            }
         ],
         filterData:[],
         params:{
            Select:'',
            search :'',
         },
         chooseData:[],
         menuindex:1,
         total:100,
         page:1,
         limit:8,
         sort:"source.keyword",//排序方式
         sortData:[
              {
                value:'source.keyword',
                label:'相关度'
             },
             {
                value:'publishDate.keyword',
                label:'发表时间'
             },
              {
                value:'citation',
                label:'被引数'
             }
         ],
        logoindex:0,//默认展示列表
        filterData:[],//刷选条件
        chooseindex:-1,//分组浏览子菜单下标
        query_EQ_applyDate:"",//专题
        query_EQ_awardDate:'',//发表年度
        query_EQ_applicant_group:'',//作者
        query_EQ_inventor_personName_group:'',//机构
        filterData:{},//过滤条件数据
        filter:{},//子组件传过来的选中的刷选条件
        List:[],
        columns:[
            {
               title:'篇名',
               slot:'title'
            },
             {
               title:'作者',
               slot:'author'
            },
            {
               title:'刊名',
               slot:'journal',
               width:120
            },
            {
               title:'发表时间',
               key:'publishDate',
               width:120
            },
            {
               title:'知网被引数',
               key:'citation',
               width:100,
               align:'center'
            }
        ],
         filterData:{},
         fieldindex:-1,//默认选中的学科分类
         includeindex:-1,//默认选中的收录情况
         filter:{
             field:'',
             include:''
         }
    }
 },
 components:{navmenu,},
 methods:{
    
        //重置
        handleReset(){
           this.sort="source.keyword";
           this.page = 1;
           this.limit = 8;
           this.query_EQ_applyDate = '';
           this.query_EQ_awardDate = '';
           this.query_EQ_applicant_group = '';
           this.query_EQ_inventor_personName_group = '';
           this.filter={
                 field:'',
                 include:''
           },
           this.params={
                Select:'',
                search:''
           }
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
      //跳转论文详情
      handleTodetail(path,item){
         
        //   this.$router.push({
        //       name:path,
        //       query:{
        //           paperId:item.achievementId
        //       }
        //   })
      },
      //切换分组浏览
       handleClickNav(num){
        this.menuindex = num;
         if(this.menuindex ==0){
                this.chooseData = this.filterData.fieldSub;
        }else if(this.menuindex ==1){
                this.chooseData = this.filterData.publishDate;
        }else if(this.menuindex ==2){
                this.chooseData = this.filterData.personName;
        }else if(this.menuindex ==3){
                this.chooseData = this.filterData.orgName;
        }
         this.chooseindex = -1;
        
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
           var url=`/portal/es/achievement/domestic`;
            var date = this.query_EQ_awardDate ? this.query_EQ_awardDate + '0000' :'';
           var data={
                 offset:this.page -1,
                 limit:this.limit,
                 sort_sortBy:this.sort,
                 query_EQ_isChinese:'2',
                 query_EQ_fieldSub:this.query_EQ_applyDate,
                 query_EQ_publishDate:date,
                 'query_TERM_authors.personName.group':this.query_EQ_applicant_group,
                 'query_TERM_authors.orgName.group':this.query_EQ_inventor_personName_group,
                 query_EQ_field:this.filter.field,
                 'query_EQ_include.name':this.filter.include
           }
          
           if(this.params.Select =='主题'){
                if(this.params.search !=''){
                      data.query_EQ_abstractWords = this.params.search;
                    data.query_EQ_chineseTitle = this.params.search;
                    data['query_EQ_keywords.keyword'] = this.params.search;
                }
           }else if(this.params.Select =='作者'){
              
               if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_authors.personName'] = this.params.search;
           }else if(this.params.Select =='关键词'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_keywords.keyword'] = this.params.search;
                
           }else if(this.params.Select =='摘要'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_abstractWords'] = this.params.search;
                 
           }else if(this.params.Select =='篇名'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                    return ;
               }
                data['query_EQ_chineseTitle'] = this.params.search;
                
           }else if(this.params.Select =='单位'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_authors.orgName'] = this.params.search;
                
           }else if(this.params.Select =='刊名'){
                 if(this.params.search == '' || this.params.search ==null){
                     this.$Modal.error({
                            title: '消息警告',
                            content: '请输入关键词'
                        });
                     return ;
               }
                data['query_EQ_journal'] = this.params.search;
                
           }
             var prveindex = this.chooseindex;
           this.axios.get(url,{params:data}).then(res=>{
               //  console.log(res);
                 if(res.data.code*1 ==200){
                     var content = res.data.data.content;
                     this.total = res.data.count*1;
                    
                    this.List = content;
                    this.filterData = res.data.groupFilter;
                   }
                this.handleClickNav(this.menuindex);
                  this.chooseindex = prveindex;
           })
     },
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
   
      //选择学科分类
      handlediscipline(item,i){
         this.filter.field =item.name;
         this.fieldindex = i;
         this.getList();   
      },
       //重置学科分类
      handleClosediscipline(){
         this.filter.field ='';
         this.fieldindex = -1;
         this.getList();   
      },
       //选择收录情况
      handledincluded(item,i){
         this.filter.include =item.name;
         this.includeindex = i;
          this.getList();   
      },
       //重置收录情况
      handleClosedincluded(){
         this.filter.include ='';
         this.includeindex = -1;
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
            // height:420px;
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
               height: 210px;
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
                         
                        div{
                            line-height: 26px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                             cursor: pointer;
                            p{
                                   width: 90%;
                                    height: 26px;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                            }
                        }
                    }
                    
                
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


               .title:hover{
                    // color: #3366cc;
                    text-decoration: underline;
                    cursor: pointer;
                }
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
                        color: #202020;
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
   @media screen and (max-width: 1366px){
     .header{
          .choose{
                ul{
                    li{
                        margin-right: 10px;
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