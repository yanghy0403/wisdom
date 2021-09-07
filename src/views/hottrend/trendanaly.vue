<template>
    <div class="home">
         <div class="selection">
             <div class="sc_left">
                 <div class="menu">
                      <p>趋势分析</p>
                      <ul>
                       <li @click="handleRouter('wordanaly')">热点词分析</li>
                       <!-- <li>|</li>
                       <li>领域查询</li>
                       <li>|</li>
                      <li @click="handleRouter('results')">成果查询</li> -->
                     </ul>
                 </div>
              
                <!-- <div class="sc_select">
                     
                      <p>
                          
                            <Select v-model="subject1" clearable placeholder="请选择学科">
                                <Option v-for="item in subjectData1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                      </p>
                     
                </div> -->
                 <div class="sc_search">
                    <input
                        placeholder="请输入领域词：例如农业生态学"
                        class="org search_org"
                        v-model.trim="search"
                        @keyup.enter="handleEnter"
                        @input="handleEnter"
                    />
                    <div class="ivu-poptip-popper" v-if="tipIsShow">
                        <div
                        class="ivu-poptip-inner scrollbar"
                        style="max-height: 200px; overflow: hidden; overflow-y: auto"
                        >
                        <ul v-if="contentData.length === 0">
                            <li class="ivu-poptip-body">暂无匹配数据</li>
                        </ul>
                        <ul v-else>
                            <li
                            class="ivu-poptip-body"
                            v-for="item in contentData"
                            @click="handleClickQuery(item)"
                            :key="item.id"
                            style="cursor: pointer"
                            >
                            <span class="ivu-poptip-body-content-inner">{{
                                item.name
                            }}</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                 <div class="sc_search">
                      <input placeholder="请输入开始年份,例如2010" class="name" v-model="startYear" type="number" :active-change="false" min="0"/>
                      <input placeholder="请输入结束年份,例如2020" class="org" v-model="endYear" type="number" :active-change="false" min="0"/>
                    
                </div>
                <div class="button">
                      <button @click="handleSearch">查询</button>
                       <Icon type="md-refresh" @click="handlereset"/>
                </div>
              
              </div>
             <div class="sc_right" ref="sc_right">
                  
                   <Card title="热点图谱网络分析" style="margin-top:20px;">
                        <div class="demo-spin-col" v-if="isloading">
                              <Spin fix>
                                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                    <div>数据加载中,请稍后...</div>
                                </Spin>
                        </div>
                         <div class="module">
                               <internet :data="internetData"></internet>
                         </div>
                   </Card>
                    <Card title="关键词数量历年变化趋势" style="margin-top:10px">
                         <div class="module">
                               <brokenline :data="brokenData"></brokenline>
                         </div>
                   </Card>
                    <Card  style="margin-top:10px">
                        <div slot="title" style="display: flex; justify-content: space-between;align-items: center;">
                           <span>TOPN关键词逐年变化趋势</span>
                           <div class="year">
                                  <label for="" style="padding-right: 10px;">展示关键词个数:</label>
                                 <span :class="yearindex ==0? 'active':''" @click="handleChangeYear(0,5)">5</span>
                                 <span :class="yearindex ==1? 'active':''" @click="handleChangeYear(1,10)">10</span>
                                 <span :class="yearindex ==2? 'active':''" @click="handleChangeYear(2,15)">15</span>
                                 <span :class="yearindex ==3? 'active':''" @click="handleChangeYear(3,20)">20</span>
                           </div>
                        </div>
                         <div class="module">
                               <keyword :data="keywordData"></keyword>
                         </div>
                   </Card>
                   <Card style="margin-top:10px">
                        <p slot="title" >
                            学科热词近年变化
                        </p>
                        <Table :columns="columns" :data="tableData"></Table>
                       
                       
                    </Card>
                    <div class="page">
                            <!-- <Page :total="total" /> -->
                             <el-pagination
                                layout="prev, pager, next"
                                :total="total"
                                @size-change="handleSize"
                                @current-change="handlePage"
                                :current-page.sync="page"
                                >
                            </el-pagination>
                    </div>
             </div>
              <Tooltip content="导航栏" placement="left" class="menu_logo" v-if="isShow">
                    <img src="../../assets/image/index/01/menu2.png" alt="" @click="handleClick"  class="menulogo">
                </Tooltip>
         </div>
         <navmenu></navmenu>
         <BackTop  :bottom='100' @on-click="handleScroll(60)"></BackTop>
          <div class="fullscreen" @click="tipIsShow =false" v-if="tipIsShow"></div>
    </div>
