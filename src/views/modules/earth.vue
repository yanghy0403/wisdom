<template>
    <div class="content">
        <!-- 背景图 -->
        <!-- <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div> -->
        <!-- <div class="circle5"></div> -->
        <!-- <div class="circle6"></div>
        <div class="circle7"></div> -->
         <!-- 四个带光晕点点 -->
        <!-- <div class="point1"></div>
        <div class="point2"></div>
        <div class="point3"></div>
        <div class="point4"></div> -->
        <!-- 四个不带光晕的小点 -->
        <!-- <div class="point5"></div>
        <div class="point6"></div>
        <div class="point7"></div>
        <div class="point8"></div> -->
        <!-- 四条线 -->
        <!-- <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
        <div class="line4"></div> -->
        <!-- 合作网络知识趋势 -->
        <div class="coop point" >
             <h2>合作分析</h2>
             <ul>
                 <li :class="curindex1 ==0?'focus_left':''" @mouseenter="curindex1 =0" @mouseleave="curindex1 = -1">人才合作分析</li>
                 <li :class="curindex1 ==1?'focus_left':''" @mouseenter="curindex1 =1" @mouseleave="curindex1 = -1">机构合作分析</li>
             </ul>
             <p>给予人才、成果、项目等数据的关系进行人员和机构间的合作分析</p>
        </div>
        <div class="Internet point">
             <h2>网络挖掘</h2>
             <ul>
                 <li :class="curindex2 ==0?'focus_right':''" @mouseenter="curindex2 =0" @mouseleave="curindex2 = -1">人才网络挖掘</li>
                 <li :class="curindex2 ==1?'focus_right':''" @mouseenter="curindex2 =1" @mouseleave="curindex2 = -1">机构合作分析</li>
             </ul>
             <p>基于指定人才或者机构之间的项目、成果等进行网络挖掘分析</p>
        </div>
        <div class="knowledge point">
              <h2>知识查询</h2>
             <ul>
                 <li :class="curindex3 ==0?'focus_left1':''" @mouseenter="curindex3 =0" @mouseleave="curindex3 = -1">人员查询</li>
                 <li :class="curindex3 ==1?'focus_left1':''" @mouseenter="curindex3 =1" @mouseleave="curindex3 = -1">机构查询</li>
                <li :class="curindex3 ==2?'focus_left1':''" @mouseenter="curindex3 =2" @mouseleave="curindex3 = -1">学会查询</li>
                 <li :class="curindex3 ==3?'focus_left1':''" @mouseenter="curindex3 =3" @mouseleave="curindex3 = -1">成果查询</li>
             </ul>
             <p>基于合作关系紧密程度发现典型合作社区</p>
        </div>
        <div class="trend point">
             <h2>热点趋势</h2>
             <ul>
                 <li :class="curindex4 ==0?'focus_right':''" @mouseenter="curindex4 =0" @mouseleave="curindex4 = -1">热点趋势分析</li>
                 <li :class="curindex4 ==1?'focus_right':''" @mouseenter="curindex4 =1" @mouseleave="curindex4 = -1">热点词分析</li>
                <li :class="curindex4 ==2?'focus_right':''" @mouseenter="curindex4 =2" @mouseleave="curindex4 = -1">热点趋势预测</li>
                 
             </ul>
             <p>对热词概括及发展趋势进行分析并对领域内研究热点做出预测</p>
        </div>
    </div>
</template>

<script>
export default {
 name:'earth',
 data(){
    return {
        curindex1:-1,//默认合作分析没有划入效果
        curindex2:-1,//默认网络挖掘没有划入效果
        curindex3:-1,//默认知识查询没有划入效果
        curindex4:-1,//默认热点趋势没有划入效果
        
    }
 },
 methods:{

 }
}
</script>

<style lang="scss" scoped>
 .content{
      height:100%;
     display: flex;
    // background: url(/image/index/02/bg2.jpg) no-repeat;
     background-size: 100% 100%;
   //   margin-top: 20px;
     position: relative;

     .coop{
            position: absolute;
           left: 20%;
            top: 17%;
            width:218px;
            transform: translate(-37%, -50%);
            text-align: right;
            h2{
               padding-right: 14px;
                font-size: 20px;
            }
            ul{
               li{
                    line-height: 36px;
                   padding-right: 14px;
               }
            }
            p{
                    font-size: 10px;
                     padding-right: 14px;
            }
     }
      .Internet{
            position: absolute;
           right: 8%;
            top: 17%;
            width:218px;
            transform: translate(-66%, -50%);
            text-align: left;
            h2{
               padding-left: 14px;
                font-size: 20px;
            }
            ul{
               li{
                    line-height: 36px;
                    padding-left: 14px;
               }
            }
            p{
               font-size: 10px;
                padding-left: 14px;
            }
     }
      .knowledge{
            position: absolute;
            left: 16%;
            top: 53%;
              width:180px;
            transform: translate(-66%, -50%);
            text-align: right;
             h2{
               padding-right: 24px;
                font-size: 20px;
            }
            ul{
                margin-right: 14px;
               li{
                    line-height: 36px;
                    padding-right: 14px;
                
               }
            }
            p{
                    font-size: 10px;
                     padding-right:24px;
            }
     }
     .trend{
            position: absolute;
            right:3%;
            top: 54%;
              width:218px;
            transform: translate(-36%, -50%);
            text-align: left;
            h2{
               padding-left: 14px;
               font-size: 20px;
            }
            ul{
               li{
                    line-height: 36px;
                    padding-left: 14px;
               }
            }
            p{
               font-size: 10px;
                padding-left: 14px;
            }
     }
     .focus_left{
        // width:218px;
      width: 70%;
      margin-left: 30%;
       height:40px;
       background: url(../../assets/image/index/02/line_left.png) no-repeat center;
       background-size:100% 100%;
       
      //padding-right: 14px;
     }
     .focus_left1{
        // width:180px;
         width: 68%;
       margin-left: 32%;
       height:40px;
       background: url(../../assets/image/index/02/line_left.png) no-repeat right;
       background-size: 100% 100%;
       
       padding-right: 14px;
     }
      .focus_right{
       width:218px;
       height:40px;
       background: url(../../assets/image/index/02/line_right.png) no-repeat left;
       background-size: 100% 100%;
     }
 }
 @media (min-width:1280px) and(max-width: 1366px) {
    .content{
         .coop{
           width: 300px;
           left:18%;
           p{
               line-height: 24px;
           }
         }
         .knowledge{
             width: 260px;
         }
         .Internet{
             width: 300px;
             right: 1%;
         }
         .trend{
            width: 300px;
             right: -2%;
         }
    }
 }
</style>