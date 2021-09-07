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
                                <li>领域查询</li>
                                <li>|</li>
                                <li @click="handleRouter('talent')">人才查询</li>
                            </ul>
                      </div>
                 </div>
                 <div class="info">
                      <ul>
                          <li>
                               <img src="../../../../assets/image/result/journal/journal.jpg" alt="">
                          </li>
                          <li>
                              <p>
                                  <label for="">复合影响因子:</label>
                                  <span>{{journal.complexImpact}}</span>
                              </p>
                              <p>
                                   <label for="">综合影响因子:</label>
                                  <span>{{journal.fullImpact}}</span>
                              </p>
                              <p>
                                    <label for="">被以下数据库收录:</label>
                              </p>
                              <p>
                                 
                                  <span v-for="(item,i) in journal.reference" :key="i">{{item}}</span>
                              </p>
                              <p>
                                 <label for="">核心期刊:</label>
                                  <span>{{journal.recordJournal}}</span>
                              </p>
                              <p>
                                  <label for="">获得以下荣誉:</label>
                                  <span>{{journal.honor}}</span>
                              </p>
                              <p>
                                  <label for="">被引数:</label>
                                  <span>{{journal.citation}}</span>
                              </p>
                              <p>
                                    <label for="">文献数量:</label>
                                  <span>{{journal.literature}}</span>
                              </p>
                          </li>
                      </ul>
                      <div class="about">
                           <h2>{{journal.title}}</h2>
                           <p class="org">主办单位: {{journal.org}}</p>
                           <p class="line"></p>
                           <p>
                               <label for="">
                               曾用刊名</label>：{{journal.oldtitle}}</p>
                           <p><label for="">学科</label>：{{journal.discipline}}</p>
                           <p><label for="">专题</label>：{{journal.project}}</p>
                           <p class="line"></p>
                           <ul>
                               <li>
                                    <p><label for="">出版周期</label>：{{journal.publishedDate}}</p>
                                    <p><label for="">ISSN</label>: {{journal.issn}}</p>
                                    <p><label for="">出版地</label>: {{journal.place}}</p>
                                    <p><label for="">开本</label>: {{journal.format}}</p>
                               </li>
                               <li>
                                    <p><label for="">创刊时间</label>：{{journal.found}}</p>
                                    <p><label for="">C N</label>: {{journal.cn}}</p>
                                    <p><label for="">语种</label>: {{journal.language}}</p>
                                    <p><label for="">邮发代号</label>: {{journal.code}}</p>
                               </li>
                           </ul>
                      </div>
                 </div>
                 <div class="date">
                      <ul>
                          <li>
                             <img src="../../../../assets/image/result/journal/year.png" alt="">
                          </li>
                          <li>
                               <p v-for="(item,i) in date" :key="i">
                                   <span>{{item.year}}</span>
                                   <span>{{item.value}}</span>
                               </p>
                          </li>
                      </ul>
                 </div>
                  <div class="return" @click="handleRouter('journal')">
                            <Icon type="ios-arrow-dropleft" />
                            <span>返回列表</span>
                    </div>
             </div>
             <div class="sc_right">
                   <div class="header">
                         <div class="input">
                             <Select v-model="condition" placeholder="请选择查询条件">
                                <Option v-for="item in conditionData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Input placeholder="请输入关键词" suffix="ios-search"/>
                         </div>
                          <img src="../../../../assets/image/index/01/menu2.png" alt="" @click="handleClick" v-if="isShow" class="menulogo">
                   </div>
                     <div class="top">
                                <span>检索到 {{total}}条结果</span>
                               <div>
                                    <ol>
                                        <li @click="handleSelect(0)" :class="logoindex ==0? 'active':''">1期</li>
                                        <li @click="handleSelect(1)" :class="logoindex ==1? 'active':''">2期</li>
                                        <li @click="handleSelect(2)" :class="logoindex ==2? 'active':''">3期</li>
                                        <li @click="handleSelect(3)" :class="logoindex ==3? 'active':''">4期</li>
                                        <li @click="handleSelect(4)" :class="logoindex ==4? 'active':''">5期</li>
                                        <li @click="handleSelect(5)" :class="logoindex ==5? 'active':''">6期</li>
                                        <li @click="handleSelect(6)" :class="logoindex ==6? 'active':''">7期</li>
                                        <li @click="handleSelect(7)" :class="logoindex ==7? 'active':''">8期</li>
                                    </ol>
                                     <ul>
                                        <li>
                                                <p >排序方式:</p>
                                                <Select v-model="sort">
                                                    <Option v-for="item in sortData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                            </li>
                                      </ul>
                               </div>
                    </div>
                    <div class="List">
                          <Table :columns="columns" :data="list"></Table>
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
                 <navmenu></navmenu>
        </div>
    </div>
</template>

<script>

