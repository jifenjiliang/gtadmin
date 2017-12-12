<template>
  <div class="connection">
    <section class="section">
      <div class="loation"><router-link to="/connection">用户管理</router-link> >>人脉管理</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form" label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="选择栏目名称" >
              <el-option label="姓名" :value="1"></el-option>
              <el-option label="公司名称" :value="2"></el-option>
              <el-option label="职位" :value="3"></el-option>
            </el-select>
            <el-input
              placeholder="请输入关键词"
              icon="circle-close"
              style="width: 300px"
              v-model="form.keyword"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="职能">
            <el-select clearable v-model="Peopledate.orgtIndustry" placeholder="请输入一级分类" >
              <el-option v-for="item in orgtIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
            <el-select clearable v-model="Peopledate.orgsIndustry" placeholder="请输入二级分类" >
              <el-option v-for="item in orgsIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.gender" placeholder="全部" >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
              <el-option label="未知" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地区" >
            <el-select clearable v-model="Peopledate.firstIndustry" placeholder="请输入省" >
              <el-option v-for="item in firstIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
            <el-select clearable v-model="Peopledate.secondIndustry" placeholder="请输入市" >
              <el-option v-for="item in secondIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
            <el-select clearable v-model="Peopledate.threeIndustry" placeholder="请输入区">
              <el-option v-for="item in threeIndustrys" :value="item" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人脉类别">
            <el-select v-model="form.personType" placeholder="全部" >
              <el-option label="全部" :value="0"></el-option>
              <el-option label="用户人脉" :value="1"></el-option>
              <el-option label="大数据人脉" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select v-model="form.status" placeholder="全部" >
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
          v-loading="loading"
          element-loading-text="拼命加载中"
          border
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
                {{Number(Columnlist[scope.$index].status) == 0 ? '禁用' : '启用'}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="150">
          </el-table-column>
          <el-table-column
            label="性别"
            width="150">
            <template scope="scope">
              <span>{{scope.row.gender | Gender}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="职能">
            <template scope="scope">
              <span>{{scope.row.firstFunction}} {{scope.row.secondFunction}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="职位"
            prop="position"
            width="200">
          </el-table-column>
          <el-table-column
            label="公司"
            prop="company"
            width="250">
          </el-table-column>
          <el-table-column
            label="地区"
            width="200">
            <template scope="scope">
              <span>{{scope.row.provice}} {{scope.row.city}} {{scope.row.county}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="人脉类别"
            width="180">
            <template scope="scope">
              <span>{{scope.row.personType | personType}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100">
            <template scope="scope">
              <span>{{ Number(Columnlist[scope.$index].status) == 0 ? '正常' : '已禁用' }}</span>
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
  import cityjson from '../../config/citys'
  import Dsid from '../../config/people'
  import formmate from '../../config/date'
  import formmate2 from '../../config/date2'
  export default {
    name:'connection',
    data:function () {
      return {
        index:1,
        total: 0,
        loading:true,
        addressData: cityjson,
        AaddressData:Dsid,
        Peopledate:{
          firstIndustry: '',
          secondIndustry: '',
          threeIndustry: '',
          orgtIndustry:'',
          orgsIndustry:'',
        },
        form: {
          city:'',
          county:'',
          firstFunction:'',
          secondFunction:'',
          gender:0,
          index:0,
          size:15,
          keyword:'',
          personType:0,
          province:'',
          status:0,
          type:1,
        },
        api: '/cross/person/getAllPersonList.json',
        statusapi:'/cross/person/updatePersonStatus.json',
        sessionid:localStorage.getItem('sessionID'),
        Columnlist:[],
      }
    },
    computed: {
      firstIndustrys: function() {
        if (!this.addressData) return
        if(!this.addressData[this.Peopledate.firstIndustry]){
          this.Peopledate.secondIndustry = "";
        }
        var c = []
        for (var key in this.addressData) {
          c.push(key)
        }
        return c
      },
      secondIndustrys: function() {
        if (!this.addressData || !this.Peopledate.firstIndustry)
          return
        if(!this.addressData[this.Peopledate.firstIndustry][this.Peopledate.secondIndustry]){
          this.Peopledate.threeIndustry = "";
        }
        var c = []
        for (var key in this.addressData[this.Peopledate.firstIndustry]) {
          c.push(key)
        }
        return c
      },
      threeIndustrys: function() {
        if (!this.addressData || !this.Peopledate.secondIndustry)
          return
        var c = []
        for (var key in this.addressData[this.Peopledate.firstIndustry][this.Peopledate.secondIndustry]) {
          c.push(key)
        }
        return c
      },
      /*行业*/
      orgtIndustrys:function () {
        if (!this.AaddressData) return
        var c = []
        for (var key in this.AaddressData) {
          c.push(key)
        }
        return c
      },
      orgsIndustrys:function () {
        if (!this.AaddressData || !this.Peopledate.orgtIndustry)
          return

        var c = []
        for (var key in this.AaddressData[this.Peopledate.orgtIndustry]) {
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
      orgtIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.orgtIndustry = ''
        }
      },
      orgsIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.orgsIndustry = ''
        }
      }

    },
    filters:{
      personType:function (value) {
          if(value == 2){
              return '用户人脉'
          }else{
              return '大数据人脉'
          }
      },
      Gender:function (value) {
      if(Number(value) == 1){
          return '全部'
        }else if(Number(value)== 2){
          return '男'
        }else if(Number(value)==3){
          return '女'
        }else{
          return '未知'
        }
      },
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
            that.Columnlist = res.data.responseData.listResults;
            that.total = Number(res.data.responseData.total);
            that.loading = false;
          },function (res) {
            console.log(res)
          }
        );
      },
      handleIconClick(){
        let vm = this;
        vm.form.keyword = '';
      },
      onSearch(){
        var that =  this;
        that.loading = true;
        that.form.firstFunction = that.Peopledate.orgtIndustry;
        that.form.secondFunction = that.Peopledate.orgsIndustry;
        that.form.province = that.Peopledate.firstIndustry;
        that.form.city = that.Peopledate.secondIndustry;
        that.form.county = that.Peopledate.threeIndustry;
        that.initlistdate();
      },
      currency(index,row) {
        this.$router.push({path: '/connection/' + row.id})
      },
      changeStatus(index,row){
        var that = this;
        var changeData = {
          peopleId : row.id,
          status: row.status == 0 ? 1 : 0,
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
