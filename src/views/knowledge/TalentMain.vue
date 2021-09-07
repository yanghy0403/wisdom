<template>
    <div class="home">
         <div class="selection">
             <div class="sc_left">
                 <div class="menu">
                      <p>人才查询</p>
                      <ul>
                       <li @click="handleRouter('org')">机构查询</li>
                       <li>|</li>
                       <!-- <li>领域查询</li>
                       <li>|</li> -->
                      <li @click="handleRouter('results')">成果查询</li>
                     </ul>
                 </div>
                <div class="sc_search">
                      <input placeholder="请输入姓名" class="name" v-model="query_EQ_chineseName"/>
                      <input placeholder="请输入研究机构" class="org" v-model="query_EQ_workExperienceOrgName"/>
                      <input placeholder="请输入研究方向" class="direction" v-model="query_EQ_researchAreaResearch_area"/>
                </div>
                <div class="sc_select">
                      <p>
                           <!-- <span>人才类型:</span> -->
                            <Select v-model="query_EQ_outstandingName" clearable placeholder="请选择人才类型">
                                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                      </p>
                      <p>
                           <!-- <span>领域类型:</span> -->
                            <Select v-model="major" clearable placeholder="请选择领域类型">
                                <Option v-for="item in majordata" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                      </p>
                </div>
                <div class="button">
                      <button @click="handleSearch">查询</button>
                       <Icon type="md-refresh" @click="handlereset"/>
                </div>
                <div class="filter" v-if="filterData">
                      <div class="type" v-if="filterData.name &&filterData.name.length>0">
                          <ol>
                              <li>
                                    <img src="../../assets/image/knowledge/person/personlist/person.png" alt="">
                              </li>
                              <li class="submenu">
                                   <div v-for="(item,i) in filterData.name" :key="i" @click="handleSetMajor(item)">
                                       <p>{{item.name}}</p>
                                       <span>{{item.value.toLocaleString()}}</span>
                                   </div>
                              </li>
                             
                          </ol>
                      </div>
                      <div class="org" v-if="filterData.organizationName &&filterData.organizationName.length>0">
                             <ol>
                              <li>
                                    <img src="../../assets/image/knowledge/person/personlist/org.png" alt="">
                              </li>
                              <li class="submenu">
                                   <div v-for="(item,i) in filterData.organizationName" :key="i" @click="handleSetOrg(item)">
                                       <p>{{item.name}}</p>
                                       <span>{{item.value.toLocaleString()}}</span>
                                   </div>
                              </li>
                              
                          </ol>
                      </div>
                      <div class="place" v-if="filterData.organizationProvince&&filterData.organizationProvince.length>0">
                            <ol>
                              <li>
                                    <img src="../../assets/image/knowledge/person/personlist/place.png" alt="">
                              </li>
                              <li class="submenu">
                                 
                                         <div v-for="(item,i) in filterData.organizationProvince" :key="i" @click="handleSetPrice(item)">
                                            <p>{{item.name}}</p>
                                            <span>{{item.value.toLocaleString()}}</span>
                                        </div>
                                   
                              </li>
                            
                          </ol>
                      </div>
                </div>
              </div>
             <div class="sc_right">
                   <div class="header">
                          <span>检索到{{total.toLocaleString()}}人</span>
                          <!-- <img src="../../assets/image/index/01/menu2.png" alt="" @click="handleClick" v-if="isShow"> -->
                   </div>
                   <talent-list :personData="personData"></talent-list>
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
    </div>
</template>

