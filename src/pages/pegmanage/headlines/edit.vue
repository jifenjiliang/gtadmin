<template>
  <div class="addcolumn">
    <section class="section">
      <div class="loation"><router-link to="/headlines">PGC内容管理</router-link>>><router-link to="/headlines">动态头条</router-link>>>编辑头条</div>
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
                  <el-col :span="23" :offset="1">
                    <el-form-item label="推送时间" style="display: inline-block;">
                      <el-date-picker
                        type="datetime"
                        v-model="form.updateTime"
                        :picker-options="pickerOptions0"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="ecol-body">
                <!--people_ecl list -->
                <div class="people_ecl">
                  <div class="people_ecl_title"><span></span>知识
                  </div>
                  <el-table
                    :data="form.knowledgeList"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="sourceTitle"
                      label="知识标题"
                    >
                    </el-table-column>
                    <el-table-column
                      label="栏目"
                      width="80">
                      <template scope="scope">
                        {{ scope.row.columnType | columnTypes}}
                      </template>
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
                        {{ Number(scope.row.createTime) | format}}
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
              </div>
              <div class="col_button">
                <el-button type="primary" @click="onSave" :loading="loading">保存</el-button>
                <el-button @click="backTo">取消</el-button>
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

  const cityOptions = ['TMT(科技,媒体和通信)', '时政', '社会', '金融', '教育', '医疗', '大数据', '财务', '法律', '人力HR', '产品开发', '运营'];

  export default {
    name:'addcolumn',

    data:function () {
      return {
        pickerOptions0:{
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        loading:false,
        serverapi: '/pub/updateColumnDescRel', // 发送
        getverapi:'pub/queryColumnById', // 获取
        sessionid:localStorage.getItem('sessionID'),
        industry:'',
        form:{
          knowledgeList:[],
          updateTime:'',
        },
        // 全选数据
        checkAll: true,
        checkedCities: null,
        cities: cityOptions,
        isIndeterminate: true
      }
    },
    filters:{
      columnTypes:function (val) {
        switch(val)
        {
          case 1:
            return '咨询';
            break;
          case 2:
            return '投融工具';
            break;
          case 3:
            return '行业';
            break;
          case 4:
            return '经典案例';
            break;
          case 5:
            return '新材料';
            break;
          case 6:
            return '资产管理';
            break;
          case 7:
            return '宏观';
            break;
          case 8:
            return '观点';
            break;
          case 9:
            return '判例';
            break;
          case 10:
            return '法律法规';
            break;
          case 11:
            return '文章';
            break;
          case 12:
            return '互联网';
            break;
          case 13:
            return '大数据';
            break;
          case 14:
            return '金融';
            break;
          case 15:
            return '教育';
            break;
          case 16:
            return '医疗';
            break;
          case 17:
            return 'O2O';
            break;
          case 17:
            return '游戏';
            break;
          case 19:
            return '智能硬件';
            break;
          default:
            return '其他';
        }
      }
    },
    mounted:function () {
      this.$nextTick(function () {
        var that =  this;
        let Data = JSON.parse(localStorage.getItem('toutiao'));
        that.form.updateTime =Data.updateTime;
        that.checkedCities = JSON.parse(Data.industry);
        that.form.knowledgeList.push(Data);
       /* console.log(that.Toutiao.sourceTitle)*/
       /*that.changelocadate();*/
      })
    },
    beforeRouteLeave (to, from, next) {
      if(from){
        localStorage.removeItem('toutiao');
        next();
      }
    },
    watch: {
    /*  '$route' (to, from) {
        if(to.path == '/headlines'){
          localStorage.removeItem('toutiao');
        }
      }*/
    },
    methods:{

      /*changelocadate:function () {
      var that = this;
        that.$http.post(that.getverapi,JSON.stringify({ 'id': that.$route.params.id}),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
          },function (res) {
            console.log(res)
          }
        )
      },*/

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
    //保存数据
      onSave(){
        var that =  this;
        var stime;
        if(that.form.updateTime == ''){
          stime = new Date().getTime();
        }else if(typeof that.form.updateTime == 'number' ){
          stime = that.form.updateTime;
        }else{
          stime = (that.form.updateTime).getTime();
        }
        var savepath = {
          id: Number(that.$route.params.id),
          industry: JSON.stringify(that.checkedCities),
          updateTime:stime,
        };
        that.$http.post(that.serverapi,JSON.stringify(savepath),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            if(res.body.notification.notifInfo == "success"){
              this.$message('编辑头条成功');
              this.$router.push({path: '/headlines'})
              that.loading = false;
              localStorage.removeItem('toutiao');
            }else{
              this.$notify.error({
                title: '编辑头条失败',
                message: '编辑头条失败',
                duration: 1000
              });
              this.$router.push({path: '/headlines'});
              localStorage.removeItem('toutiao');
              that.loading = false;
            }

          },function (res) {
            console.log(res)
          }
        )

      },
    // 返回
      backTo(){
        this.$router.push({path: '/headlines'})
        localStorage.removeItem('toutiao');
      }
    },

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


