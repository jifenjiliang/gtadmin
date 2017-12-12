<template>
  <div class="people">
    <el-button type="primary" @click="showbox">创建知识</el-button>
    <div class="boxcontaion" v-show="file">
      <div class="box_c_boxy">
        <!-- header-->
        <div class="box_c_boxy_t">
          <span></span>创建知识
          <i class="el-icon-close" @click="file = false"></i>
        </div>
        <!-- search-->
        <div class="box_c_boxy_c">
          <el-form ref="form" :model="form" :label-position="labelPosition" label-width="60px">
            <el-form-item label="栏目">
              <el-select v-model="form.assocTypeId" placeholder="资讯" style="width: 300px">
                <el-option label="资讯" :value="1"></el-option>
                <el-option label="投融工具" :value="2"></el-option>
                <el-option label="行业" :value="3"></el-option>
                <el-option label="经典案例" :value="4"></el-option>
                <el-option label="新材料" :value="5"></el-option>
                <el-option label="资产管理" :value="6"></el-option>
                <el-option label="宏观" :value="7"></el-option>
                <el-option label="观点" :value="8"></el-option>
                <el-option label="判例" :value="9"></el-option>
                <el-option label="法律法规" :value="10"></el-option>
                <el-option label="文章" :value="11"></el-option>
                <el-option label="互联网" :value="12"></el-option>
                <el-option label="大数据" :value="13"></el-option>
                <el-option label="金融" :value="14"></el-option>
                <el-option label="教育" :value="15"></el-option>
                <el-option label="医疗" :value="16"></el-option>
                <el-option label="O2O" :value="17"></el-option>
                <el-option label="游戏" :value="18"></el-option>
                <el-option label="智能硬件" :value="19"></el-option>
              </el-select>
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
            <el-form-item label="封面">
                <el-radio-group v-model="radio" @change="chanrad">
                  <el-radio :label="0">无图模式</el-radio>
                  <el-radio :label="1">单图封面</el-radio>
                  <el-radio :label="3">三图封面</el-radio>
                </el-radio-group>
              </el-form-item>
            <el-form-item label="封面">
              <!--默认-->
              <div v-show="initimages" class="initimages">

              </div>
              <!--单张-->
              <div v-show="oneimages" class="oneimages">
                <dl>
                  <dt>
                    <el-upload
                      class="upload-demo"
                      action="/mobile/people/avatar"
                      :on-success="danzhangbendisahncgha"
                      :on-remove="handleRemove"
                      :on-error="uploaderror"
                      :show-file-list="false"
                      :on-change="hidebox"
                      :data="imgData">
                      <el-button size="small" type="primary">从本地上传</el-button>
                    </el-upload>
                  </dt>
                  <dd>
                    <el-button size="small" type="primary" @click="onechange">从正文选择</el-button>
                    <el-button size="small" type="primary" @click="onecrap(1)">裁剪封面</el-button>
                  </dd>
                  <span v-for="item in onedate">
                        <img :src="item" alt="">
                      </span>
                  <i class="el-icon-close" @click="deleteong"></i>
                </dl>
                <transition name="slide-fade">
                  <div class="picimages" v-show="picimages">
                      <span v-for="item in dataimags" @click="addimages(item)">
                        <img :src="item">
                      </span>
                  </div>
                </transition>
              </div>
              <!--三张-->
              <div v-show="threeimag" class="threeimag">
                <dl>
                  <dt>
                    <el-upload
                      class="upload-demo"
                      action="/mobile/people/avatar"
                      :on-success="onsidec1bendi"
                      :on-remove="handleRemove"
                      :on-error="uploaderror"
                      :show-file-list="false"
                      :data="imgData">
                      <el-button size="small" type="primary">从本地上传</el-button>
                    </el-upload>
                  </dt>
                  <dd>
                    <el-button size="small" type="primary" @click="onsidec1">从正文选择</el-button>
                    <el-button size="small" type="primary" @click="onecrap(2)">裁剪封面</el-button>
                  </dd>
                  <span v-for="item in sidec1">
                        <img :src="item" alt="">
                      </span>
                  <i class="el-icon-close" @click="onsidec1del(1)"></i>
                </dl>
                <dl>
                  <dt>
                    <el-upload
                      class="upload-demo"
                      action="/mobile/people/avatar"
                      :on-success="onsidec2hncgha"
                      :on-remove="handleRemove"
                      :on-error="uploaderror"
                      :show-file-list="false"
                      :data="imgData">
                      <el-button size="small" type="primary">从本地上传</el-button>
                    </el-upload>
                  </dt>
                  <dd>
                    <el-button size="small" type="primary" @click="onsidec2">从正文选择</el-button>
                    <el-button size="small" type="primary" @click="onecrap(3)">裁剪封面</el-button>
                  </dd>
                  <span v-for="item in sidec2">
                        <img :src="item" alt="">
                      </span>
                  <i class="el-icon-close" @click="onsidec1del(2)"></i>
                </dl>
                <dl>
                  <dt>
                    <el-upload
                      class="upload-demo"
                      action="/mobile/people/avatar"
                      :on-success="onsidec3hncgha"
                      :on-remove="handleRemove"
                      :on-error="uploaderror"
                      :show-file-list="false"
                      :data="imgData">
                      <el-button size="small" type="primary">从本地上传</el-button>
                    </el-upload>
                  </dt>
                  <dd>
                    <el-button size="small" type="primary" @click="onsidec3">从正文选择</el-button>
                    <el-button size="small" type="primary" @click="onecrap(4)">裁剪封面</el-button></dd>
                  <span v-for="item in sidec3">
                        <img :src="item" alt="">
                      </span>
                  <i class="el-icon-close" @click="onsidec1del(3)"></i>
                </dl>
                <transition name="slide-fade">
                  <div class="picimages" v-show="threeimagbox">
                      <span v-for="item in dataimags" @click="addsidec(item)">
                        <img :src="item">
                      </span>
                  </div>
                </transition>
              </div>
            </el-form-item>
            <div class="col_button">
              <el-button type="primary" @click="publish">保存并添加</el-button>
            </div>

          </el-form>
        </div>
        <!--footer -->
      </div>
    </div>
   <!--图片裁剪-->
    <div class="cra_box" v-show="cardshow">
      <div class="box_c_boxy_t">
        <span></span>裁剪封面
        <i class="el-icon-close"  @click="cancascrad"></i>
      </div>
      <div class="crop">
        <img :src="imgaescource" id="image">
      </div>
      <div class="cropbtn">
        <el-button @click="cancascrad">取 消</el-button>
        <el-button @click="servercrad(indexid,fileIndexId,savePath)">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  var E = require('wangeditor');
  import Cropper from '../assets/cropper'
  export default {
    props:{
      success:{   // success callback
        type:Function
      }
    },
    data:function () {
      return {
        cardshow:false, // 裁剪
        radio:0,
        initimages:true,
        oneimages:false,
        threeimag:false,
        dataimags:[], // 所有图片数据集合
        picimages:false, // 单张图片默认不显示
        threeimagbox:false,// 三张图片默认不显示
        /*三张图片的存储容器*/
        sidec1:[],
        sidec2:[],
        sidec3:[],
        /*单张图片数据集合*/
        onedate:[],
        /*默认标识*/
        intname:null,
        /*图片的信息*/
        imgaescource:'', // 图片地址
        mw:'', // 裁剪的宽度
        mh:'', //裁剪的高度
        x:'', //水平偏移
        y:'', //垂直偏移
        sw:'', //实际的宽度
        sh:'', //实际的高度
        cropper:'',
        croppable:false,
        /*服务端发送的信息*/
        fileIndexId:'',
        savePath:'',
        /*裁剪图片的展示区域*/
        imguel:'',
        /*本地上传标记*/
        /*server变更*/
        serpic:null,
        indexid:'',
        file:false,
        detailApi: '/knowledge/knowledge/',
        updateApi: '/knowledge/knowledge/admin/update',
        createApi: '/knowledge/knowledge/admin/create',
        resolveApi:'/cross/newknowledge/knowledgeOther/fetchExternalKnowledgeUrl',
        cradapi:'/cross/file/member/avatar/yunyingCut.json',//裁剪的接口
        netapi:'/cross/file/member/avatar/uploadInternetImage.json',//解析图片发送
        labelPosition: 'right',
        sessionid: localStorage.sessionID,
        sourcePic:null,
        fileList:[],
        form: {
          assocTypeId: 1,
          assocTitle: null,
          pic:'',
        },
        imgData:{
          's' : 'web',
          'uid':JSON.parse(localStorage.currentUser).id,
        },
        defaultMsg: '',
        // 编辑完成之后发送的数据
        eaditinit:[],
        tableData: {},
        column : ["全部","资讯","投融工具","行业","经典案例","新材料","资产管理","宏观","观点","判例","法律法规","文章","互联网","大数据","金融","教育","医疗","O2O","游戏","智能硬件"],
      }
    },
    mounted:function () {
        //初始化这个裁剪框
        var self = this;
        var image = document.getElementById('image');
        this.cropper = new Cropper(image, {
          aspectRatio: 16 / 9,
          viewMode: 1,
          background:false,
          checkImageOrigin:false,
          zoomable:false,
          ready: function () {
            self.croppable = true;
            self.url = self.url;
          },
          crop:function (e) {
            self.mw = e.detail.width;
            self.mh = e.detail.height;
            self.x = e.detail.x;
            self.y = e.detail.y;
            self.sw = image.naturalWidth;
            self.sh = image.naturalHeight;
          },
        });
        self.initERiter();
        var hrefw = window.location.href;
        var fixuel = hrefw.substring(7,8);
        /*开发环境*/
        if(fixuel == "l"){
            this.imguel = "http://file.online.gintong.com"
        }
        if(fixuel == "a"){
          this.imguel = "http://file.online.gintong.com"
        }/*新仿真环境*/
        if(fixuel == "f"){
          this.imguel = "http://fzfile.gintong.com"
        }/*正式环境*/
        if(fixuel == "g"){
          this.imguel = "http://file.gintong.com"
        }
    },
    methods:{
      showbox(){
        this.file = true;
        this.defaultMsg = "";
        this.form.assocTitle = null;
        this.radio = 0;
        this.dataimags = [];
        this.sidec1 = [];
        this.sidec2 = [];
        this.sidec3 = [];
        this.onedate = [];
        var vm = this;
        var editor = new E('#editor');
        editor.customConfig.onchange = function (html) {
          vm.defaultMsg = html;
        };
        editor.create();
        editor.txt.html(vm.defaultMsg);
      },
      /*------------------------------------------------------------------------------------------------*/
      /*根据red值来显示盒子*/
      chanrad:function (val) {
        if(val == 0){
          this.initimages = true;
          this.oneimages = false;
          this.threeimag = false;

          this.picimages = false;//单张图片文本框
          this.threeimagbox = false;
        }
        if(val == 1){
          this.initimages = false;
          this.oneimages = true;
          this.threeimag = false;

          this.picimages = false;//单张图片文本框
          this.threeimagbox = false;
        }
        if(val == 3){
          this.initimages = false;
          this.oneimages = false;
          this.threeimag = true;

          this.picimages = false;//单张图片文本框
          this.threeimagbox =false;
        }
      },

      /*-------------------------------------------------------------------------------------------------*/
      /*单张正文获取*/
      onechange(){
        this.picimages = true;
      },
      /*点击了单张正文的某一张图片*/
      addimages(img){
        var that =  this;
        var data = new FormData();
        data.append('frourl',img);
        this.onedate = [];
        this.picimages = false;
        this.indexid = 0;
        that.$http.post(that.netapi,data,{ emulateJSON: true},{headers:{
          sessionID :localStorage.getItem('sessionID'),
          s:'web',
        }}).then(
          function (res) {
            if(res.data.responseData.url){
              var dayas = that.imguel + res.data.responseData.url;
              that.fileIndexId = res.data.responseData.fileIndexId;
              that.savePath = res.data.responseData.relativelyUrl;
              that.onedate.push(dayas);
            }else{
              that.$message.error('上传失败,封面可以推送，但是不能裁剪');
              that.onedate.push(img);
            }
          },function (res) {
            that.$message.error('上传失败,封面可以推送，但是不能裁剪');
            that.onedate.push(img);
          }
        );
      },
      /*单张本地上传获取*/
      danzhangbendisahncgha(res, file){
        if(res.responseData.succeed){
          this.onedate = [];
          var dayas = this.imguel + res.responseData.url;
          this.fileIndexId = res.responseData.fileIndexId;
          this.savePath = res.responseData.relativelyUrl;
          this.onedate.push(dayas);
          this.indexid = 0;
        }else {
          this.$message.error('封面上传失败');
        }
      },

      onecrap(id){
        /*
         * 单张上传成功 弹出裁剪框
         * */
        this.cardshow = true;
        if(this.cropper){
            if(id == 1){
              this.cropper.replace(this.onedate.join(''));
              this.indexid = 0;
            }
            if(id == 2){
              this.cropper.replace(this.sidec1.join(''));
              this.indexid = 1;
            }
            if(id == 3){
              this.cropper.replace(this.sidec2.join(''));
              this.indexid = 2;
            }
            if(id == 4){
              this.cropper.replace(this.sidec3.join(''));
              this.indexid = 3;
            }
        }
      },
      /*删除了单张图片*/
      deleteong(){
        this.onedate = []; // 清空单张图片了
      },
      /*-------------------------------------------------------------------------------------------------*/
      /*三张里面的第1张*/
      onsidec1(){
        this.threeimagbox =true;
        this.indexid = 1
      },
      /*三张里面的第2张*/
      onsidec2(){
        this.threeimagbox =true;
        this.indexid = 2
      },
      /*三张里面的第3张*/
      onsidec3(){
        this.threeimagbox =true;
        this.indexid = 3
      },
      /*公共删除*/
      onsidec1del(key){
        if(key == 1){
          this.sidec1= [];
        }
        if(key == 2){
          this.sidec2= [];
        }
        if(key == 3){
          this.sidec3= [];
        }
      },
      onsidec1bendi(res, file){
        if(res.responseData.succeed){
          this.sidec1 = [];
          var dayas = this.imguel + res.responseData.url;
          this.fileIndexId = res.responseData.fileIndexId;
          this.savePath = res.responseData.relativelyUrl;
          this.sidec1.push(dayas);
          this.indexid = 1;
        }else{
          this.$message.error('封面上传失败');
        }
      },
      onsidec2hncgha(res, file){
        if(res.responseData.succeed){
          this.sidec2 = [];
          var dayas = this.imguel + res.responseData.url;
          this.fileIndexId = res.responseData.fileIndexId;
          this.savePath = res.responseData.relativelyUrl;
          this.sidec2.push(dayas);
          this.indexid = 2;
        }else{
          this.$message.error('封面上传失败');
        }
      },
      onsidec3hncgha(res, file){
        if(res.responseData.succeed == true){
          this.sidec3 = [];
          var dayas = this.imguel + res.responseData.url;
          this.fileIndexId = res.responseData.fileIndexId;
          this.savePath = res.responseData.relativelyUrl;
          this.sidec3.push(dayas);
          this.indexid = 3;
        }else{
          this.$message.error('封面上传失败');
        }
      },
      addsidec(item){
        /*获取表示 并添加到相应的数据盒子里面*/
        var that =  this;
        var data = new FormData();
        data.append('frourl',item);
        this.threeimagbox =false;
        that.$http.post(that.netapi,data,{ emulateJSON: true},{headers:{
          sessionID :localStorage.getItem('sessionID'),
          s:'web',
        }}).then(
          function (res) {
            if(res.data.responseData.url){
              var dayas = that.imguel + res.data.responseData.url;
              that.fileIndexId = res.data.responseData.fileIndexId;
              that.savePath = res.data.responseData.relativelyUrl;
              if(this.indexid == 1){
                that.sidec1 = [];
                that.sidec1.push(dayas)
              }
              if(this.indexid == 2){
                that.sidec2 = [];
                that.sidec2.push(dayas)
              }
              if(this.indexid == 3){
                that.sidec3 = [];
                that.sidec3.push(dayas)
              }
            }else{
              that.$message.error('上传失败,封面可以推送，但是不能裁剪');
              if(this.indexid == 1){
                that.sidec1 = [];
                that.sidec1.push(item)
              }
              if(this.indexid == 2){
                that.sidec2 = [];
                that.sidec2.push(item)
              }
              if(this.indexid == 3){
                that.sidec3 = [];
                that.sidec3.push(item)
              }
            }
          },function (res) {
            that.$message.error('上传失败,封面可以推送，但是不能裁剪');
            if(this.indexid == 1){
              that.sidec1 = [];
              that.sidec1.push(item)
            }
            if(this.indexid == 2){
              that.sidec2 = [];
              that.sidec2.push(item)
            }
            if(this.indexid == 3){
              that.sidec3 = [];
              that.sidec3.push(item)
            }
          }
        );
      },
      /*需要上传服务器的信息*/
      servercrad(id,fileIndexId,savePath){
        this.cardshow = false;
        var data = new FormData();
        data.append('s', "web");
        data.append('crop_width', this.mw);
        data.append('crop_height', this.mh);
        data.append('crop_x', this.x);
        data.append('crop_y', this.y);
        data.append('fileIndexId', fileIndexId);
        data.append('savePath', savePath);
        data.append('image_width', this.sw);
        data.append('image_height', this.sh);
        data.append('show_width', 216); // 实际的宽
        data.append('show_height', 136); //实际的高度
        /*发送服务器*/
        this.$http.post(this.cradapi,data,{ emulateJSON: true},{headers:{
          sessionID :localStorage.getItem('sessionID'),
          s:'web',
        }}).then(
          function (res) {
            if(res || res.data.target){
              var onr = this.imguel + res.data.target;
              if(id == 0){ //单张封面 单张本地上传
                this.onedate = [];
                this.onedate.push(onr)
              }
              if(id == 1){ // 三张封面里面第一张
                this.sidec1 = [];
                this.sidec1.push(onr)
              }
              if(id == 2){
                this.sidec2 = [];
                this.sidec2.push(onr)
              }
              if(id == 3){
                this.sidec3 = [];
                this.sidec3.push(onr)
              }
            }else{
              this.$message.error('封面裁剪失败！请重新裁剪');
            }
          },function (res) {
            this.$message.error('封面裁剪失败！请重新裁剪');
          }
        );
      },
      /*-----------------------------------------------------------------------------------------*/
      hidebox(file, fileList){
        this.picimages = false;
        this.threeimagbox =false;
      },

      /*------------------------------------------------------------------------------------------------*/

      cancascrad(){
        this.cardshow = false;
        var imgsuel = "";
        this.cropper.replace(imgsuel);
      },

      initERiter(){
        var vm = this;
        var editor = new E('#editor');
        editor.customConfig.onchange = function (html) {
          vm.defaultMsg = html;
        };
        editor.create();
        editor.txt.html(vm.defaultMsg);
      },
      handleRemove(file) {
        console.log(file);
      },
      uploaderror(err, file, fileList){
        this.$message.error('封面上传失败');
      },
      handlePictureCardPreview(file){
        this.dialogVisible = true;
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
                  that.form.pic = res.body.responseData.knowledge2.pic;
                  that.initERiter();
                  // 获取html内容
                  var str = res.body.responseData.knowledge2.content;
                  try {
                    //匹配图片（g表示匹配所有结果i表示区分大小写）
                    var imgReg = /<img.*?(?:>|\/>)/gi;
                    //匹配src属性
                    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

                    var arr = str.match(imgReg);

                    for (var i = 0; i < arr.length; i++) {

                      var src = arr[i].match(srcReg);
                      //获取图片地址
                      if (src[1]) {
                        that.dataimags.push(src[1]);
                        /* console.log('已匹配的图片地址' + (i + 1) + '：' + src[1]);*/
                      }
                    }
                  }catch (e){
                    that.$message.error('图片抓取失败，或许是该网站禁止抓取');
                  }
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
        var that = this;
        /*判断头条图片的获取情况*/
        var imglist = [];
        var serverdateimg;

        if(that.radio == 0){
          that.form.pic = '';
        }
        if(that.radio == 1){
          if(this.onedate.length ==0){
            that.$message.error('您选择了单张封面选项，请从正文选取一直或者本地上传一张作为封面!');
          }else{
            imglist.push(this.onedate)
            that.form.pic = imglist.join(',')
            serverdateimg = this.onedate

          }
        }
        if(that.radio == 3){
          var ontca = that.sidec1.concat(that.sidec2)
          var twoca = ontca.concat(that.sidec3);
          if(twoca.length < 3){
            that.$message.error('您选择了三张封面选项，请从正文选取或者本地上传三张作为封面!');
          }else {
            imglist.push(twoca)
            that.form.pic = imglist.join(',')
            serverdateimg = twoca;
          }
        }
        /*
         * 最后把imglist发送给服务器处理
         * */
        /*  console.log(imglist)*/

        console.log(imglist)

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
            pic: that.form.pic, // images sources 暂时这么处理
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
            multiUrls: serverdateimg,
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
              var nulobj = {};
              nulobj.sourceId = res.body.responseData;
              nulobj.sourceTitle = publishData.knowledgeDetail.title;
              nulobj.sourceTypeId = 8;
              nulobj.columnType =  publishData.knowledgeDetail.columnType;//栏目
              nulobj.picPath =  publishData.knowledgeDetail.pic == null ? '' : publishData.knowledgeDetail.pic ;
              nulobj.ownerName =  JSON.parse(localStorage.getItem('currentUser')).name;
              nulobj.readCount = publishData.readCount;
              that.success(nulobj)
              that.file = false;
            }else {
              that.$notify.error({
                title: '发布失败，请稍候重试...',
                duration: 1500
              });
            }
          },function (res) {
            that.$notify.error({
              title: '发布失败，请稍候重试...',
              duration: 1500
            });
            return false;
          }
        )
      },
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
/*  .crop{
    width: 470px;
    height: 300px;
    overflow: hidden;
    margin: 0px auto;
    border: 1px solid #ccc;
  }*/

  .cra_box{
    position: absolute;
    left:0;
    top:0;
    width: 960px;
    height:660px;
    overflow: hidden;
    background: white;
    border: 1px solid #cccccc;
    z-index: 1000;
    .crop{
      display: block;
      width: 900px;
      height:500px;
      overflow: hidden;
      margin: 20px auto;
      border: 1px solid #cccccc;
    }
    .cropbtn{
      display: block;
      text-align: center;
    }
  }
  .picimages{
    border-top: 1px solid #c3c3c3;
    width: 100%;
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 20px;
    padding-top: 20px;
    span{
      float: left;
      display: block;
      width: 150px;
      height: 150px;
      border: 1px solid #cccc77;
      margin: 3px;
      overflow: hidden;
      cursor: pointer;
      img{
        max-width: 100%;
      }

    }
  }
  .initimages{
    display: block;
    color: #f7ba2a;
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
  }
  .oneimages,.threeimag{
    display: block;
    margin-top: 20px;

    dl{
      display: inline-block;
      width: 200px;
      height:200px;
      overflow: hidden;
      position: relative;
      border: 1px dashed #ccc;
      margin-right: 20px;
      padding: 5px;
      text-align: center;

      i{
        position: absolute;
        right: 5px;
        top: 5px;
        cursor: pointer;
      }
      img{
        max-width: 100%;
      }

      dt{
        position: absolute;
        left: 0;
        top: 60px;
        width: 100%;
        text-align: center;
      }
      dd{
        position: absolute;
        left: 0;
        top: 100px;
        width: 100%;
        text-align: center;
      }
    }

  }












  .people{
    display: inline-block;
    vertical-align: top;
  }

  .box_c_boxy{
    margin-top: 50px;
  }
  .col_button{
    text-align: center;
    margin-bottom: 20px;
  }
  .box_c_boxy_t{
    display: block;
    margin: 0 20px;
    line-height: 50px;
    border-bottom: 1px dashed #e5e5e5;
    font-weight: bold;
    span{
      float: left;
      width: 2px;
      height:14px;
      background: #1b89d9;
      margin-top: 20px;
      margin-right: 10px;
    }
    i{
      float: right;
      color: #cdcdcd;
      font-size: 14px;
      margin-top: 20px;
      cursor: pointer;
    }
  }
  .box_c_boxy_c{
    display: block;
    margin: 15px 30px 0;
  }
  .boxcontaion{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color:rgba(0,0,0,0.3);
  }
  .box_c_boxy{
    width: 1000px;
    height: 600px;
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -300px;
    margin-left: -500px;
    border-radius: 10px;
    background: white;
  }
  .col_button{
    text-align: center;
    margin-bottom: 20px;
  }

  @import "../assets/crop.css";

</style>
