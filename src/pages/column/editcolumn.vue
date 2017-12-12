<template>
  <div class="addcolumn">
    <section class="section">
      <div class="loation"><router-link to="/column">内容管理</router-link>>><router-link to="/column">公用栏目管理</router-link>>>编辑栏目</div>
      <div class="editecology_body">
        <el-row>
          <el-col :span="24">
            <el-form ref="form" :model="form" label-width="80px">
              <div class="ecol-header">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="行业">
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="display: inline-block">
                        <el-checkbox v-for="city in cities" :key="city.id" :label="city">{{city}}</el-checkbox>
                      </el-checkbox-group>
                      <span style="color: red;">（请选择一个或多个行业）</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="位置" >
                          <el-input
                            placeholder="请输入内容"
                            v-model="formoptions"
                            :disabled="true">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="栏目名称">
                          <el-input v-model="form.name" :disabled="namename"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="5" v-if="timeshow">
                        <el-form-item label="推送时间">
                          <el-date-picker
                            type="datetime"
                            v-model="form.updateTime"
                            :picker-options="pickerOptions0"
                            placeholder="选择日期">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-col :span="16">
                      <el-form-item label="描述">
                        <el-input type="textarea" v-model="form.description" :disabled="namename"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23" :offset="1">
                    <v-Stab
                      filename="添加人脉"
                      api="/cross/asso/pub/getRelatedResources/person/1/"
                      :success="peopledate"
                      v-show="showbutton"
                    >
                    </v-Stab>

                    <v-organization
                      filename="添加组织"
                      :success="organizationdate"
                      v-show="showbutton"
                    ></v-organization>

                    <v-Orginat
                      filename="添加客户"
                      api="/cross/asso/pub/getRelatedResources/organ/1/"
                      :success="conudedate"
                    >
                    </v-Orginat>
                    <v-knowledgeList
                      filename="添加知识"
                      api="/cross/asso/pub/getRelatedResources/knowledge/1/"
                      :success="knowledgedate"
                      v-show="showbutton"
                    >
                    </v-knowledgeList>

                    <v-demandList
                      filename="添加需求"
                      api="/cross/asso/pub/getRelatedResources/demand/1/"
                      :success="demandList"
                      v-show="showbutton"
                    >
                    </v-demandList>
                  </el-col>
                </el-row>
              </div>
              <div class="ecol-body">
                <!--people_ecl list-->
                <div class="people_ecl" v-show="showbutton">
                  <div class="people_ecl_title "><span></span>人脉（<i>{{form.peopleList.length}}</i>）
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
                      prop="sourceTitle"
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
                      prop="career"
                      label="职位">
                    </el-table-column>
                    <el-table-column
                      label="类型">
                      <template scope="scope">
                        {{scope.row.typeId == "1" ? "用户" : "人脉"}}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!--people_ecl list -->
                <div class="people_ecl" v-show="showbutton">
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
                      prop="sourceTitle"
                      label="组织名称"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      label="地区"
                      prop="area"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="orgIndustry"
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
                      prop="sourceTitle"
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
                      prop="address"
                      label="地区">
                    </el-table-column>
                    <el-table-column
                      prop="readCount"
                      sortable
                      width="100"
                      label="浏览数">
                    </el-table-column>
                    <el-table-column
                      prop="approveCount"
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
                <div class="people_ecl" v-show="showbutton">
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
                      prop="sourceTitle"
                      label="知识标题"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="columnType"
                      label="栏目"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      width="80"
                      prop="ownerName"
                      label="发布人">
                    </el-table-column>
                    <el-table-column
                      sortable
                      label="发布时间">
                      <template scope="scope">
                        {{ Number(scope.row.sourceCreateTime) | format}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="100"
                      sortable
                      prop="readCount"
                      label="浏览量">
                    </el-table-column>
                  </el-table>
                </div>
                <!--people_ecl list -->
                <div class="people_ecl" v-show="showbutton">
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
                      prop="sourceTitle"
                      label="需求标题"
                    >
                    </el-table-column>
                    <el-table-column
                      label="发布人"
                      width="100"
                      prop="ownerName"
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
                        {{scope.row.demandType | demandType}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="发布时间"
                      sortable>
                      <template scope="scope">
                        {{ Number(scope.row.sourceCreateTime) | format}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="阅读数"
                      width="100"
                      prop="readCount"
                      sortable>
                    </el-table-column>
                    <el-table-column
                      label="评论数"
                      width="100"
                      prop="evaluateCount"
                      sortable>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="col_button">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button><router-link to="/column">取消</router-link></el-button>
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

  import Stab from '../../components/People.vue'

  import Orginat from '../../components/orginat.vue'

  import knowledgeList from '../../components/knowledgeList.vue'

  import demandList from '../../components/demandList.vue'

  import organization from '../../components/Organization.vue'

  const cityOptions = ['TMT(科技,媒体和通信)', '时政', '社会', '金融', '教育', '医疗', '大数据', '财务', '法律', '人力HR', '产品开发', '运营'];

  export default {
    name:'addcolumn',
    components:{
      'v-Stab':Stab,
      'v-Orginat':Orginat,
      'v-knowledgeList':knowledgeList,
      'v-demandList':demandList,
      'v-organization':organization
    },
    data:function () {
      return {
        pickerOptions0:{
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        timeshow:false,
        dialogImageUrl: '',
        dialogVisible: false,
        serverapi: '/pub/updateColumn', // 发送
        getverapi:'pub/queryColumnById', // 获取
        sessionid:localStorage.getItem('sessionID'),
        id:null,
        namename:false,
        buttondisable:false,
        showbutton:true,
        form:{
          updateTime:'',
          // init date
          peopleList:[], //人脉
          peopleList2:[],
          customerList:[], //客户
          customerList2:[],
          organList:[],//组织
          organList2:[],
          knowledgeList:[], //知识
          knowledgeList2:[],
          demandList:[], //需求
          demandList2:[],

          optionsvalue:'',
          type: [],
          industry:[],
          name:'',
          options:[],
          description:'',
        },
        formoptions:'',
        selectArr: [],
        selectArr2: [],
        selectArr3: [],
        selectArr31:[],
        selectArr4: [],

        // 提交验证数据
        serverId:'',
        serverdelIds:null,
        servertypeId:'',
        // 全选数据
        checkAll: true,
        checkedCities: null,
        cities: cityOptions,
        isIndeterminate: true
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        var that =  this;
        that.interstate();
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

      interstate:function () {
        var that = this;
        that.$http.post(that.getverapi,JSON.stringify({
            'id': that.$route.params.id
          }),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}
        ).then(
          function (res) {
            if(res.data.notification.notifInfo == "success"){
              // 行业选中渲染
              that.checkedCities = JSON.parse(res.data.responseData.column.industry);
              // 根据typeId 显示不同的编辑状态
              let ctypeId = res.data.responseData.column.typeId;
              if(ctypeId == 1){
                that.namename = true;
                that.formoptions = '动态头条';
                that.timeshow = true;

              }else if(ctypeId == 2){
                that.namename = true;
                that.formoptions = '金桐精选';
                that.timeshow = true;
              }else if(ctypeId ==3){
                that.showbutton = false;
                that.formoptions = '企业专辑';
                that.timeshow = false;
              }else if(ctypeId ==4){
                that.formoptions = '发现-热门';
                that.timeshow = false;
              }else {
                that.formoptions = '';
                that.timeshow = false;
              }
              // 描述和栏目名称
              that.form.description = res.data.responseData.column.description;
              that.form.name= res.data.responseData.column.name;
              that.form.updateTime= res.data.responseData.column.updateTime;
              // 提交验证数据
              /*  serverId---id,
               serverdelIds:--delIds,
               servertypeId:--typeId,*/
              that.serverId =res.data.responseData.column.id;
              that.servertypeId =res.data.responseData.column.typeId;
              // 不同字段设置
              let wordspostion = res.data.responseData.columnDescRels;
              wordspostion.forEach(function (key) {
                if(key.sourceTypeId == 2){ //2  人脉
                  that.form.peopleList2.push(key);
                }
                if(key.sourceTypeId == 3){ //3  客户
                  that.form.customerList2.push(key);
                }
                if(key.sourceTypeId == 7){ //7  需求
                  that.form.demandList2.push(key);
                }
                if(key.sourceTypeId == 8){ // 8  知识
                  that.form.knowledgeList2.push(key);
                }
                if(key.sourceTypeId == 4){ // 8  组织
                  that.form.organList2.push(key);
                }
                /*截取字段人脉*/
                var peoples = that.form.peopleList;
                that.form.peopleList2.forEach(function (val) {
                  var nulobj = {};
                /*  nulobj.id = val.id;*/
                  nulobj.sourceId = val.sourceId;
                  nulobj.sourceTitle = val.sourceTitle;
                  nulobj.sourceTypeId = 2;
                  nulobj.picPath = val.picPath == null ? '' : val.picPath;
                  nulobj.career = val.career;
                  nulobj.company = val.company;
                  nulobj.function = val.function; //职能
                  nulobj.area = val.address == null ? '' : val.address;
                  nulobj.discrip = val.discrip; //描述
                  nulobj.gender = Number(val.gender);
                  peoples.push(nulobj)
                })
                var hash = {};
                that.form.peopleList = that.form.peopleList.reduce(function(item, next) {
                  hash[next.sourceId] ? '' : hash[next.sourceId] = true && item.push(next);
                  return item
                }, [])

                /*截取字段客户*/
                var custome = that.form.customerList;
                that.form.customerList2.forEach(function (val) {
                  var nulobj = {};
                 /* nulobj.id = val.id;*/
                  nulobj.sourceId = val.sourceId;
                  nulobj.sourceTitle = val.sourceTitle;
                  nulobj.sourceTypeId =3;
                  nulobj.picPath = val.picPath == null ? '' : val.picPath;
                  nulobj.address = val.address;
                  nulobj.virtual = val.virtual;
                  nulobj.industry = val.industry;
                  nulobj.readCount = val.readCount; //浏览数
                  nulobj.approveCount = val.followCount;//点赞数
                  nulobj.commentCount = val.evaluateCount;//评论数
                  nulobj.legalRepres = val.legalRepres;
                  custome.push(nulobj)
                })
                var hash2 = {};
                that.form.customerList = that.form.customerList.reduce(function(item, next) {
                  hash2[next.sourceId] ? '' : hash2[next.sourceId] = true && item.push(next);
                  return item
                }, [])

                /*截取字段组织*/
                var org = that.form.organList;
                that.form.organList2.forEach(function (val) {
                  var nulobj = {};
                  nulobj.sourceTitle = val.sourceTitle;
                  nulobj.picPath = val.picPath;
                  nulobj.sourceId = val.sourceId;
                 /* nulobj.id = val.id;*/
                  nulobj.createId = val.createId;
                  nulobj.sourceTypeId = 4;
                  nulobj.area = val.address; //地区
                  nulobj.orgIndustry = val.industry; //行业
                  nulobj.orgType = Number(val.orgType); //组织类型
                  nulobj.followCount = Number(val.followCount); //关注人数
                  nulobj.discrip = val.discrip; //描述
                  org.push(nulobj)
                })
                var hash3 = {};
                that.form.organList = that.form.organList.reduce(function(item, next) {
                  hash3[next.sourceId] ? '' : hash3[next.sourceId] = true && item.push(next);
                  return item
                }, [])

                /*截取字段知识*/
                var know = that.form.knowledgeList;
                that.form.knowledgeList2.forEach(function (val) {
                  var nulobj = {};
                /*  nulobj.id = val.id;*/
                  nulobj.sourceId = val.sourceId;
                  nulobj.sourceTitle = val.sourceTitle;
                  nulobj.sourceTypeId = 8;
                  nulobj.columnType =  val.columnType;//栏目 Number(val.columnId)
                  nulobj.picPath =  val.coverPic == null ? '' : val.coverPic;
                  nulobj.ownerName =  val.ownerName;
                  nulobj.sourceCreateTime = val.sourceCreateTime;
                  nulobj.readCount = val.readCount;
                  know.push(nulobj)
                })
                var hash4 = {};
                that.form.knowledgeList = that.form.knowledgeList.reduce(function(item, next) {
                  hash4[next.sourceId] ? '' : hash4[next.sourceId] = true && item.push(next);
                  return item
                }, [])

                /*截取字段需求*/
                var deman = that.form.demandList;
                that.form.demandList2.forEach(function (val) {
                  var nulobj = {};
               /*   nulobj.id = val.id;*/
                  nulobj.sourceId = val.sourceId;
                  nulobj.sourceTitle = val.sourceTitle;
                  nulobj.sourceTypeId = 7;
                  nulobj.area = val.address; //地区
                  nulobj.ownerName =  val.ownerName;  //发布人
                  nulobj.sourceCreateTime = val.sourceCreateTime;  //发布时间
                  nulobj.readCount = Number(val.readCount);  //阅读数
                  nulobj.evaluateCount = Number(val.evaluateCount);  //评论数
                  nulobj.demandType = Number(val.demandType);
                  deman.push(nulobj)
                })
                var hash5 = {};
                that.form.demandList = that.form.demandList.reduce(function(item, next) {
                  hash5[next.sourceId] ? '' : hash5[next.sourceId] = true && item.push(next);
                  return item
                }, [])

              })

            }else{
              alert('借口报错')
            }
          },function (res) {
            console.log(res)
          }
        )



      },
      //全选数据
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? cityOptions : [];
        this.isIndeterminate = false;
      },
      //单选数据
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;

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
        var len = this.form.demandList;
        for (var i = 0; i < len.length; i++) {
          if (this.selectArr.indexOf(len[i].sourceId)>=0) {
          }else{
            arr.push(this.form.demandList[i])
          }
        }
       /* let vm = this;
        this.selectArr.forEach(function (item) {
          vm.form.demandList3.push(vm.form.demandList[item].sourceId)
        })*/
        this.form.demandList = arr;
        this.selectArr = [];
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
        var len = this.form.organList;
        for (var i = 0; i < len.length; i++) {
          if (this.selectArr31.indexOf(len[i].sourceId)>=0) {
          }else{
            arr.push(this.form.organList[i])
          }
        }
        /*let vm = this;
        this.selectArr31.forEach(function (item) {
          vm.form.customerList42.push(vm.form.organList[item].id)
        })*/
        this.form.organList = arr;
        this.selectArr31 = [];
      },
      // 人脉
      selectAll2(date) {
        var vm = this;
        date.forEach(function(item, i) {
          vm.selectArr2.push(item.sourceId);
        });
      },
      del2() {
        let arr = [];
        var len = this.form.peopleList;
        for (var i = 0; i < len.length; i++) {
          if (this.selectArr2.indexOf(len[i].sourceId)>=0) {
          }else{
            arr.push(this.form.peopleList[i])
          }
        }
       /* let vm = this;
        this.selectArr2.forEach(function (item) {
          vm.form.peopleList3.push(vm.form.peopleList[item].id)
        })*/

        this.form.peopleList = arr;
        this.selectArr2 = [];
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
        var len = this.form.customerList;
        for (var i = 0; i < len.length; i++) {
          if (this.selectArr3.indexOf(len[i].sourceId)>=0) {
          }else{
            arr.push(this.form.customerList[i])
          }
        }
       /* let vm = this;
        this.selectArr3.forEach(function (item) {
          vm.form.customerList3.push(vm.form.customerList[item].id)
        })
*/
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
        var len = this.form.knowledgeList;
        for (var i = 0; i < len.length; i++) {
          if (this.selectArr4.indexOf(len[i].sourceId)>=0) {

          }else{
            arr.push(this.form.knowledgeList[i])
          }
        }
     /*   let vm = this;
        this.selectArr4.forEach(function (item) {
          vm.form.knowledgeList3.push(vm.form.knowledgeList[item].id)
        })*/
        this.form.knowledgeList = arr;
        this.selectArr4 = [];
      },

      // 添加人脉
      peopledate(data){
        var datei = this.form.peopleList;
       /* var datei2 = this.form.peopleList2;*/
        data.forEach(function (val) {
          var nulobj = {};
         /* nulobj.id = val.id;*/
          nulobj.sourceId = Number(val.id);
          nulobj.sourceTitle = val.name;
          nulobj.sourceTypeId = 2;
          nulobj.picPath = val.picPath == null ? '' : val.picPath;
          nulobj.career = val.position;
          nulobj.company = val.company;
          var lis = val.firstIndustry;
          if(val.secondIndustry != null && val.secondIndustry != ''){
            lis =  lis +  '-'  + val.secondIndustry
          }
          nulobj.function = lis; //职能
          nulobj.area = val.area == null ? '' : val.area ; //地区
          nulobj.discrip = val.description; //描述
          nulobj.gender = Number(val.gender); //性别

          datei.push(nulobj);
         /* datei2.push(nulobj)*/
        })
        var hash = {};
        this.form.peopleList = this.form.peopleList.reduce(function(item, next) {
          hash[next.sourceId] ? '' : hash[next.sourceId] = true && item.push(next);
          return item
        }, [])

      },
      //添加组织
      organizationdate(data){
        var datei = this.form.organList;
      /*  var datei2 = this.form.customerList41;*/
        data.forEach(function (val) {
          var nulobj = {};
          nulobj.sourceTitle = val.name;
          nulobj.picPath = val.picPath == null ? '' : val.picPath;
        /*  nulobj.id = val.id;*/
          nulobj.sourceId = val.id;
          nulobj.createId = val.createId;
          nulobj.sourceTypeId = 4;
          nulobj.area = val.area == null ? '' : val.area ;; //地区
          nulobj.orgIndustry = val.industry; //行业
          nulobj.orgType = Number(val.orgType); //组织类型
          nulobj.followCount = Number(val.followCount); //关注人数
          nulobj.discrip = val.description; //描述


          datei.push(nulobj)
         /* datei2.push(nulobj)*/
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
      /*  var datei2 = this.form.customerList2*/
        data.forEach(function (val) {
          var nulobj = {};

       /*   nulobj.id = val.id;*/
          nulobj.sourceId = val.id;
          nulobj.sourceTitle = val.name;
          nulobj.sourceTypeId =3;
          nulobj.picPath = val.picPath;
          nulobj.industry = val.industry;
          nulobj.virtual = val.virtual;
          nulobj.readCount = val.browseCount; //浏览数
          nulobj.approveCount = val.upvoteCount;//点赞数
          nulobj.commentCount = val.commentCount;//评论数
          nulobj.legalRepres = val.olegalRepresentative;
          if(val.virtual == 0){
             nulobj.address = val.area;
           }else if(val.virtual == 2){
            nulobj.address = val.address;
           }else{
             nulobj.address = '';
           }

          datei.push(nulobj)
         /* datei2.push(nulobj)*/
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
        /*var datei2 = this.form.knowledgeList2;*/
        data.forEach(function (val) {
          var nulobj = {};

         /* nulobj.id = val.id;*/
          nulobj.sourceId = val.id;
          nulobj.sourceTitle = val.title;
          nulobj.sourceTypeId = 8;
          nulobj.columnType =  Number(val.columnId);//栏目
          nulobj.picPath =  val.coverPic == null ? '' : val.coverPic;
          nulobj.ownerName =  val.createUserName;
          nulobj.sourceCreateTime = val.createDate;
          nulobj.readCount = val.readCount;

          datei.push(nulobj)
         /* datei2.push(nulobj)*/
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
       /* var datei2 = this.form.demandList2;*/
        data.forEach(function (val) {

          var nulobj = {};

         /* nulobj.id = val.id;*/
          nulobj.sourceId = Number(val.demandId);
          nulobj.sourceTitle = val.demandTitle;
          nulobj.sourceTypeId = 7;
          nulobj.area = val.area == null ? '' : val.area;; //地区
          nulobj.ownerName =  val.onwerName;  //发布人
          nulobj.sourceCreateTime = Number(val.createTime);  //发布时间
          nulobj.readCount = Number(val.readCount);  //阅读数
          nulobj.evaluateCount = Number(val.evaluatecount);  //评论数
          nulobj.demandType = Number(val.demandType);

          datei.push(nulobj)
         /* datei2.push(nulobj)*/
        })

        var hash = {};
        this.form.demandList = this.form.demandList.reduce(function(item, next) {
          hash[next.sourceId] ? '' : hash[next.sourceId] = true && item.push(next);
          return item
        }, [])


      },

//   保存数据
      onSave(){
        var that =  this;
        /* peopleList:[], //人脉
          customerList:[], //客户
          organList:[], //组织
          knowledgeList:[], //知识
          demandList:[], //需求*/

        let aa = that.form.peopleList.concat(that.form.customerList);
        let bb = that.form.organList.concat(that.form.knowledgeList);
        let cc = that.form.demandList.concat(bb);
        let dd = aa.concat(cc);


        var stime;
       /* if(that.form.updateTime == ''){
          stime = 0;
        }else {
          stime = (that.form.updateTime).getTime();
        }*/

       if(that.form.updateTime == ''){
         stime = new Date().getTime();;
       }else if(typeof that.form.updateTime == 'number' ){
         stime = that.form.updateTime;
       }else{
         stime = (that.form.updateTime).getTime();
       }

        var savepath = {
          id: that.serverId,
          typeId: that.servertypeId,
          name: that.form.name,
          industry: JSON.stringify(that.checkedCities),
          description: that.form.description,
          updateTime:stime,
          colDes: dd
        };

        if(!savepath.industry || savepath.industry.length ==0 ){
          this.$notify({
            title: '添加失败',
            message: '行业必须添加至少一个以上',
            duration: 1000
          });
        }else{
          that.$http.post(that.serverapi,JSON.stringify(savepath),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if(res.body.notification.notifInfo == "success"){
                this.$message('编辑栏目成功');
                this.$router.push({path: '/column'})
              }else{
                this.$notify.error({
                  title: '编辑栏目失败',
                  message: '编辑栏目失败',
                  duration: 1000
                });
              }

            },function (res) {
              console.log(res)
            }
          )
        }
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
  .addcolumn{
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
  input[type=checkbox]{
    width: 16px;
    height:16px;
    border-color: #bfcbd9;
    margin-right: 5px;
  }
</style>


