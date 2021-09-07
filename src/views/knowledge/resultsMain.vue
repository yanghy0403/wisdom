<template>
<router-view></router-view>  
   <!-- <div class="home">
       <div class="selection">
             <div class="sc_left">
                 <div class="menu">
                      <div class="nav_menu">
                            <p>成果查询</p>
                            <ul>
                                <li @click="handleRouter('patent')">机构查询</li>
                                <li>|</li>
                                 <li>领域查询</li>
                                <li>|</li>
                                <li @click="handleRouter('talent')">人才查询</li>
                            </ul>
                      </div>
                 </div>
                 <div class="choose">
                     <div class="brush">
                           <ul>
                                <li @click="handleTab(0)" :class="curnav ==0 ? 'active':''">国内期刊</li>
                                <li @click="handleTab(1)" :class="curnav ==1 ? 'active':''">国内论文</li>
                                <li @click="handleTab(2)" :class="curnav ==2 ? 'active':''">国际论文</li>
                                <li @click="handleTab(3)" :class="curnav ==3 ? 'active':''">专利</li>
                            </ul>
                            <div class="search" v-if="curnav ==0">
                                 <div>
                                       <Select v-model="params.Select">
                                        <Option v-for="item in periodicalList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <input placeholder="请输入检索关键词" v-model="params.search"/>
                                 </div>
                            </div>
                             <div class="search" v-if="curnav ==1 || curnav ==2">
                                 <div>
                                       <Select v-model="params.Select">
                                        <Option v-for="item in resultList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <input placeholder="请输入检索关键词" v-model="params.search"/>
                                 </div>
                            </div>
                            <div class="search" v-if="curnav==3">
                               <div>
                                      <Checkbox-group v-model="params.checkArr" @on-change="checkGroupChange">
                                        <Checkbox label="4">发明公布</Checkbox>
                                        <Checkbox label="5">发明授权</Checkbox>
                                        <Checkbox label="6">实用新型</Checkbox>
                                        <Checkbox label="3">外观设计</Checkbox>
                                    </Checkbox-group>
                                    <Select v-model="params.Select">
                                        <Option v-for="item in resultList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <input placeholder="请输入检索关键词" v-model="params.search"/>
                               </div>
                            </div>
                     </div>
                 </div>
                  <div class="button">
                      <button @click="handleSearch">查询</button>
                       <Icon type="md-refresh" />
                </div>
                <filters1 v-if="curnav ==0"></filters1>
                 <filters2 v-if="curnav ==1"></filters2>
                <filters3 v-if="curnav ==2"></filters3>
                <filters4 v-if="curnav ==3"></filters4>
             </div>
             <div class="sc_right">
                   <journal v-if="curnav ==0"></journal>
                   <patent v-if="curnav ==3" :params="params"></patent>
                   <domestic-paper v-if="curnav ==1"></domestic-paper>
                   <international-paper v-if="curnav ==2"></international-paper>
             </div>
              <img src="../../assets/image/index/01/menu2.png" alt="" @click="handleClick" v-if="isShow" class="menulogo">
       </div>
        <navmenu></navmenu>
   </div> -->
</template>

