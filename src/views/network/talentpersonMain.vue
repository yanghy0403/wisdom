 <template>
   <div class="home">
        <div class="selection">
              <div class="sc_left">
                   <div class="menu">
                      <p>人才合作</p>
                      <ul>
                       <li @click="handleRouter('orgsetting')">机构挖掘</li>
                        <li>|</li>
                        <li @click="handleRouter('orgcoop')">机构合作</li>
                        <li>|</li>
                        <li @click="handleRouter('personsetting')">人才挖掘</li>
                     </ul>
                    </div>
                    <div class="sc_search">
                         <input placeholder="请输入人才名称,例如潘建伟" class="org search_org" v-model.trim="name1"  @keyup.enter="handleEnter(1)" @input="handleEnter(1)"/>
                          <div class="ivu-poptip-popper" v-if="tipIsShow1">
                            <div class="ivu-poptip-inner scrollbar" style=" max-height:200px;overflow: hidden;overflow-y: auto;">
                            <ul v-if="contentData.length===0">
                                <li  class="ivu-poptip-body">暂无匹配数据</li>
                            </ul>
                            <ul v-else>
                                <li
                                class="ivu-poptip-body"
                                v-for="item in contentData"
                                @click="handleClickQuery1(item)"
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
                         <input placeholder="请输入人才名称,例如陆朝阳" class="org search_org" v-model.trim="name2"  @keyup.enter="handleEnter(2)" @input="handleEnter(2)"/>
                          <div class="ivu-poptip-popper" v-if="tipIsShow2">
                            <div class="ivu-poptip-inner scrollbar" style=" max-height:200px;overflow: hidden;overflow-y: auto;">
                            <ul v-if="contentData.length===0">
                                <li  class="ivu-poptip-body">暂无匹配数据</li>
                            </ul>
                            <ul v-else>
                                <li
                                class="ivu-poptip-body"
                                v-for="item in contentData"
                                @click="handleClickQuery2(item)"
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
                         <span>人才合作分析图谱</span>
                     </div>
                     <div class="content">
                          <div class="module">
                                <h3>人才合作分析</h3>
                                <div class="graph">
                                      <graph :content="graphData"></graph>
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
import graph from './modules/Relations'
import json from "./modules/graph.json";
export default {
 name:'talentperson',
 data(){
    return{
        name1:'',
        name2:'',
        tipIsShow1:false,
        tipIsShow2:false,
        startdate:'',
        enddate:'',
         total:100,
         page:1,
         limit:8,
         isShow:true,//控制右上角的logo
         List:[],
        navindex:0,//导航下标
        isfullScreen: false,
        personId1: "8606e44b06624a1bae0853738555aba4",  
        personId2: "19af17b992364cf898d30552eae8e47b",  
        graphData: {},
         contentData:[],//推荐人员数据
    } 
 },
 components:{navmenu,graph},
 methods:{
     handleEnter(num){
        var that = this;
        var timer;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            if(num ==1){
                 that.handleQueryTip(this.name1);
                  this.tipIsShow1 = true;
            }else{
                  that.handleQueryTip(this.name2);
                   this.tipIsShow2 = true;
            }
        },1000)
     },
      //人员检索
     handleQueryTip(name){
        
          var url=`/indexCon/searchPerson`;
          var data={
             searchWord:name,
              
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
    handleClickQuery1(item) {
      this.personId1 = item.id;
      this.name1 = item.personName;
      this.tipIsShow1 = false;
     
    },
      // 下拉查询
    handleClickQuery2(item) {
      this.personId2 = item.id;
      this.name2 = item.personName;
      this.tipIsShow2 = false;
     
    },
    //重置
    handleClear(){
          this.startdate ='';
          this.enddate = '';
          this.name1 = '';
          this.name2 = '';
          this.handleSearch();
    },
     //设置推荐栏宽度
      SetHeight(){
          var list = document.querySelectorAll('.ivu-poptip-inner');
        //  list.style.width = document.querySelector('.search_org').offsetWidth + 'px';
         list.forEach(item=>{
               item.style.width = document.querySelector('.search_org').offsetWidth + 'px';
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
    
     
      getGraph(){
         var url= `/graph/person/personCoop`;
         var data={
             startYear:this.startdate,
             endYear:this.enddate,
             personId1:this.personId1,
             personId2:this.personId2
         }
         this.axios.get(url,{params:data}).then(res=>{
            //    console.log(res);
               if(res.data.code == '200'){
                     this.graphData = res.data.data;
               }
         }).catch(error=>{
               console.log(error)
         })
         
      },
     handleRouter(path){
        this.$router.push({name:path})
    },
    //确定检索
       handleSearch() {
          if(this.startdate !='' && this.enddate != '' && (this.startdate> this.enddate)){
                 this.$Modal.error({
                       title:'消息警告',
                       content:'开始时间不允许大于结束时间，请重新输入'
                 });
                return ;
           }
        
             this.getGraph();
           
    },
     
 },
 mounted(){
      window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
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
             display: flex;
            flex-direction: column;
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
                flex-grow: 1;
                margin: 10px;
                .module{
                    height: 100%;
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
                    .graph{
                        height: 80%;
                    }
                }
            }
     }
}
@media screen and (max-width: 1366px){
    .selection{
        .sc_left{
            .menu{
                p{
                   font-size:20px;
                //    margin-left: 15px;
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