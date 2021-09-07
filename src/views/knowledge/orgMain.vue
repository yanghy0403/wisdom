<template>
  <div class="home">
    <div class="selection">
      <div class="sc_left">
        <div class="menu">
          <p>机构查询</p>
          <ul>
            <li @click="handleRouter('talent')">人才查询</li>
            <li>|</li>
            <!-- <li>领域查询</li>
            <li>|</li> -->
            <li @click="handleRouter('results')">成果查询</li>
          </ul>
        </div>
        <div class="sc_search">
          <input placeholder="请输入机构名称" class="org" v-model="search" />
        </div>
        <div class="sc_select">
          <p>
            <!-- <span>领域类型:</span> -->
            <Select v-model="major" clearable placeholder="请选择研究方向">
              <Option
                v-for="item in majordata"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </p>
        </div>
        <div class="button">
          <button @click="handleSearch">查询</button>
          <Icon type="md-refresh" @click="handlereset" />
        </div>
        <div
          class="filter"
          v-if="
            (filterData.type && filterData.type.length > 0) ||
            (filterData.province && filterData.province.length > 0)
          "
        >
          <div
            class="every"
            v-if="filterData.type && filterData.type.length > 0"
          >
            <ol>
              <li>
                <img
                  src="../../assets/image/knowledge/person/personlist/org.png"
                  alt=""
                />
              </li>
              <li>
                <div
                  v-for="(item, i) in filterData.type"
                  :key="i"
                 
                  :class="typeindex == i ? 'active' : ''"
                >
                  <p  @click="handleClicktype(item, i)">{{ item.name }}</p>
                  <p>
                      <span>{{item.value.toLocaleString()}}</span>
                      <Icon type="ios-close-circle" v-if="typeindex ==i" @click="handleClosetype"/>
                      <i v-else></i>
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <div
            class="every"
            v-if="filterData.province && filterData.province.length > 0"
          >
            <ol>
              <li>
                <img
                  src="../../assets/image/knowledge/person/personlist/place.png"
                  alt=""
                />
              </li>
              <li>
                <div
                  v-for="(item, i) in filterData.province"
                  :key="i"
                 
                  :class="preindex == i ? 'active' : ''"
                >
                  <p  @click="handleClickpre(item, i)">{{ item.name }}</p>
                  <p>
                      <span>{{item.value.toLocaleString()}}</span>
                      <Icon type="ios-close-circle" v-if="preindex ==i" @click="handleClosepre"/>
                      <i v-else></i>
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="sc_right">
        <div class="header">
          <span>检索到{{ total.toLocaleString() }}个机构</span>
        </div>
        <div class="modules">
          <div class="modules_dtails">
            <div
              class="module"
              v-for="(item, i) in List"
              :key="i"
              @click="handleTodetail(item)"
            >
              <div class="details">
                <ul>
                  <li>
                    <!-- <h3>
                        <Tooltip :content="item.cnName" placement="top">
                            <span> {{ item.cnName ? item.cnName : "未知" }}</span>
                        </Tooltip>
                    </h3> -->
                      <Tooltip :content="item.cnName" placement="top" style="width: 100%;">
                            <h3> {{ item.cnName ? item.cnName : "未知" }}</h3>
                        </Tooltip>
                    
                    <p>机构</p>
                    <p class="line"></p>
                    <!-- <p>{{ item.influenceScore }}</p>
                    <p>机构影响力</p> -->
                    <!-- <p class="line"></p> -->
                  </li>
                  <li>
                    <img
                      src="../../assets/image/knowledge/org/org.png"
                      alt=""
                    />
                  </li>
                </ul>
                <p class="address">
                  {{ item.address ? item.address : "暂无地址信息" }}
                </p>
                <p class="talent">
                  杰出人才 :
                  <span v-for="(each, index) in item.basicPerson" :key="index"
                    >{{ each }} ;</span
                  >
                </p>
              </div>
            </div>
            <div v-if="List.length == 0" class="nodata">暂无数据</div>
          </div>
        </div>
        <div class="foot">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @size-change="handleSize"
            @current-change="handlePage"
            :current-page.sync="page"
          >
          </el-pagination>
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
  </div>
</template>

