<template>
  <div class="tag">
    <el-button type="primary" @click="dialogVisible = true" icon="setting">位置编辑</el-button>
    <el-dialog title="位置编辑" v-model="dialogVisible" size="small">
    <div class="contp">
      <ul>
        <li v-for="(itam, index) in loadate" :key="itam.id">
          <el-input class="epout" v-model="itam.name" :disabled="IDBObjectStore"  style="width: 100px;"  @blur="edite(index,itam)"></el-input>
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
          getApi : '/pub/queryPositionByUserId',
          createApi : '/pub/createPosition',
          updateApi : '/pub/updatePosition',
          deleteApi : '/pub/deletePosition',
          sessionid:localStorage.sessionID,
          dialogVisible: false,
          show:false,
          addval:'',
          IDBObjectStore:false,
          loadate:[]
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
          that.$http.get(that.getApi,{headers:{
            sessionID :localStorage.sessionID,
            s:'web',
          }}).then(
            function (res) {
              /*that.loadate = res.body.responseData;*/
              var showtag = res.body.responseData;
              showtag.forEach(function (item) {
                  if(item.id == 1 || item.id == 2){
                  }else{
                    that.loadate.push(item)
                  }
              });
              that.loadate.forEach(function (val) {
                that.IDBObjectStore = true;
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
          if (itam.id == 1 || itam.id == 2 || itam.id == 3 || itam.id == 4) {
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
              console.log(res)
              if (res.body.notification.notifCode == 0) {
                that.$notify({
                  title: '删除成功',
                  type: 'success',
                  duration: 1500
                });
                that.getloadate()
                //that.loadate.splice(index,1);
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
        // 编辑
        edite:function (index, obj) {
          var that = this;
          var updateDate = {
            "id" : obj.id,
            "name" : obj.name
          };
          if (obj.id == 1 || obj.id == 2 || obj.id == 3 || obj.id == 4) {
            that.$notify({
              title: '默认栏目，不能编辑',
              type: 'success',
              duration: 1500
            });
            return false;
          };
          that.$http.post(that.updateApi,JSON.stringify(updateDate),{headers:{
            sessionID :that.sessionid,
            s:'web',
          }}).then(
            function (res) {
              if (res.body.notification.notifCode == 0) {
                that.$notify({
                  title: '编辑成功',
                  type: 'success',
                  duration: 1500
                });
                that.getloadate()
                //that.loadate.splice(index,1);
              }else{
                that.$notify.error({
                  title: '编辑失败',
                  duration: 1500
                });
              }
            },function (res) {
              that.$notify.error({
                title: '编辑失败',
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
                if (res.body.notification.notifCode == 0) {
                  that.$notify({
                    title: '创建成功',
                    type: 'success',
                    duration: 1500
                  });
                  that.getloadate();
                  //createDate.id = res.body.responseData.id;
                  //that.loadate.push(createDate);
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
