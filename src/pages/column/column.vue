<template>
  <div class="column">
    <section class="section">
      <div class="loation"><router-link to="/column">内容管理</router-link> >>公用栏目管理</div>
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form" label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.type" placeholder="选择栏目名称" style="width: 140px">
              <el-option label="创建人" :value="1"></el-option>
              <el-option label="栏目名称" :value="2"></el-option>
            </el-select>
            <el-input
              placeholder="请输入关键词"
              icon="circle-close"
              style="width: 200px"
              v-model="form.keyWord"
              :on-icon-click="handleIconClick">
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
          <el-form-item label="位置" >
            <el-select placeholder="请选择"  v-model="id"  @change="chanselet(id)" >
              <el-option
                v-for="item in positionList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="全部" style="width: 140px">
              <el-option label="全部" :value="2"></el-option>
              <el-option label="正常" :value="0"></el-option>
              <el-option label="已禁用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
            <el-button type="primary" @click="goaddcolumn" icon="edit">新增栏目</el-button>
            <v-Tag></v-Tag>
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="Columnlist"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="80">
          </el-table-column>
          <el-table-column label="操作"width="120">
            <template scope="scope">
              <el-button size="small" type="text" @click="currency(scope.$index, scope.row)">编辑</el-button>
              <span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click="changeStatus(scope.$index, scope.row)">
                {{Columnlist[scope.$index].status == 1 ? '启用' : '禁用'}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            property="name"
            label="栏目名称"
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
            label="行业">
          </el-table-column>
          <el-table-column
            label="位置"
            width="100">
            <template scope="scope">
              {{ scope.row.typeId | typeId }}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="150">
           <!--  property="status" -->
           <template scope="scope">
              <span>{{ Columnlist[scope.$index].status == 1 ? '已禁用' : '正常' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="el-page">
        <el-button type="primary" @click="Refresh"  style="float:left;">刷新</el-button>
        <el-pagination
          @current-change="handleCurrentChange2"
          :current-page="index"
          :page-size="form.size"
          layout="prev, pager, next, jumper,total"
          :total="total">
        </el-pagination>
      </div>
      <!--position set-->
    </section>
  </div>
</template>

<script>

  import vTag from '../../components/Tag.vue'
  import formmate from '../../config/date'
  import formmate2 from '../../config/date2'


  export default {
    components:{
      'v-Tag':vTag
    },
    name:'column',
    data:function () {
      return {
        dialogVisible: true,
        total: 0,
        index:1,
        id:null,
        form: {
          index:0,
          size:20,
          bTime:"",
          type:1,
          keyWord:"",
          eTime:"",
          positionId:0,
          status:2,
        },
        api: 'pub/searchColumns',
        statusapi:'pub/changeColumnStatus',
        sessionid:localStorage.getItem('sessionID'),
        Columnlist:null,
        positionList:[],
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        var that = this;
        that.initlistdate();
        that.getpostion();
      });
    },
    methods:{
      Refresh(){
        window.location.reload();
      },
      getpostion:function () {
        var that = this;
        that.$http.get('/pub/queryPositionByUserId',{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            let tags = res.body.responseData;
            tags.forEach(function (item) {
              if(item.id == 1 || item.id == 2){
              }else{
                that.positionList.push(item)
              }
            })
          },function (res) {
            console.log(res)
          }
        );
      },
      initlistdate:function () {
        var that = this;
      // 初始化请求数据
        that.$http.post(that.api,JSON.stringify(that.form),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
             that.Columnlist = res.data.responseData.column;
             that.total = res.data.responseData.totalNum;
          },function (res) {
            console.log(res)
          }
        );
      },
      handleIconClick(){
        let vm = this;
        vm.form.keyWord = '';
      },
      //搜索
      onSearch(){
        var that =  this;
        that.form.bTime = formmate(that.form.bTime);
        that.form.eTime = formmate2(that.form.eTime);

        if(that.form.bTime == 'NaN-aN-aN aN:aN:aN'){
          that.form.bTime = "";
        }
        if(that.form.eTime == 'NaN-aN-aN 23:59:59'){
          that.form.eTime = "";
        }
        that.initlistdate();
      },

      // 赋值id
      chanselet(name){
        this.form.positionId = name
      },
      // 跳转添加pages
      goaddcolumn(){
        this.$router.push({path: '/addcolumn/'})
      },
      // 跳转详情pages
      currency(index,row) {
        this.$router.push({path: '/editcolumn/' + row.id})
      },
      //更改状态
      changeStatus(index,row){
          var that = this;
          var changeData = {
            id : row.id,
            status:row.status == 0 ? 1 : 0,
          };
          that.$http.post(that.statusapi,JSON.stringify(changeData),{
            headers:{
              sessionID :that.sessionid,
              s:'web',
            }
          }).then(function (res){
              if(res.data.responseData.status || res.data.responseData.status >= 0){
                  that.$notify({
                    title: '热词状态修改成功',
                    type: 'success',
                    duration: 1500
                  });
                  row.status = res.data.responseData.status;
              }else{
                 that.$notify.error({
                  title: '操作失败,请稍后重试...',
                  duration: 1500
                });
              }
          },function(error){
            console.log(error)
          })
      },
      // 分页跳转
      handleCurrentChange2(val) {
        var that =  this;
        that.form.index =  val - 1;
        that.initlistdate();
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
  .el-page{
    display: block;
    text-align: center;
    margin: 20px auto;
  }
</style>
