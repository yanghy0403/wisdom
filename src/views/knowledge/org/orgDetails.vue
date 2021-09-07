<template>
      <div class="home">
         <div class="selection">
               <div class="sc_left">
                      <div class="menu">
                            <p>机构查询</p>
                            <ul>
                                <li @click="handleRouter('talent')">人才查询</li>
                                <li>|</li>
                                 <!-- <li>领域查询</li>
                                 <li>|</li> -->
                                <li @click="handleRouter('results')">成果查询</li>
                            </ul>
                        </div>
                        <div class="info">
                              <img src="../../../assets/image/knowledge/org/2.png" alt="" class="img">
                            <div class="analyze">
                                  <ol>
                                    <li>
                                            <ul>
                                                <!-- <li>
                                                    <p>{{orgData.influenceScore ? orgData.influenceScore:0}}</p>
                                                    <p>影响力</p>
                                                </li> -->
                                                <!-- <li class="line"></li> -->
                                                <li>
                                                    <p>{{orgData.staticPaper ? orgData.staticPaper : 0}}</p>
                                                    <p>论文</p>
                                                </li>
                                                <!-- <li class="line"></li> -->
                                                <li>
                                                    <p>{{orgData.rewardTotalNum ? orgData.rewardTotalNum:0}}</p>
                                                    <p>奖励</p>
                                                </li>
                                            </ul>
                                    </li>
                                    <li>
                                        <ul>
                                                <li>
                                                    <p>{{orgData.staticPatent ? orgData.staticPatent : 0}}</p>
                                                    <p>专利</p>
                                                </li>
                                                <!-- <li>
                                                    <p>0</p>
                                                    <p>专著</p>
                                                </li> -->
                                                <li>
                                                    <p>{{orgData.staticProject ? orgData.staticProject :0}}</p>
                                                    <p>项目</p>
                                                </li>
                                            </ul>
                                    </li>
                                 </ol>
                                 <div class="leida"></div>
                            </div>
                        </div>
                        <div class="introduce">
                             <p class="name">{{orgData.cnName?orgData.cnName:'暂无机构名'}}</p>
                             <!-- <p class="title" v-for="item in orgData.outstanding" :key="item.orgId">
                                  <span class="ch">{{item.cnName?item.cnName:'暂无人才类型'}}</span>
                             </p> -->
                              <label for=""></label>
                             <!-- <p>{{orgData.type?orgData.type:'未知'}}</p> -->
                             <p>{{orgData.address?orgData.address:'暂无地址信息'}}</p>
                             <label for=""></label>
                             <p>研究方向:</p>
                             <p>
                                  <span v-for="(item,i) in orgData.majors" :key="i" style="padding-right:5px;">{{item.major}} ;</span>
                             </p>
                        </div>
                        <div class="return" @click="handleReturn">
                              <Icon type="ios-arrow-dropleft" />
                              <span>返回列表</span>
                        </div>
               </div>
               <div class="sc_right">
                    <div class="search">
                           <div class="input">
                                <p>机构合作网络挖掘</p>
                                <!-- <Input suffix="ios-search" placeholder="请输入姓名" /> -->
                                 <div class="ivu-input-wrapper">
                                    <input
                                        type="text"
                                        @focus="handleFocus"
                                      
                                        v-model="query_EQ_chineseName"
                                        placeholder="请输入关键词..."
                                        @keyup.enter="handleQueryTip"
                                    />
                                    <span class="ivu-input-suffix" @click="handleQueryTip">
                                        <Icon type="ios-search" />
                                    </span>
                                    
                                    <div class="ivu-poptip-popper" v-if="tipIsShow">
                                        <div class="ivu-poptip-inner scrollbar">
                                        <ul v-if="contentData.length===0">
                                            <li class="ivu-poptip-body">暂无匹配数据</li>
                                        </ul>
                                        <ul v-else>
                                            <li
                                            class="ivu-poptip-body"
                                            v-for="item in contentData"
                                            @click="handleClickQuery(item)"
                                            :key="item.cnName"
                                            >
                                            <span class="ivu-poptip-body-content-inner">{{item.cnName}}</span>
                                            </li>
                                        </ul>
                                        </div>
                                    </div>
                                    </div>
                           </div>
                          <!-- <img src="../../../assets/image/index/01/menu2.png" alt="" @click="handleClick" v-if="isShow" class="menus"> -->
                    </div>
                    <div class="content">

                        <div class="content_menu">
                              <div class="crew">
                                   <div class="network">
                                       <h2>
                                             <p>
                                                <label></label>
                                                <span>机构关联网络</span>
                                             </p>
                                           <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt="" @click="handleOpen('relevance')">
                                       </h2>
                                       <div class="relevance">
                                               <Relation :data="relationship" :coefficient="coefficient"/>
                                       </div>
                                       
                                   </div>
                                   <div class="network">
                                         <h2>
                                         
                                            <p>
                                                <label></label>
                                                  <span>机构内人才研究方向</span>
                                             </p>
                                           <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt="" @click="handleOpen('relation')">
                                       </h2>
                                       <div class="relation" >
                                              <cluster :zoom="0.3" :data="researchData"></cluster>
                                       </div>
                                   </div>
                              </div>
                              <div class="crew">
                                    <div class="network" style="width:100%;">
                                           <h2>
                                                 <p>
                                                    <label></label>
                                                    <span>历年研究方向</span>
                                                </p>
                                             
                                                <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt="" @click="handleOpen('atlas')">
                                            </h2>
                                            <div class="atlas" >
                                                   <ResearchDirection :Pastresearchdata="Pastresearchdata"/>
                                            </div>
                                    </div>
                                   <!-- <div class="network">
                                             <h2>
                                                <p>
                                                    <label></label>
                                                    <span>人才流动</span>
                                                </p>
                                               
                                                <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt="" @click="handleOpen('removal')">
                                            </h2>
                                            <div class="removal">
                                                 <MapMigrate />
                                            </div>
                                   </div> -->
                              </div>
                        </div>
                        <div class="content_view">
                            <div class="network">
                                   <h2>
                                        <p>
                                            <label></label>
                                            <span>学术成果图谱</span>
                                        </p>
                                        
                                        <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt="" @click="handleOpen('achievement')">
                                    </h2>
                                <div id="achievement" >
                                        <River :data="achievementsContent" />
                                </div>
                            </div>
                            <!-- <div class="network">
                                  <h2>
                                        <p>
                                            <label></label>
                                            <span>机构与学会关系网络</span>
                                        </p>
                                        
                                        <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt=""  @click="handleOpen('direction')">
                                    </h2>
                                <div id="direction">
                                      <orglearnrls :zoom="0.5"></orglearnrls>
                                </div>
                            </div> -->
                             <div class="network">
                                  <h2>
                                        <p>
                                            <label></label>
                                            <span>人员组成统计</span>
                                        </p>
                                        
                                        <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt=""  @click="handleOpen('Activity')">
                                    </h2>
                                <div id="direction">
                                       <statistical :data="statisticalData" ></statistical>
                                </div>
                            </div>
                             <!-- <div class="network">
                                  <h2>
                                        <p>
                                            <label></label>
                                            <span>成长历程</span>
                                        </p>
                                       
                                    </h2>
                                <div id="direction" v-if="workExperience.length > 0">
                                      <div style="padding: 10px 20px;">
                                            <p v-for="item in workExperience.slice(0,10)" :key="item.id" style="line-height:26px;">
                                                <span>{{item.startDate}}－{{item.endDate}}，{{item.orgName }}{{item.title?'，'+item.title:item.title}}</span>
                                            </p>
                                      </div>
                                </div>
                            </div> -->
                            <div class="relevant">
                                  <ul>
                                       <li @click="handleSelectMenu(0)" :class="navindex ==0 ? 'activemenu':''">人才</li>
                                      
                                      <li>|</li>
                                      <li @click="handleSelectMenu(1)" :class="navindex ==1 ? 'activemenu':''">专利</li>
                                      <!-- <li>|</li>
                                      <li @click="handleSelectMenu(2)" :class="navindex ==2 ? 'activemenu':''">专著</li> -->
                                      <li>|</li>
                                      <li @click="handleSelectMenu(3)" :class="navindex ==3 ? 'activemenu':''">奖励</li>
                                      <li>|</li>
                                      <li @click="handleSelectMenu(4)" :class="navindex ==4 ? 'activemenu':''">项目</li>
                                      <li>|</li>
                                      <li @click="handleSelectMenu(5)" :class="navindex ==5? 'activemenu':''">论文</li>
                                      <!-- <li>|</li>
                                      <li @click="handleSelectMenu(6)" :class="navindex ==6 ? 'activemenu':''">标准</li>
                                      <li>|</li> -->
                                      
                                  </ul>
                                  <div class="relevant_data">
                                      <div v-if="navindex ==0">
                                           <talent :data="talentData" v-if="talentData.length !==0"/>
                                            
                                            <div class="sc-box-content no-data" v-else>暂无数据</div>
                                      </div>
                                      <div v-if="navindex ==1">
                                             <Patent :data="personPatentData" v-if="personPatentData.length !==0"/>
                                              <div class="sc-box-content no-data" v-else>暂无数据</div>
                                      </div>
                                      <div v-if="navindex ==2">
                                             <div v-if=" monographs.length !==0"></div>
                                            <div class="sc-box-content no-data" v-else>暂无数据</div>
                                      </div>
                                      <div v-if="navindex ==3">
                                            <Reward :data="personRewardData" v-if="personRewardData.length !==0"/>
                                            <div class="sc-box-content no-data" v-else>暂无数据</div>
                                       </div>
                                      <div v-if="navindex ==4">
                                             <project v-if="projectdata.length !==0" :data="projectdata"></project>
                                             <div class="sc-box-content no-data" v-else>暂无数据</div>
                                      </div>
                                      <div v-if="navindex ==5">
                                           <Paper :data="paperContent" v-if="paperContent.length !==0"/>
                                            <div class="sc-box-content no-data" v-else>暂无数据</div>
                                      </div>
                                      <div v-if="navindex ==6">
                                             <Patent :data="personPatentData" v-if="personPatentData.length !==0"/>
                                              <div class="sc-box-content no-data" v-else>暂无数据</div>
                                      </div>
                                      <div v-if="navindex ==7">
                                             <div v-if=" monographs.length !==0"></div>
                                            <div class="sc-box-content no-data" v-else>暂无数据</div>
                                      </div>
                                      <div v-if="navindex ==8">
                                            <Reward :data="personRewardData" v-if="personRewardData.length !==0"/>
                                            <div class="sc-box-content no-data" v-else>暂无数据</div>
                                       </div>
                                      <div v-if="navindex ==9">
                                             <Standard v-if="standard.length !==0" :data="standard"></Standard>
                                             <div class="sc-box-content no-data" v-else>暂无数据</div>
                                      </div>
                                  </div>
                                    <div style="display:flex;justify-content: flex-end;align-items:center;height:40px;">
                                       
                                         <el-pagination
                                            layout="total,prev, pager, next"
                                            :total="total"
                                            @size-change="handleSize"
                                            @current-change="handlePage"
                                            :current-page.sync="offset"
                                            >
                                        </el-pagination>
                                    </div>
                            </div>
                        </div>
                    </div>
                     <div class="mask" v-if="modules">
                           <div class="module">
                                  <div class="network" v-if="relevance">
                                       <h2>
                                             <p>
                                                <label></label>
                                                <span>人员关联网络</span>
                                             </p>
                                            <Icon type="md-close" @click="handleClose('relevance')"/>
                                       </h2>
                                       <div class="relevance" >
                                               <Relation :data="relationship" :coefficient="coefficient"/>
                                       </div>
                                   </div>
                                   <div class="network" v-if="relation">
                                       <h2>
                                             <p>
                                                <label></label>
                                                 <span>机构内人才研究方向</span>
                                             </p>
                                            <Icon type="md-close" @click="handleClose('relation')"/>
                                       </h2>
                                       <div class="relation" >
                                              <cluster :zoom="clusterzoom" :data="researchData"></cluster>
                                               
                                       </div>
                                        
                                   </div>
                                    <div class="network" v-if="atlas">
                                             <h2>
                                                 <p>
                                                    <label></label>
                                                    <span>历年研究方向</span>
                                                </p>
                                             
                                                <Icon type="md-close" @click="handleClose('atlas')"/>
                                            </h2>
                                            <div class="atlas" >
                                                    <ResearchDirection :Pastresearchdata="Pastresearchdata"/>
                                            </div>
                                        
                                   </div>
                                   <!-- <div class="network" v-if="removal">
                                            <h2>
                                                <p>
                                                    <label></label>
                                                    <span>人才流动</span>
                                                </p>
                                               
                                                <Icon type="md-close" @click="handleClose('removal')"/>
                                            </h2>
                                            <div class="removal" >
                                                 <MapMigrate />
                                            </div>
                                        
                                   </div> -->
                                   <div class="network" v-if="achievement">
                                            <h2>
                                                <p>
                                                    <label></label>
                                                    <span>学术成果图谱</span>
                                                </p>
                                               
                                                <Icon type="md-close" @click="handleClose('achievement')"/>
                                            </h2>
                                            <div class="achievement" >
                                               <River :data="achievementsContent" />
                                            </div>
                                          
                                   </div>
                                    <div class="network" v-if="direction">
                                            <h2>
                                                <p>
                                                    <label></label>
                                                    <span>机构与学会关系网络</span>
                                                </p>
                                               
                                                <Icon type="md-close" @click="handleClose('direction')"/>
                                            </h2>
                                            <div class="direction" >
                                              <orglearnrls :zoom="orglearnzoom"></orglearnrls>
                                            </div>
                                     </div>
                                    <div class="network" v-if="Activity">
                                            <h2>
                                                <p>
                                                    <label></label>
                                                   <span>人员组成统计</span>
                                                </p>
                                               
                                                <Icon type="md-close" @click="handleClose('Activity')"/>
                                            </h2>
                                            <div class="Activity" >
                                              <statistical :data="statisticalData" ></statistical>
                                            </div>
                                         
                                   </div>
                           </div>
                    </div>
               </div>
                 <Tooltip content="导航栏" placement="left" class="menu_logo" v-if="isShow">
                    <img src="../../../assets/image/index/01/menu2.png" alt="" @click="handleClick" class="menulogo">
                </Tooltip>
               <navmenu></navmenu>
         </div>
      </div>
