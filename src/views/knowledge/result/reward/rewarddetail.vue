<template>
    <div class="home">
         <div class="selection">
               <div class="sc_left">
                      <div class="menu">
                            <div class="nav_menu">
                                    <p>成果查询</p>
                                    <ul>
                                        <li @click="handleRouter('org')">机构查询</li>
                                        <li>|</li>
                                        <!-- <li>领域查询</li>
                                        <li>|</li> -->
                                        <li  @click="handleRouter('talent')">人才查询</li>
                                    </ul>
                            </div>
                      </div>
                      <div class="info" v-if="info.length>0">
                         <div v-for="(item,i) in info" :key="i">
                             <label for="">{{item.name}}</label>
                             <p v-if="item.name=='作者'">
                                 <span v-for="(each,i) in item.value" :key="i">{{each}}</span>
                             </p>
                             <span v-else>{{item.value}}</span>
                         </div>
                         <!-- <p class="line"></p> -->
                      </div>
                   
                     <div class="return" @click="handleRouter('reward')">
                            <Icon type="ios-arrow-dropleft" />
                            <span>返回列表</span>
                    </div>
               </div>
               <div class="sc_right">
                     <div class="header">
                         <span>论文详情</span>
                     </div>
                     <div class="content">
                           <div class="title">
                               <h3>{{intro.title}}</h3>
                               <p>{{intro.subtitle}}</p>
                           </div>
                           <div class="detail">
                                 <h3>摘要</h3>
                                 <p class="intro">{{intro.Abstract}}</p>
                                 <p class="date">发表时间:{{intro.applydate}}</p>
                                 <p class="tag">
                                     <span v-for="(item,i) in intro.tag" :key="i">{{item}}</span>
                                 </p>
                           </div>
                           <div class="introduction">
                               <div class="head">
                                   <ul>
                                       <li :class="navindex ==0?'active':''" @click="handleNav(0)">参考文献</li>
                                       <li>|</li>
                                       <li :class="navindex ==1?'active':''" @click="handleNav(1)">被引用</li>
                                        <li>|</li>
                                       <li :class="navindex ==2?'active':''" @click="handleNav(2)">相关论文</li>
                                   </ul>
                                   <span>检索到{{total}}条信息</span>
                               </div>
                                <div class="paper">
                                     <div class="every" v-for="(item,i) in paperData" :key="i">
                                           <h3>{{item.title}}({{item.applydate}})</h3>
                                           <p>{{item.subtitle}}</p>
                                           <p class="tag">
                                               <span v-for="(item,i) in item.tag" :key="i">{{item}}</span>
                                           </p>
                                            <p class="intro">{{intro.Abstract}}</p>
                                     </div>
                                </div>
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

