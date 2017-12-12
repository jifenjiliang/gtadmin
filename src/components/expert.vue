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
            <el-form-item label="专家姓名">
              <el-input
                placeholder="请输入个人用户或者组织用户"
                icon="circle-close"
                style="width: 300px"
                v-model="peopleDate.keyword"
                :on-icon-click="handleIconClick">
              </el-input>
            </el-form-item>
            <el-form-item label="专家类型">
              <el-select v-model="peopleDate.type" placeholder="请选择">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="个人用户" :value="1"></el-option>
                <el-option label="组织用户" :value="2"></el-option>
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
                height="480"
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
                  prop="position"
                  label="行业">
                </el-table-column>
                <el-table-column
                  label="组织类型">
                  <template scope="scope">
                    {{scope.row.virtual == 1 ? '用户' : '人脉' }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="queAnsCount"
                  sortable
                  label="关注人数">
                </el-table-column>
              </el-table>
              <div class="el-page">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="index2"
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
                height="480"
              >
                <el-table-column
                  prop="name"
                  label="组织名称"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="position"
                  label="行业">
                </el-table-column>
                <el-table-column
                  label="组织类型">
                  <template scope="scope">
                    {{scope.row.virtual == 1 ? '用户' : '人脉' }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="queAnsCount"
                  sortable
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
        api:'/cross/organ/organ/getExpertList.json',
        total:0,
        index2:1,
        /*table */
        tablePeople:[],
        NewtablePeople:[],
        /*search */
        peopleDate:{
          type:0,
          keyword:'',
          index:0,
          size:10,
        },
      }
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
            that.tablePeople = res.data.responseData.list;
            that.total =  res.data.responseData.count
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
    float: left;
    width: 100%;
    height: 400px;
    clear: both;
    margin: 10px 30px 10px;
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
