<template>
    <div class="list">
     
         <div class="person_details" v-if="personData.length>0">
              <div class="intro" v-for="(item,i) in personData" :key="i" >
                 <div class="content">
                         <div class="detail" @click="handleTodetail(item)">
                            <ul>
                              <li>
                                  <h2>{{item.chineseName}}</h2>
                                  <p class="org">{{item.currentOrganization}}</p>
                                    <p class="line"></p>
                                    <!-- <label>{{item.influenceScore}}</label>
                                    <span>影响力</span> -->
                                   
                              </li>
                              <li>
                                  <img src="../../../assets/image/knowledge/org/001.png" alt="">
                              </li>
                            </ul>
                      </div>
                       <div v-if="item.outstanding && item.outstanding.length>2" style="margin-top:15px">
                           <p  v-for="item in item.outstanding.slice(0,2)" :key="item.name">
                                 <span class="title">
                                  <img src="../../../assets/image/knowledge/person/personlist/title1.png" alt="">
                                {{item.name?item.name:'未知'}}
                                </span>
                           </p>
                        </div>
                         <div v-if="item.outstanding && item.outstanding.length<=2" style="margin-top:15px">
                            <p  v-for="item in item.outstanding" :key="item.name">
                                <span class="title">
                                <img src="../../../assets/image/knowledge/person/personlist/title1.png" alt="">
                              {{item.name?item.name:'未知'}}
                              </span>
                            </p>
                        </div>
                      <div class="filed">
                        
                            <span v-for="(each,index) in item.researchArea" :key="index">{{each.research_area}} / </span>
                      </div>
                 </div>
              </div>
             
         </div>
          <div v-if="personData.length==0" class="nodata">
              暂无数据
          </div>
    </div>
</template>

<script>
export default {
  name:'talentList',
  data(){
    return{
        
    }
  },
  props:['personData'],
  methods:{
    //跳转详情
       handleTodetail(item){
           this.$router.push({
              path:'/talentDetails',
              query:{
                  personId:item.personId
              }
           })
       }
  }
}
</script>

<style lang="scss" scoped>
.list{
  padding: 0 10px;
   flex-grow: 1;
  padding-right: 30px;
  .person_details{
   overflow: hidden;
  display: flex;
  flex-wrap: wrap;
     
  }
   .nodata{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
     }
 
}
  .intro{
   
     width: 25%;;
   
   // margin-bottom: 15px;
     .content{
        min-height: 350px;
      background: #fff;
      margin-right: 10px;
      margin-bottom: 14px;
      padding: 10px 20px;
      padding-bottom: 20px;
      // margin-left: 10px;
      box-shadow: 0 0px 1px rgba(0, 0, 0, 0.2);
      border-color: #eee;
         .detail{
        
          ul{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            li{
                h2{
                  font-weight: bolder;
                  font-size: 20px;
                }
               
                p.org{
                    min-height: 48px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    padding-right: 10px;
                }
                p:last-child{
                  margin-top: 30px;
                  margin-bottom: 20px;
                }
                label{
                  display:block;
                }
                span{
                    display:block;
                }
                img{
                    display:block;
                    width:140px;
                    height:180px;
                    padding-right: 5px;
                }
               
                .line{
                  border-top:1px solid #ddd;
                  width: 40px;
                   margin-bottom: 30px;
                }
            }
          }
         
     }
       .title{
           display: inline-block;
              // min-width:180px;
              height:34px;
             padding-right: 10px;
              line-height: 30px;
             font-size: 14px;
                color: #ffc509;
              //  display: flex;
                border: 2px solid #ffc509;
                border-radius: 9px;
                margin-bottom: 5px;
                align-items: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              img{
                  display: block;
                  width: 34px;
                  height: 34px;
                  margin-right: 10px;
                  border-top-left-radius: 5px;
                 border-bottom-left-radius: 5px;
                 float: left;
              }
  
            }
        }
      .content:hover{
          border:1px solid #ffc509;
          cursor: pointer;
        //  box-sizing: border-box;
      }
  }
  .intro:nth-child(4n){
        .content{
           margin-right: 0;
        }
     }
 
  @media screen and(max-width:1366px) {
     .intro{
        .content{
          .title{
           // padding-left: 50px;
          }
        }
        
     }
  }
</style>