import navmenu from '@/components/Navmenu'
export default {
 name:'journaldetail',
 data(){
    return{
        journal:{
             title:'中国法学',
            record:'核心',
            org:'中国法学会',
            complexImpact:'7.04',
            fullImpact:'12.5',
            citation:2689,
            reference:['数据库1','数据库2'],
            recordJournal:'无',
            honor:'无',
            literature:12,
            oldtitle:'中国法学',
            discipline:'社会科学I',
            project:'政治军事法律综合',
            publishedDate:'1003-1707',
            found:'1996',
            issn:'1707',
            cn:'11-1030',
            place:'北京',
            language:'汉语',
            format:'16开',
            code:'82-334'

        },
        date:[
            {
                year:2019,
                value:89
            },
             {
                year:2019,
                value:89
            },
             {
                year:2019,
                value:89
            }
        ],
        conditionData:[],//条件
        condition:'',//选中的条件
         isShow:true,//控制右上角的logo
         total:1000,
         page:0,
         limit:12,
          sort:"fullImpact",//排序方式
         sortData:[
              {
                value:'fullImpact',
                label:'综合影响因子'
             },
             {
                value:'complexImpact',
                label:'复合影响因子'
             },
              {
                value:'citation',
                label:'被引次数'
             }
         ],
         list:[
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             },
             {
                 title:'第二届全国民事诉讼学术研讨会总数',
                 author:'杜睿哲',
                 date:'1999',
                 page:'未知',
                 number:0
             }
         ],
         columns:[
             {
                 title:'篇名',
                 key:'title'
             },
             {
                 title:'作者',
                 key:'author',
                 width:200
             },
              {
                 title:'发表时间',
                 key:'date',
                  width:200
             },
             {
                 title:'页码范围',
                 key:'page',
                 width:150
             },
             {
                 title:'被引数',
                 key:'number',
                 width:150
             }
         ],
         logoindex:-1,//期数下标

    }
 },
 components:{navmenu},
 methods:{
      //关闭导航栏
       closeMenu(data){
           this.isShow = data;
      },
       //点击打开导航栏
      handleClick(){
            this.isShow =false;
           window.Bus.$emit('openMenu',true);
      },
      //路由跳转
      handleRouter(path){
            this.$router.push({name:path});
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
     //获取数据
     getList(){

     },
     //选择期数
     handleSelect(num){
         this.logoindex = num;
     }

 },
 mounted(){
      window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
 }
}
</script>

<style lang="scss" scoped>
 .selection{
     display: flex;
     .sc_left{
         .info{
             margin:0 30px;
             >ul{
                 display: flex;
                 li{
                     width: 50%;
                    
                 }
                 li:first-child{
                     img{
                         display: block;
                         width:160px;
                         height: 210px;
                     }
                 }
                 li:last-child{
                     margin: 20px;
                     margin-right: 0;
                     p{
                         display: flex;
                         justify-content: space-between;
                         align-items: center;
                         line-height:24px;
                         span{
                             color: #fff;
                         }
                     }
                 }
             }
             .about{
                 h2{
                     font-size: 18px;
                     font-weight: bold;
                     color: #feba00;
                    margin-top: 10px;
                 }
                 .org{
                      color: #feba00;
                 }
                 .line{
                    width:50px;
                    border-top: 1px solid #535353;
                    margin: 10px 0;
                 }
                 p{
                     line-height: 26px;
                     label{
                         display: inline-block;
                         width: 50px;
                     }
                 }
                 ul{
                     display: flex;
                     li{
                         width: 50%;

                     }
                 }
             }
         }
         .date{
             margin: 0 30px;
             border: 1px solid #535353;
             border-radius:5px ;
             margin-top: 40px;
             ul{
                 display: flex;
                 padding: 20px;
                padding-left: 0;
                 li:first-child{
                     width:30%;
                     display:flex;
                     justify-content: center;
                     align-items: center;
                     img{
                         display: block;
                         width: 26px;
                         height: 23px;
                     }
                 }
                 li:last-child{
                     width:70%;
                     p{
                         display: flex;
                         justify-content: space-between;
                         align-items: center;
                     }
                 }
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
         background: #f8f8f8;
         .header{
             height: 90px;
             background:url(../../../../assets/image/result/journal/banner.png) no-repeat;
             background-size: 100% 100%;
             display: flex;
             justify-content: center;
             align-items: center;
             .input{
                 width: 400px;
                 height: 40px;
                  border:2px solid #7f7f7f;
                 display: flex;
                 overflow: hidden;
                 box-sizing: border-box;
                 border-radius: 20px;
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
                >div{
                    display: flex;
                }
                ol{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    li{
                        margin-left: 10px;
                         cursor: pointer;
                    }
                    li.active{
                         color: #fec400;
                    }
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
         .foot{
            height:60px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
     }
 }
 @media (min-width:1028px) and (max-width:1366px) {
     .selection{
         .sc_left{
             width:25%;
             .nav_menu{
                  p{
                      font-size: 32px;
                  }
             }
            .info{
                 .about{
                    p{
                        line-height: 22px;
                        label{
                            width:90px;
                        }
                    }
                }
                .date{
                    margin-top: 10px;
                }
            }
         }
         .sc_right{
            width: 75%;
         }
     }
 }
</style>