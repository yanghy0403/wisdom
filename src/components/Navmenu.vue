<template>
      <div class="nav" v-show="isShow">
          <div class="top">
               <img src="../assets/image/index/01/off2.png" alt="" @click="handleClose">
          </div>
          <ul>
            <li>
               <h2 @click="handleRouter('Home')">首页</h2>
               <p>HOME</p>
            </li>
            <li>
                 <h2 @click="handleRouter('talent')">知识查询</h2>
                 <p></p>
            </li>
            <li>
                 <h2 @click="handleRouter('personsetting')">网络挖掘</h2>
                 <p></p>
            </li>
            <li>
                <h2 @click="handleRouter('trendanaly')">热点趋势</h2>
                 <p></p>
            </li>
            <!-- <li>
                <h2>态势感知</h2>
                 <p></p>
            </li> -->
            <li>
                  <h2 @click="handleRouter('securityaudit')" v-if="isper">管理审计</h2>
                   <h2 v-if="!isper">管理审计</h2>
                  <p></p>
            </li>
          </ul>
          <div class="bottom" >
             
                  <Dropdown style="margin:0 auto" >
                     <div style="display:flex;align-items:center;cursor: pointer;">
                           <!-- <img src="../assets/image/index/01/login2.png" alt="" > -->
                           <img src="../assets/image/index/01/login2.png" alt="" @click="handlelogin">
                          <p class="user" v-if="account != ''">{{account}}</p>
                     </div>
                    <DropdownMenu slot="list" v-if="islogin">
                        <DropdownItem @click.native="loginout"><Icon type="md-log-out" style="padding-right:5px"/> 退出登录</DropdownItem>
                      
                    </DropdownMenu>
                </Dropdown>
          </div>
      </div>
</template>

<script>
import permisson from '../utils/permisson'

export default {
    name:'Navmenu',
    data(){
    return{
            isShow:false,//默认是显示
            islogin:false,//登录状态
            isper:false,//判断是否有权限跳转系统管理
    }
    },
  computed:{
     account(){
         let user = this.$store.state.user;
        
          if(user != null && user.name != '' && user.name != null){
                this.islogin = true;
                return user.name;
          }else{
                this.islogin = false;
                return '';
          }
         
     }
  },
  methods:{
      handleClose(){
            this.isShow = false;
            window.Bus.$emit('closeMenu',true);
      },
      openMenu(data){
           this.isShow = data;
        
      },
      handleRouter(path){
          this.$router.push({name:path});
      },
      //登录
      handlelogin(){
        var url= `http://159.226.186.86/api/user/login`;
         window.location.href = url;
       
      },
      //退出登录
      loginout(){
         
            var url= `http://159.226.186.86/api/user/loginDelete?umtId=${this.$store.state.user.code}`;
             window.location.href = url;
             this.$store.dispatch('loginout');
      },
      //获取cookie
     getCookie() {
         var str = document.cookie;
        // var str = 'icas_api=杨海洋|1901594263@qq.com|84036b39505334dcd16313e7c76b9161';
        if(str&& str != ''&& str != null){
            var arr = str.split('=')[1].split('|');
            var user = {
                name:arr[0],
                account:arr[1],
                code:arr[2]
            }
            return user;
       } 
     }

    },
    mounted(){
           let persion = permisson.persion;
            window.Bus.$on('openMenu',(data)=>this.openMenu(data));
            var cookie = this.getCookie('icas_api');
           
            if(cookie != null && cookie != ''){
                  this.$store.dispatch('login',cookie)
            }
            if(sessionStorage.getItem('user')){
                  const role = JSON.parse(sessionStorage.getItem('user'));
                    let account = role.account;
                     if(persion.indexOf(account)>-1){
                           this.isper = true;
                     }else{
                         this.isper = false;
                     }
            }else{
                this.isper = false;
            }
    }

}
</script>

<style lang="scss" scoped>
.nav{
        width: 300px;
        background: #ffffff;
        height: 100vh;
       box-shadow: 0 0  10px #ddd;
        .top{
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            padding-bottom: 100px;
            img{
                margin-right: 20px;
                margin-top: 20px;
              display:block;
              width:22px;
              height:22px;
              cursor: pointer;
            }
        }
       >ul{
            // height: calc(100% - 320px);
            flex-direction: column;
            display: flex;
            justify-content: flex-start;
            align-items: center;
           li{
               text-align: left;
               width: 86px;
               font-weight: bold;
               padding-bottom: 20px;
               padding-top: 20px;
               cursor: pointer;
               border-bottom: 1px solid #dddddd;
               h2{
                  font-weight: bold;
                   font-size: 20px;
               }
               p{
                   font-size:20px;
               }
           }  
        }
        .bottom{
           padding-top: 80px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
           
            img{
                display: block;
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }
           .user{
               font-size: 20px;
              line-height: 40px;
             
               font-weight: bold;
           } 
           
            
        }
    }

</style>