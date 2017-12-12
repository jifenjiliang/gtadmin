<template>
  <div class="personal">
    <section class="section">
      <div class="loation"><router-link to="/personal">用户管理</router-link> >>个人用户管理</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form" label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="选择栏目名称" style="width: 140px">
              <el-option label="姓名" :value="1"></el-option>
              <el-option label="手机号" :value="2"></el-option>
              <el-option label="邮箱" :value="3"></el-option>
            </el-select>
            <el-input
              placeholder="请输入关键词"
              icon="circle-close"
              style="width: 300px"
              v-model="form.keyword"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="注册时间">
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
              <el-option label="全部" :value="0"></el-option>
              <el-option label="正常" :value="1"></el-option>
              <el-option label="已禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
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
            width="80">
          </el-table-column>
          <el-table-column label="操作"width="120">
            <template scope="scope">
              <el-button size="small" type="text" @click="currency(scope.$index, scope.row)">查看</el-button>
              <span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click="changeStatus(scope.$index, scope.row)">
                {{Number(Columnlist[scope.$index].status) == 1 ? '禁用' : '启用'}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            property="name"
            label="姓名"
            width="250">
          </el-table-column>
          <el-table-column
            property="mobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            property="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            label="注册时间"
            width="200">
            <template scope="scope">
              {{ scope.row.ctime}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="150">
            <template scope="scope">
              <span>{{ Number(Columnlist[scope.$index].status) == 1 ? '正常' : '已禁用' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="el-page">
        <el-button type="primary" @click="Refresh"  style="float:left;">刷新</el-button>
        <el-pagination
          @current-change="handleCurrentChange2"
          :current-page="index"
          :page-size="form.size"
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
    name:'personal',
    data:function () {
      return {
        index:1,
        total: 0,
        loading:true,
        form: {
          startTime:"",
          endTime:"",
          index:0,
          keyword:"",
          size:15,
          status:1,
          type:1,
        },
        api: '/cross/person/getAllUserList.json',
        statusapi:'/cross/person/updateUserStatus.json',
        sessionid:localStorage.getItem('sessionID'),
        Columnlist:[],
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        this.initlistdate();
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
            that.Columnlist = res.data.responseData.list;
            that.total = Number(res.data.responseData.count);
            that.loading = false;
          },function (res) {
            console.log(res)
          }
        );
      },
      handleIconClick(){
        let vm = this;
        vm.form.keyWord = '';
      },
      onSearch(){
        var that =  this;
        that.loading = true;
        that.form.startTime = formmate(that.form.startTime);
        that.form.endTime = formmate2(that.form.endTime);

        if(that.form.startTime == 'NaN-aN-aN aN:aN:aN'){
          that.form.startTime = "";
        }
        if(that.form.endTime == 'NaN-aN-aN 23:59:59'){
          that.form.endTime = "";
        }
        that.initlistdate();
      },
      currency(index,row) {
        this.$router.push({path: '/personal/' + row.id})
      },
      changeStatus(index,row){
        var that = this;
        var changeData = {
          userId : row.id,
          status:row.status == 1 ? 2 : 1,
        };
        that.$http.post(that.statusapi,JSON.stringify(changeData),{
          headers:{
            sessionID :that.sessionid,
            s:'web',
          }
        }).then(function (res){
          if(res.data.responseData.succeed == true){
            that.$notify({
              title: '热词状态修改成功',
              type: 'success',
              duration: 1500
            });
            that.initlistdate();
          }else{
            that.$notify.error({
              title: '操作失败,请稍后重试...',
              duration: 1500
            });
          }
        },function(error){
          console.log(error)
        })
      },
      // 分页跳转
      handleCurrentChange2(val) {
        var that =  this;
        that.loading = true;
        that.form.index =  val - 1;
        that.initlistdate();
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
    margin: 20px auto;
  }
</style>
