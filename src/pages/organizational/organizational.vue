<template>
  <div class="organum">
    <section class="section">
      <div class="loation"><router-link to="/organum">用户管理</router-link> >>组织用户管理</div>
      <div class="serch">
        <el-form ref="form" :inline="true" :model="form">
            <el-form-item label="认证状态">
              <el-select v-model="form.isAuth" placeholder="全部">
                <el-option label="全部" value="0"></el-option>
                <el-option label="已认证" value="1"></el-option>
                <el-option label="未认证" value="2"></el-option>
                <el-option label="待审核" value="3"></el-option>
                <el-option label="禁用" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织类型">
              <el-select v-model="form.orgType" placeholder="全部">
                <el-option label="全部" value="0"></el-option>
                <el-option label="企业" value="1"></el-option>
                <el-option label="政府" value="2"></el-option>
                <el-option label="教育" value="5"></el-option>
                <el-option label="医疗" value="6"></el-option>
                <el-option label="媒体" value="3"></el-option>
                <el-option label="其它" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织全称">            
              <el-input v-model="form.organAllNumber" ></el-input>
            </el-form-item>
            <el-form-item label="绑定手机号">            
              <el-input v-model="form.mobile" ></el-input>
            </el-form-item>
            <el-form-item label="社会同一信用代码">            
              <el-input v-model="form.socialCreditCode" ></el-input>
            </el-form-item>
            
            <el-form-item label="工商营业执照号">            
              <el-input v-model="form.businessRegistNumber" ></el-input>
            </el-form-item>

            <el-form-item label="金桐号">            
              <el-input v-model="form.organNumber" ></el-input>
            </el-form-item>
            <el-form-item label="注册日期">
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

            <el-form-item label="认证日期">
              <el-col  :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.authStartTime"
                  style="width: 100%;">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  v-model="form.authEndTime"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-form-item>
          <el-row>
          <el-form-item>
            <el-button type="primary" @click="onSearch"  icon="search">搜索</el-button>
            <!-- <el-button type="default" @click="onReset('form')"  icon="reset">重置</el-button> -->
            <el-button type="primary" @click="onPublish" icon="edit">创建组织</el-button>
          </el-form-item>
          </el-row>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="UserorgManage"
          border
          tooltip-effect="dark"
          style="width: 100%; font-size:13px;">
          <el-table-column
            width="60"
            type="index">
          </el-table-column>
          <el-table-column
            width="120"
            label="操作">
            <template scope="scope">
              <el-button
                size="text"
                @click="currency(scope.$index, scope.row)">查看</el-button><span style="color: #4db3ff;"> | </span>
              <el-button
                size="text"
                @click="changeStatus(scope.$index, scope.row)">
                {{scope.row.status== false ? '禁用' : '启用'}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="organNumber"
            label="金桐号">
          </el-table-column>
          <el-table-column
            prop="organName"
            label="组织名称"
            >
          </el-table-column>
          <el-table-column
            prop="organAllName"
            label="组织全称"
            >
          </el-table-column>
          <el-table-column
            label="组织类型" 
            prop="orgType">
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="注册时间">
          </el-table-column>
          <el-table-column
            label="认证时间">
            <template scope="scope">
              {{ scope.row.authTime | format}}
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            label="绑手机号">
          </el-table-column>         
          <el-table-column
            label="认证状态">
            <template scope="scope">
              {{ scope.row.isAuth | authState}}
            </template>
          </el-table-column>
          <el-table-column
            prop="socialCreditCode"
            label="统一社会信用代码">
          </el-table-column>
          <el-table-column
            prop="businessRegistNumber"
            label="工商营业执照号">
          </el-table-column>         
          <el-table-column
            prop="area"
            width="90"
            label="地区">
          </el-table-column>

        </el-table>
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
    </section>
  </div>
</template>
<script>
  import formmate from '../../config/date'
  import formmate2 from '../../config/date2'

  export default {
    name:'organum',
    data:function () {
      return {
        api: '/cross/organ/organ/getAllOrgan.json',
        statusapi:'/cross/organ/organ/setOrganStatus.json',
        deleteURI :'/cross/organ/removeOrgan.json',
        total: 0,
        ctype:" ",
        index:1,
        industryid:0,
        form: {          
          isAuth:null,  //0全部1已认证2未认证3待审核4禁用  number  
          orgType:null, //1,企业 2,政府 3,媒体 4,其它，5教育，6医疗 string   
          organAllName:'',  //组织全称  string    
          mobile:'',  //手机号 string  
          socialCreditCode:'',  //社会信用代码  string  
          businessRegistNumber:'',  //工商注册号 string
          organNumber:'', //金桐号 string  
          startTime:null,//注册开始时间  
          endTime:null, //注册结束时间  string
          authEndTime:null, //认证结束时间  number  
          authStartTime:null, //认证开始时间  number   
          index:0, //当前页默认0  number
          size:20,  //每页条数  number            
        },
        UserorgManage:[],
        multipleSelection: []
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        var vm = this;
        vm.Initdate();
      });
    },
    computed:{      
    },
    watch:{
    },
    methods:{
      Refresh(){
        window.location.reload();
      },
      /*clean words */
      handleIconClick(){
        this.form.keyword = '';
      },
      /*Initdate*/
      Initdate:function () {
        var that = this;
        that.$http.post(that.api,JSON.stringify(that.form),{headers:{
          sessionID :localStorage.getItem('sessionID'),
          s:'web',
        }}).then(
          function (res) {
            that.UserorgManage = res.data.list;
            that.total = res.data.count
          },function (res) {
            console.log(res)
          }
        )
      },
      onReset(formName){//reset
        this.$refs[formName].resetFields();
      },
      removeOrgan : function(row){
        var that = this;
        that.$confirm('此操作删除当前组织，是否继续？','提示',{
          type : 'warning'
        }).then(() => {
          var jsonData = {orgId:row.id};
          that.$http.post(that.deleteURI,JSON.stringify(jsonData),{headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }}
          ).then(
            function (res) {
              if(res.body.success){
                that.$message({
                  type: 'success',
                  message: '该组织已经删除',
                  duration: 1500,
                  onClose : (instance) => {
                    that.todic();
                  }
                });
              }else{
                that.$message({type:'error',message:'删除失败 '+res.body.msg});
              }                
            },function (res) {
              that.$message({type:'error',message:'删除失败，请稍后重试~'});
          });

          
        }).catch(() => {
          // that.$message({type:'error',message:'认证失败，请稍后重试~'});
        });
      },
      // search
      onSearch(){
        var that =  this;
        that.form.startTime = formmate(that.form.startTime);
        that.form.endTime = formmate2(that.form.endTime);
        if(that.form.startTime == 'NaN-aN-aN aN:aN:aN'){
          that.form.startTime = "";
        }
        if(that.form.endTime == 'NaN-aN-aN 23:59:59'){
          that.form.endTime = "";
        }

        that.form.authStartTime = formmate(that.form.authStartTime);
        that.form.authEndTime = formmate2(that.form.authEndTime);
        if(that.form.authStartTime == 'NaN-aN-aN aN:aN:aN'){
          that.form.authStartTime = "";
        }
        if(that.form.authEndTime == 'NaN-aN-aN 23:59:59'){
          that.form.authEndTime = "";
        }

        this.Initdate();
      },
      onPublish(){
        this.$router.push({path: '/organumadd'});
      },
      // go pages
      handleCurrentChange(val) {
        var that =  this;
        that.form.index =  val - 1;
        that.Initdate();
      },
      // go detail
      currency(index,row) {
        this.$router.push({path: '/organum/' + row.id})
      },
      //changeStatus
      changeStatus(index,row){
        var that = this;
        var changeData = {
          content:'',
          orgId:row.id,
          reason:'',
          type: row.status == false ? 1 : 2,
        };

        that.$http.post(that.statusapi,JSON.stringify(changeData),{
          headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }
        }).then(function (res){
          if(res.data.result || res.data.result == true){
            that.$notify({
              title: '热词状态修改成功',
              type: 'success',
              duration: 1500
            });
            that.onSearch();
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
    },
    filters:{
        authState : function(val){
          var state = {'0':'未认证','1':'待审核','2':'已认证','3':'驳回审核','4':'禁用'};
          return state[val] ? state[val] : state['1'];
        },
        orgtype:function (val) {
          switch(val)
          {
            case 0:
             return '全部';
              break;
            case 1:
              return '企业';
              break;
            case 2:
              return '政府';
              break;
            case 3:
              return '媒体';
              break;
            case 4:
              return '其它';
              break;
            case 5:
              return '教育';
              break;
            case 6:
              return '医疗';
              break;
            default:
              return '其它';
          }
        }
    },

  }
</script>
<style lang="less" scoped>
  .el-form-item{ margin-bottom:10px;}
  .serch{background: white;border: 1px solid #e5e4ee;padding: 20px 20px 10px;}
  .serch .el-button{ margin:5px 10px 0px 0;}
  .el-table .cell, .el-table th>div{padding:5px;font-size:13px; }
  .table-body{background: white;margin-top: 10px;}
  .el-page{display: block;text-align: center;margin: 20px auto;}
</style>
