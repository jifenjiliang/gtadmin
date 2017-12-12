<template>
<div class="question">
  <section class="section">
  <div class="loation"><router-link to="/question">内容管理</router-link> >>问答管理</div>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="问题列表" name="first">
        <div class="serch">
          <el-form ref="form"  :inline="true" :model="form" label-width="70px">
            <el-form-item label="关键字">
              <el-select v-model="form.type" placeholder="选择栏目名称" style="width: 140px">
                <el-option label="问题标题" :value="0"></el-option>
                <el-option label="发布人" :value="1"></el-option>
              </el-select>
              <el-input
                placeholder="请输入问题名称/发布人"
                icon="circle-close"
                style="width: 200px"
                v-model="form.keyword"
                :on-icon-click="handleIconClick">
              </el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-col  :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.startTime"
                  style="width: 100%;">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  v-model="form.endTime"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="全部" style="width: 140px">
                <el-option label="全部" :value="-1"></el-option>
                <el-option label="正常" :value="0"></el-option>
                <el-option label="已禁用" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-body">
          <el-table
            :data="question"
            border
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              type="index"
              width="60">
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template scope="scope">
                <el-button
                  size="text"
                  @click="currency(scope.$index, scope.row)">查看</el-button><span style="color: #4db3ff;"> | </span>
                <el-button
                  size="text"
                  @click="changeStatus(scope.$index, scope.row)">
                  {{scope.row.disabled == 0 ? '禁用' : '启用'}}
                </el-button><span style="color: #4db3ff;"> | </span>
                <el-button
                  size="text"
                  @click="changeTop(scope.$index, scope.row)">
                  {{scope.row.top == 1 ? '取消置顶 ' : '置顶 '}}
                </el-button>
                <span style="color: #4db3ff;"> | </span>
                <el-button
                  size="text"
                  @click="deleteDate(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="问题标题">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="发布人"
              width="200">
            </el-table-column>
            <el-table-column
              prop="createTime"
              sortable
              label="发布时间"
              width="200">
              <template scope="scope">
                {{ Number(scope.row.createTime) | format}}
              </template>
            </el-table-column>
            <el-table-column
              prop="readCount"
              label="阅读数"
              sortable
              width="130">
            </el-table-column>
            <el-table-column
              prop="answerCount"
              sortable
              label="回答数"
              width="130">
            </el-table-column>
            <el-table-column
              label="状态"
              width="80">
              <template scope="scope">
                <span>{{scope.row.disabled == 0 ? '正常' : '已禁用'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="el-page">
          <el-button type="primary" @click="Refresh"  style="float:left;">刷新</el-button>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="index"
            :page-size="form.size"
            layout="prev, pager, next, jumper,total"
            :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="回答列表" name="second">
        <div class="serch">
          <el-form ref="form2"  :inline="true" :model="form2" label-width="70px">
            <el-form-item label="关键字">
              <el-select v-model="form2.keyType" placeholder="选择栏目名称" style="width: 140px">
                <el-option label="问题标题" :value="0"></el-option>
                <el-option label="回答描述" :value="1"></el-option>
                <el-option label="回答人" :value="2"></el-option>
              </el-select>
              <el-input
                placeholder="请输入问题名称/发布人"
                icon="circle-close"
                style="width: 200px"
                v-model="form2.keyword"
                :on-icon-click="handleIconClick2">
              </el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-col  :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form2.startTime"
                  style="width: 100%;">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  v-model="form2.endTime"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch2" icon="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-body">
          <el-table
            :data="answer"
            border
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              type="index"
              width="60">
            </el-table-column>
            <el-table-column label="操作" width="230">
              <template scope="scope">
                <el-button
                  size="small"
                  type="text"
                  @click="currency(scope.$index, scope.row)">查看</el-button><span style="color: #4db3ff;"> | </span>
                <el-button
                  size="small"
                  type="text"
                  @click="changeTop2(scope.$index, scope.row)">
                  {{scope.row.top == 1 ? '取消置顶 ' : '置顶 '}}
                </el-button><span style="color: #4db3ff;"> | </span>
                <el-button
                  type="text"
                  size="small"
                  @click="deleteDate2(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="questionTitle"
              label="问题标题">
            </el-table-column>
            <el-table-column
              label="回答描述">
              <template scope="scope">
              {{scope.row.content | demandTitlelength}}
              </template>
            </el-table-column>
            <el-table-column
              prop="answererName"
              label="回答人"
              width="130">
            </el-table-column>
            <el-table-column
              prop="createTime"
              sortable
              label="回答时间"
              width="200">
              <template scope="scope">
                {{ Number(scope.row.createTime) | format}}
              </template>
            </el-table-column>
            <el-table-column
              prop="virtual"
              label="评论数"
              sortable
              width="130">
            </el-table-column>
            <el-table-column
              prop="praiseCount"
              sortable
              label="点赞数"
              width="130">
            </el-table-column>
          </el-table>
        </div>
        <div class="el-page">
          <el-button type="primary" @click="Refresh"  style="float:left;">刷新</el-button>
          <el-pagination
            @current-change="handleCurrentChange2"
            :current-page="index2"
            :page-size="form2.size"
            layout="prev, pager, next, jumper,total"
            :total="total2">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</div>
</template>
<script>
    export default {
       name:'question',
      data() {
        return {
          activeName: 'first',
          statusapi:'',
          topapi:'/ask-answer/other/search/question/', // 问题搜索
          deltopapi:'/ask-answer/other/', // 问题 答案 删除
          Statusapi:'/ask-answer/other/disabled', //禁用
          cStatusapi:'/ask-answer/other/disabled/', //启用 取消禁用
          topapi2:'/ask-answer/other/search/answer/', // 答案搜索


          cantop1:'/ask-answer/other/top/0/', //问题取消置顶 delete
          cantop2:'/ask-answer/other/top/0', //问题置顶 post id


          cantop3:'/ask-answer/other/top/1/', //答案取消置顶 delete
          cantop4:'/ask-answer/other/top/1', //答案置顶 post id


          total:0,
          total2:0,
          index:1,
          index2:1,
          question:[],
          answer:[],
          form:{
            start:0,
            type:0,
            keyword:null,
            startTime:'',
            endTime:'',
            status:-1,
            size:10,
          },
          form2:{
            start:0,
            keyType:0,
            keyword:null,
            startTime:'',
            endTime:'',
            size:10,
          },
        };
      },
      mounted:function () {
        this.$nextTick(function () {
          var vm = this;
          vm.initlistdate();
          vm.initlistdate2();
        });
      },
      methods: {
        Refresh(){
          window.location.reload();
        },
        //问题初始化
        initlistdate:function () {
          var that = this;
          that.$http.get(
            that.topapi + that.form.type + '/' + that.form.keyword + '/'
            + 0 + '/' + 0 + '/' + that.form.status + '/'
            + -1 + '/' + -1 + '/' + -1 + '/'+ that.form.start + '/'+ that.form.size
            ,{headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }}).then(
            function (res) {
              that.question = res.data.responseData.list;
              that.total =  res.data.responseData.totalCount;
            },function (res) {
              console.log(res)
            }
          );
        },
        // 问题关键字清除
        handleIconClick(){
          let vm = this;
          vm.form.keyword = '';
        },
        handleIconClick2(){
          let vm = this;
          vm.form2.keyword = '';
        },
        // 问题搜索
        onSearch(){
          var that = this;

          var stime,etime,keyw;
          if(that.form.startTime == ''){
            stime = 0;
          }else if(typeof that.form.startTime == "number"){
            stime =  that.form.startTime;
          }else {
            stime = (that.form.startTime).getTime();
          }

          if(that.form.endTime == ''){
            etime = 0;
          }else if(typeof that.form.endTime == "number"){
            etime = that.form.endTime;
          }else{
            etime = (that.form.endTime).getTime();
          }

          if(that.form.keyword == null || that.form.keyword == ''){
            keyw = null;
          }else{
            keyw = that.form.keyword;
          }
          that.$http.get(
            that.topapi + that.form.type + '/' + keyw + '/'
            + stime + '/' + etime + '/' + that.form.status + '/'
            + -1 + '/' + -1 + '/' + -1 + '/'+ that.form.start + '/'+ that.form.size
            ,{headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }}).then(
            function (res) {
              that.question = res.data.responseData.list;
              that.total =  res.data.responseData.totalCount;
            },function (res) {
              console.log(res)
            }
          );
        },
        //问题查看
        currency(index,row) {
          this.$router.push({path: '/question/' + row.id})
        },
        //问题删除
        deleteDate(index,row){
          var that = this;
          that.$http.delete(that.deltopapi + 0 + '/' + row.id ,{headers:{sessionID :localStorage.getItem('sessionID'), s:'web',}}).then(
            function (res) {
              if(res.data.notification.notifInfo == "success"){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                that.initlistdate();
              }else{
                this.$message.error('删除失败，请稍后尝试');
              }
            },function (res) {
              console.log(res)
            }
          );
        },
        //问题状态
        changeStatus(index,row){
          var that = this;
          if(row.disabled == 0){
              var ids = {
                  id:row.id
              };
            that.$http.put(that.Statusapi,ids,{
              headers: {
                sessionID: localStorage.getItem('sessionID'),
                s: 'web',
              }
            }).then(
              function (res) {
                  if(res.data.responseData == true){
                    that.$message({
                      message: '状态修改成功',
                      type: 'success'
                    });
                    that.onSearch();
                  }else {
                    that.$notify.error({
                      title: '操作失败,请稍后重试...',
                      duration: 1500
                    });
                  }
              }, function (res) {
                console.log(res)
              }
            );

          }else{
            that.$http.delete(that.cStatusapi + row.id,{
              headers: {
                sessionID: localStorage.getItem('sessionID'),
                s: 'web',
              }
            }).then(
              function (res) {
                if(res.data.responseData == true){
                  that.$message({
                    message: '状态修改成功',
                    type: 'success'
                  });
                  that.onSearch();
                }else {
                  that.$notify.error({
                    title: '操作失败,请稍后重试...',
                    duration: 1500
                  });
                }
              }, function (res) {
                console.log(res)
              }
            );

          }

        },
        // 问题置顶
        changeTop(index,row){
          var that = this;
        if(row.top == 1){
          that.$http.delete(that.cantop1 + row.id,{
            headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }
          }).then(function (res){
            if(res.data.responseData == true){
              that.$notify({
                title: '取消置顶成功',
                type: 'success',
                duration: 1500
              });
              that.onSearch();
            }else{
              that.$notify.error({
                title: res.data.notification.notifInfo,
                duration: 1500
              });
            }

          },function(error){
            console.log(error)
          })

        }else {
            var ids = {
                id:row.id
            };
          that.$http.post(that.cantop2,JSON.stringify(ids),{headers:{sessionID :localStorage.getItem('sessionID'), s:'web',}
          }).then(function (res){
             if(res.data.responseData == true){
               that.$notify({
               title: '置顶成功',
               type: 'success',
               duration: 1500
               });
               that.onSearch();
             }else{
               that.$notify.error({
               title: res.data.notification.notifInfo,
               duration: 1500
               });
             }

          },function(error){
            console.log(error)
          })
        }
        },
        // 问题分页
        handleCurrentChange(val) {
          var that =  this;
          that.form.start =  val - 1;

          var stime,etime,keyw;
          if(that.form.startTime == ''){
            stime = 0;
          }else if(typeof that.form.startTime == "number"){
            stime =  that.form.startTime;
          }else {
            stime = (that.form.startTime).getTime();
          }

          if(that.form.endTime == ''){
            etime = 0;
          }else if(typeof that.form.endTime == "number"){
            etime = that.form.endTime;
          }else{
            etime = (that.form.endTime).getTime();
          }

          if(that.form.keyword == null || that.form.keyword == ''){
            keyw = null;
          }else{
            keyw = that.form.keyword;
          }

          that.$http.get(
            that.topapi + that.form.type + '/' + keyw + '/'
            + stime + '/' + etime + '/' + that.form.status + '/'
            + -1 + '/' + -1 + '/' + -1 + '/'+ that.form.start + '/'+ that.form.size
            ,{headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }}).then(
            function (res) {
              that.question = res.data.responseData.list;
              that.total =  res.data.responseData.totalCount;
            },function (res) {
              console.log(res)
            }
          );


        },
        /*回答列表初始化*/
        initlistdate2:function () {
          var that = this;
          that.$http.get(
            that.topapi2 + that.form2.keyType + '/' + that.form2.keyword + '/'
            + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + that.form2.start + '/' + that.form2.size
            , {
              headers: {
                sessionID: localStorage.getItem('sessionID'),
                s: 'web',
              }
            }).then(
            function (res) {
              that.answer = res.data.responseData.list;
              that.total2 = res.data.responseData.totalCount;
            }, function (res) {
              console.log(res)
            }
          );
        },
        //回答列表删除
        deleteDate2(index,row){
          var that = this;
          that.$http.delete(that.deltopapi  + 1 + '/' + row.id ,{headers:{sessionID :localStorage.getItem('sessionID'), s:'web',}}).then(
            function (res) {
              if(res.data.notification.notifInfo == "success"){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                that.onSearch2();
              }else{
                this.$message.error('删除失败，请稍后尝试');
              }
            },function (res) {
              console.log(res)
            }
          );
        },
        //回答列表置顶
        changeTop2(index,row){
          var that = this;
          if(row.top == 1){
            that.$http.delete(that.cantop3 + row.id,{
              headers:{
                sessionID :localStorage.getItem('sessionID'),
                s:'web',
              }
            }).then(function (res){
              if(res.data.notification.notifInfo == "success"){
                that.$notify({
                  title: '取消置顶成功',
                  type: 'success',
                  duration: 1500
                });
                that.onSearch2();
              }else{
                that.$notify.error({
                  title: '置顶失败',
                  duration: 1500
                });
              }

            },function(error){
              console.log(error)
            })

          }else {
            var ids = {
              id:row.id
            };
            that.$http.post(that.cantop4,JSON.stringify(ids),{headers:{sessionID :localStorage.getItem('sessionID'), s:'web',}
            }).then(function (res){
              if(res.data.notification.notifInfo == "success"){
                that.$notify({
                  title: '置顶成功',
                  type: 'success',
                  duration: 1500
                });
                that.onSearch2();
              }else{
                that.$notify.error({
                  title: '置顶失败',
                  duration: 1500
                });
              }
            },function(error){
              console.log(error)
            })
          }
        },
        //回答列表搜索
        onSearch2(){
          var that = this;

          var stime,etime,keyw;
          if(that.form2.startTime == ''){
            stime = 0;
          }else if(typeof that.form2.startTime == "number"){
            stime =  that.form2.startTime;
          }else {
            stime = (that.form2.startTime).getTime();
          }

          if(that.form2.endTime == ''){
            etime = 0;
          }else if(typeof that.form2.endTime == "number"){
            etime = that.form2.endTime;
          }else{
            etime = (that.form2.endTime).getTime();
          }

          if(that.form2.keyword == null || that.form2.keyword == ''){
            keyw = null;
          }else{
            keyw = that.form2.keyword;
          }
          that.$http.get(
            that.topapi2 + that.form2.keyType + '/' + keyw + '/'
            + stime + '/' + etime + '/' + 0 + '/' + 0 + '/' + that.form2.start + '/' + that.form2.size
            , {
              headers: {
                sessionID: localStorage.getItem('sessionID'),
                s: 'web',
              }
            }).then(
            function (res) {
              that.answer = res.data.responseData.list;
              that.total2 = res.data.responseData.totalCount;
            }, function (res) {
              console.log(res)
            }
          );
        },
        // 回答列表分页
        handleCurrentChange2(val){
          var that =  this;
          that.form2.start = val -1;


          var stime,etime,keyw;
          if(that.form2.startTime == ''){
            stime = 0;
          }else if(typeof that.form2.startTime == "number"){
            stime =  that.form2.startTime;
          }else {
            stime = (that.form2.startTime).getTime();
          }

          if(that.form2.endTime == ''){
            etime = 0;
          }else if(typeof that.form2.endTime == "number"){
            etime = that.form2.endTime;
          }else{
            etime = (that.form2.endTime).getTime();
          }

          if(that.form2.keyword == null || that.form2.keyword == ''){
            keyw = null;
          }else{
            keyw = that.form2.keyword;
          }
          that.$http.get(
            that.topapi2 + that.form2.keyType + '/' + keyw + '/'
            + stime + '/' + etime + '/' + 0 + '/' + 0 + '/' + that.form2.start + '/' + that.form2.size
            , {
              headers: {
                sessionID: localStorage.getItem('sessionID'),
                s: 'web',
              }
            }).then(
            function (res) {
              that.answer = res.data.responseData.list;
              that.total2 = res.data.responseData.totalCount;
            }, function (res) {
              console.log(res)
            }
          );
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
