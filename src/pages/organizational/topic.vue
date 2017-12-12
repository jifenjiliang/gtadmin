<template>
  <div class="topic">
    <section class="section">
      <div class="loation">
        <router-link to="/organum">用户管理</router-link> >>><router-link to="/organum">组织用户管理</router-link> >>查看
      </div>
      <!-- topic body -->
      <div class="organum_body">        
        <el-row v-if="Organumform" class="organBg">
          <el-col :span="24" class="organum_block">
            <div class="title">组织基本信息</div>
            <el-row class="col_body">
              <el-form ref="Organumform" :model="Organumform" label-width="100px">
                <el-col :span="18">
                  <el-form-item label="认证状态">
                    <el-input :disabled="true" v-model="Organumform.isAuthStr"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="类型">
                    <el-input :disabled="true" v-model="Organumform.orgType"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="金桐号">
                    <el-input :disabled="true" v-model="Organumform.organNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="组织名称">
                    <el-input :disabled="true" v-model="Organumform.organName"></el-input>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="18">
                  <el-form-item label="组织全称">
                    <el-input :disabled="true" v-model="Organumform.organAllName"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="18">
                  <el-form-item label="组织头像">
                    <img :src="Organumform.picLogo" width="160" height="160" />
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="组织描述">
                    <el-input type="textarea" :disabled="true" v-model="Organumform.discribe"></el-input>
                  </el-form-item>
                </el-col>
                
                <el-col :span="18">
                  <el-form-item label="个人用户账号">
                    <el-input :disabled="true" v-model="userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="区域">
                    <el-input :disabled="true" v-model="Organumform.areaString"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="行业">
                    <el-input :disabled="true" v-model="Organumform.industry"></el-input>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </el-col>

          <el-col :span="24" class="organum_block">
            <div class="title">组织认证信息</div>
            <el-row v-if="OrganumAuth" class="organum_block">
              <el-form ref="OrganumAuth" :model="OrganumAuth" label-width="100px">
                <el-col :span="18">
                  <el-form-item label="企业全称" prop="organAllName">
                    <el-input :disabled="true" v-model="OrganumAuth.organAllName" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18" >
                  <el-form-item label="组织机构代码" prop="organCreditCode">
                    <el-input :disabled="true" v-model="OrganumAuth.organCreditCode" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="组织机构执照" prop="organCreditCodePath">
                      <img v-if="OrganumAuth.organCreditCodePath" :src="OrganumAuth.organCreditCodePath" class="avatar">                 
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="统一社会信用代码" prop="socialCreditCode">
                    <el-input :disabled="true" v-model="OrganumAuth.socialCreditCode" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="统一社会信用营业执照" prop="socialCreditCodePath">
                      <img v-if="OrganumAuth.socialCreditCodePath" :src="OrganumAuth.socialCreditCodePath" class="avatar">
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="工商营业执照号" prop="businessRegistNumber">
                    <el-input :disabled="true" v-model="OrganumAuth.businessRegistNumber" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="工商营业执照" prop="businessLicensePath">
                      <img v-if="OrganumAuth.businessLicensePath" :src="OrganumAuth.businessLicensePath" class="avatar">
                  </el-form-item>
                </el-col>                
                <el-col :span="18">
                  <el-form-item label="法人代表" prop="legalPerson">
                    <el-input :disabled="true" v-model="OrganumAuth.legalPerson" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="法人身份正面" prop="corpCardPositivePath">
                      <img v-if="OrganumAuth.corpCardPositivePath" :src="OrganumAuth.corpCardPositivePath" class="avatar">
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="法人身份背面" prop="corpCardNegativePath">
                        <img  :src="OrganumAuth.corpCardNegativePath" class="avatar">
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-if="!Organumform">
          <div class="">{{allData.notification.notifInfo}}</div>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="getListMyDynamicNewsshow">
            <div class="title">动态</div>
            <el-table
              :data="getListMyDynamicNews"
              style="width: 100%">
              <el-table-column
                type="index"
                width="60">
              </el-table-column>
              <el-table-column
                prop="title"
                label="动态详情"
               >
              </el-table-column>
              <el-table-column
                prop="ctime"
                label="发布时间"
               >
              </el-table-column>
              <el-table-column
                prop="demandCount"
                label="评论数"
                width="400">
              </el-table-column>
              <el-table-column
                prop="peopleCount"
                label="点赞数">
              </el-table-column>
            </el-table>
            <div class="el-page">
              <el-pagination
                @current-change="getListMyDynamicNews_handleCurrentChange"
                :current-page="getListMyDynamicNews_usersindex"
                :page-size="getListMyDynamicNews_userssize"
                layout="prev, pager, next, jumper,total"
                :total="getListMyDynamicNews_userstotal">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="display: none;">
            <div class="title">视频</div>
            <el-table
              :data="video_users"
              style="width: 100%">
              <el-table-column
                type="index"
                width="60">
              </el-table-column>
              <el-table-column
                prop="name"
                label="操作"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="视频标题"
                width="200">
              </el-table-column>
              <el-table-column
                prop="name"
                label="视频描述"
                width="200">
              </el-table-column>
              <el-table-column
                prop="name"
                label="视频时长"
                width="200">
              </el-table-column>
              <el-table-column
                prop="name"
                label="上传时间"
                width="200">
              </el-table-column>
              <el-table-column
                prop="name"
                label="播放次数"
                width="200">
              </el-table-column>
              <el-table-column
                prop="name"
                label="点赞数">
              </el-table-column>
              <el-table-column
                prop="name"
                label="评论数">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row  style="display: none;">
          <el-col :span="24">
            <div class="title">问答</div>
            <el-table
              :data="QA_users"
              style="width: 100%">
              <el-table-column
                type="index"
                width="60">
              </el-table-column>
              <el-table-column
                prop="name"
                label="问题标题"
                width="400">
              </el-table-column>
              <el-table-column
                prop="name"
                label="回答"
                width="400">
              </el-table-column>
              <el-table-column
                prop="name"
                label="回答时间">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-bottom: 100px" v-if="Concern_usersshow">
            <div class="title">关注用户</div>
            <el-table
              :data="Concern_users"
              style="width: 100%">
              <el-table-column
                type="index"
                width="60">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="用户名称"
                width="400">
              </el-table-column>
              <el-table-column
                prop="position"
                label="职能"
                width="400">
              </el-table-column>
              <el-table-column
                prop="area"
                label="地区">
              </el-table-column>
            </el-table>
            <div class="el-page">
              <el-pagination
                @current-change="Concern_users_handleCurrentChange"
                :current-page="Concern_usersindex"
                :page-size="Concern_userssize"
                layout="prev, pager, next, jumper,total"
                :total="Concern_userstotal">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
        <div class="back">          
          <router-link to="/organum"> <el-button type="">&nbsp;返回&nbsp;</el-button></router-link>
          <el-button v-if="isAuth==1" type="success"  @click="aggreeAuth">&nbsp;审核通过&nbsp;</el-button>
          <el-button v-if="isAuth==1" type="warning"  @click="dialogVisible = true">&nbsp;驳回认证&nbsp;</el-button>
        </div>
      </div>
    </section>
    <el-dialog title="组织不通过原因" v-model="dialogVisible" size="small" center>
    <div class="reasonBox">
      <template>
          <div class="reasonList">
            <el-checkbox-group v-model="checkedReason">
              <el-checkbox v-for="reason in reasonList" :label="reason.id" :key="reason.id">{{reason.content}}</el-checkbox>
            </el-checkbox-group>
          </div>  
          <div class="reasonList">
            <h4>自定义原因：</h4>
            <textarea v-model="reason_self" style="width:400px; height:60px;"></textarea>
          </div>
      </template>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="rejectAuth">提交反馈信息</el-button>
    </span>
  </el-dialog>
  </div>

