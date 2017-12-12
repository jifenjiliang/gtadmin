<template>
  <div class="relation">
    <el-button type="primary" icon="plus" @click="init">关联</el-button>
    <el-dialog 
    custom-class="relation-dialog" 
    v-model="dialogVisible" 
    center
    title="添加关联">
    <div class="dialog_relation">
      <div class="content_body">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="rm"><span slot="label" class="elabel">人脉</span></el-tab-pane>
          <el-tab-pane name="zz"><span slot="label" class="elabel">客户</span></el-tab-pane>
          <el-tab-pane name="zs"><span slot="label" class="elabel">知识</span></el-tab-pane>
          <el-tab-pane name="xq"><span slot="label" class="elabel">事件</span></el-tab-pane>
        </el-tabs>
        <div item="rm" class="gintong-content" :isload="isload" v-if="isshow.rm">
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
                    <dl v-for="(item, index) in people" :key="item.id"  @click="getpeopleval(item,index)">
                      <dt><img :src="item.jtContactMini.image" alt="">{{item.name}}</dt>
                      <dd>人脉<i v-show="item.show" class="el-icon-check"></i></dd>
                    </dl>
                    <div class="getmore">查看更多</div>
                  </div>
                  <div class="title">我的</div>
                  <div class="list_list">
                    <dl v-for="(item, index) in bigpeople" :key="item.id" @click="getpeopleval(item,index)">
                      <dt><img :src="item.jtContactMini.image" alt="">{{item.name}}</dt>
                      <dd>人脉<i v-show="item.show" class="el-icon-check"></i></dd>
                    </dl>
                  </div>
                </div>
                <div class="list_body">
                  <div class="list_list">
                    <dl v-for="(item, index) in savepeople" :key="item.id" @click="delpeople(index, item)">
                      <dt><img :src="item.jtContactMini.image" alt="">{{item.name}}</dt>
                      <dd>人脉<i  class="el-icon-close"></i></dd>
                    </dl>
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
          <el-row>
            <el-col :offset="8">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button @click="save" type="success">确定</el-button>
            </el-col>
          </el-row>
        </div>
        <div item="zz" class="gintong-content" :isload="isload" v-if="isshow.zz">
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
                    <dl v-for="(item, index) in organ" :key="item.id"  @click="getpeopleval(item,index)">
                      <dt><img :src="item.organizationMini.logo" alt="">{{item.name}}</dt>
                      <dd>人脉<i v-show="item.show" class="el-icon-check"></i></dd>
                    </dl>
                    <div class="getmore">查看更多</div>
                  </div>
                  <div class="title">我的</div>
                  <div class="list_list">
                    <dl v-for="(item, index) in bigorgan" :key="item.id" @click="getpeopleval(item,index)">
                      <dt><img :src="item.organizationMini.logo" alt="">{{item.name}}</dt>
                      <dd>人脉<i v-show="item.show" class="el-icon-check"></i></dd>
                    </dl>
                  </div>
                </div>
                <div class="list_body">
                  <div class="list_list">
                    <dl v-for="(item, index) in saveorgan" :key="item.id" @click="delpeople(index, item)">
                      <dt><img :src="item.organizationMini.logo" alt="">{{item.name}}</dt>
                      <dd>人脉<i  class="el-icon-close"></i></dd>
                    </dl>
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
          <el-row>
            <el-col :offset="8">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button @click="save" type="success">确定</el-button>
            </el-col>
          </el-row>
        </div>
        <div item="zs" class="gintong-content" :isload="isload" v-if="isshow.zs">
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
                      <li v-for="(item, index) in knowledge" :key="item.id"  @click="getpeopleval(item,index)">{{item.title}}</li>
                    </ul>
                    <div class="getmore">查看更多</div>
                  </div>
                  <div class="title">我的</div>
                  <div class="list_list">
                    <ul>
                      <li v-for="(item, index) in bigknowledge" :key="item.id"  @click="getpeopleval(item,index)">{{item.title}}</li>
                    </ul>
                  </div>
                </div>
                <div class="list_body">
                  <div class="list_list">
                    <ul>
                      <li v-for="(item, index) in saveknowledge" :key="item.id"  @click="delpeople(item,index)">{{item.title}}</li>
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
          <el-row>
            <el-col :offset="8">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button @click="save" type="success">确定</el-button>
            </el-col>
          </el-row>
        </div>
        <div item="xq" class="gintong-content" :isload="isload" v-if="isshow.xq">
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
                      <li v-for="(item, index) in demand" :key="item.id"  @click="getpeopleval(item,index)">{{item.demandTitle}}</li>
                    </ul>
                    <div class="getmore">查看更多</div>
                  </div>
                  <div class="title">我的</div>
                  <div class="list_list">
                    <ul>
                      <li v-for="(item, index) in bigdemand" :key="item.id"  @click="getpeopleval(item,index)">{{item.demandTitle}}</li>
                    </ul>
                  </div>
                </div>
                <div class="list_body">
                  <div class="list_list">
                    <ul>
                      <li v-for="(item, index) in savedemand" :key="item.id"  @click="getpeopleval(item,index)">{{item.demandTitle}}</li>
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
          <el-row>
            <el-col :offset="8">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button @click="save" type="success">确定</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      data:function () {
        return {
          activeName: 'rm',
          dialogVisible: false,
          active: false,
          dynamicTags: ['作者', 'RE', '相关'],
          search_val:"", //搜索值
          sessionid:localStorage.getItem('sessionID'),
          form:{ //关联
            name:"",
          },
          url: "/cross/asso/pub/getNewRelatedResources/",
          keywords: null,
          //类型
          type: {rm: 1, zz: 2, zs: 3, xq: 4},
          //种类
          category: {
            rm: 'person',
            zz: 'organ',
            zs: 'knowledge',
            xq: 'demand'
          },
          /* 滑动加载页码数 */
          index: {rm: 1, zz: 1, zs: 1, xq: 1},
          //数据
          allList: {
            rm: [],
            zz: [],
            zs: [],
            xq: []
          },
          /* 是否显示 */
          isshow: {rm: true, zz: false, zs: false, xq: false},
          /* 是否第一次加载    0是   1否 */
          isload: {rm: 0, zz: 0, zs: 0, xq: 0},
          /* 人脉 */
          people:[],
          bigpeople:[],
          savepeople:[],
          /* 客户 */
          organ:[],
          bigorgan:[],
          saveorgan:[],
          /* 知识 */
          knowledge:[],
          bigknowledge:[],
          saveknowledge:[],
          /* 需求 */
          demand:[],
          bigdemand:[],
          savedemand:[],
        }
      },
      methods:{
        init() {
          /* seeDetail */
          let vm = this;
          vm.initlistdate();
          vm.dialogVisible = true;
        },
        initlistdate:function () {
          /* 初始化数据 */
          let vm = this;
          let url = vm.url + vm.category[vm.activeName] + '/' + vm.type[vm.activeName] + '/'+ vm.index[vm.activeName] + '/20/' + vm.keywords + '/5';
          vm.$http.get(url, {headers:{
            sessionID :vm.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if(vm.activeName === "rm"){
                /*人脉*/
                vm.people = res.body.responseData.listPlatformPeople;
                vm.bigpeople = res.body.responseData.listUserPeople;
              }else if(vm.activeName === "zz"){
                /*客户*/
                vm.organ = res.body.responseData.listPlatformOrganization;
                vm.bigorgan = res.body.responseData.listUserOrganization;
              }else if(vm.activeName === "zs"){
                /* 知识 */
                vm.knowledge = res.body.responseData.listPlatformKnowledge;
                vm.bigknowledge = res.body.responseData.listUserKnowledge;
              }else if(vm.activeName === "xq"){
                /* 需求 */
                vm.demand = res.body.responseData.listPlatformAffair;
                vm.bigdemand = res.body.responseData.listUserAffair;
              }
              
            },function (res) {
              console.log(res)
            }
          );
        },
        bigdate() {
          /* 金桐脑推荐数据 */
          let vm = this;
          let url = vm.url + vm.category[vm.activeName] + '/' + vm.type[vm.activeName] + '/'+ vm.index[vm.activeName] + '/5/null/5';
          vm.$http.get(url, {headers:{
            sessionID :vm.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if(vm.activeName === "rm"){
                /*人脉*/
                vm.people = res.body.responseData.listPlatformPeople;
                /* vm.bigpeople = res.body.responseData.listUserPeople;*/
                vm.total = res.body.responseData.total;
              }else if(vm.activeName === "zz"){
                /*客户*/

              }else if(vm.activeName === "zs"){
                /* 知识 */

              }else if(vm.activeName === "xq"){
                /* 需求 */
              }
              
            },function (res) {
              console.log(res)
            }
          );
        },
        getpeopleval(obj, index) {
          let vm = this;
          if(vm.activeName === "rm"){
            /*人脉*/
            vm.dealSave(vm.savepeople,obj)
          }else if(vm.activeName === "zz"){
            /*客户*/
            vm.dealSave(vm.saveorgan,obj)
          }else if(vm.activeName === "zs"){
            /* 知识 */
            vm.dealSave(vm.saveknowledge,obj)
          }else if(vm.activeName === "xq"){
            /* 需求 */
            vm.dealSave(vm.savedemand,obj)
          }
        },
        delpeople(index,item) {
          let vm = this;
          if(vm.activeName === "rm"){
            /*人脉*/
            vm.savepeople.splice(index, 1);
            item.show = false;
          }else if(vm.activeName === "zz"){
            /*客户*/
            vm.saveorgan.splice(index, 1);
            item.show = false;
          }else if(vm.activeName === "zs"){
            /* 知识 */
            vm.saveknowledge.splice(index, 1);
            item.show = false;
          }else if(vm.activeName === "xq"){
            /* 需求 */
            vm.savedemand.splice(index, 1);
            item.show = false;
          }
        },
        dealSave(arr,obj){
          /* 处理选中数据 */
          if (arr.indexOf(obj) == -1) {
            arr.push(obj)
            obj.show = !obj.show;
          } else {
            arr.splice(arr.indexOf(obj), 1)
            obj.show = false;
          }
        },
        /*  //分页
        gopage:function (val) {
          var vm =  this;
          vm.index = val;
          vm.initlistdate();
        }, */
        /*切换*/
        handleClick(tab, event) {
          let vm = this;
          vm.activeName  = tab.name;
          for (const key in vm.isshow) {
            vm.isshow[key] = false;
          }
          vm.isshow[tab.name] = true;
          if(vm.isload[tab.name] === 0){
            vm.isload[tab.name] = 1;
            vm.initlistdate();
          }
          
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
        },
        save() {
          let vm = this;
          console.log(vm.savepeople)
        }


      },


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .relation{
    /* padding: 100px 30px; */
    .el-button{ font-size:13px; }
    .el-tabs__item{
      padding: 0 60px;
      
    }
    .el-tab-pane{
      width: 150px;
      text-align: center;
    }
    .el-form-item{
      margin-bottom: 0;
    }
    .dialog_relation{
      width:600px;
      height:610px;
      border:1px solid #ccc;
      background: white;
      .elabel{
        display: inline-block;
        width: 118px;
        text-align: center;
      }
    }
    /* .dialog_relation{
      position: absolute;
      width:600px;
      height:650px;
      left:50%;
      top:50%;
      margin-left:-300px;
      margin-top:-320px;
      border:1px solid #ccc;
      background: white;
    } */
    .pag_{
      float: left;
      width: 100%;
      margin-bottom: 10px;
    }
    .content_list{
      padding: 0 10px;
    }
    .tagss{
      float: left;
        li{
          float: left;
          padding: 0 3px;
          cursor: pointer;
        }
    }
    /*content style css*/
    .list_body{
      float: left;
      width: 280px;
      height:350px;
      border: 1px solid #ccc;
      margin-top: 10px;
      overflow-y: scroll;
      margin-bottom: 10px;
        .title{
          float: left;
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-indent: 10px;
        }
      .list_list{
        float: left;
        width: 100%;
        overflow: hidden;
        padding: 10px 0;
        .getmore{
          float: left;
          width: 100%;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
        }
        dl{
          float: left;
          width: 100%;
          height:40px;
          overflow: hidden;
          line-height: 40px;
          cursor: pointer;
          dt{
            float: left;
            img{
              float: left;
              width: 35px;
              height:35px;
              overflow: hidden;
              border-radius: 100px;
              margin: 0 10px;
              display: inline;
            }

          }
          dd{
            float: right;
            padding-right: 15px;
            i{
              color: #409eff;
              cursor: pointer;
              margin-left: 5px;
            }
          }
        }
        dl:hover{
          background: #eee;
        }
        ul{
          float: left;
          padding: 0 10px;
          li{
            float: left;
            width: 220px;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            cursor: pointer;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          li:hover{
            background: #eee;
          }
        }
      }
    }
  }
</style>
