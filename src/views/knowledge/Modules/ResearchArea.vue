
<template>
  <div class="researchArea position">
    <i class="full-icon-small" @click="handleChange"></i>
    <div class="MyResearchArea">
      <div v-if="change" class="MyResearchArea" ref="MyResearchArea"></div>
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
                <div class="MyResearchArea" ref="MyResearchArea"></div>
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
import { fail } from "assert";
//引入d3
// import d3 from 'd3';
// import d3 from 'd3';

export default {
  data: () => ({
    contentData: {},
    change: true,
    myEcharts: null,
    clientHeight: ""
  }),
  props: ["data"],
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
          this.$refs.MyResearchArea.style.height =
            this.clientHeight - 250 + "px";
        } else {
          this.$refs.MyResearchArea.style.height = 300 + "px";
        }
        this.getGraph();
        clearTimeout(time);
      }, 100);
    },
    getGraph() {
      let nodes = [],
        links = [];
      if(JSON.stringify(this.contentData)!== JSON.stringify({})){
          this.contentData.forEach((item, index) => {
            let categories = [],
              color = this.getRandomColor();
            let itemStyle = {
              normal: {
                color: color,
                opacity: 0.8
              }
            };
            
            item.content.forEach(ele => {
              ele.id = ele.id + "-" + item.categorie;
              ele.symbolSize = (4 * Math.log(ele.size * 1)) / Math.log(2);
              ele.itemStyle = itemStyle;
              ele.value = ele.size * 1;

              //关系封装
              categories.push({
                source: `qw${index}`,
                target: ele.id
              });
            });
          
            // item.content.push();
            nodes.push.apply(nodes, [
              ...item.content,
              {
                id: `qw${index}`,
                name: item.categorie,
                size: 21,
                label: {
                  show: true,
                  color: color,
                  textBorderColor: "#fff",
                  textBorderWidth: 5,
                  textShadowColor: "#fff",
                  textShadowBlur: 8
                },
                itemStyle: itemStyle
              }
            ]);
            links.push.apply(links, categories);
          });
        }
      this.myEcharts = this.$echarts.init(this.$refs.MyResearchArea);
      this.myEcharts.showLoading();
      let option = {
        // backgroundColor: "#00091D",
        tooltip: {},

        series: [
          {
            type: "graph",
            layout: "force",
            data: nodes,
            links: links,
            animation: true,
            roam: true,
            draggable: true,
            focusNodeAdjacency: false,
            animationDurationUpdate: 10,
            animationDuration: 10,
            label: {
              emphasis: {
                show: false
              }
            },
            lineStyle: {
              color: "#fff"
            },
            force: {
              gravity: 0.8, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              repulsion: 32, //值越大则斥力越大
              edgeLength: 10
            }
          }
        ]
      };
      this.myEcharts.setOption(option, true);
      this.myEcharts.hideLoading();
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
.researchArea {
  .MyResearchArea {
    width: 100%;
    height: 300px;
  }
}
</style>