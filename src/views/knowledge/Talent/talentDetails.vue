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
                        <div class="info">
                              <img src="../../../assets/image/knowledge/org/001.png" alt="" class="img">
                            <div class="analyze">
                                  <ol>
                                    <li>
                                            <ul>
                                                <!-- <li>
                                                    <p>{{personData.influenceScore?personData.influenceScore:0}}</p>
                                                    <p>影响力</p>
                                                </li> -->
                                                <!-- <li class="line"></li> -->
                                                <li>
                                                    <p>{{personData.staticPaper ? personData.staticPaper : 0}}</p>
                                                    <p>论文</p>
                                                </li>
                                                <!-- <li class="line"></li> -->
                                                <li>
                                                    <p>{{personData.rewardTotalNum ? personData.rewardTotalNum:0}}</p>
                                                    <p>奖励</p>
                                                </li>
                                            </ul>
                                    </li>
                                    <li>
                                        <ul>
                                                <li>
                                                    <p>{{personData.staticPatent?personData.staticPatent:0}}</p>
                                                    <p>专利</p>
                                                </li>
                                                <!-- <li>
                                                    <p>0</p>
                                                    <p>专著</p>
                                                </li> -->
                                                <li>
                                                    <p>{{personData.staticProject?personData.staticProject:0}}</p>
                                                    <p>项目</p>
                                                </li>
                                            </ul>
                                    </li>
                                 </ol>
                                 <div class="leida"></div>
                            </div>
                        </div>
                        <div class="introduce">
                             <p class="name">{{personData.chineseName?personData.chineseName:'未知'}}</p>
                             <p class="title"  v-for="(item,i) in personData.outstanding" :key="i">
                                  <span
                                    class="ch"
                                    style="padding-right:5px;"
                                    >{{item.name?item.name:'未知'}} </span>
                             </p>
                              <label for=""></label>
                             <p>{{personData.currentOrganization?personData.currentOrganization:'未知'}}</p>
                             <p>{{personData.title?personData.title:'暂无职称'}}</p>
                             <label for=""></label>
                             <p>研究领域:</p>
                             <p>
                                  <span v-for="(item,i) in personData.researchArea" :key="i" style="padding-right:5px;">{{item.research_area}} ;</span>
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
                                <p>人才合作网络挖掘</p>
                                <!-- <Input suffix="ios-search" placeholder="请输入姓名" /> -->
                                 <div class="ivu-input-wrapper">
                                    <input
                                        type="text"
                                        @focus="handleFocus"
                                         v-model.trim="query_EQ_chineseName"
                                        placeholder="请输入关键词..."
                                        @keyup.enter="handleQueryTip"
                                    />
                                    <span class="ivu-input-suffix" @click="handleQueryTip">
                                        <Icon type="ios-search" />
                                    </span>
                                    
                                    <div class="ivu-poptip-popper" v-if="tipIsShow">
                                        <div class="ivu-poptip-inner scrollbar">
                                        <ul v-if="contentData.length===0">
                                            <li  class="ivu-poptip-body">暂无匹配数据</li>
                                        </ul>
                                        <ul v-else>
                                            <li
                                            class="ivu-poptip-body"
                                            v-for="(item,i) in contentData"
                                            @click="handleClickQuery(item)"
                                            :key="i"
                                            >
                                            <span class="ivu-poptip-body-content-inner">{{item.personName +":" + item.orgName}}</span>
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
                                                <span>人员关联网络</span>
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
                                                  <span>人员与成果关系</span>
                                             </p>
                                           <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt="" @click="handleOpen('relation')">
                                       </h2>
                                       <div class="relation" >
                                              <Guanxi :data="personownData" />
                                       </div>
                                   </div>
                              </div>
                              <div class="crew">
                                    <div class="network">
                                           <h2>
                                                 <p>
                                                    <label></label>
                                                    <span>区域网络图谱</span>
                                                </p>
                                             
                                                <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt="" @click="handleOpen('atlas')">
                                            </h2>
                                            <div class="atlas" >
                                                   <MapNetworkAtlas :personId="personId" :Areanetwork="Areanetwork"/>
                                            </div>
                                    </div>
                                   <div class="network">
                                             <h2>
                                                <p>
                                                    <label></label>
                                                    <span>人才流动</span>
                                                </p>
                                               
                                                <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt="" @click="handleOpen('removal')">
                                            </h2>
                                            <div class="removal">
                                                 <MapMigrate :data="Migrationpaths"/>
                                            </div>
                                   </div>
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
                            <div class="network">
                                  <h2>
                                        <p>
                                            <label></label>
                                            <span>历年研究方向</span>
                                        </p>
                                        
                                        <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt=""  @click="handleOpen('direction')">
                                    </h2>
                                <div id="direction">
                                       <ResearchDirection :Pastresearchdata="Pastresearchdata"/>
                                </div>
                            </div>
                             <div class="network">
                                  <h2>
                                        <p>
                                            <label></label>
                                            <span>主要研究方向图谱</span>
                                        </p>
                                        
                                        <img src="../../../assets/image/knowledge/person/portrayal/default/blow.png" alt=""  @click="handleOpen('Activity')">
                                    </h2>
                                <div id="direction">
                                        <Activity :data="activityData" />
                                </div>
                            </div>
                             <div class="network">
                                  <h2>
                                        <p>
                                            <label></label>
                                            <span>成长历程</span>
                                        </p>
                                       
                                    </h2>
                                <div id="direction" v-if="workExperience.length > 0">
                                      <div style="margin: 10px 20px;height:calc( 100% - 40px);overflow:hidden;overflow-y: auto;">
                                            <p v-for="(item,i) in workExperience" :key="i" style="line-height:26px;">
                                                <span>{{item.startDate}}－{{item.endDate}}，{{item.orgName }}{{item.title?'，'+item.title:item.title}}</span>
                                            </p>
                                      </div>
                                </div>
                            </div>
                            <div class="relevant">
                                  <ul>
                                      <li @click="handleSelectMenu(0)" :class="navindex ==0 ? 'activemenu':''">论文</li>
                                      <li>|</li>
                                      <li @click="handleSelectMenu(1)" :class="navindex ==1 ? 'activemenu':''">专利</li>
                                      <li>|</li>
                                      <!-- <li @click="handleSelectMenu(2)" :class="navindex ==2 ? 'activemenu':''">专著</li>
                                      <li>|</li> -->
                                      <li @click="handleSelectMenu(3)" :class="navindex ==3 ? 'activemenu':''">奖励</li>
                                      <li>|</li>
                                      <li @click="handleSelectMenu(4)" :class="navindex ==4 ? 'activemenu':''">项目</li>
                                  </ul>
                                  <div class="relevant_data">
                                      <div v-if="navindex ==0">
                                            <Paper :data="paperContent" v-if="paperContent.length !==0"/>
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
                                             <Project v-if="standard.length !==0" :data="standard"></Project>
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
                                            :page-size="limit"
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
                                       <div class="relevance module_view" >
                                               <Relation :data="relationship" :coefficient="coefficient"/>
                                       </div>
                                   </div>
                                   <div class="network" v-if="relation">
                                       <h2>
                                             <p>
                                                <label></label>
                                                 <span>人员与成果关系</span>
                                             </p>
                                            <Icon type="md-close" @click="handleClose('relation')"/>
                                       </h2>
                                       <div class="relation module_view" >
                                              <Guanxi :data="personownData" ischange="true"/>
                                       </div>
                                        
                                   </div>
                                    <div class="network" v-if="atlas">
                                             <h2>
                                                 <p>
                                                    <label></label>
                                                    <span>区域网络图谱</span>
                                                </p>
                                             
                                                <Icon type="md-close" @click="handleClose('atlas')"/>
                                            </h2>
                                            <div class="atlas module_view" >
                                                   <MapNetworkAtlas :personId="personId" :Areanetwork="Areanetwork"/>
                                            </div>
                                        
                                   </div>
                                   <div class="network" v-if="removal">
                                            <h2>
                                                <p>
                                                    <label></label>
                                                    <span>人才流动</span>
                                                </p>
                                               
                                                <Icon type="md-close" @click="handleClose('removal')"/>
                                            </h2>
                                            <div class="removal module_view" >
                                                 <MapMigrate :data="Migrationpaths"/>
                                            </div>
                                        
                                   </div>
                                   <div class="network" v-if="achievement">
                                            <h2>
                                                <p>
                                                    <label></label>
                                                    <span>学术成果图谱</span>
                                                </p>
                                               
                                                <Icon type="md-close" @click="handleClose('achievement')"/>
                                            </h2>
                                            <div class="achievement module_view" >
                                               <River :data="achievementsContent" />
                                            </div>
                                          
                                   </div>
                                    <div class="network" v-if="direction">
                                            <h2>
                                                <p>
                                                    <label></label>
                                                    <span>历年研究方向</span>
                                                </p>
                                               
                                                <Icon type="md-close" @click="handleClose('direction')"/>
                                            </h2>
                                            <div class="direction" >
                                               <ResearchDirection :Pastresearchdata="Pastresearchdata"/>
                                            </div>
                                     </div>
                                    <div class="network" v-if="Activity">
                                            <h2>
                                                <p>
                                                    <label></label>
                                                   <span>主要研究方向图谱</span>
                                                </p>
                                               
                                                <Icon type="md-close" @click="handleClose('Activity')"/>
                                            </h2>
                                            <div class="Activity module_view" >
                                               <Activity :data="activityData" />
                                            </div>
                                         
                                   </div>
                           </div>
                    </div>
               </div>
                 <Tooltip content="导航栏" placement="left" class="menu_logo"  v-if="isShow">
                    <img src="../../../assets/image/index/01/menu2.png" alt="" @click="handleClick"  class="menulogo">
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
import Project from "../Modules/Project"; //项目列表
import Activity from "../Modules/Activity"; //研究兴趣图谱
import Guanxi from "../Modules/Guanxi"; //人员与成果、项目、奖励、事件等的关联网络
import Relation from "../Modules/Relation"; //人员关联网络
import GuanxiMaster from "../Modules/GuanxiMaster"; //师承关系
// import Tree from "../Modules/Tree"; //受***影响最大和影响***最大人才图谱
import ResearchDirection from "../Modules/ResearchDirection"; //历年研究方向
import MapNetworkAtlas from "../Modules/MapNetworkAtlas"; //区域网络图谱
import MapMigrate from "../Modules/MapMigrate"; //迁徙路径


