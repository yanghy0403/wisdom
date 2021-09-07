<template>
  <div class="content">
        <ul>
            <li>
                  <h2>人才影响力</h2>
                  <span>INFLUENCE</span>
            </li>
            <li>
                <div class="every">
                        <h4>
                                <img src="../../assets/image/index/03/computer.png" alt="">
                                <span>计算机科学技术</span>
                        </h4>
                        <div class="person_detail">
                                <div class="detail">
                                    <ol>
                                        <li>
                                            <p>13450</p>
                                            <label>影响力</label>
                                        </li>
                                        <li>
                                                <p>陈俊良</p>
                                            <label>北京邮电大学</label>
                                        </li>
                                    </ol>
                                    <div>
                                            <div class="paper">2007</div>
                                            <div class="patent">91</div>
                                    </div>
                                </div>
                                <div class="img">
                                    <img src="../../assets/image/index/03/person.jpg" alt="">
                                </div>
                        </div>
                        <div class="field">
                                <p> 研究领域：计算机硬件技术;信息与通信网络技术;计算机应用;市场研究与信息;</p>
                        </div>
                        <div class="more">
                                <img src="../../assets/image/index/03/more1.png" alt="">
                                <span>了解更多</span>
                        </div>
                 </div>
            </li>
            <li>
                  <div class="every">
                        <h4>
                                <img src="../../assets/image/index/03/computer.png" alt="">
                                <span>计算机科学技术</span>
                        </h4>
                        <div class="person_detail">
                                <div class="detail">
                                    <ol>
                                        <li>
                                            <p>13450</p>
                                            <label>影响力</label>
                                        </li>
                                        <li>
                                                <p>陈俊良</p>
                                            <label>北京邮电大学</label>
                                        </li>
                                    </ol>
                                    <div>
                                            <div class="paper">2007</div>
                                            <div class="patent">91</div>
                                    </div>
                                </div>
                                <div class="img">
                                    <img src="../../assets/image/index/03/person.jpg" alt="">
                                </div>
                        </div>
                        <div class="field">
                                <p> 研究领域：计算机硬件技术;信息与通信网络技术;计算机应用;市场研究与信息;</p>
                        </div>
                        <div class="more">
                                <img src="../../assets/image/index/03/more1.png" alt="">
                                <span>了解更多</span>
                        </div>
                 </div>
            </li>
            <li>
                   <div class="every">
                        <h4>
                                <img src="../../assets/image/index/03/computer.png" alt="">
                                <span>计算机科学技术</span>
                        </h4>
                        <div class="person_detail">
                                <div class="detail">
                                    <ol>
                                        <li>
                                            <p>13450</p>
                                            <label>影响力</label>
                                        </li>
                                        <li>
                                                <p>陈俊良</p>
                                            <label>北京邮电大学</label>
                                        </li>
                                    </ol>
                                    <div>
                                            <div class="paper">2007</div>
                                            <div class="patent">91</div>
                                    </div>
                                </div>
                                <div class="img">
                                    <img src="../../assets/image/index/03/person.jpg" alt="">
                                </div>
                        </div>
                        <div class="field">
                                <p> 研究领域：计算机硬件技术;信息与通信网络技术;计算机应用;市场研究与信息;</p>
                        </div>
                        <div class="more">
                                <img src="../../assets/image/index/03/more1.png" alt="">
                                <span>了解更多</span>
                        </div>
                 </div>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
 name:'person',
}
</script>

<style lang="scss" scoped>

 .content{
    // height:calc(100% - 76px) ;
  
    ul{
       display: flex;
       height: 100%;
       
       li:first-child{
             width: 20%;
           flex-direction: column;
           display: flex;
           justify-content: center;
           align-items: center;
           box-shadow:none;
            color: #000000;
            h2{
                font-size: 32px;
            }
            span{
                    font-size:20px;
            }
       }
       >li:not(first-child){
           width:26.6%;
           box-shadow:6px 0px 5px -5px  #ddd;
         .every{
                 padding: 0 30px;
                 margin: 20px 0;
         }
           h4{
              padding-top: 50px;
               display: flex;
               justify-content: flex-start;
               align-items: center;
               img{
                 display: inline-block;
                width: 44px;
                height: 40px;
                padding-right: 5px;
               }
               span{
                      color: #ffc509;
                    font-weight: bold;
                    font-size: 18px;
               }
           }
           .person_detail{
                 display: flex;
                 justify-content: space-between;
                 align-items: flex-start;
                 margin-top: 20px;
                .detail{
                
                    ol{
                        li{
                            width: inherit;
                            border-bottom:1px solid #ddd ;
                             padding: 15px 0;
                            p{
                                 width: 100%;
                                 font-weight: bold;
                                 font-size: 14px;
                            }
                            label{
                                  width: 100%;
                                 display: block;
                                 font-size: 10px;
                                 color:#aba1a1 ;
                                 line-height: 26px;
                            }
                        }
                    }
                    >div{
                        margin-top:65px;
                         .paper{
                             background: url(../../assets//image/index/03/paper.png) no-repeat;
                             background-size: 80% 80%;
                             padding: 5px 25px;
                             padding-left: 30px;
                             margin: 10px 0;
                             line-height: 30px;
                             margin-top: 5px;
                         }
                         .patent{
                              background: url(../../assets//image/index/03/patent.png) no-repeat;
                               background-size: 80% 80%;
                             padding: 5px 25px;
                             padding-left: 30px;
                             margin: 10px 0;
                             line-height: 30px;
                             margin-top: 5px;
                         }
                    }
                }
                .img{
                  
                    img{
                        display: block;
                        width: 148px;
                        height: 248px;
                    }
                }
           }
           .field{
               margin-top: 20px;
               color: #aba1a1;
               
           }
           .more{
               display: flex;
               justify-content: flex-start;
               align-items: center;
               margin-top: 70px;
                color:#aba1a1 ;
               img{
                   width: 20px;
                   height: 20px;
                   display: block;
                   margin-right: 5px;
               }
           }
       }
      
    }
   
 }
 @media (min-width:1280px) and (max-width:1366px){
     .content{
        ul{
            >li:not(first-child){
                .every{
                    margin: 0;
                       h4{
                         padding-top:0px;
                        }
                        .person_detail{
                            padding-top: 20px;
                            .detail{
                                .paper,.patent{
                                    padding: 8px 25px!important;
                                    padding-left: 35px!important;
                                }
                            }
                        }  
                        .field{
                            p{
                                line-height: 30px;
                            }
                        }
                }
            }
        }
     }
 }
</style>