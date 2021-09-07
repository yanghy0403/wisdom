<template>
   <div class="home">
        <div class="selection">
              <div class="sc_left">
                   <div class="menu">
                      <p>人才挖掘</p>
                      <ul>
                       <li @click="handleRouter('talentperson')">人才合作</li>
                        <li>|</li>
                        <li @click="handleRouter('orgcoop')">机构合作</li>
                        <li>|</li>
                        <li @click="handleRouter('orgsetting')">机构挖掘</li>
                     </ul>
                    </div>
                    <div class="sc_search">
                         <input placeholder="请输入人才名称,例如李灿" class="org search_org" v-model.trim="search"  @keyup.enter="handleEnter" @input="handleEnter"/>
                          <div class="ivu-poptip-popper" v-if="tipIsShow">
                            <div class="ivu-poptip-inner scrollbar" style=" max-height:200px;overflow: hidden;overflow-y: auto;">
                            <ul v-if="contentData.length===0">
                                <li  class="ivu-poptip-body">暂无匹配数据</li>
                            </ul>
                            <ul v-else>
                                <li
                                class="ivu-poptip-body"
                                v-for="item in contentData"
                                @click="handleClickQuery(item)"
                                :key="item.id"
                                style="cursor:pointer;"
                                >
                                <span class="ivu-poptip-body-content-inner">{{item.personName +":" + item.orgName}}</span>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div class="sc_search">
                            <input placeholder="请输入开始时间,例如2010" class="org" v-model.trim="startdate" type="number" :active-change="false" min="0"/>
                           <input placeholder="请输入结束时间,例如2020" class="org" v-model.trim="enddate" type="number" :active-change="false" min="0"/>
                    </div>
                     
                    <div class="button">
                        <button @click="handleSearch">查询</button>
                        <Icon type="md-refresh" @click="handleClear"/>
                    </div>
                   
              </div>
              <div class="sc_right">
                      <div class="header">
                         <span>检索到{{activeMenu}}{{total.toLocaleString()}}个</span>
                     </div>
                     <div class="content">
                          <div class="module phone">
                                <h3>人才网络挖掘图谱</h3>
                                <div class="graph">
                                       <graph :data="graphData"></graph>
                                </div>
                          </div>
                          <div class="module">
                               <ul>
                                   <li @click="handleMenu(0)" :class="navindex ==0?'active':''">论文</li>
                                   <li>|</li>
                                   <li @click="handleMenu(1)" :class="navindex ==1?'active':''">专利</li>
                                   <li>|</li>
                                   <li @click="handleMenu(2)" :class="navindex ==2?'active':''">项目</li>
                                   <li>|</li>
                                   <li @click="handleMenu(3)" :class="navindex ==3?'active':''">奖励</li>
                               </ul>
                              <div class="list">
                                     <Paper :data="List" v-if="navindex ==0"/>
                                     <Patent :data="List" v-if="navindex==1"/>
                                     <Project :data="List" v-if="navindex==2"/>
                                     <Reward :data="List" v-if="navindex==3"/>
                                      <div v-if="List.length === 0" class="sc-box-content no-data border-bottom">暂无数据</div>
                              </div>
                                <div class="footer">
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
              </div>
              <Tooltip content="导航栏" placement="left" class="menu_logo" v-if="isShow">
                    <img src="../../assets/image/index/01/menu2.png" alt="" @click="handleClick" class="menulogo">
                </Tooltip>
        </div>
         <navmenu></navmenu>  
         <div class="fullscreen" @click="tipIsShow =false" v-if="tipIsShow"></div>
   </div>
</template>

<script>
import navmenu from '@/components/Navmenu'
import graph from './modules/graph'

import Paper from "../knowledge/Modules/Paper"; //论文列表
import Project from "../knowledge/Modules/Project"; //项目列表
import Patent from "../knowledge/Modules/Patent"; //专利列表
import Reward from "../knowledge/Modules/Reward"; //奖励列表

