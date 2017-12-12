<template>
  <div class="topic">
    <section class="section">
      <div class="loation">
        <router-link to="/customer">用户管理</router-link> >>><router-link to="/connection">人脉管理</router-link> >>查看
      </div>
      <!-- topic body -->
      <div class="topicbody">
        <fieldset>
          <legend>基础信息</legend>
          <el-row>
            <el-form class="demo-form-inline" label-width="80px">
              <el-col :span="6">
                <el-form-item label="姓名">
                 <span>{{Basicinformation.pinyin}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别">
                  <span>{{Basicinformation.gender | Gender}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职能">
                  <span>{{Basicinformation.position}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="公司">
                  <span>{{Basicinformation.company}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="职位">
                  <span>{{Basicinformation.firstIndustryDirection}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="地区">
                  <span>{{Basicinformation.address}}</span>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </fieldset>
        <fieldset v-show="remark">
          <legend>个人描述</legend>
          <el-row>
            <el-col :span="24">
              {{Basicinformation.remark}}
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-show="peoint">
          <legend>个人信息</legend>
          <el-row>
            <el-col :span="24">
              <el-form   class="demo-form-inline" label-width="80px">
                <el-col :span="6" v-for="item in Personalinformation" :key="item.id">
                  <el-form-item :label="item.name">
                    <span>{{item.content}}</span>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-show="good">
          <legend>个人情况</legend>
          <el-row>
            <el-col :span="24">
              <el-form  class="demo-form-inline" label-width="80px">
                <el-col :span="6"> <el-form-item label="出生日期">
                  <span>{{Personalcircumstances.birthday}}</span>
                </el-form-item></el-col>
                <el-col :span="6">
                  <el-form-item label="籍贯">
                    <span>{{Personalcircumstances.birthPlaceAddress}}</span>
                  </el-form-item></el-col>
                <el-col :span="6">  <el-form-item label="血型">
                  <span>{{Personalcircumstances.bloodType}}</span>
                </el-form-item></el-col>
                <el-col :span="6"> <el-form-item label="宗教信仰">
                  <span>{{Personalcircumstances.religiousBelief}}</span>
                </el-form-item></el-col>
                <el-col :span="6">  <el-form-item label="感情状况">
                  <span>{{Personalcircumstances.emotionalState}}</span>
                </el-form-item></el-col>
                <el-col :span="6">
                  <el-form-item label="家庭成员">
                    <span v-for="item in Personalcircumstances.familyMembers">
                      <span>{{item.name}}{{item.relation}}</span>
                    </span>
                  </el-form-item></el-col>
                <el-col :span="6"> <el-form-item label="擅长技能">
                  <span>{{Personalcircumstances.goodAt}}</span>
                </el-form-item></el-col>
                <el-col :span="6"> <el-form-item label="兴趣爱好">
                  <span>{{Personalcircumstances.hobby}}</span>
                </el-form-item></el-col>
              </el-form>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-show="worespa">
          <legend>工作经历</legend>
          <el-row>
            <el-col :span="24">
              <el-table
                :data="workexperience"
                border
                style="width: 100%">
                <el-table-column
                  prop="company"
                  label="公司名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="position"
                  label="职位名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="stime"
                  width="180"
                  label="开始时间">
                </el-table-column>
                <el-table-column
                  prop="etime"
                  width="180"
                  label="结束时间">
                </el-table-column>
                <el-table-column
                  prop="certifier"
                  width="180"
                  label="学历">
                </el-table-column>
                <el-table-column
                  prop="desc"
                  label="经历描述">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-show="Educa">
          <legend>教育经历</legend>
          <el-row>
            <el-col :span="24">
              <el-table
                :data="Educationalexperience"
                border
                style="width: 100%">
                <el-table-column
                  prop="school"
                  label="学校名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="specialty"
                  label="专业名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="stime"
                  width="180"
                  label="开始时间">
                </el-table-column>
                <el-table-column
                  prop="etime"
                  width="180"
                  label="结束时间">
                </el-table-column>
                <el-table-column
                  prop="educationalBackgroundType"
                  width="180"
                  label="学历">
                </el-table-column>
                <el-table-column
                  prop="desc"
                  label="经历描述">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </fieldset>
        <!-- comment_body start -->
        <div v-show="displau">
          <p>评论 （{{commentData.length}}）</p>
          <div class="comment_body">
            <dl v-for="item in commentData">
              <dt>
                <img :src="item.userurl" alt="头像">
              </dt>
              <dd>
                <p>{{item.commentusername}}   <span>{{item.ctime}}</span></p>
                <p>{{item.commentcontent}}</p>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
    <div class="back">
      <router-link to="/connection">
        <el-button type="success">&nbsp;返回&nbsp;</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name:'topic',
    computed:{
    },
    data:function () {
      return {
        remark:true,
        peoint:true,
        good:true,
        worespa:true,
        Educa:true,
        displau:true,
        commentCount:0,
        commentData:{},
        api: '/cross/person/getPeopleDetail.json',
        conapi:'/cross/organ/comment/selectComment.json',
        Basicinformation:{}, // 基础信息
        Personalinformation:{}, // 联系方式
        Personalcircumstances:{ // 个人情况
          familyMembers:[],
        },
        workexperience:[], // 工作经历
        Educationalexperience:[], // 教育经历
        Catalog:[], // 目录
        Label:[], // 标签
        Relation:[], // 关联
      }
    },
    filters:{
      Gender:function (value) {
        if(Number(value) == 1){
          return '全部'
        }else if(Number(value)== 2){
          return '男'
        }else if(Number(value)==3){
          return '女'
        }else{
          return '未知'
        }
      },
    },
    mounted:function () {
      this.$nextTick(function () {
        var that = this;
        that.Levaluate();
        that.commentMap();

      })
    },
    methods:{
      Levaluate:function () {
        var that =  this;
        var formcustomerId ={
          'orgid': that.$route.params.id,
          'ordertype':2,
          'currentPage':1,
          'pageSize':100,
        };
        that.$http.post(that.conapi,JSON.stringify(formcustomerId),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
              that.commentData = res.data.responseData.commentMap;
              if(res.data.responseData.commentMap.length ==0 ){
                  that.displau = false;
              }
          },function (res) {
            console.log(res)
          }
        )
      },
      commentMap:function () {
        var that =  this;
        var formcustomerId ={
          'id': that.$route.params.id,
          'personType':2,
          'view':1
        };
        that.$http.post(that.api,JSON.stringify(formcustomerId),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
            /*基础信息*/
            that.Basicinformation = res.data.responseData.people;
            if(res.data.responseData.people.remark == ""){
               that.remark = false;
            }
            /*联系方式*/
            that.Personalinformation =  res.data.responseData.people.contactInformationList;
            if(res.data.responseData.people.contactInformationList.length == 0){
                that.peoint = false;
            }
            /*个人情况*/
            that.Personalcircumstances = res.data.responseData.people.personalInformationList;
            if(res.data.responseData.people.personalInformationList.length == 0){
                that.good = false;
            }
            /*工作经历*/
            that.workexperience = res.data.responseData.people.workExperienceList;
              if(res.data.responseData.people.workExperienceList.length == 0){
                  that.worespa = false;
              }
            /*教育经历*/
            that.Educationalexperience = res.data.responseData.people.educationList;
            if(res.data.responseData.people.educationList.length == 0){
                that.Educa = false;
            }
            /*目录*/

            /*标签*/

            /*关联*/


          },function (res) {
            console.log(res)
          }
        )



      },


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
  .topic{
    margin-bottom: 50px;
  }
  .back{
    width: 87.5%;
    height:50px;
    position: fixed;
    right:0;
    bottom: 0;
    z-index: 100;
    text-align: center;
    background-color: white;
    line-height: 50px;
  }
  fieldset {
    padding:10px;
    margin:10px;
    width:98%;
    color:#333;
    border:#ccc dashed 1px;
    legend{
      color: #ccc;
    }
  }
  .comment_body{
    padding: 20px 50px;
    font-size: 15px;
    background: #fff;
    dl{
      float: left;
      width: 100%;
      margin-bottom: 10px;
      border-bottom: 1px solid #e1e1e5;
      padding-bottom: 10px;
      dt{
        float: left;
        img{
          border-radius: 100%;
          width: 60px;
        }
      }
      dd{
        float: left;
        padding-left: 20px;
        padding-top: 10px;
        P{
          line-height: 20px;
        }
        p:first-child{
          margin-bottom: 10px;
        }
      }
    }



  }
</style>
