<template>
  <div class="version_detail">
    <section class="section">
        <div class="loation"><router-link to="/version">版本管理</router-link> >>版本详情</div>
        <!-- version_detail_body start -->
        <div class="version_detail_body">
          <h2 class="loreh">{{tableData.verCode}}</h2>
          <div class="soure clearfix">
            <span>{{tableData.updateTime}}</span>
          </div>
          <div class="versionCont" v-html="tableData.content"></div>
        </div>
        <!-- knowledge_detail_body end -->
	</section>
  </div>
</template>

<script>

  import dealDate from '../../config/date'

  export default {
    name:'version_detail',
    computed:{
    },
    data() {
      return {
        api: '/cross/mobileApp/getVersionDetail.json',
        tableData: {},
      }
    },

    mounted:function () {
      this.$nextTick(function () {
        // 初始化请求数据
        var that =  this;
        var id = that.$route.params.id;
        that.$http.post(that.api,JSON.stringify({"id":id}),{headers:{
          sessionID : localStorage.sessionID,
          s:'web',
        }}).then(
          function (res) {
            that.tableData = res.body.responseData;
            that.tableData.updateTime = dealDate(Number(that.tableData.updateTime));
            var content = that.tableData.content;
            if(content.indexOf('</br>')>-1){
              content = content.substring(0,content.indexOf('</br>'));
            }
            that.tableData.content = content
          },function (msg) {
            console.log(msg)
          }
        )
      })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
  .serch{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 20px 0;
  }
  .table-body{
    background: white;
    margin-top: 10px;
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 50px auto;
  }
  .version_detail_body{
    padding: 20px 50px;
    font-size: 14px;
    background: #fff;
    h2.loreh{
      font-size: 18px;
      color: #343434;
      line-height: 30px;
      font-weight: bold;
      word-wrap: break-word;
    }
    .soure{
      color: #707070;
      line-height: 24px;
      height: 34px;
      margin: 15px 0;
      border-bottom: 2px dotted #e5e4e4;
    }
    .versionCont{
      padding: 10px 0;
    }
  }
</style>
