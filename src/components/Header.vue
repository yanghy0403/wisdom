<template>
    <div class="header">
           <div class="logo">
              <img src="../assets/image/index/01/logo1.png" alt="" v-if="islogo">
              <img src="../assets/image/index/01/logo2.png" alt="" v-if="!islogo">
           </div>
           <div class="title" v-if="istitle">
               <h1>知识图谱与专家画像系统</h1>
               <!-- <p>知识图谱和专家画像系统</p> -->
           </div>
           <div class="logo_right">
                <img src="../assets/image/index/01/menu1.png" alt="" v-show="islogo" @click="handleClose" >
                <img src="../assets/image/index/01/menu2.png" alt="" v-show="!islogo" @click="handleClose">
           </div>
       </div>
</template>

<script>
export default {
name:'Header',
data(){
    return {
        isShow:true,//默认是隐藏的
        islogo:true,//默认展示白色的logo
        istitle:true,//默认显示标题
    }
},

methods:{
      closeMenu(data){
           this.isShow = data;
      },
      handleClose(){
          this.isShow =false;
           window.Bus.$emit('openMenu',true);
      },
      //切换logo
      switchlogo(data){
           this.islogo = data;
      },
     
      //切换标题
      switchTitle(data){
         this.istitle =data;
      }
},
mounted(){
      window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
       window.Bus.$on('switchlogo',(data)=>this.switchlogo(data));
      
       window.Bus.$on('switchTitle',(data)=>this.switchTitle(data));
    
}
}
</script>

<style lang="scss" scoped>
   .header{
            display: flex;
            justify-content: flex-start;
            align-content: center;
            >div{
                flex: 1;
            }
            .logo{
               img {
                   width: 61px;
                   height: 61px;
                   
                }
            }
            .title{
              text-align: center;
              color: #ffffff;
              h1{
                font-size: 36px;
              }
            }
            .logo_right{
                display: flex;
                justify-content: flex-end;
                align-items: flex-start;
                  img{
                        display: block;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                  }
            }
        }
        
</style>