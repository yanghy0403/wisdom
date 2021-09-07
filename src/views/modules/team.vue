<template>
   <div class="content">
        <ul>
            <li>
                  <h2>团队影响力</h2>
                  <span>INFLUENCE</span>
            </li>
            <li>
                <div class="every" @mouseenter="handlemouseEnter(0)" @mouseleave="handlemouseLearve(0)">
                        <h4>
                                <img src="../../assets/image/index/04/logo1.png" alt="" v-if="ishover1" >
                                <img src="../../assets/image/index/04/logo1(2).png" alt="" v-if="!ishover1">
                        </h4>
                         <ol>
                            <li>
                                 <p>西安电子科技大学</p>
                                <label>团队机构</label>
                            </li>
                            <li>
                                    <p>焦李成</p>
                                <label>领军人物</label>
                            </li>
                        </ol>
                         <div class="mermber">
                              <span>团队主要成员</span>
                                <p> 张建、刘斌、张强、焦李成、张静静、张华、张静静、张华</p>
                        </div>          
                       
                        <div class="field">
                               <p> 电子通信技术;计算机软件;算法理论;计算机科学技术;人工智能</p>
                        </div>

                        <div class="more">
                                <img src="../../assets/image/index/04/more1.png" alt="" v-if="ishover1">
                                <img src="../../assets/image/index/04/more2.png" alt="" v-if="!ishover1">
                                <span>了解更多</span>
                        </div>
                 </div>
            </li>
            <li>
                <div class="every" @mouseenter="handlemouseEnter(1)" @mouseleave="handlemouseLearve(1)">
                       <h4>
                                <img src="../../assets/image/index/04/logo2.png" alt="" v-if="ishover2" >
                                <img src="../../assets/image/index/04/logo2(2).png" alt="" v-if="!ishover2">
                        </h4>
                         <ol>
                            <li>
                                <p>西安电子科技大学</p>
                                <label>团队机构</label>
                            </li>
                            <li>
                                    <p>焦李成</p>
                                <label>领军人物</label>
                            </li>
                        </ol>
                         <div class="mermber">
                              <span>团队主要成员</span>
                                <p> 张建、刘斌、张强、焦李成、张静静、张华、张静静、张华</p>
                        </div>          
                       
                        <div class="field">
                               <p> 电子通信技术;计算机软件;算法理论;计算机科学技术;人工智能</p>
                        </div>

                        <div class="more">
                                <img src="../../assets/image/index/04/more1.png" alt="" v-if="ishover2">
                                <img src="../../assets/image/index/04/more2.png" alt="" v-if="!ishover2">
                                <span>了解更多</span>
                        </div>
                 </div>
            </li>
            <li>
                  <div class="every" @mouseenter="handlemouseEnter(2)" @mouseleave="handlemouseLearve(2)">
                        <h4>
                                <img src="../../assets/image/index/04/logo3.png" alt="" v-if="ishover3" >
                                <img src="../../assets/image/index/04/logo3(2).png" alt="" v-if="!ishover3">
                        </h4>
                         <ol>
                            <li>
                                <p>西安电子科技大学</p>
                                <label>团队机构</label>
                            </li>
                            <li>
                                    <p>焦李成</p>
                                <label>领军人物</label>
                            </li>
                        </ol>
                         <div class="mermber">
                              <span>团队主要成员</span>
                                <p> 张建、刘斌、张强、焦李成、张静静、张华、张静静、张华</p>
                        </div>          
                       
                        <div class="field">
                               <p> 电子通信技术;计算机软件;算法理论;计算机科学技术;人工智能</p>
                        </div>

                        <div class="more">
                                 <img src="../../assets/image/index/04/more1.png" alt="" v-if="ishover3">
                                <img src="../../assets/image/index/04/more2.png" alt="" v-if="!ishover3">
                                <span>了解更多</span>
                        </div>
                 </div>
            </li>
            <li>
                  <div class="every" @mouseenter="handlemouseEnter(3)" @mouseleave="handlemouseLearve(3)">
                        <h4>
                                <img src="../../assets/image/index/04/logo4.png" alt="" v-if="ishover4">
                                <img src="../../assets/image/index/04/logo4(2).png" alt="" v-if="!ishover4">
                        </h4>
                         <ol>
                            <li>
                                <p>西安电子科技大学</p>
                                <label>团队机构</label>
                            </li>
                            <li>
                                    <p>焦李成</p>
                                <label>领军人物</label>
                            </li>
                        </ol>
                         <div class="mermber">
                              <span>团队主要成员</span>
                                <p> 张建、刘斌、张强、焦李成、张静静、张华、张静静、张华</p>
                        </div>          
                       
                        <div class="field">
                               <p> 电子通信技术;计算机软件;算法理论;计算机科学技术;人工智能</p>
                        </div>

                        <div class="more">
                                <img src="../../assets/image/index/04/more1.png" alt="" v-if="ishover4">
                                <img src="../../assets/image/index/04/more2.png" alt="" v-if="!ishover4">
                                <span>了解更多</span>
                        </div>
                 </div>
            </li>
        </ul>
  </div>
