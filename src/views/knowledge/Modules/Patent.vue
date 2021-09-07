<template>
  <div class="sc-tab-warp">
    
    <div class="sc-tab" v-for="(item,index) in content" :key="index+'12'">
      <div class="tab-top">
        <h3>
          <a
            href="javascript:void(0);"
            @click="handleRouter(item.chineseName,'/paperdetails',item.achievementId)"
          >{{item.chineseName}}</a>
        </h3>
        <!--   <span>{{item.englisthTitle}}</span> -->
      </div>
      <div class="tab-top-list">
        <p>
          <span>申请人：{{item.applicant}}</span>
          <span>申请日：{{item.applyDate}}</span>
          <span>授权日： {{item.awardDate}}</span>
          <span>地址：{{item.address}}</span>
        </p>
        <p>
          <span>申请号：{{item.patentNo}}</span>
          <span>第三方编号：{{item.partNo}}</span>
          <span>地区： {{item.province}}</span>
        </p>
      </div>
      <div class="tab-middle">
        <span>摘要：</span>
        <p>{{item.abstractWords?item.abstractWords:'未知'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "patent",
  data() {
    return {
      content: []
    };
  },
  props: ["data"],
  watch: {
    data(newVal,oldval) {
       this.content = newVal;
       
    }
  },
  mounted() {
  
    this.content = this.data;
    
  },
  methods: {
    //路由跳转
    handleRouter(name, path, id) {
      let positionArr = this.$store.state.variable.position.slice(0, 3);
      positionArr.push({
        pathName: "专利详情（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { id } });
      this.$store.state.variable.backTop(); //后返回顶部
    }
  }
};
</script>

<style lang="scss" scoped>
.sc-tab-warp {
  padding-top: 10px;
  .sc-tab {
    padding: 0px 12px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
     min-height:110px;
    overflow: hidden;
    .tab-top {
      display: flex;
      h3 {
        margin-top: 5px;
        margin-right: 20px;
        font-weight: 700;
        color: #666666;
        font-size: 14px;
        margin-bottom: 5px;
        a {
          display: inline-block;
          color: #29abe2;
        }
      }
    }
     p{
       padding: 2px 0px;
      }
    .tab-top-list{
       overflow: hidden;
      text-overflow:ellipsis; 
      white-space: nowrap;
      span{
        margin-right: 30px;
      }
      span:last-child{
          margin-right:0;
        }
    }
    .tab-middle {
      display: flex;
      padding: 5px 0px;
      align-items: center;
     
      span {
        width: 7%;
      }
      p {
        width: 95%;
        font-size: 14px;
        color: #656565;
         overflow: hidden;/*超出部分隐藏*/
      text-overflow:ellipsis;/* 超出部分显示省略号 */
      white-space: nowrap;/*规定段落中的文本不进行换行 */
      }
    }
    .tab-bottom {
      margin-bottom: 10px;
      p {
        font-size: 12px;
        color: #aaa;
        line-height: 18px;
        span {
          margin-right: 20px;
        }
         
      }
    }
  }
}
@media screen and (max-width:1366px){
  .sc-tab-warp {
     .sc-tab {
      //  height: 100px;
       p{
          overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
       }
       .tab-middle {
         span{
            width:10%;
         }
       }
     }
  }
}
</style>

