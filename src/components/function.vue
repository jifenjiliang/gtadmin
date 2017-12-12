<template>
  <div class="func">
    <el-form-item label="职能" prop="func">
        <el-select  v-model="peopleDate.fId" placeholder="请选择一级分类" filterable remote clearable :remote-method="getFIndustrys">
          <el-option v-for="item in fIndustrys" :label="item.name" :value="item.id"  :key="item.id" ></el-option>
        </el-select>
        <el-select  v-model="peopleDate.sId" placeholder="请选择二级分类" filterable remote clearable :remote-method="getSIndustrys">
          <el-option v-for="item in sIndustrys" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
    </el-form-item>
  </div>
</template>
<script>
    export default {
      name:'func',
      props:{
        success:{   // success callback
          type:Function
        }
      },
      data:function () {
        return {
          url:'/cross/code/peopleIndustrysList.json',
          pid:0,
          fIndustrys:'',
          sIndustrys:'',
          peopleDate:{
            fId:'',
            sId:''
          },
          /* 获取到的实际的值 中文*/
          servararea:{
            fIndustrys:'',
            sIndustrys:''
          },
        }
      },
      mounted:function () {
        this.$nextTick(function () {
          var vm = this;
          vm.initlistdate();
        });
      },
      methods:{
        /*
          *   query 中文
          *   this.peopleDate.Country 实际的id
          * */
        initlistdate:function () {
          var that = this;
          that.$http.post(that.url,JSON.stringify({
            pid: that.pid,
            index: 0,
            size: ''
          }),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if(res.body.responseData.success){
                var arr = res.body.responseData.industryDirections;
                if(that.pid == 0){
                  that.fIndustrys = arr;
                }else{
                  that.sIndustrys = arr;
                }
              }
            },function (msg) {

            }
          );
        },
        /*一级*/
        getFIndustrys:function (query) {
          var that = this;
          that.pid = that.peopleDate.fId;
          //that.peopleDate.sId = '';
          that.initlistdate();
          that.servararea.fIndustrys = query;
          that.servararea.sIndustrys = '';
          that.success(this.servararea)
        },
        /*二级*/
        getSIndustrys:function (query) {
          var that = this;
          that.pid = that.peopleDate.sId;
          that.servararea.sIndustrys = query;
          that.success(this.servararea)
        }
      },
    }
</script>
