<template>
<div class="see">
  <section class="section">
    <div class="loation">
      <router-link to="/movie">内容管理</router-link> >>><router-link to="/movie">视频管理</router-link> >>查看
    </div>
    <div class="see_body">
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="10" style="position: relative; height: 400px;">
              <div  class="prism-player" id="J_prismPlayer" style="position: absolute">
               <span style="color: red;line-height: 200px; text-align: center">{{error}}</span>
              </div>
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
                <dt>标题：</dt>
                <dd>{{movie.title}} </dd>
              </dl>
              <dl>
                <dt>描述：</dt>
                <dd>{{movie.description}}</dd>
              </dl>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row v-if="m_pshow">
        <el-col :span="24">
          <div class="see_title">播放数：{{m_p.length}}次</div>
          <el-table
            :data="m_p"
            style="width: 100%">
            <el-table-column
              prop="userId"
              label="播放用户ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.name"
              label="播放用户姓名"
              width="180">
            </el-table-column>
            <el-table-column
              label="播放时间">
              <template scope="scope">
                {{scope.row.createTime | format}}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="m_pppage"
            :current-page="m_pp.index"
            :page-size="m_pp.size"
            layout="prev, pager, next, jumper,total"
            :total="m_pp.total">
          </el-pagination>
        </el-col>
      </el-row>
      <el-row v-if="m_nshow">
        <el-col :span="24">
          <div class="see_title"> 评论数：{{m_n.length}}</div>
          <el-table
            :data="m_n"
            style="width: 100%">
            <el-table-column
              prop="userId"
              label="评论用户ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.name"
              label="评论用户姓名"
              width="180">
            </el-table-column>
            <el-table-column
              label="评论时间">
              <template scope="scope">
                {{scope.row.createTime | format}}
              </template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="评论内容">
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="m_nppage"
            :current-page="m_np.index"
            :page-size="m_np.size"
            layout="prev, pager, next, jumper,total"
            :total="m_np.total">
          </el-pagination>
        </el-col>
      </el-row>
      <el-row v-if="m_sshow">
        <el-col :span="24">
          <div class="see_title"> 分享数：{{m_s.length}}</div>
          <el-table
            :data="m_s"
            style="width: 100%">
            <el-table-column
              prop="userId"
              label="分享用户ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.name"
              label="分享用户姓名"
              width="180">
            </el-table-column>
            <el-table-column
              label="分享时间">
              <template scope="scope">
                {{scope.row.createTime | format}}
              </template>
            </el-table-column>
            <el-table-column
              prop="shareUrl"
              label="分享路径">
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="m_spage"
            :current-page="m_sp.index"
            :page-size="m_sp.size"
            layout="prev, pager, next, jumper,total"
            :total="m_sp.total">
          </el-pagination>
        </el-col>
      </el-row>
      <el-row v-show="m_cshow">
        <el-col :span="24">
          <div class="see_title"> 收藏数：{{m_c.length}}</div>
          <el-table
            :data="m_c"
            style="width: 100%">
            <el-table-column
              prop="userId"
              label="收藏用户ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.name"
              label="收藏用户姓名"
              width="180">
            </el-table-column>
            <el-table-column
              label="收藏时间">
              <template scope="scope">
                {{scope.row.createTime | format}}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="m_cppage"
            :current-page="m_cp.index"
            :page-size="m_cp.size"
            layout="prev, pager, next, jumper,total"
            :total="m_cp.total">
          </el-pagination>
         </el-col>
      </el-row>
      <el-row v-if="m_tshow">
        <el-col :span="24">
          <div class="see_title">举报数：{{m_t.length}}</div>
          <el-table
            border
            :data="m_t"
            style="width: 100%">
            <el-table-column
              prop="videoId"
              label="举报用户ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user.name"
              label="举报用户姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="createTime"
              width="300"
              label="举报时间">
              <template scope="scope">
                {{scope.row.createTime | format}}
              </template>
            </el-table-column>
            <el-table-column
              prop="reportType"
              width="300"
              label="举报类型">
            </el-table-column>
            <el-table-column
              prop="reportDescribe"
              label="举报描述">
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="m_tppage"
            :current-page="m_tp.index"
            :page-size="m_tp.size"
            layout="prev, pager, next, jumper,total"
            :total="m_tp.total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <div class="back">
      <router-link to="/movie"> <el-button type="success">&nbsp;返回&nbsp;</el-button></router-link>
    </div>
  </section>
</div>
</template>

