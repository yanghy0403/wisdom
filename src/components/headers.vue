<template>
    <div class="header">
          
           <div class="logo_right">
               
                <img src="../assets/image/index/01/menu2.png" alt="" @click="handleClose" v-if="isShow">
           </div>
       </div>
</template>

<script>
export default {
name:'Header',
data(){
    return {
        isShow:true,//默认是隐藏的
       
    }
},

methods:{
      //关闭菜单打开导航logo
      closeMenu(data){
           this.isShow = data;
      },
      //打开导航关闭菜单按钮
      handleClose(){
          this.isShow =false;
           window.Bus.$emit('openMenu',true);
      },
     
},
mounted(){
      window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
     
      
    
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
                font-size: 32px;
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