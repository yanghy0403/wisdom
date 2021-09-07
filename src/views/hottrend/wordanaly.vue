<template>
  <div class="home">
    <div class="selection">
      <div class="sc_left">
        <div class="menu">
          <p>热点词分析</p>
          <ul>
            <li @click="handleRouter('trendanaly')">趋势分析</li>
            <!-- <li>|</li>
                       <li>领域查询</li>
                       <li>|</li>
                      <li @click="handleRouter('results')">成果查询</li> -->
          </ul>
        </div>

        <div class="sc_search">
          <input
            placeholder="请输入关键词：例如量子信息学"
            class="org search_org"
            v-model.trim="search"
            @keyup.enter="handleEnter"
            @input="handleEnter"
          />
          <div class="ivu-poptip-popper" v-if="tipIsShow">
            <div
              class="ivu-poptip-inner scrollbar"
              style="max-height: 200px; overflow: hidden; overflow-y: auto"
            >
              <ul v-if="contentData.length === 0">
                <li class="ivu-poptip-body">暂无匹配数据</li>
              </ul>
              <ul v-else>
                <li
                  class="ivu-poptip-body"
                  v-for="item in contentData"
                  @click="handleClickQuery(item)"
                  :key="item.id"
                  style="cursor: pointer"
                >
                  <span class="ivu-poptip-body-content-inner">{{
                    item.name
                  }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="button">
          <button @click="handleSearch">查询</button>
          <Icon type="md-refresh" @click="handlereset" />
        </div>
      </div>
      <div class="sc_right" ref="sc_right">
        <!-- <div class="header">
                         
                          <img src="../../assets/image/index/01/menu2.png" alt="" @click="handleClick" v-if="isShow">
                   </div> -->
       
        <Card title="关联热词" style="margin-top: 10px">
          <div class="module">
            <relevance :data="relevanceData"></relevance>
          </div>
        </Card>
        <Card style="margin-top: 10px" title="关联人才">
          <div class="module">
            <relevance :data="relevanceData1"></relevance>
          </div>
        </Card>
         <Card title="热点词变化趋势" style="margin-top: 20px">
             
          <div class="module">
            <brokenline :data="brokenData"></brokenline>
          </div>
        </Card>
        <Card style="margin-top: 10px" title="相关项目">
          <div class="paper_module" v-for="(item, i) in paperData" :key="i">
            <h3>{{ item.name }}</h3>
            <p>{{ item.abstract }}</p>
            <div class="details">
              <p>
                <span>关键词 :</span>
                <span v-for="(item, i) in item.keywords" :key="i"
                  >{{ item.keyword }} ;</span
                >
              </p>
              <p>
                <span>开始时间 :</span>
                <span>{{ item.startDate }}</span>
              </p>
              <p>
                <span>结束时间 :</span>
                <span>{{ item.endDate }}</span>
              </p>
               <p>
                <span>机构 :</span>
                <span v-for="(each,key) in item.org" :key="key">{{ each.orgName }}</span>
              </p>
            </div>
          </div>
        </Card>
        <div class="page">
          <Page
            :total="total"
            show-total
            show-sizer
            @on-change="handlePage"
            @on-page-size-change="handleSize"
          />
        </div>
         
      </div>
      <Tooltip content="导航栏" placement="left" class="menu_logo" v-if="isShow">
        <img
          src="../../assets/image/index/01/menu2.png"
          alt=""
          @click="handleClick"
         
          class="menulogo"
        />
      </Tooltip>
    </div>
    <navmenu></navmenu>
    <BackTop :bottom="100" @on-click="handleScroll(60)"></BackTop>
    <div class="fullscreen" @click="tipIsShow =false" v-if="tipIsShow"></div>
  </div>
</template>

<script>
import navmenu from "@/components/Navmenu";

import brokenline from "./module/turnpoint";
import relevance from "./module/relevance";
import relevancejson from "./json/relevance.json";
export default {
  name: "talent",
  data() {
    return {
      search: "量子信息", //搜索的关键词
      keywordId:'f3d8ae05125e471e9cb13c675b23a209',//关键词id
      page: 1,
      limit: 8,
      total: 0, //总条数
      isShow: true, //控制餐单的显隐
      brokenData: {}, //关键词数量变化趋势数据
      relevanceData: {}, //关联热词
     relevanceData1: {}, //关联人才
      paperData: [],
      scroll: false, //控制返回顶部按钮显隐
      tipIsShow: false, //控制推荐栏
      contentData: [], //推荐关键词数据
      modules:false,//控制模块展示
      broken:false,//热点词变化趋势
      TopNkeyword:false,//关联热词
      Topperson:false,//关联人才
    };
  },
  components: { navmenu, relevance, brokenline },
  methods: {
    //防抖
    handleEnter() {
      var that = this;
      var timer;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        that.handleQueryTip();
      }, 1000);
    },
    //关键词检索
    handleQueryTip() {
      var url = `/portal/graph/keyword/queryKeywordsList`;
      var data = {
        keyword: this.search,
        offset: 0,
        limit: 100,
      };
        this.tipIsShow = true;
         this.$nextTick(()=>{
            this.setWidth();
         })
      this.axios
        .get(url, { params: data })
        .then((res) => {
          if (res.data.code == "200") {
            this.contentData = res.data.data.content;
            
              
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    //设置推荐栏宽度
    setWidth() {
     
      var list = document.querySelector(".ivu-poptip-inner");
      list.style.width =
        document.querySelector(".search_org").offsetWidth + "px";
    },
       // 下拉查询
    handleClickQuery(item) {
      this.keywordId = item.id;
      this.search = item.name;
      this.tipIsShow = false;
     
    },
    //点击打开导航栏
    handleClick() {
      this.isShow = false;
      window.Bus.$emit("openMenu", true);
    },
    //关闭导航栏
    closeMenu(data) {
      this.isShow = data;
    },
    //查询列表数据
    handleSearch() {
        if(this.startdate !='' && this.enddate != '' && (this.startdate> this.enddate)){
              this.$Modal.error({
                  title:'消息警告',
                  content:"开始年份不允许大于结束年份，请重新填写"
              })
              this.startYear = '';
              this.endYear = '';
              return ;
          }
          this.getbroken();
          this.getTopNkeyword();
          this.getTableData();
          this.getTopNperson();
    },
    //重置
    handlereset() {
      this.search = "";
      this.handleSearch();
    },
   
    //跳转不同的导航
    handleRouter(path) {
      this.$router.push({ name: path });
    },
    //页数
    handleSize(num) {
      this.limit = num;
      this.getTableData();
    },
    //页码
    handlePage(num) {
      this.page = num;
      this.getTableData();
    },
    //获取热点词变化趋势
    getbroken() {
  
     var url =`/portal/graph/keyword/hotChangeTrend`;
      var data={
          keywordId:this.keywordId
      }
      this.axios.get(url,{params:data}).then(res=>{
         // console.log(res)
          if(res.data.code =='200'){
              this.brokenData = res.data.data;
           
          }
      })
    },
    //关联热词
    getTopNkeyword() {
     
      var url =`/portal/graph/keyword/relatedKeyword`;
      var data={
          keywordId:this.keywordId
      }
      this.axios.get(url,{params:data}).then(res=>{
        //   console.log(res)
          if(res.data.code =='200'){
              this.relevanceData = res.data.data;
              this.relevanceData.id = this.keywordId;
          }
      })
    },
     //关联人才
    getTopNperson() {
     
      var url =`/portal/graph/keyword/relatedPerson`;
      var data={
          keywordId:this.keywordId
      }
      this.axios.get(url,{params:data}).then(res=>{
        //   console.log(res)
          if(res.data.code =='200'){
              this.relevanceData1 = res.data.data;
              this.relevanceData1.id = this.keywordId;
          }
      })
    },
    //获取相关项目
    getTableData() {
        var url =`/portal/graph/keyword/relatedProjectList`;
      var data={
          keywordId:this.keywordId,
          limit:this.limit,
          offset:this.page -1
      }
      this.axios.get(url,{params:data}).then(res=>{
          // console.log(res)
          if(res.data.code =='200'){
              this.paperData = res.data.data.content.map(item=>{
                  return {
                       ...item,
                       endDate:item.endDate.substring(0,4) + '-' + item.endDate.substring(4,6) + '-' + item.endDate.substring(6,8),
                        startDate:item.startDate.substring(0,4) + '-' + item.startDate.substring(4,6) + '-' + item.startDate.substring(6,8),
                  }
              });
             this.total = res.data.count*1;
          }
      }).catch(error=>{
          console.log(error)
      })
    },
    //回到顶部
    handleScroll(step) {
      let div = document.querySelector(".sc_right");
      div.scrollTop -= step;
      if (div.scrollTop > 0) {
        var time = setTimeout(() => this.handleScroll(step), 15);
      } else {
        clearTimeout(time);
      }
    },
    //用来判断关东高度
    Scroll() {
      let el = document.querySelector(".sc_right");
      let backDiv = document.querySelector(".ivu-back-top");
      if (el.scrollTop > this.$height) {
        backDiv.style.display = "block";
      } else {
        backDiv.style.display = "none";
      }
    },
     //关闭遮罩
    handleOpen(str){
        this.modules = true;
         if(str =='broken'){
             this.broken = true;
          }else if(str =='TopNkeyword'){
             this.TopNkeyword = true;
          }else if(str =='Topperson'){
             this.Topperson = true;
          }
        //    var width = document.body.clientWidth || document.documentElement.clientWidth;
        //     if(width<=1366){
        //         this.coefficient = 55;
                
        //     }else{
        //     this.coefficient = 85;
        //     }
    },
    //关闭遮罩
    handleClose(str){
        this.modules = false;
         if(str =='broken'){
             this.broken = false;
          }else if(str =='TopNkeyword'){
             this.TopNkeyword = false;
          }else if(str =='Topperson'){
             this.Topperson = false;
          }
        //    var width = document.body.clientWidth || document.documentElement.clientWidth;
        //     if(width<=1366){
        //         this.coefficient = 55;
                
        //     }else{
        //     this.coefficient = 85;
        //     }
    },
  },
  mounted() {
    window.Bus.$on("closeMenu", (data) => this.closeMenu(data));
  
  
    this.getbroken();
    this.getTopNkeyword();
    this.getTopNperson();
    this.getTableData();
    window.resize = function () {
      window.reload();
    };
    this.$refs.sc_right.onscroll = this.Scroll;
  },
};
</script>

<style lang="scss" scoped>
.selection {
  display: flex;
  .sc_left {
    width: 20%;
    height: inherit;
    background: #000000;
    color: #939393;
    .menu {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 120px;
      margin: 0 20px;
      p {
        font-size: 24px;
        color: #ffc509;
        font-weight: bolder;
        margin-right: 5px;
        //  margin-left: 40px;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 20px;
        li {
          cursor: pointer;
          padding: 0 5px;
          font-size: 10px;
          color: #9d9d9d;
        }
      }
    }
    .sc_search {
      padding: 0 20px;
      input {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #000000;
        border-bottom: 2px solid #3b3b3b;
        color: #fff;
        padding-left: 5px;
        font-size: 12px;
      }
      ::-webkit-input-placeholder {
        color: #fff;
        font-size: 12px;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #fff;
        font-size: 12px;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #fff;
        font-size: 12px;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #fff;
        font-size: 12px;
      }
    }
    .sc_select {
      padding: 0 20px;
      margin-top: 10px;
      p {
        padding: 10px 0;
        /deep/.ivu-select-selection {
          border-radius: 20px;
          background-color: #3b3b3b;
          border: 1px solid #3b3b3b;
          text-align: center;
          font-size: 10px;
        }
        /deep/.ivu-select-selected-value {
          color: #fff;
          text-align: center;
          font-size: 10px;
        }
      }
    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      margin-top: 20px;
      button {
        width: 90px;
        height: 36px;
        line-height: 36px;
        background: #ffc509;
        text-align: center;
        border-radius: 20px;
        font-size: 18px;
        border: none;
        margin-right: 10px;
        font-weight: bold;
        cursor: pointer;
      }
      i {
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
  .sc_right {
    width: 80%;
    background: #f8f8f8;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: space-between;
    overflow-y: auto;
    padding: 0 20px;
    position: relative;
    .header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 90px;
      width: 100%;

      span {
        padding-left: 30px;
        font-size: 18px;
        font-weight: bold;
      }
      img {
        display: block;
        width: 28px;
        height: 26px;
        //  margin-right: 30px;;
      }
    }
    .page {
      height: 90px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 20px;
      width: 100%;
      .el-pagination {
        /deep/ .el-pager {
          li {
            background: none;
          }
        }
        /deep/ button {
          background: none !important;
        }
      }
    }
    .module {
      width: 100%;
      height: 500px;
    }
    /deep/ .ivu-card-head {
      background:#d8e8f7;
      
    }
    .year {
      margin-right: 20px;
      span {
        display: inline-block;
        /* padding: 0.03125rem; */
        border: 0.005208rem solid #b3a5a5;
        width: 30px;
        height: 26px;
        text-align: center;
        line-height: 26px;
        margin-right: 10px;
        cursor: pointer;
      }
      .active {
        border: 1px solid #3366cc;
        color: #3366cc;
      }
    }
    .paper_module {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      h3 {
        color: #29abe2;
        line-height: 30px;
        font-size: 14px;
      }
      > p {
        text-indent: 2em;
        font-size: 12px;
      }
      .details {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        p {
          margin-right: 20px;
          font-size: 12px;
          span {
            padding: 0 3px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
.nav {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
}
@media screen and (max-width: 1366px) {
  .selection {
    .sc_left {
      width: 20%;
      .menu {
        p {
          font-size: 32px;
        }
        ul {
          margin-left: 10px;
          li {
            padding: 0 2px;
            font-size: 10px;
          }
        }
      }
      .sc_search,
      .sc_select,
      .button {
        padding: 0 15px;
      }
      .sc_search {
        padding: 0 20px;
        input {
          font-size: 8px;
        }
        ::-webkit-input-placeholder {
          color: #fff;
          font-size: 8px;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #fff;
          font-size: 10px;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #fff;
          font-size: 10px;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #fff;
          font-size: 10px;
        }
      }
    }
    .sc-right {
      width: 80%;
    }
  }
}

.submenu::-webkit-scrollbar {
  /*滚动条整体*/
  width: 5px;
  height: 30px;
}
.submenu::-webkit-scrollbar-track {
  /*滚动条轨道*/
  background: #3b3b3b;
  border-radius: 2px;
}
.submenu::-webkit-scrollbar-thumb {
  /*滚动条里面的滑块*/
  background: #999;
  border-radius: 10px;
}
.submenu::-webkit-scrollbar-thumb:hover {
  /*滚动条鼠标事件，鼠标放上去出现的事件*/
  background: #999;
}
.submenu::-webkit-scrollbar-corner {
  /*滚动条边角*/
  background: #3b3b3b;
}
</style>
