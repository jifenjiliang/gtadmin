<template>
  <div class="see" >
    <section class="section">
      <div class="loation">
        <router-link to="/headlines">UGC内容管理</router-link> >>><router-link to="/headlines">动态头条</router-link> >>查看
      </div>
      <!-- topic body -->
      <div class="organum_body" v-show="showdate">
       <div class="know_list">
         <h3>知识标题：{{Detail.title}}</h3>
         <div class="tit">分享者：{{Detail.cname}} {{Number(Detail.createtime) |format}}</div>
         <div class="titcontaion" v-html="Detail.content"></div>
       </div>
        <!-- comment_body start -->
        <h2 class="commenth">评论（{{commentCount}}）</h2>
        <div class="comment_body">
          <dl v-for="item in commentData">
            <dt>
              <img :src="item.pic" alt="头像">
            </dt>
            <dd>
              <p>{{item.ownerName}}   <span>{{item.createTime |format}}</span></p>
              <p>{{item.content}}</p>
            </dd>
          </dl>
        </div>
      </div>
      <div class="noDate" v-show="noDate">
        获取知识失败，服务器返回了null, 稍后在尝试吧
      </div>
    </section>
    <!-- comment_body end -->
    <div class="back">
      <router-link to="/headlines"> <el-button type="success">&nbsp;返回&nbsp;</el-button></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name:'see',
    computed:{
    },
    data:function () {
      return {
        api:'/cross/newknowledge/knowledge/',
        disapi:'/cross/newknowledge/knowledgeComment/list/',
        showdate:true,
        noDate:false,
        Detail:{
          title:'',
          createtime:'',
          cname:'',
          content:'',
        },
        commentCount:0,
        commentData:{},
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        this.Todic();
        this.Dislist();
      })
    },
    methods:{
      Todic:function () {
        var that = this;
        that.$http.get(that.api + that.$route.params.id + '/' +  that.$route.query.type,{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
            function (res) {
                if(res.data.responseData == null){
                    that.showdate = false;
                    that.noDate = true;
                }else{
                  that.Detail = res.data.responseData.knowledgeDetail
                }
            }
        )
      },
      Dislist:function () {
        var that = this;
        that.$http.get(that.disapi + that.$route.params.id,{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {

            that.commentCount = res.data.responseData.length;
            that.commentData = res.data.responseData;

            for(var key in that.commentData){
                if(that.commentData[key].pic == ""){
                  that.commentData[key].pic = "http://file.online.gintong.com/web/pic/user/default.jpeg"
                }else {
                  that.commentData[key].pic = 'http://test.online.gintong.com' + that.commentData[key].pic;
                }
            }
          }
        )
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
  .noDate{
    float: left;
    width: 100%;
    text-align: center;
    line-height: 500px;
    font-size: 30px;
  }
  .organum_body{
    .contaion{
      border: 1px solid #e1e1e5;
      padding: 15px;
      margin-top: 20px;
    }
  }
  .know_list {

    h3{  line-height: 50px;

      border-bottom: 1px solid #e1e1e5;
    }
    .tit{
      line-height: 40px;
      border-bottom: 1px solid #e1e1e5;
    }
    .titcontaion{
      line-height: 35px;
      font-size: 14px;
      margin-top: 30px;
      background-color: white;
      padding: 10px;
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
    dl{
      float: left;
      width: 100%;
      margin-bottom: 10px;
      border-bottom: 1px solid #e1e1e5;
      padding-bottom: 10px;
      dt{
        float: left;
        img{
          border-radius: 100%;
          width: 60px;
        }
      }
      dd{
        float: left;
        padding-left: 20px;
        padding-top: 10px;
         P{
           line-height: 20px;
         }
        p:first-child{
          margin-bottom: 10px;
        }
      }
    }



  }

  .back{
    width: 87.5%;
    height:50px;
    position: fixed;
    right:0;
    bottom: 0;
    z-index: 100;
    text-align: center;
    background-color: white;
    line-height: 50px;
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 50px auto;
  }
</style>
