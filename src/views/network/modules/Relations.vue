<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
export default {
  name: "relations-chart",
  data: () => ({
    ele: null,
    myEcharts: null,
    width: 600,
    height: 600,
  }),

  // 使用 props 传参
  props: ["content", "loading"],
  watch: {
    content(newval, oldval) {
      if (newval.nodes && newval.nodes.length > 0) {
        this.$nextTick(() => {
          this.setChart();
        });
      }
    },
  },

  methods: {
    setChart() {
      let ele = document.querySelector(".chart");

      // 动态获取盒子宽和高
      let width = ele.clientWidth || ele.offsetWidth;
      let height = ele.clientHeight || ele.offsetHeight;
      function random(m, n) {
        return Math.floor(Math.random() * (m - n) + n);
      }

      var data = this.content;
      //  var color = ["#f06122", "#73d5e3", "#6138fa", "#759653", "#f73d32"];
      // 转化categories数据封装格式
      data.categories = data.categories.map((item) => {
        return {
          name: item,
          icon:'circle'
        };
      });

      let symbolSize = 56; //固定节点大小
      data.nodes = data.nodes.map((item) => {
        item.symbolSize = 20; //随机节点大小
        switch (item.category) {
          case "人才":
            item.fixed = true;
            item.symbolSize = symbolSize;
            item.label = {
              fontSize: symbolSize * 0.25,
              show: true,
            };
            item.itemStyle = {
              color: "#F67A52",
            };

            break;
          case "机构":
            item.fixed = true;
            item.symbolSize = symbolSize;
            item.label = {
              fontSize: symbolSize * 0.25,
              show: true,
            };
            item.itemStyle = {
              color: "#F67A52",
            };

            break;
          default:
            break;
        }
        item.x = random(120, width - 120);
        item.y = random(50, height - 50);

        return item;
      });
      var arr = data.nodes.filter((item) => {
        return item.category == "人才" || item.category == "机构";
      });
      arr[0].x = 220;
      arr[0].y = height / 2;
      arr[arr.length - 1].x = width - 220;
      arr[arr.length - 1].y = height / 2;
      arr.forEach((item) => {
        data.nodes.forEach((each) => {
          if (item.id == each.id) {
            each = item;
          }
        });
      });
      this.myGraph(data);
    },
    myGraph(data) {
      let mychart = this.echarts.init(this.$refs.chart);
      var color = ["#f06122", "#73d5e3", "#6138fa", "#759653", "#f73d32"];
      let option = {
        color: color,
        legend: {
          top: 20,
          itemGap: 30,
          data: data.categories,
        },
        series: [
          {
            top: "15%",
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
            type: "graph",
            layout: "force",
            categories: data.categories,
            data: data.nodes,
            links: data.links,
            roam: true,
            draggable: false,
            focusNodeAdjacency: true,
            label: {
              normal:{
                  show:false
              },
              emphasis: {
                show: true,
              },
            },
            lineStyle: {
              normal: {
                width: 1,
                type: "solid",
              },

              emphasis: {
                width: 3,
              },
            },
            force: {
              repulsion: 500,
              gravity: 0.1,
            },
          },
        ],
      };
      mychart.setOption(option, true);
    },
  },
  mounted() {
    if (this.content.nodes && this.content.nodes.length > 0) {
      this.setChart();
    }
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
