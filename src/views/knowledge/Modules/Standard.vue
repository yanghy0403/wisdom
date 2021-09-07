<template>
  <div class="sc-tab-warp">
    <div class="sc-tab" v-for="(item,index) in paperContent" :key="index+'12'">
      <div class="tab-top">
        <h3>
          <a
            href="javascript:void(0);"
           
          >{{item.titleCn}}</a>
        </h3>
        <span>{{item.titleEn}}</span>
      </div>
      <div class="tab-middle">
        <p v-if="item.abstractCn">{{item.abstractCn?item.abstractCn:''}}</p>
        <p v-if="item.abstractEn">{{item.abstractEn?item.abstractEn:''}}</p>
      </div>
      
      <div class="tab-bottom">
        <p>
            中文关键词: <span v-for="(list,index) in item.keywordsCn" :key="index + 'C'">{{list.keyword}}</span>
        </p>
         <p>
            英文关键词: <span v-for="(list,index) in item.keywordsEn" :key="index + 'E'">{{list.keyword}}</span>
        </p>
        <p>
          
          <span>机构： <span v-for="(list,index) in item.organization" :key="index + 'J'">{{list.orgName}}</span></span>
          <!-- <span>发表时间：{{item.publishDate}}</span> -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Standard",
  data() {
    return {
      paperContent: []
    };
  },
  props: ["data"],
  watch: {
    data(newVal) {
      this.paperContent = newVal;
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
    min-height: 126px;
    .tab-top {
      display: flex;
      h3 {
        margin-right: 20px;
        font-weight: 700;
        color: #666666;
        font-size: 14px;
        a {
          display: inline-block;
          color: #29abe2;
        }
      }
    }
    .tab-middle {
      padding: 5px 0px;
      p {
        font-size: 14px;
        color: #656565;
        line-height: 20px;
         overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
      }
    //   p:first-child{
    //     overflow: hidden;/*超出部分隐藏*/
    // text-overflow:ellipsis;/* 超出部分显示省略号 */
    // white-space: nowrap;/*规定段落中的文本不进行换行 */
    //   }
    }
    .tab-bottom {
      margin-bottom: 10px;
      p {
        font-size: 12px;
        color: #aaa;
        line-height: 18px;
         overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
        span {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>

