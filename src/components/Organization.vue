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
            <el-form-item label="名称">
              <el-input
                placeholder="请输入组织名称"
                icon="circle-close"
                v-model="peopleDate.keyword"
                :on-icon-click="handleIconClick">
              </el-input>
            </el-form-item>
            <el-form-item label="行业">
              <el-select clearable v-model="Addtissue.orgtIndustry" placeholder="请输入一级分类" >
                <el-option v-for="item in orgtIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
              <el-select clearable v-model="Addtissue.orgsIndustry" placeholder="请输入二级分类" >
                <el-option v-for="item in orgsIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地区" >
              <el-select clearable v-model="Addtissue.firstIndustry" placeholder="请输入省" >
                <el-option v-for="item in firstIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
              <el-select clearable v-model="Addtissue.secondIndustry" placeholder="请输入市" >
                <el-option v-for="item in secondIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
              <el-select clearable v-model="Addtissue.threeIndustry" placeholder="请输入区">
                <el-option v-for="item in threeIndustrys" :value="item" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织类型">
              <el-select v-model="peopleDate.orgType" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
                <el-option label="企业" value="1"></el-option>
                <el-option label="政府" value="2"></el-option>
                <el-option label="媒体" value="3"></el-option>
                <el-option label="学校" value="5"></el-option>
                <el-option label="医院" value="6"></el-option>
                <el-option label="其它" value="4"></el-option>
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
                style="width: 100%"
                @selection-change="Add"
                height="420"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="name"
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
                    {{tablePeople[scope.$index].virtual == 1 ? '组织' : '客户'}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="followCount"
                  sortable
                  label="关注人数">
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
                height="420"
              >
                <el-table-column
                  prop="name"
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
                    {{tablePeople[scope.$index].virtual == 1 ? '用户' : '人脉'}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="followCount"
                  label="关注人数">
                </el-table-column>
                <el-table-column label="操作" width="80">
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

  import cityjson from '../config/cityjson'
  import Dsid from '../config/Dsidjson'
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
    data(){
      return {
        file:false,
        api:'/cross/organ/organ/getAddCustomerList.json',
        addressData: cityjson,
        AaddressData:Dsid,
        total:0,
        index:1,
        value2:'',
        /*table */
        tablePeople:[],
        NewtablePeople:[],
        /*datejson */
        Addtissue:{
          firstIndustry: '',
          secondIndustry: '',
          threeIndustry: '',
          orgtIndustry:'',
          orgsIndustry:'',
        },
        /*search */
        peopleDate:{
          orgType:'全部',
          area:'',
          industy:'',
          keyword:'',
          index:0,
          sort:0,
          size:10,
          type:1,
        },
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        this.initpeopledate();
      })
    },
    computed: {
      firstIndustrys: function() {
        if (!this.addressData) return
        if(!this.addressData[this.Addtissue.firstIndustry]){
          this.Addtissue.secondIndustry = "";
        }
        var c = []
        for (var key in this.addressData) {
          c.push(key)
        }
        return c
      },
      secondIndustrys: function() {
        if (!this.addressData || !this.Addtissue.firstIndustry)
          return
        if(!this.addressData[this.Addtissue.firstIndustry][this.Addtissue.secondIndustry]){
          this.Addtissue.threeIndustry = "";
        }
        var c = []
        for (var key in this.addressData[this.Addtissue.firstIndustry]) {
          c.push(key)
        }
        return c
      },
      threeIndustrys: function() {
        if (!this.addressData || !this.Addtissue.secondIndustry)
          return
        var c = []
        for (var key in this.addressData[this.Addtissue.firstIndustry][this.Addtissue.secondIndustry]) {
          c.push(key)
        }
        return c
      },
      /*行业*/
      orgtIndustrys:function () {
        if (!this.AaddressData) return
        var c = []
        for (var key in this.AaddressData) {
          c.push(key)
        }
        return c

      },
      orgsIndustrys:function () {
        if (!this.AaddressData || !this.Addtissue.orgtIndustry)
          return

        var c = []
        for (var key in this.AaddressData[this.Addtissue.orgtIndustry]) {
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
      orgtIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.orgtIndustry = ''
        }
      },
      orgsIndustry: function(val, oldval) {
        if (val !== oldval) {
          this.orgsIndustry = ''
        }
      }


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
            that.tablePeople = res.data.responseData.page.listResults;
            that.total =  res.data.responseData.page.total
          },function (res) {
            console.log(res)
          }
        );
      },
      /*handleIconClick val block */
      handleIconClick(){
        this.peopleDate.keyword = '';
      },
      /*Add date*/
      Add(val) {
        var daus = this.NewtablePeople;
        val.forEach(function (item) {
          daus.push(item)
        })
        var hash = {};
        this.NewtablePeople = this.NewtablePeople.reduce(function(item, next) {
          hash[next.id] ? '' : hash[next.id] = true && item.push(next);
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
        that.peopleDate.area = that.Addtissue.firstIndustry + '_' + that.Addtissue.secondIndustry + '_' + that.Addtissue.threeIndustry;
        that.peopleDate.industy = that.Addtissue.orgtIndustry + '_' + that.Addtissue.orgsIndustry;
        if(that.peopleDate.area == "__"){
          that.peopleDate.area = '';
        }
        if(that.peopleDate.industy == "_"){
          that.peopleDate.industy = '';
        }
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