</template>

<script>
import navmenu from '@/components/Navmenu'
import internet from './module/Internet'
 import brokenline from './module/brokenline'
 import keyword from './module/keyword'
 import keywordjson from './json/keyword.json'
 import brokenjson from './json/broken.json'
 import json from '../knowledge/org/json/cluser.json'
export default {
  name:'talent',
  data(){
      return{
        
        type:'',//学科分类
        typeList:[],//学科数据
       startYear:"",//开始年份
         endYear:"",//结束年份
         page:1,
         limit:8,
         total:0,//总条数
        isShow:true,//控制餐单的显隐
        columns:[],
        tableData: [],
        brokenData:{},//关键词数量变化趋势数据
        keywordData:{},//关键词逐年变化
        yearindex:0,//默认选中的年份
        year:5,//默认展示五年的数据
        internetData:{},//热点趋势分析
        keywordId:'fef75ba8dcdc654414c4f58a9fe01913',
         tipIsShow: false, //控制推荐栏
        contentData: [], //推荐关键词数据
        search:'',//关键词
        isloading:false,//加载动画
      }
  },
  components:{navmenu,internet,brokenline,keyword},
  methods:{
       //防抖
    handleEnter() {
      var that = this;
      var timer;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        that.handleQueryTip();
      }, 1000);
    },
    //关键词检索
    handleQueryTip() {
      var url = `/portal/graph/keyword/queryFields`;
      var data = {
        field: this.search,
        offset: 0,
        limit: 100,
      };
        this.tipIsShow = true;
         this.$nextTick(()=>{
            this.setWidth();
         })
      this.axios
        .get(url, { params: data })
        .then((res) => {
          if (res.data.code == "200") {
            this.contentData = res.data.data.content;
            
              
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    //设置推荐栏宽度
    setWidth() {
     
      var list = document.querySelector(".ivu-poptip-inner");
      list.style.width =
        document.querySelector(".search_org").offsetWidth + "px";
    },
       // 下拉查询
    handleClickQuery(item) {
      this.keywordId = item.id;
      this.search = item.name;
      this.tipIsShow = false;
     
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
      //查询列表数据
      handleSearch(){
      if(this.startdate !='' && this.enddate != '' && (this.startdate> this.enddate)){
              this.$Modal.error({
                  title:'消息警告',
                  content:"开始年份不允许大于结束年份，请重新填写"
              })
              this.startYear = '';
              this.endYear = '';
              return ;
          }
          this.getbroken();
        this.getTopNkeyword();
        this.getTableData();
        this.getInternet();
              
      },
      //重置
      handlereset(){
         this.search = '';
         this.keywordId='fef75ba8dcdc654414c4f58a9fe01913';
         this.startYear = '';
         this.endYear = '';
         this.handleSearch();
      },
      //设置列表高度
      SetHeight(){
       
          var select_dropdown = document.querySelectorAll('.ivu-select-dropdown');
         
          select_dropdown.forEach(item=>{
                item.style.width = document.querySelector('.ivu-select-single').offsetWidth + 'px';
                item.style['overflow-x'] ='hidden';
          })
     
      },
    
      //跳转不同的导航
      handleRouter(path){
           this.$router.push({name:path});
        },
       //页数
     handleSize(num){
          this.limit = num;
        this.getTableData();
     },
     //页码
     handlePage(num){
         this.page = num;
         this.getTableData();
     },
     //获取关键词数量变化趋势
     getbroken(){
           var url=`/portal/graph/keyword/keywordCountYearChangeTrend`;
          var data={
                fieldId:this.keywordId,
                endYear:this.endYear,
                startYear:this.startYear
            }
            this.axios.get(url,{params:data}).then(res=>{
                // console.log(res)
                  if(res.data.code =='200'){
                       this.brokenData = res.data.data;
                  }
            })
         
     },
     //topN关键词逐年变化
     getTopNkeyword(){
          
            var url=`/portal/graph/keyword/keywordYearChangeTrend`;
          var data={
                fieldId:this.keywordId,
                endYear:this.endYear,
                startYear:this.startYear
            }
            this.axios.get(url,{params:data}).then(res=>{
                // console.log(res)
                  if(res.data.code =='200'){
                       this.keywordData = res.data.data;
                  }
            })
     },
     //改变年份
     handleChangeYear(i,num){
          this.yearindex = i;
          this.year = num;
          this.getTopNkeyword();
     },
     //获取表格数据
     getTableData(){
            var url=`/portal/graph/keyword/keywordYearChangePercent`;
          var data={
                fieldId:this.keywordId,
                endYear:this.endYear,
                startYear:this.startYear
            }
            this.axios.get(url,{params:data}).then(res=>{
                //console.log(res)
                  if(res.data.code =='200'){
                       this.tableData = res.data.data.content;
                        var data = res.data.data.content[0];
                         var keys = Object.keys(data)
                       
                        
                        var columns = keys.map(item=>{
                              if(item ==='name'){
                                  return {
                                        title:'关键词',
                                        key:'name',
                                        align:'center'
                                  }
                              }else{
                                    return {
                                        title:item,
                                        key:item,
                                        align:'center',
                                        render:(h,params)=>{
                                            
                                            if(params.row[item].isup){
                                                return h('div',
                                               { class:'number_up'},
                                                [
                                                    h('span',params.row[item].value),
                                                    h('icon',{
                                                        props:{
                                                            type:'md-arrow-dropup'
                                                        }
                                                    })
                                                ])
                                                
                                            }else{
                                                 return h('div', { class:'number1'},[
                                                 h('span',params.row[item].value),
                                                  h('icon',{
                                                      props:{
                                                          type:'md-arrow-dropdown'
                                                      }
                                                  }),
                                                 
                                              ])
                                            }
                                        }
                                   }
                              }
                        })
                        this.columns = columns;
                  }
            })
     },
     //回到顶部
     handleScroll(step){
         let div = document.querySelector('.sc_right');
            div.scrollTop-=step;
            if (div.scrollTop>0) {
                var time=setTimeout(()=>this.handleScroll(step),15);
            }else {
                clearTimeout(time);
            }
     },
     //用来判断关东高度
     Scroll(){
        
         let el = document.querySelector('.sc_right');
          let backDiv= document.querySelector('.ivu-back-top');
          if(el.scrollTop >this.$height){
               backDiv.style.display = 'block';
          }else{
               backDiv.style.display = 'none';
          }
     },
     //热点趋势分析internetData
       getInternet(){
           this.isloading = true;
            var url=`/portal/graph/keyword/hotGraphAnalys`;
            var data={
                fieldId:this.keywordId,
                endYear:this.endYear,
                startYear:this.startYear
            }
            this.axios.get(url,{params:data}).then(res=>{
                // console.log(res)
                 this.isloading = false;
                  if(res.data.code =='200'){
                       this.internetData = res.data.data;
                      
                  }
            })
       }
   
  },
  mounted(){
         window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
        //  this.handleSearch();
        //  this.SetHeight();
        this.getbroken();
        this.getTopNkeyword();
        this.getTableData();
        this.getInternet();
         window.resize=function(){
             window.reload();
         }
        document.querySelector('.sc_right').onscroll = this.Scroll;
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
         .sc_search{
             padding:0 20px;
             input{
                width: 100%; 
                height: 40px;
                line-height: 40px;
                background: #000000;
                border-bottom: 2px solid #3b3b3b;
                color:#fff;
                padding-left: 5px;
                 font-size: 12px;
                 margin-top: 10px;
             }
               ::-webkit-input-placeholder{
                  color:#fff;
                  font-size: 12px;
                }
                input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                    color:#fff;
                     font-size: 12px;
                }
                input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                    color:#fff;
                     font-size: 12px;
                }
                input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                    color:#fff;
                     font-size: 12px;
                }
         }
         .sc_select{
             padding:0 20px;
             margin-top: 10px;
             p{
               padding:10px 0;
              /deep/.ivu-select-selection{
                   border-radius: 20px;
                   background-color: #3b3b3b;
                   border:1px solid #3b3b3b;
                    text-align: center;
                    font-size: 10px;
               }
              /deep/.ivu-select-selected-value {
                  color:#fff;
                  text-align: center;
                  font-size: 10px;
              }
             }
         }
        .button{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            margin-top: 20px;
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
      
     }
     .sc_right{
         width:80%;
          background: #f8f8f8;
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: space-between;
          overflow-y: auto;
          padding: 0 20px;
         .header{
             display: flex;
             justify-content: flex-end;
             align-items: center;
             height:90px;
             width:100%;
            
             span{
                 padding-left: 30px;
                 font-size: 18px;
                 font-weight: bold;
             }
             img{
                 display: block;
                 width:28px;
                 height:26px;
                //  margin-right: 30px;;
             }
         }
        .page{
                height: 90px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
               padding-right: 20px;
                width: 100%;
              .el-pagination{
             
                    /deep/ .el-pager{
                        li{
                                background: none;
                        }
                    }
                    /deep/ button{
                        background: none!important;
                    }
                }
                 
       }
        .module{
            width: 100%;
            height: 500px;
            
        }
        /deep/ .ivu-card-head{
           background:#d8e8f7;
        }
        .year{
             margin-right: 20px;
             span{
                display: inline-block;
                /* padding: 0.03125rem; */
                border: 0.005208rem solid #b3a5a5;
                width: 30px;
                height: 26px;
                text-align: center;
                line-height: 26px;
                margin-right: 10px;
                cursor: pointer;
             }
             .active{
               border: 1px solid #3366cc;
               color:  #3366cc;
            }
        }
        
     }
 }

 .nav{
        position: fixed;
        top: 0;
        right: 0;
        z-index: 100;
    }
@media screen and (max-width: 1366px){
    .selection{
        .sc_left{
            width: 20%;
            .menu{
                p{
                   font-size:32px;
               
                }
                ul{
                     margin-left: 10px;
                    li{
                       padding: 0 2px;
                       font-size: 10px;
                    }
                }
            }
            .sc_search,.sc_select,.button{
                padding: 0 15px;
            }
             .sc_search{
                padding:0 20px;
                input{
                   
                    font-size: 8px;
                }
                ::-webkit-input-placeholder{
                    color:#fff;
                    font-size: 8px;
                    }
                    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                        color:#fff;
                        font-size: 10px;
                    }
                    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                        color:#fff;
                        font-size: 10px;
                    }
                    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
                        color:#fff;
                        font-size: 10px;
                    }
            }
           
        }
        .sc-right{
            width: 80%;
        }
    }
}


.submenu::-webkit-scrollbar{/*滚动条整体*/
    width:5px;
    height: 30px;
}
.submenu::-webkit-scrollbar-track{/*滚动条轨道*/
background:#3b3b3b;
border-radius:2px;
}
.submenu::-webkit-scrollbar-thumb{/*滚动条里面的滑块*/
background:#999;
border-radius:10px;
}
.submenu::-webkit-scrollbar-thumb:hover{/*滚动条鼠标事件，鼠标放上去出现的事件*/
background:#999;
}
.submenu::-webkit-scrollbar-corner{/*滚动条边角*/
background:#3b3b3b;
}

</style>
<style lang="scss">
    .number_up{
       i, span{
                 color: red;
         }
    }
    .number1{
     color:green;
    }
   .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