</template>

<script>
import navmenu from '@/components/Navmenu'
import Radar from "../Modules/Radar";
import River from "../Modules/River"; //学术成果图谱
import Paper from "../Modules/Paper"; //论文列表
import Reward from "../Modules/Reward"; //奖励列表
import Patent from "../Modules/Patent"; //专利列表
import Standard from "../Modules/Standard"; //专利列表
import Activity from "../Modules/Activity"; //研究兴趣图谱
import Guanxi from "../Modules/Guanxi"; //人员与成果、项目、奖励、事件等的关联网络
import Relation from "./module/Relation"; //机构关联网络
import GuanxiMaster from "../Modules/GuanxiMaster"; //师承关系
// import Tree from "../Modules/Tree"; //受***影响最大和影响***最大人才图谱
import ResearchDirection from "../Modules/ResearchDirection"; //历年研究方向
import MapNetworkAtlas from "../Modules/MapNetworkAtlas"; //区域网络图谱
import MapMigrate from "../Modules/MapMigrate"; //迁徙路径
import project from '../Modules/Project' //项目
import talent from './module/talent' //人才
import statistical from "../Modules/Statistical"; //人员组成统计
import orglearnrls from "../Modules/orglearnrls"; //机构与学会关系网络
import cluster from "../Modules/cluster"; //机构与学会关系网络
import Pastresearchjson  from '../org/json/pastrese.json'
// import json from './json/cluser.json'
export default {
 name:'orgdetails',
  data(){
    return{
        major:['灵液','工业','力学'],
        isShow:true,
        orgId: "", //人员唯一 ID
        workExperience: [], //个人经历
        orgData: {}, //人员信息
        paperTotal: 0, //论文数量
        paperContent: [],
        offset:1,
        limit: 5,
        pageSizeOpts: [5, 10, 15, 20, 25, 30, 35, 40],
        relationship: [], //人员关联网络
        achievementsContent: {}, //学术成果图谱
        statisticsContent: [], //研究兴趣图谱
        statisticsType: [], //研究兴趣图谱
        activityData: {},
        personownData: {}, //人员与成果、项目、奖励、事件等的关联网络
        
        query_EQ_chineseName: "", //姓名
        tipIsShow: false,
        personContent: [],
        contentData: [], //所有数据缓存
        personRewardData: [], //人才画像下的奖励
        personPatentData: [], //人才画像下的专利
        pageShow: true,
        markTab: 0, //tab标志位
        beginYear: 2010,
        endYear: 0,
        Areanetwork:{},//区域网络图数据
        Migrationpaths:{},//迁徙路径数据
        Pastresearchdata:{},//历年研究方向数据
        statisticalData:{},//人员组成统计
        monographs:[],//专著的数据
        standard:[],//标准的数据
        navindex:0,//默认显示专利
        total:0,//总条数
        modules:false,//弹出框的出现
        relevance:false,//人员关联网络的放大界面
        relation:false,//成果关系
        Activity:false,
        direction:false,
        achievement:false,
        removal:false,
        atlas:false,
        tipIsShow:false,//搜索栏
        query_EQ_chineseName:'',//搜索的关键词
        startDate:2000,
        endDate:2020,
        projectdata:[],//项目数据
        talentData:[],//人才数据
        orglearnzoom:0.5,//机构与学会关系网络默认缩放比例
        clusterzoom:0.4,
         coefficient:55,//人员关联网络线长配置
        researchData:{},//机构内人才研究方向
    }
  },
   components:{
       navmenu,
       Radar,
        Paper,
        Standard,
        Guanxi,
        Relation,
        GuanxiMaster,
        Activity,
        MapMigrate,
        MapNetworkAtlas,
        ResearchDirection,
        statistical,
        Reward,
        River,
        Patent,
        project,
        talent,
        orglearnrls,
        cluster
    },
 watch: {
   
    query_EQ_chineseName(newVal) {
      this.query_EQ_chineseName = newVal;
      this.handleQueryTip();
    }
  },
  methods:{
      //查询
      handleEnter(){
        this.getresearch();
        this.achievementsContents();
        this.relationships();
        this.activityDatas();
        this.getPersonPatentData();
        this.getPersonownData();
        this.getbasic();
        this.Areanetworks();
        this.Pastresearchdatas();
        
        this.handleSelectMenu(0);
      },
       // 查询提示
    handleQueryTip() {
      if (this.query_EQ_chineseName === "") {
           this.contentData = [];
      } else {
          var url=`/portal/es/org/`;
          var data={
              query_EQ_cnName: this.query_EQ_chineseName,
                offset: this.offset-1,
                limit: 100
          }
          this.axios.get(url,{params:data}).then(res=>{
              //  console.log(res);
               if(res.data.code*1 ==200){
                      let data = res.data.data.content;
                        this.contentData = data;
               }
          }).catch(error=>{
              console.log(error);
          })
       }
    },
      //搜索栏聚焦
    handleFocus() {
      this.tipIsShow = true;
    },
      // 下拉查询
    handleClickQuery(item) {
       console.log(item);
      this.orgId = item.orgId;
      this.query_EQ_chineseName = item.cnName;
      this.tipIsShow = false;
      console.log(333)
      this.handleEnter();
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
      //返回列表页
      handleReturn(){
          this.$router.push({name:'org'});
      },
       //机构欧关联网络
      relationships(){
            var url=`/portal/graph/org/coopOrgs`;
            this.axios.get(url,{params:{orgId:this.orgId}}).then(res=>{
                if(res.data.code ==200){
                    this.relationship = res.data.data;
                }
            }).catch(error=>{
                  console.log(error);
            })
            
      },
      //学术成果图谱
      achievementsContents(){
          var url=`/portal/graph/org/achievement/statistic`;
          var data={
              startYear:this.startDate,
              endYear:this.endDate,
              orgId:this.orgId
          }
           this.axios.get(url,{params:data}).then(res=>{
               //  console.log(res);
                if(res.data.code *1 ==200){
                   
                    var data = res.data.data;
                    // data ={
                    //      ...data,
                    //      content: data.showContent,
                    //      legend:data.type,
                    //      time:data.time
                    // }
                    //console.log(data);
                    this.achievementsContent = data;
                }
            }).catch(error=>{
                  console.log(error);
            })
      },
        //去除空格
    myTrim(x) {
      return x.replace(/^\s+|\s+$/gm, "");
    },
      //主要研究方向图谱
      activityDatas(){
          
           var url=`/portal/graph/org/person/statistic`;
             let data={
                  startYear:this.startDate,
                  endYear:this.endDate,
                  orgId:this.orgId
             }
           this.axios.get(url,{params:data}).then(res=>{
                 
                if(res.status ==200){
                    
                     var data = res.data;
                    var series = data.series;
                    var xAxis = data.xaxisData;
                
                    series.forEach(item=>{
                            item.data.forEach((each,n)=>{
                            var arr1 = [];
                            xAxis.forEach((a,b)=>{
                            var arr = [];
                                arr.push(a);
                                arr.push(each);
                                arr.push(item.name)
                                arr1.push(arr);    
                            })
                            item.newdata = arr1;
                        })
                        
                    })
                    
                    var Array =[];
                    series.forEach(item=>{
                        item.newdata.forEach((each)=>{
                                Array.push(each)
                        })
                    })
                    
                  
                    this.activityData = {
                        content: Array,
                        legend:series.map(item=>{
                                return item.name
                            })
                    };
                   
                }
            })
      },
        //历年研究方向图谱
        Pastresearchdatas(){
             var url=`/portal/graph/org/researchDirection  `;
             let data={
                  startYear:this.startDate,
                  endYear:this.endDate,
                  orgId:this.orgId
             }
            //  this.axios.get(url).then(res=>{
            //      console.log(res);
            //      if(res.data.code == '200'){
            //          this.Pastresearchdata = res.data.data;
            //      }
            //  })
            this.Pastresearchdata = Pastresearchjson.data;
        },
         //区域网络图
         Areanetworks(){
              var url=`/graph/person/coop/region`;
               this.axios.get(url,{params:{orgId:this.orgId}}).then(res=>{
                    if(res.data.code ==200){
                        var name = res.data.data.paths.map((item)=>{
                               return item[0].name
                            })
                           this.Areanetwork={
                                content:res.data.data.regionInfo,
                                path:res.data.data.paths,
                                name:name
                            }
                    }
                })
         },
          //迁徙路径图
         Migrationpathss(){
          
               var url=`/graph/person/move/paths`;
               this.axios.get(url,{params:{orgId:this.orgId}}).then(res=>{
                    if(res.data.code ==200){
                         var name = res.data.data.paths.map((item)=>{
                           return item[0].name
                           })
                           this.Migrationpaths={
                                content:res.data.data.regionInfo,
                                path:res.data.data.paths,
                                name:name
                            }
                    }
                })
         } ,
           //获取人员与成果、项目、奖励、事件等的关联网络数据
        getPersonownData(){
             var url=`/graph/person/achievement/all`;
               this.axios.get(url,{params:{orgId:this.orgId}}).then(res=>{
                    if(res.data.code ==200){
                        //console.log(res);
                           this.personownData = res.data.data;
                        
                          
                    }
                })
        } ,
        //专利  
        getPersonPatentData(){
             var url=`/portal/graph/org/patents`;
               var data ={
                  orgId:this.orgId,
                  offset:this.offset-1,
                  limit:this.limit
             }
          
               this.axios.get(url,{params:data}).then(res=>{
                //   console.log(res)
                    if (res.data.code == '200') {
                        let content = res.data.data;
                        this.personPatentData = content.map(item => {
                            item.applyDate =
                            item.applyDate.slice(0, 4) + " - " + item.applyDate.slice(4, 6);
                            item.awardDate =
                            item.awardDate.slice(0, 4) + " - " + item.awardDate.slice(4, 6);
                            return item;
                        });
                        // console.log( this.personPatentData);
                        this.total = res.data.count*1;
                        }
                })
        },
        //奖励
        getPersonRewardData(){
             var url=`/portal/graph/org/rewards`;
               var data ={
                  orgId:this.orgId,
                  offset:this.offset-1,
                  limit:this.limit
             }
               this.axios.get(url,{params:data}).then(res=>{
                   // console.log(res);
                     if (res.data.code =='200') {
                        this.personRewardData = res.data.data.map(item => {
                            item.date = item.date.slice(0, 4) + "-" + item.date.slice(4, 6)+ "-" + item.date.slice(6, 8);
                            item.title = item.title;
                            return item;
                        });
                        if(res.data.count ==null){
                            this.total = 0;
                        }else{
                            this.total = res.data.count*1;
                        }
                     }
                })
        },
        //论文
        getTalentPaperData(){
            var url=`/portal/graph/org/orgPapers`;
             var data ={
                 orgId:this.orgId,
                offset:this.offset-1,
                limit:this.limit
                   
             }
               this.axios.get(url,{params:data}).then(res=>{
                    //  console.log(res);
                     if (res.data.code == '200') {
                         var data = res.data.data;
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
                            this.paperContent = data;
                            this.total = res.data.count*1;
                           
                     }
                })
        },
        //项目
        getstandard(){
              var url=`/portal/graph/org/projects`;
             var data ={
                  orgId:this.orgId,
                  offset:this.offset-1,
                  limit:this.limit
             }
               this.axios.get(url,{params:data}).then(res=>{
                     // console.log(res);
                     if (res.data.code =='200') {
                          this.projectdata = res.data.data;
                        this.total = res.data.count*1;
                     }
                })
        },
       //人才画像人才获得的专著
        getmonographs(){

        },
        //人才
        gettalent(){
          
             var url=`/portal/es/org/orgPersons`;
             let data={
                 offset:this.offset -1,
                 limit:this.limit,
                 "query_EQ_workExperience.orgId":this.orgId
             }
             this.axios.get(url,{params:data}).then(res=>{
                   if(res.data.code =='200'){
                         this.talentData = res.data.data.content;
                          this.total = res.data.count * 1;
                   }
             })
             
        },
    

   
    //获取详情中头部基本信息
    getbasic(){
      
        var url=`/portal/es/org/details?orgId=${this.orgId}`;
        this.axios.get(url).then(res=>{
            
           if(res.data.code =='200'){
                 this.orgData = res.data.data.org;
                  this.handleData(res.data.data.org);
           }
        }).catch(error=>{
              console.log(error)
        })
    },
    //对经历进行处理
    handleData(detailsData) {
      const imgUrl = "http://10.0.88.77"; //图片地址
      let string = "";
      if (detailsData.avatar) {
        detailsData.avatar = imgUrl + detailsData.avatar;
      } else {
        detailsData.avatar = imgUrl + "/person_avatar/default.png";
      }
      if (detailsData.researchArea) {
        detailsData.researchArea.slice(0, 5).forEach((item, index, orArr) => {
          // string = string + "," + item.name;
          string = string + "；" + item.research_area;
        });
        detailsData.researchArea = string.substring(1);
      } else {
        detailsData.researchArea = false;
      }

      //工作经历
      let content = detailsData.workExperience;
      if (content) {
        for (let index = 0; index < content.length; index++) {
          content[index].endDate =
            content[index].endDate.slice(0, 4) +
            "." +
            content[index].endDate.slice(4, 6);
          content[index].startDate =
            content[index].startDate.slice(0, 4) +
            "." +
            content[index].startDate.slice(4, 6);
        }
        this.workExperience = content;
      } else {
        this.workExperience = [];
      }

      let newSocialTitle = [];
      if (detailsData.socialTitle) {
        for (let i = 0; i < detailsData.socialTitle.length; i++) {
          if (!this.isNull(detailsData.socialTitle[i])) {
            newSocialTitle.push({
              startDate: detailsData.socialTitle[i].startDate * 1,
              title: detailsData.socialTitle[i].title
            });
          } else {
            newSocialTitle.push({
              startDate: "000000000",
              title: "未知"
            });
          }
        }
        newSocialTitle.sort(function sortNumber(a, b) {
          return b.startDate - a.startDate;
        });
        detailsData.socialTitle = newSocialTitle[0].title;
      } else {
        detailsData.socialTitle = false;
      }

      //位置导航
    //   let PositionArr = this.$store.state.variable.position.slice(0, 2);
    //   PositionArr.push({
    //     pathName: "个人画像（" + detailsData.chineseName + "）",
    //     routerName: "/"
    //   });
    //   this.$store.commit("setPosition", PositionArr);
    //   //重置当前orgId
    //   this.$route.query.orgId = this.orgId;
    //   //机构 职务数据处理
    //   detailsData.orgName = this.getMax(detailsData.workExperience).orgName;
    //   detailsData.title = this.getMax(detailsData.workExperience).title;

    //   detailsData.contentData = {
    //     statisPaper: detailsData.statisPaper,
    //     statisPatent: detailsData.statisPatent,
    //     staticCriterion: detailsData.staticCriterion,
    //     reward:
    //       detailsData.rewardNum1 * 1 +
    //       detailsData.rewardNum2 * 1 +
    //       detailsData.rewardNum3 * 1
    //   };

      this.orgData = detailsData;

     // this.$Message.success("数据加载完成！");
    },
    //论文、专利标准奖励导航选择
    handleSelectMenu(num){
       
        this.navindex = num;
        this.offset =1;
        if(num ==0){
            this.gettalent();
         }else if(num ==1){
            this.getPersonPatentData();
        }else if(num ==2){
            this.getmonographs();
        }else if(num ==3){
            this.getPersonRewardData();
        }else if(num ==4){
            this.getstandard();
        }else if(num ==5){
             this.getTalentPaperData();
        }else if(num ==6){
            this.gettalent();
        }
       
    },
    //页码
    handlePage(page){
        this.offset = page;
        if(this.navindex == 0){
             this.getTalentPaperData();
        }else if(this.navindex == 1){
              this.getPersonPatentData();
        }else if(this.navindex == 2){
              this.getmonographs();
        }else if(this.navindex == 3){
              this.getPersonRewardData();
        }else if(this.navindex ==4){
              this.getstandard();
        }
    },
    //页数
    handleSize(num){
        this.limit = num;
        if(this.navindex == 0){
             this.getTalentPaperData();
        }else if(this.navindex == 1){
              this.getPersonPatentData();
        }else if(this.navindex == 2){
              this.getmonographs();
        }else if(this.navindex == 3){
              this.getPersonRewardData();
        }else if(this.navindex ==4){
              this.getstandard();
        }
    },
    //打开遮罩
    handleOpen(str){
        
          if(str =='relevance'){
               this.modules = true;
               this.relevance = true;
          }else if(str =='relation'){
               this.modules = true;
               this.relation = true;
          }else if(str =='Activity'){
               this.modules = true;
               this.Activity = true;
          }else if(str =='direction'){
               this.modules = true;
               this.direction = true;
          }else if(str =='achievement'){
               this.modules = true;
               this.achievement = true;
          }else if(str =='removal'){
               this.modules = true;
               this.removal = true;
          }else if(str =='atlas'){
               this.modules = true;
               this.atlas = true;
          }
           this.coefficient = 115;
    },
    //关闭遮罩
    handleClose(str){
         if(str =='relevance'){
               this.modules = false;
               this.relevance = false;
          }else if(str =='relation'){
               this.modules = false;
               this.relation = false;
          }else if(str =='Activity'){
               this.modules = false;
               this.Activity = false;
          }else if(str =='direction'){
               this.modules = false;
               this.direction = false;
          }else if(str =='achievement'){
               this.modules = false;
               this.achievement = false;
          }else if(str =='removal'){
               this.modules = false;
               this.removal = false;
          }else if(str =='atlas'){
               this.modules = false;
               this.atlas = false;
          }
        var width = document.body.clientWidth || document.documentElement.clientWidth;
            if(width<=1366){
                this.coefficient = 25;
                
            }else{
            this.coefficient = 55;
            }
    },
     //跳转不同的导航
      handleRouter(path){
         this.$router.push({name:path});
         
      },
         //根据屏幕分辨率展示图形的缩放比例
    getclientWidth(){
         var width = document.body.clientWidth || document.documentElement.clientWidth;
       
         if(width>1366){
            this.orglearnzoom = 1;
            this.clusterzoom = 0.7;
         }else if(width>900 && width <=1366){
             this.orglearnzoom = 0.7;
              this.clusterzoom = 0.5;
         }else{
             this.orglearnzoom = 0.4;
              this.clusterzoom = 0.3;
         }
         
    },
    //机构与学会网络图谱
    getOrgLearn(){
          var url=`/portal/es/org/orgWithSociety?orgId=${this.orgId}`;
          this.axios.get(url).then(res=>{
                console.log(res);
          }).catch(error=>{
                console.log(error);
          })
    },
     //设置列表宽度
      SetHeight(){
        //   var list = document.querySelector('.list');
        //   list.style.height = document.querySelector('.sc_right').offsetHeight - document.querySelector('.header').offsetHeight -document.querySelector('.page').offsetHeight + 'px';
          var select_dropdown = document.querySelectorAll('.ivu-select-dropdown');
         
          select_dropdown.forEach(item=>{
                item.style.width = document.querySelector('.ivu-select-single').offsetWidth + 'px';
                item.style['overflow-x'] ='hidden';
          })
     
      },
      //人员组成统计
      getstatisticalData(){
            var url= `/portal/graph/org/personGroup`;
            var data={
                  orgId:this.orgId
            }
            this.axios.get(url,{params:data}).then(res=>{
                // console.log(res);
                if(res.data.code == '200'){
                      this.statisticalData = res.data.data;
                }
            }).catch(error=>{
                  console.log(error);
            })
      },
      //机构欧内人才研究方向
       getresearch(){
          
             var url=`/portal/graph/org/researchArear`;
             var data={
                 orgId:this.orgId
             }
             this.axios.get(url,{params:data}).then(res=>{
                //    console.log(res)
                   if(res.data.code =='200'){
                         this.researchData = res.data.data;
                        
                   }
             }).catch(error=>{
                   console.log(error);
             })
       }
  },
  mounted(){
    
       this.orgId = this.$route.query.orgId;
        let date = new Date();
        this.endYear = date.getFullYear();
         window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
        var width = document.body.clientWidth || document.documentElement.clientWidth;
        if(width<=1366){
            this.coefficient = 25;
            
        }else{
           this.coefficient = 55;
        }
         this.$nextTick(()=>{
              this.getresearch();
               this.achievementsContents();
                this.relationships();
                this.activityDatas();
                this.handleSelectMenu(0);
                this.getPersonownData();
                this.getbasic();
                this.Areanetworks();
                this.Pastresearchdatas();
               this.getstatisticalData();
               
         })
       
        window.onresize =function(){
            location.reload();
       
        }
       this.getclientWidth(); 
        
  }
}
</script>

<style lang="scss" scoped>
 .selection{
     display: flex;
     position: relative;
    .sc_left{
         width:20%;
         height:inherit;
         background: #000000;
         color: #939393;
         position: relative;
         .menu{
            margin: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
           
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
                //    margin-left: 10%;
                li{
                 cursor: pointer;
                  padding:0 5px;
                  font-size: 10px;
                  color: #9d9d9d;
                }
               
            }
         }
         .info{
            margin: 0 20px;
            margin-bottom:10px ;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .analyze{
                width: 50%;
                 ol{
                   >li{
                           margin-bottom: 20px;
                         ul{
                             display: flex;
                             justify-content: space-between;
                             align-items: flex-start;
                             li{
                                border-right:1px solid #939393;
                                padding-right: 10px;
                                text-align: center;
                                flex: 1;
                                p{
                                    color:#fff;
                                }
                             }
                             li:last-child{
                                 border-right:none;
                             }
                            
                         }
                     }
                 }
            }
         }
         .introduce{
             margin: 0 20px;
             margin-top:20px;

             p{
                 line-height: 30px;
             }
             .name{
                 font-size: 20px;
                 color:#ffc509;
                 font-weight: bolder;
             }
             .title{
                 color:#ffc509;
             }
             label{
                 width:60px;
                 display: block;
                 border-top: 1px solid #939393;
                 margin: 10px 0;
             }
         }
         .return{
             position: absolute;
             left:20px;
             bottom: 20px;
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
         background: #f8f8f8;
         width:80%;
         position: relative;
         .search{
             position: relative;
             background: url(../../../assets/image/knowledge/person/portrayal/default/banner.png) no-repeat;
             background-size:100% 100%;
             height: 125px;
             display: flex;
             justify-content: center;
             align-items: center;
            .menus{
                display: block;
                width:28px;
                height:26px;
                position: absolute;
                right:40px;
                top:40px;
            }
            .input{
                width: 445px;
                height: 50px;
                border: 1px solid #939393;
                border-radius: 24px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                p{
                    width:240px;
                    background: #939393;
                    color: #fff;
                    height:100%;
                    line-height: 50px;
                    text-align: center;
                    border-top-left-radius: 24px;
                    border-bottom-left-radius: 24px;
                     font-size: 16px;
                }
                /deep/.ivu-input-wrapper{
                    width: 100%;
                    height:100%;
                    input{
                        height: 100%;
                       width: 86%;
                       padding-left: 10px;
                        border-top-right-radius: 24px;
                        border-bottom-right-radius: 24px;
                        background: rgba(196,196,196,0);
                        color: #515a6e;
                        font-size: 16px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    
                    input::-webkit-input-placeholder {  	/* WebKit browsers */
                            color: #939393;
                            font-size: 16px;
                        }
                        input:-moz-placeholder {            	/* Mozilla Firefox 4 to 18 */
                            color: #939393;
                            font-size: 16px;
                        }
                        input::-moz-placeholder {           	/* Mozilla Firefox 19+ */
                            color: #939393;
                            font-size: 16px;
                        }
                        input:-ms-input-placeholder {       	/* Internet Explorer 10+ */
                            color: #939393;
                            font-size: 16px;
                        }
                        /deep/.ivu-input-suffix{
                             display: flex;
                            justify-content: center;
                            align-items: center;
                            line-height: 48px;
                            width:50px;
                            i{
                                font-size: 28px;
                            }
                        }
                    /deep/.ivu-poptip-popper{
                        min-width:280px;
                        max-width:280px;
                        .ivu-poptip-inner{
                            max-height:200px;
                            overflow: hidden;
                            overflow-y:auto;
                            li{
                                cursor:pointer;
                            }
                        }
                    }
                      
                }
            }
         }
         .content{
             width: 100%;
             display: flex;
             background: #f8f8f8;
             .content_menu{
                 width: 50%;
                 margin:10px;
                .crew{
                    display: flex;
                    .network{
                        width: 50%;
                        height: 350px;
                        background: #fff;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        box-shadow: 0 0px 1px rgba(0,0,0,0.2);
                        border-color: #eee;
                        h2{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            height: 40px;
                            line-height: 40px;
                            p{
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                 label{
                                    display: inline-block;
                                    width: 5px;
                                    height: 16px;
                                    background: #ffc201;
                                    }
                                span{
                                
                                    padding-left: 5px;
                                }
                            }
                            img{
                                display: block;
                                width: 21px;
                                height: 21px;
                                margin-right: 10px;
                                 cursor: pointer;
                            }
                        }
                        .relevance,.relation,.atlas,.removal{
                            height:calc( 100% - 40px);
                        }
                    }
                     .network:last-child{
                          margin-right: 0;
                     }
                 }
                 .crew:last-child{
                      .network{
                          margin-bottom: 0;
                      }
                 }
             }
             .content_view{
                  width: 50%;
                  margin:10px;
                  background: #fff;
                  margin-left: 0;
                  height:710px;
                  overflow: hidden;
                  overflow-y:auto;
                  box-shadow: 0 0px 1px rgba(0,0,0,0.2);
                  border-color: #eee;
                  .network{
                      width: 100%;
                      height: 345px;
                      border-bottom: 1px solid #dddddd;
                       h2{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            height: 40px;
                            line-height: 40px;
                            p{
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                 label{
                                    display: inline-block;
                                    width: 5px;
                                    height: 16px;
                                    background: #ffc201;
                                    }
                                span{
                                
                                    padding-left: 5px;
                                }
                            }
                            img{
                                display: block;
                                width: 21px;
                                height: 21px;
                                margin-right: 10px;
                                cursor: pointer;
                            }
                        }
                    
                  }
                  .relevant{
                      height:100%;
                      width:100%;
                        display: flex;
                      flex-direction: column;
                      ul{
                          display: flex;
                          justify-content: flex-start;
                          align-items: center;
                          li{
                              padding:0 10px;
                              line-height: 40px;
                              font-weight: bolder;
                              cursor: pointer;
                          }
                          li:nth-child(2n){
                              color:#d8cece;
                          }
                      }
                       .relevant_data{
                          //   height:calc( 100% - 80px);
                        flex:1;
                          >div{
                              height:100%;
                             overflow: hidden;
                              .no-data{
                                     height: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                               
                              }
                          }
                       }

                  }
                 #achievement{
                      //border-bottom: 1px solid rgb(221, 221, 221);
                     padding-bottom: 20px;
                     height: calc( 100% - 40px);
                  }
                  #direction,.Activity{
                      height: calc( 100% - 40px);
                  }
                 
             }
         }
         .mask{
             width:100%;
             height: 100%;
             position: absolute;
             left: 0;
             top:0;
            z-index: 100;
             background: rgba(0,0,0,0.7);
             display: flex;
             justify-content: center;
             align-items: center;
             .module{
                 width: 80%;
                 height: 80%;
                 background: #fff;
                   .network{
                      width: 100%;
                      height: 100%;
                      display: flex;
                      flex-direction: column;
                       h2{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            height: 60px;
                            line-height: 60px;
                            p{
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                font-size: 20px;
                                font-weight: bolder;
                                 label{
                                    display: inline-block;
                                    width: 5px;
                                    height: 30px;
                                    background: #ffc201;
                                    padding-left:10px ;
                                    }
                                span{
                                
                                    padding-left: 5px;
                                }
                            }
                            i{
                                  font-size: 30px;
                                  margin-right: 30px;
                                  cursor: pointer;
                            }
                        }
                      >div{
                           flex:1;
                       }
                  }
             }
         }
    }
    
 }
.activemenu{
    color:#ffc509;
    text-decoration: underline;
    font-size: 16px;
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
                        padding: 0 2px;
                    }
                }
            }
           .info{
               margin:0 10px;
              margin-bottom:10px ;
              .analyze{
                 margin-right: 15px;
                 ol{
                     li{
                         ul{
                             li{
                                 padding-right: 5px;
                             }
                         }
                     }
                 }
              }
           }
        }
        .sc_right{
             .relevant{
                  ul{
                      li{
                          padding: 0 5px!important;
                      }
                  }
             }
        }
    }
}


.content_view::-webkit-scrollbar{/*滚动条整体*/
    width:10px;
    height: 30px;
}
.content_view::-webkit-scrollbar-track{/*滚动条轨道*/
background:#ddd;
border-radius:2px;
}
.content_view::-webkit-scrollbar-thumb{/*滚动条里面的滑块*/
background:#333;
border-radius:10px;
}
.content_view::-webkit-scrollbar-thumb:hover{/*滚动条鼠标事件，鼠标放上去出现的事件*/
background:#333;
}
.content_view::-webkit-scrollbar-corner{/*滚动条边角*/
background:#ddd;
}

</style>