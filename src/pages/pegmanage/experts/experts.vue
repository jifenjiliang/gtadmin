<template>
  <div class="headlines">
    <div class="loation"><router-link to="/experts">PGC内容管理</router-link> >>热门专家</div>
    <div class="headlines_">
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="选择栏目名称" style="width: 140px">
              <el-option label="知识标题" :value="1"></el-option>
              <el-option label="创建人" :value="2"></el-option>
            </el-select>
            <el-input
              placeholder="请输入知识标题或创建人"
              icon="circle-close"
              style="width: 600px"
              v-model="form.keyWord"
              :on-icon-click="handleIconClick"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col  :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.bTime"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="form.eTime"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="行业偏好">
            <el-select v-model="form.preference" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-col  :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.uTime"
                style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="form.sTime"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  icon="search" @click="onSearch">搜索</el-button>
            <v-Expert
              filename="添加专家"
              :success="expert"
              v-show="showbutton"
            ></v-Expert>
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="headlines"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="80">
          </el-table-column>
          <el-table-column label="操作"width="150">
            <template scope="scope">
              <el-button size="small" @click="Seefun(scope.$index, scope.row)">查看</el-button>
              <el-button size="small" @click="Editfun(scope.$index, scope.row)">置顶</el-button>
              <el-button size="small" @click="Delfun(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            property="name"
            label="知识标题"
            width="250">
          </el-table-column>
          <el-table-column
            property="creatorName"
            label="创建人"
            width="150">
          </el-table-column>
          <el-table-column
            property="createTime"
            label="创建时间"
            width="200">
            <template scope="scope">
              {{ scope.row.createTime | format}}
            </template>
          </el-table-column>
          <el-table-column
            property="industry"
            label="行业偏好">
          </el-table-column>
          <el-table-column
            property="createTime"
            label="更新时间"
            width="200">
            <template scope="scope">
              {{ scope.row.createTime | format}}
            </template>
          </el-table-column>
          <el-table-column
            label="浏览数"
            sortable
            property="typeId"
            width="100">
          </el-table-column>
          <el-table-column
            label="评论数"
            sortable
            property="typeId"
            width="100">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="el-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="form.index"
        :page-size="form.size"
        layout="prev, pager, next, jumper,total"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import expert from '../../../components/expert.vue'
  import pre from  '../../../config/preference'
  export default {

    components:{
      'v-Expert':expert,
    },

    name:'headlines',
    data:function () {
      return {
        options: pre,
        headlines:[],
        showbutton:true,
        total:0,
        form: {
          type:2,
          keyWord:"",
          bTime:null,
          eTime:null,
          preference:'',
          uTime:null,
          sTime:null,
          index:1,
          size:20,
        },
      }
    },
    created () {
      this.fetchData()
    },
    methods:{
      /*fetchData*/
      fetchData(){

      },
      /*clean words */
      handleIconClick(){
        this.form.keyWord = '';
      },
      // search
      onSearch(){

      },
      //Seefun
      Seefun(){

      },
      //Editfun
      Editfun(){

      },
      //Delfun
      Delfun(){

      },
      // handleCurrentChange
      handleCurrentChange(val) {
        var that =  this;
      },
      expert(data){

          console.log(data)

      },


    },
    watch: {
      '$route': 'fetchData'
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .headlines{
    display: block;
    margin: 20px 20px 0 20px;
    .loation{
      display: block;
      height:46px;
      line-height: 46px;
    }
  }
  .table-body{
    background: white;
    margin-top: 10px;
  }
  .serch{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 20px 0;
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 50px auto;
  }
</style>
