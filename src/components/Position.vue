<template>
  <div class="tag">
    <el-button type="primary" @click="dialogVisible = true" icon="setting">位置编辑</el-button>
    <el-dialog title="位置编辑" v-model="dialogVisible" size="small">
      <div class="contp">
        <ul>
          <li v-for="(itam, index) in loadate">
            <el-input class="epout" v-model="itam.name" :disabled="IDBObjectStore"  style="width: 100px;"></el-input>
            <i class="el-icon-delete" @click="delter(itam,index)"></i>
          </li>
          <div class="add">
            <el-input style="width:100px;display:inline-block;vertical-align: top;" class="addIpt" v-model="addval" @blur="hideIpt" v-show="show"></el-input>
            <el-button icon="plus" @click="addtes" style="display:inline-block;vertical-align: top;">添加位置</el-button>
          </div>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        getApi : '/cross/organ/newWords/listPosition.json',
        createApi : '/cross/organ/newWords/savePosition.json',
        deleteApi : '/cross/organ/newWords/removePosition.json',
        sessionid:localStorage.sessionID,
        dialogVisible: false,
        show:false,
        addval:'',
        IDBObjectStore:false,
        loadate:[],
        ket:null,
      };
    },
    mounted:function () {
      var that = this;
      that.$nextTick(function () {
        //初始化位置列表
        that.getloadate();
      })
    },
    methods: {
      getloadate(){
        var that = this;
        that.$http.post(that.getApi,that.ket,{headers:{
          sessionID :localStorage.sessionID,
          s:'web',
        }}).then(
          function (res) {
            that.loadate = res.data.responseData.listPosition;
            that.loadate.forEach(function (val) {
              if(val.id == 1 || val.id == 2){
                that.IDBObjectStore = true;
              }
            })

          },function (res) {
            console.log(res)
          }
        )
      },
      //删除
      delter:function (itam,index) {
        var that = this;
        var delDate = {
          "id" : String(itam.id),
        }
        if (itam.id == 1 || itam.id == 2) {
          that.$notify({
            title: '包含栏目，不能删除',
            type: 'success',
            duration: 1500
          });
          return false;
        };
        that.$http.post(that.deleteApi,JSON.stringify(delDate),{headers:{
          sessionID :that.sessionid,
          s:'web',
        }}).then(
          function (res) {
            if (res.data.responseData.success == true) {
              that.$notify({
                title: '删除成功',
                type: 'success',
                duration: 1500
              });
              that.getloadate()
            }else{
              that.$notify.error({
                title: '删除失败',
                duration: 1500
              });
            }
          },function (res) {
            that.$notify.error({
              title: '删除失败',
              duration: 1500
            });
          }
        )
      },
      // 添加
      addtes:function () {
        var that = this;
        that.show= true;
        var createDate = {
          "name" : that.addval,
        }
        if(that.addval !== ''){
          that.$http.post(that.createApi,JSON.stringify(createDate),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if (res.data.responseData.success == true) {
                that.$notify({
                  title: '创建成功',
                  type: 'success',
                  duration: 1500
                });
                that.getloadate();
                that.show= false;
              }else{
                that.$notify.error({
                  title: '创建失败',
                  duration: 1500
                });
              }
            },function (res) {
              that.$notify.error({
                title: '创建失败',
                duration: 1500
              });
            }
          )
          that.addval = '';
        }
      },
      addNewTodo:function (itam) {
        // 改变的时候的值
        var chageval = itam;
      },
      hideIpt(){
        if (!this.addval) {
          this.show= false;
        }
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .tag{
    display: inline-block;
    margin-left: 10px;
  }

  .contp ul{
    display: block;

    li{
      display: inline-block;
      margin: 10px;
      i{
        cursor: pointer;
        font-size: 16px;
      }
    }

  }
  .add{
    padding: 0 10px;
  }
</style>
