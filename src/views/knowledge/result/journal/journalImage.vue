<template>
    <div class="modules">
         <div class="module" v-for="(item,i) in List" :key="i" @click="handleRouter('journaldetail',item)">
              <div class="details">
                      <ul>
                   <li>
                         <h3>{{item.chineseTitle}}</h3>
                         <p>{{item.record}}</p>
                         <p class="line"></p>
                         <ol>
                             <li>
                                  <span>复合影响因子</span>
                                  <span>{{item.complexImpact}}</span>
                             </li>
                              <li>
                                  <span>综合影响因子</span>
                                  <span>{{item.fullImpact}}</span>
                             </li>
                               <li>
                                  <span>被引数</span>
                                  <span>{{item.citation}}</span>
                             </li>
                         </ol>
                   </li>
                   <li>
                       <img src="../../../../assets/image/result/journal/journal.jpg" alt="">
                   </li>
               </ul>
              </div>
         </div>
    </div>
</template>

<script>
export default {
  name:'journalImage',
  data(){
    return{

    }
  },
  props:['List'],
  methods:{
      handleRouter(path){
         
          this.$router.push(path)
      }
  }
}
</script>

<style lang="scss" scoped>
 .modules{
     height: 100%;
     overflow: hidden;
     display: flex;
     flex-wrap: wrap;
     .module{
        
         width: 25%;
        
         .details{
              background: #fff;
            // width: 355px;
            min-height: 200px;
           margin: 10px;
            margin-bottom: 10px;
            cursor: pointer;
         }
         ul{
             display: flex;
             justify-content: space-between;
             align-items: flex-start;
             >li:first-child{
                 width: 50%;
                 padding: 10px;
                 padding-left: 15px;
                 h3{
                     font-size: 18px;
                     font-weight: bolder;
                     white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                 }
                 .line{
                     width: 60px;
                     border-top: 1px solid #a3a3a3;
                     margin: 20px 0;
                 }
                 ol{
                     li{
                         display: flex;
                         justify-content: space-between;
                         align-items: center;
                         line-height: 30px;
                         width: 100%;
                     }
                 }
             }
             li:last-child{
                 img{
                     display: block;
                     width: 150px;
                     height: 200px;
                 }
             }
         }
     }
     .module:nth-child(4n){
         margin-right: 0;
     }
 }
</style>