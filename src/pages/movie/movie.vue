<template>
  <div class="movie">
    <section class="section">
      <div class="loation"><router-link to="/movie">内容管理</router-link> >>视频管理</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form" label-width="80px">
          <el-form-item label="视频标题">
            <el-input
              placeholder="请输入视频标题"
              icon="circle-close"
              style="width: 300px"
              v-model="form.searchParams.title"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="上传时间">
            <el-col  :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.searchParams.startTime"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="form.searchParams.endTime"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-form-item label="状态">
              <el-select v-model="status" placeholder="全部" style="width: 140px">
                <el-option label="全部" :value="5"></el-option>
                <el-option label="未审核" :value="0"></el-option>
                <el-option label="正常" :value="1"></el-option>
                <el-option label="审核驳回" :value="2"></el-option>
                <el-option label="已禁用" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="Columnlist"
          border
          v-loading="loading"
          element-loading-text="拼命加载中"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template scope="scope">
              <bdo>
                <el-button
                  size="small"
                  type="text"
                  @click="currency(scope.$index, scope.row)">查看</el-button>
              </bdo>
              <bdo v-if="scope.row.status == 0 ? true : false">
                <span style="color: #4db3ff;"> | </span>
                <el-button
                  size="small"
                  @click="changeTop(scope.$index, scope.row)"
                  type="text">
                  审核
                </el-button>
              </bdo>
              <bdo v-if="scope.row.status == 1 ? true : false">
                <span style="color: #4db3ff;"> | </span>
                <el-button
                  size="small"
                  type="text"
                  @click="stopc(scope.$index, scope.row)">
                  禁用
                </el-button>
                <span style="color: #4db3ff;"> | </span>
                <el-button
                  size="small"
                  type="text"
                  @click="topc(scope.$index, scope.row)">
                 {{scope.row.top == 0 ? '置顶' : '取消置顶'}}
                </el-button>
              </bdo>
              <bdo v-if="scope.row.status == 3 ? true : false">
                <span style="color: #4db3ff;"> | </span>
                <el-button
                  size="small"
                  type="text"
                  @click="beginc(scope.$index, scope.row)">
                  启用
                </el-button>
              </bdo>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="视频标题">
          </el-table-column>
          <el-table-column
            label="上传时间"
            width="200">
            <template scope="scope">
              {{scope.row.createTime | format}}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="视频时长"
            width="200">
            <template scope="scope">
              {{scope.row.duration | Seconds}}
            </template>
          </el-table-column>
          <el-table-column
            prop="playTime"
            label="播放次数"
            sortable
            width="130">
          </el-table-column>
          <el-table-column
            prop="discussTime"
            sortable
            label="评论数"
            width="130">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100">
            <template scope="scope">
             <span >
                {{scope.row.status | changestatus}}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="el-page">
        <el-button type="primary" @click="Refresh"  style="float:left;">刷新</el-button>
        <el-pagination
          @current-change="handleCurrentChange2"
          :current-page="form.pageParameter.currentPage"
          :page-size="form.pageParameter.pageSize"
          layout="prev, pager, next, jumper,total"
          :total="total">
        </el-pagination>
      </div>
      <!--position set-->
    </section>
  </div>
</template>

