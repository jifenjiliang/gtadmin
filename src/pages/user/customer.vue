<template>
  <div class="customer">
    <section class="section">
      <div class="loation"><router-link to="/customer">用户管理</router-link> >>客户管理</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form" :inline="true" :model="form" label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.ctype" placeholder="客户名称" style="width: 140px">
              <el-option label="客户名称" value="1"></el-option>
              <el-option label="法人&主要成员" value="2"></el-option>
              <el-option label="地址" value="3"></el-option>
            </el-select>
            <el-input
              placeholder="请输入关键词"
              icon="circle-close"
              style="width: 200px"
              v-model="form.keyword"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="行业" >
            <el-select v-model="form.firstIndustry" placeholder="一级行业" style="width: 140px">
              <el-option
                v-for="item in firstIndustrys"
                :value="item"
                :key="item.id"
              ></el-option>
            </el-select>
            <el-select v-model="form.secondIndustry" placeholder="二级行业" style="width: 140px">
              <el-option
                v-for="item in secondIndustrys"
                :value="item"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上市信息">
            <el-select v-model="form.stype" placeholder="全部" style="width: 140px">
              <el-option label="全部" value="0"></el-option>
              <el-option label="上市企业" value="1"></el-option>
              <el-option label="非上市企业" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select v-model="form.status" placeholder="全部" style="width: 140px">
              <el-option label="全部" value=""></el-option>
              <el-option label="正常" :value="nomod"></el-option>
              <el-option label="已禁用" :value="stops"></el-option>
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
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template scope="scope">
              <el-button
                size="text"
                @click="currency(scope.$index, scope.row)">查看 </el-button>
              <span style="color: #4db3ff;"> | </span>
              <el-button
                size="text"
                @click="changeStatus(scope.$index, scope.row)">
                {{ scope.row.status == 0 ? '禁用' : '启用' }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="客户名称">
          </el-table-column>
          <el-table-column
            label="行业"
            width="230">
            <template scope="scope">
              {{scope.row.firstIndustry }}{{scope.row.sencondindustry}}
            </template>
          </el-table-column>
          <el-table-column
            prop="legal_representative"
            label="法人"
            width="230">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="电话"
            width="200">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            label="启用状态"
            width="100">
            <template scope="scope">
              {{scope.row.status == 0 ? "正常" : "已禁用"}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="el-page"> <el-button type="primary" @click="Refresh"  style="float:left;">刷新</el-button>
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
  import industryjson from '../../config/industry'
  export default {
    name:'customer',
    data:function () {
      return {
        total: 0,
        api: '/cross/organ/organ/getOperationCustomerList.json',
        addressData:industryjson,
        restaurants: [],
        nomod:0,
        stops:1,
        form: {
          index:1,
          size:15,
          ctype:"1",
          keyword:'',
          stype:"0",
          status:'',
          firstIndustry:'',
          secondIndustry:'',
        },
        tableData:[],
        multipleSelection: []
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        this.fetchData()
      })
    },
    computed:{
      // 属于行业联动
      firstIndustrys:function(){
        if(!this.addressData)return
        var c=[]
        for(var key in this.addressData){
          c.push(key)
        }
        return c
      },
      secondIndustrys:function(){
        if(!this.addressData || !this.form.firstIndustry)
          return
        var c=[]
        for(var key in this.addressData[this.form.firstIndustry]){
          c.push(key)
        }
        return c
      },
    },
    watch:{
      // 属于行业联动
      firstIndustry:function(val,oldval){
        if(val!==oldval){
          this.firstIndustry=''
        }
      },
      secondIndustry:function(val,oldval){
        if(val!==oldval){
          this.secondIndustry=''
        }
      },
    },
    methods:{
      Refresh(){
        window.location.reload();
      },
      //初始化
      fetchData(){

        var that =  this;
        that.$http.post(that.api,JSON.stringify(that.form),{headers:{
          sessionID :localStorage.getItem('sessionID'),
          s:'web',
        }}).then(
          function (res) {
            that.tableData = res.body.responseData.page.listResults;
            that.total = res.body.responseData.page.total;
            that.loading = false;
          },function (res) {
            console.log(res)
          }
        )
      },
        handleIconClick(){
        this.form.keyword = '';
      },
      // 搜索
      onSearch(){
        var that =  this;
        that.loading = true;
        that.fetchData();
      },
      // 分页跳转
      handleCurrentChange(val) {
        var that =  this;
        that.form.index =  val;
        that.fetchData();
      },
      // 跳转详情pages
      currency(index,row) {
        this.$router.push({path: '/customer/' + row.customerId})
      },
      // 更改状态
      changeStatus(index,row){
        var that = this;
        var changeData = {
          customerId : row.customerId,
          type: row.status == 0 ? 1 : 0
        };
        that.$http.post('/cross/organ/customer/updateDigDataType.json',JSON.stringify(changeData),{headers:{
          sessionID :localStorage.getItem('sessionID'),
          s:'web',
        }}).then(
          function (res) {
             if(res.body.success){
               that.$notify({
                 title: '客户状态修改成功',
                 type: 'success',
                 duration: 1500
               });
               if(changeData.type == 1){
                 row.status = 1;
               }else{
                 row.status = 0;
               }
             }else {
               that.$notify.error({
                 title: '操作失败,请稍后重试...',
                 duration: 1500
               });
             }
          },function (res) {
            console.log(res)
          }
        )

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
</style>