export default {
 name:'personsetting',
 data(){
    return{
        search:'',
       
        startdate:'',
        enddate:'',
         total:100,
         page:1,
         limit:5,
         isShow:true,//控制右上角的logo
         List:[ ],
        navindex:0,//导航下标
        isfullScreen: false,
       personId: "2995e2be27c04a74b69a3f6223fd788a",
        graphData: {},
        tipIsShow:false,//人员推荐栏
        contentData:[],//推荐人员数据
        activeMenu:'论文'
    }
 },
 components:{navmenu,graph,Paper,Project,Patent,Reward},
 methods:{
      handleEnter(){
        var that = this;
        var timer;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
              that.handleQueryTip();
        },1000)
     },
     //人员检索
     handleQueryTip(){
         this.tipIsShow = true;
         
          var url=`/indexCon/searchPerson`;
          var data={
             searchWord:this.search,
              
          }
          this.axios.get(url,{params:data}).then(res=>{
            //   console.log(res);
               this.SetHeight();
              if(res.data.code =='200'){
                    this.contentData = res.data.data;
              }
          }).catch(error=>{
                console.log(error);
          })
     },
       // 下拉查询
    handleClickQuery(item) {
      this.personId = item.id;
      this.search = item.personName;
      this.tipIsShow = false;
     
    },
    //重置
    handleClear(){
          this.startdate ='';
          this.enddate = '';
          this.search = '';
          this.handleSearch();
    },
     //设置推荐栏宽度
      SetHeight(){
          var list = document.querySelector('.ivu-poptip-inner');
         list.style.width = document.querySelector('.search_org').offsetWidth + 'px';
        
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
      //页数
      handleSize(size){
          this.limit = size;
           var num = this.navindex;
           if(num ==0){
             this.getPaper();
          }else if(num ==1){
              this.getPatent();
          }else if(num ==2){
              this.getProject();
          }else if(num ==3){
              this.getReward();
          }
      },
      //页码
      handlePage(page){
          this.page =page;
          var num = this.navindex;
           if(num ==0){
             this.getPaper();
          }else if(num ==1){
              this.getPatent();
          }else if(num ==2){
              this.getProject();
          }else if(num ==3){
              this.getReward();
          }
      },
      //菜单选择
      handleMenu(num){
          this.navindex = num;
          if(num ==0){
              this.activeMenu = '论文'
             this.getPaper();
          }else if(num ==1){
               this.activeMenu = '专利'
              this.getPatent();
          }else if(num ==2){
               this.activeMenu = '项目'
              this.getProject();
          }else if(num ==3){
               this.activeMenu = '奖励'
              this.getReward();
          }
      },
      //确定检索
       handleSearch() {
         
         let startdate = this.startdate.replace(/\s*/g,"")*1;
         let enddate = this.enddate.replace(/\s*/g,"")*1;
         
          
           if(startdate !='' && enddate != '' && (startdate> enddate)){
               this.$Modal.error({
                       title:'消息警告',
                       content:'开始时间不允许大于结束时间，请重新输入'
                 });
                return ;
           }
           this.handleMenu(0);
             this.getGraph();
           
    },
    handleRouter(path){
      this.$router.push({name:path})
    },
    //论文
     getPaper(){
       
           var url=`/portal/es/person/paper`;
           var data={
                 endYear:this.enddate,
                 limit:this.limit,
                 offset:this.page -1,
                 personId:this.personId,
                 startYear:this.startdate
           }
           this.axios.get(url,{params:data}).then(res=>{
                //  console.log(res);
                 if(res.data.code =='200'){
                        if (res.data.code =='200') {
                         var data = res.data.data.content;
                            data.forEach(item => {
                                if (item.keywords) {
                                let string = "",
                                    newArr = [];
                                for (let i = 0; i < item.keywords.length; i++) {
                                    if (item.keywords[i].keyword) {
                                    newArr.push({
                                        name: item.keywords[i].keyword
                                    });
                                    }
                                }
                                newArr.forEach(ele => {
                                    string = string + ele.name + "; ";
                                });
                                item.keywords = string;
                                }
                                //更新时间格式
                                if (item.publishDate) {
                                item.publishDate =
                                    item.publishDate.slice(0, 4);
                                }
                            });
                            this.List = data;
                            this.total = res.data.count*1;
                         
                           
                     }else{
                           this.List= [];
                     }
                 }

           })
     },
     //获取大图数据
     getGraph(){
           var url=`/indexCon/queryGraph`;
            var data={
                endYear:this.enddate,
                startYear:this.startdate,
                personId:this.personId,
                type:'人才,论文,专利,奖励,项目'
            }
            this.axios.get(url,{params:data}).then(res=>{
                // console.log(res);
                if(res.data.code =='200'){
                    this.graphData = res.data.data;
                    this.graphData.id = this.personId;
                }
            }).catch(error=>{
                  console.log(error);
            })
     },
     //专利
     getPatent(){
           var url=`/portal/es/person/patent`;
               var data ={
                  personId:this.personId,
                  offset:this.page-1,
                  limit:this.limit,
                 endYear:this.enddate,
                  startYear:this.startdate
             }
          
               this.axios.get(url,{params:data}).then(res=>{
                  // console.log(res)
                    if (res.data.code =='200') {
                        let content = res.data.data.content;
                        this.List = content.map(item => {
                            item.applyDate =
                            item.applyDate.slice(0, 4) + " - " + item.applyDate.slice(4, 6);
                            item.awardDate =
                            item.awardDate.slice(0, 4) + " - " + item.awardDate.slice(4, 6);
                            return item;
                        });
                        this.total = res.data.count*1;
                     }else{
                         this.List= [];
                     }
                })
     },
     //奖励
     getReward(){
           var url=`/portal/es/person/reward`;
               var data ={
                  personId:this.personId,
                  offset:this.page-1,
                  limit:this.limit,
                   endYear:this.enddate,
                  startYear:this.startdate
             }
               this.axios.get(url,{params:data}).then(res=>{
                //    console.log(res);
                     if (res.data.code == '200') {
                        this.List = res.data.data.data.map(item=>{
                             return {
                                 ...item,
                                 title:item.rewardName
                             }
                        });
                        this.total = res.data.data.total*1;
                      
                     }
                }).catch(error=>{
                      console.log(error);
                })
     },
     //项目
     getProject(){
            var url=`/portal/es/person/project`;
             var data ={
                  personId:this.personId,
                  offset:this.page-1,
                  limit:this.limit,
                   endYear:this.enddate,
                  startYear:this.startdate
             }
               this.axios.get(url,{params:data}).then(res=>{
                     if (res.data.code == '200') {
                         var data = res.data.data.content;
                        data.forEach(item => {
                            if (item.keywords) {
                            let string = "",
                                newArr = [];
                            for (let i = 0; i < item.keywords.length; i++) {
                                if (item.keywords[i].keyword) {
                                newArr.push({
                                    name: item.keywords[i].keyword
                                });
                                }
                            }
                            newArr.forEach(ele => {
                                string = string + ele.name + "; ";
                            });
                            item.keywords = string;
                            }
                            //更新时间格式
                            if (item.publishDate) {
                            item.publishDate =
                                item.publishDate.slice(0, 4) +
                                "-" +
                                item.publishDate.slice(4, 6);
                            }
                        });
                        this.List = data;
                       
                        this.total = res.data.count*1;
                     }
                })
     }
 },
 mounted(){
      window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
      this.handleMenu(0);
        this.getGraph();
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
             justify-content: space-between;
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
                // margin-left: 20px;
                li{
                  cursor: pointer;
                  padding:0 5px;
                  font-size: 10px;
                }
               
            }
         }
         .sc_search{
             padding:0 20px;
             input{
                width: 100%; 
                height: 40px;
                line-height: 40px;
                background: #000000;
                border-bottom: 1px solid #3b3b3b;
                color:#fff;
                padding-left: 5px;
                margin-top: 10px;
             }
         }
         .sc_select{
             padding:0 20px;
             margin-top: 10px;
             p{
               padding:10px 0;
               display: flex;
               justify-content: flex-start;
               align-items: center;
               span{
                   width:30%;
                   color: #fff;
               }
              /deep/.ivu-select-selection{
                   border-radius: 20px;
                   background-color: #3b3b3b;
                   border:1px solid #3b3b3b;
               }
              /deep/.ivu-select-selected-value {
                  color:#fff;
                   text-align: center;
              }
              /deep/ .ivu-select-placeholder{
                  text-align: center;
              }
             }
         }
        .button{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            margin-top: 30px;
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
            }
        }
       
     }
     .sc_right{
           width:80%;
            background: #f8f8f8;
              overflow: hidden;
            overflow-y: auto;
            .header{
                height: 90px;
                line-height: 90px;
                background:#f8f8f8;
                span{
                    padding-left: 15px;
                    font-size: 16px;
                    font-weight: bold;
                }
            }
            .content{
                background:#fff;
                display: flex;
                margin: 10px;
                box-shadow: 0 1px 6px rgba(0,0,0,.2);
               height: 84%;
                 .module{
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                  
                    >h3{
                        height: 60px;
                        line-height: 60px;
                        padding-left: 20px;
                        font-weight: bold;
                        font-size: 16px;
                        border-bottom: 1px solid #ddd;
                    }
                    >ul{
                        display: flex;
                        border-bottom: 1px solid #ddd;
                        box-sizing: border-box;
                        height: 60px;
                        padding-left: 20px;
                        li{
                            line-height: 60px;
                            margin: 0 5px;
                            font-weight: bold;
                            font-size: 14px;
                            cursor: pointer;
                            color: #202020;
                        }
                        li.active{
                            color:#ffc509;
                            text-decoration: underline;
                        }
                        li.ver{
                            color:#e8e8e8 ;
                        }
                    }
                    .list{
                        padding: 0 20px;
                          overflow-y: auto;
                         flex-grow: 1;
                        .every{
                            margin-bottom: 20px;
                            .head{
                                display: flex;
                                justify-content: space-between;
                                align-items:center ;
                                height: 46px;
                                h3{
                                    height:30px;
                                    line-height:30px;
                                   color: #000;
                                    font-weight: bold;
                                    font-size: 16px;
                                }
                                ul{
                                    display: flex;
                                    li:first-child{
                                        margin-right: 10px;
                                    }
                                }
                            }
                            .introduction{
                                text-indent: 2em;
                                line-height: 26px;
                                 text-overflow: -o-ellipsis-lastline;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                        }
                    }
                     .footer{
                            height:60px;
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                        }
                    // .graph{
                    //     height: 100%;
                    // }
                }
            }
     }
     .phone{
         display: flex;
         flex-direction: column;
         .graph{
             flex: 1;
            //  border-right: 1px solid #ddd;
         }
     }
}
.no-data{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 1366px){
    .selection{
        .sc_left{
            .menu{
                p{
                //    font-size:32px;
              
                }
                ul{
                    margin-left: 0;
                    li{
                       padding:0 2px;
                    }
                }
            }
            .sc_search,.sc_select,.button{
                padding: 0 15px;
            }
           
        }
    }
}
  //设置placeholder的字体大小颜色
 ::-webkit-input-placeholder { /* WebKit browsers */
    color: #fff; 
    font-size: 10px;
    }
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #fff; font-size: 10px;}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #fff;font-size: 10px; }
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #fff; font-size: 10px;}
input:focus::-webkit-input-placeholder{ color:#fff;font-size: 10px; }
</style>