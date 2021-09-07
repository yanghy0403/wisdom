<template>
  <div class="home">
     <section class="selection" ref="selection">
        <div class="default">
               <Header></Header>
                  <!-- <ul class="navindex">
                        <li :class="curindex ==0? 'active':''" @click="handleSwitch(0)"></li>
                        <li :class="curindex ==1? 'active':''" @click="handleSwitch(1)"></li>
                        <li :class="curindex ==2? 'active':''" @click="handleSwitch(2)"></li>
                        <li :class="curindex ==3? 'active':''" @click="handleSwitch(3)"></li>
                        <li :class="curindex ==4? 'active':''" @click="handleSwitch(4)"></li>
                        <li :class="curindex ==5? 'active':''" @click="handleSwitch(5)"></li>
                  </ul> -->
                  <div class="screen screen1"  v-if="curindex ==0">
                     <introduction></introduction>
                        <div class="info">
                              <ul>
                                    <li>
                                          <img src="../assets/image/index/01/统计信息/talent.png" alt="">
                                          <span>{{Data.personCount}}</span>
                                          <p>科技人才</p>
                                    </li>
                                    <li>
                                          <img src="../assets/image/index/01/统计信息/org.png" alt="">
                                          <span>{{Data.orgCount}}</span>
                                          <p>科技机构</p>
                                    </li>
                                    <li>
                                          <img src="../assets/image/index/01/统计信息/paper2.png" alt="">
                                          <span>{{Data.cnPaper}}</span>
                                          <p>中文论文</p>
                                    </li>
                                    <li>
                                          <img src="../assets/image/index/01/统计信息/patent.png" alt="">
                                          <span>{{Data.patentCount}}</span>
                                          <p>发明专利</p>
                                    </li>
                                    
                                    <li>
                                          <img src="../assets/image/index/01/统计信息/paper1.png" alt="">
                                          <span>{{Data.enPaper}}</span>
                                          <p>国际论文</p>
                                    </li>
                                     <li>
                                          <img src="../assets/image/index/01/统计信息/person.png" alt="">
                                          <span>{{Data.rewardCount}}</span>
                                          <p>奖励</p>
                                    </li>

                              </ul>
                        </div>
                  </div>
               <!-- <div class="screen" v-if="curindex ==1">
                  <earth></earth>
               </div>
               <div class="screen"  v-if="curindex ==2">
                     <person></person>
               </div>
               <div class="screen"  v-if="curindex ==3">
                     <team></team>
               </div>
                  <div class="screen"  v-if="curindex ==4">
                     <influence></influence>
               </div>
               <div class="screen"  v-if="curindex ==5">
                     <foot></foot>
               </div> -->
         </div>
     </section>
     <navmenu></navmenu>
  </div>


</template>

