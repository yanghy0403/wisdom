<template>
    <div class="content">
        <div class="introductory">
             <div style="width: 100%;">
                  <div>
                          <ul>
                            <li>
                              <img src="../../assets/image/index/01/科学家信息/person.png" class="person1"/>
                            </li>
                            <li>
                                  <h2 @click="handleDetail(curPersonData.id)">{{curPersonData.name}}</h2>
                                  <p>{{curPersonData.orgName}}</p>
                                  <p v-for="(item,i) in curPersonData.dataList" :key="i">
                                        {{item}}
                                  </p>
                            </li>
                        </ul>
                  </div>
                  <div v-if="paperContent && paperContent.length>0">
                        <ul>
                             <li>
                                  <img src="../../assets/image/index/01/科学家信息/paper.png"  class="paper1"/>
                             </li>
                             <li>
                                   <ol>
                                       <li v-for="(item,index) in paperContent" :key="index">{{index +1}}.{{item.name}}</li>
                                       
                                   </ol>
                                   <p class="line"></p>
                             </li>
                         </ul>
                  </div>
                  <div v-if="personPatentData && personPatentData.length>0">
                        <ul>
                             <li>
                                  <img src="../../assets/image/index/01/科学家信息/patent.png"  class="patent1"/>
                             </li>
                             <li>
                                   <ol>
                                       <li v-for="(item,index) in personPatentData" :key="index" @click="handleRouter(item.value)">{{index +1}}.{{item.name}}</li>
                                   </ol>
                                   <p class="line"></p>
                             </li>
                         </ul>
                  </div>
                    <div v-if="personRewardData && personRewardData.length>0">
                        <ul>
                             <li>
                                   <img src="../../assets/image/index/01/科学家信息/reward.png"  class="reward1"/>
                             </li>
                             <li>
                                    <ol>
                                       <li v-for="(item,index) in personRewardData" :key="index">{{index +1}}.{{item.name}}</li>
                                   </ol>
                             </li>
                         </ul>
                  </div>
              </div>    
                
        </div>
       <div class="graph">
            
              <graph :data="graphData"></graph>
       </div>
        <div class="oper">
           
              <div class="top">
                   <div class="search">
                          <img src="../../assets/image/index/01/search1.png" alt="" class="search_logo" v-show="!isSearch" @click="isSearch =true" placeholder="请搜索人才">
                        <div class="input" v-show="isSearch">
                              <!-- <input type="text" v-model="search" placeholder="请搜索人才" @input="handleChange" > -->
                              <Input v-model="search" placeholder="请搜索人才" clearable  @on-search="handleChange" search @on-change="handleChange"/>
                              <!-- <img src="../../assets/image/index/01/search2.png" alt="" class="search_logo" @click="isSearch =false"> -->
                              <ul v-show="search != '' && isMenu">
                                 
                                  <li v-for="item in personData" :key="item.id" @click="handleSelectName(item)">
                                     
                                      {{item.personName + ':' + item.orgName}}
                                 </li>
                              </ul>
                        </div>
                  </div> 
              </div>
           
              <div class="foot">
                   <div class="legend">
                        
                         <div class="paper leg" :class="paper.checked ?'paper_active':''" @click="handleClick(paper.value)">论文</div>
                         <div class="award leg" :class="award.checked?'award_active':''" @click="handleClick(award.value)">奖励</div>
                         <div class="patent leg" :class="patent.checked?'patent_active':''" @click="handleClick(patent.value)">专利</div>
                         <div class="person_logo leg" :class="person.checked?'person_active':''" @click="handleClick(person.value)">人才</div>
                         <div class="project standard leg" :class="project.checked?'standard_active':''" @click="handleClick(project.value)">项目</div>
                   </div>
              </div>
            
        </div>
    </div>
</template>

