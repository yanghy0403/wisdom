<template>
    <div class="content">
        <div class="about">
              <ul>
                  <li>
                      <h2>中国科学技术协会</h2>
                      <p>中国.北京</p>
                      <p>010-68571875</p>
                  </li>
                  <li>
                       <p>京ICP备10216604号-4</p>
                       <p>海淀分局备案1101084647</p>
                       <p>技术支持:</p>
                       <p>中国科学院计算机网络信息中心</p>
                  </li>
              </ul>
        </div>
    </div>
</template>

<script>
export default {
 name:''
}
</script>

<style lang="scss" scoped>
  .content{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .about{
          height: 230px;
          margin-left: 207px;
          ul{
              display: flex;
             li:first-child{
                 color: #ffc509;
                 font-weight: bolder;
                 border-right: 1px solid #fff;
                 text-align: right;
                 padding-right: 20px;
                 h2{
                     font-size: 26px;
                 }
                 p{
                     line-height: 36px;
                 }
             }
             li:last-child{
                  padding-left: 20px;
                  p{
                      color:#fff;
                      line-height: 27px;
                  }
             }
          }
      }
  }
</style>