import navmenu from '@/components/Navmenu'
export default {
  name:'rewarddetail',
  data(){
    return {
        info:[
            {
                name:'篇名',
               value:'Heart visease ana troe statiscsa afdsf 4egerbrtnn'
            },
            {
                name:'刊名',
               value:'Circulation'
            },
            {
                name:'发表时间',
               value:'2009'
            },
            {
                name:'知网被引',
               value:'108349'
            },
            {
                name:'作者',
               value:['fasdfsdfw ','iregegnjfdsw','asdfjfb3wgf']
            }
           
        ],
        intro:{
            title:'heart visease ana troe Statisticsa2009 Update A Report From the American Heart Association StaTIStics-Committee',
            subtitle:'foiwefeqwffdsgf klfsaf g3tg ojjfdsaf hq24 ojdsf qwfdsfdas f3f',
            Abstract:'Background:  The majority of the transgender female population in South Florida are Latina and Black, and are at greatest risk for acquiring HIV, yet there is limited research focused on South Florida transgender women of color. The study objective was to describe the disparities among racial/ethnic minority transgender women regarding HIV screening, pre exposure prophylaxis (PrEP) knowledge and PrEP utilization.Methods: Sixty transgender women, recruited from South Florida community-based organizations, completed a questionnaire on HIV prevention and PrEP awareness and use. Univariate statistics were generated to describe sexual risk behavior, PrEP awareness and use, and HIV screening by race/ethnicity.',
            applydate:'2019-01-19',
            tag:['Stroke','Correlation and dependece','Health care'],

        },
          isShow:true,//控制右上角的logo
          imgUrl: 'http://45.121.55.212/bns/comm/getimg.aspx',
          filterData:{},//过滤条件
          total:100,
          page:1,
          limit:5,
          paperData:[
              {
                  title:'heart visease ana troe Statisticsa2009 Update A Report From the American Heart Association StaTIStics-Committee',
                  subtitle:'foiwefeqwffdsgf klfsaf g3tg ojjfdsaf hq24 ojdsf qwfdsfdas f3f',
                  tag:['Stroke','Correlation and dependece','Health care'],
                  applydate:'2019-01-19',
                  Abstract:'Background:  The majority of the transgender female population in South Florida are Latina and Black, and are at greatest risk for acquiring HIV, yet there is limited research focused on South Florida transgender women of color. The study objective was to describe the disparities among racial/ethnic minority transgender women regarding HIV screening, pre exposure prophylaxis (PrEP) knowledge and PrEP utilization.Methods: Sixty transgender women, recruited from South Florida community-based organizations, completed a questionnaire on HIV prevention and PrEP awareness and use. Univariate statistics were generated to describe sexual risk behavior, PrEP awareness and use, and HIV screening by race/ethnicity.'
              },
               {
                  title:'heart visease ana troe Statisticsa2009 Update A Report From the American Heart Association StaTIStics-Committee',
                  subtitle:'foiwefeqwffdsgf klfsaf g3tg ojjfdsaf hq24 ojdsf qwfdsfdas f3f',
                  tag:['Stroke','Correlation and dependece','Health care'],
                   applydate:'2019-01-19',
                  Abstract:'Background:  The majority of the transgender female population in South Florida are Latina and Black, and are at greatest risk for acquiring HIV, yet there is limited research focused on South Florida transgender women of color. The study objective was to describe the disparities among racial/ethnic minority transgender women regarding HIV screening, pre exposure prophylaxis (PrEP) knowledge and PrEP utilization.Methods: Sixty transgender women, recruited from South Florida community-based organizations, completed a questionnaire on HIV prevention and PrEP awareness and use. Univariate statistics were generated to describe sexual risk behavior, PrEP awareness and use, and HIV screening by race/ethnicity.'
              },
               {
                  title:'heart visease ana troe Statisticsa2009 Update A Report From the American Heart Association StaTIStics-Committee',
                  subtitle:'foiwefeqwffdsgf klfsaf g3tg ojjfdsaf hq24 ojdsf qwfdsfdas f3f',
                  tag:['Stroke','Correlation and dependece','Health care'],
                   applydate:'2019-01-19',
                  Abstract:'Background:  The majority of the transgender female population in South Florida are Latina and Black, and are at greatest risk for acquiring HIV, yet there is limited research focused on South Florida transgender women of color. The study objective was to describe the disparities among racial/ethnic minority transgender women regarding HIV screening, pre exposure prophylaxis (PrEP) knowledge and PrEP utilization.Methods: Sixty transgender women, recruited from South Florida community-based organizations, completed a questionnaire on HIV prevention and PrEP awareness and use. Univariate statistics were generated to describe sexual risk behavior, PrEP awareness and use, and HIV screening by race/ethnicity.'
              },
               {
                  title:'heart visease ana troe Statisticsa2009 Update A Report From the American Heart Association StaTIStics-Committee',
                  subtitle:'foiwefeqwffdsgf klfsaf g3tg ojjfdsaf hq24 ojdsf qwfdsfdas f3f',
                  tag:['Stroke','Correlation and dependece','Health care'],
                   applydate:'2019-01-19',
                  Abstract:'Background:  The majority of the transgender female population in South Florida are Latina and Black, and are at greatest risk for acquiring HIV, yet there is limited research focused on South Florida transgender women of color. The study objective was to describe the disparities among racial/ethnic minority transgender women regarding HIV screening, pre exposure prophylaxis (PrEP) knowledge and PrEP utilization.Methods: Sixty transgender women, recruited from South Florida community-based organizations, completed a questionnaire on HIV prevention and PrEP awareness and use. Univariate statistics were generated to describe sexual risk behavior, PrEP awareness and use, and HIV screening by race/ethnicity.'
              }, 
              {
                  title:'heart visease ana troe Statisticsa2009 Update A Report From the American Heart Association StaTIStics-Committee',
                  subtitle:'foiwefeqwffdsgf klfsaf g3tg ojjfdsaf hq24 ojdsf qwfdsfdas f3f',
                  tag:['Stroke','Correlation and dependece','Health care'],
                   applydate:'2019-01-19',
                  Abstract:'Background:  The majority of the transgender female population in South Florida are Latina and Black, and are at greatest risk for acquiring HIV, yet there is limited research focused on South Florida transgender women of color. The study objective was to describe the disparities among racial/ethnic minority transgender women regarding HIV screening, pre exposure prophylaxis (PrEP) knowledge and PrEP utilization.Methods: Sixty transgender women, recruited from South Florida community-based organizations, completed a questionnaire on HIV prevention and PrEP awareness and use. Univariate statistics were generated to describe sexual risk behavior, PrEP awareness and use, and HIV screening by race/ethnicity.'
              }
          ],
          navindex:0,//默认选中参考文献

    }
  },
  components:{navmenu},
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
           var url=`/portal/es/achievement/patentQuery`;
          
           var data={
                 offset:0,
                 limit:8,
                 sort_sortBy:'citation'
           }
         
           this.axios.get(url,{params:data}).then(res=>{
                 //console.log(res);
                 if(res.data.code*1 ==200){
                    
                    this.filterData = res.data.groupFilter;
                    console.log(this.filterData);
                  }
                
           })
     },

     //返回列表
      handleRouter(path){
         this.$router.push({name:path});
      },
      handleNav(num){
          this.navindex = num;
      },
        handleSize(num){
          this.limit =num;
          this.getList();
      },
      handlePage(num){
          this.page =num;
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
       .info{
            margin:0 20px;
            >div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 30px;
              
               span{
                    color: #fff;
                    display: block;
                    text-align: right;
                  
                }
                >span{
                     width:50%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
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
             }
             /deep/.ivu-icon{
                 font-size: 36px;
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
               height: 50%;
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
                        width:70%;
                        padding: 0 10px;
                         overflow: auto;
                         height: 80%;
                          margin-top: 5%;
                         
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
          
            .title{
                height: 90px;
                text-align: center;
                border-bottom: 1px solid #f8f8f8;
               width: 100%;
              
                h3{
                     font-weight: bold;
                    font-size: 18px;
                    line-height: 40px;
                    margin-top: 30px;
                }
            }
            .detail{
               margin: 20px 30px;
               padding-bottom: 40px;
               border-bottom:1px solid #f8f8f8;
               h3{
                  color: #000;
                  font-weight: bolder;
                  font-size: 16px;
               }
               .intro{
                   text-indent:2em;
                   line-height: 26px;
               }
               .date{
                   margin: 20px 0;
               }
               .tag{
                   span{
                       display: inline-block;
                       padding:5px 8px;
                       background:#e8e8e8 ;
                       margin-right: 10px;
                   }
               }
            }
        }
        .introduction{
            margin: 0 30px;
           .head{
               display: flex;
               justify-content: space-between;
               align-items: center;
               font-weight: bold;
               ul{
                   display: flex;
                   li{
                       margin: 0 3px;
                       font-size: 16px;
                       cursor: pointer;
                   }
                   li.active{
                       color:#ffd63a;
                       text-decoration: underline;
                   }
               }
           }
           .paper{
               .every{
                   h3{
                       font-size: 16px;
                       font-weight: bold;
                       line-height: 30px;
                   }
                    .tag{
                         margin: 15px 0;
                        span{
                            display: inline-block;
                            padding:5px 8px;
                            background:#e8e8e8 ;
                          
                            margin-right: 10px;
                        }
                    }
                    .intro{
                        text-indent:2em;
                        line-height: 26px;
                         overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        margin-bottom: 20px;
                    }
               }
           }
           
        }
         .foot{
            height:60px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
}
</style>