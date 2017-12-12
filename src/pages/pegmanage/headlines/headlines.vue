<template>
<div class="headlines">
    <div class="loation"><router-link to="/headlines">PGC内容管理</router-link> >>动态头条</div>
    <div class="headlines_">
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form" label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="选择栏目名称" style="width: 140px">
              <el-option label="知识标题" :value="1"></el-option>
            </el-select>
            <el-input
              placeholder="请输入知识标题"
              icon="circle-close"
              style="width: 600px"
              v-model="form.keyWord"
              :on-icon-click="handleIconClick"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="推送时间">
            <el-col  :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.bTime"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="form.eTime"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="行业偏好">
            <el-select v-model="form.indusPrefer" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  icon="search" @click="onSearch">搜索</el-button>
            <el-button type="primary"  icon="edit" @click="Newadd">新增头条</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="headlines"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column label="操作"width="150">
            <template scope="scope">
              <el-button size="small" type="text" @click="Seefun(scope.$index, scope.row)">查看</el-button>
              <el-button size="small" type="text" @click="Editfun(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="Delfun(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            property="sourceTitle"
            label="知识标题"
            width="400">
          </el-table-column>
          <el-table-column
            property="industry"
            label="行业偏好">
          </el-table-column>
          <el-table-column
            property="createTime"
            label="推送时间"
            width="200">
            <template scope="scope">
              {{ scope.row.updateTime | format}}
            </template>
          </el-table-column>
          <el-table-column
            label="浏览数"
            sortable
            property="readCount"
            width="100">
          </el-table-column>
        </el-table>
      </div>
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
</div>
</template>

<script>
    import pre from  '../../../config/preference';
    import formmate from '../../../config/date';
    import formmate2 from '../../../config/date2';
    export default {
        name:'headlines',
        data:function () {
          return {
            options: pre,
            headlines:[],
            api:'/pub/PGCsearch',
            del:'/pub/deleteColumn',
            total:0,
            index:1,
            form: {
              type:1,
              keyWord:"",
              bTime:'',
              eTime:'',
              indusPrefer:'',
              index:0,
              size:20,
              positionId:1,
            },
          }
        },
        mounted:function () {
          this.$nextTick(function () {
            var that = this;
            that.fetchData();
          });
        },
        methods:{
        Refresh(){
          window.location.reload();
        },
        /*fetchData*/
        fetchData(){
          var that = this;
          that.$http.post(that.api,JSON.stringify(that.form),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}).then(
            function (res) {
              that.headlines = res.data.responseData.column;
              that.total = res.data.responseData.totalNum;
            },function (res) {
              console.log(res)
            }
          );
        },
        /*clean words */
        handleIconClick(){
          this.form.keyWord = '';
        },
        // search
        onSearch(){
          var that = this;
          that.form.bTime = formmate(that.form.bTime);
          that.form.eTime = formmate2(that.form.eTime);
          if(that.form.bTime == 'NaN-aN-aN aN:aN:aN'){
            that.form.bTime = "";
          }
          if(that.form.eTime == 'NaN-aN-aN 23:59:59'){
            that.form.eTime = "";
          }
          that.fetchData()
        },
        // Newadd
        Newadd(){
          this.$router.push({path: '/headlines/added'})
        },
        //Seefun
        Seefun(key,val){
          this.$router.push({path: '/headlines/see/' + val.sourceId + '?type=' + val.columnType})
        },
        //Editfun
        Editfun(key,val){
          this.$router.push({path: '/headlines/edit/' + val.id})
          localStorage.setItem('toutiao',JSON.stringify(val));

        },
        //Delfun
        Delfun(key,val){
          let that = this;
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let deldate ={
              id:val.columnId
            };
            that.$http.post(that.del,JSON.stringify(deldate),{headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }}).then(
              function (res) {
                if(res.data.notification.notifInfo == "success"){
                  that.headlines.splice(key,1)
                  that.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }else {
                  that.$message.error('删除失败,请稍微尝试');
                }
              },function (res) {
                that.$message.error('服务请求数据失败,请联系开发人员');
              }
            );
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        handleCurrentChange(val) {
          var that =  this;
          that.form.index = val - 1;
          that.fetchData()
        },
      },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .headlines{
    display: block;
    margin: 20px 20px 0 20px;
    .loation{
      display: block;
      height:46px;
      line-height: 46px;
    }
  }
  .table-body{
    background: white;
    margin-top: 10px;
  }
  .serch{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 20px 0;
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 20px auto;
  }
</style>
