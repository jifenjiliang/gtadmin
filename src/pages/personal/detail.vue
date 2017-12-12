<template>
  <div class="topic">
    <section class="section">
      <div class="loation">
        <router-link to="/customer">用户管理</router-link> >>><router-link to="/personal">个人用户管理</router-link> >>查看
      </div>
      <!-- topic body -->
      <div class="topicbody">
        <fieldset>
            <legend>基础信息</legend>
          <el-row>
            <el-col :span="4" style="text-align: center">
              <img :src="picLogo" alt="" style="border-radius: 100%">
            </el-col>
            <el-col :span="20">
              <el-form  :model="Basicinformation" class="demo-form-inline" label-width="80px">
                <el-col :span="5">
                  <el-form-item label="姓名:">
                    <span>{{Basicinformation.pinyin}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="性别:">
                    <span>{{Basicinformation.gender | Gender}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="职能:">
                    <span>{{Basicinformation.firstIndustryDirection}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="公司:">
                    <span>{{Basicinformation.company}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="职位:">
                    <span>No date</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="地区:">
                    <span>{{Basicinformation.locationCity}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="注册时间:">
                    <span>No date</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="注册时长:">
                    <span>No date</span>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="个人描述:">
                    <span>{{Basicinformation.remark}}</span>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-show="me_show">
          <legend>个人信息</legend>
          <el-row>
            <el-col :span="24">
              <el-form class="demo-form-inline" label-width="80px">
                <el-col :span="6" v-for="item in Personalinformation" :key="item.id">
                  <el-form-item :label="item.name">
                    <span>{{item.content}}</span>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-show="Persona">
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
        <fieldset v-if="work">
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
        <fieldset v-if="Edu">
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
        <fieldset v-if="showIndust">
          <legend>行业偏好</legend>
          <el-row>
            <el-col :span="24">
              <el-form :inline="true" class="demo-form-inline" label-width="70px">
                <span class="tags_" v-for="item in Industrypreference">{{item.userComment}}{{item.count}}</span>
              </el-form>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-if="showevaluate">
          <legend>评价（标签）</legend>
          <el-row>
            <el-col :span="24">
              <el-form  class="demo-form-inline" label-width="70px">
                <span class="tags_" v-for="item in evaluate">{{item.userComment}}{{item.count}}</span>
              </el-form>
            </el-col>
          </el-row>
        </fieldset>
      </div>
    </section>
    <div class="back">
      <router-link to="/personal">
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
        me_show:true,
        Persona:true,
        work:true,
        Edu:true,
        showIndust:true,
        showevaluate:true,


        api: '/cross/person/getPeopleDetail.json',
        evaluateapi:'/cross/person/findEvaluate.json', // 评价（标签）
        picLogo:'',
        Basicinformation:{},
        Personalinformation:{},
        Personalcircumstances:{
          familyMembers:[],
        },
        workexperience:[],
        Educationalexperience:[],
        Industrypreference:{},
        evaluate:[],
        Associatedresources:{},
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
          that.todic();
          that.Levaluate();
      })
    },
    methods:{
        /*评价*/
      todic:function () {
        var that =  this;
        var formcustomerId ={
          'userId': that.$route.params.id,
        };
        that.$http.post(that.evaluateapi,JSON.stringify(formcustomerId),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
              that.evaluate = res.data.responseData.listUserComment;
              if(that.evaluate == null){
                 that.showevaluate = false;
              }
          },function (res) {
            console.log(res)
          }
        )
      },

      Levaluate:function () {
        var that =  this;
        var formcustomerId ={
          'id': that.$route.params.id,
          'personType':1
        };
        that.$http.post(that.api,JSON.stringify(formcustomerId),{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}
        ).then(
          function (res) {
            that.picLogo = res.data.responseData.people.portrait;
            /*基础信息*/
            that.Basicinformation = res.data.responseData.people;
            /*个人信息*/
            that.Personalinformation =  res.data.responseData.people.contactInformationList;
            if(res.data.responseData.people.contactInformationList.length == 0){
                that.me_show =false;
            }
            /*个人情况*/
            that.Personalcircumstances = res.data.responseData.people.personalInformationList;
            if(res.data.responseData.people.personalInformationList.length == 0){
                that.Persona = false
            }
            /*工作经历*/
            that.workexperience = res.data.responseData.people.workExperienceList;
            if(that.workexperience.length == 0){
                that.work = false;
            }
            /*教育经历*/
            that.Educationalexperience = res.data.responseData.people.educationList;
            if(that.Educationalexperience.length == 0){
                that.Edu = false;
            }
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
    .tags_{
      display: inline-block;
      font-size: 14px;
      background-color: rgba(32,160,255,.1);
      border-color: rgba(32,160,255,.2);
      color: #20a0ff;
      padding: 4px 5px;
    }
  }
</style>
