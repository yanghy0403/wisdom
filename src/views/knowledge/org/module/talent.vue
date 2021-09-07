<template>
    <div class="box">
          <div class="item" v-for="(item,i) in data" :key="i">
                <dl>
                    <dt>
                         <img src="../../../../assets/image/knowledge/org/001.png" alt="">
                    </dt>
                    <dd>
                          <p class="title">{{item.chineseName?item.chineseName:'未知'}}</p>
                          <!-- <p>影响力：{{item.influenceScore}}</p> -->
                          <div class="sc-tag">
                                <p v-if="item.researchArea">
                                    <span
                                    v-for="items in item.researchArea.slice(0,5)"
                                    :key="items.research_area"
                                    >{{items?items.research_area?items.research_area:'无':'无'}}</span>
                                </p>
                            </div>
                    </dd>
                </dl>
          </div>
    </div>
</template>

<script>
export default {
 name:'talent',
 data(){
      return{
          
      }
 },
 props:['data'],
 methods:{

 },
 mounted(){
      
 }
}
</script>

<style scoped lang="scss">
.box{
      .item{
        //   border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          margin: 0 10px;
          dl{
              padding:12px 0;
              display: flex;
              dt{
                  img{
                     width: 100px;
                    height: 120px;
                    cursor: pointer;
                    padding: 2px;
                    border: 1px solid #ddd;
                  }
              }
              dd{
                  margin-left: 20px;
                  .title{
                          font-weight: 650;
                            font-size: 16px;
                            color: #29abe2;
                            line-height: 24px;
                            margin-bottom: 10px;
                            display: -webkit-box;
                            display: -ms-flexbox;
                            display: flex;
                            -webkit-box-align: center;
                            -ms-flex-align: center;
                            align-items: center;
                            width: 100%;
                  }
                  .sc-tag{
                       p{
                           margin-top: 10px;
                           display: flex;
                           flex-wrap: wrap;
                           span{
                                   font-weight: 400;
                                    font-size: 12px;
                                    color: #1ABC9C;
                                    border: 1px solid #1abc9c;
                                    margin-right: 8px;
                                    padding: 2px 8px;
                                    border-radius: 3px;
                                    margin-bottom: 8px;
                                    -webkit-transition: all 0.5s;
                                    -o-transition: all 0.5s;
                                    transition: all 0.5s;
                           }
                       }
                  }
              }
          }
      }
}
</style>