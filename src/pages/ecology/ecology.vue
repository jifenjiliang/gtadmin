<template>
  <div class="ecology">
    <section class="section">
      <div class="loation"><router-link to="/ecology">内容管理</router-link> >>生态推荐</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form"  label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="生态热词" style="width: 140px">
              <el-option label="生态热词" :value="hotWords"></el-option>
              <el-option label="创建人" :value="createMan"></el-option>
            </el-select>
            <el-input
              placeholder="请输入关键词"
              icon="circle-close"
              style="width: 200px"
              v-model="form.keyword"
              :on-icon-click="handleIconClick"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col  :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.startTime"
                :picker-options="pickerOptions"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="form.endTime"
                :picker-options="pickerOptions"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="全部" style="width: 140px">
              <el-option label="全部" :value="all"></el-option>
              <el-option label="正常" :value="normal"></el-option>
              <el-option label="已禁用" :value="stree"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
            <el-button type="primary" @click="goaddecology" icon="edit">新增热词</el-button>
            <v-Position></v-Position>
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="ecology"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column label="操作"
             width="120">
            <template scope="scope">
              <el-button
                size="small"
                type="text"
                @click="currency(scope.$index, scope.row)">编辑</el-button><span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click="changeStatus(scope.$index, scope.row)">
                {{ecology[scope.$index].status == "正常" ? '禁用' : '启用'}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="生态热词">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="创建人"
            width="150">
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="创建时间"
            width="250">
          </el-table-column>
          <el-table-column
            prop="peopleCount"
            label="关联人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="customerCount"
            label="关联客户"
            width="120">
          </el-table-column>
          <el-table-column
            prop="knowledgeCount"
            label="关联知识"
            width="120">
          </el-table-column>
          <el-table-column
            prop="demandCount"
            label="关联需求"
            width="120">
          </el-table-column>
          <el-table-column
            label="状态"
            width="80">
            <template scope="scope">
              <span>{{scope.row.status}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
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

  import dealDate from '../../config/date'
  import dealDate2 from '../../config/date2'
  import position from '../../components/Position.vue'

  export default {
    name:'ecology',
    components:{
      'v-Position':position
    },
    data:function () {
      return {
        hotWords: 1,
        createMan: 2,
        normal:0,
        stree:1,
        all:2,
        total: 0,
        isActive:false,
        form: {
          index:1,
          size:15,
          type:1,
          keyword:'',
          startTime:'',
          endTime:'',
          status:2,
        },
        api: '/cross/organ/newWords/listNewWords.json',
        sessionid:localStorage.getItem('sessionID'),
        ecology:[],
        pickerOptions: {
          /*  disabledDate(time) {
           return time.getTime() < Date.now() - 8.64e7;
           }*/
        },
      }

    },
    mounted:function () {
      this.$nextTick(function () {
        // 初始化请求数据
        var that =  this;
        that.$http.post(that.api,JSON.stringify(that.form),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.ecology = that.dealData(res.data.responseData.newWordsList);
            that.total =  res.data.responseData.count;
          },function (res) {
            console.log(res)
          }
        );

      })

    },
    methods:{
      Refresh(){
        window.location.reload();
      },
      handleIconClick(){
        this.form.keyword = '';
      },
      // 搜索
      onSearch(){
        var that =  this;

        that.form.startTime = dealDate(that.form.startTime);
        that.form.endTime = dealDate2(that.form.endTime);

        if(that.form.startTime == 'NaN-aN-aN aN:aN:aN'){
          that.form.startTime = "";
        }
        if(that.form.endTime == 'NaN-aN-aN 23:59:59'){
          that.form.endTime = "";
        }
        that.$http.post(that.api,JSON.stringify(that.form),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.ecology = that.dealData(res.data.responseData.newWordsList);
            that.total =  res.data.responseData.count;
          },function (res) {
            console.log(res)
          }
        )
      },
      // 跳转添加pages
      goaddecology(){
        this.$router.push({path: '/addecology/'})
      },
      // 跳转编辑pages
      currency(index,row) {
        this.$router.push({path: '/editecology/' + row.id})
      },
      //更改状态
      changeStatus(index,row){
        var that = this;
        console.log(row)
        var changeData = {
          id : row.id,
        }
        if(row.status == "正常"){
          changeData.status = 1;
        }else{
          changeData.status = 0;
        }
        console.log(changeData)
        that.$http.post('/cross/organ/newWords/updateNewWordsStatus.json',JSON.stringify(changeData),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            if (res.body.responseData.success) {
              if(row.status == "正常"){
                that.$notify({
                  title: '禁用热词成功',
                  type: 'success',
                  duration: 1500
                });
              }else{
                that.$notify({
                  title: '启用热词成功',
                  type: 'success',
                  duration: 1500
                });
              }
              that.onSearch();
            }else{
              that.$notify.error({
                title: '操作失败,请稍后重试...',
                duration: 1500
              });
            }
          },function (res) {
            that.$notify.error({
              title: '操作失败,请稍后重试...',
              duration: 1500
            });
          }
        )
      },
      // 分页跳转
      handleCurrentChange(val) {
        var that =  this;
        that.currentPage = val;
        that.form.index =  that.currentPage
        that.$http.post(that.api,JSON.stringify(that.form),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.ecology = that.dealData(res.data.responseData.newWordsList);
            that.total =  res.data.responseData.count;
          },function (res) {
            console.log(res)
          }
        )
      },
      dealData:function(res){
        var that = this;
        for(var key in res){
          if (res[key].status == 1) {
            res[key].status = '已禁用';
          }else if(res[key].status == 0){
            res[key].status = '正常';
          }
          res[key].ctime = dealDate(res[key].ctime);
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
  .touchcolor{
    color: #f85f48;
  }
</style>
