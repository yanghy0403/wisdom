<template>
  <div>
  
    <div  class="sc-reward" v-for="item in contentData" :key="item.title">
      <h3>{{item.title?item.title:'未知'}}</h3>
      <div class="sc-div">
        <p>奖项类型：{{item.rewardType?item.rewardType:'未知'}}</p>
           <p>奖项等级：{{item.rewardRank?item.rewardRank:'未知'}}</p>
        <p>授奖机构：{{item.issuedBy?item.issuedBy:'未知'}}</p>
        <p>国籍：{{item.country?item.country:'未知'}}</p>
     
        <p>获奖时间：{{item.date?item.date:'未知'}}</p>
        <p>奖项来源：<a :href="item.source" target="_blank">{{item.source?item.source:'未知'}}</a></p>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: "foot",
  data() {
    return {
      contentData: []
    };
  },
  props: ["data"],
  watch: {
    data(newVal) {
     
      this.contentData = newVal;
    }
  },
  mounted() {
    this.contentData = this.data;
    
  }
};
</script>

<style lang="scss" scoped>
.sc-reward {
  margin: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  h3 {
    color: #29abe2;
    font-size: 15px;
  }
  .sc-div {
    display: flex;
    flex-wrap: wrap;
    p {
      min-width: 258px;
      margin-top: 10px;
    }
  }
}
</style>

