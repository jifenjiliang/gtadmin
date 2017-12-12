<template>
  <div class="knowledge">
    <section class="section">
      <div class="loation"><router-link to="/knowledge">内容管理</router-link> >>知识管理</div>
     <!--  <SiteNav></SiteNav> -->
      <!-- form search -->
      <div class="serch">
        <el-form ref="form"  :inline="true" :model="form"  label-width="70px">
          <el-form-item label="关键字">
            <el-select v-model="form.region" placeholder="栏目名称" style="width: 140px">
              <el-option label="知识标题" value="知识标题"></el-option>
              <el-option label="发布人" value="发布人"></el-option>
            </el-select>
            <el-input
              placeholder="请输入关键词"
              icon="circle-close"
              style="width: 300px"
              v-model="form.keyword"
              :on-icon-click="handleIconClick">
            </el-input>
          </el-form-item>
          <el-form-item label="栏目">
            <el-select v-model="form.type" placeholder="资讯" style="width: 140px">
              <el-option label="资讯" value="1"></el-option>
              <el-option label="投融工具" value="2"></el-option>
              <el-option label="行业" value="3"></el-option>
              <el-option label="经典案例" value="4"></el-option>
              <el-option label="新材料" value="5"></el-option>
              <el-option label="资产管理" value="6"></el-option>
              <el-option label="宏观" value="7"></el-option>
              <el-option label="观点" value="8"></el-option>
              <el-option label="判例" value="9"></el-option>
              <el-option label="法律法规" value="10"></el-option>
              <el-option label="文章" value="11"></el-option>
              <el-option label="互联网" value="12"></el-option>
              <el-option label="大数据" value="13"></el-option>
              <el-option label="金融" value="14"></el-option>
              <el-option label="教育" value="15"></el-option>
              <el-option label="医疗" value="16"></el-option>
              <el-option label="O2O" value="17"></el-option>
              <el-option label="游戏" value="18"></el-option>
              <el-option label="智能硬件" value="19"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="全部" style="width: 140px">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="正常" value="4"></el-option>
              <el-option label="已禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch" icon="search">搜索</el-button>
            <el-button type="primary" @click="onPublish" icon="edit">发布知识</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- show table dates-->
      <div class="table-body">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%">
          <el-table-column
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="操作"
            width="230">
            <template scope="scope">
              <el-button
                size="small"
                type="text"
                @click="currency(scope.$index, scope.row)">查看</el-button><span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click="edit(scope.$index, scope.row)">编辑</el-button><span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click="changeStatus(scope.$index, scope.row)">
                {{tableData[scope.$index].status == "正常" ? '禁用' : '启用'}}
              </el-button><span style="color: #4db3ff;"> | </span>
              <el-button
                size="small"
                type="text"
                @click="stick(scope.$index, scope.row)">
                {{tableData[scope.$index].essence == 1 ? '取消置顶' : '置顶'}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            property="title"
            label="知识标题">
          </el-table-column>
          <el-table-column
            property="createUserName"
            label="发布人"
            width="150">
          </el-table-column>
          <el-table-column
            property="createDate"
            label="发布时间"
            width="250">
          </el-table-column>
          <el-table-column
            property="type"
            label="栏目"
            width="150">
          </el-table-column>
          <el-table-column
            property="status"
            label="状态"
            width="100">
          </el-table-column>
        </el-table>
      </div>
      <!-- show page-->
      <div class="el-page">
        <el-button type="primary" @click="Refresh"  style="float:left;">刷新</el-button>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="form.index"
          :page-size="form.size"
          layout="prev, pager, next, jumper,total"
          :total="total">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>

  import dealDate from '../../config/date'
  import nav from './knowledgetabs'

  export default {
    name:'knowledge',
    components : {
      'SiteNav': nav,
    },
    data() {
      return {
        batchRecoveryApi: '/knowledge/knowledge/admin/batchRecovery/',
        batchDeleteApi: '/knowledge/knowledge/admin/batchDelete/',
        getKnowledgeApi: '/knowledge/knowledge/admin/getKnowledgeByPage/',
        TopKnowledgeApi: '/knowledge/knowledge/admin/topKnowledge/',
        cancelTopKnowledgeApi: '/knowledge/knowledge/admin/cancelTopKnowledge/',
        getTopKnowledgeApi: '/knowledge/knowledge/admin/getTopKnowledge/',
        sessionid: localStorage.sessionID,
        total: 0,
        form: {
          index:1,
          size:12,
          type:null,
          status:null,
          region:null,
          keyword:null,
        },
        column : ["全部","资讯","投融工具","行业","经典案例","新材料","资产管理","宏观","观点","判例","法律法规","文章","互联网","大数据","金融","教育","医疗","O2O","游戏","智能硬件"],
        tableData:[],
      };
    },
    mounted:function () {
      this.$nextTick(function () {
        // 初始化请求数据
        var that =  this;
        // JSON.stringify
        // alert(decodeURI(encodeURI("我是中文"))); escape(that.form.keyword)
        /* that.$http.post(that.api,that.form,{emulateJSON:true},{headers:{*/
        that.$http.post(that.getKnowledgeApi + '-1/1/-1/0/'+ that.form.size,JSON.stringify(that.form.keyword),{headers:{
         /* 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',*/
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.tableData = that.dealData(res.body.responseData);
            that.total = that.tableData.length < 10 ? that.tableData.length : 1000;
          },function (res) {
            console.log(res)
          }
        )
      })
    },

    methods: {
      Refresh(){
        window.location.reload();
      },
      handleIconClick(){
        this.form.keyword = '';
      },
      onSearch(){
        /* 搜索 */
        var that =  this;
        var status = that.form.status,
            type = that.form.type,
            keyword = that.form.keyword,
            indexPage = that.form.index - 1;
        if (that.form.status == null) {
          status = -1;
        }
        if (that.form.type == null) {
          type = 1;
        }
        if (that.form.keyword == '') {
          keyword = null;
        }
        that.$http.post(that.getKnowledgeApi + '-1/'+ type +'/'+ status +'/'+ indexPage +'/'+ that.form.size,JSON.stringify(that.form.keyword),{headers:{
        /*  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',*/
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.tableData = that.dealData(res.body.responseData);
            that.total = that.tableData.length < 10 ? that.tableData.length : 1000;
          },function (res) {
            console.log(res)
          }
        )
      },

      handleCurrentChange(val) {
        /* 分页 this.currentRow = val; */
        var that =  this;
        that.currentPage = val;
        that.form.index =  that.currentPage;
        var status = that.form.status,
            type = that.form.type,
            keyword = that.form.keyword,
            indexPage = that.currentPage - 1;
        if (that.form.status == null) {
          status = -1;
        }
        if (that.form.type == null) {
          type = 1;
        }
        if (that.form.keyword == '') {
          keyword = null;
        }
        that.$http.post(that.getKnowledgeApi + '-1/'+ type +'/'+ status +'/'+ indexPage +'/'+ that.form.size,JSON.stringify(that.form.keyword),{headers:{
         /* 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',*/
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            that.tableData = that.dealData(res.body.responseData);
            that.total = that.tableData.length < 10 ? that.tableData.length : 1000;
          },function (res) {
            console.log(res)
          }
        )

      },

      //跳转发布知识pages
      onPublish(){
        this.$router.push({path: '/addknowledge'})
      },

      // 跳转知识详情pages
      currency(index,row) {
        this.$router.push({path: '/detailknowledge/' + row.id +'/'+ row.type})
      },

      // 跳转编辑知识pages
      edit(index,row) {
        this.$router.push({path: '/editknowledge/' + row.id +'/'+ row.type})
      },

      // 状态(启用/禁用)操作
      changeStatus(index,row) {
        var that = this;
        var batchData = [];
        batchData.push(row.id);
        if(row.status == '正常'){
          //变成禁用
          if(row.essence == 1){
            that.$notify({
              title: '置顶知识不能禁用,请先取消置顶...',
              type: 'success',
              duration: 1500
            });
          }else{
            that.$http.put(that.batchDeleteApi + that.column.indexOf(row.type),batchData,{headers:{
              sessionID :that.sessionid,
              s:'web',
            }}).then(
              function (res) {
                if (res.body.notification.notifCode == 0) {
                  that.$notify({
                    title: '禁用知识成功',
                    type: 'success',
                    duration: 1500
                  });
                  that.onSearch();
                }
              },function (res) {
                that.$notify.error({
                  title: '禁用失败，请稍候重试...',
                  duration: 1500
                });
                return false;
              }
            )
          }
        }else{
          //变成启用
          that.$http.put(that.batchRecoveryApi + that.column.indexOf(row.type),batchData,{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if (res.body.notification.notifCode == 0) {
                that.$notify({
                  title: '启用知识成功',
                  type: 'success',
                  duration: 1500
                });
                that.onSearch();
              }
            },function (res) {
              that.$notify.error({
                title: '启用失败，请稍候重试...',
                duration: 1500
              });
              return false;
            }
          )
        }
      },
      //状态(置顶/取消置顶)操作
      stick(index,row){
        var that = this;
        var topData = [];
        topData.push(row.id);
        var type = that.form.type;
        if (that.form.type == null) {
          type = 1;
        }
        that.$http.get(that.getTopKnowledgeApi + type + '/0/20',{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (result) {
            if(row.essence == 0){
              if (row.status == '正常') {
                if(!result.body.responseData || result.body.responseData.length < 5 ){
                  //置顶
                  that.$http.post(that.TopKnowledgeApi + that.column.indexOf(row.type),topData,{headers:{
                    sessionID :that.sessionid,
                    s:'web',
                  }}).then(
                    function (res) {
                      if (res.body.notification.notifCode == 0) {
                        that.$notify({
                          title: '成功置顶知识',
                          type: 'success',
                          duration: 1500
                        });
                        that.onSearch();
                      }
                    },function (res) {
                      that.$notify.error({
                        title: '置顶失败，请稍候重试...',
                        duration: 1500
                      });
                      return false;
                    }
                  )
                }else{
                  that.$notify({
                    title: '置顶知识条数已达到上限，不能再添加了...',
                    type: 'warning',
                    duration: 1500
                  });
                }
              }else{
                that.$notify({
                  title: '置顶失败，请先启用这条知识...',
                  type: 'warning',
                  duration: 1500
                });
              }
            }else{
              //取消置顶
              that.$http.put(that.cancelTopKnowledgeApi + that.column.indexOf(row.type),topData,{headers:{
                sessionID :that.sessionid,
                s:'web',
              }}).then(
                function (res) {
                  if (res.body.notification.notifCode == 0) {
                    that.$notify({
                      title: '成功取消知识置顶',
                      type: 'success',
                      duration: 1500
                    });
                    that.onSearch();
                  }
                },function (res) {
                  that.$notify.error({
                    title: '取消置顶失败，请稍候重试...',
                    duration: 1500
                  });
                  return false;
                }
              )
            }
          },function (res) {
            console.log(res)
          }
        )
      },
      dealData:function(res){
        var that = this;
        for(var key in res){
          res[key].type = that.column[res[key].type];
          if (res[key].status == 0 || res[key].status == 5) {
            res[key].status = '已禁用';
          }else if(res[key].status == 4){
            res[key].status = '正常';
          }
          res[key].createDate = dealDate(res[key].createDate);
        }
        return res;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
  
  .serch{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 20px 0;
    margin-bottom: 15px;
  }
  .table-body{
    background: white;
  }
  .el-page{
    display: block;
    text-align: center;
    margin: 20px auto;
  }
</style>
