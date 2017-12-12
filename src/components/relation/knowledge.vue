<template>
  <div item="zs" class="gintong-content" v-if="isshow">
    <div class="content_list">
      <el-row>
        <el-col :span="24">
          <el-col :span="11">
            <el-input v-model="search_val" icon="circle-close" @change="Search" :on-icon-click="handleIconClick" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col  :span="2" :offset="6">
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="list_body" style="margin-right: 10px;">
            <div class="title">金桐脑推荐</div>
            <div class="list_list">
              <ul>
                <li v-for="(item, index) in knowledge" :key="item.id"  @click="getpeopleval(item,index)">
                  <div>{{item.title}}</div>
                  <i v-show="item.show" class="el-icon-check"></i>
                </li>
              </ul>
              <div class="getmore">查看更多</div>
            </div>
            <div class="title">我的</div>
            <div class="list_list">
              <ul>
                <li v-for="(item, index) in bigknowledge" :key="item.id"  @click="getpeopleval(item,index)">
                  <div>{{item.title}}</div>
                  <i v-show="item.show" class="el-icon-check"></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="list_body">
            <div class="list_list">
              <ul>
                <li v-for="(item, index) in saveknowledge" :key="item.id"  @click="delpeople(item,index)">
                  <div>{{item.title}}</div>
                  <i  class="el-icon-close"></i>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="关联关系:">
              <el-input v-model="form.name" icon="circle-close" :on-icon-click="formSearch" ></el-input>
            </el-form-item>
            <el-form-item label="推荐关系:">
              <ol class="tagss">
                <li v-for="item in dynamicTags" :key="item.id" @click="getTags(item)">{{item}}</li>
              </ol>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      success:{   // success callback
        type:Function
      },
      isshow:{
        type:Boolean
      }
    },
    data() {
      return {
        dynamicTags: ['作者', 'RE', '相关'],
        search_val:"", //搜索值
        sessionid:localStorage.getItem('sessionID'),
        form:{ //关联
          name:"",
        },
        index: 1,
        keywords: null,
        /* 知识 */
        knowledge:[],
        bigknowledge:[],
        saveknowledge:[],
      }
    },
    //初始化
    mounted:function () {
      this.initlistdate();
    },
    methods:{
      initlistdate:function () {
        /* 初始化数据 */
        let vm = this;
        let url = '/cross/asso/pub/getNewRelatedResources/knowledge/3/'+ vm.index + '/20/' + vm.keywords + '/5';
        vm.$http.get(url, {headers:{
          sessionID :vm.sessionid,
          s:'web',
        }}).then(
          function (res) {
            /* 知识 */
            vm.knowledge = res.body.responseData.listPlatformKnowledge;
            vm.bigknowledge = res.body.responseData.listUserKnowledge;
          },function (res) {
            console.log(res)
          }
        );
      },
      getpeopleval(obj, index) {
        let vm = this;
        if (vm.saveknowledge.indexOf(obj) == -1) {
          vm.saveknowledge.push(obj)
          obj.show = !obj.show;
        } else {
          vm.saveknowledge.splice(vm.saveknowledge.indexOf(obj), 1)
          obj.show = false;
        }
        vm.dealSaveDate(vm.saveknowledge)
      },
      delpeople(index,item) {
        let vm = this;
        vm.saveknowledge.splice(index, 1);
        item.show = false;
        vm.dealSaveDate(vm.saveknowledge)
      },
      dealSaveDate(arr) {
        /* 处理保存数据 */
        let vm = this;
        vm.success(arr);
      },
      /*清除搜索*/
      handleIconClick() {
        this.search_val = '';
      },
      /*清除关联搜索*/
      formSearch() {
        this.form.name = '';
      },
      /*搜索*/
      Search() {
        this.keywords = this.search_val;
        that.initlistdate();
      },
      /*tag点击*/
      getTags(val) {
        this.form.name = val
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../assets/relation.less";
</style>