</template>

<script>
  export default {
    name:'topic',
    watch : {
      value(value) {
        console.log(value)
        this.$emit('change', value);
      }
    },
    computed:{
    },
    data() {
      return {
        initapi: '/cross/organ/organ/findOrganDetail.json',
        authInfoApi : '/cross/organ/organ/findAuthInfo.json',//获取组织认证信息        
        agreeAuthApi : '/cross/organ/organ/agreedAuth.json',//同意认证
        rejectAuthApi : '/cross/organ/organ/rejectAuth.json',//驳回认证
        isAuth : 0,
        dialogVisible: false,
        reasons : ['上传营业执照图片或组织机构代码图片不清晰','上传营业执照图片与组织机构代码图片内容信息不符',
          '上传营业执照图片与认证组织名称信息不符','上传组织机构代码图片与认证组织名称信息不符',
          '您所认证的组织未工商系统备案','您所认证的组织因国家政策或相关法律法规被禁止'
        ],
        reasonData :{
          check1 : false,
          check2 : false,
          check3 : false,
          check4 : false,
          check5 : false,
          check6 : false,
        },
        rejectReason : null,
        reasonList : null,
        checkedReason : [],        
        reason_self : '',
        Organumform: {},
        OrganumAuth : {},
        video_users:[],
        QA_users:[],
        /*关注用户 */
        Concern_usersapi:'/cross/organ/organ/organFollowUserList.json',
        Concern_users:[],
        Concern_usersshow:true,
        Concern_usersindex:0,
        Concern_userssize:10,
        Concern_userstotal:1,
        Concern_usersdate:{
          index:0,
          size:10
        },
        /*动态*/
        getListMyDynamicNewsapi:'/dynamicNews/getListMyDynamicNews.json',
        getListMyDynamicNews:[],
        getListMyDynamicNews_usersindex:1,
        getListMyDynamicNews_userssize:10,
        getListMyDynamicNews_userstotal:0,
        getListMyDynamicNewsshow:true,
        getListMyDynamicNews_date:{
          index:1,
          size:10,
          type:0,
          userId:'',
        },
        userName:'',
        nginxRoot : 'http://test.online.gintong.com',
      }
    },
    mounted:function () {
      var domain = document.domain;
      if(domain == "www.gintong.com" || domain=='gtadmin.gintong.com'){
        this.nginxRoot = "http://file.online.gintong.com"
      }
      if(domain == "fzwww.gintong.com" || domain=="fzadmin.gintong.com"){
        this.nginxRoot = "http://fzfile.gintong.com"
      }
       this.$nextTick(function () {
        this.todic();
        this.getListMyD();
        this.aboutUser();
        this.aboutMovie();
        this.aboutAsk();
        this.getReasons();

      });
    },
    methods:{
      /*组织基本信息*/
      todic:function () {
        var that =  this;
        var formcustomerId ={
          'organId':that.$route.params.id
        };
        that.$http.post(that.initapi,JSON.stringify(formcustomerId),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
            that.allData = res.data;
            if(res.data.notification.notifCode != '0'){
              that.$msgbox({
                message : res.data.notification.notifInfo,
                title: '提示',
                type: 'error',
                center : true,
                callback : function(){
                  that.$router.push({path: '/organum'});
                }
              });
              return false;
            }
            that.isAuth = res.data.responseData.isAuth;
            that.Organumform = res.data.responseData.organDetail;
            that.userName = that.Organumform.userName;
            that.Organumform.areaString = that.Organumform.areaString;
            var authState = {'0':'未认证','1':'待审核','2':'已认证','3':'认证已驳回','4':'禁用'};
            that.Organumform.isAuthStr = res.data.responseData.isAuth ? authState[res.data.responseData.isAuth] : authState['0'];
            that.Organumform.picLogo = that.Organumform.picLogo.indexOf('http://')>-1?that.Organumform.picLogo:(that.nginxRoot+that.Organumform.picLogo);
            var orgType = that.Organumform.organType;
            switch(orgType)
            {
              case -1:
                that.Organumform.orgType = '全部';
                break;
              case 1:
                that.Organumform.orgType = '企业';
                break;
              case 2:
                that.Organumform.orgType = '政府';
                break;
              case 3:
                that.Organumform.orgType = '媒体';
                break;
              case 4:
                that.Organumform.orgType = '其它';
                break;
              case 5:
                that.Organumform.orgType = '教育';
                break;
              case 6:
                that.Organumform.orgType = '医疗';
                break;
              default:
                that.Organumform.orgType = '其它';
            }

            that.OrganumAuth = res.data.responseData.organAuth;

            that.OrganumAuth.organCreditCodePath = that.OrganumAuth.organCreditCodePath.indexOf('http://')>-1?that.OrganumAuth.organCreditCodePath:(that.nginxRoot+that.OrganumAuth.organCreditCodePath);
            that.OrganumAuth.socialCreditCodePath = that.OrganumAuth.socialCreditCodePath.indexOf('http://')>-1 ? that.OrganumAuth.socialCreditCodePath : (that.nginxRoot+that.OrganumAuth.socialCreditCodePath);
            that.OrganumAuth.businessLicensePath = that.OrganumAuth.businessLicensePath.indexOf('http://')>-1?that.OrganumAuth.businessLicensePath:(that.nginxRoot+that.OrganumAuth.businessLicensePath);
            that.OrganumAuth.corpCardPositivePath = that.OrganumAuth.corpCardPositivePath.indexOf('http://')>-1?that.OrganumAuth.corpCardPositivePath : (that.nginxRoot+that.OrganumAuth.corpCardPositivePath);
            that.OrganumAuth.corpCardNegativePath = that.OrganumAuth.corpCardNegativePath.indexOf('http://')>-1?that.OrganumAuth.corpCardNegativePath : (that.nginxRoot+that.OrganumAuth.corpCardNegativePath);           
          },function (res) {
            console.log(res)
          }
        )
      },
      getReasons : function(){
        let that = this;
        this.$http.get('/cross/organ/organ/rejectReasonList.json',{headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }}
          ).then(function(res){
            that.reasonList = res.body.responseData.rejectReason;
          });
      },
      aggreeAuth : function(){//通过
        var that = this;
        that.$confirm('此操作将使当前组织通过审核，是否继续？','提示',{
          type : 'warning'
        }).then(() => {
          var agreeData = {organId:that.Organumform.organId};
          that.$http.post(that.agreeAuthApi,JSON.stringify(agreeData),{headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }}
          ).then(
            function (res) {
              if(res.body.notification.notifCode == '0'){
                that.$message({
                  type: 'success',
                  message: '该组织已经通过认证 ',
                  duration: 1500,
                  onClose : (instance) => {
                    that.todic();
                  }
                });
              }else{
                that.$message({type:'error',message:'认证失败，请稍后重试~'});
              }                
            },function (res) {
              that.$message({type:'error',message:'认证失败，请稍后重试~'});
          });

          
        }).catch(() => {
          // that.$message({type:'error',message:'认证失败，请稍后重试~'});
        });
      },
      getPic : function(str){
        if(str.indexOf('http:')>-1){
          return this.nginxRoot + str;
        }else{
          return str;
        }
      },
      changeReason : function(value){
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
      },
      rejectAuth : function(){//驳回
        var that = this;
        var authData = {
          organId:that.Organumform.organId,
          content:that.reason_self,
          rejectReason:that.checkedReason.length > 0 ? that.checkedReason.join(','):''
        };
        // console.log(authData);
        // return;
        // that.$confirm('此操作将驳回当前组织认证信息，是否继续？','提示',{
        //   type : 'warning'
        // }).then(() => {
          
          that.dialogVisible = false;
          that.$http.post(that.rejectAuthApi,JSON.stringify(authData),{headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }}
          ).then(
            function (res) {
              if(res.body.notification.notifCode == '0'){
                that.$message({
                  type: 'success',
                  message: '已经驳回该组织的认证信息',
                  duration: 1500,
                  onClose : (instance) => {
                    that.todic();
                  }
                });
              }else{
                that.$message({type:'error',message:'驳回认证失败，请稍后重试~'});
              } 
            },function (res) {
            that.$message({type: 'error',message: '驳回认证失败，请稍后重试~'});
          });

          
        // }).catch(() => {
        //   that.$message({type: 'error',message: '驳回认证失败，请稍后重试~'});       
        // });
      },
      /*动态*/
      getListMyD:function () {
        var that =  this;
        that.getListMyDynamicNews_date.userId = that.$route.params.id;
        that.$http.post(that.getListMyDynamicNewsapi,JSON.stringify(that.getListMyDynamicNews_date),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
              if(res.data.responseData.page.result == 0){
                  that.getListMyDynamicNewsshow = false;
              }else {
                that.getListMyDynamicNews = res.data.responseData.page.result;
                that.getListMyDynamicNews_userstotal = res.data.responseData.page.total;
              }
          }
        ),function (res) {
          console.log(res)
        }
      },
      handleClose : function(){

      },
      /*动态 page*/
      getListMyDynamicNews_handleCurrentChange(val){
          var that = this;
          that.getListMyDynamicNews_date.index = val -1;
          that.getListMyD();
      },
      /*视频*/
      aboutMovie:function () {},
      /*问答*/
      aboutAsk:function () {},
      /*关注用户*/
      aboutUser:function () {
        var that = this;
        that.Concern_usersdate.organId = that.$route.params.id;
        that.$http.post(that.Concern_usersapi,JSON.stringify(that.Concern_usersdate),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
              if(res.data.responseData.list == 0){
                  that.Concern_usersshow = false;
              }else{
                that.Concern_users = res.data.responseData.list;
                that.Concern_userstotal = res.data.responseData.allCount;
              }
          }
        ),function (res) {
          console.log(res)
        }
      },
      // 关注用户 pages
      Concern_users_handleCurrentChange(val) {
        var that =  this;
        that.Concern_usersdate.index = val -1;
        that.aboutUser();
      },
    }
  }