export default {
 name:'talentdetails',
  data(){
    return{
        major:['灵液','工业','力学'],
        isShow:true,
        personId: "", //人员唯一 ID
        workExperience: [], //个人经历
        personData: {}, //人员信息
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
        coefficient:85,//人员关联网络线长配置
        
    }
  },
   components:{
       navmenu,
       Radar,
        Paper,
        Project,
        Guanxi,
        Relation,
        GuanxiMaster,
        Activity,
        MapMigrate,
        MapNetworkAtlas,
        ResearchDirection,
        // Tree,
        Reward,
        River,
        Patent
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
         this.achievementsContents();
        this.relationships();
        this.activityDatas();
        this.getTalentPaperData();
        this.getPersonownData();
        this.getbasic();
        this.Areanetworks();
        this.Pastresearchdatas();
        this.handleSelectMenu(0);
      },
       // 查询提示
    handleQueryTip() {
      if (this.query_EQ_chineseName === "") {
        this.personContent = [];
        // this.$Modal.info({
        //     title: "系统提示",
        //     content: "请输入检索信息！"
        // });
        //return ;
      } else {
          var url=`/indexCon/searchPerson`;
          var data={
               searchWord:this.query_EQ_chineseName
          }
          this.axios.get(url,{params:data}).then(res=>{
            //  console.log(res);
               if(res.data.code*1 ==200){
                      let data = res.data.data;
                        this.contentData = data;
                      
               }
          })
       }
    },
      //搜索栏聚焦
    handleFocus() {
      this.tipIsShow = true;
    },
      // 下拉查询
    handleClickQuery(item) {
      this.personId = item.id;
      this.query_EQ_chineseName = item.personName;
      this.tipIsShow = false;
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
          this.$router.push({name:'talent'});
      },
       //人员关联网络
      relationships(){
            var url=`/graph/person/relationship`;
            this.axios.get(url,{params:{personId:this.personId}}).then(res=>{
                if(res.data.code ==200){
                    this.relationship = res.data.data;
                }
            })
            
      },
      //学术成果图谱
      achievementsContents(){
          var url=`/graph/person/achievement/statistics`;
           this.achievementsContent={};
           this.axios.get(url,{params:{personId:this.personId}}).then(res=>{
                // console.log(res);
                if(res.data.code*1 ==200){
                     let content = res.data.data.showContent;
                    for (let index = 0; index < content.length; index++) {
                        content[index][2] = this.myTrim(content[index][2]);
                    }
                    this.achievementsContent = {
                        content,
                        time: res.data.data.time,
                        legend: res.data.data.type
                    };
                  
                }else{
                      this.achievementsContent={};
                }
               
            })
      },
        //去除空格
    myTrim(x) {
      return x.replace(/^\s+|\s+$/gm, "");
    },
      //主要研究方向图谱
      activityDatas(){
          
           var url=`/graph/person/interests/statistics`;
           this.axios.get(url,{params:{personId:this.personId}}).then(res=>{
                //  console.log(res);
                if(res.data.code*1 ==200){
                    this.activityData = {
                        content: res.data.data.showContent,
                        legend: res.data.data.type
                    };
                }
            })
      },
        //历年研究方向图谱
        Pastresearchdatas(){
             this.Pastresearchdata={};
             var url=`/graph/person/interests/year`;
           this.axios.get(url,{params:{personId:this.personId}}).then(res=>{
                
                if(res.data.code*1 ==200){
                    this.Pastresearchdata = res.data.data;
                     
                }
            })
        },
         //区域网络图
         Areanetworks(){
              var url=`/graph/person/coop/region`;
               this.axios.get(url,{params:{personId:this.personId}}).then(res=>{
                  // console.log(res)
                    if(res.data.code*1 ==200){
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
          //人才流动图
         Migrationpathss(){
          
               var url=`/graph/person/move/paths`;
               this.axios.get(url,{params:{personId:this.personId}}).then(res=>{
                //    console.log(res)
                    if(res.data.code*1 ==200){
                         var name = res.data.data;
                           this.Migrationpaths=name;
                    }
                })
         } ,
           //获取人员与成果、项目、论文等的关联网络数据
        getPersonownData(){
             var url=`/graph/person/achievement/all`;
               this.axios.get(url,{params:{personId:this.personId}}).then(res=>{
                    if(res.data.code ==200){
                        this.personownData = res.data.data;
                    }
                }).catch(error=>{
                     console.log(error);
                })
        } ,
        //专利  
        getPersonPatentData(){
             var url=`/portal/es/person/patent`;
               var data ={
                  personId:this.personId,
                  offset:this.offset-1,
                  limit:this.limit
             }
          
               this.axios.get(url,{params:data}).then(res=>{
                  // console.log(res)
                    if (res.data.code =='200') {
                        let content = res.data.data.content;
                        this.personPatentData = content.map(item => {
                            item.applyDate =
                            item.applyDate.slice(0, 4) + " - " + item.applyDate.slice(4, 6);
                            item.awardDate =
                            item.awardDate.slice(0, 4) + " - " + item.awardDate.slice(4, 6);
                            return item;
                        });
                        this.total = res.data.count*1;
                     }else{
                         this.personPatentData= [];
                     }
                })
        },
        //奖励
        getPersonRewardData(){
             var url=`/portal/es/person/reward`;
               var data ={
                  personId:this.personId,
                  offset:this.offset-1,
                  limit:this.limit
             }
               this.axios.get(url,{params:data}).then(res=>{
                  // console.log(res);
                     if (res.data.code == '200') {
                        this.personRewardData = res.data.data.data.map(item=>{
                              return {
                                   ...item,
                                   title:item.rewardName
                              }
                        });
                        if( res.data.data.total ==null){
                            this.total = 0;
                        }else{
                            this.total = res.data.data.total*1;
                        }
                     }
                }).catch(error=>{
                      console.log(error);
                })
        },
        //论文
        getTalentPaperData(){
           
            var url=`/portal/es/person/paper`;
             var data ={
                 personId:this.personId,
                offset:this.offset-1,
                limit:this.limit
                   
             }
               this.axios.get(url,{params:data}).then(res=>{
                  
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
                                    item.publishDate.slice(0, 4) ;
                                }
                            });
                            this.paperContent = data;
                            this.total = res.data.count*1;
                         
                           
                     }else{
                           this.paperContent= [];
                     }
                })
        },
        //项目
        getstandard(){
              var url=`/portal/es/person/project`;
             var data ={
                  personId:this.personId,
                  offset:this.offset-1,
                  limit:this.limit
             }
               this.axios.get(url,{params:data}).then(res=>{
                     if (res.data.data) {
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
                        this.standard = data;
                       
                        this.total = res.data.count*1;
                     }
                })
        },
     

   
    //获取详情中头部基本信息
    getbasic(){
        var url=`/portal/es/person/details?personId=${this.personId}`;
        this.axios.get(url).then(res=>{
            //console.log(res);
           if(res.data.code =='200'){
                 this.personData = res.data.data.person;
                 this.handleData(res.data.data.person);
                  
           }
        }).catch(error=>{
              console.log(error)
        })
    },
    //对经历进行处理
    handleData(detailsData) {
      const imgUrl = "http://10.0.88.77"; //图片地址
    //   let string = "";
    //   if (detailsData.avatar) {
    //     detailsData.avatar = imgUrl + detailsData.avatar;
    //   } else {
    //     detailsData.avatar = imgUrl + "/person_avatar/default.png";
    //   }
    //   if (detailsData.researchArea) {
    //     detailsData.researchArea.slice(0, 5).forEach((item, index, orArr) => {
    //       // string = string + "," + item.name;
    //       string = string + "；" + item.research_area;
    //     });
    //     detailsData.researchArea = string.substring(1);
    //   } else {
    //     detailsData.researchArea = false;
    //   }

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
    // console.log(this.workExperience)
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

     

      this.personData = detailsData;

      //this.$Message.success("数据加载完成！");
    },
    //论文、专利标准奖励导航选择
    handleSelectMenu(num){
        this.navindex = num;
        this.offset =1;
        if(num ==0){
            this.getTalentPaperData();
        }else if(num ==1){
            this.getPersonPatentData();
        }else if(num ==2){
            this.getmonographs();
        }else if(num ==3){
            this.getPersonRewardData();
        }else if(num ==4){
            this.getstandard();
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
          this.coefficient = 185;
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
                this.coefficient = 55;
                
            }else{
            this.coefficient = 85;
            }
    },
     //跳转不同的导航
      handleRouter(path){
          this.$router.push({name:path});
         
      }
  },
  mounted(){
       this.personId = this.$route.query.personId;
    
        let date = new Date();
        this.endYear = date.getFullYear();
         window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
         var width = document.body.clientWidth || document.documentElement.clientWidth;
        if(width<=1366){
            this.coefficient = 55;
            
        }else{
           this.coefficient = 85;
        }

      this.$nextTick(()=>{
               this.achievementsContents();
                this.relationships();
                this.activityDatas();
                this.getTalentPaperData();
                this.getPersonownData();
                this.getbasic();
                this.Areanetworks();
                this.Pastresearchdatas();
                this.Migrationpathss();
         })
        //  var that = this;
        window.onresize =function(){
          location.reload();
      
        }
         
        
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
              //  margin-left: 10%;
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
            .img{
                display:block;
                width:130px;
                height:130px;
                padding-right: 5px;
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
                border: 2px solid #939393;
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
                       width: 100%;
                       padding-left: 10px;
                        border-top-right-radius: 24px;
                        border-bottom-right-radius: 24px;
                        background: rgba(196,196,196,0);
                       font-size: 16px;
                        color: #515a6e;
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
                        width:280px;
                        .ivu-poptip-inner{
                            max-height:200px;
                            overflow: hidden;
                            overflow-y:auto;
                            li{
                                cursor:pointer;
                               // border-bottom: 1px solid #ddd;
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
                      height: 355px;
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
 @media (min-width:1028px) and (max-width: 1366px){
    .selection{
        .sc_left{
            // width:25%;
            .menu{
                p{
                   font-size:22px;
                //    margin-left: 15px;
                }
                ul{
                    margin-left: 0;
                    li{
                        padding: 0 2px;
                        font-size: 6px;
                    }
                }
            }
           .info{
               margin:0 10px;
              margin-bottom:10px ;
              .analyze{
                 margin-right: 15px;
                 ol{
                     >li{
                         ul{
                             li{
                                 padding-right: 5px;
                                
                                 p{
                                      transform: scale(0.8);
                                 }
                             }
                         }
                     }
                 }
              }
           }
        }
        .sc_right{
            // width: 75%;
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