<template>
  <div class="organ_add">
  <section class="section">
	    <div class="loation"><router-link to="/">用户管理</router-link> >>><router-link to="/organum">组织用户管理</router-link> >>创建组织</div>
	    <div class="el-page">
        <el-form ref="organData" :model="organData" :rules="rules" label-width="180px">
          <div class="title">组织基本信息</div>
          <div class="ecol-body">
            <el-row>
              <el-col :span="20">
                <el-form-item label="类型">
                  <el-select v-model="organData.organType" placeholder="企业">
                    <el-option
                      v-for="item in organType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="金桐号" prop="organNumber">
                  <el-input v-model="organData.organNumber" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-col :span="20">
                  <el-form-item label="组织头像" prop="organLogo">
                    <el-upload
                      class="avatar-uploader"
                      action="/mobile/people/avatar/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :data="imgData">
                      <img v-if="organData.organLogo" :src="nginxRoot + organData.organLogo" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="20">
                <el-form-item label="组织名称" prop="organName">
                  <el-input v-model="organData.organName" ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="20">
                <el-form-item label="组织全称" prop="organAllName">
                  <el-input type="" v-model="organData.organAllName" ></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="20">
                <el-form-item label="组织描述" prop="organDescribe">
                  <el-input type="textarea" v-model="organData.organDescribe"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="行业" prop="industry">
                  <el-select clearable v-model="industry.one" placeholder="请选择" >
                    <el-option
                      v-for="item in ones"
                      :value="item"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                  <el-select clearable v-model="industry.two" placeholder="请选择"  prop="organIndustry2">
                    <el-option
                      v-for="item in twos"
                      :value="item"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <v-Area :success="Areadate"></v-Area>
              </el-col>
              <!-- <el-col :span="20">
                <el-form-item label="认证状态">
                  <el-input v-model="organData.isAuthStr"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="20">
                <el-form-item label="绑定手机号" prop="username">
                  <el-input v-model="organData.username"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="20">
                <el-form-item label="绑定用户">
                  <el-input v-model="username"  :disabled="true"></el-input>
                </el-form-item>
              </el-col> -->
            </el-row>
          </div>

          <div class="title">组织认证信息</div>
          <div class="ecol-body">
            <el-row>
              <el-col :span="20">
                <el-form-item label="企业全称" prop="organAllName">
                  <el-input v-model="organData.organAllName" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20" >
                <el-form-item label="组织机构代码" prop="organCreditCode">
                  <el-input v-model="organData.organCreditCode" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="组织机构执照" prop="organCreditCodePath">
                  <el-upload
                    class="avatar-uploader card-uploader"
                    action="/mobile/people/avatar/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess1"
                    :before-upload="beforeAvatarUpload"
                    :data="imgData">
                    <img v-if="organData.organCreditCodePath" :src="nginxRoot + organData.organCreditCodePath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="统一社会信用代码" prop="socialCreditCode">
                  <el-input v-model="organData.socialCreditCode" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="统一社会信用营业执照" prop="socialCreditCodePath">
                  <el-upload
                    class="avatar-uploader card-uploader"
                    action="/mobile/people/avatar/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :before-upload="beforeAvatarUpload"
                    :data="imgData">
                    <img v-if="organData.socialCreditCodePath" :src="nginxRoot + organData.socialCreditCodePath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="工商营业执照号" prop="businessRegistNumber">
                  <el-input v-model="organData.businessRegistNumber" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="工商营业执照" prop="businessLicensePath">
                  <el-upload
                    class="avatar-uploader card-uploader"
                    action="/mobile/people/avatar/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess3"
                    :before-upload="beforeAvatarUpload"
                    :data="imgData">
                    <img v-if="organData.businessLicensePath" :src="nginxRoot + organData.businessLicensePath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="法人代表" prop="legalPerson">
                  <el-input v-model="organData.legalPerson" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="法人身份正面" prop="corpCardPositivePath">
                  <el-upload
                    class="avatar-uploader card-uploader"
                    action="/mobile/people/avatar/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess4"
                    :before-upload="beforeAvatarUpload"
                    :data="imgData">
                    <img v-if="organData.corpCardPositivePath" :src="nginxRoot + organData.corpCardPositivePath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="法人身份背面" prop="corpCardNegativePath">
                  <el-upload
                    class="avatar-uploader card-uploader"
                    action="/mobile/people/avatar/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess5"
                    :before-upload="beforeAvatarUpload"
                    :data="imgData">
                    <img v-if="organData.corpCardNegativePath" :src="nginxRoot + organData.corpCardNegativePath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="back">
            <el-button><router-link to="/organum">取消</router-link></el-button>
            <el-button type="primary" @click="submitForm('organData')"  :loading="loading">保存</el-button>
          </div>
        </el-form>
      </div>
	</section>
  </div>