<script>
import navmenu from '@/components/Navmenu'
import talentList from './Talent/talentList'
export default {
  name:'talent',
  data(){
      return{
        
         typeList:[],
         major:'',//选中的领域
         majordata:[],//领域数据
         isShow:true,//控制右上角的logo
         query_EQ_chineseName: "", //姓名
        query_EQ_workExperienceOrgName: "", //研究机构
        query_EQ_outstandingName: "", //人才类型
        query_EQ_researchAreaResearch_area: "", //研究方向
         page:1,
         limit:8,
         total:0,//总条数
         personData:[],//检索的数据
         filterData:[],
         group_EQ_workExperienceProvince:'',//省份
         history:[],//历史数据
      }
  },
  components:{navmenu,talentList},
  methods:{

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
           var url = `/portal/es/person/`;
           var data={
                offset:this.page-1,
                limit:this.limit 
           }
         
          if(this.query_EQ_chineseName){
                data.query_TERM_chineseName = this.query_EQ_chineseName;
                 this.history.push({
                    name: this.query_EQ_chineseName,
                    type: "姓名"
                });
          }
          if(this.query_EQ_workExperienceOrgName){
              data["query_EQ_workExperience.orgName"] = this.query_EQ_workExperienceOrgName;
               this.history.push({
                    name: this.query_EQ_workExperienceOrgName,
                    type: "研究机构"
                });
          }
           if(this.query_EQ_outstandingName){
                data["query_EQ_outstanding.name"] = this.query_EQ_outstandingName;
                 this.history.push({
                    name: this.query_EQ_outstandingName,
                    type: "人才类型"
                });
          }
          if(this.query_EQ_researchAreaResearch_area){
              data["query_EQ_researchArea.research_area"] = this.query_EQ_researchAreaResearch_area;
               this.history.push({
                    name: this.query_EQ_researchAreaResearch_area,
                    type: "研究方向"
                });
          }
        if(this.major){
            data["query_EQ_major"] = this.major;
             this.history.push({
                    name: this.major,
                    type: "研究领域"
                });
        }
           if (this.query_EQ_workExperienceOrgName) {
                data[
                "query_EQ_workExperience.orgName"
                ] = this.query_EQ_workExperienceOrgName;
                 this.history.push({
                    name: this.query_EQ_workExperienceOrgName,
                    type: "研究机构"
                });
            }
            if (this.group_EQ_workExperienceProvince) {
                data[
                "query_EQ_workExperience.province"
                ] = this.group_EQ_workExperienceProvince;
                 this.history.push({
                    name: this.group_EQ_workExperienceProvince,
                    type: "省份"
                });
            }
          
          this.axios.get(url,{params:data}).then(res=>{
            //    console.log(res)
                if(res.data.code ==200){
                    this.personData =res.data.data.content;
                    this.total = res.data.count*1;
                    this.filterData =res.data.groupFilter;
                }
          })
      },
      //重置
      handlereset(){
         this.query_EQ_chineseName = '';
         this.query_EQ_workExperienceOrgName = '';
         this.query_EQ_outstandingName = "";
         this.query_EQ_researchAreaResearch_area ="";
         this.group_EQ_workExperienceProvince="";
         this.major = '';
         this.handleSearch();
      },
      //设置列表高度
      SetHeight(){
        //   var list = document.querySelector('.list');
        //   list.style.height = document.querySelector('.sc_right').offsetHeight - document.querySelector('.header').offsetHeight -document.querySelector('.page').offsetHeight + 'px';
          var select_dropdown = document.querySelectorAll('.ivu-select-dropdown');
         
          select_dropdown.forEach(item=>{
                item.style.width = document.querySelector('.ivu-select-single').offsetWidth + 'px';
                item.style['overflow-x'] ='hidden';
          })
     
      },
      //查询人才类型
      SearchPersonType(){
           var url =`/portal/es/person/personType`;
           this.axios.get(url).then(res=>{

               if(res.data.code*1 ==200){
                   this.typeList = res.data.data.map(item=>{
                       return {
                            value:item,
                            label:item
                       }
                   })
               }
           })
      },
      //查询领域类型
      Searchfiled(){
           var url =`/portal/es/org/major`;
           this.axios.get(url).then(res=>{
            //   console.log(res)
               if(res.data.code*1 ==200){
                   this.majordata = res.data.data.map(item=>{
                       return {
                            value:item,
                            label:item
                       }
                   })
                 
               }
           })
      },
      //跳转不同的导航
      handleRouter(path){
           this.$router.push({name:path});
        },
       //页数
     handleSize(num){
          this.limit = num;
        this.handleSearch()
     },
     //页码
     handlePage(num){
         this.page = num;
         this.handleSearch()
     },
     //设置领域
     handleSetMajor(item){
          this.query_EQ_outstandingName = item.name;
          this.handleSearch();
     },
     //设置机构
     handleSetOrg(item){
        this.query_EQ_workExperienceOrgName = item.name;
        this.handleSearch();
     },
     //设置省份
     
     handleSetPrice(item){
        this.group_EQ_workExperienceProvince = item.name;
        this.handleSearch();
     }
  },
  mounted(){
         window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
         this.handleSearch();
         this.SetHeight();
         this.SearchPersonType();
         this.Searchfiled();
         window.resize=function(){
             window.reload();
         }
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
              // margin-left: 10%;
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
           // border:1px solid #3b3b3b;
            border-radius: 5px;
            margin-top: 30px;
            overflow: hidden;
            flex-direction: column;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .type,.org,.place{
                 border:1px solid #3b3b3b;
                width:100%;
                height: 140px;
               }
             ol{
                     height:100%;
                    display: flex;
                    padding: 12px;
                   
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
                        overflow-y: auto;
                        div{
                            line-height: 26px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                            font-size: 10px;
                            p{
                                   width: 90%;
                                    height: 26px;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                            }
                            span{
                                margin-right: 12px;
                            }
                        }
                    
                    }
                   
                  
                }
           
        }
     }
     .sc_right{
         width:80%;
          background: #f8f8f8;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
         .header{
             display: flex;
             justify-content: space-between;
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
                 width:20px;
                 height:20px;
                 margin-right: 30px;;
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
            // width: 25%;
            .menu{
                p{
                   font-size:22px;
               
                }
                ul{
                    margin-left: 0;
                    li{
                       padding: 0 2px;
                       font-size: 6px;
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
           .button{
               margin-top: 0;
           }
           .filter{
               margin-top: 10px;
           }
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
