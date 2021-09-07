<template>
    <div class="modules">
           <div v-for="(item,i) in List" :key="i" class="module" @click="handleRouter(item)">
                <div class="content">
                       <h3>{{item.chineseName}}</h3>
                        <p>申请人: {{item.applicant}}</p>
                        
                        <ul>
                            <li>
                                <p class="line"></p>
                                <p>申请日:{{item.applyDate}}</p>
                                <p>公告日:{{item.awardDate}}</p>
                                <p>发明人: <span v-for="item in item.inventor" :key="item.personId">{{item.personName+'; '}}</span></p>
                                <p>分类号：{{item.rankNo}}</p>
                            </li>
                            <li>
                                    <img :src="imgUrl+'?idx='+item.partNo+'&Ty=CNG&bg='" />
                                    <p v-if="item.patentType =='外观设计'" class="facade">{{item.patentType}}</p>
                                    <p v-if="item.patentType =='发明授权'" class="impower">{{item.patentType}}</p>
                                    <p v-if="item.patentType =='实用新型'" class="pract">{{item.patentType}}</p>
                                    <p v-if="item.patentType =='发明公布'" class="publish">{{item.patentType}}</p>
                            </li>
                        </ul>
                </div>
           </div>
    </div>
</template>

<script>
import API from "../../../../api/index.js";

export default {
 name:'patentImage',
 data(){
    return{
         imgUrl: 'http://45.121.55.212/bns/comm/getimg.aspx',
    }
 },
 props:['List'],
 methods:{
    handleRouter(item){
       this.$router.push({
             path:'/results/patentdetail',
             query:{
                 patentId:item.patentId
             }
         });
    }
 },  
  mounted(){
    
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
      width:25%;
       .content{
          height: 310px;
            margin-right: 10px;
            margin-bottom: 14px;
            padding: 10px 20px;
            padding-bottom: 20px;
            background:#fff;
            cursor: pointer;
            overflow: hidden;
            >p{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
       }
       .content:hover{
           border: 2px solid #ffc509;
       }
      
       h3{
           font-weight: bolder;
           font-size: 18px;
           line-height: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: 10px;
       }
     
       .line{
           width:80px;
           border-top: 1px solid #a3a3a3;
           line-height: 40px;
           margin-bottom: 20px;
       }
       ul{
            margin-top: 15px;
           display: flex;
           li:first-child{
               margin-right: 10px;
               width: 50%;
               p{
                   line-height: 26px;
                   overflow: hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 3;
			    -webkit-box-orient: vertical;
               }
               p:nth-child(3){
                     overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
               }
           }
           li:last-child{
               flex-direction: column;
               display: flex;
               justify-content: space-between;
               align-items: flex-end;
               width: 50%;
                img{
                    display: block;
                    margin-bottom: 20px;
                    width: 160px;
                    height: 160px;
                }
               p{
                  
                    height: 30px;
                    line-height: 30px;
                    text-align: right;
                    padding-right: 10px;
                    width: 100px;
               }
               p.facade{
                    background: url(../../../../assets/image/result/patent/facade.png) no-repeat;
                   background-size: 100% 100%;
                }
               p.impower{
                    background: url(../../../../assets/image/result/patent/impower.png) no-repeat;
                   background-size: 100% 100%;
                }
                 p.pract{
                    background: url(../../../../assets/image/result/patent/pract.png) no-repeat;
                   background-size: 100% 100%;
                }
                 p.publish{
                    background: url(../../../../assets/image/result/patent/publish.png) no-repeat;
                   background-size: 100% 100%;
                }
           }
       }
    }
     .module:nth-child(4n){
        .content{
           margin-right: 0;
        }
    }
    
}
@media screen and (max-width:1366px){
    .modules{
      .module{
          ul{
              li:last-child{
                  p{
                      padding-right: 5px;
                      width: 110px;
                  }
              }
          }
      }
    }
}
</style>