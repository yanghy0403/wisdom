<template>
  <div class="sc-warp">
    <section>
      <transition name="show">
        <ul class="sc-loading-ul sc-list">
          <li v-for="item in content" :Key="item.orgId">
            <div class="flex">
              <div class="sc-left" @click.stop="handleRouter('/taldetails',item.personId)">
                <img src="../../../assets/images/001.png" :alt="item.personName" />
              </div>
              <div class="sc-right">
                <h3>
                  <a
                    href="javascript:void(0);"
                    @click.stop="setPath(item.personName?item.personName:'未知','/taldetails',item.personId)"
                  >{{item.personName?item.personName:'未知'}}</a>
                </h3>
                <div class="sc-box">
                  <div class="sc-bottom">
                    <p style="margin-bottom:10px;">
                      <span>任职时间：{{item.time}}</span>
                    </p>
                    <p>
                      <span>任职机构：{{item.org}}</span>
                      <span>任职职务：{{item.title}}</span>
                      <span>社会机构：{{item.societyName}}</span>
                      <span>社会职务：{{item.societyJob}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </transition>
      <!-- <div class="loading-height">
        <Spin fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
        <div class="sc-box-content no-data border-bottom">暂无数据</div>
      </div>-->
    </section>
    <div class="sc-ivu-page">
      <Page
        @on-change="changePage"
        @on-page-size-change="changeSizePage"
        :total="total"
        show-elevator
        show-sizer
      />
    </div>
  </div>
</template>

<script>
import API from "../../../api/index.js";
export default {
  name: "work",
  components: {
  },
  data() {
    return {
      mark: 0,
      state: true,
      total: 0,
      loading: false,
      selectVal: "",
      content: [],
      dataAll:[],
      offset:0,
      limit:10
    };
  },
  props: ["data"],
  watch: {
    data(news, old) {
      this.handleData(news);
    }
  },
  created() {
    this.handleData(this.data);
  },
  methods: {
    handleData(news) {
      news.forEach(ele => {
        ele.time =
          ele.startTime.slice(0, 4) +
          "." +
          ele.startTime.slice(4, 6) +
          "." +
          ele.startTime.slice(6, 8) +
          " --- " +
          ele.endTime.slice(0, 4) +
          "." +
          ele.endTime.slice(4, 6) +
          "." +
          ele.endTime.slice(6, 8);
      });
      
      this.dataAll = news;
      this.total = news.length;
      this.content = news.slice(0,10);
    },
    changePage(event) {
      this.offset = event;
      this.changeList(this.offset, this.limit);
    },
    changeSizePage(event) {
      this.limit = event;
      this.changeList(this.offset, this.limit);
    },
    changeList(pageNo, pageSize) {
        let start = pageNo, end = pageSize;
        if (pageNo > 0) {
          start = (pageNo - 1) * pageSize;
          end = start + pageSize;
        };
        this.content = this.dataAll.slice(start, end);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/talentlist.scss";
ul.sc-list {
  li {
    margin-left: 10px;
    padding: 12px 0px;
    h3 {
      margin-top: 10px;
      padding-bottom: 10px;
    }
  }
}
</style>