</template>

<script>
  import cityjson from '../../config/citys'
  import industryjson from '../../config/industry'

  import Area from '../../components/area.vue'

  export default {
    name:'organ_add',
    components:{
      'v-Area':Area
    },
    computed:{
      ones:function(){
        if(!this.Requirementa)return
        var c=[]
        for(var key in this.Requirementa){
          c.push(key)
        }
        this.handleIndustry();
        return c
      },
      twos:function(){
        if(!this.Requirementa || !this.industry.one)
          return
        var c=[]
        for(var key in this.Requirementa[this.industry.one]){
          c.push(key)
        }
        this.handleIndustry();
        return c
      },
    },
    watch:{
      one:function(val,oldval){
        if(val!==oldval){
          this.one=''
        }
      },
      two:function(val,oldval){
        if(val!==oldval){
          this.two=''
        }
      }
    },
    mounted : function(){
      var domain = document.domain;
      if(domain == "www.gintong.com" || domain=='gtadmin.gintong.com'){
        this.nginxRoot = "http://file.online.gintong.com"
      }
      if(domain == "fzwww.gintong.com" || domain=="fzadmin.gintong.com"){
        this.nginxRoot = "http://fzfile.gintong.com"
      }
    },
    data:function () {
      let that = this;
      let validateMobile = (rule, value, callback) => {
        if (value.length > 1) {          
            let params = {"mobile":value};
            that.$http.post(this.checkMobileURI, params,{headers:{
                sessionID :localStorage.sessionID,
                s:'web',
              }})
            .then(function (res) {
                if(res.body.responseData.succeed){
                    callback();
                } else {
                  callback(new Error('当前手机号还没有注册金桐网'));
                }
            })
            .catch(function () {
                callback(new Error('服务异常'))
            })
        } else {
            callback()
        }
      }
      let validateOrganNumber = (rule, value, callback) => {
        if (value.length > 1) {          
            let params = {"organNumber":value};
            that.$http.post(this.checkOrganNeumberURI, params,{headers:{
                sessionID :localStorage.sessionID,
                s:'web',
              }})
            .then(function (res) {
                if(res.body.responseData.result){
                  callback(new Error('该金桐号已被注册，请重新输入'));                  
                } else {
                  callback();
                }
            })
            .catch(function () {
                callback(new Error('服务异常，请稍后重试'));
            })
        } else {
            callback()
        }
      }
      return {
        loading : false,
        addressData:cityjson,
        Requirementa:industryjson,
        nginxRoot : "http://file.online.gintong.com",
        industry:{
          one:'',
          two:'',
        },
        peopleDate:{
          firstIndustry: '',
          secondIndustry: '',
          threeIndustry: '',
        },
        organType : [{id:'1',name:'企业'},{id:'2',name:'政府'},{id:'3',name:'媒体'},{id:'5',name:'教育'},{id:'6',name:'医疗'},{id:'4',name:'其它'}],
        username : '',
        createURI : '/cross/organ/backOrganRegister.json',
        checkMobileURI : '/cross/register/isExistByMobileOrByEmail.json',
        checkOrganNeumberURI : '/cross/organ/isExistOrganNumber.json',
        organData : {
          username : '',
          organDescribe : '',
          organNumber: '',
          industry: '',
          islisted: false,
          "organLogo" : '',
          "industryid": 0,
          "organName": "",
          orgType : '企业',//显示
          organType : null,//取值
          "area": "",
          "templateType": 0,
          "stockNumber": "",
          "areaid": 0,
          "organAllName": "",
          "status": 2,//默认已认证
          "organAllName": "",
          "socialCreditCode": "",
          "organCreditCode": "",
          "businessRegistNumber": "",
          "legalPerson": "",
          "socialCreditCodePath": "",
          "organCreditCodePath": "",
          "businessLicensePath": "",
          "corpCardPositivePath": "",
          "corpCardNegativePath": "",
        },
        rules: {
          username : [{required: true, message: '请输入绑定的手机号', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确！' },
            { validator: validateMobile, trigger: 'blur'}
                 ],
          organNumber: [{required: true, message: '请输入金桐号', trigger: 'blur' },
            {pattern:/^[0-9a-zA-Z_]{1,}$/,message:'请使用数字、字母或下划线', trigger: 'blur'},
            {min:6,max:20,message:'金桐号长度应在6-20之间',trigger:'blur'},
            {validator:validateOrganNumber,trigger:'blur'}
          ],
          organDescribe : [{required: true, message: '请输入组织描述', trigger: 'blur' }],
          "organLogo" : [{required: true, message: '请上传组织头像', trigger: 'change' }],
          "industry": [{required: true, message: '请选择行业', trigger: 'change' }],
          "area":[{required: true, message: '请选择地区', trigger: 'change' }],
          organName: [{required: true, message: '请输入组织名称', trigger: 'blur' },
            {pattern:/^[\u4E00-\u9FA5A-Za-z0-9]+$/,message:'请使用字母、汉字与数字', trigger: 'blur'}
          ],
          "organAllName": [{required: true, message: '请输入组织全称', trigger: 'blur' },
            {pattern:/^[a-zA-Z\u4e00-\u9fa5\(\)\（\）]+$/,message:'请使用字母、汉字与括号', trigger: 'blur'},
            {min:1,max:100,message:'金桐全称长度应在100字以内',trigger:'blur'},
          ],
          "socialCreditCode": [{required: true, message: '请输入社会统一信用营业执照', trigger: 'blur' }],
          "organCreditCode": [{required: true, message: '请输入组织机构代码', trigger: 'blur' }],
          "businessRegistNumber": [{required: true, message: '请输入工商营业执照号', trigger: 'blur' }],
          "legalPerson": [{required: true, message: '请输入法人代表', trigger: 'blur' }],
          "socialCreditCodePath": [{required: true, message: '请上传统一社会信用营业执照', trigger: 'blur' }],
          "organCreditCodePath": [{required: true, message: '请上传组织机构执照', trigger: 'blur' }],
          "businessLicensePath": [{required: true, message: '请上传工商营业执照', trigger: 'blur' }],
          "corpCardPositivePath": [{required: true, message: '请上传身份证正面照片', trigger: 'blur' }],
          "corpCardNegativePath": [{required: true, message: '请上传身份证背面照片', trigger: 'blur' }]

        },
        imgData:{
          's' : 'web',
          'uid' : JSON.parse(localStorage.currentUser).id
        },
      }
    },
    methods:{
      /* 地区四级联动 */
      Areadate:function(data){
        var arr = [];
        if(data.sCountry != ''){
          arr.push(data.sCountry);
          if(data.sProvince != ''){
            arr.push(data.sProvince);
            if(data.sCity != ''){
              arr.push(data.sCity);
            }
            if(data.sArea != ''){
              arr.push(data.sArea);
            }
          }
        }
        var arrString = arr.length > 0 ? arr.join('-') : '';
        this.organData.area = arrString;
      },
      checkMobile : function(rule,value,callback){
        this.$http.post(this.checkMobileURI,JSON.stringify({"mobile":value}),{headers:{
            sessionID :localStorage.sessionID,
            s:'web',
          }}
        ).then(
          function (res) {
            if(res.body.responseData.succeed){
              callback();
            }else{
              callback(new Error('当前手机号还没有注册金桐网'));
            }
        },function(){
          callback(new Error('手机号码校验失败，请稍后重试！'));
        });
      },
      handleIndustry : function(){
        var arr = [];
        if(this.industry.one!=''){
          arr.push(this.industry.one);
          if(this.industry.two!=''){
            arr.push(this.industry.two);
          }
        }
        this.organData.industry = arr.length > 0 ? arr.join('-') : '';
      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      //保存数据
      submitForm(formName){
        var that = this;
        that.loading = false;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.formData = {
              username : that.organData.username,
              organDescribe : that.organData.organDescribe,
              organRegister: {
                industry: that.organData.industry,
                islisted: false,
                organNumber: that.organData.organNumber,
                "organLogo" : that.organData.organLogo,
                "industryid": 0,
                "organName": that.organData.organName,
                "orgType": that.organData.organType ? that.organData.organType : 1,
                "area": that.organData.area,
                "templateType": 0,
                "stockNumber": "",
                "areaid": 0,
                "organAllName": that.organData.organAllName
              },
              "organAuth": {
                "status": 2,//默认已认证
                "organAllName": that.organData.organAllName,
                "organType": that.organData.organType ? that.organData.organType : 1,
                "socialCreditCode": that.organData.socialCreditCode,
                "organCreditCode": that.organData.organCreditCode,
                "businessRegistNumber": that.organData.businessRegistNumber,
                "legalPerson": that.organData.legalPerson,
                "socialCreditCodePath": that.organData.socialCreditCodePath,
                "organCreditCodePath": that.organData.organCreditCodePath,
                "businessLicensePath": that.organData.businessLicensePath,
                "corpCardPositivePath": that.organData.corpCardPositivePath,
                "corpCardNegativePath": that.organData.corpCardNegativePath
              }
            }
            console.log(JSON.stringify(that.formData));
            // return;
            that.$http.post(that.createURI,JSON.stringify(that.formData),{headers:{
                sessionID :localStorage.sessionID,
                s:'web',
              }}
            ).then(
              function (res) {
                if(res.body.notification.notifCode == '0'){
                  that.loading = false;
                  that.$message({
                    type: 'success',
                    message: '组织创建成功 ',
                    duration: 1500,
                    onClose : (instance) => {
                      that.$router.push({path: '/organum'})
                    }
                  });
                }else{
                  this.$notify.error({
                    title: '创建失败',
                    message: res.body.notification.notifInfo,
                    duration: 2000
                  });
                  that.loading = false;
                }
              },function (res) {
                this.$notify.error({
                  title: '创建失败',
                  message: '组织创建失败',
                  duration: 2000
                });
                console.log(res)
              }
            );

          }else {
            this.$notify.error({
              title: '提示',
              message: '所有项均为必填，请检查输入项~',
              duration: 2000
            });
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
        this.organData.organLogo = res.responseData.relativelyUrl;
      },
      handleAvatarSuccess1(res, file) {
        this.organData.organCreditCodePath = res.responseData.relativelyUrl;
      },
      handleAvatarSuccess2(res, file) {
        this.organData.socialCreditCodePath = res.responseData.relativelyUrl;
      },
      handleAvatarSuccess3(res, file) {
        this.organData.businessLicensePath = res.responseData.relativelyUrl;
      },
      handleAvatarSuccess4(res, file) {
        this.organData.corpCardPositivePath = res.responseData.relativelyUrl;
      },
      handleAvatarSuccess5(res, file) {
        this.organData.corpCardNegativePath = res.responseData.relativelyUrl;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,GIF或PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      },
    
    }
  }
</script>
<style lang="less" scoped>
  .title{ padding:10px; border-bottom:1px solid #e5e4ee; background:#fff; text-align:left; }
  .el-page{ text-align:left; margin-top:10px;}
  .ecol-body{
    background:#fff;  margin-bottom:10px;border:none; 
    .el-row{
      min-width:960px; margin:20px auto;
    }
  }
  .el-upload-dragger{ width:320px; height:200px;}
  .card-uploader{
    overflow:visible; 
    .avatar-uploader-icon{ width:320px; height:200px;}
    .avatar-uploader-icon:before{ line-height:200px;}
    .avatar{ width:320px; height:200px;}

  }
  .el-textarea__inner{
    height:150px;min-height:150px;
  }
</style>
