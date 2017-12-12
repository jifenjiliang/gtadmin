<template>
  <div class="topic">
    <section class="section">
      <div class="loation">
        <router-link to="/activity">内容管理</router-link> >>><router-link to="/activity">活动管理</router-link> >>查看
      </div>
      <!-- topic body -->
      <div class="topicbody">
        <el-row>
          <el-form v-if="form" :model="form" label-width="90px">
          <el-col :span="17">
            <el-col :span="12">
              <el-form-item label="活动名称">
                <el-input :disabled="true" v-model="form.meetingName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动时间">
                <el-input :disabled="true" v-model="form.meetingTime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="所属行业">
                <span class="mr10" v-for="item in form.listIndustry">{{item}}</span>
              </el-form-item>
            </el-col>
            <el-col v-if="form.province" :span="12">
              <el-form-item label="地区">
                <el-col :span="7">
                  <el-input :disabled="true" v-model="form.province"></el-input>
                </el-col>
                <el-col class="line" :span="1" style="text-align: center">-</el-col>
                <el-col :span="7">
                  <el-input :disabled="true" v-model="form.city"></el-input>
                </el-col>
                <el-col class="line" :span="1" style="text-align: center">-</el-col>
                <el-col :span="8">
                  <el-input :disabled="true" v-model="form.town"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col v-if="form.meetingAddress" :span="12">
              <el-form-item label="详细地址">
                <el-input :disabled="true" v-model="form.meetingAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="23">
            <el-form-item label="活动内容">
              <div class="conList">
                <div class="content_list_block" v-for="item in form.listMeetingDetail">
                  <p class="meetingTitle">{{item.meetingDetailTitle}}</p>
                  <p class="meetingDetail">{{item.meetingDetail}}</p>
                    <div class="send_pictures clearfix">
                      <ul>
                        <li v-for="pic in item.picList"><img :src="pic.picPath"></li>
                      </ul>
                    </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
          </el-form>
        </el-row>
        <el-row v-if="listMeetingMember.length">
          <el-form label-width="90px">
            <el-col :span="24">
              <div class="title">发起人</div>
              <div class="list">
                <ul>
                  <li v-for="item in createList"><img :src="item.memberPhoto" alt=""><p>{{item.memberName}}</p></li>
                </ul>
              </div>
            </el-col>
            <el-col v-if="memberList.length" :span="24">
              <div class="title">参会人：{{total}}人</div>
              <div class="list">
                <ul>
                  <li v-for="item in memberList"><img :src="item.memberPhoto" alt=""><p>{{item.memberName}}</p></li>
                </ul>
              </div>
            </el-col>
          </el-form>
        </el-row>
        <el-row v-if="concols">
          <el-form :model="form" label-width="90px">
            <el-col :span="24">
              <div class="title">关联</div>
              <div class="dlist">
                <el-form-item v-if="assoPeoList.length" label="人脉">
                  <span v-for="(itm,index) in assoPeoList">{{index+1}}.{{ itm.peopleName }}</span>
                </el-form-item>
                <el-form-item v-if="assoOrgList.length" label="组织">
                  <span v-for="(itm,index) in assoOrgList">{{ itm.organName }}</span>
                </el-form-item>
                <el-form-item v-if="assoKnoList.length" label="知识">
                  <p v-for="(itm,index) in assoKnoList">{{index+1}}、 {{ itm.dataName }}</p>
                </el-form-item>
                <el-form-item v-if="assoReqList.length" label="事件">
                  <p v-for="(itm,index) in assoReqList">{{index+1}}、 {{ itm.dataName }}</p>
                </el-form-item>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="back">
        <router-link to="/activity"> <el-button type="success">&nbsp;返回&nbsp;</el-button></router-link>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name:'topic',
    computed:{},
    data:function () {
      return {
        api : '/crossmeeting/meeting/getByIdAndMemberId.json',
        sessionid: localStorage.sessionID,
        form: '',
        concols:true,
        listMeetingMember: [], //所有人员集合
        createList: [],        //创建者集合
        memberList: [],        //参会人员集合
        assoPeoList: [],       //关联人脉集合
        assoOrgList: [],       //关联组织集合
        assoKnoList: [],       //关联知识集合
        assoReqList: [],       //关联事件集合
        total: 0
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        this.todic();
      })
    },
    methods:{
      todic:function () {
        var that =  this;
        console.log()
        that.$http.post(that.api,JSON.stringify({
          "id":that.$route.params.id,
          "memberId":JSON.parse(localStorage.getItem('currentUser')).id
        }),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.form = res.data.responseData.meeting;
            that.form.meetingTime = that.form.startTime + ' ~ ' + that.form.endTime;

            //参会人员
            //attendMeetStatus(参会状态): 0：未答复 1：接受邀请 2：拒绝邀请 4：报名 5：取消报名
            //attendMeetType(参会方式): 0：邀请 1：报名 
            //excuteMeetSign(处理会议报名)：0：未处理：1：同意报名，2：拒绝报名
            that.listMeetingMember = that.form.listMeetingMember;
            for (var i in that.listMeetingMember) {
              if(that.form.createId == that.listMeetingMember[i].memberId){
                that.createList.push(that.listMeetingMember[i])
              }else{
                if(that.listMeetingMember[i].attendMeetType == 0 && that.listMeetingMember[i].attendMeetStatus == 1){
                  that.memberList.push(that.listMeetingMember[i]);
                }
                if(that.listMeetingMember[i].attendMeetType == 1 && that.listMeetingMember[i].attendMeetStatus == 4 && that.listMeetingMember[i].excuteMeetSign == 1){
                  that.memberList.push(that.listMeetingMember[i]);
                }
              }
            }
            that.total = that.memberList.length;

            //图片-视频
            var picList = that.form.listMeetingPic;

            //内容模块
            var conList = that.form.listMeetingDetail;
            conList.forEach(function (con,i,input){ 
              var newPicList = [];
              picList.forEach(function (pic,j,input){
                if(con.sequence == pic.moduleId){
                  newPicList.push(pic);
                }
              })
              con.picList = newPicList;
              con.picCount = newPicList.length;
            })

            //关联
            that.assoPeoList = that.form.listMeetingPeople;
            that.assoOrgList = that.form.listMeetingOrgan;
            that.assoKnoList = that.form.listMeetingKnowledge;
            that.assoReqList = that.form.listMeetingRequirement;
            if(!that.assoPeoList.length && !that.assoOrgList.length && !that.assoKnoList.length && !that.assoReqList.length){that.concols = false;}

          },function (res) {
            console.log(res)
          }
        );
      },
    }
  }
