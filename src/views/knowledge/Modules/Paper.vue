<template>
  <div class="sc-tab-warp">
  
    <div class="sc-tab" v-for="(item,index) in paperContent" :key="index+'12'">
      <div class="tab-top">
        <h3>
          <a
            href="javascript:void(0);"
            @click="handleRouter(item.chineseTitle,'/paperdetails',item.achievementId)"
          >{{item.chineseTitle}}</a>
        </h3>
        <span>{{item.englisthTitle}}</span>
      </div>
     
      <div class="tab-middle">
        <p>{{item.abstractWords?item.abstractWords:''}}</p>
      </div>
       <div class="tab-bottom">
        <p>
          作者：<span v-for="(each,i) in item.authors" :key="i" style="margin-right:10px">{{each.personName}}</span>
      </p>
      </div>
      <div class="tab-bottom">
        <p>
          <span>关键词：{{item.keywords?item.keywords:'无'}}</span>
          <span>期刊： {{item.journal?item.journal:'无'}}</span>
          <span>发表时间：{{item.publishDate}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "paper",
  data() {
    return {
      paperContent: []
    };
  },
  props: ["data"],
  watch: {
    data(newVal) {
      this.paperContent = newVal;
     // console.log(this.paperContent)
    }
  },
  mounted() {
    this.paperContent = this.data;
    
  },
  methods: {
    //路由跳转
    handleRouter(name, path, id) {
      let positionArr = this.$store.state.variable.position.slice(0, 3);
      positionArr.push({
        pathName: "论文详情（" + name + "）",
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
    min-height:126px;
    overflow: hidden;
    .tab-top {
      display: flex;
      h3 {
      width: 100%;
        font-weight: 700;
        color: #666666;
        font-size: 14px;
        
        a {
            width: 100%;
          display: inline-block;
          color: #29abe2;
          white-space:nowrap;
         overflow:hidden;
        text-overflow:ellipsis;
        }
      }
    }
    .tab-middle {
      padding: 5px 0px;
      p {
        font-size: 14px;
        color: #656565;
        line-height: 20px;
        overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient: vertical;
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
        span:last-child{
          margin-right:0;
        }
      }
    }
  }
}
</style>

