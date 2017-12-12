<template>
  <div class="knowledge_body">
    <el-form ref="form" :model="form" :label-position="labelPosition" label-width="60px">
      <el-form-item label="栏目">
        <el-select v-model="form.assocTypeId" placeholder="资讯" style="width: 300px">
          <el-option label="资讯" value="1"></el-option>
          <el-option label="投融工具" value="2"></el-option>
          <el-option label="行业" value="3"></el-option>
          <el-option label="经典案例" value="4"></el-option>
          <el-option label="新材料" value="5"></el-option>
          <el-option label="资产管理" value="6"></el-option>
          <el-option label="宏观" value="7"></el-option>
          <el-option label="观点" value="8"></el-option>
          <el-option label="判例" value="9"></el-option>
          <el-option label="法律法规" value="10"></el-option>
          <el-option label="文章" value="11"></el-option>
          <el-option label="互联网" value="12"></el-option>
          <el-option label="大数据" value="13"></el-option>
          <el-option label="金融" value="14"></el-option>
          <el-option label="教育" value="15"></el-option>
          <el-option label="医疗" value="16"></el-option>
          <el-option label="O2O" value="17"></el-option>
          <el-option label="游戏" value="18"></el-option>
          <el-option label="智能硬件" value="19"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头图">
        <el-upload
          class="upload-demo"
          action="/mobile/people/avatar"
          drag
          multiple
          :file-list="fileList"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="uploaderror"
          list-type="picture"
          :data="imgData">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题">
        <el-input
          placeholder="复制知识URL,可自动解析..."
          icon="circle-close"
          style="width: 800px"
          v-model="form.assocTitle"
          :on-icon-click="handleIconClick"
          @change="change">
        </el-input>
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
  export default {
    name:'knowledge_body',
    data:function () {
      return {
        detailApi: '/knowledge/knowledge/',
        updateApi: '/knowledge/knowledge/admin/update',
        createApi: '/knowledge/knowledge/admin/create',
        resolveApi:'/cross/newknowledge/knowledgeOther/fetchExternalKnowledgeUrl',
        labelPosition: 'right',
        sessionid: localStorage.sessionID,
        sourcePic:null,
        fileList:[],
        form: {
          assocTypeId: '资讯',
          assocTitle: null,
        },
        imgData:{
          's' : 'web',
          'uid' : JSON.parse(localStorage.currentUser).id
        },
        defaultMsg: '',
        // 编辑完成之后发送的数据
        eaditinit:{},
        tableData: {},
        column : ["全部","资讯","投融工具","行业","经典案例","新材料","资产管理","宏观","观点","判例","法律法规","文章","互联网","大数据","金融","教育","医疗","O2O","游戏","智能硬件"],
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
        this.$nextTick(function () {
          // 初始化请求数据
          var that =  this;
          var id = that.$route.params.id;
          var type = 1;
          for(var key in that.column){
            if (that.column[key] == that.$route.params.type) {
              type = key;
            }
          }
          /* that.$http.post(that.api,that.form,{emulateJSON:true},{headers:{*/
          that.$http.get(that.detailApi + id +'/'+ type,{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              that.tableData = res.body.responseData.knowledgeDetail;
              that.form.assocTypeId = that.tableData.columnType;
              that.form.assocTitle = that.tableData.title;


              var content = that.tableData.content;
              if(content.indexOf('</br>')>-1){
                content = content.substring(0,content.indexOf('</br>'));
              }
              that.tableData.content = content
              that.defaultMsg = that.tableData.content;
              that.initERiter();
              that.eaditinit = res.body.responseData;
              if(res.body.responseData.knowledgeDetail.pic){
                var imgList = [{
                  name: 'default.jpeg',
                  url: res.body.responseData.knowledgeDetail.pic
                }];
                that.fileList = imgList;
              }
            },function (res) {
              console.log(res)
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
          vm.defaultMsg = html;
        };
        editor.create();
        editor.txt.html(vm.defaultMsg);
      },
      uploaderror(err, file, fileList){
        this.$message.error('头图上传失败');
      },
      handlePictureCardPreview(file){
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        //this.sourcePic = 'http://file.gintong.com' + res.responseData.url;
        this.sourcePic = 'http://file.online.gintong.com' + res.responseData.url;
        //this.sourcePic = res.responseData.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 jpg/png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleIconClick(){
        this.form.assocTitle = '';
      },
      change(){
        var that = this,data={};
        var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        var objExp=new RegExp(Expression);
        if (!objExp.test(that.form.assocTitle)){
          return false;
        }else{
          that.$notify.info({
            title: '正在解析知识内容...',
            duration: 1000
          });
          setTimeout(function(){
            data={
              "externalUrl":that.form.assocTitle,
              "isCreate":false
            };
            that.$http.post(that.resolveApi,JSON.stringify(data),{headers:{
              sessionID :that.sessionid,
              s:'web',
            }}).then(
              function (res) {
                if(res.body.notification.notifCode == 0){
                  that.form.assocTitle = res.body.responseData.knowledge2.title ? res.body.responseData.knowledge2.title:'';
                  that.defaultMsg = res.body.responseData.knowledge2.content ? res.body.responseData.knowledge2.content:'';
                  that.initERiter();
                }else{
                  that.$notify.error({
                    title: '解析失败',
                    message:'请输入合法地址，请确保为新闻格式网址!!!',
                    duration: 1500
                  });
                  that.form.assocTitle = '';
                }
              },function (res) {
                that.$notify.error({
                  title: '解析失败',
                  message:'请输入合法地址，请确保为新闻格式网址!!!',
                  duration: 1500
                });
                return false;
              }
            )
          },500)
          return true;
        }
      },
      publish(){
        //var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        //var objExp=new RegExp(Expression);
        //!objExp.test(val)
        var that = this;
        var publishData = {
          knowledge: null,
          knowledgeDetail: {
            id: 0,
            virtual: 0,
            title: that.form.assocTitle,
            uid: null,
            uname: null,
            cid: null,
            cname: null,
            source: null,
            s_addr: null,
            cpathid: null,
            pic: that.sourcePic, // images sources
            desc: null,
            content: that.defaultMsg,
            hcontent: null,
            essence: 0,
            createtime: null,
            modifytime: null,
            status: 0,
            report_status: 0,
            taskid: null,
            tags: null,
            tagList: null,
            directorys: null,
            columnid: that.form.assocTypeId,
            asso: null,
            selectedIds: null,
            columnType: that.form.assocTypeId,
            hideDesc: null,
            submitTime: null,
            performTime: null,
            postUnit: null,
            titanic: null,
            synonyms: null,
            fileType: null,
            tranStatus: 0,
            multiUrls: null,
            attachUrls: null,
            selfDef: null,
            sysTime: null,
            knowledgeMainId: 0,
            ish: 0,
            collected: 0,
            privated: 0
          },
          reference: null,
          asso: null,
          permission: null,
          updateDynamic: 1,
          oldType: 0,
          readCount: 0
        };
        if (that.type == "edit") {
          // 编辑的时候 标题 内容发生改变
          that.eaditinit.knowledgeDetail.title = that.form.assocTitle;
          that.eaditinit.knowledgeDetail.content = that.defaultMsg;


          var htmls = publishData.knowledgeDetail.content;
          var s=htmls.match(/<img\s*src=\"([^\"]*?)\"[^>]*>/i);
          if(that.sourcePic){
            that.eaditinit.knowledgeDetail.pic = that.sourcePic;
          }else if(s){
            for(var i= 0;i<s.length;i++){
              that.eaditinit.knowledgeDetail.pic = RegExp.$1;
            }
          }
          //删除字段column
          delete(that.eaditinit.knowledgeDetail.column)
          delete(that.eaditinit.knowledgeDetail.minTags)
          delete(that.eaditinit.knowledgeDetail.minDirectorys)
          that.$http.put(that.updateApi,JSON.stringify(that.eaditinit),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if (res.body.notification.notifCode == 0) {
                that.$notify({
                  title: '成功修改知识',
                  type: 'success',
                  duration: 1500
                });
                setTimeout(function(){
                  that.$router.push({path: '/knowledge'});
                }, 1500);
              }else{
                that.$notify.error({
                  title: '修改失败，请稍候重试...',
                  duration: 1500
                });
              };
            }
          );
        }else if(that.type == "add"){

          var htmls = publishData.knowledgeDetail.content;
          var s=htmls.match(/<img\s*src=\"([^\"]*?)\"[^>]*>/i);
          if(s && !publishData.knowledgeDetail.pic){
            for(var i= 0;i<s.length;i++){
              publishData.knowledgeDetail.pic = RegExp.$1;
            }
          }
          that.$http.post(that.createApi,JSON.stringify(publishData),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if (res.body.notification.notifCode == 0) {
                that.$notify({
                  title: '成功发布知识',
                  type: 'success',
                  duration: 1500
                });
                setTimeout(function(){
                  that.$router.push({path: '/knowledge'});
                }, 1500);
                return false;
              }
            },function (res) {
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
        this.$router.push({path: '/knowledge'})
      },
    }
  }
</script>

<style lang="less">
  .knowledge_edit{
    margin-bottom: 50px;
  }
  .knowledge_body{
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
    }
  }
  .col_button{
    position: fixed;
    bottom:0;
    right:0;
    width: 87.5%;
    height: 50px;
    text-align: center;
    background-color: white;
    z-index: 1000;
    line-height: 50px;
  }
</style>
