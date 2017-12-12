<template>
  <div class="version_body">
    <el-form ref="form" :model="form" :label-position="labelPosition" label-width="60px">
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="全部" :disabled="isEdit" style="width: 240px">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="Android" value="1"></el-option>
          <el-option label="IOS" value="2"></el-option>
          <el-option label="Web" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input
          placeholder="请填写版本名称"
          icon="circle-close"
          style="width: 600px"
          :disabled="isEdit"
          v-model="form.verCode"
          :on-icon-click="verCodeIconClick">
        </el-input>
      </el-form-item>
      <el-form-item label="版本">
        <el-input
          placeholder="请填写版本号"
          icon="circle-close"
          style="width: 600px"
          :disabled="isEdit"
          v-model="form.version"
          :on-icon-click="versionIconClick">
        </el-input>
      </el-form-item>
      <el-form-item label="文件">
        <el-upload
          class="upload-demo"
          action=" /mobile/apkUpload"
          drag
          multiple
          :file-list="fileList"
          :on-success="handleAvatarSuccess"
          :on-error="uploaderror"
          :on-change="handleChange"
          :data="apkData">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将安装包拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <div id="editor"></div>
      </el-form-item>
      <div class="col_button">
        <el-button type="primary" @click="publish" style="width:100px;margin-right:30px;">保存</el-button>
        <el-button type="primary" @click="abolish" style="width:100px">取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  var E = require('wangeditor');
  import vue from 'vue';
  export default {
    name:'version_body',
    data:function () {
      return {
        detailApi: '/cross/mobileApp/getVersionDetail.json',
        updateApi: '/cross/mobileApp/updateNewVersion.json',
        createApi: '/cross/mobileApp/addVersion.json',
        labelPosition: 'right',
        sessionid: localStorage.sessionID,
        fileList:[],
        isEdit:false,
        form: {
          type:null,
          verCode:null,
          version:null,
          content:null,
          updateUrl:null,
        },
        apkData:{
          's' : 'web',
          'sessionID' : localStorage.sessionID
        },
        // 编辑完成之后发送的数据
        eaditinit:{
          id:null,
          type:null,
          content:null,
          updateUrl:null
        },
        tableData: {},
        column : ["全部","Android","IOS","Web"],
      }
    },
    //获取父级type参数
    props: {
      type: {
        type: String,
        default: null,
      },
    },
    //初始化
    mounted:function () {
      this.initERiter();
      if (this.type == "edit") {
        this.isEdit = true;
        this.$nextTick(function () {
          // 初始化请求数据
          var that =  this;
          var id = that.$route.params.id;
          that.$http.post(that.detailApi,JSON.stringify({"id":id}),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              //Object.assign(that.form, res.body.responseData);
              that.form.type = res.body.responseData.type;
              that.form.verCode = res.body.responseData.verCode;
              that.form.version = res.body.responseData.version;
              that.form.content = res.body.responseData.content;
              that.form.updateUrl = res.body.responseData.updateUrl;
              that.initERiter();
              var str = '';
              if(that.form.updateUrl){
                str = that.form.updateUrl.substring(that.form.updateUrl.lastIndexOf("/")+1)
              }
              if(that.form.updateUrl){
                var imgList = [{
                  name: str || 'apk',
                  url: that.form.updateUrl
                }];
                that.fileList = imgList;
              }
            },function (msg) {
              console.log(msg)
            }
          )
        })
      }
    },
    //计算属性
    computed:{
    },
    //方法
    methods:{
      initERiter(){
        var vm = this;
        var editor = new E('#editor');
        editor.customConfig.onchange = function (html) {
          vue.set(vm.form,"content",html);
        };
        editor.create();
        editor.txt.html(vm.form.content);
      },
      uploaderror(err, file, fileList){
        this.$message.error('安装包上传失败');
      },
      handlePictureCardPreview(file){
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        var vm = this;
        if(res.responseData.succeed){
          vue.set(vm.form,"updateUrl",res.responseData.jtFile.url);
        }
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },
      verCodeIconClick(){this.form.verCode = '';},
      versionIconClick(){this.form.version = '';},
      publish(){
        var that = this;
        /*that.initERiter();*/
        if(that.type == "edit"){
          that.eaditinit.id = Number(that.$route.params.id);
          that.eaditinit.type = Number(that.form.type);
          that.eaditinit.content = that.form.content;
          that.eaditinit.updateUrl = that.form.updateUrl;
          that.$http.post(that.updateApi,JSON.stringify(that.eaditinit),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if(res.body.responseData.success){
                that.$notify({
                  title: '保存成功',
                  type: 'success',
                  duration: 1500
                });
                setTimeout(function(){
                  that.$router.push({path: '/version'});
                }, 1500);
                return false;
              }else{
                that.$notify.error({
                  title: '编辑失败，请稍候重试...',
                  duration: 1500
                });
                return false;
              }
            },function (msg) {
              that.$notify.error({
                title: '编辑失败，请稍候重试...',
                duration: 1500
              });
              return false;
            }
          )
        }else{
          if(!that.form.type){
            that.$message.error({
              message: '类型不能为空！',
              duration: 1500
            });
            return false;
          }
          if(that.form.type == '1'){
            for(var key in that.form){
              if (!that.form[key]) {
                that.$message.error({
                  message: '所有选项均为必填项！',
                  duration: 1500
                });
                return false;
              }
            }
          }
          if(!((/^[0-9]+$/).test(that.form.version))){
            that.$message.error({
              message: '版本号必须全为数字！',
              duration: 1500
            });
            return false;
          }
          that.$http.post(that.createApi,JSON.stringify(that.form),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if(res.body.responseData.success){
                that.$notify({
                  title: '成功发布新版本',
                  type: 'success',
                  duration: 1500
                });
                setTimeout(function(){
                  that.$router.push({path: '/version'});
                }, 1500);
                return false;
              }else{
                that.$notify.error({
                  title: '发布失败，请稍候重试...',
                  duration: 1500
                });
                return false;
              }
            },function (msg) {
              that.$notify.error({
                title: '发布失败，请稍候重试...',
                duration: 1500
              });
              return false;
            }
          )
        }
      },
      abolish(){
        this.$router.push({path: '/version'})
      }
    }
  }
</script>

<style lang="less">
  .version_edit{
    margin-bottom: 50px;
  }
  .version_body{
    .avatar-uploader{
      width: 300px;
      height: 178px;
      .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 300px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 300px;
          height: 178px;
          display: block;
        }
      }
      .el-upload:hover {
        border-color: #20a0ff;
      }
      .el-upload-list{
        .el-upload-list__item{line-height: 50px;}
      }
    }
  }
  .col_button{
    /*position: fixed;
    bottom:0;
    right:0;*/
    width: 87.5%;
    height: 50px;
    text-align: center;
    background-color: white;
    z-index: 1000;
    line-height: 50px;
  }
</style>
