<template>
<div class="mail">
  <div class="loation"><router-link to="/headlines">PGC内容管理</router-link to="/mail"> >>站内信记录</div>
  <div class="mail_">
    <!-- form search -->
    <div class="serch">
      <el-form ref="form"  :inline="true" :model="form" label-width="70px">
        <el-form-item label="发送时间">
          <el-col  :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="sendStartTime"
              style="width: 100%;">
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="sendEndTime"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-col  :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="startTime"
              style="width: 100%;">
            </el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="endTime"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="距离上次登录" label-width="100px">
          <template>
            <el-input-number v-model="day" style="width:140px" :min="0"></el-input-number><span style="margin:0 5px">天</span>
            <el-input-number v-model="hours" style="width:140px" :min="0" :max="24"></el-input-number><span style="margin-left:5px">小时</span>
          </template>
        </el-form-item>
        <el-form-item label="接收用户">
          <el-select v-model="form.targetType" placeholder="请选择">
            <el-option label="全部用户" value="0"></el-option>
            <el-option label="vip用户" value="1"></el-option>
            <el-option label="手动输入" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业偏好">
          <el-select v-model="form.industry" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <v-Func :success="Funcdate"></v-Func>
        </el-form-item>
        <el-form-item>
          <v-Area :success="Areadate"></v-Area>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="全部" style="width: 80px">
            <el-option label="全部" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
            <el-option label="保密" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台">
          <el-select v-model="form.acceptType" placeholder="三端" style="width: 80px">
            <el-option label="三端" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  icon="search" @click="onSearch">搜索</el-button>
          <el-button type="primary"  icon="edit" @click="Newadd">新增站内信</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- show table dates-->
    <div class="table-body">
      <el-table
        :data="mailList"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          label="接收对象">
          <template scope="scope">
            {{ scope.row.targetType | targetType}}
          </template>
        </el-table-column>
        <el-table-column
          label="发送时间"
          width="200">
          <template scope="scope">
            {{ scope.row.sendTime | format}}
          </template>
        </el-table-column>
        <el-table-column
          label="注册时间"
          width="200">
          <template scope="scope">
            {{ scope.row.createTime | format}}
          </template>
        </el-table-column>
        <el-table-column
          label="站内信内容"
          width="300">
          <template scope="scope">
            <span v-html="scope.row.content"></span>
          </template>
        </el-table-column>
        <el-table-column
          property="industry"
          label="行业偏好"
          width="140">
        </el-table-column>
        <el-table-column
          property="function"
          label="职能"
          width="140">
        </el-table-column>
        <el-table-column
          label="地区"
          width="140">
          <template scope="scope">
            <span v-if="scope.row.province">{{scope.row.province}}-{{scope.row.city}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          width="80">
          <template scope="scope">
            {{ scope.row.sex | sex}}
          </template>
        </el-table-column>
        <el-table-column
          property="successRate"
          label="到达率"
          width="80">
        </el-table-column>
        <el-table-column
          label="平台"
          width="80">
          <template scope="scope">
            {{ scope.row.acceptType | acceptType}}
          </template>
        </el-table-column>
        <el-table-column label="操作"width="100">
          <template scope="scope">
            <v-Detail :id="scope.row.id"></v-Detail>
          </template>
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
    import vue from 'vue';
    //行业
    import pre from  '../../../config/preference';
    //职能
    import Func from '../../../components/function';
    //地区
    import Area from '../../../components/area';
    //查看详情
    import mailDetail from './mailDetail';

    export default {
      name:'mailList',
      components:{
        'v-Area': Area,
        'v-Func': Func,
        'v-Detail': mailDetail
      },
      data:function () {
        return {
          options: pre,
          mailList:[],
          api:'/cross/asso/pub/admin/getRecordList',
          total:0,
          index:1,
          day: '',
          hours: '',
          sendStartTime:'', //发送通知开始时间
          sendEndTime:'',   //发送通知结束时间
          startTime: '',    //注册开始时间
          endTime: '',      //注册结束时间
          form: {
            sendStartTime:'', //发送通知开始时间
            sendEndTime:'',   //发送通知结束时间
            startTime: '',    //注册开始时间
            endTime: '',      //注册结束时间
            lastTimeLogin: [],//距离上次登陆时间
            targetType: '3',  //目标用户
            function: '',     //职能
            industry:'',      //行业
            country: '',      //国家
            province: '',     //省份
            city: '',         //城市
            county: '',         //区县
            sex: '0',         //性别
            acceptType: '0',  //接受类型
            start:0,          //页码数
            size:20,          //每页个数
          },
        }
      },
      mounted:function () {
        let vm = this;
        vm.$nextTick(function () { 
          vm.fetchData();
        });
      },
      methods:{
        Areadate:function(data){
          /* 地区四级联动 */
          let vm = this;
          vm.form.country = data.sCountry;
          vm.form.province = data.sProvince;
          vm.form.city = data.sCity;
          vm.form.county = data.sArea;
        },

        Funcdate:function(data){
          /* 职能二级联动 */
        },

        Refresh(){
          /* reload */
          window.location.reload();
        },
        
        fetchData(){
          /* initData */
          var vm = this;

          /* 处理时间格式 */
          vm.form.sendStartTime = vm.$date(vm.sendStartTime);
          vm.form.sendEndTime = vm.$date(vm.sendEndTime);
          vm.form.startTime = vm.$date(vm.startTime);
          vm.form.endTime = vm.$date(vm.endTime);
          /* 处理距离上次登陆时间格式 */
          vue.set(vm.form.lastTimeLogin,0,vm.day);
          vue.set(vm.form.lastTimeLogin,1,vm.hours);

          vm.$http.post(vm.api,JSON.stringify(vm.form),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}).then(
            function (res) {
              if(res.data.notification.notifCode === "0" && res.data.notification.notifInfo === "success"){
                vm.mailList = res.data.responseData.list;
                vm.total = res.data.responseData.totalCount;
              }else{
                vm.$notify.error({
                  title: '发送失败~，请稍候重试...',
                  duration: 1500
                });
              }
            },function (msg) {
              vm.$notify.error({
                title: '服务出错了~，请稍候重试...',
                duration: 1500
              });
            }
          );
        },
        
        onSearch(){
          /* search */
          var vm = this;
          vm.fetchData()
        },

        Newadd(){
          /* createMail */
          this.$router.push({path: '/mail/added'})
        },

        handleCurrentChange(val) {
          /* 分页 */
          var vm =  this;
          vm.form.start = val - 1;
          vm.fetchData()
        },
      },
      filters: {
        targetType(val) {
          let arr = ['全部用户','vip用户','特定用户','手动输入'];
          return arr[val]
        },
        sex(val) {
          let arr = ['全部','男','女','保密'];
          return arr[val]
        },
        acceptType(val) {
          let arr = ['三端','web','wap','移动'];
          return arr[val]
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .mail{
    display: block;
    margin: 20px 20px 0 20px;
    .loation{
      display: block;
      height:46px;
      line-height: 46px;
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
  }
</style>
