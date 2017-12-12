<template>
  <div class="column">
    <section class="section">
      <div class="loation"><router-link to="/member">会员管理</router-link> >>会员列表</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form" label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="会员用户账号" style="width: 140px">
              <el-option label="会员用户姓名" :value="1"></el-option>
              <el-option label="手机号" :value="2"></el-option>
            </el-select>
            <el-input
              placeholder="请输入订单编号,支付单号,用户姓名,用户账号"
              icon="circle-close"
              style="width: 350px"
              v-model="form.keyword"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="开通日期">
            <el-col  :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.startTime1"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="form.startTime2"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-col  :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.endTime1"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="form.endTime2"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="会员状态">
            <el-select v-model="form.status" placeholder="全部" style="width: 140px">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="正常" :value="1"></el-option>
              <el-option label="已过期" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
            <!--<el-button type="primary"  icon="edit">导出CSV文件</el-button>-->
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="Columnlist"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            property="mobile"
            label="会员用户账号"
           >
          </el-table-column>
          <el-table-column
            property="userName"
            label="会员用户姓名"
            width="150">
          </el-table-column>
          <el-table-column
            property="mobile"
            label="手机号"
            width="200">
          </el-table-column>
          <el-table-column
            width="200"
            label="会员有效期">
            <template scope="scope">
              {{ scope.row.utime | format}}
            </template>
          </el-table-column>
          <el-table-column
            label="开通日期"
            width="200">
            <template scope="scope">
              {{ scope.row.startTime | format}}
            </template>
          </el-table-column>
          <el-table-column
            label="结束日期"
            width="200">
            <template scope="scope">
              {{ scope.row.endTime | format}}
            </template>
          </el-table-column>
          <el-table-column
            label="付费金额"
            property="money"
            width="150">
            <template scope="scope">
              {{ scope.row.money / 100 }} ￥
            </template>
          </el-table-column>
          <el-table-column
            label="会员状态"
            width="150">
            <template scope="scope">
              {{ scope.row.status | Status}}
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
    name:'column',
    data:function () {
      return {
        total: 0,
        index:1,
        id:null,
        form: {
          index:0,
          size:10,
          endTime1:'',
          endTime2:'',
          keyword:'',
          startTime1:'',
          startTime2:'',
          status:0,
          type:1,
        },
        api: '/payment/payment/getOperationAssociator.json',
        statusapi:'pub/changeColumnStatus',
        sessionid:localStorage.getItem('sessionID'),
        Columnlist:null,
        positionList:[],
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        var that = this;
        that.initlistdate();
      });
    },
    filters:{
      Status:function (str) {
          if(str == 0){
              return '全部'
          }else if(str == 1){
              return '正常'
          }else {
              return '已过期'
          }
      }
    },
    methods:{
      Refresh(){
        window.location.reload();
      },
      initlistdate:function () {
        var that = this;
        // 初始化请求数据
        that.$http.post(that.api,JSON.stringify(that.form),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.Columnlist = res.data.responseData.list;
            that.total = res.data.responseData.count;
          },function (res) {
            console.log(res)
          }
        );
      },
      handleIconClick(){
        let vm = this;
        vm.form.keyword = '';
      },
      //搜索
      onSearch(){
        var that =  this;
        that.form.endTime1 = formmate(that.form.endTime1);
        that.form.endTime2 = formmate2(that.form.endTime2);
        that.form.startTime1 = formmate(that.form.startTime1);
        that.form.startTime2 = formmate2(that.form.startTime2);

        if(that.form.endTime1 == 'NaN-aN-aN aN:aN:aN'){
          that.form.endTime1 = "";
        }
        if(that.form.endTime2 == 'NaN-aN-aN 23:59:59'){
          that.form.endTime2 = "";
        }
        if(that.form.startTime1 == 'NaN-aN-aN aN:aN:aN'){
          that.form.startTime1 = "";
        }
        if(that.form.startTime2 == 'NaN-aN-aN 23:59:59'){
          that.form.startTime2 = "";
        }

        that.initlistdate();
      },
      // 分页跳转
      handleCurrentChange2(val) {
        var that =  this;
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
