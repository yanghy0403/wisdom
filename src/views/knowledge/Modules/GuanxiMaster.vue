
<template>
  <div class="master position">
    <i class="full-icon-small" @click="handleChange"></i>
    <div class="MyMaster">
      <div v-if="change" class="MyMaster" ref="MyMaster"></div>
    </div>
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
                <div class="MyMaster" ref="MyMaster"></div>
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
    myEcharts: null,
    change: true,
    clientHeight: ""
  }),

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
          this.$refs.MyMaster.style.height = this.clientHeight - 250 + "px";
        } else {
          this.$refs.MyMaster.style.height = 300 + "px";
        }
        this.getGraph();
        clearTimeout(time);
      }, 100);
    },
    getGraph() {
      this.myEcharts = this.$echarts.init(this.$refs.MyMaster);
      this.myEcharts.showLoading();
      let webkitDep = {
        nodes: [
          //展示的节点
          {
            name: "Michael R Lyu", //节点名称
            value: 1,
            category: 0, //与关系网类别索引对应，此处只有一个关系网所以这里写0
            symbolSize: 80,
            itemStyle: {
              color: "#F4E02E"
            },
            label: {
              normal: {
                fontSize: 18
              }
            }
          },
          {
            name: "Zibin Zheng",
            value: 1,
            category: 0,
            symbolSize: 40,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 10
            }
          },
          {
            name: "Swapna S Gokhale",
            value: 60,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Swapna S Gokhale",
            value: 60,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Swapna S Gokhale",
            value: 60,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Swapna S Gokhale",
            value: 60,
            category: 0,
            symbolSize: 10,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Swapna S Gokhale",
            value: 60,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Swapna S Gokhale",
            value: 60,
            category: 0,
            symbolSize: 70,
            itemStyle: {
              color: "#1AFCC6"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Zengling Xu",
            value: 10,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#1AFCC6"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Chinyu Huang",
            value: 10,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#1AFCC6"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Kaizhu Hang",
            value: 2,
            category: 0,
            symbolSize: 30,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Yangfan Zhou",
            value: 5,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "JungHua to",
            value: 2,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Edith C H Ngai",
            value: 4,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Peilin Zhao",
            value: 1,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Chuti Lin",
            value: 5,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#1AFCC6"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Hao Ma",
            value: 100,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#1AFCC6"
            },
            label: {
              fontSize: 12
            }
          },
          {
            name: "Lance Fiondella",
            value: 5,
            category: 0,
            symbolSize: 20,
            itemStyle: {
              color: "#FFAB4D"
            },
            label: {
              fontSize: 12
            }
          }
        ]
      };
      var option = {
        series: [
          {
            // itemStyle: {
            //   //图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
            //   borderType: "solid", //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
            //   borderColor: "#51be68", //设置图形边框为淡金色,透明度为0.4
            //   borderWidth: 2, //图形的描边线宽。为 0 时无描边。
            //   opacity: 1 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
            // },
            color: [
              "#a75de6",
              "#FF6A6A",
              "#3ca3f2",
              "#6568f1",
              "#66cb7b",
              "#f1c55a",
              "#076d9d"
            ],
            type: "graph",
            layout: "force",
            animation: false,
            label: {
              normal: {
                position: "inside",
                show: true,
                color: "#000",
                fontSize: 18
              }
            },
            draggable: true,
            data: webkitDep.nodes.map(function(node, idx) {
              node.id = idx;
              return node;
            }),
            categories: [
              //关系网类别，可以写多组
              {
                name: "网格关系", //关系网名称
                keyword: {},
                base: "网格关系"
              }
            ],
            force: {
              repulsion: [100, 150],
              edgeLength: [20, 80],
              gravity: 0.1
            },
            edges: [
              //节点之间连接
              {
                source: 0, //起始节点，0表示第一个节点
                target: 1, //目标节点，1表示与索引为1的节点进行连接
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 2,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 3,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 13,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 14,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 15,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 16,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 17,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 18,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 4,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 5,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 0,
                target: 6,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 1,
                target: 7,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 1,
                target: 8,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 1,
                target: 9,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 8,
                target: 10,
                value: 1000,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 2,
                target: 11,
                lineStyle: { color: "#FCDB88", width: 2 }
              },
              {
                source: 4,
                target: 12,
                lineStyle: { color: "#FCDB88", width: 2 }
              }
            ],
            lineStyle: {
              normal: {
                curveness: 0.5, //边的曲度，支持从 0 到 1 的值，值越大曲度越大。
                color: "#FCDB88",
                width: 2,
                opacity: 0.3
              },
              emphasis: {
                color: "#6ab7ff",
                opacity: 0.8
              }
            }
          }
        ]
      };
      this.myEcharts.setOption(option, true);
      this.myEcharts.hideLoading();
    }
  },
  beforeDestroy() {
    this.myEcharts.clear();
  }
};
</script>
<style lang="scss" scoped>
.master {
  .MyMaster {
    width: 100%;
    height: 300px;
  }
}
</style>