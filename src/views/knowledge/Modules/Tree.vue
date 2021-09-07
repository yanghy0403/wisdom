
<template>
  <div class="tree">
    <div class="treeTitle">
      <h3>Authors who most influenced Linda B.Buck:</h3>
      <h3>Authors most influenced by linda B.Buck:</h3>
    </div>
    <div id="MyTree" ref="MyTree"></div>
    <div class="treeList">
      <ul class="left">
        <li v-for="(item ,index) in dataList" :key="index+'n'">
          <span>{{item.name}}</span>
          <i>{{item.num}}</i>
        </li>
      </ul>
      <div class="middle">影响（人物）</div>
      <ul class="right">
        <li v-for="(item ,index) in dataList" :key="index+'m'">
          <i>{{item.num}}</i>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    configure:{
      marginTop:20
    },
    dataList: [
      { name: "Susan L. Sullivan", num: 112 },
      { name: "Nicholas J.P.Ryba", num: 8 },
      { name: "Kunio Kondoh", num: 7 },
      { name: "Andre Holley", num: 6 },
      { name: "Kozo Tsuchida", num: 5 }
    ]
  }),

  mounted() {
    this.$nextTick(() => {
      this.getGraph();
    });
  },
  methods: {
    getGraph() {
      let echarts = this.$echarts.init(this.$refs.MyTree);
      let data = {
        name: "flare",
        children: [
          { collapsed: true, name: "asdfas" },
          { collapsed: true, name: "sd23" },
          { collapsed: true, name: "s34d" },
          { collapsed: true, name: "sdqe" },
          { collapsed: true, name: "rfsd" }
        ]
      };
      const length = this.dataList.length;
      this.configure.marginTop=100/length;
      let option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },

        series: [
          {
            type: "tree",
            name: "tree1",
            data: [data],
            // symbol: "arrow",
            // symbolRotate: -90,
            top: "0",
            left: "21%",
            bottom: "0",
            right: "55%",

            symbolSize: 0,

            orient: "RL",

            label: {
              normal: {
                position: "left",
                verticalAlign: "middle",
                align: "right"
              }
            },

            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          },
          {
            type: "tree",
            name: "tree2",
            data: [data],
            // symbol: "arrow",
            // symbolRotate: -90,
            top: "0",
            right: "21%",
            bottom: "0",
            left: "55%",
            symbolSize: 0,
            orient: "LR",
            label: {
              normal: {
                position: "left",
                verticalAlign: "middle",
                align: "right"
              }
            },

            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };

      echarts.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.tree {
  position: relative;
  #MyTree {
    margin-top: 25px;
    width: 100%;
    height: 220px;
  }
  .treeTitle {
    position: absolute;
    top: -20px;
    padding: 0px 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 12px;
    }
  }
  .treeList {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    top: 0;
      height: 100%;
    .middle {
      position: relative;
      transform: translate(10px, 0px);
    }
    .middle:before {
      content: "";
      top: 0;
      left: -12px;
      position: absolute;
      display: inline-block;
      border: 10px solid transparent;
      border-left-color: #ccc;
    }
    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      li {
        flex-grow: 1;
        display: flex;
        align-items: center;
        span {
          width: 115px;
        }
        i {
          padding: 1px 5px;
          border-radius: 5px;
          background-color: #fcb431;
          margin-left: 10px;
          font-size: 12px;
        }
      }
    }
    .left {
      li {
        span {
          text-align: right;
        }
        i {
          margin-left: 10px;
        }
      }
    }
    .right {
      li {
        span {
          text-align: left;
        }
        i {
          margin-right: 9px;
          position: relative;
        }
        i:before {
          content: "";
          top: 4px;
          left: -12px;
          position: absolute;
          display: inline-block;
          border: 7px solid transparent;
          border-left-color: #ccc;
        }
      }
    }
  }
}
</style>