<script>


    export default {
        name:'see',
        data:function () {
          return {
            error:'您的浏览器不支持视频播放，请更换浏览器查看',
            m_tapi:'/vod/video/v1/reportVideo/', //举报数
            m_t:[],
            m_tshow:true,
            m_tp:{
              index:1,
              size:10,
              total:0,
            },
            m_capi:'/vod/video/v1/enshrineVideo/video/', //收藏数
            m_c:[],
            m_cshow:true,
            m_cp:{
              index:1,
              size:10,
              total:0
            },
            m_sapi:'/vod/video/v1/shareVideo/', //分享数
            m_s:[],
            m_sshow:true,
            m_sp:{
              index:1,
              size:10,
              total:0
            },
            m_napi:'/vod/video/v1/discussVideo/',//评论数
            m_n:[],
            m_nshow:true,
            m_np:{
              index:1,
              size:10,
              total:0
            },
            m_papi:'/vod/video/v1/playVideo/',//播放数
            m_p:[],
            m_pshow:true,
            m_pp:{
              index:1,
              size:10,
              total:0
            },
            movie:{},
            movieapi:'/vod/video/v1/video/getVideo/',
            vvid:0,
            playauth:'',

            aliapi:'/vod/video/v1/access/getVideoPlayAuth/',

          }
        },
        mounted:function () {
          this.$nextTick(function () {
            this.m_tapiFun();
            this.m_capiFun();
            this.m_sapiFun();
            this.m_napiFun();
            this.m_papiFun();
            this.moviefun();
          })
        },
        methods:{
          //举报数
          m_tapiFun:function () {
            var that =  this;
            that.$http.get(that.m_tapi + that.$route.params.id + '/' +  that.m_tp.index + '/' + 10
            ).then(
              function (res) {
                  if(res.data.responseData.results.length == 0){
                      that.m_tshow = false;
                  }
                that.m_t = res.data.responseData.results
                that.m_tp.total = res.data.responseData.page.count
              }
            )
          },
          m_tppage(val){
            this.m_tp.index = val;
            this.m_tapiFun();
          },
          //收藏数
          m_capiFun:function () {
            var that =  this;
            that.$http.get(that.m_capi + that.$route.params.id + '/' +  that.m_cp.index + '/' + 10
            ).then(
              function (res) {
                if(res.data.responseData.results.length == 0){
                  that.m_cshow = false;
                }
                that.m_c = res.data.responseData.results
                that.m_cp.total = res.data.responseData.page.count
              }
            )
          },
          m_cppage(val){
            this.m_cp.index = val;
            this.m_capiFun();
          },
          //分享数
          m_sapiFun:function () {
            var that =  this;
            that.$http.get(that.m_sapi + that.$route.params.id + '/' +  that.m_sp.index + '/' + 10
            ).then(
              function (res) {
                if(res.data.responseData.results.length == 0){
                  that.m_sshow = false;
                }
                that.m_s = res.data.responseData.results
                that.m_sp.total = res.data.responseData.page.count
              }
            )
          },
          m_spage(val){
            this.m_sp.index = val;
            this.m_sapiFun();
          },
          //分享数
          m_napiFun:function () {
            var that =  this;
            that.$http.get(that.m_napi + that.$route.params.id + '/' +  that.m_np.index + '/' + 10
            ).then(
              function (res) {
                if(res.data.responseData.results.length == 0){
                  that.m_nshow = false;
                }
                that.m_n = res.data.responseData.results
                that.m_np.total = res.data.responseData.page.count
              }
            )
          },
          m_nppage(val){
            this.m_np.index = val;
            this.m_napiFun();
          },
          //播放数
          m_papiFun:function () {
            var that =  this;
            that.$http.get(that.m_papi + that.$route.params.id + '/' +  that.m_pp.index + '/' + 10
            ).then(
              function (res) {
                if(res.data.responseData.results.length == 0){
                  that.m_pshow = false;
                }
                that.m_p = res.data.responseData.results
                that.m_pp.total = res.data.responseData.page.count
              }
            )
          },
          m_pppage(val){
            this.m_pp.index = val;
            this.m_papiFun();
          },
          moviefun:function () {
            var that =  this;
            that.$http.get(that.movieapi + that.$route.params.id).then(
              function (res) {
                that.movie = res.data.responseData.tbVideo;
                that.movie.duration = res.data.responseData.tbVideo.duration;
                that.movie.tag = res.data.responseData.tbVideo.userDTO.user.name;
                if(res.data.responseData.tbVideo.attachment.aliyunVideoId == null){
                    that.error = "该数据请求失败,或者不存在该数据";
                }else{
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
    margin-bottom: 100px;
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
  .back{
    width: 87.5%;
    height:50px;
    position: fixed;
    right:0;
    bottom: 0;
    z-index: 100;
    text-align: center;
    background: white;
  }
</style>
