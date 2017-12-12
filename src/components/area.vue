<template>
  <div class="area">
    <el-form-item label="地区" prop="area">
        <el-select  v-model="peopleDate.Country" placeholder="请输入国家" filterable remote clearable :remote-method="getCountry">
          <el-option v-for="item in Countrys" :label="item.name" :value="item.id"  :key="item.id" ></el-option>
        </el-select>
        <el-select  v-model="peopleDate.Province" placeholder="请输入省" filterable remote clearable :remote-method="getProvince">
          <el-option v-for="item in Provinces" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
        <el-select  v-model="peopleDate.City" placeholder="请输入市" filterable remote clearable :remote-method="getCity">
          <el-option v-for="item in Citys" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
       <el-select  v-model="peopleDate.Area" placeholder="请输入区" filterable remote clearable :remote-method="getArea">
          <el-option v-for="item in Areas" :label="item.name" :value="item.id" :key="item.id"></el-option>
       </el-select>
    </el-form-item>
  </div>
</template>
<script>
    import Arae from '../config/area.js'
    export default {
      name:'area',
      props:{
        success:{   // success callback
          type:Function
        }
      },
      data:function () {
        return {
          peopleDate:{
            Country:'',
            Province:'',
            City:'',
            Area:''
          },
          Countrys:'',
          Provinces:'',
          Citys:'',
          Areas:'',
          Areaurl:'/metadata/newregion?parentId=',
          /* 获取到的实际的值 中文*/
          servararea:{
            sCountry:'',
            sProvince:'',
            sCity:'',
            sArea:'',
          },
          /* china frist */
          china:Arae,
          pid:0,
          level:0, // 0国家，1 省，2市 ,3县
          serverval:'',
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
          that.$http.get(that.Areaurl + that.pid,{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              var arr = res.body;
              if(that.level == 0){
                that.Countrys =that.china;
              }
              if(that.level == 1){
                that.Provinces = arr;
              }
              if(that.level == 2){
                that.Citys = arr;
              }
              if(that.level == 3){
                that.Areas = arr;
              }
            },function (res) {
            }
          );
        },
        /*国家*/
        getCountry:function (query) {
          var that = this;
          that.pid = that.peopleDate.Country;
          that.level = 1;
          that.initlistdate();

           that.servararea.sCountry = query;
           that.servararea.sProvince = '';
           that.servararea.sCity = '';
           that.servararea.sArea = '';


           that.peopleDate.Area ='';
           that.success(this.servararea)
        },
        /*省*/
        getProvince:function (query) {
          var that = this;
          that.pid = that.peopleDate.Province;
          that.level = 2;
          that.initlistdate();

          that.servararea.sProvince = query;
          that.servararea.sCity = '';
          that.servararea.sArea = '';


          that.peopleDate.Area ='';
          that.success(this.servararea)
        },
        /*市*/
        getCity:function (query) {
          var that = this;
          that.pid = that.peopleDate.City;
          that.level = 3;
          that.initlistdate();

           that.servararea.sCity = query;
          that.servararea.sArea = '';
          that.peopleDate.Area ='';
          that.success(this.servararea)
        },
        /* 县 */
       getArea:function (query) {
          var that = this;
          that.servararea.sArea = query;
          that.success(this.servararea)
        }
      },
    }
</script>
