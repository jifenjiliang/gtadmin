<template>
  <div class="see">
    <section class="section">
      <div class="loation">
        <router-link to="/movie">内容管理</router-link> >>><router-link to="/movie">视频管理</router-link> >>审核
      </div>
      <div class="see_body">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="11" style="position: relative; height: 400px;">
                <div  class="prism-player" id="J_prismPlayer" style="position: absolute">
                  <span style="color: red;">{{error}}</span>
                </div>
                <video :src="videosource"></video>
              </el-col>
              <el-col :span="12" :offset="1">
                <dl>
                  <dt>上传组织：</dt>
                  <dd>{{movie.tag}}</dd>
                </dl>
                <dl>
                  <dt>上传时间：</dt>
                  <dd>{{movie.createTime | format}}</dd>
                </dl>
                <dl>
                  <dt>视频长度：</dt>
                  <dd>{{movie.duration | Seconds}}</dd>
                </dl>
                <dl>
                  <dt>标  题：</dt>
                  <dd>{{movie.title}} </dd>
                </dl>
                <dl>
                  <dt>描  述：</dt>
                  <dd>{{movie.description}}</dd>
                </dl>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24"  v-show="seting">
            <el-row style="text-align: center;margin-top: 50px; border-top: 1px solid #e1e1e5;padding-top: 20px;">
              <el-button type="success" @click="success">通 过</el-button>
              <el-button type="danger" @click="danger">驳 回</el-button>
              <el-button type="info" @click="info">取 消</el-button>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>

  export default {
    name:'see',
    data:function () {
      return {
        movie:{},
        videosource:'',
        seting:true,
        error:'您的浏览器不支持视频播放，请更换浏览器查看',
        movieapi:'/vod/video/v1/video/getVideo/',
        aliapi:'/vod/video/v1/access/getVideoPlayAuth/',
        successapi:'/vod/video/v1/video/auditingPass/',
        dangerapi:'/vod/video/v1/video/auditingRebut/',
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        this.moviefun();
      })
    },
    methods:{
      moviefun:function () {
        var that =  this;
        that.$http.get(that.movieapi + that.$route.params.id).then(
          function (res) {
            that.movie = res.data.responseData.tbVideo;
            that.movie.duration = res.data.responseData.tbVideo.duration;
            that.movie.tag = res.data.responseData.tbVideo.userDTO.user.name;
            if(res.data.responseData.tbVideo.attachment.aliyunVideoId == null){
              that.error = "该数据请求失败,或者不存在该数据";
              that.seting =false;
            }else {
              let id = res.data.responseData.tbVideo.attachment.aliyunVideoId;
              that.getplayayth(id);
            }
          }
        )
      },
      //aliyunfun
      getplayayth(id){
        var that = this;
        that.$http.get(that.aliapi + id).then(
          function (res) {
            let vvm =  res.data.responseData.playAuth;
            /*
             * id = aliyun movie id
             * vvm = aliyun movie playAuth
             * */
            new prismplayer({
              id: 'J_prismPlayer',
              width: '100%',
              autoplay: false,
              vid  : id,
              playauth  : vvm,
            });

          }
        );
      },
      /*请求通过审核*/
      success(){
        var that =  this;
        that.$http.post(that.successapi + that.$route.params.id,null).then(
          function (res) {
              if(res.data.notification.notifInfo == "success"){
                that.$message({
                  message: '审核通过',
                  type: 'success'
                });
                that.$router.push({path: '/movie'})
              }else{
                that.$message.error('审核失败，请稍后尝试');
              }
          }
        )
      },
      /*请求驳回视频*/
      danger(){
        var that =  this;
        that.$http.post(that.dangerapi + that.$route.params.id,null).then(
          function (res) {
            if(res.data.notification.notifInfo == "success"){
              that.$message({
                message: '驳回成功',
                type: 'success'
              });
              that.$router.push({path: '/movie'})
            }else{
              that.$message.error('驳回失败，请稍后尝试');
            }
          }
        )
      },
      /*返回 不做任何操作*/
      info(){
        this.$router.push({path: '/movie'})
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  
  .see_title{
    display: block;
    line-height: 50px;
  }
  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
  .see_body {
    margin-top: 50px;
    dl{
      float: left;
      width: 100%;
      margin-bottom: 10px;
      dt{
        float: left;
        width: 12%;
      }
      dd{
        float: left;
        width: 80%;
      }
    }
  }
</style>
