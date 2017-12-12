<template>
  <div class="editecology">
    <section class="section">
      <div class="loation"><router-link to="/ecology">内容管理</router-link>>><router-link to="/ecology">生态推荐</router-link>>>编辑热词</div>
      <!--editecology_body begin -->
      <div class="editecology_body">
        <el-row>
          <el-col :span="24">
            <el-form ref="form" label-width="80px" :model="form">
              <div class="ecol-header">
                <el-form-item label="位置" style="display: inline-block">
                  <el-input v-model="pId" style="width: 100px" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="生态热词" style="display: inline-block">
                  <el-input v-model="form.name" style="width: 350px"></el-input>
                </el-form-item>
                <v-Stab
                  filename="添加人脉"
                  api="/cross/asso/pub/getRelatedResources/person/1/"
                  :success="peopledate"
                >
                </v-Stab>
                <v-organization
                  filename="添加组织"
                  :success="organizationdate"
                ></v-organization>
                <v-Orginat
                  filename="添加客户"
                  api="/cross/asso/pub/getRelatedResources/organ/1/"
                  :success="conudedate">
                </v-Orginat>
                <v-knowledgeList
                  filename="添加知识"
                  api="/cross/asso/pub/getRelatedResources/knowledge/1/"
                  :success="knowledgedate">
                </v-knowledgeList>

                <v-demandList
                  filename="添加需求"
                  api="/cross/asso/pub/getRelatedResources/demand/1/"
                  :success="demandList">
                </v-demandList>
              </div>
              <div class="ecol-body">
                <!--people_ecl list-->
                <div class="people_ecl">
                  <div class="people_ecl_title "><span></span>人脉（<i>{{ form.peopleList.length }}</i>）
                    <el-button type="danger" @click="del2" size="small">删除</el-button>
                  </div>
                  <el-table
                    :data="form.peopleList"
                    stripe
                    border
                    @selection-change="selectAll2"
                    style="width: 100%">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="sourceName"
                      label="名称">
                    </el-table-column>
                    <el-table-column
                      label="职能"
                      prop="function"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="area"
                      label="地区">
                    </el-table-column>
                    <el-table-column
                      prop="company"
                      label="公司">
                    </el-table-column>
                    <el-table-column
                      prop="position"
                      label="职位">
                    </el-table-column>
                    <el-table-column
                      label="类型">
                      <template scope="scope">
                        {{scope.row.virtual == "1" ? "用户" : "人脉"}}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!--people_ecl list -->
                <div class="people_ecl">
                  <div class="people_ecl_title"><span></span>组织（<i>{{form.organList.length}}</i>）
                    <el-button type="danger" @click="del31" size="small">删除</el-button>
                  </div>
                  <el-table
                    :data="form.organList"
                    stripe
                    border
                    @selection-change="selectAll31"
                    style="width: 100%">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="sourceName"
                      label="组织名称"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="area"
                      label="地区"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="industry"
                      label="行业">
                    </el-table-column>
                    <el-table-column
                      label="组织类型">
                      <template scope="scope">
                        {{scope.row.virtual == "1" ? "用户" : "人脉"}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="followCount"
                      sortable
                      label="关注人数">
                    </el-table-column>
                  </el-table>
                </div>
                <!--people_ecl list -->
                <div class="people_ecl">
                  <div class="people_ecl_title"><span></span>客户（<i>{{form.customerList.length}}</i>）
                    <el-button type="danger" @click="del3" size="small">删除</el-button>
                  </div>
                  <el-table
                    :data="form.customerList"
                    border
                    tooltip-effect="dark"
                    @selection-change="selectAll3"
                    style="width: 100%"
                  >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="sourceName"
                      label="客户名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="industry"
                      label="行业"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="area"
                      label="地区">
                    </el-table-column>
                    <el-table-column
                      prop="browseCount"
                      sortable
                      width="100"
                      label="浏览数">
                    </el-table-column>
                    <el-table-column
                      prop="UpvoteCount"
                      sortable
                      width="100"
                      label="点赞数">
                    </el-table-column>
                    <el-table-column
                      prop="commentCount"
                      sortable
                      width="100"
                      label="评论数">
                    </el-table-column>
                  </el-table>
                </div>
                <!--people_ecl list -->
                <div class="people_ecl">
                  <div class="people_ecl_title"><span></span>知识（<i>{{form.knowledgeList.length}}</i>）
                     <el-button type="danger" @click="del4" size="small">删除</el-button>
                  </div>
                  <el-table
                    :data="form.knowledgeList"
                    border
                    tooltip-effect="dark"
                    @selection-change="selectAll4"
                    style="width: 100%"
                  >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="sourceName"
                      label="知识标题"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="companyAddress"
                      label="栏目"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="sourceOwnerName"
                      width="80"
                      label="发布人">
                    </el-table-column>
                    <el-table-column
                      sortable
                      label="发布时间">
                      <template scope="scope">
                        {{ Number(scope.row.sourceCtime) | format}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="browseCount"
                      width="100"
                      sortable
                      label="浏览量">
                    </el-table-column>
                  </el-table>
                </div>
                <!--people_ecl list -->
                <div class="people_ecl">
                  <div class="people_ecl_title"><span></span>需求（<i>{{form.demandList.length}}</i>）
                     <el-button type="danger" @click="del" size="small">删除</el-button>
                  </div>
                  <el-table
                    :data="form.demandList"
                    border
                    tooltip-effect="dark"
                    @selection-change="selectAll"
                    style="width: 100%"
                  >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                      prop="sourceName"
                      label="需求标题"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="sourceOwnerId"
                      label="发布人"
                      width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="area"
                      label="地   区">
                    </el-table-column>
                    <el-table-column
                      width="180"
                      label="需求分类">
                      <template scope="scope">
                        {{scope.row.dataType | demandType}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="发布时间"
                      sortable>
                      <template scope="scope">
                        {{ Number(scope.row.sourceCtime) | format}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="browseCount"
                      label="阅读数"
                      width="100"
                      sortable>
                    </el-table-column>
                    <el-table-column
                      prop="commentCount"
                      label="评论数"
                      width="100"
                      sortable>
                    </el-table-column>
                  </el-table>

                </div>
              </div>
              <div class="col_button">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button><router-link to="/ecology">取消</router-link></el-button>
              </div>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <!--editecology_body end -->
    </section>
  </div>
</template>

<script>

  // 四大组建
  import Stab from '../../components/People.vue'

  import Orginat from '../../components/orginat.vue'

  import knowledgeList from '../../components/knowledgeList.vue'

  import demandList from '../../components/demandList.vue'

  import organization from '../../components/Organization.vue'

  export default {
    name:'editecology',
    components:{
      'v-Stab':Stab,
      'v-Orginat':Orginat,
      'v-knowledgeList':knowledgeList,
      'v-demandList':demandList,
      'v-organization':organization
    },
    data:function () {
      return {
        getapi: '/cross/organ/newWords/listNewWordsRelation.json', // 获取
        serverapi: '/cross/organ/newWords/updateNewWords.json', // 发送
        sessionid:localStorage.getItem('sessionID'),
        pId:null,
        form:{
          name:'',
          peopleList:[], //人脉
          customerList:[], //客户
          organList:[], //组织
          knowledgeList:[], //知识
          demandList:[], //需求
        },
        addpeople:{
          type:[],
        },
        selectArr: [],
        selectArr2: [],
        selectArr3: [],
        selectArr31:[],
        selectArr4: [],
        newlist:{},
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        var that =  this;
        that.$http.post(that.getapi,JSON.stringify({
            'id': that.$route.params.id
          }),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}
        ).then(
          function (res) {
            that.form = res.data.responseData.newWordsResultVOList;
            that.pId = res.data.responseData.newWordsResultVOList.pId == 1 ? "客户模块" : "需求模块";
          },function (res) {
            console.log(res)
          }
        )
      })
    },
    filters: {
      /*demandSource*/
      demandType:function (str) {
        if(str == 257 || str == 258){
          return '需求-金融-投资'
        }
        if(str == 355 || str == 356){
          return '需求-教育-找老师'
        }
        if(str == 377 || str == 378){
          return '需求-医疗-找医生'
        }
        if(str == 419 || str == 420){
          return '需求-人力资源-HR招聘'
        }
        if(str == 421){
          return '需求-产品开发-项目'
        }
        if(str == 422){
          return '需求-产品开发-外包'
        }
        if(str == 423 || str == 424){
          return '需求-法律-找律师'
        }
        if(str == 451 || str == 452){
          return '服务-金融-找融资'
        }
        if(str == 549 || str == 550){
          return '服务-教育-教育咨询'
        }
        if(str == 571 || str == 572){
          return '服务-医疗-找医生'
        }
        if( str == 614){
          return '服务-人力资源-HR培训'
        }
        if( str == 613){
          return '服务-人力资源-猎头招聘'
        }
        if( str == 615){
          return '服务-产品开发-找项目'
        }
        if( str == 616){
          return '服务-产品开发-找外包'
        }
        if( str == 617){
          return '服务-法律-找律师'
        }
        if( str == 618){
          return '服务-法律-法律咨询'
        }
        if( str == 1053){
          return '需求-其它类型'
        }
        if( str == 1054){
          return '需求-大数据-找数据开发'
        }
        if( str == 1055){
          return '需求-大数据-数据服务'
        }
      },
    },
    methods:{
      // 人脉
      selectAll2(date) {
        var vm = this;
        date.forEach(function(item, i) {
          vm.selectArr2.push(item.sourceId);
        });
      },
      del2() {
        let arr = [];
        var elements = this.form.peopleList;
        for (var i = 0; i < elements.length; i++) {
          if (this.selectArr2.indexOf(elements[i].sourceId)>=0) {
          }else{
            arr.push(this.form.peopleList[i])
          }
        }

        this.form.peopleList = arr;
        this.selectArr2 = [];
      },
      // 组织
      selectAll31(date) {
        var _this = this;
        date.forEach(function(item, i) {
          _this.selectArr31.push(item.sourceId);
        });
      },
      del31() {
        let arr = [];
        var elements = this.form.organList;
        for (var i = 0; i < elements.length; i++) {
          if (this.selectArr31.indexOf(elements[i].sourceId)>=0) {
          }else{
            arr.push(this.form.organList[i])
          }
        }
        this.form.organList = arr;
        this.selectArr31 = [];
      },
      // 客户
      selectAll3(date) {
        var _this = this;
        date.forEach(function(item, i) {
          _this.selectArr3.push(item.sourceId);
        });
      },
      del3() {
        let arr = [];
        var elements = this.form.customerList;
        for (var i = 0; i < elements.length; i++) {
          if (this.selectArr3.indexOf(elements[i].sourceId)>=0) {
          }else{
            arr.push(this.form.customerList[i])
          }
        }
        this.form.customerList = arr;
        this.selectArr3 = [];
      },
      // 知识
      selectAll4(date) {
        var _this = this;
        date.forEach(function(item, i) {
          _this.selectArr4.push(item.sourceId);
        });
      },
      del4() {
        let arr = [];
        var elements = this.form.knowledgeList;
        for (var i = 0; i < elements.length; i++) {
          if (this.selectArr4.indexOf(elements[i].sourceId)>=0) {
          }else{
            arr.push(this.form.knowledgeList[i])
          }
        }
        this.form.knowledgeList = arr;
        this.selectArr4 = [];
      },
      // 需求
      selectAll(date) {
        var _this = this;
        date.forEach(function(item, i) {
          _this.selectArr.push(item.sourceId);
        });
      },
      del() {
        let arr = [];
        var elements = this.form.demandList;
        for (var i = 0; i < elements.length; i++) {
          if (this.selectArr.indexOf(elements[i].sourceId)>=0) {
          }else{
            arr.push(this.form.demandList[i])
          }
        }
        this.form.demandList = arr;
        this.selectArr = [];
      },
      // 添加人脉
      peopledate(data){
        var datei = this.form.peopleList;
        data.forEach(function (val) {
          var nulobj = {};
          nulobj.content ='';
          nulobj.dataType =0;
          nulobj.parentId = 0;
          nulobj.sourceCtime = '';
          nulobj.sourceId = Number(val.id);
          nulobj.sourceOwnerId = 0;
          nulobj.sourceOwnerName = '';
          nulobj.sourcePath = val.picPath;
          nulobj.sourceType = 1;

          nulobj.sourceName = val.name;
          nulobj.function = val.firstIndustry + val.secondIndustry;
          nulobj.area = val.area;
          nulobj.company = val.company;
          nulobj.position = val.position;
          nulobj.type = Number(val.virtual);
          datei.push(nulobj)
        })
        var hash = {};
        this.form.peopleList = this.form.peopleList.reduce(function(item, next) {
          hash[next.sourceId] ? '' : hash[next.sourceId] = true && item.push(next);
          return item
        }, []);
      },
      //添加组织
      organizationdate(data){
        var datei = this.form.organList;
        data.forEach(function (val) {
          var nulobj = {};
          /*new date*/
          nulobj.sourceName = val.name;
          nulobj.area = val.area;
          nulobj.industry = val.industry;
          nulobj.orgType = Number(val.orgType);
          nulobj.followCount = Number(val.followCount);
          nulobj.industryPosition = val.industry;

          nulobj.sourcePath = val.picPath;
          nulobj.sourceId = Number(val.id);
          nulobj.sourceType = 5;
          nulobj.type = 3;
          nulobj.dataType = 0;
          nulobj.sourceOwnerId = 0;
          nulobj.ctime = '';
          nulobj.sourceOwnerName = '';
          nulobj.sourceCtime = '';

          datei.push(nulobj)
        })
        var hash = {};
        this.form.organList = this.form.organList.reduce(function(item, next) {
          hash[next.sourceId] ? '' : hash[next.sourceId] = true && item.push(next);
          return item
        }, [])

      },
      //添加客户
      conudedate(data){
        var datei = this.form.customerList;
        data.forEach(function (val) {
          var nulobj = {};

          nulobj.sourceName = val.name;
          nulobj.industry = val.industry;
          nulobj.industryPosition = val.industry;
          nulobj.area = val.area;
          nulobj.browseCount = Number(val.browseCount);
          nulobj.UpvoteCount = Number(val.upvoteCount);
          nulobj.commentCount = Number(val.commentCount);


          nulobj.content='';
          nulobj.ctime = '';
          nulobj.dataType = 0;
          nulobj.parentId = 0;
          nulobj.sourceCtime ='';
          nulobj.sourceId =val.id;
          nulobj.sourceOwnerId = 0;
          nulobj.sourceOwnerName ='';
          nulobj.sourcePath = val.picPath;
          nulobj.sourceType = 2;
          nulobj.type = 4;
          nulobj.companyAddress = val.address;

          datei.push(nulobj)
        })
        var hash = {};
        this.form.customerList = this.form.customerList.reduce(function(item, next) {
          hash[next.sourceId] ? '' : hash[next.sourceId] = true && item.push(next);
          return item
        }, [])
      },
      //添加知识
      knowledgedate(data){

        var datei = this.form.knowledgeList;

        data.forEach(function (val) {
          var nulobj = {};

          nulobj.sourceName = val.title;
          nulobj.dataType = Number(val.type);
          nulobj.sourceOwnerName = val.createUserName;
          nulobj.sourceCtime = val.createDate;
          nulobj.browseCount = Number(val.readCount);

          nulobj.content = val.contentDesc;
          nulobj.ctime = '';
          nulobj.parentId = 0;
          nulobj.sourceId = Number(val.id);
          nulobj.sourceOwnerId = Number(val.createUserId);
          nulobj.sourcePath = val.coverPic;
          nulobj.sourceType = 3;
          nulobj.type = 6;
          nulobj.companyAddress = val.typeName;
          nulobj.industryPosition = '';




          datei.push(nulobj)
        })
        var hash = {};
        this.form.knowledgeList = this.form.knowledgeList.reduce(function(item, next) {
          hash[next.sourceId] ? '' : hash[next.sourceId] = true && item.push(next);
          return item
        }, [])

      },
      //添加需求
      demandList(data){
        var datei = this.form.demandList;
        data.forEach(function (val) {
          var nulobj = {};

          nulobj.sourceName = val.demandTitle;
          nulobj.sourceOwnerName = '';
          nulobj.area = val.area;
          nulobj.dataType = Number(val.demandType);
          nulobj.sourceCtime = val.createTime;
          nulobj.browseCount = Number(val.readCount);
          nulobj.commentCount = Number(val.evaluatecount);


          nulobj.content = '';
          nulobj.ctime = '';


          nulobj.parentId = 0;
          nulobj.sourceId = Number(val.demandId);

          nulobj.sourceOwnerId = Number(val.userId);
          nulobj.sourceOwnerName = '';
          nulobj.sourcePath = '';
          nulobj.sourceType = 4;
          nulobj.type = 7;
          nulobj.companyAddress = '';
          nulobj.industryPosition = '';
          datei.push(nulobj)
        })
        var hash = {};
        this.form.demandList = this.form.demandList.reduce(function(item, next) {
          hash[next.sourceId] ? '' : hash[next.sourceId] = true && item.push(next);
          return item
        }, [])
      },
      //保存数据
      onSave(){
        var that =  this;

         /*  peopleList:[], //人脉
          customerList:[], //客户
          organList:[], //组织
          knowledgeList:[], //知识
          demandList:[], //需求*/

        let AA = that.form.peopleList.concat(that.form.customerList);
        let BB = that.form.organList.concat(that.form.knowledgeList);
        let CC = that.form.demandList.concat(AA);
        let relations = CC.concat(BB);

        var savepath = {
          id : that.form.id,
          name : that.form.name,
          status : that.form.status,
          userId : that.form.userId,
          userName : that.form.userName,
          userType : 0,
          pId:that.form.pId,
          relation: relations
        };
        that.$http.post(that.serverapi,JSON.stringify(savepath),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}
        ).then(
          function (res) {
            if (res.data.responseData.success == true){
                 this.$message('热词编辑成功');
                this.$router.push({path: '/ecology'})
            }else{
              this.$notify({
                title: '保存失败',
                message: '保存客户失败',
                duration: 500
              });
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
  
  .addecology{
    margin-bottom: 50px;
  }
  .serch{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 20px 0;
  }
  .table-body{
    background: white;
    margin-top: 10px;
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 50px auto;
  }
  .editecology_body{
    display: block;
  }
  .ecol-header,.ecol-body{
    display: block;
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px;
    margin-bottom: 10px;
  }
  .people_ecl{
    display: block;
    border-bottom: 1px solid #e5e4ee;
  }
  .people_ecl_title{
    display: block;
    line-height: 60px;
    font-size: 18px;
    color: #333;
    span{
      float: left;
      width: 3px;
      height: 17px;
      background: #f85f48;
      margin-top: 21px;
      margin-right: 15px;

    }
    i{
      font-style: normal;
    }
    button{
      margin-left: 15px;
    }
  }
  .people_ecl_list{
    display: block;
    margin-bottom: 15px;
    dl{
      display: inline-block;
      margin-right: 30px;

      dt{
        img{
          width: 72px;
          height: 72px;
          border-radius: 100%;
        }
      }
      dd{
        line-height: 44px;
        text-align: center;
        font-size: 16px;
        label{
          margin-right: 5px;
        }
      }

    }
    ul{
      display: block;
      margin-bottom: 15px;
      li{
        display: block;
        line-height: 34px;
        font-size: 16px;
        label{
          margin-right: 10px;
        }
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
    z-index: 10;
    line-height: 50px;
  }
  .boxcontaion{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color:rgba(0,0,0,0.3);
  }
  .box_c_boxy{
    width: 650px;
    height: 700px;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -350px;
    margin-left: -325px;
    border-radius: 10px;
    background: white;
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
    height: 55px;
    padding: 25px 20px 0;
    display: block;
  }
  .box_c_boxy_b{
    display: block;
    width: 94%;
    clear: both;
    margin: 15px auto;

    .box_c_boxy_b_l_list{
      float: left;
      width: 285px;
      height: 440px;
      border: 1px solid #e5e4ee;
      overflow: hidden;
      overflow-y: scroll;
      dl{
        display: block;
        border-bottom: 1px solid #f1f1f2;
        float: left;
        width: 100%;
        padding: 18px 0;
        cursor: pointer;
        position: relative;
        bdo{
          position: absolute;
          right: 16px;
          top: 34px;
          color: #448aff;
          font-size: 14px;
        }
        dt{
          float: left;
          margin: 0 15px;
          img{
            width: 50px;
            height:50px;
            border-radius: 100%;
          }
        }
        dd{
          float: left;
          line-height: 50px;
          i{
            float: left;
            padding: 0px 9px;
            line-height: 22px;
            font-style: normal;
            font-size: 14px;
            color:  #04ba89;
            border: 1px solid #04ba89;
            margin-top: 13px;
            margin-right: 10px;
          }

        }
      }

    }
    .box_c_boxy_b_r_l{
      float: left;
      width: 285px;
      height: 390px;
      border: 1px solid #e5e4ee;
      overflow: hidden;
      overflow-y: scroll;
      margin-left: 20px;
      position: relative;
      padding-top: 50px;
      p{
        display: block;
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        background-color: white;
        z-index: 10;
        line-height: 50px;
        font-size: 14px;
        padding: 0 10px;
        color: #5d5c5c;
        span{
          float: right;
          cursor: pointer;
          margin-right: 18px;
        }
      }
      dl{
        display: block;
        border-bottom: 1px solid #f1f1f2;
        float: left;
        width: 100%;
        padding: 18px 0;
        cursor: pointer;
        position: relative;
        bdo{
          position: absolute;
          right: 16px;
          top: 34px;
          color: #f86049;
          font-size: 14px;
        }
        dt{
          float: left;
          margin: 0 15px;
          img{
            width: 50px;
            height:50px;
            border-radius: 100%;
          }
        }
        dd{
          float: left;
          line-height: 50px;
          a{
            float: left;
            padding: 0px 9px;
            line-height: 22px;
            font-style: normal;
            font-size: 14px;
            color:  #04ba89;
            border: 1px solid #04ba89;
            margin-top: 13px;
            margin-right: 10px;
          }

        }
      }

    }
  }
  .box_c_boxy_b_btn{
    display: block;
    text-align: center;
    button{
      margin-top: 30px;
    }
  }

  input[type=checkbox]{
    width: 16px;
    height:16px;
    border-color: #bfcbd9;
    margin-right: 5px;
  }

</style>