</template>
 
<script>
export default {
 name:'team',
 data(){
    return {
        ishover1:true,
        ishover2:true,
        ishover3:true,
        ishover4:true,
      
    }
 },
 methods:{
     //划入效果切换图标
      handlemouseEnter(num){
            
            this.ishover =false;
            if(num ==0){
                 this.ishover1 =false;
            }else if(num ==1){
                 this.ishover2 =false;
            }if(num ==2){
                 this.ishover3 =false;
            }if(num ==3){
                 this.ishover4 =false;
            }
      },
      //划出切换回默认图标
      handlemouseLearve(num){
         
           this.ishover1 =true;
           this.ishover2 =true;
           this.ishover3 =true;
           this.ishover4 =true;
      }
 }
}
</script>

<style lang="scss" scoped>
  .content{
      height: 100%;
        ul{
             display: flex;
             height: 100%;
             li{
                 width: 20%;
                 text-align: center;
                
             }
             li:first-child{
                    flex-direction: column;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow:none; 
                    color: #000000;
                    h2{
                        font-size: 32px;
                        line-height: 40px;
                    }
                    span{
                         font-size:20px;
                    }
             }
              >li:not(first-child){
                    box-shadow:6px 0px 5px -5px  #ddd;
                     color: #8c8c8c;
                     line-height: 26px;
                  .every{
                        padding: 0 20px;
                       margin: 20px 0;
                      h4{
                           margin-bottom: 20px;
                            img{
                                display: block;
                                width: 70px;
                                height: 70px;
                                margin: 0 auto;
                            }
                      }
                      ol{
                          li{
                              text-align: center;
                             width: inherit;
                            //  border-bottom:1px solid #ddd ;
                             padding: 15px 0;
                              p{
                                  font-weight: bolder;
                                  font-size: 17px;
                                  color: #000000;
                                  line-height: 40px;
                              }
                              label{
                                      color: #8c8c8c;
                                        padding-bottom: 20px;
                                        line-height: 40px;
                                        border-bottom: 1px solid #ddd;
                              }
                          }
                      }
                      .mermber{
                          margin: 50px 0;
                           line-height: 40px;
                      }
                      .more{
                           display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-top: 40px;
                            
                           img{
                                width: 20px;
                               height: 20px;
                               display: block;
                               margin-right: 5px;
                           }
                      }
                  }
              }
               >li:nth-child(3),>li:nth-child(4),>li:nth-child(5){
                    box-shadow:-30px 0px 5px -5px#F7F7F7;
                }
               >li:not(first-child):hover{
                   ol{
                      li{
                           p{
                                color:#ffc509;
                            }
                      }
                   }
                   .more{
                         span{
                             color: #000000;
                             font-weight: bold;
                         }
                   }
               }
        }
  }
  @media screen and(max-width:1366px){
      .content{
            ul{
              >li:not(first-child){
                //   .every{
                //         h4{
                //             margin-bottom: 0;
                //         }
                //         .mermber{
                //             margin: 10px 0;
                //         }
                //         ol{
                //             li{
                //                 label{
                //                     padding-bottom: 10px;
                //                 }
                //             }
                //         }
                //   }
              }
            }
      }
  }
</style>