<template>
  <div class="activity">
    <section class="section">
      <div class="loation"><router-link to="/activity">内容管理</router-link> >>活动管理</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form" :value="0" label-width="90px">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="选择栏目名称" style="width: 140px">
              <el-option label="活动名称" :value="0"></el-option>
              <el-option label="发布人" :value="1"></el-option>
            </el-select>
            <el-input
              placeholder="请输入活动名称/发布人"
              icon="circle-close"
              style="width: 300px"
              v-model="form.keyword"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="活动地区" >
            <el-select clearable v-model="peopleDate.firstIndustry" placeholder="请输入省" style="width: 240px">
              <el-option v-for="item in firstIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
            <el-select clearable v-model="peopleDate.secondIndustry" placeholder="请输入市" style="width: 240px">
              <el-option v-for="item in secondIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
            <el-select clearable v-model="peopleDate.threeIndustry" placeholder="请输入区" style="width: 240px">
              <el-option v-for="item in threeIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
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
            <el-select v-model="form.disable" placeholder="全部" style="width: 140px">
              <el-option label="已启用" :value="0"></el-option>
              <el-option label="已禁用" :value="1"></el-option>
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
          tooltip-effect="dark"
          :default-sort = "{prop: 'createTime', order: 'readCount'}"
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template scope="scope">
              <el-button
                size="small"
                type="text"
                @click="currency(scope.$index, scope.row)">查看</el-button><span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click="changeStatus(scope.$index, scope.row)">
                {{scope.row.disable == "0" ? "禁用" : "启用" }}
              </el-button>
              <span style="color: #4db3ff;" v-show="!scope.row.disable"> | </span>
              <el-button
                size="small"
                type="text"
                @click="changeTop(scope.$index, scope.row)"
                v-show="!scope.row.disable"
                >
                {{scope.row.top == "0" ? "置顶" : "取消置顶" }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="活动名称">
            <template scope="scope">
              {{scope.row.meetingName}}
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            sortable
            label="活动时间"
            width="350">
            <template scope="scope">
              {{ scope.row.startTime}} - {{ scope.row.endTime}}
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            prop="area"
            label="活动地区">
            <template scope="scope">
            {{scope.row.province}}-{{scope.row.city}}-{{scope.row.town}}
            </template>
          </el-table-column>
          <el-table-column
            label="发布人"
            width="200">
            <template scope="scope">
              {{scope.row.createName}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100">
            <template scope="scope">
              <!-- {{scope.row.meetingStatus | filtermeetingStatus}} -->
              {{scope.row.disable == "0" ? "正常" : "已禁用" }}
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
  //<!--活动状态 0：草稿，1：发起，2：活动进行中，3：活动结束-->
  import cityjson from '../../config/cityjson'
  import Requirement from '../../config/Requirement'
  import formmate from '../../config/date'
  import formmate2 from '../../config/date2'

  export default {
    name:'activity',
    data:function () {
      return {
        /*状态*/
        total: 0,
        index:1,
        area:'',
        /*省市联动*/
        addressData: cityjson,
        Requirementa:Requirement,
        peopleDate:{
          firstIndustry: '',
          secondIndustry: '',
          threeIndustry: '',
          onetIndustry:'',
          twoIndustry:'',
          strIndustry:'',
        },
        api: '/crossmeeting/common/getMeetingList',
        apiStatusEnable:'/crossmeeting/common/enable',
        apiStatusDisable: '/crossmeeting/common/disable',
        apiTopAdd: '/crossmeeting/common/top',
        apiTopDelete:'/crossmeeting/common/deleteTop',
        form: {
          type : null,//关键字搜索类型 0：活动名称 1：主办人
          keyword:null,//关键字
          province:null,//省
          city : null,//市
          town : null,//区
          disable : null,//0已禁用  1已启用
          startTime :null,
          endTime : null,
          index:0,
          size:10,
        },
        sessionid:localStorage.getItem('sessionID'),
        Columnlist:[],
      }
    },
    computed: {
      /*省市区*/
      firstIndustrys: function() {
        if (!this.addressData) return
        if(!this.addressData[this.peopleDate.firstIndustry]){
          this.peopleDate.secondIndustry = "";
        }
        var c = []
        for (var key in this.addressData) {
          c.push(key)
        }
        return c
      },
      secondIndustrys: function() {
        if (!this.addressData || !this.peopleDate.firstIndustry)
          return
        var c = []
        for (var key in this.addressData[this.peopleDate.firstIndustry]) {
          c.push(key)
        }
        return c
      },
      threeIndustrys: function() {
        if (!this.addressData || !this.peopleDate.secondIndustry)
          return
        var c = []
        for (var key in this.addressData[this.peopleDate.firstIndustry][this.peopleDate.secondIndustry]) {
          c.push(key)
        }
        return c
      },
    },
    watch: {
      firstIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.firstIndustry = ''
        }
      },
      secondIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.secondIndustry = ''
        }
      },
      threeIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.threeIndustry = ''
        }
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        var vm = this;
        vm.initlistdate();
      });
    },
    filters: {
      filtermeetingStatus:function (val) {
        switch (val){
          case 0:
            return '草稿';
          case 1:
            return '发起';
          case 2:
            return '进行中';
          case 3:
            return '已结束';
          default:
            return '其他'
          }
      }
    },
    methods:{
      Refresh(){
        window.location.reload();
      },
      initlistdate:function () {
        var that = this;
        // init date
        that.$http.post(that.api,JSON.stringify(that.form),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.Columnlist = res.data.responseData.list;
            that.total = Number(res.data.responseData.totalCount);
          },function (res) {
            console.log(res)
          }
        );
      },
      // clean keywords
      handleIconClick(){
        let vm = this;
        vm.form.keyWord = '';
      },
      // search
      onSearch(){
        var that =  this;
        that.form.startTime = that.form.startTime && that.form.startTime!='' ? formmate(that.form.startTime) : null;
        that.form.endTime = that.form.endTime && that.form.endTime!='' ? formmate2(that.form.endTime) : null;
        if(that.form.startTime == 'NaN-aN-aN aN:aN:aN'){
          that.form.startTime = "";
        }
        if(that.form.endTime == 'NaN-aN-aN 23:59:59'){
          that.form.endTime = "";
        }
        that.form.province = that.peopleDate.firstIndustry;
        that.form.city = that.peopleDate.secondIndustry;
        that.form.town = that.peopleDate.threeIndustry;
        that.initlistdate();
      },
      // go detail
      currency(index,row) {
        this.$router.push({path: '/activity/' + row.id})
      },
      // go pages
      handleCurrentChange2(val) {
        var that =  this;
        that.form.index =  val - 1;
        that.initlistdate();
      },
      //changeStatus
      changeStatus(index,row){
        console.log(row)
        var that = this;
        var action = row.disable== '0' ? '禁用' : '启用';
        var statusApi = (row.disable== '0' ? that.apiStatusDisable : that.apiStatusEnable) +'/'+ row.id
        that.$http.post(statusApi,'',{
          headers:{
            sessionID :that.sessionid,
            s:'web',
          }
        }).then(function (res){
          if(res.data.notification.notifInfo && res.data.notification.notifInfo == 'success'){
            that.$notify({
              title: action+'成功~',
              type: 'success',
              duration: 1500
            });
            row.disable = row.disable==0?1:0;
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
      // changeTop
      changeTop(index,row){
        var that = this;
        var action = row.top== '0' ? '置顶' : '取消置顶';
        var topApi = (row.top== '0' ? that.apiTopAdd : that.apiTopDelete) +'/'+ row.id
        that.$http.post(topApi,'',{
          headers:{
            sessionID :that.sessionid,
            s:'web',
          }
        }).then(function (res){
          if(res.data.responseData){
            that.$notify({
              title: action + '成功~',
              type: 'success',
              duration: 1500
            });
            row.top = row.top==0?1:0;
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
