<template>
  <div class="people">
    <el-button type="primary" @click="file = true">{{filename}}</el-button>
    <div class="boxcontaion" v-show="file">
      <div class="box_c_boxy">
        <!-- header-->
        <div class="box_c_boxy_t">
          <span></span>{{filename}}
          <i class="el-icon-close" @click="file = false"></i>
        </div>
        <!-- search-->
        <div class="box_c_boxy_c">
          <el-form :inline="true" :model="peopleDate" >
            <el-form-item label="关键字">
              <el-select v-model="peopleDate.type" placeholder="选择栏目名称" style="width: 140px">
                <el-option label="全部" :value="-1"></el-option>
                <el-option label="需求标题" :value="2"></el-option>
                <el-option label="发布人" :value="1"></el-option>
              </el-select>
              <el-input
                placeholder="请输入需求名称/发布人"
                icon="circle-close"
                style="width: 200px"
                v-model="peopleDate.keyWord"
                :on-icon-click="handleIconClick">
              </el-input>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-col  :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="peopleDate.bTime"
                  style="width: 100%;">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  v-model="peopleDate.eTime"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="peopleDate.status" placeholder="全部" style="width: 140px">
                <el-option label="全部" :value="2"></el-option>
                <el-option label="正常" :value="0"></el-option>
                <el-option label="已禁用" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地区" >
              <el-select clearable v-model="Adddemand.firstIndustry" placeholder="请输入省" >
                <el-option v-for="item in firstIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
              <el-select clearable v-model="Adddemand.secondIndustry" placeholder="请输入市" >
                <el-option v-for="item in secondIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
              <el-select clearable v-model="Adddemand.threeIndustry" placeholder="请输入区">
                <el-option v-for="item in threeIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="需求分类">
              <el-select clearable v-model="Adddemand.onetIndustry" placeholder="请输入一级分类" >
                <el-option v-for="item in onetIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
              <el-select clearable v-model="Adddemand.twoIndustry" placeholder="请输二级分类" >
                <el-option v-for="item in twoIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
              <el-select clearable v-model="Adddemand.strIndustry" placeholder="请输二级分类" >
                <el-option v-for="item in strIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-button type="primary" @click="search">搜索</el-button>
          </el-form>
        </div>
        <!--contaion-->
        <div class="box_c_boxy_b">
          <el-row>
            <el-col :span="11">
              <el-table
                :data="tablePeople"
                border
                tooltip-effect="dark"
                @selection-change="Add"
                style="width: 100%"
                height="360"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="demandTitle"
                  label="需求标题"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="userId"
                  label="发布人"
                >
                </el-table-column>
                <el-table-column
                  prop="area"
                  label="地   区">
                </el-table-column>
                <el-table-column
                  width="100"
                  label="需求分类">
                  <template scope="scope">
                    {{scope.row.demandType | demandType}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="发布时间"
                  width="150"
                  sortable>
                  <template scope="scope">
                    {{ Number(scope.row.createTime) | format}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="readCount"
                  label="阅读数"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="evaluatecount"
                  label="评论数"
                  width="100"
                  sortable>
                </el-table-column>
              </el-table>
              <div class="el-page">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="index"
                  :page-size="peopleDate.size"
                  layout="prev, pager, next, jumper,total"
                  :total="total">
                </el-pagination>
              </div>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-table
                :data="NewtablePeople"
                border
                tooltip-effect="dark"
                style="width: 100%"
                height="360"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="demandTitle"
                  label="需求标题"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="userId"
                  label="发布人"
                >
                </el-table-column>
                <el-table-column
                  prop="area"
                  label="地   区">
                </el-table-column>
                <el-table-column
                  width="100"
                  label="需求分类">
                  <template scope="scope">
                    {{scope.row.demandType | demandType}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="发布时间"
                  width="150"
                  sortable>
                  <template scope="scope">
                    {{ Number(scope.row.createTime) | format}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="readCount"
                  label="阅读数"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="evaluatecount"
                  label="评论数"
                  width="100"
                  sortable>
                </el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                  <template scope="scope">
                    <el-button
                      size="small"
                      type="danger"
                      @click="Delete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="box_c_boxy_b_btn">
                <el-button type="primary" style="width: 100px"  @click="save">保存</el-button>
                <el-button type="text" style="width: 100px" @click="file = false">取消</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!--footer -->
      </div>
    </div>
  </div>
</template>
<script>

  import formmate from '../config/date'
  import formmate2 from '../config/date2'
  import cityjson from '../config/cityjson'
  import Requirement from '../config/Requirement'
  export default {
    props:{
      filename: { // action title
        type: String,
        default:"file"
      },
      success:{   // success callback
        type:Function
      }
    },
    filters: {
      City:function (val) {
        if(val && val.name){
          return val.name
        }
      },
      District:function (val) {
        if(val && val.name){
          return val.name
        }
      },
      Province:function (val) {
        if(val && val.name){
          return val.name
        }
      },
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
    data(){
      return {
        file:false,
        addressData: cityjson,
        Requirementa:Requirement,
        api:'/demand/demand/searchDemand',
        total:0,
        index:1,
        /*table */
        tablePeople:[],
        NewtablePeople:[],
        /*datejson*/
        Adddemand:{
          firstIndustry: '',
          secondIndustry: '',
          threeIndustry: '',
          onetIndustry:'',
          twoIndustry:'',
          strIndustry:''
        },
        /*search */
        peopleDate:{
          area:'' ,
          bTime:'',
          eTime:'',
          typeName:"", // 需求分类
          index:0,
          keyWord:'',
          size:20,
          status:2,
          type:-1,
        },
      }
    },
    computed: {
      firstIndustrys: function() {
        if (!this.addressData) return
        if(!this.addressData[this.Adddemand.firstIndustry]){
          this.Adddemand.secondIndustry = "";
        }
        var c = []
        for (var key in this.addressData) {
          c.push(key)
        }
        return c
      },
      secondIndustrys: function() {
        if (!this.addressData || !this.Adddemand.firstIndustry)
          return
        if(!this.addressData[this.Adddemand.firstIndustry][this.Adddemand.secondIndustry]){
          this.Adddemand.threeIndustry = "";
        }
        var c = []
        for (var key in this.addressData[this.Adddemand.firstIndustry]) {
          c.push(key)
        }
        return c
      },
      threeIndustrys: function() {
        if (!this.addressData || !this.Adddemand.secondIndustry)
          return
        var c = []
        for (var key in this.addressData[this.Adddemand.firstIndustry][this.Adddemand.secondIndustry]) {
          c.push(key)
        }
        return c
      },
      /*分类*/
      onetIndustrys: function() {
        if (!this.Requirementa) return
        var c = []
        for (var key in this.Requirementa) {
          c.push(key)
        }
        return c
      },
      twoIndustrys: function() {
        if (!this.Requirementa || !this.Adddemand.onetIndustry)
          return
        var c = []
        for (var key in this.Requirementa[this.Adddemand.onetIndustry]) {
          c.push(key)
        }
        return c
      },
      strIndustrys: function() {
        if (!this.Requirementa || !this.Adddemand.twoIndustry)
          return
        var c = []
        for (var key in this.Requirementa[this.Adddemand.onetIndustry][this.Adddemand.twoIndustry]) {
          c.push(key)
        }
        return c
      },

    },
    watch: {
      firstIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.firstIndustry = ''
        }
      },
      secondIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.secondIndustry = ''
        }
      },
      threeIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.threeIndustry = ''
        }
      },
      onetIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.onetIndustry = ''
        }
      },
      twoIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.twoIndustry = ''
        }
      },
      strIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.strIndustry = ''
        }
      },

    },
    mounted:function () {
      this.$nextTick(function () {
        this.initpeopledate();
      })
    },
    methods:{
      /*init date */
      initpeopledate:function () {
        var that =  this;
        that.$http.post(that.api,JSON.stringify(that.peopleDate),{headers:{
          sessionID :localStorage.getItem('sessionID'),
          s:'web',
        }}).then(
          function (res) {
            that.tablePeople = res.data.responseData.demands;
            that.total = Number(res.data.responseData.totalNum);
          },function (res) {
            console.log(res)
          }
        );
      },
      /*handleIconClick val block */
      handleIconClick(){
        this.peopleDate.keyWord = '';
      },
      /*Add date*/
      Add(val) {
        var daus = this.NewtablePeople;
        val.forEach(function (item) {
          daus.push(item)
        })
        var hash = {};
        this.NewtablePeople = this.NewtablePeople.reduce(function(item, next) {
          hash[next.demandId] ? '' : hash[next.demandId] = true && item.push(next);
          return item
        }, [])

      },
      /*delete date*/
      Delete(index, row){
        this.NewtablePeople.splice(index, 1);
      },
      /*search date*/
      search(){
        var that =  this;
        /*date formmate*/
        that.peopleDate.bTime = formmate(that.peopleDate.bTime);
        that.peopleDate.eTime = formmate2(that.peopleDate.eTime);
        if(that.peopleDate.bTime == 'NaN-aN-aN aN:aN:aN'){
          that.peopleDate.bTime = "";
        }
        if(that.peopleDate.eTime == 'NaN-aN-aN 23:59:59'){
          that.peopleDate.eTime = "";
        }
        /*block date */
        that.peopleDate.area = that.Adddemand.firstIndustry + '-' + that.Adddemand.secondIndustry + '-' + that.Adddemand.threeIndustry;

        if(that.peopleDate.area == "--"){
          that.peopleDate.area = '';
        }
        var tyname = that.Adddemand.strIndustry == " " ? that.Adddemand.twoIndustry : that.Adddemand.strIndustry
        that.peopleDate.typeName = tyname;
        that.initpeopledate();
      },
      // page change
      handleCurrentChange(val) {
        var that =  this;
        that.peopleDate.index = val -1;
        that.initpeopledate();
      },
      // save callback
      save(){
        this.success(this.NewtablePeople)
        this.file = false;
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .people{
    display: inline-block;
    vertical-align: top;
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
    width: 1400px;
    height: 700px;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -350px;
    margin-left: -700px;
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
    display: block;
    margin: 15px 30px 0;
  }
  .box_c_boxy_b{
    display: block;
    width: 100%;
    height: 400px;
    clear: both;
    margin: 0 0 0 30px;
  }
  .box_c_boxy_b_btn{
    display: block;
    text-align: center;
    button{
      margin-top: 30px;
    }
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 10px auto;
  }
</style>
