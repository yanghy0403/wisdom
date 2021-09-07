<template>
  <div class="sc-tab-warp">
    <div class="sc-tab" v-for="(item,index) in content" :key="index+'12'">
         <h3 class="title">{{item.titleCn}}</h3>
         <p v-show="item.abstractCn!= '' && item.abstractCn!= null"><span class="column">中文摘要</span> ：{{item.abstractCn}}</p>
         <p v-show="item.abstractEn !='' && item.abstractEn !=null"><span class="column">英文摘要</span>：{{item.abstractEn}}</p>
         <p class="list">
            <span v-show="item.funding !='' && item.funding!= null">经费：{{item.funding}}&nbsp;万元</span>
            <span v-show="item.applicationNo !='' && item.applicationNo!= null">申请号：{{item.applicationNo}}</span>
            <span v-show="item.awardNo !='' && item.awardNo!= null">批准号：{{item.awardNo}}</span>
            <span v-show="item.ApproveYear !='' && item.ApproveYear!= null">批准年份：{{item.ApproveYear}}</span>
            <span v-show="item.startDate !='' && item.startDate!= null">
              开始时间：<span>{{item.startDate.substr(0,4)}}年</span> 
                       <span v-show="item.startDate.substr(4,2) !=='00'">{{item.startDate.substr(4,2)}}月</span>
                       <span v-show="item.startDate.substr(6,2) !=='00'">{{item.startDate.substr(6,2) }}</span>
             
              </span>
            <span v-show="item.endDate !='' && item.endDate!= null">
              结束时间：<span>{{item.endDate.substr(0,4)}}年</span> 
                       <span v-show="item.endDate.substr(4,2) !=='00'">{{item.endDate.substr(4,2)}}月</span>
                       <span v-show="item.endDate.substr(6,2) !=='00'">{{item.endDate.substr(6,2) }}</span>
            </span>
          </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "project",
  data() {
    return {
      content: []
    };
  },
  props: ["data"],
  watch: {
    data(newVal) {
      
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
    min-height: 126px;
     .list{
        >span{
       padding-right: 10px;
    }
     }
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
       overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
       .column{
           color: #4c4848;
          font-weight: bolder;
          font-size: 14px;
       }
      }
    .tab-top-list{
     
      span{
        margin-right: 30px;
      }
    }
    .tab-middle {
      display: flex;
      padding: 5px 0px;
      span {
        width: 5%;
      }
      p {
        width: 95%;
        font-size: 14px;
        color: #656565;
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
.title{
    color: #29abe2;
    font-size: 14px;
}
</style>

