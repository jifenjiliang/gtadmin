<template>
  <div class="payment">
    <section class="section">
      <div class="loation"><router-link to="/payment">支付统计</router-link> >>用户支付清单</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form" label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="订单编号" style="width: 140px">
              <el-option label="订单编号" :value="1"></el-option>
              <el-option label="支付单号" :value="2"></el-option>
              <el-option label="用户姓名" :value="3"></el-option>
              <el-option label="用户账号" :value="4"></el-option>
            </el-select>
            <el-input
              placeholder="请输入订单编号,支付单号,用户姓名,用户账号"
              icon="circle-close"
              style="width: 350px"
              v-model="form.keyWord"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-select v-model="form.payType" placeholder="全部" style="width: 140px">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="支付宝" :value="2"></el-option>
              <el-option label="微信" :value="1"></el-option>
              <el-option label="金桐零钱" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付费类型">
            <el-select v-model="form.sourceType" placeholder="全部" style="width: 140px">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="会员费" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单日期">
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
          <el-form-item>
            <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
            <el-button type="primary" @click="Nocvs" icon="edit">导出CSV文件</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="Payment"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="80">
          </el-table-column>
          <el-table-column
            property="payOrderNo"
            label="订单编号"
            >
          </el-table-column>
          <el-table-column
            property="payId"
            label="支付单号"
            >
          </el-table-column>
          <el-table-column
            label="支付方式"
            width="100">
            <template scope="scope">
              {{ scope.row.payTypeCode | payTypeCode}}
            </template>
          </el-table-column>
          <el-table-column
            property="userName"
            width="100"
            label="用户姓名">
          </el-table-column>
          <el-table-column
            property="mobile"
            label="用户账号"
            width="150">
          </el-table-column>
          <el-table-column
            label="订单日期"
            width="200"
            >
            <template scope="scope">
              {{ scope.row.startTime | format}}
            </template>
          </el-table-column>
          <el-table-column
            label="订单金额"
            width="100">
            <template scope="scope">
              {{ scope.row.payAmount / 100.0 }}  ￥
            </template>
          </el-table-column>
          <el-table-column
            label="付费类型"
            width="100">
            <template scope="scope">
              {{ scope.row.sourceType | sourceType}}
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
    name:'payment',
    data:function () {
      return {
        dialogVisible: true,
        total: 0,
        index:1,
        id:null,
        form: {
          type:1,
          index:0,
          size:10,
          payType:0,
          bTime:'',
          eTime:'',
          sourceType:0,
          keyWord:'',
        },
        api:'/payment/payment/searchAndGetPayOrders',
        sessionid:localStorage.getItem('sessionID'),
        Payment:[],
      }
    },
    filters:{
      sourceType:function (val) {
        if(val == 1){
          return '会员费'
        }else{
          return '全部'
        }
      },
      payTypeCode:function (val) {
        switch(val)
        {
          case 0:
            return '全部';
            break;
          case 2:
            return '支付宝';
            break;
          case 1:
            return '微信';
            break;
          case 3:
            return '金桐桐钱';
            break;
          default:
            return '全部';
        }
      },
    },
    mounted:function () {
      this.$nextTick(function () {
        var that = this;
        that.initlistdate();
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
            that.Payment = res.data.responseData.payOrders;
            that.total = res.data.responseData.totalNum;
          },function (res) {
            console.log(res)
          }
        );
      },
      handleIconClick(){
        let vm = this;
        vm.form.keyWord = '';
      },
      Nocvs(){
        this.$message({
          message: '该功能暂未实现',
          type: 'warning'
        });
      },
      onSearch(){
        var that =  this;
        that.form.bTime = formmate(that.form.bTime);
        that.form.eTime = formmate2(that.form.eTime);

        if(that.form.bTime == 'NaN-aN-aN aN:aN:aN'){
          that.form.bTime = "";
        }
        if(that.form.eTime == 'NaN-aN-aN 23:59:59'){
          that.form.eTime = "";
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