<script>
  import formmate from '../../config/date'
  import formmate2 from '../../config/date2'
  export default {
    name:'movie',
    data:function () {
      return {
        loading:true,
        api:'/vod/video/v1/video/getVideos.json',
        statusapi:'/vod/video//v1/video/auditingNormal',
        topapi:'/vod/video//v1/demand/demand/changePriority',
        total:0,
        /*status*/
        stopcapi:'/vod/video/v1/video/auditingForbidden',
        begincapi:'/vod/video/v1/video/auditingNormal/',
        status:5,
        /*top*/
        topapi:'/vod/video/v1/video/auditingTop/',
        form: {
          "pageParameter": {
            "currentPage": 1,
            "pageSize": 15,
          },
          searchParams:{
            "title":"",
            "startTime":'',
            "endTime":'',
            "statuslist" :[0,1,2,3]
          },
          "sortExp": "top desc,create_time DESC",
        },
        sessionid:localStorage.getItem('sessionID'),
        Columnlist:[],
      }
    },
    filters:{
      changestatus:function (val) {
          if(val == 0){
            return '未审核';
          }else if (val == 1){
            return '正常';
          }else if (val == 2){
            return '审核驳回';
          }else if(val == 3){
            return '已禁用';
          }else if(val == 4){
            return '删除';
          }
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        var vm = this;
        vm.initlistdate();
      });
    },
    methods:{
      Refresh(){
        window.location.reload();
      },
      initlistdate:function () {
        var that = this;
        that.$http.post(that.api,JSON.stringify(that.form),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.Columnlist = res.data.responseData.results;
            that.total = res.data.responseData.page.count;
            that.loading  = false;
          },function (res) {
            console.log(res)
          }
        );
      },
      // clean keywords
      handleIconClick(){
        let vm = this;
        vm.form.searchParams.title = '';
      },
      // search
      onSearch(){
        var that =  this;
        that.loading = true;
        that.form.searchParams.startTime = formmate(that.form.searchParams.startTime);
        that.form.searchParams.endTime = formmate2(that.form.searchParams.endTime);
        if(that.form.searchParams.startTime == 'NaN-aN-aN aN:aN:aN'){
          that.form.searchParams.startTime = "";
        }
        if(that.form.searchParams.endTime == 'NaN-aN-aN 23:59:59'){
          that.form.searchParams.endTime = "";
        }
        if(that.status == 5){
          that.form.searchParams.statuslist = [0,1,2,3];
        }else{
          delete that.form.searchParams.statuslist;
          that.form.searchParams.status = that.status;
        }
        that.initlistdate();
      },
      // go detail
      currency(index,row) {
        this.$router.push({path: '/movie/see/' + row.id})
      },
      // go pages
      handleCurrentChange2(val) {
        var that =  this;
        that.Columnlist = [];
        that.loading  = true;
        that.form.pageParameter.currentPage =  val;
        that.initlistdate();
      },
      //状态正常变成禁用
      stopc(index,row){
        var that = this;
        that.Columnlist = [];
        that.loading = true;
        var stringjson = {
          "forbiddenReason": "string",
          "id": row.id
        };
        that.$http.post(that.stopcapi,JSON.stringify(stringjson),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
              if(res.data.notification.notifInfo == "success"){
                this.$message({
                  message: '该视频状态禁用成功',
                  type: 'success'
                });
                that.initlistdate();
              }else {
                that.$message.error('禁用失败,请稍后尝试');
              }
          },function (res) {
            console.log(res)
          }
        );
      },
      //状态禁用变成正常
      beginc(index,row){
        var that = this;
        that.loading = true;
        that.Columnlist = [];
        that.$http.post(that.begincapi + row.id,null,{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            if(res.data.notification.notifInfo == "success"){
              this.$message({
                message: '该视频状态启用成功',
                type: 'success'
              });
              that.initlistdate();
            }else {
              that.$message.error('启用失败,请稍后尝试');
            }
          },function (res) {
            console.log(res)
          }
        );
      },
      //置顶 取消置顶
      topc(index,row){
        var that = this;
        that.Columnlist = [];
        that.loading = true;
        that.$http.post(that.topapi + row.id,null,{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            if(res.data.notification.notifInfo == "success"){
              this.$message({
                message: '状态操作成功',
                type: 'success'
              });
              that.initlistdate();
            }else {
              that.$message.error('状态操作失败,请稍后尝试');
            }
          },function (res) {
            console.log(res)
          }
        );

      },
      // changeTop
      changeTop(index,row){
        this.$router.push({path: '/movie/examine/' + row.id})
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
</style>
