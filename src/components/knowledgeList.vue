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
                <el-option label="标题" :value="1"></el-option>
                <el-option label="发布人" :value="2"></el-option>
              </el-select>
              <el-autocomplete
                class="inline-input"
                v-model="peopleDate.keyWord"
                :fetch-suggestions="querySearch"
                placeholder="请输入需求名称/发布人"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="栏目">
              <el-select v-model="Qvalue" placeholder="请选择">
                <el-option
                  v-for="item in MInlist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
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
                height="500"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="title"
                  label="知识标题"
                >
                </el-table-column>
                <el-table-column
                  prop="typeName"
                  label="栏目"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="createUserName"
                  width="80"
                  label="发布人">
                </el-table-column>
                <el-table-column
                  sortable
                  label="发布时间">
                  <template scope="scope">
                    {{ Number(scope.row.publicDate) | format}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="readCount"
                  width="100"
                  sortable
                  label="浏览量">
                </el-table-column>
              </el-table>
              <div class="el-page">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="page"
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
                height="480"
                style="width: 100%"
              >
                <el-table-column
                  prop="title"
                  label="知识标题"
                >
                </el-table-column>
                <el-table-column
                  prop="typeName"
                  label="栏目"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="createUserName"
                  width="80"
                  label="发布人">
                </el-table-column>
                <el-table-column
                  sortable
                  label="发布时间">
                  <template scope="scope">
                    {{ Number(scope.row.publicDate) | format}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="readCount"
                  width="100"
                  sortable
                  label="浏览量">
                </el-table-column>
                <el-table-column label="操作" width="100">
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

  import Dsid from '../config/columnjson'

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
        api:'/knowledge/knowledge/admin/allKnowledge/',
        MInlist: Dsid,
        Qvalue:'',
        page:1,
        total:0,
        /*table */
        tablePeople:[],
        NewtablePeople:[],
        /*search */
        peopleDate:{
          type:2,
          size:10,
          keyWord:'金桐小助手',
        },
        restaurants: [],
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        this.initpeopledate();
        this.restaurants = this.loadAll();
      })
    },
    methods:{
    /*
    * 搜索记录 start
    * */
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "金桐小助手"},
          { "value": "周广文"}
        ]
      },
      handleSelect(item) {
        this.peopleDate.keyWord = item.value;
      },
      /*
       * 搜索记录 end
       * */
      /*init date*/
      initpeopledate:function () {
        var that =  this;
        that.$http.post(that.api + 0 + '/' + that.peopleDate.size + '/' + -1 + '/' + that.peopleDate.type ,
          that.peopleDate.keyWord,{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}).then(
          function (res) {
            that.tablePeople = res.data.responseData.list;
            that.total = res.data.responseData.totalCount
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
        that.initpeopledate();
      },
      // page change
      handleCurrentChange(val) {
        var that =  this;
        let index = val - 1;

        that.$http.post(that.api + index + '/' + that.peopleDate.size + '/' + that.total + '/' + that.peopleDate.type ,
          that.peopleDate.keyWord,{headers:{
            sessionID :localStorage.getItem('sessionID'),
            s:'web',
          }}).then(
          function (res) {
            that.tablePeople = res.data.responseData.list;
            that.peopleDate.total = res.data.responseData.totalCount
          },function (res) {
            console.log(res)
          }
        );
      },
      // save callback
      save(){
        this.success(this.NewtablePeople);
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
