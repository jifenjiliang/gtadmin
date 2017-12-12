<template>
  <div class="mailDetail">
    <el-button size="small" type="primary" @click="seeDetail">查看详情</el-button>
    <el-dialog 
    custom-class="mail-dialog" 
    v-model="dialogVisible" 
    center 
    :before-close="handleClose">
      <!-- form search -->
      <div slot="title" class="serch">
        <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="70px">
          <el-form-item label="发送状态">
            <el-select v-model="form.sendStatus" placeholder="请选择" style="width: 100px">
              <el-option label="全部" value="0"></el-option>
              <el-option label="成功" value="1"></el-option>
              <el-option label="发送中" value="2"></el-option>
              <el-option label="失败" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接收状态" v-if="form.sendStatus < 2">
            <el-select v-model="form.acceptStatus" placeholder="请选择" style="width: 80px">
              <el-option label="全部" value="0"></el-option>
              <el-option label="已读" value="1"></el-option>
              <el-option label="未读" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="keyword">
            <el-input 
            icon="circle-close"
            v-model="form.keyword" 
            placeholder="请输入手机号"
            :on-icon-click="handleIconClick"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  icon="search" @click="onSearch('form')">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          ref="multipleTable"
          :data="mailList"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="发送状态"
            show-overflow-tooltip>
            <template scope="scope">
              {{ scope.row.sendStatus | sendStatus}}
            </template>
          </el-table-column>
          <el-table-column
            label="接收状态"
            show-overflow-tooltip>
            <template scope="scope">
              {{ scope.row.readStatus | readStatus}}
            </template>
          </el-table-column>
          <el-table-column
            prop="failureReason"
            label="原因"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            show-overflow-tooltip>
            <template scope="scope">
              <el-button size="small" type="primary" @click="resetSend(scope.row)">重新发送</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="el-page">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="index"
          :page-size="form.size"
          layout="prev, pager, next, jumper,total"
          :total="total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="resetSend()">重新发送</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'mailDetail',
  props:["id"],
  data:function () {
    return {
      api: '/cross/asso/pub/admin/getRecordDetail',
      sendApi: '/cross/asso/pub/admin/reSendPushMessage',
      acceptList: [],
      sendList: [],
      dialogVisible: false,
      mailList: [],
      total: 0,
      index: 1,
      form: {
        id: '',
        sendStatus: '0',
        acceptStatus: '0',
        keyword: '',
        start: 0,
	      size: 10,
      },
      rules: {
        keyword: [
          { validator: (rule, value, callback) => {
            if (value !== '') {
              if(!/^1[34578]\d{9}$/.test(value)){
                callback(new Error('手机号码格式不正确！'))
              }else{
                callback()
              }
            }else{
              callback()
            } 
          }, trigger: 'blur' }
        ],
      }
    }
  },
  //方法
  methods:{
    seeDetail() {
      /* seeDetail */
      let vm = this;
      vm.fetchData();
      vm.dialogVisible = true;
    },

    handleIconClick(){
      /* 清空按钮（插号） */
      this.form.keyword = '';
    },

    handleClose(done) {
      /* reset */
      this.handleCancel()
      done();
    },

    handleCancel() {
      /* cancel */
      let vm = this;
      vm.form.id = '';
      vm.form.sendStatus = '0';
      vm.form.acceptStatus = '0';
      vm.form.keyword = '';
      vm.dialogVisible = false;
    },

    fetchData() {
      /* initData */
      var vm = this;
      vm.form.id = vm.id;
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

    onSearch(formName) {
      /* 搜索 */
      var vm = this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.fetchData();
        } else {
          return false;
        }
      });
      
    },

    handleSelectionChange(val) {
      /* 选中 */
      this.acceptList = val;
    },

    resetSend(val) {
      /* 重新发送 */
      let vm = this;
      let mobile = '';
      if(val){
        mobile = val.mobile;
      }else{
        let len = vm.acceptList.length
        if(len < 1){
          vm.$notify.error({
            title: '请先选择要重新发送的数据~',
            duration: 1500
          });
          return false;
        }else if(len === 1){
          mobile = vm.acceptList[0].mobile;
        }else{
          vm.acceptList.map(function (item,index,list) { 
            if(index === (len-1)){
              mobile += item.mobile;
              return;
            }
            mobile += item.mobile + ',';
          })
        }
      }
      vm.$http.post(vm.sendApi,JSON.stringify({
        mobile: mobile,
        recordId: vm.id
      }),{headers:{
        sessionID :localStorage.getItem('sessionID'),
        s:'web',
      }}).then(
        function (res) {
          if(res.data.notification.notifCode === "0" && res.data.notification.notifInfo === "success" &&  res.data.responseData){
            vm.$notify({
              title: '重新发送成功~',
              type: 'success',
              duration: 1500
            });
            setTimeout(function(){
              vm.fetchData()
            }, 1500);
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

    handleCurrentChange(val) {
      /* 分页 */
      var vm =  this;
      vm.form.start = val - 1;
      vm.fetchData()
    },
  },
  filters: {
    sendStatus(val) {
      let arr = ['','成功','发送中','失败'];
      return arr[val]
    },
    readStatus(val) {
      let arr = ['未读','已读'];
      return arr[val]
    }
  }
}
</script>

<style lang="less" scoped>
.mailDetail{
  .serch{
    background: white;
    float: left;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 20px auto;
  }
}
</style>


