<template>
  
        <div class="swiper">
              <div class="one" :class="curindex ==0? 'active':''" @click="handleClick(0)">
                  <div class="every">
                            <h4>
                                  <img src="../../assets/image/index/05/paper.png" alt="">
                                  <span>中文论文</span>
                            </h4>
                            <ul>
                                <li>
                                    <div>
                                         <img src="../../assets/image/index/05/one.png" alt="">
                                        <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                    </div>
                                      <span>5022570</span>
                                </li>
                                <li>
                                      <div>
                                            <img src="../../assets/image/index/05/two.png" alt="">
                                            <p>翻转课堂教学模式研究</p>
                                      </div>
                                      <span>46522570</span>
                                </li>
                                <li>
                                       <div>
                                            <img src="../../assets/image/index/05/three.png" alt="">
                                            <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                     
                                      <span>46522570</span>
                                </li>
                            </ul>
                            <ol>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                               <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                            </ol>
                              <div class="more">
                                <img src="../../assets/image/index/04/more1.png" alt="" v-if="ishover1">
                                <img src="../../assets/image/index/04/more2.png" alt="" v-if="!ishover1">
                                <span>了解更多</span>
                        </div>
                  </div>
              </div>
             <div class="one" :class="curindex ==1? 'active':''" @click="handleClick(1)">
                  <div class="every">
                            <h4>
                                  <img src="../../assets/image/index/05/paper.png" alt="">
                                  <span>中文论文</span>
                            </h4>
                            <ul>
                                <li>
                                    <div>
                                         <img src="../../assets/image/index/05/one.png" alt="">
                                        <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                    </div>
                                      <span>5022570</span>
                                </li>
                                <li>
                                      <div>
                                            <img src="../../assets/image/index/05/two.png" alt="">
                                            <p>翻转课堂教学模式研究</p>
                                      </div>
                                      <span>46522570</span>
                                </li>
                                <li>
                                       <div>
                                            <img src="../../assets/image/index/05/three.png" alt="">
                                            <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                     
                                      <span>46522570</span>
                                </li>
                            </ul>
                            <ol>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                               <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                            </ol>
                              <div class="more">
                                <img src="../../assets/image/index/04/more1.png" alt="" v-if="ishover2">
                                <img src="../../assets/image/index/04/more2.png" alt="" v-if="!ishover2">
                                <span>了解更多</span>
                        </div>
                  </div>
              </div>
               <div class="one" :class="curindex ==2? 'active':''" @click="handleClick(2)">
                  <div class="every">
                            <h4>
                                  <img src="../../assets/image/index/05/paper.png" alt="">
                                  <span>中文论文</span>
                            </h4>
                            <ul>
                                <li>
                                    <div>
                                         <img src="../../assets/image/index/05/one.png" alt="">
                                        <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                    </div>
                                      <span>5022570</span>
                                </li>
                                <li>
                                      <div>
                                            <img src="../../assets/image/index/05/two.png" alt="">
                                            <p>翻转课堂教学模式研究</p>
                                      </div>
                                      <span>46522570</span>
                                </li>
                                <li>
                                       <div>
                                            <img src="../../assets/image/index/05/three.png" alt="">
                                            <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                     
                                      <span>46522570</span>
                                </li>
                            </ul>
                            <ol>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                               <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                                <li>
                                      <div>
                                             <span>4</span>
                                             <p>中国省级物流资本存量股中介效应检验省级物流</p>
                                      </div>
                                      <span>3222544584</span>
                                </li>
                            </ol>
                              <div class="more">
                                <img src="../../assets/image/index/04/more1.png" alt="" v-if="ishover3">
                                <img src="../../assets/image/index/04/more2.png" alt="" v-if="!ishover3">
                                <span>了解更多</span>
                        </div>
                  </div>
            </div>
           
        </div>
 

</template>

<script>


// // import Swiper from 'swiper/swiper-bundle.min.js'
// import 'swiper/swiper-bundle.css'
export default {
 name:'swipers',
 data(){
    return {
        ishover1:false,
        ishover2:true,
        ishover3:true,
        swiperOption:{
            direction: 'horizontal',
            loop: true,
            autoplay: 5000,
            slidesPerView: "auto",
            centeredSlides:true,
            spaceBetween: 20,
        },
        curindex:0,
    }
 },
//  components:{Swiper, swiperSlide},
 methods:{
   
     handleClick(num){
           this.curindex = num;
           if(num ==0){
                 this.ishover1 = false;
                 this.ishover2 =true;
                 this.ishover3 =true;
           }else  if(num ==1){
                 this.ishover2 = false;
                  this.ishover1 =true;
                 this.ishover3 =true;
           }else if(num ==2){
                 this.ishover3 = false;
                  this.ishover2 =true;
                 this.ishover1 =true;
           }
     }
 },
 mounted(){
    
  }
}
</script>

<style lang="scss">

.swiper{
  width:100%;
  height: inherit;
  .one{
        float: left;
        width:20%;
        height: 100%;
        overflow: hidden;
        transition: all 0.8s;
       box-shadow:6px 0px 5px -5px  #ddd;
        cursor: pointer;
       padding: 30px;
      //  background: #fff;
  }
  .one.active{
        width:60%;
        height:100%;
        .every{
              width: 100%;
              height: 100%;
              li{
                    width: 100%;
              }
        }
  }
   .every{
            overflow: hidden;
            margin-top: 40px;
                h4{
                    display:flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-bottom: 70px;
                    img{
                        width: 40px;
                        height: 40px;
                        display: block;
                        margin-right: 5px;
                    }
                    span{
                        color: #ffc509;
                        font-size: 18px;
                    }
                }
                ul{
                    li{
                        line-height: 46px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color:#000000;
                        font-size: 14px;
                        font-weight: bold;
                        width: 600px;
                        >div{
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                              img{
                                    width: 30px;
                                    height: 30px;
                                    display:inline-block;
                                    margin-right: 13px;
                                }
                                p{
                                    color: #000000;
                                }
                        }
                        >span{
                            padding-right: 30px;
                        }
                    }
                }
                ol{
                    li {
                         display: flex;
                        justify-content: space-between;
                        align-items: center;
                        line-height: 40px;
                         width: 600px;
                       >div{
                             display: flex;
                            justify-content: flex-start;
                            align-items: center;
                             span{
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                background: #8c8c8c;
                                border-radius: 50%;
                                line-height: 20px;
                                text-align: center;
                                margin-right: 16px;
                                color: #fff;
                                margin-left: 3px;
                            }
                       }
                        >span{
                            padding-right: 30px;
                        }
                    }
                }
             .more{
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  margin-top: 70px;
                  
                  img{
                        width: 20px;
                        height: 20px;
                        display: block;
                        margin-right: 5px;
                  }
            }
  }
}
@media (min-width:1280px) and (max-width:1366px){
   .swiper{
      .one{
         padding-top: 0;
         .every{
            margin-top: 0;
             h4{
                 margin-bottom: 30px;        
             }
             .more{
                   margin-top: 30px;
             }
         }
      }
   }
}
</style>