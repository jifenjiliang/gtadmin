<template>
  <div class="mail_add">
  <section class="section">
	    <div class="loation"><router-link to="/headlines">PGC内容管理</router-link> >>><router-link to="/mail">站内信记录</router-link> >>站内信发送</div>
	    <div class="el-page">
      <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" label-width="60px">
        <el-tabs class="mb40"  type="border-card">
          <el-tab-pane label="基础文本">
              <el-form-item label="图片">
                <el-upload
                  class="upload-demo"
                  action="/mobile/people/avatar"
                  drag
                  multiple
                  :file-list="fileList"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-error="uploaderror"
                  :on-change="handleChange"
                  list-type="picture"
                  :data="imgData">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em><br/>该图片格式仅支持jpg/png文件，大小不允许超过2M</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="主标题" label-width="62px" prop="title">
                <el-input
                  placeholder="填写主标题"
                  icon="circle-close"
                  style="width: 800px"
                  v-model="form.title"
                  :on-icon-click="handleIconClick">
                </el-input>
              </el-form-item>
              <el-form-item label="内容" prop="content">
                <div id="editor"></div>
              </el-form-item>
              <el-form-item>
                <v-Relation></v-Relation>
              </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-tabs class="mb40" type="border-card">
          <el-tab-pane label="目标选择">
            <el-form-item label="目标用户" label-width="80" prop="targetType">
              <el-radio-group v-model="form.targetType">
                <el-radio label="0">全部用户</el-radio>
                <el-radio label="1">vip用户</el-radio>
                <el-radio label="3">手动输入</el-radio>
              </el-radio-group>
              <v-Mobile :success="mobileCheck" v-if="form.targetType === '3'"></v-Mobile>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-tabs class="mb120" type="border-card">
          <el-tab-pane label="更多设定">
            <el-form-item label="发送时间" label-width="80" prop="sendType">
              <el-radio-group v-model="form.sendType">
                <el-radio label="0">立即发送</el-radio>
                <el-radio label="1">定时发送</el-radio>
              </el-radio-group>
              <template v-if="form.sendType === '1'">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="sTime"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </template>
            </el-form-item>
            <el-form-item label="平台">
              <el-select v-model="form.acceptType" placeholder="三端">
                <el-option label="三端" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <div class="col_button">
          <el-button type="primary" @click="publish('form')" style="width:100px;margin-right:30px;">确认发送</el-button>
          <el-button type="primary" @click="abolish" style="width:100px">取消</el-button>
        </div>
      </el-form>
      </div>
	</section>
  </div>
</template>

<script>
  var E = require('wangeditor');
  //mobile
  import mobile from './mobileArea';
  //import relation from '../../../components/relation'
  import relation from '../../../components/relation/relation'

  export default {
    name:'mail_add',
    components:{
        'v-Mobile': mobile,
        'v-Relation': relation
      },
    data:function () {
      return {
        url: '/cross/asso/pub/admin/sendPushMessage',
        sessionid:localStorage.getItem('sessionID'),
        labelPosition: 'right',
        fileList:[],
        sTime:'',
        form: {
          title: '',
          picture: '',
          content: '',
          associateList:[],
          targetType: '0',  // 发送目标类型 0：全部用户 1：vip用户 2：指定用户 3：手机号指定
          mobile: '',
          sendType: '0',    // 发送类型 0：立即发送 1：定时发送
          sendTime: '',
          acceptType: '0',    //接收类型 0：三端 1：web 2：Android 3：IOS
        },
        imgData:{
          's' : 'web',
          'uid' : JSON.parse(localStorage.currentUser).id
        },
        pickerOptions: {
          /* 禁掉今天之前的时间 */
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          targetType: [
            { required: true, message: '请选择目标用户', trigger: 'change' }
          ],
          sendType: [
            { required: true, message: '请选择发送时间', trigger: 'change' }
          ]
        }
      }
    },
    //初始化
    mounted:function () {
      this.initERiter();
    },
    //方法
    methods:{
      //初始化编辑器
      initERiter(){
        let vm = this;
        let editor = new E('#editor');
        editor.customConfig.onchange = function (html) {
          vm.form.content = html;
        };
        editor.customConfig.zIndex = 1000
        editor.create();
        editor.txt.html(vm.form.content);
      },
      //上传文件之前的钩子
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/JPEG' || file.type === 'image/png' || file.type === 'image/PNG');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 jpg/png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //文件上传失败时的钩子
      uploaderror(err, file, fileList){
        this.$message.error('头图上传失败');
      },
      //文件上传成功时的钩子
      handleAvatarSuccess(res, file, fileList) {
        this.form.picture = res.responseData.url;
      },
      //文件状态改变时的钩子
      handleChange(file, fileList) {
        //取fileList 最后一项
        this.fileList = fileList.slice(-1);
      },
      
      handleIconClick(){
        /* 清空按钮（插号） */
        this.form.title = '';
      },

      mobileCheck(mobile){
        /* 手机号组件 */
        this.form.mobile = mobile;
      },

      publish(formName){
        /* 确认发送 */
        let vm = this;
        vm.initERiter();
        if(vm.sTime !== ''){
          vm.form.sendTime = vm.$date2((vm.sTime).getTime());
        }else{
          vm.form.sendTime = vm.$date(new Date().getTime());
        }
        //表单校验
        vm.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          }
          vm.$http.post(vm.url,JSON.stringify(vm.form),{headers:{
            sessionID :vm.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if(res.body.responseData){
                vm.$notify({
                  title: '站内信发送成功~',
                  type: 'success',
                  duration: 1500
                });
                setTimeout(function(){
                  vm.$router.push({path: '/mail'});
                }, 1500);
              }else{
                vm.$notify.error({
                  title: '发送失败~，请稍候重试...',
                  duration: 1500
                });
              }
            },function (msg) {
              vm.$notify.error({
                title: msg,
                duration: 1500
              });
            }
          );
        });
      },

      abolish(){
        /* 取消发送 */
        this.$router.push({path: '/mail'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .title{ padding:10px; border-bottom:1px solid #e5e4ee; background:#fff; text-align:left; }
  .el-page{ 
    text-align:left; margin-top:10px;
  }
</style>