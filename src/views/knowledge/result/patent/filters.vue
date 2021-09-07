<template>
      <div class="filter">
                      <div class="every">
                          <ol>
                              <li>
                                    <img src="../../../../assets/image/result/patent/patent.png" alt="">
                              </li>
                              <li>
                                   <div v-for="(item,i) in Data.patentType" :key="i" @click="handlepatentType(item.name)">
                                       <label>{{item.title}}</label>
                                       <span>{{item.value}}</span>
                                   </div>
                              </li>
                              
                          </ol>
                      </div>
                      <div class="every">
                             <ol>
                              <li>
                                    <img src="../../../../assets/image/result/patent/ipc.png" alt="">
                              </li>
                              <li>
                                   <div v-for="(item,i) in Data.subPartName" :key="i" @click="handlesubPartName(item.name)">
                                       <p>{{item.name}}</p>
                                       <span>{{item.value}}</span>
                                   </div>
                              </li>
                              
                          </ol>
                      </div>
                    <div class="every">
                             <ol>
                              <li>
                                    <img src="../../../../assets/image/result/patent/prive.png" alt="" >
                              </li>
                              <li>
                                   <div v-for="(item,i) in Data.province" :key="i" @click="handleprovince(item.name)">
                                       <p>{{item.name}}</p>
                                       <span>{{item.value}}</span>
                                   </div>
                              </li>
                              
                          </ol>
                      </div>
                </div>
</template>

<script>
export default {
 name:'filters',
 data(){
     return{
         Data:{},
         filter:{
             query_EQ_patentType:'',//专利类型
             query_EQ_subPartName:'',//ipc分类
             query_EQ_province:'',//省份
         }
     }
 },
 methods:{
     getFilter(data){
         this.Data = data;
        this.Data.patentType.forEach(item=>{
             
               if(item.name=='3'){
                   item.title = '外观设计'
               }else  if(item.name=='4'){
                   item.title = '发明公布'
               }else if(item.name=='5'){
                   item.title = '发明授权'
               }else if(item.name=='6'){
                   item.title = '实用新型'
               }else{
                   item.title = '其他'
               }
         })
        
     },
     handlepatentType(value){
          this.filter.query_EQ_patentType = value;
          window.Bus.$emit('reload',this.filter);
     },
     handlesubPartName(value){
          this.filter.query_EQ_subPartName = value;
         
           window.Bus.$emit('reload',this.filter);
     },
     handleprovince(value){
          this.filter.query_EQ_province = value;
        
           window.Bus.$emit('reload',this.filter);
     }
 },
 mounted(){
     window.Bus.$on('SetFilter',this.getFilter)
 }
}
</script>

<style lang="scss" scoped>
   .filter{
            margin:0 20px;
            height:420px;
            border:1px solid #3b3b3b;
            border-radius: 5px;
            margin-top: 30px;
            flex-direction: column;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .every{
                
                width:100%;
                 border-bottom:1px solid #3b3b3b;
               height: 33%;
                ol{
                     height: 100%;
                    display: flex;
                    li{
                        height: 100%;
                    }
                    li:first-child{
                       width:20%;
                       display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    li:nth-child(2){
                        width:70%;
                        padding: 0 10px;
                         overflow: auto;
                         height: 80%;
                          margin-top: 5%;
                          cursor: pointer;
                        div{
                            line-height: 26px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            p{
                                   width: 90%;
                                    height: 26px;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                            }
                        }
                    }
                    // li:last-child{
                    //     width:10%;
                    //     height:140px;
                    //     display: flex;
                    //     justify-content: center;
                    //     align-items: center;
                    //      position: relative;
                    //      .line{
                    //          width: 2px;
                    //          height: 80%;
                    //          background: #3b3b3b;
                    //          margin: 0 auto;
                    //      }
                    //      .scroll{
                    //          position: absolute;
                    //          top:10%;
                    //      }
                    // }
                
                }
           }
           
           
        }
::-webkit-scrollbar{
    display: none;
}
</style>