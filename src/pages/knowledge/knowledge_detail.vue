<template>
  <div class="knowledge_detail">
    <section class="section">
        <div class="loation"><router-link to="/knowledge">内容管理</router-link> >>><router-link to="/knowledge">知识管理</router-link> >>知识详情</div>
        <!-- <SiteNav></SiteNav> -->
        <!-- knowledge_detail_body start -->
        <div class="knowledge_detail_body">
          <h2 class="loreh">{{tableData.title}}</h2>
          <div class="soure clearfix">
            <span class="mr20 fr">{{readCount}}阅读</span>
            <span>分享者：{{tableData.cname}} · {{tableData.createtime}}</span>
          </div>
          <div class="conknowledge" v-html="tableData.content"></div>
        </div>
        <!-- knowledge_detail_body end -->

        <!-- comment_body start -->
        <h2 class="commenth">评论（{{commentCount}}）</h2>
        <div class="comment_body">
          <dl class="clearfix" v-for="item in commentData">
            <dt class="fl">
              <img :src="item.pic" alt="头像">
            </dt>
            <dd class="fl">
              <p class="mb20">{{item.ownerName}}<span>{{item.createTime}}</span></p>
              <p>{{item.content}}</p>
            </dd>
          </dl>
        </div>
        <!-- comment_body end -->
	</section>
  </div>
</template>

<script>

  import dealDate from '../../config/date'
  import nav from './knowledgetabs'

  export default {
    name:'knowledge_detail',

    components : {
      'SiteNav': nav
    },

    computed:{
    },

    data() {
      return {
        api: '/knowledge/knowledge/',
        commentApi: '/cross/newknowledge/knowledgeComment/list/',
        readCount: 0,
        commentCount: 0,
        tableData: {},
        commentData: null,
        column : ["全部","资讯","投融工具","行业","经典案例","新材料","资产管理","宏观","观点","判例","法律法规","文章","互联网","大数据","金融","教育","医疗","O2O","游戏","智能硬件"],
      }
    },

    mounted:function () {
      this.$nextTick(function () {
        // 初始化请求数据
        var that =  this;
        var id = that.$route.params.id;
        var type = 0;
        for(var key in that.column){
          if (that.column[key] == that.$route.params.type) {
            type = key;
          }
        }
        // JSON.stringify
        /* that.$http.post(that.api,that.form,{emulateJSON:true},{headers:{*/
        that.$http.get(that.api + id +'/'+ type,{headers:{
          sessionID : localStorage.sessionID,
          s:'web',
        }}).then(
          function (res) {
            that.readCount = res.body.responseData.readCount;
            that.tableData = res.body.responseData.knowledgeDetail;
            that.tableData.createtime = dealDate(Number(that.tableData.createtime));
            var content = that.tableData.content;
            // if (content.indexOf('<body>') > -1) {
            //   if(content.indexOf('</body>')>-1){
            //     content = content.substring(content.indexOf('<body>')+6,content.indexOf('</body>'));
            //   }else{
            //     content = content.substring(content.indexOf('<body>')+6);
            //   }
            //     that.tableData.content = content
            // }
            if(content.indexOf('</br>')>-1){
              content = content.substring(0,content.indexOf('</br>'));
            }
            that.tableData.content = content
          },function (res) {
            console.log(res)
          }
        )
        //获取知识评论详情
        that.$http.get(that.commentApi + id,{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.commentData = res.body.responseData;
            that.commentCount = that.commentData.length;
            for(var key in that.commentData){
              that.commentData[key].pic = 'http://test.online.gintong.com' + that.commentData[key].pic;
              that.commentData[key].createTime = dealDate(Number(that.commentData[key].createTime));
            }
          },function (res) {
            console.log(res)
          }
        )
      })
    },

    methods:{
      handleClick(tab, event) {

        //console.log(tab, event);

      },
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
  .knowledge_detail_body{
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
    .conknowledge{
      padding: 10px 0;
    }
  }
  h2.commenth{
    font-size: 16px;
    color: #343434;
    line-height: 40px;
    font-weight: 500;
  }
  .comment_body{
    padding: 20px 50px;
    font-size: 15px;
    background: #fff;
    dt{
      margin-right: 20px;
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    dd{
      span{
        font-size: 12px;
        margin-left: 20px;
        color: #a6a6aa;
      }
    }
  }
</style>