<script>
import graph from './graph'
import json from "../../assets/js/2000.json";
export default {
 name:'introduction',
 data(){
    return {
       search:'',//搜索的值
       isSearch:false,//是否显示搜索框
        isfullScreen: false,
        graphData: {},
        isSelect: true,
        isLoading: true,
        personId: "2995e2be27c04a74b69a3f6223fd788a",
      
        paper: {
                name:'论文',
                value:"paper",
                checked:true,
                index:0,
       },
       award: {
            name:'奖励',
            value:'award',
            checked:true,
            index:1,
        },
        patent:{
                name:'专利',
               value:'patent',
                checked:true,
                index:2,
            },
        person: {
                name:'人才',
               value:'person',
                checked:true,
                index:3,
            },
        project:{
                name:'项目',
               value:'project',
                checked:true,
                index:4,
            },
       sectionLegend:['论文','专利','人才','奖励','项目'],//选中的图例
       personData:[],
       isMenu:false,//是否显示菜单
       paperContent:[],//论文数据
       personPatentData:[],//专利
       personRewardData:[],//奖励
       curPersonData:{
           id: "f7a8ee361696f6b1005f358b1a4b9182",
            orgName: "中国科学技术大学",
            personName: "潘建伟"
       },//当前展示的人
    }
 },
 watch:{
     search:{
          deep:true,
          handler(newval,oldval){
            if(newval !==''){
                window.Bus.$emit('switchlogo',true)
            }else{
                window.Bus.$emit('switchlogo',true)
            }
          }
     }
 },
 components:{graph},
 mounted(){
     this.handleSearch();
    //  this.getTalentPaperData();
    //  this.getPersonPatentData();
    //  this.getreward();
     this.getDetail();
 },
 methods:{
     //获取大图数据
     handleSearch() {
    
      this.isSelect = true; //控制输入框内容改变时是否发送请求
      this.isLoading = true;
     
    //   this.$Message.loading({
    //     content: "加载中，请稍后...",
    //     duration: 3
    //   });
      this.axios.get('/indexCon/queryGraph',{params:{personId:this.personId,type:this.sectionLegend.join(',')}}).then(res=>{
            // console.log(res);
             if(res.data.code =='200'){
                var data = res.data.data;
                 data.id = this.personId
                 this.graphData= data;
             }
      }).catch((error)=>{
            console.log(error)
      })
    

  
    },
    //搜索检索
      handleChange(e) {
         this.Bus.$emit('switch-off',false)//通知父页面关闭滚轮事件
        var that = this;
        var timer;
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            that.getRemend();
        },1000)
    },
    //切换选中示例
     handleClick(str){
           if(str =='paper'){
            this.paper.checked =!this.paper.checked;
        }else  if(str =='patent'){
            this.patent.checked =!this.patent.checked;
        }else  if(str =='person'){
             this.person.checked =!this.person.checked;
        }else  if(str =='award'){
            this.award.checked =!this.award.checked;
        }else  if(str =='project'){
             this.project.checked =!this.project.checked;
        }
         this.sectionLegend=this.filterData( [this.paper,this.patent,this.person,this.award,this.project]);
         this.handleSearch();
         
     },
     //过滤出选中的值
     filterData(arr){
        var legend = arr.filter(item=>{
            return item.checked;
         })
          
         legend = legend.map(item=>{
             return item.name
         })
        return legend;
     },
     //获取检索接口推荐数据
     getRemend(){
        var url=`/indexCon/searchPerson`;
        var data= {
            searchWord:this.search
        }
        
        this.axios.get(url,{params:data}).then(res=>{
            //   console.log(res);
              if(res.data.code =='200'){
                  this.isMenu = true;
                    this.personData = res.data.data;
                  
              }
        }).catch(error=>{
              console.log(error);
        })
     },
    //选中搜索的人员名称
    handleSelectName(item){
          this.personId = item.id;
           this.search = item.personName + ":" + item.orgName;
          this.isMenu = false;
          this.curPersonData = item;
         
           this.Bus.$emit('switch-off',true)//通知父页面开启滚轮事件
          this.handleSearch();
        //   this.getTalentPaperData();
        //    this.getPersonPatentData();
        //    this.getreward();
          this.getDetail();
    },
    //获取论文
   
    getTalentPaperData(){
        var url=`/portal/es/person/paper`;
            var data ={
                personId:this.personId,
            offset:0,
            limit:3
                
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
                                item.publishDate.slice(0, 4) +
                                "-" +
                                item.publishDate.slice(4, 6);
                            }
                        });
                        this.paperContent = data;
                     
                        this.total = res.data.count*1;
                        
                        
                    }
            })
    },
      //专利  
   getPersonPatentData(){
            var url=`/portal/es/person/patent`;
            var data ={
                personId:this.personId,
                offset:0,
                limit:3
            }
        
            this.axios.get(url,{params:data}).then(res=>{
                // console.log(res)
                if (res.data.data) {
                    let content = res.data.data.content;
                    this.personPatentData = content.map(item => {
                        item.applyDate =
                        item.applyDate.slice(0, 4) + " - " + item.applyDate.slice(4, 6);
                        item.awardDate =
                        item.awardDate.slice(0, 4) + " - " + item.awardDate.slice(4, 6);
                        return item;
                    });
                    this.total = res.data.count*1;
                    }
            })
    },
     //获得奖励
     getreward(){
          var url=`/portal/es/person/reward`;
            var data ={
                personId:this.personId,
                offset:0,
                limit:3
            }
        
            this.axios.get(url,{params:data}).then(res=>{
                // console.log(res)
                if (res.data.code == '200') {
                    let content = res.data.data.data;
                    this.personRewardData = content.splice(0,3);
                  
                    this.total = res.data.data.total*1;
                    }
            })
     },
     //跳转专利详情
     handleRouter(id){
          this.$router.push({
              path:'/results/patentdetail',
              query:{
                  patentId:id
              }
          })
     },
     //跳转人才详情
     handleDetail(id){
        
         this.$router.push({
                 name:'talentdetails',
                 query:{
                     personId:id
                 }
             })
     },
     //人员详情
     getDetail(){
        var url=`/indexCon/indexLeftPersonInfo`;
        var data ={
            personId:this.personId
        }
        this.axios.get(url,{params:data}).then(res=>{
           // console.log(res)
            if(res.data.code == '200'){
                 this.curPersonData = res.data.data.person;
                  this.personRewardData = res.data.data.reward.splice(0,3);
                  this.personPatentData = res.data.data.patent.slice(0,3);
                  this.paperContent = res.data.data.paper.slice(0,3);
            }
        })
     },
     //获取
 }
}
</script>