<script>
// import journal from './result/journal/journal'
// import patent from './result/patent/patent'
// import internationalPaper from './result/internationalPaper/index'
// import domesticPaper from './result/domesticPaper/index'
// import filters1 from './result/journal/filters'
// import filters2 from './result/domesticPaper/filters'
// import filters3 from './result/internationalPaper/filters'
// import filters4 from './result/patent/filters'
// import navmenu from '@/components/Navmenu'
// import { log } from 'util'
// export default {
//  name:'results',
//  data(){
//     return{
//          periodicalList: [
//             {
//                 value: "刊名（曾用刊名）",
//                 label: "刊名（曾用刊名）"
//             },
//             {
//                 value: "主办单位",
//                 label: "主办单位"
//             },
//             {
//                 value: "出版地",
//                 label: "出版地"
//             },
//             {
//                 value: "ISSN",
//                 label: "ISSN"
//             },
//             {
//                 value: "CN",
//                 label: "CN"
//             }
//         ],//国内期刊筛选条件
//          isShow:true,//控制右上角的logo
//         curnav:0,//当前选中的导航下标
//           search :'',
//          resultList: [
//             {
//                 value: "主题",
//                 label: "主题"
//             },
//             {
//                 value: "作者",
//                 label: "作者"
//             },
//             {
//                 value: "关键词",
//                 label: "关键词"
//             },
//             {
//                 value: "摘要",
//                 label: "摘要"
//             },
//             {
//                 value: "篇名",
//                 label: "篇名"
//             },
//             {
//                 value: "单位",
//                 label: "单位"
//             },
//             {
//                 value: "刊名",
//                 label: "刊名"
//             }
//          ],
//          filterData:[],
//          params:{
//              checkArr:[],
//              Select:'',
//             search :'',
//          }
//     }
//  },
//  components:{
//      journal,
//      filters1,
//       filters2,
//      filters3,
//      filters4,
//      patent,
//      navmenu,
//      internationalPaper,
//      domesticPaper
//      },
//  methods:{
//       checkGroupChange(val) {
//         let string = "";
//         this.checkArr.forEach(item => {
//             string = string + "," + item;
//         });
//         this.checkQuery_EQ_patentType = string.slice(1, string.length);
//         // this.getPatentChoose();
//         },
//       //查询列表数据
//       handleSearch(){},
//       //Tab切换
//       handleTab(num){
//           this.curnav = num;
//         //   if(num ==0){
//         //       this.getjournal()
//         //   }else if(num ==1){
//         //       this.domesticPaper();
//         //   }
//       },
//       //国内期刊
//       getjournal(){
          
//       },
//       //国内论文
//       domesticPaper(){
//            var url=`/portal/es/achievement/domestic`
//             var data={
//                 query_EQ_language:'cn',

//             }
//       },
//        //点击打开导航栏
//       handleClick(){
//             this.isShow =false;
//            window.Bus.$emit('openMenu',true);
//       },
//       //关闭导航栏
//        closeMenu(data){
//            this.isShow = data;
//       },
//       handleRouter(path){
//          this.$router.push(path);
//       }
//  },
//  mounted(){
//       window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
//       if(this.$route.query && this.$route.query.type){
//         var type = this.$route.query.type;
//         if(type == 'journal'){
//             this.handleTab(0);
//           }else if(type == 'patent'){
//               this.handleTab(3);
//           }else if(type == 'demosticPaper'){
//               this.handleTab(1);
//           }else if(type == 'internationalPaper'){
//               this.handleTab(2);
//           }
//       }
//  }
// }
</script>

<style lang="scss" scoped>
 .selection{
     display: flex;
     .sc_left{
        
         .choose{
             display: flex;
             justify-content: center;
             align-items: center;
             margin: 0 20px;
             .brush{
                 width:100%;
                 display: flex;
                 justify-content: flex-end;
                 align-items: flex-start;
                 position: relative;
                 >ul{
                     width: 30%;
                     position: absolute;
                     left: 0;
                     top: 0;
                     z-index: 10;
                     >li{
                         height: 50px;
                         line-height: 50px;
                         text-align: center;
                         color: #909090;
                         background: #3b3b3b;
                         cursor: pointer;
                     }
                     li.active{
                         width:112px;
                         height: 50px;
                         background: url(../../assets/image/result/journal/active.png) no-repeat;
                         background-size: 100%;
                         color: #000000;
                         font-weight: bolder;
                     }
                 }
                 .search{
                     width: 70%;
                     height: 200px;
                     background:#1b1b1b;
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     margin-left: 10px;
                     >div{
                         width:80%;
                         input{
                                 height: 40px;
                                width: 100%;
                                margin-top: 20px;
                                background: #1b1b1b;
                                text-align: center;
                                border-bottom: 1px solid #909090;
                                color: #fff;
                                font-size: 14px;
                         }
                         /deep/.ivu-select-selected-value {
                                color:#fff;
                                text-align: center;
                            }
                            /deep/ .ivu-select-placeholder{
                                text-align: center;
                            }
                         /deep/ .ivu-checkbox-group{
                               display: flex;
                               flex-wrap: wrap;
                             .ivu-checkbox-group-item{
                                 margin-right: 0;
                                 width: 50%;
                             }
                         }
                     }
                 }
                 
             }
         }
         .button{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                margin: 20px 0;
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
                }
                i{
                font-size: 24px;
                }
        }
      
     }
     .sc_right{
         width: 80%;
         overflow-y:auto;
         .main{
             width: 100%;
             height: 100%;
             background: #f8f8f8;

         }
     }
 }
</style>