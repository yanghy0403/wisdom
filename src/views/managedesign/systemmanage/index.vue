<template>
    <div class="home">
          <div class="selection">
               <div class="sc_left">
                    <div class="menu">
                            <p>系统管理</p>
                            <ul>
                                <li @click="handleRouter('securityaudit')">安全审计</li>
                        
                            </ul>
                    </div>
                    <div class="tags">
                          <div class="user_manage">
                                <h2>用户管理</h2>
                                <ul>
                                    <li :class="navindex ===0 ?'active':''" @click="handleClickNav(0)">角色-权限管理</li>
                                    <li :class="navindex ===1 ?'active':''" @click="handleClickNav(1)">用户-角色管理</li>
                                </ul>
                          </div>
                         
                    </div>
               </div>
               <div class="sc_right">
                    <Tooltip content="导航栏" placement="left" class="menu_logo" v-if="isShow">
                        <img src="../../../assets/image/index/01/menu2.png" alt="" @click="handleClick"  class="menulogo">
                    </Tooltip>
                    <rightsmanage v-if="navindex ===0"/>
                    <rolemanage v-if="navindex ===1"/>
               </div>
             <navmenu></navmenu>
          </div>
    </div>
</template>

<script>
import navmenu from '@/components/Navmenu';
import rightsmanage from './rightsmanage'
import rolemanage from './rolemanage'
export default {
 name:'systemmanage',
 data(){
    return{
       navindex:0,//默认选中角色权限管理
      isShow:true,//控制餐单的显隐
    }
 },
   components:{navmenu,rightsmanage,rolemanage},
 methods:{
      //跳转不同的导航
      handleRouter(path){
           this.$router.push({name:path});
     },
     //切换导航
     handleClickNav(value){
          this.navindex = value;
     },
       //点击打开导航栏
      handleClick(){
            this.isShow =false;
           window.Bus.$emit('openMenu',true);
      },
      //关闭导航栏
       closeMenu(data){
           this.isShow = data;
      },
 },
 mounted(){
       window.Bus.$on('closeMenu',(data)=>this.closeMenu(data));
 }
}
</script>

<style lang="scss" scoped>

 .selection{
     display: flex;
     .sc_left{
         width:20%;
         height:inherit;
         background: #000000;
         color: #939393;
         .menu{
             display: flex;
             justify-content: flex-start;
             align-items: center;
             height:120px;
             margin: 0 20px;
            p{
                 font-size: 24px;
                 color:#ffc509;
                 font-weight: bolder;
                 margin-right: 5px;
                //  margin-left: 40px;
             }
            ul{
                display: flex;
                 justify-content: flex-start;
                align-items: center;
                margin-left: 20px;
                li{
                  cursor: pointer;
                  padding:0 5px;
                  font-size: 10px;
                  color: #9d9d9d;
                }
               
            }
         }
         .tags{
              margin: 40px 20px;
              h2{
                  font-size: 30px;
                  line-height: 40px;
                  margin-bottom: 10px;
              }
              ul{
                  li{
                      line-height: 30px;
                      font-size: 16px;
                      cursor: pointer;
                  }
              }
         }
     }
       .sc_right{
           width: 80%;
             overflow: hidden;
           overflow-y: auto;
       }
 }
 .active{
     color:#ffc509 ;
 }
</style>