</script>
<style lang="less" scoped>
  .mr10{margin-right: 10px;}
  .clearfix{zoom:1;display: block;}
  .clearfix:after{content:',';display:block;height:0;clear:both;visibility:hidden;}
  
  .topic{
    margin-bottom: 100px;
    font-size: 14px;
  }
  .topicbody .el-row{
    background: white;
    margin-bottom: 15px;
    padding: 15px 0px;
  }
  .back{
    width: 87.5%;
    height:50px;
    position: fixed;
    right:0;
    bottom: 0;
    z-index: 100;
    text-align: center;
  }
  .title{
    display: block;
    line-height:40px;
    padding: 0 10px;
    border-bottom: 1px solid #f2f3f7;
  }
  .conList{
    .content_list_block{
      background-color: #eef1f6;
      border-radius: 4px;
      padding: 0 10px 10px;
      margin: 10px 0;
    }
    .meetingTitle{
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      font-weight: bold;
    }
    .meetingDetail{
      line-height: 24px;
      font-size: 14px;
      overflow: hidden;
    }
    li{
      float: left;
      margin: 10px 10px 0 0;
      width: 185px;
      height: 114px;
      border-radius: 5px;
      background: #000;
      overflow: hidden;
      text-align: center;
      img{
        display: inline-block;
        max-width: 100%;
        height: auto;
        margin: auto;
        vertical-align: middle;
      }
    }
  }
  .list,.list ul{
    float: left;
    width: 100%;
    ul li{
      float: left;
      width: 100px;
      overflow: hidden;
      text-align: center;
      margin: 15px;
      img{
        display: block;
        width: 80px;
        height:80px;
        border-radius: 100%;
        margin: 0 auto;
      }
      p{line-height: 40px;}
    }
  }
  .dlist{
    span{
      display: inline-block;
      margin-right: 10px;
    }
  }
</style>