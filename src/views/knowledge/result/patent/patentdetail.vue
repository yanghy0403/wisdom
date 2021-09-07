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
                                        <li  @click="handleRouter('talent')">人才查询</li>
                                    </ul>
                           
                      </div>
                      <div class="info" >
                        
                         <p>
                             <label for="">专利名:</label>
                             <span>{{intro.chineseName ?intro.chineseName :'未知'}}</span>
                         </p>
                          <p>
                             <label for="">申请日:</label>
                             <span>{{intro.applyDate ? intro.applyDate :'未知'}}</span>
                         </p>
                          <p>
                             <label for="">申请号:</label>
                             <span>{{intro.patentNo ? intro.patentNo :'未知'}}</span>
                         </p>
                          <p>
                             <label for="">公布日:</label>
                             <span>{{intro.patentNo ? intro.patentNo :'未知'}}</span>
                         </p>
                          <p>
                             <label for="">公布号:</label>
                             <span>{{intro.publishNo ? intro.publishNo:'未知'}}</span>
                         </p>
                          <p>
                             <label for="">分类号:</label>
                             <span>{{intro.publishNo ? intro.publishNo:'未知'}}</span>
                         </p>
                          <p>
                             <label for="">优先权:</label>
                             <span>{{intro.publishNo ? intro.publishNo:'未知'}}</span>
                         </p>
                          <p>
                             <label for="">法律状态:</label>
                             <span>{{intro.patentStatus?intro.patentStatus :'未知' }}</span>
                         </p>
                         <!-- <p class="line"></p> -->
                      </div>
                 
                     <div class="return" @click="handleRouter('patent')">
                            <Icon type="ios-arrow-dropleft" />
                            <span>返回列表</span>
                    </div>
               </div>
               <div class="sc_right">
                     <div class="header">
                         <span>专利详情</span>
                     </div>
                     <div class="content">
                           <div class="title">{{intro.chineseName}}</div>
                           <div class="detail">
                                 <ul>
                                     <li>
                                         <p>
                                             <label >发明人</label>
                                             <!-- <span v-for="(item,i) in intro.inventor" :key="i">{{item.personName}}</span> -->
                                             <span>
                                                  <b v-for="(item,i) in intro.inventor" :key="i" style="padding-left:5px;">{{item.personName}} ;</b>
                                             </span>
                                         </p>
                                         <p>
                                              <label >申请人</label>
                                             <span>{{intro.applicant}}</span>
                                         </p>
                                         <p>
                                              <label >申请人地址</label>
                                             <span>{{intro.address}}</span>
                                         </p>
                                         <p>
                                              <label >代理人</label>
                                             <span>{{intro.agentPerson}}</span>
                                         </p>
                                         <p>
                                              <label >代理机构</label>
                                             <span>{{intro.agentOrg}}</span>
                                         </p>
                                     </li>
                                     <li>
                                          <div class="patent_fen">
                                              <label >专利主分类号</label>
                                              <div class="patent_num">
                                                    <p v-for="(item,index) of intro.rankNo2"
                                                        :style="'margin-left:'+(index*10)+'px;'"
                                                        :key="item.rank+'qlq'"
                                                    >
                                                      
                                                        <Icon type="md-return-right" v-if="index!==0"/>
                                                        <span>{{item.rank}}</span>
                                                    </p>
                                                </div>
                                            
                                          </div>
                                          <img :src="imgUrl+'?idx='+intro.partNo+'&Ty=CNG&bg='" />
                                     </li>
                                 </ul>
                           </div>
                           <div class="introduction">
                               
                                 <ul>
                                     <li>
                                         <div>
                                               <label>摘要</label>
                                               <p>{{intro.abstractWords}}</p>
                                         </div>
                                     </li>
                                     <li>
                                          <div>
                                            <label>主权利要求</label>
                                            <p>{{intro.requirement?intro.requirement:'暂无内容'}}</p>
                                           </div>
                                     </li>
                                 </ul>
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
import filters from './filters'
import navmenu from '@/components/Navmenu'
export default {
  name:'patentdetail',
  data(){
    return {
       
        intro:{},
          isShow:true,//控制右上角的logo
          imgUrl: 'http://45.121.55.212/bns/comm/getimg.aspx',
          filterData:{},//过滤条件
          patentId:'',//专利id
          PRRIODIMG: 'http://45.121.55.212/bns/comm/getimg.aspx'//专利图片地址
    }
  },
  components:{filters,navmenu},
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
        getList(){
           var url=`/portal/es/achievement/patent/detail`;
          
           var data={
                 patentId:this.patentId
           }
         
           this.axios.get(url,{params:data}).then(res=>{

                 if(res.data.code*1 ==200){
                    
                    this.filterData = res.data.groupFilter;
                     this.intro = res.data.data.patent;
                   window.Bus.$emit('SetFilter', this.filterData);
                    console.log(this.intro)
                 }
                
           })
     },

     //返回列表
      handleRouter(path){
         this.$router.push({name:path});
      }
  },
  mounted(){
     window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
     if(this.$route.query && this.$route.query.patentId){
           this.patentId = this.$route.query.patentId;
     }
     this.getList();
  }
}
</script>