<script>
import navmenu from "@/components/Navmenu";
export default {
  name: "org",
  data() {
    return {
      search: "", //查询关键词
      filterData: {
        name: [],
        organizationName: [],
      },
      isShow: true, //控制右上角的logo
      List: [],
      total: 100,
      page: 1,
      limit: 8,
      major: "", //研究方向
      query_EQ_province: "", //所选省份
      query_EQ_type: "", //机构类型
      majordata: [], //研究方向数据
      typeindex: -1, //默认选中的类别
      preindex: -1, //默认选中的省份
    };
  },
  components: { navmenu },
  methods: {
    //点击打开导航栏
    handleClick() {
      this.isShow = false;
      window.Bus.$emit("openMenu", true);
    },
    //关闭导航栏
    closeMenu(data) {
      this.isShow = data;
    },
    handleRouter(path) {
      this.$router.push({ name: path });
    },
    //搜索数据
    handleSearch() {
      var url = `/portal/es/org/`;
      let obj = {
        offset: this.page - 1,
        limit: this.limit,
        "query_EQ_majors.major": this.major,
        query_EQ_province: this.query_EQ_province,
        query_EQ_type: this.query_EQ_type,
        query_EQ_cnName: this.search,
      };
      this.axios.get(url, { params: obj }).then((res) => {
        //   console.log(res);
        if (res.data.code == "200") {
          this.total = res.data.count * 1;
          this.List = res.data.data.content;
          this.filterData = res.data.groupFilter;
        }
      });
    },
    //页数
    handleSize(num) {
      this.limit = num;
      this.handleSearch();
    },
    //页码
    handlePage(num) {
      this.page = num;
      this.handleSearch();
    },
    //重置
    handlereset() {
      this.search = "";
      this.major = "";
      this.query_EQ_province = "";
      this.query_EQ_type = "";
      this.page = 1;
      this.limit = 8;
      this.typeindex = -1;
      this.preindex = -1;
      this.handleSearch();
    },
    //设置列表高度
    SetHeight() {
      //   var list = document.querySelector('.list');
      //   list.style.height = document.querySelector('.sc_right').offsetHeight - document.querySelector('.header').offsetHeight -document.querySelector('.page').offsetHeight + 'px';
      var select_dropdown = document.querySelectorAll(".ivu-select-dropdown");

      select_dropdown.forEach((item) => {
        item.style.width =
          document.querySelector(".ivu-select-single").offsetWidth + "px";
        item.style["overflow-x"] = "hidden";
      });
    },
    //获取研究方向
    getMajor() {
      var url = `/portal/es/org/major`;
      this.axios.get(url).then((res) => {
        if (res.data.code == "200") {
          this.majordata = res.data.data.map((item) => {
            return {
              label: item,
              value: item,
            };
          });
        }
      });
    },
    //选中左侧类别
    handleClicktype(item, i) {
      this.query_EQ_type = item.name;
      this.typeindex = i;
      this.handleSearch();
    },
     //重置左侧类别
    handleClosetype() {
      this.query_EQ_type = '';
      this.typeindex = -1;
      this.handleSearch();
    },
    //选择左侧省份
    handleClickpre(item, i) {
      this.query_EQ_province = item.name;
      this.preindex = i;
      this.handleSearch();
    },
    //重置左侧省份
    handleClosepre() {
      this.query_EQ_province = '';
      this.preindex = -1;
      this.handleSearch();
    },
    //跳转详情
    handleTodetail(item) {
      this.$router.push({
        path: "/orgDetails",
        query: {
          orgId: item.orgId,
        },
      });
    },
  },
  mounted() {
    window.Bus.$on("closeMenu", (data) => this.closeMenu(data));
    this.SetHeight();
    this.handleSearch();
    this.getMajor();
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
      justify-content:space-between;
      align-items: center;
      height: 120px;
      margin: 0 20px;
      p {
        font-size: 24px;
        color: #ffc509;
        font-weight: bolder;
        margin-right: 5px;
        //margin-left: 40px;
      }
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
          // margin-left: 10%;
        li {
          cursor: pointer;
          padding: 0 5px;
          font-size: 10px;
        }
      }
    }
    .sc_search {
      padding: 0 20px;
      margin: 20px 0;
      input {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #000000;
        border-bottom: 1px solid #3b3b3b;
        color: #fff;
        padding-left: 5px;
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
      margin-bottom: 60px;
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
      }
      i {
        font-size: 24px;
      }
    }
    .filter {
      margin: 0 20px;
      // height:420px;
      border: 1px solid #3b3b3b;
      border-radius: 5px;
      margin-top: 30px;
      flex-direction: column;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .every {
        width: 100%;
        border-bottom: 1px solid #3b3b3b;
        //    height: 50%;
        ol {
          height: 100%;
          display: flex;
          padding: 12px;
          li {
            height: 100%;
          }
          li:first-child {
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          li:nth-child(2) {
            width: 80%;
            overflow-y: auto;
            padding: 0 8px;
            div {
              line-height: 26px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;

              // p {
              //   width: 90%;
              //   height: 26px;
              //   overflow: hidden;
              //   text-overflow: ellipsis;
              //   white-space: nowrap;
              //   font-size: 10px;
              // }
              // span {
              //   margin-right: 12px;
              //   font-size: 10px;
              // }
            }
          }
          .active {
            color: #ffc509;
          }
        }
      }
    }
  }
  .sc_right {
    width: 80%;
    background: #f8f8f8;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .header {
      height: 90px;
      line-height: 90px;
      background: #f8f8f8;
      span {
        padding-left: 15px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .modules {
      flex-grow: 1;
      padding: 0 10px;
      .modules_dtails {
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        // height: 100%;
        .module {
          width: 25%;

          .details {
            min-height: 350px;
            background: #fff;
            margin-right: 10px;
            margin-bottom: 14px;
            padding: 10px 20px;
            padding-bottom: 20px;
            // margin-left: 10px;
            box-shadow: 0 0px 1px rgba(0, 0, 0, 0.2);
            border-color: #eee;
          }
          .details:hover {
            border: 2px solid #ffc509;
            cursor: pointer;
            box-sizing: border-box;
          }
          h3 {
            font-weight: bolder;
            font-size: 18px;
            line-height: 30px;
            overflow: hidden;
              white-space: nowrap;
                text-overflow: ellipsis;
                margin-top: 10px;
             span{
                 white-space: nowrap;
                text-overflow: ellipsis;
                margin-top: 10px;
             }
            cursor: pointer;
          }
          ul {
            display: flex;
            li:first-child {
              width: 50%;
              p {
                line-height: 30px;
              }
              .line {
                width: 40px;
                border-top: 1px solid #a3a3a3;
                line-height: 40px;
                margin: 10px 0;
              }
              .address {
                color: #949494;
              }
            }
            li:last-child {
              width: 50%;
              display: flex;
              justify-content: center;
              align-items: flex-start;
              img {
                display: block;
                width: 160px;
                height: 160px;
                margin-top: 10px;
              }
            }
          }
          .talent {
            // color: #cecece;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            min-height: 40px;
            span {
              padding-right: 10px;
            }
          }
        }
      }
    }
    .foot {
      height: 90px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}

@media (min-width: 1028px) and (max-width: 1366px) {
  .selection {
    .sc_left {
      // width:25%;
      .point {
        width: 300px;
      }

      .menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 120px;
        p {
          font-size: 22px;
          color: #ffc509;
          font-weight: bolder;
          margin-right: 5px;
          //     margin-left: 40px;
        }
        ul {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 0px;
          li {
            cursor: pointer;
            padding: 0 2px;
            font-size: 6px;
          }
        }
      }
      .sc_search{
          margin: 0;
      }
      .button{
          margin-bottom: auto;
      }
    //   .nav_menu {
    //     p {
    //       font-size: 16px;
    //     }
    //     ul {
    //       font-size: 12px;
    //     }
    //   }
    }
    .sc_right {
      // width:75%;
    }
  }
}
::-webkit-scrollbar {
  /*滚动条整体*/
  width: 5px;
  height: 30px;
}
::-webkit-scrollbar-track {
  /*滚动条轨道*/
  background: #3b3b3b;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面的滑块*/
  background: #999;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  /*滚动条鼠标事件，鼠标放上去出现的事件*/
  background: #999;
}
::-webkit-scrollbar-corner {
  /*滚动条边角*/
  background: #3b3b3b;
}
</style>