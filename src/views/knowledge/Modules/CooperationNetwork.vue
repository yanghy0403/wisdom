<template>
  <div class="cooperationNetwork position">
    <i class="full-icon-small" @click="handleChange"></i>
    <div v-if="change" class="MyCooperationNetwork" ref="MyCooperationNetwork"></div>
    <transition name="modal">
      <div v-if="!change">
        <div class="ivu-modal-wrap">
          <div class="ease-transition ivu-modal">
            <div class="ivu-modal-content">
              <a class="ivu-modal-close">
                <i class="ivu-icon ivu-icon-ios-close-empty"></i>
              </a>
              <div class="ivu-modal-header">
                <div class="ivu-modal-header-inner">{{title}}</div>
              </div>
              <div class="ivu-modal-body">
                <i class="full-icon-big" @click="handleChange"></i>
                <div class="MyCooperationNetwork" ref="MyCooperationNetwork"></div>
              </div>
              <div class="ivu-modal-footer">
                <!-- <button class="ivu-btn ivu-btn-text ivu-btn-large" type="button">
              <span>取消</span>
                </button>-->
                <button class="ivu-btn ivu-btn-large" type="button">
                  <span @click="handleChange">关闭</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data: () => ({
    contentData: {},
    myEcharts: null,
    change: true,
    clientHeight: ""
  }),
  props: ["data", "title"],
  watch: {
    data(newVal, oldVal) {
      this.contentData = newVal;
      this.getGraph();
    }
  },
  created() {
    this.contentData = this.data;
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    let that = this;
    window.onresize = function() {
      that.clientHeight = `${document.documentElement.clientHeight}`;
    };
    this.$nextTick(() => {
      this.getGraph();
    });
  },

  methods: {
    handleChange() {
      this.change = !this.change;
      let time = setTimeout(() => {
        if (!this.change) {
          this.$refs.MyCooperationNetwork.style.height =
            this.clientHeight - 250 + "px";
        } else {
          this.$refs.MyCooperationNetwork.style.height = 300 + "px";
        }
        this.getGraph();
        clearTimeout(time);
      }, 100);
    },
    getGraph() {
      this.myEcharts = this.$echarts.init(this.$refs.MyCooperationNetwork);
      this.myEcharts.showLoading();
      let repulsion = 25;
      if (!this.change) {
        repulsion = 50;
      }
      if (this.contentData.length) {
        let nodes = this.contentData.map((item, index, oldArr) => {
          let value = (5 * Math.log(item.size * 5 + 5)) / Math.log(8);
          item.symbolSize = value;
          item.value = value;
          item.draggable = true;

          if (item.id === oldArr[0].id) {
            item.itemStyle = {
              color: "#DA5A06",
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 5,
              shadowColor: "#DA5A06"
            };
            item.symbolSize = 30;
            item.label = {
              show: true
            };
          } else {
            let color = this.getRandomColor();
            item.itemStyle = {
              color: color
              // shadowBlur: 10,
              // shadowColor: color,
              // borderColor: "#fff",
              // borderWidth: 1
            };
            item.label = {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            };
          }

          return item;
        });

        let links = [];
        this.contentData.forEach((item, index, oldArr) => {
          links.push({
            source: oldArr[0].id,
            target: item.id,
            value: item.size
          });
        });

        // console.log(nodes);
        // console.log(links);

        let option = {
          // backgroundColor: "#00091D",
          tooltip: {
            show: false,
            formatter: function(item) {
              console.log(item);
              if (!item.data.source) {
                return `<div>${item.name}</div>`;
              }
            }
          },
          animationDuration: 0,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              type: "graph",
              layout: "force",
              data: nodes,
              links: links,
              animation: true,
              emphasis: {
                itemStyle: {
                  borderWidth: 2
                },
                lineStyle: {
                  color: "#D53A35",
                  width: 3
                }
              },
              roam: true,
              draggable: true,
              focusNodeAdjacency: true,

              force: {
                gravity: 0.1, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                repulsion: repulsion, //值越大则斥力越大
                edgeLength: 80
              }
            }
          ]
        };

        this.myEcharts.setOption(option, true);
        this.myEcharts.hideLoading();
      }
    },
    // 获取随机颜色
    getRandomColor() {
      return (
        "#" +
        ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(
          -6
        )
      );
    }
  },
  beforeDestroy() {
    this.myEcharts.clear();
  }
};
</script>
<style lang="scss" scoped>
.cooperationNetwork {
  .MyCooperationNetwork {
    width: 100%;
    height: 300px;
  }
}
</style>