<style lang="scss" scoped>

.content{
     //height:calc(100% - 76px) ;
     display: flex;
    background: url(../../assets/image/index/01/bg/bg2.png) no-repeat;
     background-size: 100% 100%;
    //  margin-top: 20px;
   
    .person{
        width: 20%;
    }
    .graph{
       flex: 1;
       
     }
    .introductory{
          display: flex;
         justify-content: center;
          align-items: center;
          width: 20%;
         >div{
               margin: 5px 0;
               height: 70%;
                ul{
                    //  display: flex;
                     overflow: hidden;
                     li{
                         overflow: hidden;
                        
                           p,h2{
                                color:#fff;
                                line-height: 30px;
                                cursor: pointer;
                           }
                           p:hover,h2:hover{
                                color:#ffc509;
                           }
                           h2{
                               font-size:40px;
                               margin-bottom: 20px;
                           }
                         ol{
                            //  padding-left: 12px;
                              li{
                                  list-style: decimal;
                                  color: #636363;
                                  line-height: 30px;
                                  list-style: none;
                                  font-size: 10px;
                                  cursor: pointer;
                                  overflow: hidden;
                                  white-space: nowrap;
                                  text-overflow: ellipsis;
                               }
                             li:hover{
                                  color: #fff;
                             }
                         }
                     }
                     >li:first-child{
                          width: 60px;
                          margin-right: 20px;
                          display: flex;
                          justify-content: center;
                         align-items: flex-start;
                         float: left;
                         padding-top: 15px;
                     }
                }
                .line{
                    width: 50px;
                    border-bottom: 1px solid #636363 ;
                    margin: 20px 0;
                   margin-left: 2px;
                }
            }
         .person1{
                 display: block;
                width: 50px;
                height: 50px;
         }
         .paper1,.patent1,.reward1{
                 display: block;
                width: 35px;
                height: 40px;
         }
         
        }
    .oper{
         width: 20%;
        display: flex;
        align-items: center;
        justify-content:center;
        position: relative;
       .top{
            position: absolute;
            top: 10%;
            right: 20%;
            width:340px;
            height:60px;
             .search{
            
              width:100%;
             display: flex;
            justify-content: flex-end;
            align-items: center;
                .search_logo{
                     width: 40px;
                     height: 40px;
                }
                .input{
                   background: #ddd;
                    // padding: 0px 10px;
                    border-radius: 17px;
                    position: relative;
                    width: 100%;
                      transition: transform 500ms ease 0;
                    input{
                        border: none;
                        background: #ddd;
                        width: 100%;
                        
                    }
                    input:focus{
                        outline: none;
                        // border: 1px solid #ddd;
                        box-sizing: border-box;
                    }
                     .search_logo{
                        width: 20px;
                        height:20px;
                        position: absolute;
                        right: 14px;
                        top: 9px;
                    }
                    ul{
                        background: #fff;
                        position: absolute;
                        width:96%;
                        top: 44px;
                        left: 2%;
                        padding:5px;
                        max-height: 200px;
                        overflow: hidden;
                        overflow-y: auto;
                       
                        box-sizing: border-box;
                        border-radius: 4px;
                        box-shadow: 0 1px 6px rgba(0,0,0,.2);
                        li{
                              line-height: 40px;
                              cursor: pointer;
                              border-bottom:1px solid #ddd ;
                              overflow: hidden;
                             text-overflow:ellipsis;
                              white-space:nowrap;
                              padding: 0 5px;
                        }
                    }

                }
          }
        
       
       
       }
        .foot{
            position: absolute;
             right: 20%;
            bottom:20px;
            width:200px;
            .legend{
                 width:200px;
                >div{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 12px;
                }
            }
        }
        
    }
   
    .leg{
        display: flex;
        justify-content: center;
        align-items: center;
       cursor: pointer;
    }
    .paper{
        width:61px;
        height: 54px;
        background: url(../../assets//image/index/01/default.png) no-repeat;
        background-size:100% 100%;
        color: #BBB;
         position: absolute;
        top: 72%;
        left:75%;
        transform: translate(-100%, -50%);
    }
    .paper_active{
         background: url(../../assets//image/index/01/paper.png) no-repeat;
        color:#fff;
        background-size:100% 100%;
    }
     .award{
        width:61px;
        height: 54px;
        background: url(../../assets//image/index/01/default.png) no-repeat;
        background-size:100% 100%;
         color: #BBB;
         position: absolute;
        top:58%;
        left: 100%;
        transform: translate(-100%, -50%);
    }
    .award_active{
           background: url(../../assets//image/index/01/award.png) no-repeat;
          color:#fff;
           background-size:100% 100%;
    }
    .patent{
        width:61px;
        height: 54px;
        background: url(../../assets//image/index/01/default.png) no-repeat;
        background-size:100% 100%;
       color: #BBB;
       position: absolute;
         top: 29%;
        left: 100%;
        transform: translate(-100%, -50%);
    }
    .patent_active{
         background: url(../../assets//image/index/01/patent.png) no-repeat;
          color:#fff;
           background-size:100% 100%;
    }
    .person_logo{
        width:61px;
        height: 54px;
        background: url(../../assets//image/index/01/default.png) no-repeat;
        background-size:100% 100%;
        color: #BBB;
        position: absolute;
        top: 43%;
        left:75%;
        transform: translate(-100%, -50%);
        }
    .person_active{
        background: url(../../assets//image/index/01/person.png) no-repeat;
         color:#fff;
         background-size:100% 100%;
    }
    .standard{
        width:61px;
        height: 54px;
        background: url(../../assets//image/index/01/default.png) no-repeat;
        background-size:100% 100%;
       color: #BBB;
       position: absolute;
        top: 87%;
        left: 100%;
        transform: translate(-100%, -50%);
    }
    .standard_active{
          background: url(../../assets//image/index/01/standard.png) no-repeat;
           color:#fff;
         background-size:100% 100%;
    }
    .legend{
        position: relative;
       
        height: 200px;
    }
    
}

 @media screen  and (max-width:1366px){
     .content{
        .person{
             width: 30%;
        }
     }
 }
</style>