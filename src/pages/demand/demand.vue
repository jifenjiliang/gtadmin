<template>
  <div class="demand">
    <section class="section">
      <div class="loation"><router-link to="/demand">内容管理</router-link> >>需求管理</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form" label-width="80px">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="选择栏目名称" style="width: 140px">
              <el-option label="全部" :value="-1"></el-option>
              <el-option label="需求标题" :value="2"></el-option>
              <el-option label="发布人" :value="1"></el-option>
            </el-select>
            <el-input
              placeholder="请输入需求名称/发布人"
              icon="circle-close"
              style="width: 200px"
              v-model="form.keyWord"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="发布时间">
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
          <el-form-item label="需求来源" >
            <el-select placeholder="请选择"  v-model="form.source"  >
              <el-option label="全部" :value="2"></el-option>
              <el-option label="金桐脑需求" :value="0"></el-option>
              <el-option label="用户需求" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="全部" style="width: 140px">
              <el-option label="全部" :value="2"></el-option>
              <el-option label="正常" :value="0"></el-option>
              <el-option label="已禁用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区" >
            <el-select clearable v-model="peopleDate.firstIndustry" placeholder="请输入省" style="width: 200px">
              <el-option v-for="item in firstIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
            <el-select clearable v-model="peopleDate.secondIndustry" placeholder="请输入市" style="width: 200px">
              <el-option v-for="item in secondIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
            <el-select clearable v-model="peopleDate.threeIndustry" placeholder="请输入区" style="width: 200px">
              <el-option v-for="item in threeIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="需求分类" >
            <el-select clearable v-model="peopleDate.onetIndustry" placeholder="请输入一级分类" style="width: 200px">
              <el-option v-for="item in onetIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
            <el-select clearable v-model="peopleDate.twoIndustry" placeholder="请输二级分类" style="width: 200px">
              <el-option v-for="item in twoIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
            <el-select clearable v-model="peopleDate.strIndustry" placeholder="请输二级分类" style="width: 200px">
              <el-option v-for="item in strIndustrys" :value="item" :key="item.id"></el-option>
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
                {{scope.row.status == "0" ? "禁用" : "启用" }}
              </el-button><span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click="changeTop(scope.$index, scope.row)">
                {{scope.row.top == "0" ? "置顶" : "取消置顶" }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="需求标题">
            <template scope="scope">
              {{scope.row.demandTitle | demandTitle}}
            </template>
          </el-table-column>
          <el-table-column
            prop="onwerName"
            label="发布人"
            width="80">
          </el-table-column>
          <el-table-column
            width="200"
            prop="area"
            label="地区">
          </el-table-column>
          <el-table-column
            label="需求分类"
            width="200">
            <template scope="scope">
              {{scope.row.demandType | demandType}}
            </template>
          </el-table-column>
          <el-table-column
            label="需求来源"
            width="100">
            <template scope="scope">
              {{scope.row.userId | demandSource}}
            </template>
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
            label="阅读次数"
            sortable
            width="130">
          </el-table-column>
          <el-table-column
            prop="evaluatecount"
            sortable
            label="评论次数"
            width="130">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80">
            <template scope="scope">
              <span>
                {{scope.row.status == "0" ? '正常' : '已禁用' }}
              </span>
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

  import cityjson from '../../config/cityjson'
  import Requirement from '../../config/Requirement'
  import formmate from '../../config/date'
  import formmate2 from '../../config/date2'

  export default {
    name:'demand',
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
        api: '/demand/demand/searchDemand',
        statusapi:'/demand/demand/changeStatus',
        topapi:'/demand/demand/changePriority',
        form: {
          area:'' ,
          bTime:'',
          eTime:'',
          typeName:"", // 需求分类
          index:0,
          keyWord:'',
          size:20,
          status:2,
          type:-1,
          source:2,
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

      /*分类*/
      onetIndustrys: function() {
        if (!this.Requirementa) return
        var c = []
        for (var key in this.Requirementa) {
          c.push(key)
        }
        return c
      },
      twoIndustrys: function() {
        if (!this.Requirementa || !this.peopleDate.onetIndustry)
          return
        var c = []
        for (var key in this.Requirementa[this.peopleDate.onetIndustry]) {
          c.push(key)
        }
        return c
      },
      strIndustrys: function() {
        if (!this.Requirementa || !this.peopleDate.twoIndustry)
          return
        var c = []
        for (var key in this.Requirementa[this.peopleDate.onetIndustry][this.peopleDate.twoIndustry]) {
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
      },
      onetIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.onetIndustry = ''
        }
      },
      twoIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.twoIndustry = ''
        }
      },
      strIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.strIndustry = ''
        }
      },
    },
    mounted:function () {
      this.$nextTick(function () {
        var vm = this;
        vm.initlistdate();
      });
    },
    filters: {
      City:function (val) {
        if(val && val.name){
          return val.name
        }
      },
      District:function (val) {
        if(val && val.name){
          return val.name
        }
      },
      Province:function (val) {
        if(val && val.name){
          return val.name
        }
      },
      /*demandType*/
      demandType:function (str) {
        if(str == 257 || str == 258){
            return '需求-金融-投资'
        }
        if(str == 355 || str == 356){
          return '需求-教育-找老师'
        }
        if(str == 377 || str == 378){
          return '需求-医疗-找医生'
        }
        if(str == 419 || str == 420){
          return '需求-人力资源-HR招聘'
        }
        if(str == 421){
          return '需求-产品开发-项目'
        }
        if(str == 422){
          return '需求-产品开发-外包'
        }
        if(str == 423 || str == 424){
          return '需求-法律-找律师'
        }
        if(str == 451 || str == 452){
          return '服务-金融-找融资'
        }
        if(str == 549 || str == 550){
          return '服务-教育-教育咨询'
        }
        if(str == 571 || str == 572){
          return '服务-医疗-找医生'
        }
        if( str == 614){
          return '服务-人力资源-HR培训'
        }
        if( str == 613){
          return '服务-人力资源-猎头招聘'
        }
        if( str == 615){
          return '服务-产品开发-找项目'
        }
        if( str == 616){
          return '服务-产品开发-找外包'
        }
        if( str == 617){
          return '服务-法律-找律师'
        }
        if( str == 618){
          return '服务-法律-法律咨询'
        }
        if( str == 1053){
          return '需求-其它类型'
        }
        if( str == 1054){
          return '需求-大数据-找数据开发'
        }
        if( str == 1055){
          return '需求-大数据-数据服务'
        }
      },
      /*demandSource*/
      demandSource:function (str) {
          if(str == 0){
              return '金桐脑需求'
          }else{
            return '用户需求'
          }
      },
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
            that.Columnlist = res.data.responseData.demands;
            that.total = Number(res.data.responseData.totalNum);
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
        that.form.bTime = formmate(that.form.bTime);
        that.form.eTime = formmate2(that.form.eTime);
        if(that.form.bTime == 'NaN-aN-aN aN:aN:aN'){
          that.form.bTime = "";
        }
        if(that.form.eTime == 'NaN-aN-aN 23:59:59'){
          that.form.eTime = "";
        }
        that.form.area = that.peopleDate.firstIndustry + '-' + that.peopleDate.secondIndustry + '-' + that.peopleDate.threeIndustry;
        if(that.form.area == "--"){
          that.form.area = '';
        }
        var tyname = that.peopleDate.strIndustry == " " ? that.peopleDate.twoIndustry : that.peopleDate.strIndustry
        that.form.typeName = tyname;
        that.initlistdate();
      },
      // go detail
      currency(index,row) {
        this.$router.push({path: '/demand/' + row.demandId + '?demandType=' + row.demandType})
      },
      // go pages
      handleCurrentChange2(val) {
        var that =  this;
        that.form.index =  val - 1;
        that.initlistdate();
      },
      //changeStatus
      changeStatus(index,row){
        var that = this;
        var changeData = {
          demandId : row.demandId,
          status: row.status == "0" ? "1" : "0",
        };
        that.$http.post(that.statusapi,JSON.stringify(changeData),{
          headers:{
            sessionID :that.sessionid,
            s:'web',
          }
        }).then(function (res){
          if(res.data.responseData.status || res.data.responseData.status >= 0){
            that.$notify({
              title: '热词状态修改成功',
              type: 'success',
              duration: 1500
            });
            row.status = res.data.responseData.status;
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
        var changeTop = {
          demandId : row.demandId,
          top: row.top == "0" ? "1" : "0",
        };
       that.$http.post(that.topapi,JSON.stringify(changeTop),{
          headers:{
            sessionID :that.sessionid,
            s:'web',
          }
        }).then(function (res){
          if(res.data.responseData.top || res.data.responseData.status >= 0){
            that.$notify({
              title: '置顶修改成功',
              type: 'success',
              duration: 1500
            });
            row.top = res.data.responseData.top;
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
