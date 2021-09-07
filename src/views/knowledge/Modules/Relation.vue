
<template>
  <div class="relations position">
    <!-- <i class="full-icon-small" @click="handleChange"></i>
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
               
                <div class="MyRelation" ref="MyRelation">
                  <div
                    class="circle"
                    :style="'transform:translate(-'+configure.coreSize/2+'px, -'+configure.coreSize/2+'px); width:'+configure.coreSize+'px; height:'+configure.coreSize+'px;background-color: '+configure.coreBackgroundColor+';'"
                  >
                    <span class="circle-tip">{{mainprs}}</span>
                  </div>
                  <p
                    class="line active"
                    v-for="(item ,index) in circleData"
                    :key="index+'zx'"
                    :style="'transform: rotate('+item.rotate+'deg);background-color: '+configure.lineBackgroundColor+';'"
                  >
                    <i
                      :style="'margin-top: '+item.lineLong+'px;padding:'+configure.branchSize+'px;transform:translate(-'+configure.branchSize+'px,'+configure.branchSize+'px);background-color: '+configure.branchBackgroundColor+';'"
                    ></i>
                    <span
                      :class="[item.mark?'bottom':'']"
                      :style="'color:'+configure.textColor+';font-size:'+configure.textSize+'px;bottom: -'+configure.textPosition.x+'px;right: -'+configure.textPosition.y+'px;'"
                    >{{item.name}}</span>
                  </p>
                </div>
              </div>
              <div class="ivu-modal-footer">
              
                <button class="ivu-btn ivu-btn-large" type="button">
                  <span @click="handleChange">关闭</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition> -->
    <div class="MyRelation">
      <div class="MyRelation" ref="MyRelation" v-if="change">
        <!-- <div
          class="circle"
          :style="'transform:translate(-'+configure.coreSize/2+'px, -'+configure.coreSize/2+'px); width:'+configure.coreSize+'px; height:'+configure.coreSize+'px;background-color: '+configure.coreBackgroundColor+';'"
        >
          <span class="circle-tip">{{mainprs}}</span>
        </div> -->
        <div class="circle">
             <img src="../../../assets/image/knowledge/person/personlist/personlogo.png" alt="">
        </div>
        <p
          class="line active"
          v-for="(item ,index) in circleData"
          :key="index+'m'"
          :style="'transform: rotate('+item.rotate+'deg);background-color: '+configure.lineBackgroundColor+';'"
        >
          <i
            :style="'margin-top: '+item.lineLong+'px;padding:'+configure.branchSize+'px;transform:translate(-'+configure.branchSize+'px,'+configure.branchSize+'px);background-color: '+configure.branchBackgroundColor+';'"
          ></i>
          <span
            :class="[item.mark?'bottom':'']"
            :style="'color:'+configure.textColor+';font-size:'+configure.textSize+'px;bottom: -'+configure.textPosition.x+'px;right: -'+configure.textPosition.y+'px;'"
          >{{item.name}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    configure: {
      coreSize: 12, //圆心大小
      coreBackgroundColor: "#ffc509",
      branchSize: 5, //分支圆大小
      branchBackgroundColor: "#ffc509",
      lineBackgroundColor: "#ffc509", //连线颜色
      textColor: "#939393", //标题颜色
      textSize: 12, //字体大小
      textPosition: {
        x: -48,
        y: -4
      } //字体位置
    },
    number: 32, // 前 topN 个
    mainprs: "", //中心人物
    circleData: [],
    change: true,
    clientHeight: "",
    //coefficient: 85,
    isFadeing:false,//用来判断图形是用来展示默认的大小还是放大后的
  }),
  props: ["data", "coefficient"],
  watch: {
    data(newVal, oldVal) {
     
      this.newData = newVal;
     this.getGraph();
     
    }
  },
  mounted() {
   if(this.data.nodes){
        this.newData = this.data;
          this.getGraph();
     }
  
    
  },
  methods: {
    
    getGraph(val) {
 

      let nodes = this.newData.nodes;
      let links = this.newData.links;
      if(links.length>32){
          this.number = 32;
      }else{
          this.number = links.length;
      }
      links.sort(function(a, b) {
        return a.intimacy * 1 - b.intimacy * 1;
      });
      let content = links.slice(0, this.number);
    
      let length = content.length;
      let rotate = 360 / length;
      content.forEach((item, index, oldArr) => {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].personId === item.target) {
                oldArr[index].name = nodes[i].chineseName;
          }
        
        }
        
        if (this.strlen(oldArr[index].name) <= 4) {
          oldArr[index].mark = true;
        }
        oldArr[index].lineLong =
          (this.coefficient * Math.log(oldArr[index].intimacy + 5)) /
          Math.log(7);
        oldArr[index].rotate = 180 + rotate * index;
      });
      this.circleData = content;
        

      for (let index = 0; index < nodes.length; index++) {
        if (nodes[index].personId === links[0].source) {
          this.mainprs = nodes[index].chineseName;
        }
      }
    },
    strlen(str) {
      let len = 0;
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
        } else {
          len += 2;
        }
      }
      return len;
    },
   
  }
};
</script>
<style lang="scss" scoped>
.relations {
  height: 100%;
  .MyRelation {
    position: relative;
    width: 100%;
    height: 100%;
    .circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // width: 20px;
      // height: 20px;
      border-radius: 100px;
      background-color: #ccc;
      z-index: 2;
      .circle-tip {
        display: inline-block;
      width: 130px;
      text-align: center;
        color: rgb(55, 126, 184);
        transform: translate(-57px, 18px);
      }
      img{
        border-radius: 50%;
        display: block;
      }
    }

    > p.line {
      position: absolute;
      background-color: #666;
      top: 50%;
      left: 50%;
      width: 2px;
      transform-origin: center top;
      transform: rotate(180deg);
      i {
        padding: 10px;
        display: inline-block;
        margin-top: 50px;
        border-radius: 100px;
        background-color: red;
        transform: translate(-10px, 0px);
      }
      span {
        position: absolute;
        bottom: -40px;
        right: -4px;
        display: block;
        width: 10px;
        font-size: 12px;
        font-weight: 300;
        line-height: 1.1;
        text-align: right;
        transform: rotate(-180deg);
        // transform: translate(-2px, -2px);
        // word-wrap: break-word; /*英文的时候需要加上这句，自动换行*/
      }
      .bottom {
        bottom: -30px;
      }
    }
    > p.active:hover {
      background-color: #ffc509 !important;
      i {
        background-color: #ffc509 !important;
      }
    }
  }
}
@media screen and (max-width:1366px){
   .relations{
      .MyRelation{
        >p.line{
           .bottom{
               bottom:-44px;
           }
           span{
               bottom:-64px;
           }
        }
      }
   }
}
</style>