</script>
<style lang="less" scoped>
  .action_header{ background:#fff; border:1px solid #e1e1e5; padding:20px;}
  .el-checkbox{margin-bottom:15px; display:block;}
  .el-checkbox+.el-checkbox{ margin-left:0; }
  .organum_body{
    .title{
      display: block;
      border-bottom: 1px solid #e1e1e5;
      line-height: 30px;
      margin-bottom: 10px;
      padding:10px 10px 5px; font-size:14px;
    }
    .contaion{
      border: 1px solid #e1e1e5;
      padding: 15px;
      margin-top: 20px;
    }
    .active_{
      display: block;
      width: 100%;
      dl{
        float: left;
        width: 100%;
        overflow-x: hidden;
        margin-top: 20px;
      }
      dt{
        float: left;
        img{
          width: 80px;
          border-radius: 100%;
        }
      }
      dd{
        float: left;
        width: 90%;
        margin-left: 2%;
        p{
          margin-bottom: 10px;
          span{
            padding-right: 30px;
          }
        }
      }

    }

  }
  .organBg{}
  .organum_block{ margin:0px auto 10px; padding:0 5px;  background:#fff;
    .el-form-item{max-width:960px; margin:20px auto;}
  }

  .back{
    .el-button{ margin-left:10px;}
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 50px auto;
  }
  .avatar{ width:320px; height:200px;}
  .reasonList{

  }
</style>
