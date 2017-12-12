<template>
  <div class="topic">
    <section class="section">
      <div class="loation"><router-link to="/question">内容管理</router-link> >>><router-link to="/question">问答管理</router-link> >>查看</div>
      <div class="question">
        <div class="question_">
          <dl>
            <dt>问题标题：</dt>
            <dd>{{question_.title}}</dd>
          </dl>
          <dl>
            <dt>发布人：</dt>
            <dd>{{question_.userName}}&nbsp;&nbsp;&nbsp;&nbsp;发布时间：{{question_.createTime | format}}&nbsp;&nbsp;阅读人数：{{question_.readCount}}</dd>
          </dl>
          <dl>
            <dt>问题描述：</dt>
            <dd v-html="question_.describe"></dd>
          </dl>
          <dl v-if="concation">
            <dt>关联：</dt>
            <dd>
              <bdo>人：<span v-for="itn in prople">{{itn.assocTitle}}</span></bdo>
              <bdo>组织：<span v-for="itn in orgin">{{itn.assocTitle}}</span></bdo>
              <bdo>知识：<span v-for="itn in know">{{itn.assocTitle}}</span></bdo>
              <bdo>需求：<span v-for="itn in events">{{itn.assocTitle}}</span></bdo>
            </dd>
          </dl>
        </div>
        <div class="auq" v-if="auqs">
          <dl>
            <dt>回答：  {{tableData4.length}}</dt>
          </dl>
          <el-table
            :data="tableData4"
            border
            style="width: 100%">
            <el-table-column
              prop="answererName"
              label="回答人姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="content"
              label="回答内容"
             >
            </el-table-column>
            <el-table-column
              label="回答时间"
              width="200">
              <template scope="scope">
                {{ scope.row.createTime | format}}
              </template>
            </el-table-column>
            <el-table-column
              prop="praiseCount"
              label="点赞"
              width="120">
            </el-table-column>
            <el-table-column
              prop="virtual"
              label="评论"
              width="100">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="back">
        <router-link to="/question"> <el-button type="success">&nbsp;返回&nbsp;</el-button></router-link>
      </div>
    </section>
  </div>
</template>

<script>
    export default {
        name:'topic',
        data:function () {
          return {
            api:'/ask-answer/ask/',
            tableData4:[],
            question_:{},
            prople:[],
            orgin:[],
            know:[],
            events:[],
            concation:true,
            auqs:true,
          }
        },
      mounted:function () {
        this.$nextTick(function () {
          var vm = this;
          vm.topdate();
        });
      },
        methods: {
          topdate:function () {
            var that = this;
            that.$http.get(that.api + that.$route.params.id + '/' + 0 + '/' + 10,{headers:{
              sessionID :localStorage.getItem('sessionID'),
              s:'web',
            }}).then(
              function (res) {

                  if(res.data.responseData == null){
                    that.$message.error('请求失败,请稍后尝试');
                    that.$router.push({path: '/question'})
                  }
                  that.question_ = res.data.responseData.question;
                  let list = res.data.responseData.associateList;
                  if(list.length == 0){
                      that.concation = false;
                  }
                  list.forEach(function (item) {
                      if(item.assocTypeId == 2){
                          that.prople.push(item)
                      }else if(item.assocTypeId == 3){
                        that.orgin.push(item)
                      }else if(item.assocTypeId == 8){
                        that.know.push(item)
                      }else{
                        that.events.push(item)
                      }
                  });

                  if(res.data.responseData.answerList.length == 0){
                      that.auqs = false;
                  }
                that.tableData4 = res.data.responseData.answerList;
              },function (res) {
                console.log(res)
              }
            );
          }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
.topic{
  display: block;
  dl{
    float: left;
    width: 100%;
    border-bottom: 1px solid #d1dbe5;
    line-height: 50px;
    dt{
      float: left;
    }
    dd{
      float: left;
      color: #5d5d5d;
      a{
        color: #20a0ff;
      }
      bdo{
        display: block;
        span{
          padding-right: 10px;
        }
      }
    }
  }
  p{
    float: left;
    width: 100%;
    border-bottom: 1px solid #d1dbe5;
    line-height: 50px;

  }
}
.auq{
  dl{
    float: left;
    width: 100%;

    line-height: 50px;

  }
}
  .back{
    width: 87.5%;
    height:50px;
    position: fixed;
    right:0;
    bottom: 0;
    z-index: 100;
    text-align: center;
  }
</style>