<style lang="scss" scoped>
.selection{
   display: flex;
   .sc_left{
       .info{
            margin:0 20px;
            p{
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 30px;
               overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                span{
                    color: #fff;
                     overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                label,span{
                    transform: scale(0.8);
                }
            }
            .line{
                width: 80px;
                border-top: 1px solid #939393;
                margin-top: 20px;
            }
       }
        .return{
             position: absolute;
             left:20px;
             bottom: 10px;
             display: flex;
             justify-content: flex-start;
             align-items: center;
             cursor: pointer;
             span{
                 padding-left: 10px;
                 color: #fff;
             }
             /deep/.ivu-icon{
                 font-size: 36px;
                  color: #fff;
             }
         }
   }
   .sc_right{
       width: 80%;
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
            background: url(../../../../assets/image/result/patent/bg.png) no-repeat;
           // background-size:100% 100%;
           height: 100%;
            .title{
                height: 90px;
                line-height: 90px;
                text-align: center;
                border-bottom: 1px solid #f8f8f8;
                font-size: 18px;
                font-weight: bold;
            }
            .detail{
               ul{
                   display: flex;
                   li{
                       width: 50%;
                       padding: 20px 30px;
                      >p{
                           line-height: 40px;
                           display: flex;
                           justify-content: space-between;
                           align-items: center;
                           label{
                               font-size: 14px;
                               font-weight: bolder;
                               display: inline-block;
                               width: 20%;
                           }
                           span{
                               text-align: left;
                                display: inline-block;
                               width: 80%;
                           }
                       }
                   }
                   li:last-child{
                       display: flex;
                       justify-content: flex-start;
                       align-items: flex-start;
                       p{
                           width: 50%;
                           label{
                               display: inline-block;
                               width:40%;
                           }
                           
                       }
                       img{
                           display: block;
                           width:210px;
                           height: 210px;
                       }
                   }
               }
            }
        }
        .introduction{
          
         
                 ul{
                     display: flex;
                   
                     li{
                         width: 50%;
                         padding: 20px 30px;
                        >div{
                             display: flex;
                             overflow: hidden;
                              label{
                                width: 20%;
                                font-size: 14px;
                                font-weight: bolder;
                             }
                             p{
                                 width: 80%;
                                 line-height: 30px;
                                 text-indent: 2em;
                             }
                        }
                     }
                     
                 }
           
        }
        .patent_fen{
            width: 50%;
            display: flex;
            >label{
                width: 35%;
                 line-height: 40px;
            }
            .patent_num{
               p{
                       display: flex;
                      align-items: center;
                        line-height: 40px;
                      i{
                          padding-right: 5px;
                      }
               }
            }
        }
    }
}
</style>