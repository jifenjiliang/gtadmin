<template>
  <div class="knowledge_edit">
    <section class="section">
        <div class="loation"><router-link to="/knowledge">内容管理</router-link> >>><router-link to="/knowledge">知识管理</router-link> >>编辑知识</div>
        <!-- <SiteNav></SiteNav> -->
        <!-- knowledge_edit_body -->
        <div class="knowledge_edit_body">
          <SiteBody :type="type"></SiteBody>
        </div>
	</section>
  </div>
</template>

<script>

  import knowledgebody from './knowledgebody.vue'
  import nav from './knowledgetabs'

  export default {
    name:'knowledge_edit',
    components : {
      'SiteBody' : knowledgebody,
      'SiteNav': nav,
    },
    computed:{
    },
    data:function () {
      return {
        type: 'edit',
      }
    },
    methods:{
      handleClick(tab, event) {
        //console.log(tab, event);
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  
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
  .knowledge_edit_body{
    background: white;
    border: 1px solid #e5e4ee;
    padding: 20px 20px 0;
  }
</style>