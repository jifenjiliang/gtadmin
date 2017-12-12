<template>
  <div class="version">
    <section class="section">
      <div class="loation"><router-link to="/version">版本管理</router-link> >>版本记录</div>
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form"  label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.region" placeholder="标题" style="width: 140px">
              <el-option label="标题" value="标题"></el-option>
              <el-option label="版本" value="版本"></el-option>
            </el-select>
            <el-input
              placeholder="请输入关键词"
              icon="circle-close"
              style="width: 300px"
              v-model="form.keyword"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="全部" style="width: 140px">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="正常" value="4"></el-option>
              <el-option label="已禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="Android" style="width: 140px">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="Android" value="1"></el-option>
              <el-option label="IOS" value="2"></el-option>
              <el-option label="Web" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
            <el-button type="primary" @click="onPublish" icon="edit">新建版本</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="操作"
            width="230">
            <template scope="scope">
              <el-button
                size="small"
                type="text"
                @click="currency(scope.$index, scope.row)">查看</el-button><span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click="edit(scope.$index, scope.row)">编辑</el-button><span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click.native.prevent="deleteDate(scope.$index, scope.row, tableData)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            property="verCode"
            label="标题">
          </el-table-column>
          <el-table-column
            property="version"
            label="版本"
            width="250">
          </el-table-column>
          <el-table-column
            property="type"
            label="类型"
            width="250">
          </el-table-column>
          <el-table-column
            property="status"
            label="状态"
            width="250">
          </el-table-column>
        </el-table>
      </div>
      <!-- show page-->
      <div class="el-page">
        <el-button type="primary" @click="Refresh"  style="float:left;">刷新</el-button>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="form.index"
          :page-size="form.size"
          layout="prev, pager, next, jumper,total"
          :total="total">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>

  export default {
    name:'version',
    data() {
      return {
        getVersionListApi:'/cross/mobileApp/getVersionList.json',
        deleteVersion:'/cross/mobileApp/deleteVersion.json',
        sessionid: localStorage.sessionID,
        total: 0,
        form: {
          index:1,
          size:12,
          type:null,
          status:null,
          region:null,
          keyword:null,
        },
        column : ["全部","Android","IOS","Web"],
        tableData:[],
      };
    },
    mounted:function () {
      this.$nextTick(function () {
        // 初始化请求数据
        var that =  this;
        that.$http.post(that.getVersionListApi,JSON.stringify({"index":0,"size":that.form.size,"type":1}),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.tableData = that.dealData(res.body.responseData.versionList);
            that.total = Number(res.body.responseData.total);
          },function (msg) {
            console.log(msg)
          }
        )
      })
    },
    methods: {
      Refresh(){
        window.location.reload();
      },
      handleIconClick(){
        this.form.keyword = '';
      },
      onSearch(){
        /* 搜索 */
        var that =  this;
        var status = that.form.status,
            type = that.form.type,
            keyword = that.form.keyword,
            indexPage = that.form.index - 1;
        if (that.form.status == null) {
          status = -1;
        }
        if (that.form.type == null) {
          type = 1;
        }
        if (that.form.keyword == '') {
          keyword = null;
        }
        that.$http.post(that.getVersionListApi,JSON.stringify({"index":indexPage,"size":that.form.size,"type":type}),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.tableData = that.dealData(res.body.responseData.versionList);
            that.total = Number(res.body.responseData.total);
          },function (msg) {
            console.log(msg)
          }
        )
      },

      handleCurrentChange(val) {
        /* 分页 this.currentRow = val; */
        var that =  this;
        that.currentPage = val;
        that.form.index =  that.currentPage;
        var status = that.form.status,
            type = that.form.type,
            keyword = that.form.keyword,
            indexPage = that.currentPage - 1;
        if (that.form.status == null) {
          status = -1;
        }
        if (that.form.type == null) {
          type = 1;
        }
        if (that.form.keyword == '') {
          keyword = null;
        }
        that.$http.post(that.getVersionListApi,JSON.stringify({"index":indexPage,"size":that.form.size,"type":type}),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.tableData = that.dealData(res.body.responseData.versionList);
            that.total = Number(res.body.responseData.total);
          },function (msg) {
            console.log(msg)
          }
       )

      },

      //跳转发布知识pages
      onPublish(){
        this.$router.push({path: '/addversion'})
      },

      // 跳转知识详情pages
      currency(index,row) {
        this.$router.push({path: '/detailversion/' + row.id})
      },

      // 跳转编辑知识pages
      edit(index,row) {
        this.$router.push({path: '/editversion/' + row.id})
      },
      //删除知识
      deleteDate(index,row,rows){
        var that = this;
        this.$confirm('确定要删除该条版本记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$http.post(that.deleteVersion,JSON.stringify({"id":row.id}),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if(res.body.responseData.success){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                rows.splice(index, 1);
                return false;
              }else{
                this.$message.error('删除失败，请稍候重试...');
                return false;
              }
            },function (msg) {
              this.$message.error('删除失败，请稍候重试...');
              return false;
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      dealData:function(res){
        var that = this;
        if(res){
          for(var key in res){
            res[key].type = that.column[res[key].type];
            res[key].status = "已禁用";
          }
          res[0].status = "正常"
        }
        return res;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
  
  .serch{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 20px 0;
    margin-bottom: 15px;
  }
  .table-body{
    background: white;
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 20px auto;
  }
</style>