<script>
//  import '../utils/flexible'
import Header from '@/components/Header'
import navmenu from '@/components/Navmenu'
import introduction from './modules/introduction'
import earth from './modules/earth'
import person from './modules/person'
import team from './modules/team'
import influence from './modules/influence'
import foot from './modules/foot'
export default {
  name: "Home",
components: {
     navmenu,
     Header,
     introduction,
     earth,
     person,
     team,
     influence,
     foot
  },
  watch:{
     curindex(newval,oldval){
        
        if(newval ==5){
             this.$refs.selection.style.background = 'url(' + this.icon1 + ') no-repeat';
             this.$refs.selection.style.backgroundSize = '100% 100%';
             window.Bus.$emit('switchlogo',true)
        }else if(newval ==1){
            this.$refs.selection.style.background = 'url(' + this.icon2 + ') no-repeat';
             this.$refs.selection.style.backgroundSize = '100% 100%';
        }else if(newval ==0){
            this.$refs.selection.style.background = '#000000';
             window.Bus.$emit('switchlogo',true)
        }else if(newval ==2){
            this.$refs.selection.style.background = 'url(' + this.icon3 + ') no-repeat';
             this.$refs.selection.style.backgroundSize = '19% 100%';
        }else if(newval ==3){
            this.$refs.selection.style.background = 'url(' + this.icon4 + ') no-repeat';
             this.$refs.selection.style.backgroundSize = '19% 100%';
        }else if(newval ==4){
            this.$refs.selection.style.background = 'url(' + this.icon5 + ') no-repeat';
             this.$refs.selection.style.backgroundSize = '19% 100%';
        }
        if(newval ==0){
            window.Bus.$emit('switchTitle',true);
        }else{
           window.Bus.$emit('switchTitle',false);
        }
       
     }
  },
  data(){
     return {
          icon1: require("../assets/image/index/06/bg2.png"),
          icon2: require("../assets/image/index/02/bg2.jpg"),
          icon3: require("../assets/image/index/03/bg.png"),
          icon4: require("../assets/image/index/04/bg.png"),
          icon5: require("../assets/image/index/05/bg.png"),
          curindex:0,//默认第一屏选中
          switch:true,//控制鼠标滚轮事件
           Data:{},
     }
  },
  methods:{
      //点击对应导航切换logo
       handleSwitch(num){
          this.curindex =num;
          if(num ==2 || num ==3 || num ==4){
             window.Bus.$emit('switchlogo',false);
          }
       },
        //鼠标滚动切换分屏
       scrollFunc(){
        
         //   var  e = e || window.event;  
         //    if( e.wheelDelta &&e.wheelDelta>0 || e.detail && e.detail< 0 ){
         //         this.curindex--;
         //         if(this.curindex<=0){
         //             this.curindex = 0;
         //         }
         //    }else if( e.wheelDelta &&e.wheelDelta<0 || e.detail && e.detail> 0 ){
         //        this.curindex++;
         //         if(this.curindex>=5){
         //             this.curindex =5;
         //         }
         //        }
         //      if(this.curindex ==2 || this.curindex ==3 || this.curindex ==4){
         //          window.Bus.$emit('switchlogo',false);
         //       }
         //      var that =this;
         //      var timer = setTimeout(()=>{
         //            that.switch=true;
         //         },500)
          },
          //获取各种数据数量
      getData(){
          var url=`/indexCon/getStatisticCount`;
          this.axios.get(url).then(res=>{
              
               if(res.data.code =='200'){
                  this.Data = res.data.data;
                 
               }
          })
      },
      //获取传递过来的滚动事件
      switchoff(val){
        
          this.switch = val;
          this.mousewheel();
      },
      //绑定滚轮事件
      mousewheel(){
             var that = this;
             /*IE、Opera注册事件*/
            if(document.attachEvent){
                 document.attachEvent('onmousewheel',function(){
                     if(that.switch){
                          that.switch =false;
                          that.scrollFunc();
                     }
               });
         
            }
               //Firefox使用addEventListener添加滚轮事件  
            if (document.addEventListener) {//firefox  
               document.addEventListener('DOMMouseScroll',function(){
                     if(that.switch){
                          that.switch =false;
                          that.scrollFunc();
                      }
               },false);  
            }  


            //Safari与Chrome属于同一类型
                window.onmousewheel=document.onmousewheel=function(){
                   if(that.switch ==true){
                          that.switch =false;
                         that.scrollFunc();
                       
                     }
                }
      }
  },
  mounted(){
            
            var that =this;
          this.Bus.$on('switch-off',this.switchoff)
            that.getData();
            // that.mousewheel();
           window.resize= function(){
               location.reload();
          }
    }
};
</script>
<style lang="scss" scoped>

.home{
     display: flex;
     position: relative;
     
    .selection{
         width: 100%;
         height: 100vh;
         display: flex;
         background: #000000;
         .default{
            margin: 40px;
             width: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-bottom: 0;
         }
         .header{
            height:80px;
         }
        .screen{
             flex: 1;
              display: flex;
             flex-direction: column;
           .content{
                  flex: 1;
           }
        }
        
         .info{
               display: flex;
               justify-content: center;
               align-items: center;
                height:80px;
               ul{
                         display: flex;
                         width: 50%;
                     li{
                        flex: 1;
                        text-align: center;
                        img{
                           display:block;
                           width: 20px;
                           height: 20px;
                           margin: 0 auto;
                        }
                        span{
                           color: #ffc509;
                        }
                        p{
                           color:#636363;
                        }
                     }
                  }
              
         }
         .navindex{
              position: fixed;
              right: 42px;
             top:40%;
              height:200px;
              width: 10px;
              z-index: 10;
              li{
                  width:3px;
                  height:40px;
                  background: #636363;
                  margin:5px 0;
                  cursor: pointer;
              }

        }
       
     }
    .nav{
        position: fixed;
        top: 0;
        right: 0;
        z-index: 100;
    }
    
  }
 .active{
       background: #ffc509!important;
 }
 .white{
     background: #fff!important;
 }
 .foot{
   background: url(../assets/image/index/06/bg2.png) no-repeat!important;
    background-size: 100% 100%!important;

 }

 ::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

</style>
