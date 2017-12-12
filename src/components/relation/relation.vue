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
        <v-RM :success="getPeopleList" :isshow="isshow.rm"></v-RM>
        <v-ZZ :success="getOrganList" :isshow="isshow.zz"></v-ZZ>
        <v-ZS :success="getknowledgeList" :isshow="isshow.zs"></v-ZS>
        <v-XQ :success="getdemandList" :isshow="isshow.xq"></v-XQ>
        <el-row>
          <el-col :offset="8">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button @click="save" type="success">确定</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
    import rm from './people'
    import zz from './organ'
    import zs from './knowledge'
    import xq from './demand'
    export default {
      name:'relation',
      components:{
        'v-RM': rm,
        'v-ZZ': zz,
        'v-ZS': zs,
        'v-XQ': xq,
      },
      data:function () {
        return {
          activeName: 'rm',
          dialogVisible: false,
          /* 是否显示 */
          isshow: {rm: true, zz: false, zs: false, xq: false},
          allList: {
            rm: [],
            zz: [],
            zs: [],
            xq: []
          },
        }
      },
      methods:{
        init() {
          /* seeDetail */
          let vm = this;
          vm.dialogVisible = true;
        },
        /*切换*/
        handleClick(tab, event) {
          let vm = this;
          vm.activeName  = tab.name;
          for (const key in vm.isshow) {
            vm.isshow[key] = false;
          }
          vm.isshow[tab.name] = true;
        },
        getPeopleList(rm) {
          this.allList.rm = rm;
          console.log(this.allList.rm)
        },
        getOrganList(zz) {
          this.allList.zz = zz;
          console.log(this.allList.zz)
        },
        getknowledgeList(zs) {
          this.allList.zs = zs;
          console.log(this.allList.zs)
        },
        getdemandList(xq) {
          this.allList.xq = xq;
          console.log(this.allList.xq)
        },
        save() {
          console.log(this.allList)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../../assets/relation.less";
</style>
