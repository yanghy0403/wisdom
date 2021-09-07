<template>
  <div class="content" style=" height: 100%;display: flex;">
      <div class="title">
            <div>
                  <h2>影响力榜</h2>
                  <span>INFLUENCE</span>
            </div>
      </div>
      <div class="shuff">
           <swiper></swiper>
          
      </div>
  </div>
</template>

<script>
 import swiper from './swiper'
export default {
 name:'influence',
 data(){
    return {
        ishover4:true,
      
    }
 },
 components:{swiper},
 methods:{
     
 },
 mounted(){
     
 }
}
</script>

<style lang="scss"scoped>
ol li{
    list-style: none;
}
 .content{
    //  height: 100%;
    //  display: flex;
    //  margin-top: 20px;
     .title{
         width: 20%;
        //  flex-direction: column;
         display: flex;
         justify-content: center;
         align-items: center;
         h2{
             color: #000000;
             font-size: 32px;
         }
         span{
             font-size: 20px;
         }
     }
    .shuff{
        width: 80%;
       overflow: hidden; 
      height: 100%;
      
         
    }
 }
// @media screen and (max-width: 1366px){
//     .content{
//         margin-top: 0;
//         .shuff{
//             .every{
//                 h4{
//                     margin-bottom: 70px;
//                 }
//                 .more{
//                     margin-top: 70px;
//                 }
//             }
//         }
//     }
// }
</style>
